# System Architecture

Visual overview of how the workflows operate.

## High-Level Flow

```
┌─────────────────┐
│  Product URL    │
│  + Parameters   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│           MASTER WORKFLOW (Recommended)             │
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐ │
│  │  Fetch   │───▶│ Research │───▶│   Generate   │ │
│  │  Page    │    │  w/ AI   │    │   Scripts    │ │
│  └──────────┘    └──────────┘    └──────┬───────┘ │
│                                          │         │
└──────────────────────────────────────────┼─────────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │  Research + Scripts    │
                              │  (Complete Document)   │
                              └────────────────────────┘
```

## Detailed Component Breakdown

### 1. Product Research Workflow

```
┌──────────────┐
│ Webhook      │  Receives: { productUrl }
│ Trigger      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Validate     │  Checks URL is valid
│ URL          │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ HTTP         │  Fetches HTML from URL
│ Request      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Extract      │  JavaScript: Clean HTML → Text
│ Text         │  - Remove scripts/styles
│              │  - Strip tags
│              │  - Clean whitespace
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ OpenAI       │  GPT-4o analyzes product
│ Research     │  Generates 10-section research doc
│              │  Temperature: 0.7 (balanced)
│              │  Max tokens: 4000
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Format       │  Structures output data
│ Output       │  + timestamp, metadata
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Convert to   │  Optional: Create downloadable file
│ File         │  Format: .txt (markdown)
└──────────────┘
```

**Key Technologies:**
- n8n HTTP Request node (fetch)
- JavaScript Code node (parsing)
- OpenAI GPT-4o (analysis)

**Processing Time:** 20-30 seconds
**API Costs:** ~$0.15-$0.25 per product

---

### 2. Script Generation Workflow

```
┌──────────────┐
│ Webhook      │  Receives:
│ Trigger      │  - researchDocument
│              │  - scriptCount
│              │  - scriptLength
│              │  - selectedAngles
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Validate     │  Checks all inputs present
│ Inputs       │  Sets defaults if missing
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Prepare      │  Maps scriptLength to word count:
│ Config       │  30s→75, 60s→150, 90s→225, 120s→300
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Create       │  JavaScript: Generate array
│ Loop Items   │  [1, 2, 3, ..., scriptCount]
│              │  Each item = script to generate
└──────┬───────┘
       │
       │  ╔═══════════════════════════════╗
       └─▶║  FOR EACH SCRIPT (Looping)   ║
          ╚═══════════════════════════════╝
                     │
                     ▼
          ┌──────────────────┐
          │ OpenAI           │  GPT-4o generates ONE script
          │ Generate         │  Uses unique angle per iteration
          │ Script           │  Temperature: 0.9 (creative)
          │                  │  Max tokens: 2000
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Format           │  Structure script output
          │ Script           │  Add metadata
          └────────┬─────────┘
                   │
                   │
       ╔═══════════▼═══════════════════╗
       ║  END LOOP - All scripts done  ║
       ╚═══════════╤═══════════════════╝
                   │
                   ▼
          ┌──────────────────┐
          │ Aggregate        │  JavaScript: Combine all scripts
          │ All Scripts      │  Create compilation document
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Convert to       │  Create downloadable file
          │ File             │  Format: .txt (markdown)
          └──────────────────┘
```

**Key Technologies:**
- n8n Loop functionality (implicit in array processing)
- OpenAI GPT-4o (script generation)
- JavaScript aggregation

**Processing Time:** 40-60 seconds (5 scripts)
**API Costs:** ~$0.25-$0.35 (5 scripts)

---

### 3. Master Workflow (Combined)

```
┌──────────────┐
│ Webhook      │  Receives ALL parameters:
│ Trigger      │  - productUrl
│              │  - scriptCount
│              │  - scriptLength
│              │  - selectedAngles
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Capture      │  Store all inputs for later nodes
│ All Inputs   │  (n8n state management)
└──────┬───────┘
       │
       │
       │   ╔═════════════════════════════════╗
       │   ║  RESEARCH PHASE                 ║
       │   ║  (Identical to Workflow 1)      ║
       │   ╚═════════════════════════════════╝
       │
       ▼
┌──────────────┐
│ Fetch Page   │
└──────┬───────┘
       ▼
┌──────────────┐
│ Extract Text │
└──────┬───────┘
       ▼
┌──────────────┐
│ AI Research  │
└──────┬───────┘
       │
       │
       │   ╔═════════════════════════════════╗
       │   ║  TRANSITION PHASE               ║
       │   ╚═════════════════════════════════╝
       │
       ▼
┌──────────────┐
│ Prepare for  │  Pass research doc + config
│ Scripts      │  to script generation phase
└──────┬───────┘
       │
       │
       │   ╔═════════════════════════════════╗
       │   ║  SCRIPT GENERATION PHASE        ║
       │   ║  (Identical to Workflow 2)      ║
       │   ╚═════════════════════════════════╝
       │
       ▼
┌──────────────┐
│ Create Loop  │
└──────┬───────┘
       ▼
┌──────────────┐
│ Generate     │  Loop: Generate each script
│ Scripts      │
└──────┬───────┘
       ▼
┌──────────────┐
│ Format       │
│ Scripts      │
└──────┬───────┘
       │
       │
       │   ╔═════════════════════════════════╗
       │   ║  FINAL OUTPUT PHASE             ║
       │   ╚═════════════════════════════════╝
       │
       ▼
┌──────────────┐
│ Aggregate    │  Combine:
│ Everything   │  - Research document
│              │  - All scripts
│              │  - Metadata
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Create Final │  One complete downloadable file
│ Document     │  Contains everything
└──────────────┘
```

**Key Technologies:**
- All of the above combined
- Smart state passing between phases

**Processing Time:** 60-90 seconds (5 scripts)
**API Costs:** ~$0.45-$0.60 total

---

## Data Flow Diagram

### Input → Processing → Output

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INPUT                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    "productUrl": "https://example.com/product",            │
│    "scriptCount": 5,                                       │
│    "scriptLength": "60s",                                  │
│    "selectedAngles": "problem-solution, social-proof"      │
│  }                                                          │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXTRACTION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Product Page HTML (raw)                                   │
│  ↓                                                          │
│  Cleaned Text (no HTML tags, scripts, styles)             │
│  ↓                                                          │
│  Truncated (first 50k chars)                              │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI ANALYSIS LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GPT-4o Process:                                           │
│  1. Understand product from text                           │
│  2. Identify key features, benefits                        │
│  3. Determine target audience                              │
│  4. Extract emotional triggers                             │
│  5. Generate messaging angles                              │
│  6. Create comprehensive research                          │
│                                                             │
│  Output: Structured Research Document                      │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 SCRIPT GENERATION LAYER                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  For each of 5 scripts:                                    │
│  ┌────────────────────────────────────────────────┐       │
│  │ GPT-4o Script Generation:                      │       │
│  │ - Select unique angle                          │       │
│  │ - Create hook (3s)                             │       │
│  │ - Build problem/agitation (5-10s)              │       │
│  │ - Introduce solution (5-10s)                   │       │
│  │ - Explain features→benefits (15-30s)           │       │
│  │ - Add social proof (5-10s)                     │       │
│  │ - Strong CTA (5s)                              │       │
│  │ - Target: ~150 words for 60s                   │       │
│  └────────────────────────────────────────────────┘       │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    AGGREGATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Combine:                                                  │
│  - Product research document                               │
│  - Script 1 (Problem-Solution angle)                       │
│  - Script 2 (Social Proof angle)                           │
│  - Script 3 (Transformation angle)                         │
│  - Script 4 (Educational angle)                            │
│  - Script 5 (Lifestyle angle)                              │
│                                                             │
│  Format as markdown document                               │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      FINAL OUTPUT                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    "finalDocument": "[Full markdown with research+scripts]",│
│    "researchDocument": "[Research only]",                  │
│    "scripts": [                                            │
│      {"number": 1, "content": "..."},                     │
│      {"number": 2, "content": "..."},                     │
│      ...                                                   │
│    ],                                                       │
│    "scriptCount": 5,                                       │
│    "scriptLength": "60s"                                   │
│  }                                                          │
│                                                             │
│  + Downloadable .txt file                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Node Types Reference

### n8n Nodes Used:

| Node Type | Purpose | Count per Workflow |
|-----------|---------|-------------------|
| Webhook Trigger | Entry point for HTTP requests | 1 |
| HTTP Request | Fetch external URLs | 1 |
| Code (JavaScript) | Custom logic, parsing, loops | 2-3 |
| Set (Edit Fields) | Data transformation | 2-4 |
| If (Conditional) | Validation | 1 |
| OpenAI Chat Model | AI processing | 1-2 |
| Convert to File | File generation | 1 |
| Sticky Note | Documentation | 1 |

### External Dependencies:

- **OpenAI API** (GPT-4o model)
- **Target product website** (must be publicly accessible)

---

## Error Handling

```
Input Validation
    ↓
    ├─ Valid → Continue
    └─ Invalid → Return 400 error

HTTP Fetch
    ↓
    ├─ Success → Continue
    └─ Fail → Return 502 error (bad gateway)

AI Processing
    ↓
    ├─ Success → Continue
    └─ Fail → Return 500 error + retry suggestion
```

**Built-in Safeguards:**
- URL validation before fetch
- HTML size limiting (50k chars)
- Timeout handling (adjustable)
- Default value fallbacks

---

## Scalability Considerations

### Single Instance Limits:
- **Concurrent executions:** n8n dependent (~5-10)
- **Max script count:** Limited by OpenAI rate limits
- **Product page size:** 50k chars (configurable)

### Scaling Options:
1. **Horizontal:** Multiple n8n instances
2. **Queue-based:** Add n8n Queue node for batch processing
3. **Caching:** Cache research docs in database
4. **Rate limiting:** Add delay nodes for API limits

---

## Security Architecture

```
User Request
    ↓
Webhook (Public) ⚠️
    ↓
n8n Workflow (Private)
    ↓
    ├─ OpenAI API (Encrypted) ✓
    └─ Target URL (Public)
```

**Security Recommendations:**
- Add authentication to webhooks (n8n feature)
- Use environment variables for API keys
- Implement rate limiting
- Validate/sanitize all inputs
- Monitor for abuse

---

This architecture provides a robust, scalable foundation for automated product research and UGC script generation.
