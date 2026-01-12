# Mind Mine Money - Educational Marketplace Platform

> An AI-powered educational marketplace where students buy affordable course content and educators earn credits through intelligent content valuation.

## 🎯 Vision

**"Democratizing Education Through Fair Valuation"**

Mind Mine Money is a platform that:
- Enables educators to monetize their knowledge (videos, notes, courses)
- Provides students with affordable access to quality educational content
- Uses AI to automatically value educational content fairly
- Supports Thailand's educational ecosystem with localized payment methods

## 🌟 Core Features

### For Educators
- 📹 **Upload Content**: Videos, PDFs, GoodNotes documents
- 🤖 **AI Valuation**: Automatic content scoring against curriculum standards
- 💰 **Instant Credits**: Get credits immediately upon content approval
- 📊 **Analytics Dashboard**: Track earnings, views, student engagement
- 🏦 **Easy Withdrawal**: Convert credits to Thai Baht (PromptPay, Bank Transfer)
- 📈 **Growth Tools**: Marketing support, audience insights, course templates

### For Students
- 🎓 **Affordable Learning**: Quality content at reasonable credit prices
- 🔍 **Smart Search**: Find content by subject, grade level, topic
- 📚 **Browse Courses**: View educator profiles, ratings, reviews
- 💳 **Flexible Payment**: Buy credits via PromptPay, card, or bank transfer
- 🎬 **Lifetime Access**: One-time purchase = lifetime access to content
- 🚀 **Personalized Learning**: Recommendations based on interests

## 📊 System Architecture

```
Frontend (Next.js 14) → Backend (FastAPI) → Database (PostgreSQL)
                             ↓
                    AI Services (Whisper, OCR)
                             ↓
                    Payment Gateway (Omise, Stripe)
                             ↓
                    Background Workers (Celery + Redis)
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.11+

### Development Setup
```bash
# Clone repository
git clone https://github.com/withNoclout/MindMine_Money.git
cd MindMine_Money

# Configure environment
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development environment
docker-compose -f config/docker-compose.dev.yml up

# Access services
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
# Database: localhost:5432
```

## 📚 Documentation

### Core Documentation
- [Project Structure](PROJECT_STRUCTURE.md) - Complete folder organization
- [System Architecture](docs/ARCHITECTURE.md) - Design, scaling, deployment
- [Database Schema](database/ER_DIAGRAM.md) - Data model & relationships

### Features & Implementation
- [AI Workflow](docs/AI_WORKFLOW.md) - Content processing & auto-valuation
- [Payment Flow](docs/PAYMENT_FLOW.md) - Credit system & withdrawals
- [API Documentation](docs/API.md) - REST endpoints & examples

### Developer Guides  
- [Coding Standards](docs/CODING_STANDARDS.md) - Code style & conventions
- [Contributing](docs/CONTRIBUTING.md) - Development workflow

## 🏗️ Project Structure

```
MindMine_Money/
├── frontend/              # Next.js 14 React app
├── backend/               # FastAPI Python backend
├── ai-services/           # AI processing pipeline
├── database/              # Database schemas & migrations
├── docs/                  # Comprehensive documentation
└── config/                # Configuration & deployment files
```

## 🔑 Key Technologies

**Frontend**: React 18, Next.js 14, TypeScript, Tailwind CSS
**Backend**: FastAPI, PostgreSQL, SQLAlchemy, Alembic
**AI**: OpenAI Whisper, Tesseract OCR, Sentence Transformers
**Payment**: Omise (Thailand), Stripe (International)
**Infrastructure**: Docker, Kubernetes, Celery, Redis

## 💳 Credit System

1. **Educators Upload** → Content processed by AI
2. **AI Scores** → Matched against curriculum standards (0-100%)
3. **Credits Awarded** → Based on quality & relevance (10-200 credits)
4. **Students Purchase** → Use credits to buy content
5. **Educators Earn** → 70% of sale goes to educator, 30% to platform
6. **Withdraw Cash** → Convert credits to Thai Baht

## 🤖 AI Valuation

Two-stage scoring system:
- **Keyword Matching (60%)**: Match content against curriculum
- **Semantic Similarity (40%)**: Transformer-based relevance scoring

Final score converted to credits with multipliers for length & complexity.

## 🔒 Security

- PCI compliance for payments
- End-to-end encryption
- Rate limiting & fraud detection
- 2FA for sensitive operations
- Comprehensive audit logging

## 🔄 Quick API Reference

```bash
# Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login

# Content
POST   /api/v1/content/upload
GET    /api/v1/content/search
POST   /api/v1/content/{id}/purchase

# Wallet
GET    /api/v1/wallet/balance
POST   /api/v1/wallet/buy-credits
POST   /api/v1/wallet/withdrawal-request
```

See [API Documentation](docs/API.md) for complete reference.

## 📝 Contributing

See [Contributing Guide](docs/CONTRIBUTING.md) for code standards and workflow.

## 📄 License

Proprietary - See LICENSE for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/withNoclout/MindMine_Money/issues)
- **Discussions**: [GitHub Discussions](https://github.com/withNoclout/MindMine_Money/discussions)

---

**Mind Mine Money - Making Education Accessible & Rewarding** 🎉
