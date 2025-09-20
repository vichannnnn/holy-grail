# TICKET-016: Build Question-Answer Matching System

## Description
Create a system to match extracted MCQ questions with their corresponding answer keys. Handle both embedded answers (within the same document) and separate answer documents.

## Acceptance Criteria
- [ ] Identify question-answer document pairs
- [ ] Match questions to answers by question number
- [ ] Handle different answer formats:
  - Inline answers (e.g., "Answer: B")
  - Separate answer keys
  - Marking schemes with answers
- [ ] Validate answer accuracy for Math/Science
- [ ] Create confidence scoring for matches
- [ ] Generate report of unmatched questions

## Technical Requirements
- Process documents with patterns like "QP" and "ANS"
- Use fuzzy matching for document pairing
- Implement answer extraction logic
- Create validation rules for deterministic subjects

## Implementation Steps
1. Analyze document naming patterns
2. Create document pairing algorithm
3. Extract answers from various formats
4. Match questions to answers by ID
5. Implement validation checks
6. Generate matching statistics

## Priority
High

## Status
Todo

## Estimated Time
2 days

## Dependencies
- TICKET-015 completion (extracted MCQs)
- Access to approved_documents.json

## Notes
- Focus on recent exam papers with clear answer keys
- Priority: Math > Physics > Chemistry > Biology
- Consider TYS (Ten Year Series) answer documents