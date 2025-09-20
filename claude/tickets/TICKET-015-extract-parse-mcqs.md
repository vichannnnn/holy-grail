# TICKET-015: Extract and Parse Math/Science MCQs from Exam Papers

## Description
Build an MCQ extraction system that processes Math and Science exam papers to identify and extract multiple choice questions with their answers. Focus on deterministic subjects where answers are clear and verifiable.

## Acceptance Criteria
- [ ] Create MCQ extractor class extending SimpleAISummarizer
- [ ] Extract MCQs from at least 100 Math/Science exam papers
- [ ] Correctly identify:
  - Question text
  - 4 options (A, B, C, D)
  - Correct answer
  - Subject and topic
  - Marks allocated
- [ ] Handle various MCQ formats (inline answers, separate answer keys)
- [ ] Store extracted MCQs in structured JSON format
- [ ] Validate extraction accuracy on sample of 50 questions

## Technical Requirements
- Use existing GPT-5 wrapper (SimpleAISummarizer)
- Process only Math, Physics, Chemistry, Biology papers
- Focus on exam papers with clear MCQ sections
- Create data validation checks

## Implementation Steps
1. Filter documents for Math/Science exam papers
2. Create MCQExtractor class
3. Implement extraction logic using GPT-5
4. Parse and structure MCQ data
5. Save to JSON files for validation
6. Manual review of extraction quality

## Priority
High

## Status
Todo

## Estimated Time
2-3 days

## Dependencies
- Access to extracted_texts directory
- SimpleAISummarizer class
- OpenAI API key configured

## Notes
- Start with papers that have clear MCQ sections
- Prioritize recent years (2020-2025) for relevance
- Consider papers with embedded answers first