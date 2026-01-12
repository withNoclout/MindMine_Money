# Context Engineering Commands for Mind Mine Money

This directory contains specialized AI agents (commands) that streamline your workflow for the Mind Mine Money project. These commands follow the Context Engineering framework for consistent, auditable, and modular AI-assisted development.

## Quick Start

Commands use the slash command pattern:

```bash
/command Q="your question" param="value" context=@file.md
```

## Available Commands

### 1. **ultrathink** - Deep Analysis & Strategic Thinking
Perform deep analysis on complex problems, architectural decisions, and strategic challenges.

```bash
/ultrathink Q="Should we use direct API polling or webhooks for payment updates?" 
            domain="payment-system" 
            context=@docs/PAYMENT_FLOW.md 
            depth="comprehensive"
```

**Use Cases:**
- Architectural decision analysis
- Algorithm trade-off evaluation
- Strategic problem-solving
- Technical risk assessment
- System design review

### 2. **generate-prp** - Generate Project Requirements & Planning Documents
Generate structured Project Requirements Plans (PRPs) from high-level goals and existing documentation.

```bash
/generate-prp Q="Create PRP for educator dashboard feature" 
              epic="educator-onboarding" 
              scope="mvp" 
              context=@SPECIFICATION.md 
              output="detailed"
```

**Use Cases:**
- Feature specification documents
- Epic planning and breakdown
- Sprint planning requirements
- Implementation roadmaps
- API design documents
- Database schema requirements

### 3. **execute-prp** - Execute PRPs & Implementation Tasks
Execute PRPs by breaking them down into actionable implementation tasks with code samples, testing strategies, and deployment plans.

```bash
/execute-prp prp="Generate educator dashboard" 
             phase="backend-api" 
             stack="fastapi" 
             context=@PROJECT_STRUCTURE.md 
             include_tests=true
```

**Use Cases:**
- Implement API endpoints
- Create database migrations
- Generate React components
- Write test suites
- Create documentation
- Set up CI/CD pipelines

## Workflow Integration

### Typical Development Cycle

```
1. Start with /ultrathink
   ↓
2. Generate PRP with /generate-prp
   ↓
3. Execute with /execute-prp
   ↓
4. Review and iterate
```

### Example: Building Educator Dashboard

```bash
# Step 1: Deep analysis
/ultrathink Q="What authentication and authorization patterns for educators?" 
            context=@docs/ARCHITECTURE.md 
            domain="authentication"

# Step 2: Generate requirements
/generate-prp Q="Create educator dashboard feature" 
              epic="educator-onboarding" 
              scope="mvp" 
              include_wireframes=true

# Step 3: Execute backend implementation
/execute-prp prp="Educator dashboard backend" 
             phase="fastapi-endpoints" 
             include_models=true 
             include_tests=true

# Step 4: Execute frontend implementation
/execute-prp prp="Educator dashboard frontend" 
             phase="react-components" 
             output="next.js-components"
```

## Command Reference

### ultrathink

**Arguments:**
- `Q` (required): Main question or analysis topic
- `domain` (optional): Problem domain (system-design, algorithm, security, etc.)
- `context` (optional): File reference `@file.md` for context
- `depth` (optional): `quick` | `standard` | `comprehensive` (default: `standard`)
- `frameworks` (optional): Analytical frameworks to apply (e.g., "trade-offs, risks, alternatives")

**Output:**
- Structured analysis with pros/cons
- Key insights and recommendations
- Risk assessment
- Alternative approaches
- Implementation suggestions

---

### generate-prp

**Arguments:**
- `Q` (required): Feature or epic description
- `epic` (required): Epic identifier (e.g., `educator-onboarding`, `payment-system`)
- `scope` (optional): `mvp` | `full` | `custom` (default: `mvp`)
- `context` (optional): File reference for project context
- `output` (optional): `quick` | `detailed` | `comprehensive` (default: `detailed`)
- `include_wireframes` (optional): Include wireframe descriptions
- `include_api` (optional): Include API specification
- `include_db` (optional): Include database schema requirements

**Output:**
- Feature overview and acceptance criteria
- Epic breakdown into stories
- Technical requirements and constraints
- Database schema requirements
- API specifications (if requested)
- Frontend component specifications
- Testing strategy
- Success metrics
- Dependencies and risks

---

### execute-prp

**Arguments:**
- `prp` (required): PRP description or document reference
- `phase` (required): Implementation phase (e.g., `backend-api`, `database`, `frontend`, `testing`, `deployment`)
- `stack` (optional): Technology stack (`fastapi`, `react`, `postgresql`, etc.)
- `context` (optional): File reference for project structure
- `include_tests` (optional): Generate test suites
- `include_docs` (optional): Generate documentation
- `output_format` (optional): `code` | `markdown` | `mixed` (default: `mixed`)
- `template` (optional): Use specific template (e.g., `crud-api`, `graphql-resolver`)

**Output:**
- Implementation code with comments
- Unit tests and integration tests
- API documentation
- Database migrations
- Configuration files
- Deployment instructions
- Troubleshooting guide

## Context Schema

Commands automatically provide context from your project documentation:

```yaml
mindmine_context:
  project:
    name: "Mind Mine Money"
    type: "educational-marketplace"
    mvp_timeline: "12 weeks"
    
  tech_stack:
    frontend: "Next.js 14, React 18, TypeScript, Tailwind CSS"
    backend: "FastAPI, SQLAlchemy, PostgreSQL 15"
    ai: "OpenAI Whisper, Tesseract OCR, Sentence Transformers"
    payment: "Omise (PromptPay), Stripe"
    
  key_features:
    - "Content upload and processing"
    - "AI-driven content valuation"
    - "Educator payments (Thailand PromptPay)"
    - "Student content marketplace"
    - "Admin dashboard"
    
  critical_docs:
    - "docs/ARCHITECTURE.md" - System design
    - "docs/AI_WORKFLOW.md" - Content processing pipeline
    - "docs/PAYMENT_FLOW.md" - Payment system
    - "PROJECT_STRUCTURE.md" - Folder organization
    - "database/ER_DIAGRAM.md" - Database schema
```

## Audit & Logging

All commands include automatic audit logging with:
- Command invocation timestamp
- Arguments provided
- Phase-by-phase execution logs
- Decisions and rationale
- Version tracking
- Recommendations

## Tips & Best Practices

### 1. **Always Provide Context**
```bash
# ✅ Good
/generate-prp Q="Create PRP for educator dashboard" context=@SPECIFICATION.md

# ❌ Less effective
/generate-prp Q="Create PRP for educator dashboard"
```

### 2. **Reference Existing Documentation**
The commands have access to your complete project documentation. Reference specific docs in your queries:

```bash
/ultrathink Q="How should we structure educator credit tiers?" 
            context=@docs/ARCHITECTURE.md 
            domain="system-design"
```

### 3. **Use Phase-Based Execution**
Break down complex tasks into phases:

```bash
# Database first
/execute-prp prp="Educator dashboard" phase="database"

# Then API
/execute-prp prp="Educator dashboard" phase="backend-api"

# Then frontend
/execute-prp prp="Educator dashboard" phase="frontend"
```

### 4. **Iterate on Requirements**
Use `/ultrathink` to validate before `/generate-prp`:

```bash
/ultrathink Q="Is our API design robust for the payment system?"
/generate-prp Q="Create API PRP based on analysis"
/execute-prp prp="Implement payment API endpoints"
```

### 5. **Include Test Generation**
Always generate tests with your implementation:

```bash
/execute-prp prp="Payment webhook handler" 
             phase="backend-api" 
             include_tests=true
```

## Examples

### Example 1: Designing AI Valuation Algorithm

```bash
# Step 1: Analyze
/ultrathink Q="Should we use keyword matching + semantic similarity or ML model for content scoring?" 
            context=@docs/AI_WORKFLOW.md 
            domain="algorithm-design"
            depth="comprehensive"

# Step 2: Generate implementation plan
/generate-prp Q="AI content valuation scoring system" 
              epic="ai-valuation" 
              scope="mvp" 
              context=@docs/AI_WORKFLOW.md

# Step 3: Implement
/execute-prp prp="AI valuation scoring" 
             phase="backend-service" 
             stack="fastapi" 
             include_tests=true
```

### Example 2: Building Payment System

```bash
# Step 1: Analyze payment flows
/ultrathink Q="What are edge cases and error handling needs for PromptPay payments?" 
            context=@docs/PAYMENT_FLOW.md 
            domain="payments"

# Step 2: Create payment PRP
/generate-prp Q="Payment processing system with Omise" 
              epic="payment-system" 
              scope="mvp" 
              include_api=true 
              include_db=true

# Step 3: Execute backend
/execute-prp prp="Payment system" 
             phase="backend-api" 
             include_tests=true
```

### Example 3: Building Educator Dashboard

```bash
# Analyze requirements
/ultrathink Q="What should educator dashboard include for MVP?" 
            depth="comprehensive"

# Generate feature breakdown
/generate-prp Q="Educator dashboard feature" 
              epic="educator-onboarding" 
              include_wireframes=true 
              include_api=true

# Execute backend
/execute-prp prp="Educator dashboard backend" 
             phase="fastapi-endpoints" 
             include_tests=true

# Execute frontend
/execute-prp prp="Educator dashboard frontend" 
             phase="react-components"
```

## Troubleshooting

**Q: Commands not recognized?**
A: Ensure you're using the correct slash command syntax: `/command Q="question"`

**Q: Need more specific output?**
A: Add `depth`, `scope`, or `include_*` parameters to control detail level.

**Q: Want to reuse output?**
A: Commands generate markdown files in `.claude/logs/` with full audit trails.

## Project Structure Reference

```
MindMine_Money/
├── .claude/                    ← AI command configurations
│   ├── commands/              ← Command agents (ultrathink, generate-prp, execute-prp)
│   └── logs/                  ← Audit logs and command output
├── frontend/                  ← Next.js application
├── backend/                   ← FastAPI application
├── ai-services/               ← AI content processor
├── database/                  ← Database schemas and migrations
├── docs/                      ← Project documentation
│   ├── ARCHITECTURE.md
│   ├── AI_WORKFLOW.md
│   └── PAYMENT_FLOW.md
├── config/                    ← Deployment and infrastructure config
└── README.md                  ← Project overview
```

## Next Steps

1. **Review command definitions** in `.claude/commands/`
2. **Try your first command**: Start with `/ultrathink Q="what is this project about?"`
3. **Reference the examples** above for your first feature
4. **Check audit logs** in `.claude/logs/` to see command execution history

## Integration with Development Workflow

These commands integrate seamlessly with your existing workflow:

- Use `/ultrathink` during **architecture reviews** and **design discussions**
- Use `/generate-prp` during **sprint planning** and **epic breakdown**
- Use `/execute-prp` during **implementation** and **feature development**
- Check audit logs during **code reviews** and **retrospectives**

---

**For more information on Context Engineering, see:**
- Official Repository: https://github.com/davidkimai/Context-Engineering
- Framework Documentation: [Context Engineering Foundations](../Context-Engineering/README.md)

