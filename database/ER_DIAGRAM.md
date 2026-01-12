# Database Schema & ER Diagram

## ER Diagram (ASCII Art)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MIND MINE MONEY DATABASE                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│     USERS        │
├──────────────────┤
│ PK: id           │
│ username         │
│ email            │
│ password_hash    │
│ role             │◄──────────┐
│ kyc_status       │           │
│ is_verified      │           │
│ created_at       │           │
│ updated_at       │           │
└──────────────────┘           │
        │                      │
        │ 1:1                  │
        ├──────────────────────┤
        │                      │
┌──────────────────────┐    ┌──────────────────────┐
│   USER_PROFILES      │    │  BANK_ACCOUNTS       │
├──────────────────────┤    ├──────────────────────┤
│ PK: id               │    │ PK: id               │
│ FK: user_id          │    │ FK: user_id          │
│ first_name           │    │ bank_name            │
│ last_name            │    │ account_number       │
│ phone                │    │ account_holder       │
│ avatar_url           │    │ is_primary           │
│ bio                  │    │ verified             │
│ country              │    │ created_at           │
│ city                 │    └──────────────────────┘
│ website              │
│ created_at           │
└──────────────────────┘
        │
        │ 1:N
        │
┌──────────────────────┐
│      CONTENT         │
├──────────────────────┤
│ PK: id               │
│ FK: user_id (educator)
│ title                │
│ description          │
│ content_type (video, pdf, goodnotes)
│ file_url             │
│ thumbnail_url        │
│ duration (for video) │
│ page_count (for pdf) │
│ price_in_credits     │
│ status (draft, pending_review, approved, rejected)
│ created_at           │
│ updated_at           │
│ deleted_at (soft delete)
└──────────────────────┘
        │
        │ 1:N
        └─────────────────────┬───────────────────┬──────────────┐
                              │                   │              │
                ┌──────────────────────┐ ┌─────────────────────┐  │
                │ CONTENT_METADATA     │ │ CONTENT_SCORES      │  │
                ├──────────────────────┤ ├─────────────────────┤  │
                │ PK: id               │ │ PK: id              │  │
                │ FK: content_id       │ │ FK: content_id      │  │
                │ transcript           │ │ match_percentage    │  │
                │ extracted_text       │ │ keyword_matches     │  │
                │ ocr_text             │ │ score_breakdown     │  │
                │ processing_status    │ │ credits_awarded     │  │
                │ language             │ │ created_at          │  │
                │ created_at           │ │                     │  │
                └──────────────────────┘ └─────────────────────┘  │
                                                                   │
                                          ┌────────────────────────┘
                                          │
                                ┌─────────────────────┐
                                │   VIEWS             │
                                ├─────────────────────┤
                                │ PK: id              │
                                │ FK: content_id      │
                                │ FK: user_id (student)
                                │ watched_at          │
                                │ duration_watched    │
                                │ percentage_watched  │
                                └─────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────┐
│                    CURRICULUM STANDARDS                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ PK: id                                                                       │
│ subject (Mathematics, Physics, Chemistry, etc.)                             │
│ grade_level (1-12, Undergrad, etc.)                                         │
│ keywords (comma-separated or JSON array)                                    │
│ topics (JSON structure)                                                      │
│ curriculum_type (National, IB, AP, Thailand-specific, etc.)                 │
│ description                                                                  │
│ created_at, updated_at                                                      │
└──────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────┐
│      WALLETS        │
├─────────────────────┤
│ PK: id              │
│ FK: user_id         │
│ balance_credits     │
│ lifetime_earned     │
│ lifetime_spent      │
│ last_updated        │
│ created_at          │
└─────────────────────┘
        │
        │ 1:N
        │
┌─────────────────────────────────────────┐
│         TRANSACTIONS                    │
├─────────────────────────────────────────┤
│ PK: id                                  │
│ FK: wallet_id                           │
│ FK: content_id (NULL for withdrawals)   │
│ type (earn, purchase, withdrawal_fee)   │
│ amount_credits                          │
│ description                             │
│ reference_id (for linking to content)   │
│ status (pending, completed, failed)     │
│ created_at                              │
│ metadata (JSON - additional info)       │
└─────────────────────────────────────────┘


┌─────────────────────────────────────────────┐
│      WITHDRAWAL_REQUESTS                    │
├─────────────────────────────────────────────┤
│ PK: id                                      │
│ FK: user_id                                 │
│ FK: bank_account_id                         │
│ amount_credits                              │
│ amount_thb (converted)                      │
│ exchange_rate_used                          │
│ status (pending, approved, processing, completed, rejected)
│ payment_reference (from gateway)            │
│ rejection_reason                            │
│ created_at                                  │
│ completed_at                                │
│ metadata (JSON - gateway response)          │
└─────────────────────────────────────────────┘


┌─────────────────────────────────────────────┐
│      PURCHASES                              │
├─────────────────────────────────────────────┤
│ PK: id                                      │
│ FK: content_id                              │
│ FK: buyer_id (student)                      │
│ price_paid_credits                          │
│ purchased_at                                │
│ access_expires_at (NULL = lifetime)         │
│ metadata (JSON - purchase details)          │
└─────────────────────────────────────────────┘


┌──────────────────────────────────────────────┐
│    PAYMENT_GATEWAY_LOGS                      │
├──────────────────────────────────────────────┤
│ PK: id                                       │
│ FK: transaction_id                           │
│ gateway_name (omise, stripe, promptpay)      │
│ gateway_reference_id                         │
│ request_payload (JSON)                       │
│ response_payload (JSON)                      │
│ status (initiated, success, failed, pending) │
│ error_message                                │
│ created_at                                   │
└──────────────────────────────────────────────┘


┌──────────────────────────────────────────────┐
│         AUDIT_LOGS                           │
├──────────────────────────────────────────────┤
│ PK: id                                       │
│ FK: user_id (who performed action, nullable) │
│ action (create, update, delete, approve)     │
│ entity_type (content, user, wallet)          │
│ entity_id                                    │
│ old_values (JSON)                            │
│ new_values (JSON)                            │
│ ip_address                                   │
│ user_agent                                   │
│ created_at                                   │
└──────────────────────────────────────────────┘
```

---

## Detailed Table Definitions

### 1. USERS
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student', -- 'student', 'educator', 'admin', 'moderator'
    kyc_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. USER_PROFILES
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    bio TEXT,
    country VARCHAR(50),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    website VARCHAR(255),
    social_links JSONB DEFAULT '{}', -- {github, linkedin, twitter, etc}
    preferences JSONB DEFAULT '{}', -- {theme, notifications, language, etc}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

### 3. BANK_ACCOUNTS
```sql
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder VARCHAR(150) NOT NULL,
    account_type VARCHAR(20), -- 'checking', 'savings', 'business'
    branch_code VARCHAR(20),
    swift_code VARCHAR(20),
    is_primary BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_method VARCHAR(50), -- 'micro_deposit', 'one_time_transfer'
    verification_timestamp TIMESTAMP,
    last_used_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (user_id, account_number)
);

CREATE INDEX idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX idx_bank_accounts_primary ON bank_accounts(user_id, is_primary);
```

### 4. CONTENT
```sql
CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id), -- educator who uploaded
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(20) NOT NULL, -- 'video', 'pdf', 'goodnotes'
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    thumbnail_url TEXT,
    
    -- Video specific
    duration_seconds INT,
    video_quality VARCHAR(20), -- '1080p', '720p', etc
    
    -- Document specific
    page_count INT,
    
    -- Pricing & Availability
    price_in_credits INT NOT NULL DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    
    -- Status
    status VARCHAR(30) NOT NULL DEFAULT 'draft', -- 'draft', 'pending_review', 'approved', 'rejected', 'archived'
    rejection_reason TEXT,
    
    -- Metadata
    tags JSONB DEFAULT '[]',
    subject VARCHAR(100),
    grade_level VARCHAR(50),
    language VARCHAR(20) DEFAULT 'en',
    
    -- Stats
    view_count INT DEFAULT 0,
    purchase_count INT DEFAULT 0,
    rating_average DECIMAL(3,2),
    rating_count INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT status_check CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'archived'))
);

CREATE INDEX idx_content_user_id ON content(user_id);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_created_at ON content(created_at);
CREATE INDEX idx_content_published ON content(is_published, status);
CREATE INDEX idx_content_subject ON content(subject);
CREATE FULLTEXT INDEX idx_content_search ON content(title, description);
```

### 5. CONTENT_METADATA
```sql
CREATE TABLE content_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL UNIQUE REFERENCES content(id) ON DELETE CASCADE,
    
    -- Extracted data
    transcript TEXT, -- full transcript (if video)
    extracted_text TEXT, -- full text from OCR or document
    
    -- Processing info
    processing_status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    processing_started_at TIMESTAMP,
    processing_completed_at TIMESTAMP,
    processing_error TEXT,
    
    -- Language & encoding
    detected_language VARCHAR(20),
    text_encoding VARCHAR(50),
    
    -- Metrics
    word_count INT,
    reading_time_minutes INT,
    
    -- Additional data
    metadata JSONB DEFAULT '{}', -- generic metadata storage
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_metadata_content_id ON content_metadata(content_id);
CREATE INDEX idx_content_metadata_processing_status ON content_metadata(processing_status);
CREATE INDEX idx_content_metadata_language ON content_metadata(detected_language);
```

### 6. CURRICULUM_STANDARDS
```sql
CREATE TABLE curriculum_standards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(100) NOT NULL,
    grade_level VARCHAR(50), -- '1', '2', ..., '12', 'Undergrad', etc
    curriculum_type VARCHAR(50) NOT NULL, -- 'Thailand_National', 'IB', 'AP', 'IGCSE'
    
    -- Keywords for matching
    keywords TEXT[], -- array of keywords
    keywords_weight JSONB DEFAULT '{}', -- {keyword: weight}
    
    -- Topics structure
    topics JSONB NOT NULL, -- {topic_name: {subtopics: [], keywords: []}}
    
    description TEXT,
    source_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (subject, grade_level, curriculum_type)
);

CREATE INDEX idx_curriculum_subject_grade ON curriculum_standards(subject, grade_level);
CREATE INDEX idx_curriculum_type ON curriculum_standards(curriculum_type);
CREATE INDEX idx_curriculum_keywords ON curriculum_standards USING GIN(keywords);
```

### 7. CONTENT_SCORES
```sql
CREATE TABLE content_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL UNIQUE REFERENCES content(id) ON DELETE CASCADE,
    curriculum_id UUID REFERENCES curriculum_standards(id),
    
    -- Score breakdown
    match_percentage DECIMAL(5,2) NOT NULL, -- 0-100
    keyword_match_count INT,
    keyword_total_possible INT,
    similarity_score DECIMAL(5,4), -- 0-1 (from embeddings)
    
    -- Calculation details
    score_breakdown JSONB DEFAULT '{}', -- {curriculum_match: %, similarity: %, etc}
    matched_keywords JSONB DEFAULT '[]', -- [keyword, keyword, ...]
    
    -- Credits calculation
    credits_awarded INT NOT NULL,
    credit_calculation_details JSONB DEFAULT '{}',
    
    -- Status
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by_admin_id UUID REFERENCES users(id),
    verification_note TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP
);

CREATE INDEX idx_content_scores_content_id ON content_scores(content_id);
CREATE INDEX idx_content_scores_match_percentage ON content_scores(match_percentage DESC);
CREATE INDEX idx_content_scores_curriculum_id ON content_scores(curriculum_id);
```

### 8. WALLETS
```sql
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    
    -- Balances
    balance_credits BIGINT DEFAULT 0, -- in smallest unit (like cents)
    pending_credits BIGINT DEFAULT 0, -- credits awaiting processing
    
    -- Statistics
    lifetime_earned_credits BIGINT DEFAULT 0,
    lifetime_spent_credits BIGINT DEFAULT 0,
    lifetime_withdrawn_thb DECIMAL(12,2) DEFAULT 0,
    
    -- Dates
    last_transaction_at TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_balance ON wallets(balance_credits);
```

### 9. TRANSACTIONS
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    
    -- Related entity
    content_id UUID REFERENCES content(id),
    related_transaction_id UUID REFERENCES transactions(id),
    
    -- Transaction details
    type VARCHAR(30) NOT NULL, -- 'earn_upload', 'earn_view', 'purchase', 'withdrawal_fee', 'platform_fee', 'refund', 'adjustment'
    amount_credits BIGINT NOT NULL,
    description VARCHAR(255),
    
    -- Status
    status VARCHAR(30) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'cancelled'
    
    -- Additional info
    reference_id VARCHAR(100), -- for linking to external systems
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT transaction_type_check CHECK (type IN ('earn_upload', 'earn_view', 'purchase', 'withdrawal_fee', 'platform_fee', 'refund', 'adjustment'))
);

CREATE INDEX idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX idx_transactions_content_id ON transactions(content_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_status ON transactions(status);
```

### 10. WITHDRAWAL_REQUESTS
```sql
CREATE TABLE withdrawal_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    bank_account_id UUID NOT NULL REFERENCES bank_accounts(id),
    
    -- Amount
    amount_credits BIGINT NOT NULL,
    amount_thb DECIMAL(12,2) NOT NULL,
    exchange_rate_used DECIMAL(10,6),
    platform_fee_thb DECIMAL(10,2) DEFAULT 0,
    net_amount_thb DECIMAL(12,2),
    
    -- Status & Processing
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'processing', 'completed', 'rejected', 'failed'
    approval_required BOOLEAN DEFAULT TRUE,
    
    approved_by_admin_id UUID REFERENCES users(id),
    approval_timestamp TIMESTAMP,
    approval_note TEXT,
    
    rejection_reason TEXT,
    rejected_at TIMESTAMP,
    
    -- Payment gateway
    payment_reference VARCHAR(100), -- from Omise/Stripe
    gateway_name VARCHAR(50), -- 'omise', 'stripe', 'promptpay'
    gateway_response JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    
    CONSTRAINT status_check CHECK (status IN ('pending', 'approved', 'processing', 'completed', 'rejected', 'failed'))
);

CREATE INDEX idx_withdrawal_requests_user_id ON withdrawal_requests(user_id);
CREATE INDEX idx_withdrawal_requests_status ON withdrawal_requests(status);
CREATE INDEX idx_withdrawal_requests_created_at ON withdrawal_requests(created_at);
```

### 11. VIEWS
```sql
CREATE TABLE views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Watching info
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_watched_seconds INT,
    percentage_watched DECIMAL(5,2), -- 0-100
    
    -- Device info
    device_type VARCHAR(50), -- 'mobile', 'tablet', 'desktop'
    browser VARCHAR(100),
    ip_address VARCHAR(45),
    
    session_id VARCHAR(255),
    is_completed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_views_content_id ON views(content_id);
CREATE INDEX idx_views_user_id ON views(user_id);
CREATE INDEX idx_views_watched_at ON views(watched_at);
CREATE INDEX idx_views_completed ON views(is_completed);
```

### 12. PURCHASES
```sql
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES content(id),
    buyer_id UUID NOT NULL REFERENCES users(id),
    
    -- Purchase info
    price_paid_credits BIGINT NOT NULL,
    platform_fee_credits BIGINT DEFAULT 0,
    educator_earnings_credits BIGINT NOT NULL,
    
    -- Access
    access_starts_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    access_expires_at TIMESTAMP, -- NULL means lifetime access
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    refunded BOOLEAN DEFAULT FALSE,
    refund_reason TEXT,
    refunded_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (content_id, buyer_id)
);

CREATE INDEX idx_purchases_content_id ON purchases(content_id);
CREATE INDEX idx_purchases_buyer_id ON purchases(buyer_id);
CREATE INDEX idx_purchases_created_at ON purchases(created_at);
CREATE INDEX idx_purchases_access_valid ON purchases(is_active, access_expires_at);
```

### 13. PAYMENT_GATEWAY_LOGS
```sql
CREATE TABLE payment_gateway_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES transactions(id),
    withdrawal_id UUID REFERENCES withdrawal_requests(id),
    
    gateway_name VARCHAR(50) NOT NULL, -- 'omise', 'stripe', 'promptpay'
    gateway_reference_id VARCHAR(100),
    
    -- Request/Response
    request_payload JSONB,
    response_payload JSONB,
    
    -- Status
    status VARCHAR(30) NOT NULL, -- 'initiated', 'pending', 'success', 'failed'
    error_code VARCHAR(50),
    error_message TEXT,
    
    -- Retry logic
    retry_count INT DEFAULT 0,
    next_retry_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payment_logs_gateway ON payment_gateway_logs(gateway_name);
CREATE INDEX idx_payment_logs_reference ON payment_gateway_logs(gateway_reference_id);
CREATE INDEX idx_payment_logs_transaction ON payment_gateway_logs(transaction_id);
CREATE INDEX idx_payment_logs_status ON payment_gateway_logs(status);
```

### 14. AUDIT_LOGS
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id), -- who performed the action (nullable for system actions)
    
    -- Action info
    action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'approve', 'reject', 'login', 'logout'
    entity_type VARCHAR(50) NOT NULL, -- 'user', 'content', 'withdrawal', 'payment'
    entity_id UUID,
    
    -- Changes
    old_values JSONB,
    new_values JSONB,
    changes_summary TEXT,
    
    -- Request info
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

## Relationships Summary

| From | To | Type | Cardinality | FK Column |
|------|----|----|------------|-----------|
| users | user_profiles | One-to-One | 1:1 | user_id |
| users | bank_accounts | One-to-Many | 1:N | user_id |
| users | content | One-to-Many | 1:N | user_id (educator) |
| users | wallets | One-to-One | 1:1 | user_id |
| users | views | One-to-Many | 1:N | user_id (student) |
| users | purchases | One-to-Many | 1:N | buyer_id |
| content | content_metadata | One-to-One | 1:1 | content_id |
| content | content_scores | One-to-One | 1:1 | content_id |
| content | views | One-to-Many | 1:N | content_id |
| content | purchases | One-to-Many | 1:N | content_id |
| curriculum_standards | content_scores | One-to-Many | 1:N | curriculum_id |
| wallets | transactions | One-to-Many | 1:N | wallet_id |
| bank_accounts | withdrawal_requests | One-to-Many | 1:N | bank_account_id |
| withdrawal_requests | payment_gateway_logs | One-to-Many | 1:N | withdrawal_id |
| transactions | payment_gateway_logs | One-to-Many | 1:N | transaction_id |

---

## Key Constraints & Business Rules

1. **User Verification**: A user must be verified before uploading content
2. **KYC for Withdrawal**: User must be KYC-approved to request withdrawal
3. **Content Approval**: Content requires admin approval before being visible to students
4. **Unique Bank Account**: One user can have multiple bank accounts, but only one primary
5. **Credit Balance**: Cannot have negative balance (validation at application level)
6. **Withdrawal Minimum**: Implement minimum withdrawal threshold (e.g., 100 credits)
7. **Purchase Access**: Student can access purchased content within access period
8. **View Tracking**: Only valid views (with minimum watch time) count toward earnings

---

## Indexes Strategy

- **User lookups**: username, email, role
- **Content discovery**: status, published_at, subject, full-text search
- **Transaction tracking**: wallet_id, created_at, type, status
- **Withdrawal processing**: status, created_at
- **Audit trail**: created_at, user_id, entity_type

All timestamps and frequently filtered fields have indexes for optimal query performance.
