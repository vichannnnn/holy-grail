# Adaptive Quiz System Implementation Plan

## Project Overview
Build an AI-powered adaptive quiz system that extracts MCQs from Math and Science exam papers, generates variations, and provides personalized practice with difficulty adjustment.

## Technical Architecture

### Core Components
1. **MCQ Extractor** - Extract multiple choice questions from exam papers
2. **Answer Matcher** - Match questions with answer keys
3. **Variation Generator** - Create AI-powered variations using GPT-5
4. **Adaptive Engine** - Adjust difficulty based on performance
5. **Quiz API** - RESTful endpoints for quiz functionality

### Technology Stack
- **Backend**: FastAPI (existing)
- **AI Model**: GPT-5 (via existing SimpleAISummarizer wrapper)
- **Database**: PostgreSQL (existing) + new quiz tables
- **Frontend**: React (to be integrated with main app)

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Set up project structure
- Create database schema
- Build MCQ extraction system
- Process initial batch of Math/Science papers

### Phase 2: AI Integration (Week 2)
- Implement variation generator
- Create question tagging system
- Build answer validation logic
- Test variations for accuracy

### Phase 3: Adaptive Engine (Week 3)
- Implement difficulty scoring
- Create adaptive algorithm
- Build performance tracking
- Test adaptive behavior

### Phase 4: API & Testing (Week 4)
- Create REST API endpoints
- Build simple test UI
- Comprehensive testing
- Performance optimization

## Database Design

### Tables
1. `mcq_questions` - Store extracted MCQs
2. `mcq_variations` - AI-generated variations
3. `user_quiz_attempts` - Track user performance
4. `quiz_sessions` - Active quiz sessions
5. `subject_topics` - Topic hierarchy

### Key Relationships
- Questions → Variations (1:many)
- Questions → Attempts (1:many)
- Users → Sessions → Attempts

## AI Integration Strategy

### Using GPT-5 for:
1. **MCQ Extraction**
   - Identify question boundaries
   - Extract options and correct answers
   - Determine topic and difficulty

2. **Variation Generation**
   - Maintain question structure
   - Change context/numbers
   - Ensure answer validity

3. **Topic Tagging**
   - Identify concepts tested
   - Categorize by syllabus topics
   - Assign difficulty levels

## Adaptive Algorithm Design

### Difficulty Adjustment Rules
1. Start at medium difficulty (level 5/10)
2. Track rolling window of last 5 attempts
3. Adjust based on success rate:
   - 80%+ correct → increase by 1 level
   - 40-79% correct → maintain level
   - <40% correct → decrease by 1 level
4. Mix easier questions after 3 consecutive failures
5. Ensure topic variety within difficulty range

### Performance Metrics
- Response time per question
- Accuracy by topic
- Difficulty progression
- Learning curve analysis

## API Endpoints

### Core Endpoints
- `POST /api/quiz/start` - Initialize quiz session
- `GET /api/quiz/question` - Get next adaptive question
- `POST /api/quiz/answer` - Submit answer
- `GET /api/quiz/progress` - Current session stats
- `GET /api/quiz/history` - User performance history

### Admin Endpoints
- `POST /api/admin/extract-mcqs` - Process new papers
- `GET /api/admin/questions` - View extracted questions
- `POST /api/admin/validate` - Validate variations

## Success Criteria

### Quantitative Goals
- Extract 1000+ MCQs from Math/Science papers
- Generate 3-5 valid variations per question
- 95%+ accuracy in answer validation
- Adaptive adjustment within 5 questions
- <2s response time for question generation

### Quality Metrics
- Variation maintains original difficulty
- Questions remain conceptually valid
- Smooth difficulty progression
- Positive user feedback on adaptiveness

## Risk Mitigation

### Technical Risks
1. **MCQ Extraction Accuracy**
   - Manual validation of first 100 questions
   - Fallback to rule-based extraction

2. **Variation Quality**
   - Implement validation checks
   - Human review for edge cases

3. **Performance at Scale**
   - Cache generated variations
   - Optimize database queries

### Implementation Risks
1. **Scope Creep**
   - Focus on Math/Science MCQs only
   - Defer essay questions to Phase 2

2. **Integration Complexity**
   - Use existing infrastructure
   - Minimal changes to current API

## Next Steps
1. Create task tickets (TICKET-015 to TICKET-019)
2. Set up quiz_engine directory structure
3. Begin MCQ extraction implementation
4. Weekly progress reviews

## References
- Existing codebase: `/prototype/simple_ai_summarizer.py`
- Sample exam data: `/data/extracted_texts/`
- API structure: `/prototype/app.py`