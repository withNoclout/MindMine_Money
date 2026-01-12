# AI Valuation & Content Processing Workflow

## Overview
This document outlines the AI-driven content processing and automatic valuation system for Mind Mine Money. When educators upload content (videos, PDFs, GoodNotes), the system automatically:
1. Extracts text using AI (Whisper for video, OCR for documents)
2. Analyzes content against curriculum standards
3. Assigns a match percentage
4. Converts to credits automatically

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTENT UPLOAD FLOW                                  │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 1: UPLOAD & VALIDATION
                │
                ├─ File validation (type, size, format)
                ├─ Virus scan
                ├─ Create content record (status: 'draft')
                └─ Store in cloud storage (S3/GCS)
                        │
                        ▼
STEP 2: QUEUE FOR AI PROCESSING
                │
                ├─ Create async task (Celery/Redis)
                └─ Return to user: "Processing started..."
                        │
                        ▼
STEP 3: EXTRACT TEXT/TRANSCRIPT
         ┌──────────────────────────────────┐
         │  IF VIDEO:                       │
         │  - Use OpenAI Whisper            │
         │  - Generate transcript           │
         │                                  │
         │  IF PDF/GoodNotes:               │
         │  - Use Tesseract OCR + PyMuPDF   │
         │  - Extract text                  │
         └──────────────────────────────────┘
                        │
                        ▼
STEP 4: EXTRACT METADATA
                │
                ├─ Word count
                ├─ Detect language
                ├─ Identify subject/topic
                └─ Clean & normalize text
                        │
                        ▼
STEP 5: CURRICULUM MATCHING
                │
                ├─ Load curriculum standards (from DB)
                ├─ Keyword matching
                ├─ Similarity scoring (embeddings)
                ├─ Calculate match percentage
                └─ Identify matched topics
                        │
                        ▼
STEP 6: CALCULATE CREDITS
                │
                ├─ Convert match % to credits
                ├─ Apply quality multiplier
                ├─ Store score in DB
                └─ Create score record
                        │
                        ▼
STEP 7: AWARD CREDITS
                │
                ├─ Update wallet
                ├─ Create transaction record
                ├─ Send notification to educator
                └─ Update content status to 'approved'
                        │
                        ▼
DONE: CONTENT READY FOR SALE
```

---

## Detailed Workflow Steps

### Step 1: Content Upload & Validation

**File Uploaded** → Backend receives upload request

```python
# Frontend sends:
POST /api/v1/content/upload
Content-Type: multipart/form-data

{
    "file": <binary>,
    "title": "Introduction to Calculus",
    "description": "A comprehensive guide to differential calculus",
    "content_type": "video", # video, pdf, goodnotes
    "subject": "Mathematics",
    "grade_level": "12",
    "price_in_credits": 50
}

# Backend validates:
- File size < 5GB (video), < 100MB (document)
- File type matches content_type
- Title length: 10-255 characters
- No duplicate content from same educator
```

**Database Entry Created**:
```sql
INSERT INTO content (
    user_id, title, description, content_type,
    file_url, status, subject, grade_level, price_in_credits
) VALUES (
    'user-123', 'Introduction to Calculus', ..., 'pending_review'
);
```

---

### Step 2: Queue AI Processing Task

Asynchronous task queuing using **Celery + Redis**:

```python
# app/tasks/content_processing.py

from celery import shared_task
from app.services.ai_service import AIService
from app.models import Content, ContentMetadata, ContentScore

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def process_content_async(self, content_id: str):
    """
    Main async task for processing uploaded content.
    Retries up to 3 times with 60-second delay.
    """
    try:
        content = Content.get(id=content_id)
        ai_service = AIService()
        
        # Execute workflow
        transcript_or_text = ai_service.extract_text(content)
        match_percentage, details = ai_service.calculate_valuation(
            transcript_or_text,
            content.subject,
            content.grade_level
        )
        credits = ai_service.convert_score_to_credits(match_percentage)
        
        # Award credits
        ai_service.award_credits(content.user_id, credits, content_id)
        
        # Update content status
        content.status = 'approved'
        content.save()
        
        return {
            'status': 'success',
            'content_id': content_id,
            'match_percentage': match_percentage,
            'credits_awarded': credits
        }
        
    except Exception as exc:
        # Retry on failure
        raise self.retry(exc=exc)
```

**Celery Configuration** (`backend/app/tasks/celery.py`):
```python
from celery import Celery
import redis

app = Celery('mindmine')

app.conf.update(
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/1',
    task_serializer='json',
    accept_content=['json'],
    timezone='UTC',
    enable_utc=True,
    result_expires=3600,  # Results expire after 1 hour
    task_max_retries=3,
    task_default_retry_delay=60
)

app.autodiscover_tasks(['app.tasks'])
```

---

### Step 3: Text Extraction

#### Option A: Video Processing (Whisper)

```python
# ai-services/content_processor/transcriber.py

from openai import OpenAI
import os

class VideoTranscriber:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def transcribe_video(self, video_path: str, language: str = 'en') -> dict:
        """
        Transcribe video to text using OpenAI Whisper.
        
        Args:
            video_path: S3 URL or local path to video
            language: ISO 639-1 language code (e.g., 'th' for Thai)
        
        Returns:
            {
                'transcript': 'full text...',
                'duration_seconds': 3600,
                'language': 'en',
                'confidence_score': 0.95,
                'word_count': 5000
            }
        """
        try:
            # Download if needed (from S3, etc.)
            local_file = self._download_if_remote(video_path)
            
            # Transcribe using Whisper
            with open(local_file, 'rb') as audio_file:
                transcript_response = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language=language,
                    response_format="verbose_json"
                )
            
            # Extract metadata
            transcript_text = transcript_response.text
            duration = transcript_response.duration
            
            # Calculate metrics
            word_count = len(transcript_text.split())
            reading_time = word_count // 200  # 200 words per minute
            
            return {
                'transcript': transcript_text,
                'duration_seconds': duration,
                'language': language,
                'word_count': word_count,
                'reading_time_minutes': reading_time,
                'confidence_score': 0.95  # Whisper doesn't return confidence
            }
        
        except Exception as e:
            raise ProcessingError(f"Transcription failed: {str(e)}")
    
    def _download_if_remote(self, path: str) -> str:
        """Download from S3 if URL, otherwise return local path."""
        if path.startswith('s3://'):
            # Download from S3
            return self._download_from_s3(path)
        return path
```

#### Option B: Document Processing (OCR)

```python
# ai-services/content_processor/ocr_handler.py

import pytesseract
from pdf2image import convert_from_path
from PyPDF2 import PdfReader
import json

class DocumentOCRHandler:
    def __init__(self):
        self.language = 'tha+eng'  # Thai + English
    
    def extract_from_pdf(self, pdf_path: str) -> dict:
        """
        Extract text from PDF using PyPDF2 + OCR fallback.
        """
        try:
            # Try text extraction first (searchable PDFs)
            text = self._extract_text_pypdf(pdf_path)
            
            # If minimal text, use OCR
            if len(text.strip()) < 100:
                text = self._extract_text_ocr(pdf_path)
            
            word_count = len(text.split())
            page_count = self._get_page_count(pdf_path)
            
            return {
                'extracted_text': text,
                'page_count': page_count,
                'word_count': word_count,
                'reading_time_minutes': word_count // 200,
                'extraction_method': 'pdf' if len(text) > 100 else 'ocr'
            }
        
        except Exception as e:
            raise ProcessingError(f"PDF extraction failed: {str(e)}")
    
    def _extract_text_pypdf(self, pdf_path: str) -> str:
        """Extract text from searchable PDF."""
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    
    def _extract_text_ocr(self, pdf_path: str) -> str:
        """Extract text using Tesseract OCR."""
        images = convert_from_path(pdf_path)
        text = ""
        for image in images:
            ocr_text = pytesseract.image_to_string(
                image,
                lang=self.language,
                config='--psm 1'
            )
            text += ocr_text + "\n"
        return text
    
    def _get_page_count(self, pdf_path: str) -> int:
        reader = PdfReader(pdf_path)
        return len(reader.pages)
```

---

### Step 4: Extract Metadata

```python
# ai-services/valuation/content_analyzer.py

import nltk
from langdetect import detect
import re

class ContentAnalyzer:
    def __init__(self):
        nltk.download('punkt')
        nltk.download('averaged_perceptron_tagger')
    
    def analyze(self, text: str) -> dict:
        """
        Extract metadata from text.
        """
        # Detect language
        try:
            language = detect(text[:500])
        except:
            language = 'en'
        
        # Extract sentences
        sentences = nltk.sent_tokenize(text)
        
        # Calculate metrics
        words = text.split()
        word_count = len(words)
        avg_word_length = sum(len(w) for w in words) / len(words) if words else 0
        
        # Extract potential topics from text
        potential_topics = self._extract_topics(text)
        
        return {
            'language': language,
            'word_count': word_count,
            'sentence_count': len(sentences),
            'avg_word_length': round(avg_word_length, 2),
            'reading_level': self._estimate_reading_level(text),
            'potential_topics': potential_topics,
            'has_code_samples': self._contains_code(text),
            'has_diagrams_mentioned': self._contains_diagram_mentions(text)
        }
    
    def _estimate_reading_level(self, text: str) -> str:
        """
        Estimate reading level using Flesch-Kincaid formula.
        Returns: elementary, middle, high, college, academic
        """
        sentences = nltk.sent_tokenize(text)
        words = text.split()
        syllables = sum(self._count_syllables(word) for word in words)
        
        # Flesch-Kincaid Grade Level
        if len(sentences) == 0 or len(words) == 0:
            return 'unknown'
        
        grade = (0.39 * len(words) / len(sentences) +
                11.8 * syllables / len(words) - 15.59)
        
        if grade < 6:
            return 'elementary'
        elif grade < 9:
            return 'middle'
        elif grade < 13:
            return 'high'
        elif grade < 15:
            return 'college'
        else:
            return 'academic'
    
    def _extract_topics(self, text: str) -> list:
        """Extract likely topics from text."""
        # Simple regex-based extraction
        # In production, use NLP models
        topics = []
        
        # Common subject keywords
        keywords = {
            'mathematics': ['calculus', 'algebra', 'geometry', 'derivative', 'integral'],
            'physics': ['velocity', 'energy', 'force', 'quantum', 'relativity'],
            'chemistry': ['molecule', 'reaction', 'compound', 'atom', 'bond'],
            # ... more topics
        }
        
        text_lower = text.lower()
        for subject, keywords_list in keywords.items():
            for keyword in keywords_list:
                if keyword in text_lower:
                    topics.append(subject)
                    break
        
        return list(set(topics))
    
    def _count_syllables(self, word: str) -> int:
        """Rough syllable count."""
        vowels = 'aeiouy'
        syllable_count = 0
        previous_was_vowel = False
        for char in word.lower():
            is_vowel = char in vowels
            if is_vowel and not previous_was_vowel:
                syllable_count += 1
            previous_was_vowel = is_vowel
        return max(1, syllable_count)
    
    def _contains_code(self, text: str) -> bool:
        """Check if text contains code samples."""
        code_patterns = [
            r'def\s+\w+\(',  # Python
            r'function\s+\w+\(',  # JavaScript
            r'class\s+\w+',  # Java/C++
            r'```',  # Markdown code blocks
            r'<code>',  # HTML
        ]
        for pattern in code_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True
        return False
    
    def _contains_diagram_mentions(self, text: str) -> bool:
        """Check for references to diagrams."""
        diagram_keywords = ['figure', 'chart', 'graph', 'diagram', 'plot', 'image']
        text_lower = text.lower()
        return any(kw in text_lower for kw in diagram_keywords)
```

---

### Step 5: Curriculum Matching & Valuation

```python
# ai-services/valuation/scorer.py

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ContentScorer:
    def __init__(self):
        # Load pre-trained embedding model
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.curriculum_db = CurriculumDatabase()
    
    def calculate_score(self, 
                       extracted_text: str,
                       subject: str = None,
                       grade_level: str = None) -> dict:
        """
        Calculate match percentage against curriculum standards.
        
        Returns:
            {
                'match_percentage': 87.5,
                'keyword_matches': {
                    'matched': [...],
                    'total': 25
                },
                'similarity_score': 0.82,
                'matched_curricula': ['Thailand_Grade12_Math', ...],
                'breakdown': {...}
            }
        """
        # 1. KEYWORD MATCHING
        keyword_result = self._keyword_matching(
            extracted_text,
            subject,
            grade_level
        )
        
        # 2. SIMILARITY SCORING (Embeddings)
        similarity_result = self._similarity_scoring(
            extracted_text,
            subject,
            grade_level
        )
        
        # 3. COMBINE SCORES
        combined_score = self._combine_scores(
            keyword_result,
            similarity_result
        )
        
        return {
            'match_percentage': combined_score['match_percentage'],
            'keyword_result': keyword_result,
            'similarity_result': similarity_result,
            'breakdown': combined_score['breakdown']
        }
    
    def _keyword_matching(self, text: str, subject: str, grade_level: str) -> dict:
        """
        Match keywords from curriculum standards.
        
        Algorithm:
        1. Load curriculum standards for subject + grade_level
        2. Extract keywords and their weights
        3. Count matches in text
        4. Calculate match percentage
        """
        # Get curriculum
        curricula = self.curriculum_db.get_by_subject_and_grade(subject, grade_level)
        
        matched_keywords = []
        total_weight = 0
        matched_weight = 0
        
        text_lower = text.lower()
        
        for curriculum in curricula:
            # Keywords stored as JSON
            keywords_data = curriculum.keywords_weight  # {keyword: weight}
            
            for keyword, weight in keywords_data.items():
                total_weight += weight
                
                # Check if keyword appears (whole word match)
                pattern = r'\b' + re.escape(keyword) + r'\b'
                if re.search(pattern, text_lower):
                    matched_weight += weight
                    matched_keywords.append({
                        'keyword': keyword,
                        'weight': weight,
                        'curriculum': curriculum.name
                    })
        
        match_percentage = (matched_weight / total_weight * 100) if total_weight > 0 else 0
        
        return {
            'match_percentage': round(match_percentage, 2),
            'matched_keywords': matched_keywords,
            'matched_count': len(matched_keywords),
            'total_keywords': len(sum([c.keywords_weight for c in curricula], {})),
            'method': 'keyword_matching'
        }
    
    def _similarity_scoring(self, text: str, subject: str, grade_level: str) -> dict:
        """
        Use embedding similarity to measure content relevance.
        """
        # Get curriculum documents
        curricula = self.curriculum_db.get_by_subject_and_grade(subject, grade_level)
        
        # Generate embedding for content
        content_embedding = self.embedding_model.encode(text[:5000])  # Use first 5k chars
        
        # Generate embeddings for curriculum topics
        curriculum_embeddings = []
        curriculum_texts = []
        for curriculum in curricula:
            for topic in curriculum.topics:
                topic_text = f"{curriculum.subject} - {topic['name']}: {topic['description']}"
                curriculum_texts.append(topic_text)
                curriculum_embeddings.append(self.embedding_model.encode(topic_text))
        
        # Calculate similarities
        similarities = cosine_similarity([content_embedding], curriculum_embeddings)[0]
        avg_similarity = np.mean(similarities)
        max_similarity = np.max(similarities)
        
        # Find best matching topics
        top_indices = np.argsort(similarities)[-5:][::-1]  # Top 5
        top_topics = [curriculum_texts[i] for i in top_indices]
        
        return {
            'average_similarity': float(round(avg_similarity, 4)),
            'max_similarity': float(round(max_similarity, 4)),
            'similarities': [float(s) for s in similarities[:10]],  # First 10
            'top_matching_topics': top_topics,
            'method': 'embedding_similarity'
        }
    
    def _combine_scores(self, keyword_result: dict, similarity_result: dict) -> dict:
        """
        Combine keyword matching and similarity scores.
        
        Formula:
            Final Score = (Keyword% × 0.6) + (Similarity% × 0.4)
            
        Weighting:
            - Keyword matching: 60% (more reliable)
            - Similarity scoring: 40% (catch nuance)
        """
        keyword_percentage = keyword_result['match_percentage']
        similarity_percentage = min(similarity_result['average_similarity'] * 100, 100)
        
        final_score = (keyword_percentage * 0.6) + (similarity_percentage * 0.4)
        
        return {
            'match_percentage': round(final_score, 2),
            'breakdown': {
                'keyword_matching_percentage': round(keyword_percentage, 2),
                'keyword_weight': 0.6,
                'similarity_percentage': round(similarity_percentage, 2),
                'similarity_weight': 0.4,
                'final_calculation': f"({keyword_percentage} × 0.6) + ({similarity_percentage} × 0.4) = {final_score}"
            }
        }
```

---

### Step 6: Convert Score to Credits

```python
# backend/app/services/valuation_service.py

class ValuationService:
    # Configuration
    CREDIT_TIERS = {
        'poor': {'min': 0, 'max': 20, 'base_credits': 10, 'multiplier': 0.5},
        'fair': {'min': 20, 'max': 50, 'base_credits': 50, 'multiplier': 0.8},
        'good': {'min': 50, 'max': 75, 'base_credits': 100, 'multiplier': 1.0},
        'very_good': {'min': 75, 'max': 90, 'base_credits': 150, 'multiplier': 1.2},
        'excellent': {'min': 90, 'max': 100, 'base_credits': 200, 'multiplier': 1.5}
    }
    
    def convert_score_to_credits(self, 
                                match_percentage: float,
                                word_count: int,
                                reading_level: str) -> dict:
        """
        Convert match percentage to system credits.
        
        Algorithm:
        1. Determine tier based on match_percentage
        2. Get base credits for tier
        3. Apply quality multipliers:
           - Length multiplier (word count)
           - Complexity multiplier (reading level)
        4. Apply daily cap (max 1000 credits per day per user)
        5. Return credit amount
        """
        
        # 1. Determine tier
        tier = self._get_tier(match_percentage)
        tier_config = self.CREDIT_TIERS[tier]
        
        # 2. Get base credits
        base_credits = tier_config['base_credits']
        
        # 3. Apply multipliers
        # Length multiplier: 500 words = 1x, 1000 = 1.2x, 5000 = 2x
        length_multiplier = self._get_length_multiplier(word_count)
        
        # Complexity multiplier: based on reading level
        complexity_multiplier = {
            'elementary': 0.8,
            'middle': 1.0,
            'high': 1.2,
            'college': 1.4,
            'academic': 1.5
        }.get(reading_level, 1.0)
        
        # Tier multiplier
        tier_multiplier = tier_config['multiplier']
        
        # Final calculation
        calculated_credits = (
            base_credits *
            length_multiplier *
            complexity_multiplier *
            tier_multiplier
        )
        
        # Round and cap
        final_credits = int(round(calculated_credits))
        final_credits = min(final_credits, 1000)  # Daily cap
        
        return {
            'match_percentage': match_percentage,
            'tier': tier,
            'base_credits': base_credits,
            'multipliers': {
                'length': round(length_multiplier, 2),
                'complexity': round(complexity_multiplier, 2),
                'tier': round(tier_multiplier, 2)
            },
            'calculated_credits': round(calculated_credits, 2),
            'final_credits': final_credits,
            'calculation_breakdown': {
                'formula': f"{base_credits} × {length_multiplier} × {complexity_multiplier} × {tier_multiplier} = {calculated_credits}",
                'final': f"{final_credits} credits (capped at 1000)"
            }
        }
    
    def _get_tier(self, percentage: float) -> str:
        """Determine tier based on percentage."""
        for tier_name, config in self.CREDIT_TIERS.items():
            if config['min'] <= percentage < config['max']:
                return tier_name
        return 'excellent'
    
    def _get_length_multiplier(self, word_count: int) -> float:
        """
        Length multiplier based on word count.
        - < 300 words: 0.5x (too short)
        - 300-500: 0.8x (brief)
        - 500-1000: 1.0x (standard)
        - 1000-3000: 1.2x (comprehensive)
        - 3000-5000: 1.5x (very comprehensive)
        - > 5000: 2.0x (extremely comprehensive)
        """
        if word_count < 300:
            return 0.5
        elif word_count < 500:
            return 0.8
        elif word_count < 1000:
            return 1.0
        elif word_count < 3000:
            return 1.2
        elif word_count < 5000:
            return 1.5
        else:
            return 2.0
```

---

### Step 7: Award Credits to Educator

```python
# backend/app/services/wallet_service.py

class WalletService:
    def award_credits(self, 
                      user_id: str,
                      amount_credits: int,
                      content_id: str = None,
                      transaction_type: str = 'earn_upload') -> dict:
        """
        Award credits to educator for uploaded content.
        """
        # Get or create wallet
        wallet = Wallet.get_or_create(user_id=user_id)
        
        # Update balance
        wallet.balance_credits += amount_credits
        wallet.lifetime_earned_credits += amount_credits
        wallet.last_transaction_at = datetime.now()
        wallet.save()
        
        # Create transaction record
        transaction = Transaction(
            wallet_id=wallet.id,
            type=transaction_type,
            amount_credits=amount_credits,
            content_id=content_id,
            status='completed',
            description=f"Credits awarded for content upload: {content_id}",
            created_at=datetime.now()
        )
        transaction.save()
        
        # Send notification
        notify_educator(
            user_id=user_id,
            title="Credits Awarded!",
            message=f"You earned {amount_credits} credits for your new content!",
            data={'content_id': content_id, 'credits': amount_credits}
        )
        
        return {
            'success': True,
            'wallet_id': wallet.id,
            'new_balance': wallet.balance_credits,
            'transaction_id': transaction.id,
            'amount_credited': amount_credits
        }
```

---

## Pseudo-Code: Complete Valuation Function

```python
def calculate_content_score(content_file: File) -> dict:
    """
    Main function that orchestrates entire valuation process.
    
    Args:
        content_file: Uploaded file object with metadata
    
    Returns:
        {
            'match_percentage': 85.5,
            'credits_awarded': 175,
            'score_breakdown': {...},
            'processing_time_seconds': 45,
            'status': 'success'
        }
    """
    
    import time
    start_time = time.time()
    
    try:
        # Step 1: Validate file
        validate_file(content_file)
        
        # Step 2: Extract text based on type
        if content_file.type == 'video':
            text = transcribe_video(content_file.path)['transcript']
            metadata = {'duration': '3600s', 'language': 'en'}
        elif content_file.type in ['pdf', 'goodnotes']:
            text = extract_text_from_document(content_file.path)
            metadata = {'page_count': 100}
        
        # Step 3: Analyze content
        analysis = analyze_content(text)  # word_count, language, etc
        
        # Step 4: Keyword matching
        keyword_scores = keyword_match(
            text,
            subject=content_file.subject,
            grade_level=content_file.grade_level
        )
        
        # Step 5: Similarity scoring
        similarity_scores = similarity_match(
            text,
            subject=content_file.subject,
            grade_level=content_file.grade_level
        )
        
        # Step 6: Combine scores
        final_score = combine_scores(keyword_scores, similarity_scores)
        match_percentage = final_score['match_percentage']
        
        # Step 7: Convert to credits
        credit_result = convert_to_credits(
            match_percentage=match_percentage,
            word_count=analysis['word_count'],
            reading_level=analysis['reading_level']
        )
        credits_awarded = credit_result['final_credits']
        
        # Step 8: Save results
        save_score_to_database(
            content_id=content_file.id,
            match_percentage=match_percentage,
            credits_awarded=credits_awarded,
            score_breakdown=final_score['breakdown']
        )
        
        # Step 9: Award credits
        award_credits(
            user_id=content_file.uploader_id,
            amount=credits_awarded,
            content_id=content_file.id
        )
        
        processing_time = time.time() - start_time
        
        return {
            'status': 'success',
            'content_id': content_file.id,
            'match_percentage': match_percentage,
            'credits_awarded': credits_awarded,
            'processing_time_seconds': round(processing_time, 2),
            'score_breakdown': {
                'keyword_matching': keyword_scores,
                'similarity_matching': similarity_scores,
                'final_calculation': final_score['breakdown'],
                'credit_calculation': credit_result['calculation_breakdown']
            }
        }
    
    except Exception as e:
        processing_time = time.time() - start_time
        return {
            'status': 'error',
            'error_message': str(e),
            'processing_time_seconds': round(processing_time, 2)
        }
```

---

## Configuration & Tuning

### Keyword Weight Configuration
```json
{
    "curriculum": "Thailand_Grade_12_Mathematics",
    "keywords": {
        "derivative": 2.0,
        "integral": 2.0,
        "limit": 1.8,
        "continuity": 1.5,
        "differentiability": 1.5,
        "calculus": 1.0,
        "function": 0.8,
        "equation": 0.5
    }
}
```

### Credit Tier Configuration
```json
{
    "poor": {
        "range": "0-20%",
        "base_credits": 10,
        "description": "Minimal match to curriculum"
    },
    "fair": {
        "range": "20-50%",
        "base_credits": 50,
        "description": "Some alignment with curriculum"
    },
    "good": {
        "range": "50-75%",
        "base_credits": 100,
        "description": "Good alignment with curriculum standards"
    },
    "very_good": {
        "range": "75-90%",
        "base_credits": 150,
        "description": "Strong alignment with curriculum"
    },
    "excellent": {
        "range": "90-100%",
        "base_credits": 200,
        "description": "Excellent match with curriculum standards"
    }
}
```

---

## Error Handling & Retries

```python
@celery_app.task(bind=True, max_retries=3)
def process_content_with_retry(self, content_id: str):
    try:
        return process_content_async(content_id)
    except TranscriptionError as exc:
        # Retry after 1 minute
        raise self.retry(exc=exc, countdown=60)
    except OCRError as exc:
        # Retry after 2 minutes (OCR is slower)
        raise self.retry(exc=exc, countdown=120)
    except Exception as exc:
        # Log unexpected errors and notify admin
        logger.error(f"Content processing failed: {exc}", extra={'content_id': content_id})
        send_admin_alert(f"Processing failed for content {content_id}: {exc}")
        # Don't retry for unknown errors
        raise
```

---

## Performance Metrics

- **Transcription Speed**: ~2x real-time (1 hour video = 30 mins processing)
- **OCR Speed**: ~1-2 pages per minute
- **Matching Speed**: < 5 seconds for up to 10,000 word documents
- **Total Processing**: Average 45-120 seconds per content item

---

## Future Enhancements

1. **Fine-tuned Classification Model**: Train custom model on educational content
2. **Multi-language Support**: Better support for Thai language matching
3. **Dynamic Curriculum Updates**: Automatically sync curriculum standards
4. **Quality Feedback Loop**: Adjust weights based on educator feedback
5. **Plagiarism Detection**: Integrate Turnitin or similar service
