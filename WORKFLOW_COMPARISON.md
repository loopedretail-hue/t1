# Workflow Comparison Guide

Choose the right workflow for your use case.

## Quick Decision Tree

```
START
  │
  ├─ Need everything at once?
  │   └─ YES → Use Master Workflow (3_combined_master_workflow.json)
  │
  ├─ Only need product research?
  │   └─ YES → Use Research Workflow (1_product_research_workflow.json)
  │
  ├─ Already have research, need scripts?
  │   └─ YES → Use Script Generator (2_script_generation_workflow.json)
  │
  └─ Want maximum flexibility?
      └─ Import ALL three workflows
```

## Detailed Comparison

### 1. Product Research Workflow
**File:** `1_product_research_workflow.json`

#### When to Use:
- ✅ Building a product research database
- ✅ Need research for other purposes (not just scripts)
- ✅ Want to review research before generating scripts
- ✅ Team workflow: researchers separate from copywriters

#### Pros:
- Lightweight and fast
- Reusable research output
- Can store/archive research documents
- One-time API cost for research

#### Cons:
- Requires second step for scripts
- Manual handoff between workflows

#### Input:
```json
{
  "productUrl": "https://example.com/product"
}
```

#### Output:
```json
{
  "researchDocument": "[Full research markdown]",
  "productUrl": "https://example.com/product",
  "createdAt": "2025-12-20T12:00:00.000Z"
}
```

#### Best For:
- Product analysts
- Marketing researchers
- Content strategists
- Database builders

---

### 2. Script Generation Workflow
**File:** `2_script_generation_workflow.json`

#### When to Use:
- ✅ You already have research documents
- ✅ Need to generate multiple script batches from same research
- ✅ Want to test different angles without re-researching
- ✅ Cost optimization: reuse research, generate scripts as needed

#### Pros:
- Maximum flexibility with angles
- Generate unlimited scripts from one research doc
- Can adjust parameters without re-fetching product page
- Cheaper than re-running full research

#### Cons:
- Requires research document input
- Two-step process
- Manual data transfer

#### Input:
```json
{
  "researchDocument": "[Previously generated research]",
  "scriptCount": 5,
  "scriptLength": "60s",
  "selectedAngles": "all"
}
```

#### Output:
```json
{
  "compiledScripts": "[All scripts in one document]",
  "scriptCount": 5,
  "scriptLength": "60s",
  "scripts": [
    {"number": 1, "content": "..."},
    {"number": 2, "content": "..."}
  ]
}
```

#### Best For:
- Copywriters with existing research
- A/B testing different angles
- Batch script generation
- Cost-conscious users

---

### 3. Master Workflow (Combined)
**File:** `3_combined_master_workflow.json`

#### When to Use:
- ✅ Need complete solution in one go
- ✅ New product → scripts pipeline
- ✅ Quick turnaround required
- ✅ Simplicity over flexibility

#### Pros:
- **One-click solution**: URL → Research → Scripts
- No manual data transfer
- Fastest for end-to-end process
- Complete documentation in one file
- Perfect for automation

#### Cons:
- Slightly higher API costs (runs everything each time)
- Can't easily reuse research for multiple script batches
- Less flexible for iterative refinement

#### Input:
```json
{
  "productUrl": "https://example.com/product",
  "scriptCount": 5,
  "scriptLength": "60s",
  "selectedAngles": "all"
}
```

#### Output:
```json
{
  "finalDocument": "[Research + All Scripts]",
  "researchDocument": "[Research only]",
  "productUrl": "https://example.com/product",
  "scriptCount": 5,
  "scriptLength": "60s",
  "scripts": [...]
}
```

#### Best For:
- Quick projects
- Agencies with multiple clients
- Automation pipelines
- Non-technical users

---

## Use Case Scenarios

### Scenario 1: Agency with 10 Clients
**Recommendation:** Master Workflow

**Why:**
- Different product each time
- Need complete deliverables quickly
- One workflow = simpler team process

**Setup:**
```bash
# Single workflow for all clients
for client_url in "${product_urls[@]}"; do
  curl -X POST webhook-url \
    -d "{\"productUrl\": \"$client_url\", \"scriptCount\": 5, ...}"
done
```

---

### Scenario 2: E-commerce Brand Testing Angles
**Recommendation:** Research Workflow + Script Generation Workflow

**Why:**
- One product, many script variations
- Can test different angles without re-researching
- Cost-effective for iterations

**Workflow:**
```
Day 1: Run research workflow → Save document
Day 2: Generate 5 scripts with "problem-solution" angle
Day 3: Generate 5 scripts with "social-proof" angle
Day 4: Generate 5 scripts with "transformation" angle
```

---

### Scenario 3: Marketing Team Building Library
**Recommendation:** All Three Workflows

**Why:**
- Maximum flexibility
- Different team members, different needs
- Some need research only
- Some need scripts only
- Some need everything

**Team Structure:**
```
Research Team → Workflow 1 → Research Database
                                    ↓
Copywriting Team → Workflow 2 → Script Library
                                    ↓
Quick Response Team → Workflow 3 → Fast Deliverables
```

---

### Scenario 4: Solo Creator, Multiple Products
**Recommendation:** Master Workflow

**Why:**
- Simplicity
- Consistent output format
- Less workflow management

---

## Cost Comparison

Assuming GPT-4o pricing (~$0.015 per 1k tokens):

### Scenario: 1 Product, 5 Scripts

| Workflow | Research Cost | Script Cost | Total |
|----------|--------------|-------------|-------|
| Master (x1) | Included | Included | ~$0.50 |
| Research + Scripts | ~$0.20 | ~$0.30 | ~$0.50 |

### Scenario: 1 Product, 15 Scripts (3 batches)

| Workflow | Research Cost | Script Cost | Total |
|----------|--------------|-------------|-------|
| Master (x3) | $0.20 x 3 | $0.30 x 3 | ~$1.50 |
| Research + Scripts (x3) | $0.20 x 1 | $0.30 x 3 | ~$1.10 |

**Savings:** 27% by reusing research

### Scenario: 10 Products, 5 Scripts Each

| Workflow | Total Cost |
|----------|------------|
| Master (x10) | ~$5.00 |
| Research + Scripts | ~$5.00 |

**Same cost** for single-batch processing

---

## Performance Comparison

| Workflow | Avg. Execution Time | Webhook Calls | Complexity |
|----------|-------------------|---------------|------------|
| Master | 60-90 seconds | 1 | Low |
| Research Only | 20-30 seconds | 1 | Very Low |
| Scripts Only | 40-60 seconds | 1 | Low |
| Research + Scripts | 60-90 seconds | 2 | Medium |

---

## Recommendation Matrix

| Your Need | Best Workflow | Why |
|-----------|--------------|-----|
| Speed & Simplicity | Master | One call, done |
| Cost Optimization | Research + Scripts | Reuse research |
| Research Archive | Research Only | Build knowledge base |
| Iteration/Testing | Scripts Only | Fast angle testing |
| Maximum Flexibility | All Three | Different uses cases |
| Automation/API | Master | Simplest integration |
| Team Collaboration | Research + Scripts | Clear handoffs |

---

## Migration Path

### Start Simple:
1. **Week 1:** Use Master Workflow only
2. **Week 2-3:** Import Research Workflow if you need archives
3. **Week 4+:** Add Scripts Workflow for iteration

### Start Advanced:
1. Import all three workflows immediately
2. Use Master for 80% of use cases
3. Use separate workflows for special cases

---

## Final Recommendation

**Most Users (80%):** Start with **Master Workflow** only
- Covers 90% of use cases
- Easiest to learn
- Fastest results

**Power Users (20%):** Import **all three**
- Maximum flexibility
- Cost optimization
- Team collaboration

---

Still not sure? **Start with the Master Workflow.** You can always import the others later.
