# Mind Mine Money - Technical Architecture & Deployment Guide

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         MIND MINE MONEY STACK                          │
└─────────────────────────────────────────────────────────────────────────┘

                        FRONTEND TIER
                    (Next.js 14 + React 18)
                            │
                            ▼
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
    ┌────────────┐                    ┌──────────────────┐
    │ Vercel CDN │                    │ Next.js API      │
    │ (Static)   │                    │ Routes           │
    └────────────┘                    └──────────────────┘
                                            │
                                            ▼
                        API GATEWAY TIER (REST/GraphQL)
                                            │
                ┌───────────────────────────┼───────────────────────────┐
                │                           │                           │
                ▼                           ▼                           ▼
        ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
        │ FastAPI      │          │ FastAPI      │          │ FastAPI      │
        │ Auth Service │          │ Content Svc  │          │ Payment Svc  │
        └──────────────┘          └──────────────┘          └──────────────┘
                │                           │                           │
                └───────────────────────────┼───────────────────────────┘
                                            │
                    BACKGROUND PROCESSING (Celery + Redis)
                                            │
                ┌───────────────────────────┼───────────────────────────┐
                │                           │                           │
                ▼                           ▼                           ▼
        ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
        │ Content      │          │ Credit       │          │ Payment      │
        │ Processing   │          │ Calculation  │          │ Settlement   │
        │ Workers      │          │ Workers      │          │ Workers      │
        └──────────────┘          └──────────────┘          └──────────────┘
                │
                ▼
        ┌──────────────────┐
        │  AI Services     │
        │  (Whisper, OCR)  │
        └──────────────────┘
                │
                ▼
        ┌──────────────────────┐
        │ Database Layer       │
        ├──────────────────────┤
        │ PostgreSQL 15        │
        │ ├─ Users            │
        │ ├─ Content          │
        │ ├─ Wallets          │
        │ ├─ Transactions     │
        │ └─ Curriculum       │
        └──────────────────────┘
                │
        ┌───────┴────────┬────────────┬────────────┐
        │                │            │            │
        ▼                ▼            ▼            ▼
    ┌─────────┐    ┌─────────┐  ┌────────┐  ┌─────────┐
    │ Redis   │    │ S3/GCS  │  │ElasticS│  │Firebase │
    │ Cache & │    │File     │  │earch   │  │Messaging│
    │  Queue  │    │Storage  │  │        │  │         │
    └─────────┘    └─────────┘  └────────┘  └─────────┘
```

---

## 2. Technology Decisions

### Why These Choices?

**Frontend: Next.js 14**
- ✅ Full-stack React with built-in API routes
- ✅ Server-side rendering for SEO
- ✅ Automatic code splitting & optimization
- ✅ Edge deployment (Vercel)

**Backend: FastAPI + Python**
- ✅ Perfect for AI/ML integration (TensorFlow, Whisper, PyPDF2)
- ✅ Async support for high concurrency
- ✅ Automatic API documentation (Swagger)
- ✅ Type hints for safety

**Database: PostgreSQL**
- ✅ ACID transactions for financial data
- ✅ JSONB support for flexible metadata
- ✅ Full-text search for content discovery
- ✅ Mature, battle-tested for production

**Message Queue: Celery + Redis**
- ✅ Async task processing (transcription, OCR, credit calculation)
- ✅ Retry logic & error handling
- ✅ Distributed workers for horizontal scaling

**Payment: Omise (Thailand) + Stripe (International)**
- ✅ Omise: PromptPay, Bank Transfer, native Thailand support
- ✅ Stripe: Fallback for international students
- ✅ Both support webhooks & strong fraud detection

---

## 3. Development Setup

### Prerequisites
```bash
# System requirements
- Docker & Docker Compose
- Python 3.11+
- Node.js 18+
- PostgreSQL 15 (for local dev without Docker)
- Redis 7+
```

### Quick Start

```bash
# Clone & navigate
git clone https://github.com/withNoclout/MindMine_Money.git
cd MindMine_Money

# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp ai-services/.env.example ai-services/.env

# Start all services with Docker Compose
docker-compose -f config/docker-compose.dev.yml up

# Services available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
# Adminer (DB): http://localhost:8080
# Redis Commander: http://localhost:8081
```

### Environment Configuration

**Backend (.env)**
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mindmine
SQLALCHEMY_ECHO=true

# Redis & Celery
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER=redis://localhost:6379/0
CELERY_BACKEND=redis://localhost:6379/1

# AI Services
OPENAI_API_KEY=sk_test_...
OPENAI_MODEL=whisper-1

# Payment Gateways
OMISE_SECRET_KEY=skey_test_...
OMISE_PUBLIC_KEY=pkey_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

# Auth & Security
JWT_SECRET=your-secret-key-min-32-chars
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# AWS/GCS (File Storage)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=mindmine-prod
S3_REGION=ap-southeast-1

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend URLs
FRONTEND_URL=http://localhost:3000
BACKEND_API_URL=http://localhost:8000

# Logging
LOG_LEVEL=DEBUG
SENTRY_DSN=https://...
```

---

## 4. Database Setup

### Initial Migration

```bash
# Backend container
docker-compose exec backend bash

# Run Alembic migrations
alembic upgrade head

# Seed curriculum standards
python -c "from app.scripts.seed_curriculum import seed_all; seed_all()"

# Seed sample users (dev only)
python -c "from app.scripts.seed_users import seed_sample_users; seed_sample_users()"
```

### Database Schema Initialization

```bash
# All SQL files are in database/schema/
# Manually run if needed:

psql -U mindmine -d mindmine_db < database/schema/users.sql
psql -U mindmine -d mindmine_db < database/schema/content.sql
psql -U mindmine -d mindmine_db < database/schema/wallet.sql
psql -U mindmine -d mindmine_db < database/schema/transactions.sql
psql -U mindmine -d mindmine_db < database/schema/curriculum.sql
```

---

## 5. Deployment Strategy

### Development → Staging → Production

```
┌──────────────────────────────────────────────────┐
│         GITHUB ACTIONS CI/CD PIPELINE            │
└──────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    [Push]         [PR Created]    [Release Tag]
        │               │               │
        ▼               ▼               ▼
    ┌─────────┐   ┌─────────┐   ┌──────────┐
    │ DEV     │   │ STAGING │   │ PROD     │
    │ Deploy  │   │ Deploy  │   │ Deploy   │
    │         │   │         │   │          │
    │ Auto    │   │ Manual  │   │ Manual   │
    │ Merge   │   │ Approval│   │ Approval │
    └─────────┘   └─────────┘   └──────────┘
```

### Development (Docker Compose)
```bash
docker-compose -f config/docker-compose.dev.yml up
```

### Staging (Kubernetes)
```bash
# Setup Kubernetes cluster on DigitalOcean/AWS
# Apply configurations
kubectl apply -f config/k8s/

# Check deployment
kubectl get pods -n mindmine-staging
kubectl logs deployment/backend -n mindmine-staging
```

### Production (Kubernetes + Managed Services)

```yaml
# config/k8s/deployment.yaml (example)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mindmine-backend
  namespace: mindmine-prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mindmine-backend
  template:
    metadata:
      labels:
        app: mindmine-backend
    spec:
      containers:
      - name: backend
        image: mindmine/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
```

---

## 6. Scaling Strategy

### Horizontal Scaling

```
Load Balancer
     │
     ├─ Backend Pod 1
     ├─ Backend Pod 2
     ├─ Backend Pod 3
     │
     Database (Cloud SQL / RDS)
     │
     Cache (Redis Cloud / ElastiCache)
     │
     Message Queue (Managed Celery)
```

### Vertical Scaling (Upgrade Instance Types)
- Database: Upgrade CPU/RAM as needed
- Redis: Switch to managed service (Redis Cloud, ElastiCache)
- Workers: Add more Celery workers on separate nodes

### Database Optimization
```sql
-- Add indexes for hot queries
CREATE INDEX idx_content_user_status 
ON content(user_id, status);

CREATE INDEX idx_transactions_wallet_created 
ON transactions(wallet_id, created_at);

-- Enable partitioning for large tables
ALTER TABLE transactions 
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);
```

---

## 7. Monitoring & Observability

### Logging (ELK Stack)
```python
# All logs sent to Elasticsearch
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger(__name__)
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)

logger.info("User withdrawal request", extra={
    'user_id': user_id,
    'amount_thb': 1000,
    'timestamp': datetime.now()
})
```

### Metrics (Prometheus)
```python
from prometheus_client import Counter, Histogram

withdrawal_counter = Counter(
    'withdrawals_total',
    'Total withdrawals processed',
    ['status']
)

processing_time = Histogram(
    'content_processing_seconds',
    'Content processing time'
)

@app.post("/api/v1/wallet/withdrawal")
async def request_withdrawal(...):
    try:
        result = process_withdrawal(...)
        withdrawal_counter.labels(status='success').inc()
        return result
    except Exception as e:
        withdrawal_counter.labels(status='failed').inc()
        raise
```

### Alerting
```yaml
# Prometheus alerts
groups:
- name: mindmine_alerts
  rules:
  - alert: HighWithdrawalFailureRate
    expr: rate(withdrawals_total{status="failed"}[5m]) > 0.05
    for: 5m
    annotations:
      summary: "Withdrawal failure rate > 5%"
  
  - alert: DatabaseConnectionPoolExhausted
    expr: pg_stat_activity_count > 90
    for: 2m
    annotations:
      summary: "PostgreSQL connection pool almost full"
```

### Health Checks
```python
@app.get("/health")
async def health_check():
    checks = {
        'database': await check_database(),
        'redis': await check_redis(),
        'payment_gateway': await check_omise(),
        'ai_service': await check_whisper_api()
    }
    
    status = 'healthy' if all(checks.values()) else 'degraded'
    
    return {
        'status': status,
        'checks': checks,
        'timestamp': datetime.now()
    }
```

---

## 8. Testing Strategy

### Unit Tests
```bash
# Backend tests
docker-compose exec backend pytest tests/ -v

# Frontend tests
cd frontend && npm test
```

### Integration Tests
```bash
# Test API endpoints with real database
pytest tests/integration/ -v

# Test payment workflows
pytest tests/payment/ -v --markers=payment
```

### Load Testing
```bash
# Locust load tests
locust -f tests/load_test.py --host=http://localhost:8000
```

---

## 9. Security Checklist

- [ ] Enable HTTPS/TLS 1.3 on all endpoints
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets (not hardcoded)
- [ ] Implement rate limiting on all APIs
- [ ] Enable 2FA for admin accounts
- [ ] Regular security patches and updates
- [ ] Database encryption at rest
- [ ] Implement backups (daily, tested regularly)
- [ ] OWASP Top 10 security practices
- [ ] Regular security audits & penetration testing

---

## 10. Backup & Disaster Recovery

### Backup Strategy
```bash
# Daily database backups
0 2 * * * pg_dump mindmine_db | gzip > /backups/mindmine_$(date +%Y%m%d).sql.gz

# Upload to S3
aws s3 cp /backups/mindmine_$(date +%Y%m%d).sql.gz s3://mindmine-backups/

# Retention: 30 days
aws s3 ls s3://mindmine-backups/ | wc -l
```

### Disaster Recovery Runbook
```markdown
## RTO: 4 hours | RPO: 1 hour

1. Database Recovery
   - Provision new PostgreSQL instance
   - Restore from latest backup
   - Verify data integrity

2. Application Recovery
   - Rebuild container images
   - Deploy to Kubernetes
   - Run migrations

3. Verification
   - Health checks pass
   - Sample transactions work
   - Monitoring active
```

---

## 11. Cost Estimation (Monthly)

| Component | Service | Cost/month | Notes |
|-----------|---------|-----------|-------|
| Frontend | Vercel | ~$20 | Pro plan |
| Database | AWS RDS (PostgreSQL) | ~$100-300 | t3.medium → t3.large |
| Cache | Redis Cloud | ~$50-200 | Depends on data |
| File Storage | AWS S3 | ~$50-150 | Video storage |
| API | FastAPI servers | ~$100-500 | 2-4 instances on DigitalOcean |
| AI Services | OpenAI Whisper | ~$0.02/min | Variable cost |
| Payment | Omise/Stripe | 3.5-3.9% per transaction | Variable |
| Monitoring | Datadog/New Relic | ~$30-100 | Observability |
| **Total** | | **~$400-1400** | Scales with usage |

---

## 12. Roadmap (Next 6 Months)

**Phase 1 (Month 1-2): MVP Launch**
- ✅ User authentication & KYC
- ✅ Content upload & AI valuation
- ✅ Basic payment (Omise)
- ✅ Withdrawal processing
- Public beta with 100 educators

**Phase 2 (Month 2-3): Platform Growth**
- Live instructor-led courses
- Student discussion forums
- Ratings & reviews system
- Referral program

**Phase 3 (Month 3-4): Advanced Features**
- AI-powered course recommendations
- Playlist & learning paths
- Mobile app (React Native)
- Advanced analytics dashboard

**Phase 4 (Month 4-6): Monetization & Scale**
- Subscription tiers
- Live streaming capability
- Corporate training integration
- International expansion (other countries)

---

## 13. Contact & Support

**Project Management**: GitHub Issues & Discussions
**Documentation**: docs/ folder
**Deployment**: GitHub Actions + Kubernetes
**Monitoring**: Datadog (production)
**On-call**: PagerDuty rotation

---

## Quick Command Reference

```bash
# Development
docker-compose -f config/docker-compose.dev.yml up -d
docker-compose -f config/docker-compose.dev.yml logs -f backend

# Database
docker-compose exec backend alembic upgrade head
docker-compose exec backend pytest tests/ -v

# Deployment
./scripts/deploy.sh staging
./scripts/deploy.sh production

# Monitoring
kubectl logs -f deployment/backend -n mindmine-prod
kubectl exec -it pod/backend-xyz -n mindmine-prod -- /bin/bash
```

---

**Last Updated**: January 2026
**Version**: 1.0
**Status**: Ready for Development
