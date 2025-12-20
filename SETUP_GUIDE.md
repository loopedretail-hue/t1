# Setup Guide - n8n Product Research & UGC Script Generator

Complete step-by-step setup instructions for getting your workflows running.

## Prerequisites Checklist

- [ ] n8n instance (self-hosted or cloud)
- [ ] OpenAI API account with API key
- [ ] Product URLs you want to analyze
- [ ] Basic familiarity with n8n interface

## Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (you won't see it again!)
6. **Important:** This will incur costs based on usage
   - GPT-4o pricing: ~$0.01-0.03 per request depending on product page size
   - Budget recommendation: Start with $10-20 credit for testing

## Step 2: Import Workflows to n8n

### For n8n Cloud:
1. Log into your n8n cloud instance
2. Click "Add workflow" button (top right)
3. Select "Import from File"
4. Choose which workflow to import:
   - **Start with:** `3_combined_master_workflow.json` (most useful)
   - **Optional:** Import the other two for flexibility

### For Self-Hosted n8n:
1. Access your n8n instance URL
2. Navigate to Workflows
3. Click "Add workflow" → "Import from File"
4. Upload the JSON file

### Visual Guide:
```
n8n Interface
├── Workflows (sidebar)
│   └── Add workflow button
│       └── Import from File
│           └── Select .json file
│               └── Workflow imported! ✓
```

## Step 3: Configure OpenAI Credentials

### First Time Setup:
1. In your n8n instance, go to **Settings** (bottom left)
2. Click **Credentials**
3. Click **Add Credential**
4. Search for "OpenAI"
5. Select "OpenAI API"
6. Fill in:
   - **Credential Name:** "OpenAI GPT-4"
   - **API Key:** [paste your key]
7. Click **Save**

### Connect to Workflow:
1. Open your imported workflow
2. Find nodes with warning icons (missing credentials):
   - "AI Product Research"
   - "Generate UGC Script"
3. Click each node
4. In the parameters panel, find "Credential for OpenAI API"
5. Select "OpenAI GPT-4" from dropdown
6. Repeat for all AI nodes

## Step 4: Activate the Workflow

1. Open the workflow
2. Click **Activate** toggle (top right)
3. Status should change to "Active" (green)
4. Note the webhook URL shown in the "Webhook Trigger" node

### Finding Your Webhook URL:
1. Click on the "Webhook Trigger" node
2. In the parameters, you'll see the webhook path
3. Full URL format: `https://[your-instance]/webhook/[path]`
   - Example: `https://myapp.n8n.cloud/webhook/product-to-scripts`

## Step 5: Test Your Workflow

### Quick Test (Using n8n Interface):

1. Open your workflow
2. Click on "Webhook Trigger" node
3. Click "Listen for Test Event"
4. In a new terminal or Postman, send:

```bash
curl -X POST https://your-instance.com/webhook/product-to-scripts \
  -H "Content-Type: application/json" \
  -d '{
    "productUrl": "https://www.apple.com/airpods-pro/",
    "scriptCount": 2,
    "scriptLength": "60s",
    "selectedAngles": "all"
  }'
```

5. Watch the workflow execute in real-time
6. Check the output in the final node

### Verify Success:
- ✅ All nodes turn green
- ✅ Research document is generated
- ✅ Scripts are created
- ✅ No error messages

## Step 6: Save Your Webhook URLs

Create a reference document with your webhook URLs:

```
MASTER WORKFLOW (Recommended):
https://your-instance.com/webhook/product-to-scripts

RESEARCH ONLY:
https://your-instance.com/webhook/product-research

SCRIPTS ONLY:
https://your-instance.com/webhook/generate-scripts
```

## Troubleshooting Setup Issues

### "Cannot find credential"
- **Solution:** Make sure you created the OpenAI credential in Settings → Credentials
- Verify the credential name matches what you selected in nodes

### "Webhook not found" error
- **Solution:** Workflow must be **activated** (not just saved)
- Check that the webhook path matches your request URL

### "OpenAI API error - Invalid API key"
- **Solution:** Double-check your API key
- Ensure no extra spaces when pasting
- Verify your OpenAI account has billing enabled

### "Request timeout"
- **Solution:** First run may be slower
- Increase timeout in HTTP Request node settings
- Check your internet connection

### Workflow runs but produces gibberish
- **Solution:** Check that you're using GPT-4o or GPT-4
- Lower-tier models (GPT-3.5) may not follow instructions as well

## Configuration Tips

### Cost Optimization:
- Start with `scriptCount: 2-3` for testing
- Use shorter script lengths for initial tests
- Monitor OpenAI usage dashboard

### Performance Optimization:
- Keep product page HTML under 50k characters (handled automatically)
- Use direct product pages, not category pages
- Ensure stable internet connection to n8n instance

### Production Readiness:
- [ ] Set up error notifications (n8n error workflow)
- [ ] Create backup of workflows (export JSON)
- [ ] Document your specific webhook URLs
- [ ] Set up monitoring for API costs
- [ ] Consider rate limiting for public webhooks

## Next Steps

After successful setup:

1. **Test with Real Products**
   - Use your actual product URLs
   - Experiment with different configurations
   - Review script quality

2. **Customize Prompts**
   - Edit AI node prompts to match your brand voice
   - Adjust research sections based on your needs
   - Fine-tune script structure

3. **Integrate with Tools**
   - Add nodes to save to Google Sheets
   - Send to Slack/Discord
   - Store in Airtable or database

4. **Scale Usage**
   - Create a front-end form for team members
   - Set up batch processing
   - Automate regular script generation

## Support Resources

- **n8n Documentation:** https://docs.n8n.io
- **n8n Community:** https://community.n8n.io
- **OpenAI API Docs:** https://platform.openai.com/docs

---

You're all set! Start generating amazing product research and UGC scripts. 🚀
