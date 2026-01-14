# TICKET-025: Implement Real PDF Extraction from Holy Grail Documents

## Description
Update the PDF extraction system to download and extract text from actual Holy Grail documents using the correct URL format (`https://document.grail.moe/{file_name}`). Replace the mock extraction with real PDF content to improve AI summarization quality.

## Acceptance Criteria
- [ ] Update `pdf_extractor.py` to use correct document URL format
- [ ] Implement robust PDF download with retry logic
- [ ] Extract text from real PDFs using PyPDF2/pdfplumber
- [ ] Handle various PDF formats and encodings
- [ ] Store extracted text in structured format
- [ ] Update progress tracking and error handling
- [ ] Test with sample of documents from different subjects
- [ ] Handle edge cases (corrupt PDFs, scanned images, etc.)

## Implementation Details

### Files to Modify:
1. `prototype/pdf_extractor.py` - Update URL construction and download logic
2. `prototype/config.py` - Add document base URL configuration

### Key Changes:
- Change URL from CloudFront to `https://document.grail.moe/{file_name}`
- Use `file_name` field from document data (e.g., "09d0e847588d4e4197cfd7cb30a590f2.pdf")
- Implement connection pooling for efficient downloads
- Add retry logic with exponential backoff
- Improve text extraction quality

### Technical Considerations:
- Some PDFs may be scanned images requiring OCR
- Handle different encodings (UTF-8, Latin-1, etc.)
- Respect rate limits to avoid overloading servers
- Implement progress saving for resumable extraction

## Priority
High

## Status
Todo

## Notes
- Document URLs are publicly accessible at `document.grail.moe`
- File names are hash-based identifiers from the API
- Consider implementing parallel processing for faster extraction
- May need to handle authentication if some documents are restricted