# Mind Mine Money - Project Structure

## Directory Tree

```
MindMine_Money/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deployment.yml
│   │   └── testing.yml
│   └── CONTRIBUTING.md
│
├── frontend/                          # Next.js 14 Frontend
│   ├── public/
│   │   ├── images/
│   │   ├── icons/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── student/
│   │   │   │   │   ├── browse/page.tsx
│   │   │   │   │   ├── purchases/page.tsx
│   │   │   │   │   ├── wallet/page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── educator/
│   │   │   │   │   ├── upload/page.tsx
│   │   │   │   │   ├── dashboard/page.tsx
│   │   │   │   │   ├── analytics/page.tsx
│   │   │   │   │   ├── earnings/page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── admin/
│   │   │   │   │   ├── users/page.tsx
│   │   │   │   │   ├── content-moderation/page.tsx
│   │   │   │   │   ├── transactions/page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/route.ts
│   │   │   │   │   ├── register/route.ts
│   │   │   │   │   └── logout/route.ts
│   │   │   │   ├── content/
│   │   │   │   │   ├── upload/route.ts
│   │   │   │   │   ├── [id]/route.ts
│   │   │   │   │   └── search/route.ts
│   │   │   │   ├── wallet/
│   │   │   │   │   ├── balance/route.ts
│   │   │   │   │   └── withdraw/route.ts
│   │   │   │   ├── payment/
│   │   │   │   │   ├── purchase/route.ts
│   │   │   │   │   └── callback/route.ts
│   │   │   │   └── stripe/webhook/route.ts
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── student/
│   │   │   │   ├── ContentCard.tsx
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   └── PurchaseModal.tsx
│   │   │   ├── educator/
│   │   │   │   ├── UploadForm.tsx
│   │   │   │   ├── ContentList.tsx
│   │   │   │   ├── EarningsChart.tsx
│   │   │   │   └── WithdrawModal.tsx
│   │   │   └── admin/
│   │   │       ├── UserTable.tsx
│   │   │       ├── ContentApprovalPanel.tsx
│   │   │       └── TransactionLog.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   ├── validators.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useUser.ts
│   │   │   │   └── useWallet.ts
│   │   │   └── utils/
│   │   │       ├── formatters.ts
│   │   │       ├── constants.ts
│   │   │       └── helpers.ts
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   └── tailwind.css
│   │   └── types/
│   │       ├── index.ts
│   │       ├── auth.ts
│   │       ├── content.ts
│   │       ├── wallet.ts
│   │       └── payment.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── .env.local.example
│   └── README.md
│
├── backend/                           # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── middleware.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── content.py
│   │   │   │   ├── wallet.py
│   │   │   │   ├── payment.py
│   │   │   │   ├── admin.py
│   │   │   │   ├── analytics.py
│   │   │   │   └── health.py
│   │   │   └── dependencies.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── security.py
│   │   │   ├── errors.py
│   │   │   └── constants.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── content.py
│   │   │   ├── wallet.py
│   │   │   ├── transaction.py
│   │   │   ├── bank_account.py
│   │   │   ├── curriculum.py
│   │   │   └── audit_log.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── content.py
│   │   │   ├── wallet.py
│   │   │   ├── payment.py
│   │   │   └── shared.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py
│   │   │   ├── content_service.py
│   │   │   ├── wallet_service.py
│   │   │   ├── payment_service.py
│   │   │   ├── valuation_service.py
│   │   │   ├── ai_service.py
│   │   │   └── notification_service.py
│   │   ├── repositories/
│   │   │   ├── __init__.py
│   │   │   ├── user_repository.py
│   │   │   ├── content_repository.py
│   │   │   ├── wallet_repository.py
│   │   │   ├── transaction_repository.py
│   │   │   └── curriculum_repository.py
│   │   ├── tasks/
│   │   │   ├── __init__.py
│   │   │   ├── celery.py
│   │   │   ├── content_processing.py
│   │   │   ├── credit_calculation.py
│   │   │   ├── payment_settlement.py
│   │   │   └── cleanup.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── logger.py
│   │       ├── validators.py
│   │       ├── formatters.py
│   │       └── helpers.py
│   ├── migrations/
│   │   ├── versions/
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── alembic.ini
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_content.py
│   │   ├── test_wallet.py
│   │   ├── test_payment.py
│   │   └── test_valuation.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pytest.ini
│   └── README.md
│
├── ai-services/                       # AI Processing & Valuation
│   ├── content_processor/
│   │   ├── __init__.py
│   │   ├── video_processor.py
│   │   ├── document_processor.py
│   │   ├── ocr_handler.py
│   │   ├── transcriber.py
│   │   └── text_extractor.py
│   ├── valuation/
│   │   ├── __init__.py
│   │   ├── scorer.py
│   │   ├── keyword_matcher.py
│   │   ├── curriculum_db.py
│   │   └── evaluation_engine.py
│   ├── embeddings/
│   │   ├── __init__.py
│   │   ├── embedding_service.py
│   │   └── similarity_calculator.py
│   ├── models/
│   │   ├── pretrained/
│   │   │   ├── whisper-base.pt
│   │   │   └── embeddings-model.bin
│   │   └── custom/
│   │       └── curriculum_classifier.pkl
│   ├── config/
│   │   ├── __init__.py
│   │   └── ai_config.py
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── Dockerfile
│   └── README.md
│
├── database/
│   ├── migrations/
│   │   ├── 001_init_schema.sql
│   │   ├── 002_add_content_table.sql
│   │   ├── 003_add_payment_tables.sql
│   │   └── versions/
│   ├── seeds/
│   │   ├── curriculum_standards.sql
│   │   ├── sample_users.sql
│   │   └── sample_textbooks.sql
│   ├── schema/
│   │   ├── users.sql
│   │   ├── content.sql
│   │   ├── wallet.sql
│   │   ├── transactions.sql
│   │   ├── curriculum.sql
│   │   ├── bank_accounts.sql
│   │   ├── audit_logs.sql
│   │   └── indexes.sql
│   ├── ER_DIAGRAM.md
│   ├── schema.sql
│   └── README.md
│
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── ARCHITECTURE.md
│   ├── AI_WORKFLOW.md
│   ├── PAYMENT_FLOW.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   ├── CODING_STANDARDS.md
│   ├── SECURITY.md
│   └── TROUBLESHOOTING.md
│
├── config/
│   ├── nginx.conf
│   ├── docker-compose.prod.yml
│   ├── docker-compose.dev.yml
│   └── k8s/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── configmap.yaml
│       └── secrets.yaml
│
├── scripts/
│   ├── setup.sh
│   ├── migrate.sh
│   ├── seed.sh
│   ├── backup.sh
│   └── deploy.sh
│
├── .gitignore
├── .env.example
├── .editorconfig
├── README.md
├── ARCHITECTURE.md
├── ROADMAP.md
└── LICENSE
```

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Redux Toolkit + RTK Query
- **Authentication:** NextAuth.js
- **Video Player:** HLS.js / Plyr.js
- **File Upload:** React Dropzone
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest + Playwright

### Backend
- **Framework:** FastAPI (Python 3.11)
- **ORM:** SQLAlchemy with Alembic migrations
- **Database:** PostgreSQL 15
- **Cache:** Redis
- **Task Queue:** Celery + Redis
- **API Documentation:** OpenAPI/Swagger
- **Testing:** Pytest + Pytest-async

### AI Services
- **Transcription:** OpenAI Whisper
- **OCR:** Tesseract + PyMuPDF
- **Embeddings:** Sentence Transformers
- **Similarity:** Faiss / Pinecone
- **PDF Handling:** PyPDF2 + pdfminer

### Payment/Fintech
- **Thailand Gateway:** Omise (Thai provider) + PromptPay
- **Payment Processing:** Stripe (international fallback)
- **Webhooks:** Robust retry logic

### DevOps & Infrastructure
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Kubernetes (optional)
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Reverse Proxy:** Nginx

---

## Key Features & Modules

### 1. User Management
- Role-based access control (RBAC): Student, Educator, Admin, Moderator
- Profile management, KYC verification
- Subscription management
- Activity logging

### 2. Content Management
- Upload (Video, PDF, GoodNotes)
- Auto-processing & AI valuation
- Approval workflow
- Metadata & tagging
- Search & filtering
- View counter & statistics

### 3. AI Valuation Engine
- Video → Transcription (Whisper)
- Document → Text Extraction (OCR)
- Keyword matching against curriculum standards
- Similarity scoring (embeddings)
- Match percentage calculation
- Automatic credit allocation

### 4. Financial System
- Wallet management
- Credit system
- Pay-per-view tracking
- Direct sales handling
- Withdrawal requests
- Thailand payment gateway integration

### 5. Admin & Moderation
- Content review queue
- User account management
- Transaction monitoring
- Fraud detection
- Analytics & reporting
- System health monitoring

---

## Database Schema (ER Diagram Concept)

See `database/ER_DIAGRAM.md` for detailed ER diagram.

### Core Tables:
1. **users** - User accounts (Students, Educators, Admins)
2. **user_profiles** - Extended user information
3. **content** - Uploaded materials (videos, documents)
4. **content_metadata** - Transcriptions, extracted text, AI scores
5. **curriculum_standards** - Textbook keywords, educational standards
6. **content_scores** - Valuation results, match percentages
7. **wallets** - User credit balances
8. **transactions** - Credit movements (earnings, purchases, fees)
9. **bank_accounts** - User bank info for withdrawals
10. **payment_gateway_logs** - Payment system logs
11. **views** - Video view tracking
12. **purchases** - Content purchase records
13. **withdrawal_requests** - Cash-out requests
14. **audit_logs** - System audit trail

---

## Deployment & Environment

- **Development:** Docker Compose (all services local)
- **Staging:** Docker Compose + Kubernetes prep
- **Production:** Kubernetes + managed PostgreSQL + Redis Cloud

See `docs/DEPLOYMENT.md` for detailed setup instructions.
