# Payment & Financial Flow

## Overview
This document details the complete payment workflow for Mind Mine Money, including:
- Student purchases (credits)
- Educator earnings tracking
- Credit-to-THB conversion & withdrawal
- Thailand payment gateway integration
- Fraud detection & security

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                      PAYMENT & WALLET SYSTEM                                │
└──────────────────────────────────────────────────────────────────────────────┘

                        STUDENT PURCHASE FLOW
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Select & Buy Content   │
                    │  (Credit price shown)   │
                    └─────────────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Check Wallet Balance   │
                    │  (Has enough credits?)  │
                    └─────────────────────────┘
                           │           │
                    YES ──┘             └─── NO
                    │                        │
                    ▼                        ▼
         ┌──────────────────┐    ┌─────────────────────┐
         │ Deduct Credits   │    │ Offer to Buy Credits│
         │ from Wallet      │    │ or Gift Card        │
         │                  │    └─────────────────────┘
         └──────────────────┘              │
                    │                      ▼
                    │         ┌──────────────────────────┐
                    │         │ Charge to Payment Gateway│
                    │         │ (Stripe/Omise)          │
                    │         └──────────────────────────┘
                    │                      │
                    │                      ▼
                    │         ┌──────────────────────────┐
                    │         │ Payment Verification     │
                    │         │ (Webhook handling)       │
                    │         └──────────────────────────┘
                    │                      │
                    └──────────┬───────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Update Wallet Balance │
                    │ Create Purchase Record│
                    │ Grant Content Access  │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Send Confirmation    │
                    │ Email & Notification │
                    └──────────────────────┘


                    EDUCATOR WITHDRAWAL FLOW
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Request Withdrawal   │
                    │ Amount in Credits    │
                    └──────────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Verify Prerequisites │
                    │ - KYC approved       │
                    │ - Bank account added │
                    │ - Min amount met     │
                    └──────────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Convert Credits→THB  │
                    │ (Real-time rate)     │
                    └──────────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Admin Review         │
                    │ (Fraud checks)       │
                    └──────────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Initiate Payment     │
                    │ (via Omise/Gateway)  │
                    └──────────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Bank Transfer        │
                    │ (1-3 business days)  │
                    └──────────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Update Status        │
                    │ Send Confirmation    │
                    └──────────────────────┘
```

---

## Credit System

### Credit Basics
- **1 Credit** = Base unit of currency in platform
- **Student Cost**: 1 credit ≈ ฿0.50 - ฿2.00 (adjustable)
- **Educator Earn**: Varies by content quality (see AI Valuation)
- **Platform Fee**: 30% of purchase price (70% to educator)

### Credit Tiers & Pricing
```python
CREDIT_PACKAGES = {
    'starter': {
        'credits': 100,
        'price_thb': 99,
        'price_per_credit': 0.99,
        'bonus': 0,
        'discount': '0%'
    },
    'standard': {
        'credits': 500,
        'price_thb': 449,
        'price_per_credit': 0.898,
        'bonus': 50,
        'discount': '10%'
    },
    'professional': {
        'credits': 1000,
        'price_thb': 799,
        'price_per_credit': 0.799,
        'bonus': 200,
        'discount': '20%'
    },
    'enterprise': {
        'credits': 5000,
        'price_thb': 3499,
        'price_per_credit': 0.7,
        'bonus': 1500,
        'discount': '30%'
    }
}
```

---

## Student Purchase Flow

### 1. Purchase Request

```python
# Backend: POST /api/v1/content/{content_id}/purchase

def purchase_content(user_id: str, content_id: str) -> dict:
    """
    Handle student purchasing content with credits.
    """
    # Validate
    content = Content.get(id=content_id)
    if not content or content.status != 'approved':
        raise InvalidContentError()
    
    # Get wallet
    wallet = Wallet.get(user_id=user_id)
    if wallet.balance_credits < content.price_in_credits:
        return {
            'success': False,
            'error': 'Insufficient credits',
            'required': content.price_in_credits,
            'available': wallet.balance_credits,
            'shortfall': content.price_in_credits - wallet.balance_credits
        }
    
    # Check if already purchased
    purchase = Purchase.query.filter_by(
        content_id=content_id,
        buyer_id=user_id
    ).first()
    if purchase:
        return {
            'success': False,
            'error': 'Already purchased',
            'purchase_id': purchase.id
        }
    
    # Deduct credits
    wallet.balance_credits -= content.price_in_credits
    wallet.lifetime_spent_credits += content.price_in_credits
    wallet.save()
    
    # Create purchase record
    purchase = Purchase(
        content_id=content_id,
        buyer_id=user_id,
        price_paid_credits=content.price_in_credits,
        platform_fee_credits=int(content.price_in_credits * 0.30),
        educator_earnings_credits=int(content.price_in_credits * 0.70),
        access_starts_at=datetime.now(),
        access_expires_at=None  # lifetime access
    )
    purchase.save()
    
    # Create transaction (student side)
    Transaction(
        wallet_id=wallet.id,
        type='purchase',
        amount_credits=-content.price_in_credits,
        content_id=content_id,
        description=f"Purchased: {content.title}",
        status='completed'
    ).save()
    
    # Award earnings to educator
    educator_wallet = Wallet.get(user_id=content.user_id)
    educator_wallet.balance_credits += purchase.educator_earnings_credits
    educator_wallet.lifetime_earned_credits += purchase.educator_earnings_credits
    educator_wallet.save()
    
    # Create transaction (educator side)
    Transaction(
        wallet_id=educator_wallet.id,
        type='earn_purchase',
        amount_credits=purchase.educator_earnings_credits,
        content_id=content_id,
        description=f"Earned from sale: {content.title}",
        status='completed'
    ).save()
    
    # Send notifications
    notify_student(user_id, f"Purchase successful: {content.title}")
    notify_educator(content.user_id, f"Sale: {content.title} earned {purchase.educator_earnings_credits} credits")
    
    return {
        'success': True,
        'purchase_id': purchase.id,
        'credits_spent': content.price_in_credits,
        'remaining_balance': wallet.balance_credits
    }
```

### 2. When Student Needs Credits

If student doesn't have enough credits:

```python
# Frontend: Show credit purchase modal
POST /api/v1/payment/purchase-credits

{
    "package": "standard",  # starter, standard, professional, enterprise
    "credits": 500,
    "price_thb": 449,
    "discount_applied": false
}
```

---

## Payment Gateway Integration: Omise (Thailand)

Omise is recommended for Thailand operations (PromptPay, Bank Transfer, Credit Card)

### Configuration

```python
# backend/.env
OMISE_SECRET_KEY=skey_test_...
OMISE_PUBLIC_KEY=pkey_test_...
OMISE_API_BASE_URL=https://api.omise.co

# Fallback (International)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

### Credit Purchase via Omise

```python
# backend/app/services/payment_service.py

import omise

class OmisePaymentService:
    def __init__(self):
        omise.api_secretkey = os.getenv('OMISE_SECRET_KEY')
        self.api_base = os.getenv('OMISE_API_BASE_URL')
    
    def create_payment_intent(self, 
                            user_id: str,
                            amount_thb: int,
                            credits: int,
                            payment_method: str = 'credit_card') -> dict:
        """
        Create Omise payment intent for credit purchase.
        
        Args:
            user_id: Platform user ID
            amount_thb: Amount in Thai Baht
            credits: Number of credits to purchase
            payment_method: 'credit_card', 'promptpay', 'bank_transfer'
        
        Returns:
            Payment intent with client secret for frontend
        """
        try:
            # Create charge
            charge = omise.Charge.create(
                amount=amount_thb * 100,  # Omise expects amount in satang (cents)
                currency='THB',
                description=f'Purchase {credits} credits',
                metadata={
                    'user_id': user_id,
                    'credits': credits,
                    'type': 'credit_purchase',
                    'payment_method': payment_method
                },
                return_uri=f"{os.getenv('FRONTEND_URL')}/payment/callback"
            )
            
            # Store payment intent
            self._log_payment_intent(
                user_id=user_id,
                charge_id=charge.id,
                amount_thb=amount_thb,
                credits=credits,
                status='initiated'
            )
            
            return {
                'success': True,
                'payment_intent_id': charge.id,
                'client_secret': charge.id,  # Omise uses charge ID
                'amount': amount_thb,
                'currency': 'THB',
                'authorize_uri': charge.authorize_uri
            }
        
        except omise.errors.OmiseError as e:
            logger.error(f"Omise payment creation failed: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def confirm_payment(self, charge_id: str, token: str = None) -> dict:
        """
        Confirm payment using Omise token or 3D Secure.
        """
        try:
            charge = omise.Charge.retrieve(charge_id)
            
            if token:
                # Charge with card token
                charge.reload(card=token)
            
            # Check if charge is authorized/captured
            if charge.status in ['successful', 'authorized']:
                # Update wallet
                payment_intent = self._get_payment_intent(charge_id)
                self._award_credits(
                    user_id=payment_intent['user_id'],
                    credits=payment_intent['credits'],
                    charge_id=charge_id
                )
                
                return {
                    'success': True,
                    'charge_id': charge.id,
                    'status': charge.status,
                    'amount': charge.amount / 100,
                    'currency': charge.currency
                }
            else:
                return {
                    'success': False,
                    'error': f"Payment not successful: {charge.status}"
                }
        
        except Exception as e:
            logger.error(f"Payment confirmation failed: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _award_credits(self, user_id: str, credits: int, charge_id: str):
        """Award credits after successful payment."""
        wallet = Wallet.get(user_id=user_id)
        wallet.balance_credits += credits
        wallet.save()
        
        # Create transaction
        Transaction(
            wallet_id=wallet.id,
            type='purchase_credits',
            amount_credits=credits,
            reference_id=charge_id,
            status='completed'
        ).save()
        
        # Send notification
        notify_user(user_id, f"Received {credits} credits!")
    
    def _log_payment_intent(self, **kwargs):
        """Log payment intent for audit trail."""
        PaymentGatewayLog(
            gateway_name='omise',
            **kwargs
        ).save()
```

### Payment Webhook Handler

```python
# backend/app/api/v1/payment.py

@router.post("/payment/omise-webhook")
async def omise_webhook(request: Request):
    """
    Handle Omise webhook callbacks for payment status updates.
    
    Webhook triggers on:
    - Charge authorized
    - Charge captured
    - Charge failed
    - 3D Secure verification
    """
    try:
        payload = await request.json()
        
        # Verify webhook signature
        if not verify_omise_signature(request.headers, payload):
            raise WebhookVerificationError()
        
        event_type = payload.get('key')  # e.g., 'charge.authorized'
        charge_id = payload.get('object', {}).get('id')
        
        if event_type == 'charge.authorized':
            # Credit awarded, confirm payment
            payment_intent = PaymentGatewayLog.get(
                gateway_reference_id=charge_id
            )
            if payment_intent:
                award_credits(
                    user_id=payment_intent.user_id,
                    credits=payment_intent.credits,
                    charge_id=charge_id
                )
        
        elif event_type == 'charge.failed':
            # Update payment status
            PaymentGatewayLog.update(
                gateway_reference_id=charge_id,
                status='failed',
                error_message=payload.get('object', {}).get('failure_message')
            )
        
        return {'success': True}
    
    except Exception as e:
        logger.error(f"Webhook processing error: {e}")
        return {'success': False, 'error': str(e)}
```

### PromptPay Integration

```python
# For PromptPay QR Code payments

class OmisePromptPayService:
    def generate_promptpay_qr(self,
                             amount_thb: int,
                             order_id: str,
                             merchant_id: str) -> dict:
        """
        Generate PromptPay QR code for payment.
        
        PromptPay is Thailand's national interbank system.
        Supports mobile transfers via:
        - Bank mobile apps
        - Mobile payment apps (Apple Pay, Google Pay)
        - ATM transfers
        """
        try:
            charge = omise.Charge.create(
                amount=amount_thb * 100,
                currency='THB',
                description=f'Order: {order_id}',
                source='promptpay',  # PromptPay source
                metadata={'order_id': order_id}
            )
            
            # Generate QR code
            qr_code = generate_qr_code(charge.authorize_uri)
            
            return {
                'success': True,
                'charge_id': charge.id,
                'qr_code': qr_code,
                'authorize_uri': charge.authorize_uri,
                'amount': amount_thb,
                'currency': 'THB',
                'expires_at': datetime.now() + timedelta(hours=1)
            }
        
        except Exception as e:
            logger.error(f"PromptPay QR generation failed: {e}")
            return {'success': False, 'error': str(e)}
```

---

## Educator Withdrawal: Credits → Thai Baht

### Withdrawal Request

```python
# POST /api/v1/wallet/withdrawal-request

def request_withdrawal(user_id: str, 
                      amount_credits: int,
                      bank_account_id: str) -> dict:
    """
    Request withdrawal of credits as Thai Baht.
    
    Validation:
    1. User must be KYC approved
    2. Bank account must be verified
    3. Amount must meet minimum threshold
    4. No pending withdrawal in progress
    """
    
    # Verify prerequisites
    user = User.get(id=user_id)
    if user.kyc_status != 'approved':
        raise KYCNotApprovedError()
    
    bank_account = BankAccount.get(id=bank_account_id)
    if not bank_account.is_verified:
        raise BankAccountNotVerifiedError()
    
    if amount_credits < 100:  # Minimum withdrawal
        raise MinimumWithdrawalError()
    
    wallet = Wallet.get(user_id=user_id)
    if wallet.balance_credits < amount_credits:
        raise InsufficientBalanceError()
    
    # Get current exchange rate (Credits to THB)
    exchange_rate = get_exchange_rate()  # e.g., 1 credit = 0.75 THB
    amount_thb = amount_credits * exchange_rate
    
    # Calculate fees
    platform_fee_thb = calculate_platform_fee(amount_thb)  # e.g., 2% = 20 THB
    transfer_fee_thb = get_bank_transfer_fee(bank_account.bank_name)
    net_amount_thb = amount_thb - platform_fee_thb - transfer_fee_thb
    
    # Create withdrawal request
    withdrawal = WithdrawalRequest(
        user_id=user_id,
        bank_account_id=bank_account_id,
        amount_credits=amount_credits,
        amount_thb=amount_thb,
        exchange_rate_used=exchange_rate,
        platform_fee_thb=platform_fee_thb,
        net_amount_thb=net_amount_thb,
        status='pending',
        approval_required=True  # Requires manual admin approval
    )
    withdrawal.save()
    
    # Deduct from wallet (pending)
    wallet.pending_credits += amount_credits
    wallet.save()
    
    # Notify admin for review
    notify_admin(
        f"New withdrawal request: {user.username} - ฿{net_amount_thb}",
        withdrawal_id=withdrawal.id
    )
    
    return {
        'success': True,
        'withdrawal_id': withdrawal.id,
        'status': 'pending_approval',
        'amount_credits': amount_credits,
        'amount_thb': amount_thb,
        'fees': {
            'platform_fee_thb': platform_fee_thb,
            'transfer_fee_thb': transfer_fee_thb,
            'total_fees_thb': platform_fee_thb + transfer_fee_thb
        },
        'net_amount_thb': net_amount_thb,
        'estimated_arrival': 'Next business day'
    }
```

### Admin Approval & Processing

```python
# Admin endpoint to approve/reject withdrawal

def approve_withdrawal(withdrawal_id: str, admin_id: str) -> dict:
    """
    Admin approves withdrawal for processing.
    
    Checks:
    1. Verify withdrawal exists
    2. Check for fraud flags
    3. Confirm funds available
    4. Initiate payment gateway transfer
    """
    
    withdrawal = WithdrawalRequest.get(id=withdrawal_id)
    
    # Fraud checks
    if is_flagged_for_fraud(withdrawal.user_id):
        return {
            'success': False,
            'error': 'Fraud flag detected',
            'action_required': 'Manual review'
        }
    
    # Process payment via Omise
    payment_result = initiate_bank_transfer_via_omise(
        bank_account=withdrawal.bank_account,
        amount_thb=int(withdrawal.net_amount_thb),
        reference=withdrawal.id
    )
    
    if not payment_result['success']:
        withdrawal.status = 'failed'
        withdrawal.updated_at = datetime.now()
        withdrawal.save()
        return {'success': False, 'error': payment_result['error']}
    
    # Update withdrawal status
    withdrawal.status = 'processing'
    withdrawal.approved_by_admin_id = admin_id
    withdrawal.approval_timestamp = datetime.now()
    withdrawal.payment_reference = payment_result['transfer_id']
    withdrawal.gateway_name = 'omise'
    withdrawal.gateway_response = payment_result
    withdrawal.save()
    
    # Create audit log
    AuditLog(
        user_id=admin_id,
        action='approve_withdrawal',
        entity_type='withdrawal',
        entity_id=withdrawal_id,
        new_values={'status': 'processing'}
    ).save()
    
    # Notify educator
    notify_educator(
        user_id=withdrawal.user_id,
        title='Withdrawal Approved',
        message=f'Your ฿{withdrawal.net_amount_thb} withdrawal has been approved and will arrive in 1-3 business days.'
    )
    
    return {
        'success': True,
        'withdrawal_id': withdrawal_id,
        'status': 'processing',
        'transfer_id': payment_result['transfer_id']
    }


def reject_withdrawal(withdrawal_id: str, admin_id: str, reason: str) -> dict:
    """
    Admin rejects withdrawal request.
    Credits are refunded to wallet.
    """
    
    withdrawal = WithdrawalRequest.get(id=withdrawal_id)
    
    # Refund credits
    wallet = Wallet.get(user_id=withdrawal.user_id)
    wallet.pending_credits -= withdrawal.amount_credits
    wallet.balance_credits += withdrawal.amount_credits
    wallet.save()
    
    # Update withdrawal
    withdrawal.status = 'rejected'
    withdrawal.rejection_reason = reason
    withdrawal.rejected_at = datetime.now()
    withdrawal.save()
    
    # Create refund transaction
    Transaction(
        wallet_id=wallet.id,
        type='withdrawal_rejection_refund',
        amount_credits=withdrawal.amount_credits,
        reference_id=withdrawal_id,
        description=f'Withdrawal rejected: {reason}'
    ).save()
    
    # Notify educator
    notify_educator(
        user_id=withdrawal.user_id,
        title='Withdrawal Rejected',
        message=f'Your withdrawal request was rejected: {reason}. Credits have been refunded to your wallet.'
    )
    
    return {'success': True}
```

### Bank Transfer via Omise

```python
# backend/app/services/omise_service.py

def initiate_bank_transfer_via_omise(bank_account, amount_thb: int, reference: str) -> dict:
    """
    Transfer funds to educator's bank account via Omise.
    
    Omise supports transfers to Thai banks via PromptPay ID or account number.
    """
    try:
        # Create transfer
        transfer = omise.Transfer.create(
            amount=amount_thb * 100,  # satang
            currency='THB',
            recipient={
                'name': bank_account.account_holder,
                'type': 'individual',
                'account_number': bank_account.account_number,
                'bank_code': get_bank_code(bank_account.bank_name),
                'branch_code': bank_account.branch_code
            },
            description=f'Withdrawal: {reference}',
            metadata={'withdrawal_id': reference}
        )
        
        logger.info(f"Transfer initiated: {transfer.id} for {reference}")
        
        return {
            'success': True,
            'transfer_id': transfer.id,
            'status': transfer.status,
            'amount': transfer.amount / 100,
            'currency': transfer.currency
        }
    
    except omise.errors.OmiseError as e:
        logger.error(f"Bank transfer failed: {e}")
        return {
            'success': False,
            'error': str(e),
            'error_code': e.code
        }
```

---

## Webhook Handling & Reconciliation

```python
# Handle payment status updates

@router.post("/payment/webhook")
async def payment_webhook(request: Request):
    """
    Handle payment gateway webhooks.
    
    For Omise, Stripe, etc.
    """
    payload = await request.json()
    gateway = determine_gateway(request.headers)
    
    if gateway == 'omise':
        await handle_omise_webhook(payload)
    elif gateway == 'stripe':
        await handle_stripe_webhook(payload)
    
    return {'success': True}


async def handle_omise_webhook(payload: dict):
    """
    Process Omise webhook.
    
    Events:
    - charge.authorized: Payment authorized
    - charge.captured: Payment captured
    - transfer.complete: Bank transfer completed
    - transfer.failed: Bank transfer failed
    """
    
    event_key = payload.get('key')
    object_data = payload.get('object', {})
    
    if event_key == 'charge.authorized' or event_key == 'charge.captured':
        # Credit purchase successful
        charge_id = object_data.get('id')
        payment_log = PaymentGatewayLog.get(gateway_reference_id=charge_id)
        
        if payment_log and payment_log.status != 'success':
            # Award credits
            award_credits(
                user_id=payment_log.user_id,
                credits=payment_log.credits,
                charge_id=charge_id
            )
            payment_log.status = 'success'
            payment_log.save()
    
    elif event_key == 'transfer.complete':
        # Withdrawal successful
        transfer_id = object_data.get('id')
        withdrawal = WithdrawalRequest.get(payment_reference=transfer_id)
        
        if withdrawal:
            withdrawal.status = 'completed'
            withdrawal.completed_at = datetime.now()
            withdrawal.save()
            
            # Update wallet
            wallet = Wallet.get(user_id=withdrawal.user_id)
            wallet.pending_credits -= withdrawal.amount_credits
            wallet.lifetime_withdrawn_thb += withdrawal.net_amount_thb
            wallet.save()
            
            # Notify educator
            notify_educator(
                user_id=withdrawal.user_id,
                title='Withdrawal Complete',
                message=f'฿{withdrawal.net_amount_thb} transferred to your bank account.'
            )
    
    elif event_key == 'transfer.failed':
        # Withdrawal failed - refund credits
        transfer_id = object_data.get('id')
        withdrawal = WithdrawalRequest.get(payment_reference=transfer_id)
        
        if withdrawal:
            withdrawal.status = 'failed'
            withdrawal.save()
            
            # Refund credits
            wallet = Wallet.get(user_id=withdrawal.user_id)
            wallet.pending_credits -= withdrawal.amount_credits
            wallet.balance_credits += withdrawal.amount_credits
            wallet.save()
            
            # Create refund transaction
            Transaction(
                wallet_id=wallet.id,
                type='withdrawal_failure_refund',
                amount_credits=withdrawal.amount_credits,
                reference_id=transfer_id,
                description='Withdrawal failed - funds refunded'
            ).save()
```

---

## Fraud Detection & Security

```python
# backend/app/services/fraud_detection_service.py

class FraudDetectionService:
    
    FRAUD_FLAGS = {
        'high_volume_purchase': {'threshold': 10000, 'credits': 24},  # 10k+ credits in 24h
        'frequent_withdrawals': {'threshold': 5, 'period_hours': 24},  # 5+ withdrawals daily
        'unusual_location': {'threshold': 3},  # Countries changed 3+ times in 1 day
        'rapid_transactions': {'threshold': 10, 'seconds': 60},  # 10+ transactions in 60s
        'new_bank_account_withdrawal': {'days': 30},  # New account withdrawal within 30 days
    }
    
    def check_fraud_score(self, user_id: str, transaction_type: str, amount: int) -> dict:
        """
        Calculate fraud risk score for transaction.
        
        Returns:
            {
                'fraud_score': 0-100,
                'risk_level': 'low', 'medium', 'high',
                'flags': [...],
                'requires_review': bool,
                'requires_2fa': bool
            }
        """
        flags = []
        fraud_score = 0
        
        # Check high volume purchases
        if transaction_type == 'purchase_credits':
            recent_volume = self._get_24h_purchase_volume(user_id)
            if recent_volume + amount > self.FRAUD_FLAGS['high_volume_purchase']['threshold']:
                flags.append('high_volume_purchase')
                fraud_score += 30
        
        # Check frequent withdrawals
        if transaction_type == 'withdrawal':
            withdrawal_count = self._get_24h_withdrawal_count(user_id)
            if withdrawal_count >= self.FRAUD_FLAGS['frequent_withdrawals']['threshold']:
                flags.append('frequent_withdrawals')
                fraud_score += 25
        
        # Check new bank account with withdrawal
        if transaction_type == 'withdrawal':
            bank_account = self._get_latest_bank_account(user_id)
            days_since_added = (datetime.now() - bank_account.created_at).days
            if days_since_added < self.FRAUD_FLAGS['new_bank_account_withdrawal']['days']:
                flags.append('new_bank_account_withdrawal')
                fraud_score += 20
        
        # Check rapid transactions
        rapid_count = self._get_rapid_transaction_count(user_id, seconds=60)
        if rapid_count > self.FRAUD_FLAGS['rapid_transactions']['threshold']:
            flags.append('rapid_transactions')
            fraud_score += 15
        
        # Determine risk level
        if fraud_score >= 70:
            risk_level = 'high'
            requires_review = True
            requires_2fa = True
        elif fraud_score >= 40:
            risk_level = 'medium'
            requires_review = False
            requires_2fa = True
        else:
            risk_level = 'low'
            requires_review = False
            requires_2fa = False
        
        return {
            'fraud_score': fraud_score,
            'risk_level': risk_level,
            'flags': flags,
            'requires_review': requires_review,
            'requires_2fa': requires_2fa
        }
```

---

## Exchange Rate Management

```python
# backend/app/services/exchange_rate_service.py

class ExchangeRateService:
    
    def get_current_rate(self) -> float:
        """
        Get current credit-to-THB exchange rate.
        
        Default: 1 Credit = 0.75 THB
        
        Can be dynamically adjusted based on:
        - Supply/demand
        - USD/THB rate
        - Platform economics
        """
        # Check cache first
        cached_rate = redis.get('exchange_rate:credit_to_thb')
        if cached_rate:
            return float(cached_rate)
        
        # Get from database
        rate = ExchangeRate.query.order_by(
            ExchangeRate.updated_at.desc()
        ).first()
        
        if not rate:
            rate = ExchangeRate(rate=0.75, source='system_default')
            rate.save()
        
        # Cache for 1 hour
        redis.setex('exchange_rate:credit_to_thb', 3600, rate.rate)
        
        return rate.rate
    
    def update_rate(self, new_rate: float, reason: str = 'manual_adjustment'):
        """
        Update exchange rate (admin only).
        """
        rate = ExchangeRate(
            rate=new_rate,
            source=reason,
            updated_by_admin_id=admin_id,
            updated_at=datetime.now()
        )
        rate.save()
        
        # Invalidate cache
        redis.delete('exchange_rate:credit_to_thb')
        
        # Audit log
        AuditLog(
            action='update_exchange_rate',
            entity_type='exchange_rate',
            old_values={'rate': old_rate},
            new_values={'rate': new_rate, 'reason': reason}
        ).save()
```

---

## Summary of Payment States

| Transaction Type | From State | To State | Duration |
|-----------------|-----------|----------|----------|
| Credit Purchase | pending | completed | Real-time to 5 mins |
| Content Purchase | pending | completed | Real-time |
| Withdrawal | pending | processing | 1-2 hours (manual review) |
| Withdrawal | processing | completed | 1-3 business days |

---

## Security Best Practices

1. **PCI Compliance**: Use payment gateway, never store card details
2. **Encryption**: All payment data encrypted in transit (TLS 1.3)
3. **Rate Limiting**: Limit withdrawal requests (1 per day per user)
4. **2FA for Withdrawals**: Require 2FA for withdrawal requests
5. **Audit Logs**: All payment events logged for compliance
6. **Fraud Monitoring**: Real-time fraud detection and alerts
7. **Webhook Verification**: Verify all incoming webhooks
8. **Reconciliation**: Daily reconciliation with payment gateway
