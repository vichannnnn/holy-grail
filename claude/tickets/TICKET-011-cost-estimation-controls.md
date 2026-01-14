# TICKET-011: Add Cost Estimation and Permission Controls to AI Summarizer

## Description
Implement cost estimation and user permission controls for API calls in the Holy Grail prototype to prevent unexpected charges and give users full transparency over API usage. This feature will show estimated costs before making any API calls and require explicit user permission by default.

## Acceptance Criteria
- [ ] Token counting implementation for accurate cost estimation
  - [ ] OpenAI token counting using tiktoken
  - [ ] Anthropic token estimation (character-based)
- [ ] Cost calculation based on current API pricing
  - [ ] Support for multiple OpenAI models (gpt-3.5-turbo, gpt-4)
  - [ ] Support for Anthropic models (Claude 3 variants)
- [ ] Permission controls
  - [ ] Display cost estimate before any API call
  - [ ] Require explicit user confirmation by default
  - [ ] Support different permission modes (always ask, ask if expensive, dry run)
- [ ] Safety features
  - [ ] Per-request cost limit
  - [ ] Session spending limit
  - [ ] Audit logging of all API requests
- [ ] CLI enhancements
  - [ ] --dry-run flag to preview costs without calling API
  - [ ] --estimate-only flag to just show cost estimation
  - [ ] --auto-approve flag with clear warnings
  - [ ] --max-cost parameter to set spending limit
- [ ] Documentation
  - [ ] Update README with cost control features
  - [ ] Add examples of cost estimation usage
  - [ ] Document permission control options

## Implementation Details

### Files to Create:
1. `prototype/cost_estimator.py` - Core cost estimation module

### Files to Modify:
1. `prototype/simple_ai_summarizer.py` - Add cost controls
2. `prototype/requirements.txt` - Add tiktoken dependency
3. `prototype/README.md` - Document new features

### Key Features:
- Show token count and estimated cost before API calls
- Default to requiring user permission
- Track cumulative session costs
- Log all API requests for audit trail
- Support dry-run mode for testing

## Priority
High

## Status
Done

## Summary
Successfully implemented comprehensive cost estimation and permission controls for the AI summarizer:
- ✅ Token counting with tiktoken for OpenAI models
- ✅ Character-based estimation for Anthropic models
- ✅ Support for all major models including gpt-5-nano-2025-08-07
- ✅ Multiple permission modes (Always Ask, Ask If Expensive, Dry Run, Auto Approve)
- ✅ Session spending limits and per-request cost limits
- ✅ Audit logging in JSONL format
- ✅ CLI flags for all control modes
- ✅ Beautiful cost display tables in terminal
- ✅ Comprehensive documentation in README

The system now provides full transparency and control over AI API spending.

## Notes
- This is a critical safety feature to prevent unexpected API charges
- Should be implemented before any public deployment or sharing
- Consider adding pre-generated examples to avoid API calls entirely for demos