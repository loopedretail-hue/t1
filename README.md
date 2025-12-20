# n8n Product Research & UGC Script Generator

A powerful n8n automation system that analyzes products from URLs and generates high-converting UGC (User Generated Content) scripts for Meta ads.

## 🎯 What This Does

### Workflow 1: Product Research
- **Input:** Product URL
- **Process:** Deep AI-powered product analysis
- **Output:** Comprehensive research document covering features, benefits, target audience, messaging angles, and more

### Workflow 2: UGC Script Generation
- **Input:** Research document + configuration (script count, length, angles)
- **Process:** AI-generated UGC scripts optimized for Meta ads
- **Output:** Multiple unique scripts with hooks, structure, and visual suggestions

### Workflow 3: Master Workflow (Combined)
- **Input:** Product URL + script preferences
- **Process:** Research → Script generation in one flow
- **Output:** Complete document with research + all scripts

## 📁 Files Included

| File | Description |
|------|-------------|
| `1_product_research_workflow.json` | Standalone product research workflow |
| `2_script_generation_workflow.json` | Standalone script generation workflow |
| `3_combined_master_workflow.json` | End-to-end workflow (research + scripts) |
| `example_requests.json` | Sample API requests for testing |
| `README.md` | This file |

## 🚀 Quick Start

### Prerequisites
- n8n instance (cloud or self-hosted)
- OpenAI API key (for GPT-4o)
- Basic understanding of n8n workflows

### Installation

1. **Import Workflows to n8n**
   - Open your n8n instance
   - Click "Add workflow" → "Import from File"
   - Import each JSON file (or start with just the master workflow)

2. **Configure OpenAI Credentials**
   - Go to Settings → Credentials
   - Add new "OpenAI" credential
   - Enter your OpenAI API key
   - Connect the credential to all "AI" nodes in the workflows

3. **Activate Workflows**
   - Open each imported workflow
   - Click "Activate" in the top right
   - Note the webhook URLs for each workflow

## 📝 Usage

### Option A: Master Workflow (Recommended)

**Endpoint:** `/product-to-scripts`

**Request:**
```bash
curl -X POST https://your-n8n-instance.com/webhook/product-to-scripts \
  -H "Content-Type: application/json" \
  -d '{
    "productUrl": "https://example.com/product",
    "scriptCount": 5,
    "scriptLength": "60s",
    "selectedAngles": "all"
  }'
```

### Option B: Separate Workflows

**Step 1: Generate Research**
```bash
curl -X POST https://your-n8n-instance.com/webhook/product-research \
  -H "Content-Type: application/json" \
  -d '{
    "productUrl": "https://example.com/product"
  }'
```

**Step 2: Generate Scripts**
```bash
curl -X POST https://your-n8n-instance.com/webhook/generate-scripts \
  -H "Content-Type: application/json" \
  -d '{
    "researchDocument": "[paste research from step 1]",
    "scriptCount": 5,
    "scriptLength": "60s",
    "selectedAngles": "all"
  }'
```

## ⚙️ Configuration Options

### Script Count
- **Type:** Number
- **Default:** 3
- **Range:** 1-20 (recommended)
- **Example:** `"scriptCount": 5`

### Script Length
Choose from preset durations that map to word counts:

| Duration | Approximate Words | Use Case |
|----------|------------------|----------|
| `30s` | ~75 words | Quick hooks, teaser ads |
| `60s` | ~150 words | Standard UGC format, most versatile |
| `90s` | ~225 words | In-depth product explanations |
| `120s` | ~300 words | Detailed stories, transformations |

**Example:** `"scriptLength": "60s"`

### Selected Angles
Control which messaging angles to use:

- **`"all"`** - AI selects from all available angles in research
- **Specific angles** - Comma-separated list
  - Example: `"problem-solution, social-proof, transformation"`
  - Available angles from research:
    - `problem-solution`
    - `benefit-focused`
    - `lifestyle-aspiration`
    - `social-proof`
    - `scarcity-urgency`
    - `educational`
    - `comparison`
    - `transformation`

**Example:** `"selectedAngles": "problem-solution, social-proof"`

## 📊 Output Structure

### Research Document Sections
1. **Product Overview** - Name, brand, category, price, use case
2. **Key Features & Benefits** - Features translated to benefits
3. **Target Audience** - Demographics, pain points, motivations
4. **Product Differentiators** - Unique value propositions
5. **Emotional Triggers** - Emotions, aspirations, fears addressed
6. **Proof Elements** - Social proof, certifications, guarantees
7. **Customer Journey Insights** - Awareness, consideration, decision stages
8. **Messaging Angles** - 10-15 ad angles for script generation
9. **Key Talking Points** - Bullet points for UGC scripts
10. **Language & Tone** - Brand voice recommendations

### UGC Script Structure
Each script includes:
- **Hook** (3 seconds) - Pattern interrupt
- **Problem/Agitation** (5-10 seconds) - Pain point description
- **Solution Introduction** (5-10 seconds) - Product introduction
- **Features → Benefits** (15-30 seconds) - Key features with benefits
- **Social Proof** (5-10 seconds) - Trust elements
- **Call to Action** (5 seconds) - Clear next step

Plus:
- **Visual Suggestions** - B-roll and shot recommendations
- **Key Talking Points** - Main messages summarized
- **Actual Word Count** - For accurate timing

## 💡 Use Cases

### E-commerce Brands
Generate scripts for product launches, seasonal campaigns, or ongoing ad creative rotation.

### Marketing Agencies
Scale UGC script creation for multiple clients without manual copywriting.

### UGC Creators
Get structured scripts to guide your video recordings with proven frameworks.

### Meta Ads Teams
Produce diverse ad angles quickly for testing and optimization.

## 🎨 Customization

### Modify AI Prompts
Each AI node contains customizable prompts. To adjust:
1. Open the workflow
2. Click on "AI Product Research" or "Generate UGC Script" node
3. Edit the message content in the parameters
4. Adjust temperature (creativity) and maxTokens (length)

### Add Custom Sections
Want additional research sections or script elements?
1. Update the AI prompt in the relevant node
2. Adjust the output formatting in "Aggregate" nodes
3. Save and test

### Change AI Model
Currently using GPT-4o, but you can switch:
1. Click AI node
2. Change "model" parameter
3. Options: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`
4. Consider cost vs quality tradeoffs

## 🔧 Troubleshooting

### "Product page failed to load"
- Check if the URL is accessible (not behind login)
- Some sites block automated requests - may need to add user-agent headers
- Try the URL in a browser first to confirm it loads

### "AI response timeout"
- Increase timeout in HTTP Request node settings
- Very large product pages may need text truncation adjustments
- Check OpenAI API rate limits

### "Scripts are too similar"
- Increase temperature in AI nodes (0.9-1.0 for more variety)
- Ensure `selectedAngles` is set to "all" or specify diverse angles
- Generate fewer scripts at a time for more variety

### "Word count doesn't match target"
- AI approximates word count - expect ±10-20 words variance
- Adjust the prompt to be more strict about word count if needed
- Consider post-processing to trim/expand scripts

## 📈 Best Practices

### Research Quality
- Use direct product pages (not category or homepage URLs)
- Longer product pages = better research quality
- If available, use the product's main landing page

### Script Generation
- Start with 3-5 scripts to maintain quality and variety
- Use 60s length as the standard - most versatile for Meta ads
- Review and edit scripts - AI provides foundation, you add brand voice
- Test different angles to see what resonates with your audience

### Workflow Efficiency
- Use the master workflow for most cases (faster, one-click)
- Use separate workflows when you want to:
  - Reuse research for multiple script batches
  - Have different team members handle research vs scripting
  - Store research in a database for later use

## 🔐 Security Notes

- Never commit your OpenAI API key to version control
- Webhook URLs are publicly accessible - consider adding authentication
- Use n8n's credential encryption for production environments
- Monitor API usage to control costs

## 📞 Support & Contribution

This is an open workflow system. Feel free to:
- Customize for your specific needs
- Add additional workflow steps (e.g., save to database, send to Slack)
- Integrate with other tools (Airtable, Google Sheets, Notion)
- Share improvements with the community

## 📄 License

This workflow collection is provided as-is for educational and commercial use.

---

**Built with n8n + OpenAI GPT-4o**

Happy scripting! 🎬
