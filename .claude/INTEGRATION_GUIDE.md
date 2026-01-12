# Context Engineering Integration Guide

## Overview

Your Mind Mine Money project now has a **Context Engineering Command System** integrated with three specialized AI agents:

1. **`/ultrathink`** - Deep analysis of architectural, algorithmic, and strategic challenges
2. **`/generate-prp`** - Generate Project Requirements Plans (PRPs) from feature descriptions
3. **`/execute-prp`** - Execute PRPs by generating implementation code, tests, and deployment instructions

This guide explains what you now have, how to use it, and how to integrate it into your development workflow.

---

## What's New in Your Project

### Directory Structure

```
MindMine_Money/
├── .claude/                          ← NEW: AI Command Configuration
│   ├── README.md                     ← This file (usage guide)
│   ├── commands/                     ← Agent definitions
│   │   ├── ultrathink.agent.md       ← Deep analysis agent
│   │   ├── generate-prp.agent.md     ← Requirements planning agent
│   │   └── execute-prp.agent.md      ← Implementation execution agent
│   └── logs/                         ← Audit trail and outputs
│       ├── analyses/                 ← /ultrathink outputs
│       ├── prps/                     ← /generate-prp outputs
│       └── implementations/          ← /execute-prp outputs
├── frontend/                         ← Next.js application
├── backend/                          ← FastAPI application
├── ai-services/                      ← AI content processor
├── database/                         ← Database schemas
├── docs/                             ← Project documentation
└── ...rest of project...
```

### Command System Features

**Each agent is a complete system prompt that includes:**

- **Structured workflow** - Multi-phase execution (parsing → analysis → synthesis → audit logging)
- **Context awareness** - Automatically references your project documentation
- **Tool registry** - Declares what tools/capabilities are needed
- **Recursion/refinement** - Can iterate and improve on initial output
- **Audit logging** - Complete tracking of decisions and reasoning
- **Examples** - Real-world usage examples tailored to your project

---

## The Three Commands in Detail

### 1. `/ultrathink` - Deep Analysis & Strategic Thinking

**Purpose:** Perform deep analysis on complex problems, architectural decisions, and strategic challenges.

**When to use:**
- Deciding between architectural approaches
- Evaluating trade-offs for critical systems (payment, AI valuation)
- Assessing risks and mitigation strategies
- Exploring alternatives before committing to implementation
- Reviewing system design decisions during architecture reviews

**Command Pattern:**

```bash
/ultrathink Q="Your question" \
            domain="technical|architectural|algorithmic|strategic|security" \
            context=@docs/file.md \
            depth="quick|standard|comprehensive" \
            frameworks="trade-offs, risk-assessment"
```

**Example Usage:**

```bash
# Analyze AI valuation algorithm choice
/ultrathink Q="Should we use keyword matching + semantic similarity (current approach) or train a custom ML model?" \
            domain="algorithmic" \
            context=@docs/AI_WORKFLOW.md \
            depth="comprehensive"

# Payment system architecture
/ultrathink Q="What are risks and trade-offs of Omise-first vs Stripe-first architecture?" \
            domain="architectural" \
            context=@docs/PAYMENT_FLOW.md \
            depth="comprehensive"

# Security decision
/ultrathink Q="How should we handle educator payment verification to prevent fraud?" \
            domain="security" \
            context=@docs/ARCHITECTURE.md \
            depth="standard"
```

**Output includes:**
- Problem understanding and scope
- Systematic analysis with evidence
- Trade-off matrices (clear comparisons)
- Risk assessment with probability/impact
- Alternative exploration (3-5+ options)
- Clear recommendations with rationale
- Audit log of reasoning

**Output saved to:** `.claude/logs/analyses/[timestamp]-[domain].md`

---

### 2. `/generate-prp` - Generate Project Requirements Plans

**Purpose:** Generate comprehensive Project Requirements Plans (PRPs) that serve as detailed development blueprints.

**When to use:**
- Planning a new feature or epic
- Breaking down epics into user stories
- Defining API specifications
- Planning database schema changes
- Creating implementation roadmaps
- Sprint planning and story estimation

**Command Pattern:**

```bash
/generate-prp Q="Feature description" \
              epic="epic-identifier" \
              scope="mvp|full|custom" \
              output="quick|detailed|comprehensive" \
              include_api=true \
              include_db=true
```

**Example Usage:**

```bash
# Plan educator dashboard feature
/generate-prp Q="Build educator dashboard for content upload, analytics, and earnings management" \
             epic="educator-onboarding" \
             scope="mvp" \
             output="detailed" \
             include_api=true \
             include_db=true

# Plan payment system
/generate-prp Q="Implement payment processing with Omise PromptPay and bank transfer" \
             epic="payment-system" \
             scope="mvp" \
             output="comprehensive" \
             include_api=true \
             include_security=true

# Plan AI valuation system
/generate-prp Q="Build AI content valuation system with curriculum matching" \
             epic="ai-valuation" \
             scope="mvp" \
             output="detailed"
```

**Output includes:**
- Feature overview and acceptance criteria
- Epic breakdown into prioritized user stories
- Technical requirements and architectural notes
- Complete API specifications (request/response examples)
- Database schema requirements with rationale
- Testing strategy (unit, integration, e2e)
- Implementation roadmap with phases
- Effort estimates and dependency matrix
- Success metrics and open questions

**Output saved to:** `.claude/logs/prps/[date]-[epic]-[scope].md`

---

### 3. `/execute-prp` - Execute Requirements & Generate Code

**Purpose:** Execute PRPs by generating production-ready implementation code, tests, and deployment instructions.

**When to use:**
- After you have a finalized PRP, to generate initial implementation
- Implementing specific phases (backend API, frontend, database, tests)
- Generating test suites for a feature
- Creating deployment configuration
- Generating migration scripts

**Command Pattern:**

```bash
/execute-prp prp="PRP description or reference" \
             phase="backend-api|frontend|database|testing|deployment" \
             stack="fastapi|react|postgresql" \
             include_tests=true \
             include_docs=true
```

**Example Usage:**

```bash
# Generate backend API for educator dashboard
/execute-prp prp="Build educator dashboard API endpoints" \
             phase="backend-api" \
             stack="fastapi" \
             include_tests=true

# Generate frontend components
/execute-prp prp="Build educator dashboard UI" \
             phase="frontend" \
             stack="react" \
             include_tests=true

# Generate database migrations
/execute-prp prp="Add educator analytics and withdrawal tables" \
             phase="database" \
             stack="postgresql" \
             include_migrations=true

# Generate payment integration code
/execute-prp prp="Implement Omise payment webhook handler" \
             phase="backend-api" \
             stack="fastapi" \
             include_tests=true
```

**Output includes:**
- Complete, functional implementation code
- Type hints, docstrings, and comments
- Error handling and input validation
- Unit tests and integration tests (>80% coverage)
- Docker configuration and environment setup
- Deployment instructions
- Code review checklist
- Troubleshooting guide
- Implementation notes and edge cases

**Output saved to:** `.claude/logs/implementations/[date]-[phase]-[epic].md`

---

## Recommended Workflow

### Typical Feature Development Cycle

```
1. PLANNING & ANALYSIS
   ↓
   /ultrathink Q="..." domain="..." depth="comprehensive"
   → Analyze architectural implications and trade-offs
   
2. REQUIREMENTS PLANNING
   ↓
   /generate-prp Q="..." epic="..." scope="mvp" output="detailed"
   → Generate comprehensive feature specification
   
3. IMPLEMENTATION (per phase)
   ↓
   /execute-prp prp="..." phase="backend-api" include_tests=true
   → Generate backend implementation
   
   /execute-prp prp="..." phase="frontend" include_tests=true
   → Generate frontend implementation
   
4. CODE REVIEW & INTEGRATION
   ↓
   Review generated code and tests
   Integrate into project
   
5. DEPLOYMENT
   ↓
   Follow generated deployment instructions
```

### Example: Building the Educator Dashboard

```bash
# Step 1: Understand requirements deeply
/ultrathink Q="What should an educator dashboard include for MVP? What are the critical features?" \
            depth="comprehensive"

# Step 2: Generate detailed requirements
/generate-prp Q="Educator dashboard with content management, analytics, and payments" \
             epic="educator-onboarding" \
             scope="mvp" \
             output="detailed" \
             include_api=true \
             include_db=true

# Step 3: Generate database schema
/execute-prp prp="Educator dashboard database schema" \
             phase="database" \
             stack="postgresql" \
             include_migrations=true

# Step 4: Generate backend API
/execute-prp prp="Educator dashboard API endpoints" \
             phase="backend-api" \
             stack="fastapi" \
             include_tests=true

# Step 5: Generate frontend
/execute-prp prp="Educator dashboard UI components" \
             phase="frontend" \
             stack="react" \
             include_tests=true

# Step 6: Generate deployment configuration
/execute-prp prp="Educator dashboard deployment" \
             phase="deployment" \
             stack="fastapi+react"
```

---

## Integration with Your Development Process

### In Sprint Planning

Use `/generate-prp` to:
- Break down epics into stories with clear acceptance criteria
- Generate effort estimates for planning poker
- Identify dependencies and risks upfront
- Create detailed implementation roadmaps

### During Architecture Reviews

Use `/ultrathink` to:
- Systematically analyze architectural decisions
- Surface trade-offs and risks before implementation
- Explore alternatives to current approach
- Document decision rationale

### During Implementation

Use `/execute-prp` to:
- Generate initial implementation skeleton
- Create comprehensive test suites
- Generate deployment configuration
- Create documentation templates

### In Code Reviews

Review outputs from `/execute-prp` for:
- Code quality and style
- Test coverage and edge cases
- Error handling completeness
- Security considerations
- Performance implications

---

## Command Invocation Syntax

### Basic Pattern

```bash
/command Q="main question or description" param1="value" param2="value" context=@file.md
```

### File References

Include project documentation using `@` prefix:

```bash
/ultrathink Q="..." context=@docs/ARCHITECTURE.md context=@docs/PAYMENT_FLOW.md
```

### Bash Integration

Reference command output using `!` prefix:

```bash
/ultrathink Q="..." context="!git log --oneline | head -20"
```

### Supported Arguments

**Common to all commands:**
- `Q` - Main question or description (required)
- `context` - File or command reference (optional)
- `depth` - Quick/standard/comprehensive (optional)

**Specific to each command:**

**ultrathink:**
- `domain` - technical, architectural, algorithmic, strategic, security
- `frameworks` - List of analysis frameworks to apply

**generate-prp:**
- `epic` - Epic identifier
- `scope` - mvp, full, custom
- `output` - quick, detailed, comprehensive
- `include_api` - Generate API spec?
- `include_db` - Include database schema?

**execute-prp:**
- `prp` - PRP description or reference
- `phase` - backend-api, frontend, database, testing, deployment
- `stack` - fastapi, react, postgresql, etc.
- `include_tests` - Generate tests?
- `include_docs` - Generate documentation?

---

## Output Organization

### Audit Logs and Artifacts

All command outputs are automatically organized:

```
.claude/logs/
├── analyses/
│   └── [timestamp]-[domain]-[topic].md
│       ├── Problem understanding
│       ├── Systematic analysis
│       ├── Trade-off matrices
│       ├── Risk assessment
│       └── Audit log
│
├── prps/
│   └── [date]-[epic]-[scope].md
│       ├── User stories
│       ├── Technical requirements
│       ├── API specifications
│       ├── Database schema
│       └── Implementation roadmap
│
└── implementations/
    └── [date]-[phase]-[epic].md
        ├── Complete code
        ├── Test suites
        ├── Deployment guide
        └── Code review checklist
```

### Accessing Outputs

Find command outputs:
```bash
# View latest analysis
cat .claude/logs/analyses/*.md | less

# View latest PRP
cat .claude/logs/prps/*.md | less

# View latest implementation
cat .claude/logs/implementations/*.md | less
```

---

## Best Practices

### 1. Always Provide Context

```bash
# ✅ Good - includes project documentation
/generate-prp Q="Educator dashboard" context=@SPECIFICATION.md

# ❌ Less effective - no context
/generate-prp Q="Educator dashboard"
```

### 2. Use Depth Appropriately

- **quick** - Initial exploration, rapid prototyping
- **standard** - Regular feature development (DEFAULT)
- **comprehensive** - Critical systems, architectural decisions

```bash
# ✅ Use comprehensive for payment system analysis
/ultrathink Q="Payment system architecture" depth="comprehensive"

# ✅ Use standard for regular feature planning
/generate-prp Q="User profile feature" output="detailed"
```

### 3. Build on Previous Analysis

Use outputs from one command as context for the next:

```bash
# First: Analyze
/ultrathink Q="..." domain="system-design"

# Then: Reference analysis in requirements
/generate-prp Q="..." context=@.claude/logs/analyses/[latest].md
```

### 4. Phase-Based Implementation

Break large features into phases:

```bash
# Database first
/execute-prp prp="Dashboard" phase="database"

# API second
/execute-prp prp="Dashboard" phase="backend-api"

# Frontend third
/execute-prp prp="Dashboard" phase="frontend"
```

### 5. Always Review Generated Code

Generated code is a starting point. Always:
- Review for security implications
- Check for edge cases
- Verify test coverage
- Adapt to your specific needs
- Add project-specific optimizations

---

## Project Context Available to Commands

All commands have access to your complete project context:

### Key Documentation
- `SPECIFICATION.md` - Technical specification
- `ARCHITECTURE.md` - System design and deployment
- `AI_WORKFLOW.md` - Content processing pipeline
- `PAYMENT_FLOW.md` - Payment system integration
- `PROJECT_STRUCTURE.md` - Codebase organization
- `database/ER_DIAGRAM.md` - Database schema

### Technology Stack (Known to Commands)
```yaml
Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
Backend: FastAPI, SQLAlchemy, PostgreSQL 15
AI: Whisper, Tesseract, Sentence Transformers
Payment: Omise (PromptPay), Stripe
Async: Celery + Redis
```

### Key Project Constraints (Known to Commands)
- MVP timeline: 12 weeks
- Educational marketplace for educators and students
- Thailand payment focus (PromptPay primary)
- Fair AI-driven content valuation system
- ACID transaction requirements for payments

---

## Common Use Cases & Quick Reference

### Want to make a critical architectural decision?
```bash
/ultrathink Q="Your decision question" \
            domain="architectural" \
            depth="comprehensive" \
            context=@docs/ARCHITECTURE.md
```

### Need to plan a new feature?
```bash
/generate-prp Q="Feature description" \
             epic="epic-name" \
             scope="mvp" \
             output="detailed"
```

### Ready to implement a feature?
```bash
/execute-prp prp="Feature name" \
             phase="backend-api" \
             include_tests=true
```

### Want to analyze algorithm choice?
```bash
/ultrathink Q="Algorithm comparison question" \
            domain="algorithmic" \
            depth="comprehensive"
```

### Need API specifications?
```bash
/generate-prp Q="Feature description" \
             include_api=true \
             include_db=true
```

### Want test-first approach?
```bash
/execute-prp prp="Feature" \
             phase="testing" \
             include_tests=true
```

---

## Troubleshooting

### Q: Commands not responding?
A: Ensure correct slash command syntax: `/command Q="question" param="value"`

### Q: Need more specific output?
A: Use `depth`, `output`, or `scope` parameters to control detail level

### Q: Want to reference previous analysis?
A: Use file references: `context=@.claude/logs/analyses/[filename].md`

### Q: Output is too long?
A: Use `depth="quick"` or `output="quick"` for concise results

### Q: Need to reuse generated code?
A: All outputs saved in `.claude/logs/` with audit trails for easy retrieval

---

## Next Steps

1. **Try Your First Command**
   ```bash
   /ultrathink Q="What are the key technical challenges for the educator onboarding flow?" depth="standard"
   ```

2. **Review Generated Output**
   - Check `.claude/logs/analyses/` for analysis
   - Review reasoning and trade-offs

3. **Use in Development**
   - Use `/generate-prp` for next feature planning
   - Use `/execute-prp` to generate implementation code

4. **Integrate into Team Workflow**
   - Share analysis outputs in PRs
   - Use PRPs for sprint planning
   - Reference command outputs in architecture reviews

5. **Iterate & Improve**
   - Commands learn from your feedback
   - Provide context for better outputs
   - Build on previous analyses

---

## File Organization Reference

```
.claude/
├── README.md                    ← You are here
├── commands/
│   ├── ultrathink.agent.md      ← Deep analysis system prompt
│   ├── generate-prp.agent.md    ← Requirements planning system prompt
│   └── execute-prp.agent.md     ← Implementation execution system prompt
└── logs/
    ├── analyses/                ← Analysis outputs (timestamped)
    ├── prps/                    ← Requirements plans (timestamped)
    └── implementations/         ← Implementation code (timestamped)
```

---

## More Information

**Context Engineering Repository:**
https://github.com/davidkimai/Context-Engineering

**Framework Concepts:**
- Progressive complexity: atoms → molecules → cells → organs → neural systems → neural fields
- Emergent symbolic mechanisms: Symbol abstraction → Symbolic induction → Retrieval
- Field-theoretic dynamics: Attractors, resonance, symbolic residue

---

**Last Updated:** January 12, 2025
**System Version:** Context Engineering v2.0.0
**Project:** Mind Mine Money - Educational Marketplace Platform

