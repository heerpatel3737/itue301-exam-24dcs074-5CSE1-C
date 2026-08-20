import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def create_report():
    pdf_filename = "24dcs074_SetB_Report.pdf"
    
    # Custom color palette matching classical theme
    PRIMARY_MAHOGANY = colors.HexColor("#1c0f0a")
    ACCENT_GOLD = colors.HexColor("#9e7b23")
    ACCENT_CRIMSON = colors.HexColor("#800020")
    TEXT_DARK = colors.HexColor("#2b1810")
    BG_PARCHMENT = colors.HexColor("#f7f1e3")
    BORDER_GOLD = colors.HexColor("#d4af37")

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    # Define custom paragraph styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Title'],
        fontName='Helvetica-Bold',
        fontSize=30,
        leading=36,
        textColor=PRIMARY_MAHOGANY,
        alignment=TA_CENTER
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=14,
        leading=18,
        textColor=ACCENT_GOLD,
        alignment=TA_CENTER
    )

    meta_style = ParagraphStyle(
        'CoverMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=16,
        textColor=TEXT_DARK,
        alignment=TA_CENTER
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=PRIMARY_MAHOGANY,
        spaceBefore=14,
        spaceAfter=8
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=ACCENT_CRIMSON,
        spaceBefore=10,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )

    caption_style = ParagraphStyle(
        'Caption_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-BoldOblique',
        fontSize=10,
        leading=13,
        textColor=ACCENT_CRIMSON,
        alignment=TA_CENTER,
        spaceBefore=6,
        spaceAfter=12
    )

    story = []

    # =========================================================
    # 1. TITLE PAGE
    # =========================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("PRACTICAL EXAMINATION REPORT", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("LIBRANOVA", title_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph('"Your Books. Your Knowledge. Your Library."', subtitle_style))
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="80%", thickness=2, color=BORDER_GOLD, spaceAfter=20, spaceBefore=10))
    
    meta_text = """
    <b>Roll Number:</b> 24DCS074<br/>
    <b>Batch:</b> 5CSE1-C<br/>
    <b>Exam Set:</b> Set B<br/>
    <b>Course Code:</b> ITUE301<br/>
    <b>Repository:</b> <code>itue301-exam-24dcs074-5CSE1-C</code><br/>
    <b>Date:</b> August 20, 2026
    """
    story.append(Paragraph(meta_text, meta_style))
    story.append(Spacer(1, 40))

    # Cover Summary Card Table
    summary_data = [
        [Paragraph("<b>Component</b>", body_style), Paragraph("<b>Technology / Implementation</b>", body_style)],
        [Paragraph("Frontend Framework", body_style), Paragraph("React 18 + React Router v6 + Vanilla CSS", body_style)],
        [Paragraph("Backend REST API", body_style), Paragraph("Node.js + Express.js + Custom Middleware", body_style)],
        [Paragraph("Database & ODM", body_style), Paragraph("MongoDB + Mongoose Schema Validation", body_style)],
        [Paragraph("Theme & Aesthetics", body_style), Paragraph("Classical Academia (Mahogany, Parchment, Brass Gold)", body_style)]
    ]
    summary_table = Table(summary_data, colWidths=[150, 320])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG_PARCHMENT),
        ('TEXTCOLOR', (0,0), (-1,0), PRIMARY_MAHOGANY),
        ('GRID', (0,0), (-1,-1), 1, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(summary_table)
    story.append(PageBreak())

    # =========================================================
    # 2. PROJECT OVERVIEW
    # =========================================================
    story.append(Paragraph("2. Project Overview", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))
    overview_p = """
    <b>LIBRANOVA</b> is a complete, full-stack Library Book Management System built from scratch for the Set B Practical Examination.
    The application embodies a prestigious classical Academia aesthetic inspired by historical scholarly libraries (featuring dark mahogany tones, parchment elements, gold borders, and Roman volume headers).
    The system allows users to seamlessly explore book archives, view availability indicators, trigger quick book preview modals, filter available volumes, and submit controlled borrowing requisitions with real-time feedback.
    """
    story.append(Paragraph(overview_p, body_style))
    story.append(Spacer(1, 10))

    # =========================================================
    # 3. TECHNOLOGY STACK
    # =========================================================
    story.append(Paragraph("3. Technology Stack", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))
    tech_data = [
        [Paragraph("<b>Layer</b>", body_style), Paragraph("<b>Technology</b>", body_style), Paragraph("<b>Role / Function</b>", body_style)],
        [Paragraph("Frontend", body_style), Paragraph("React 18 & React Router v6", body_style), Paragraph("Single Page Application routing, component state, & dynamic rendering", body_style)],
        [Paragraph("Styling", body_style), Paragraph("Vanilla CSS + Google Fonts", body_style), Paragraph("Academia theme design system (Cinzel, Cormorant Garamond)", body_style)],
        [Paragraph("Backend", body_style), Paragraph("Node.js & Express.js", body_style), Paragraph("RESTful API routes, logging, and global error handling", body_style)],
        [Paragraph("Database", body_style), Paragraph("MongoDB & Mongoose", body_style), Paragraph("NoSQL storage, schemas, references, and validation constraints", body_style)],
        [Paragraph("HTTP Client", body_style), Paragraph("Native Fetch API", body_style), Paragraph("Asynchronous API requests with loading/error handling", body_style)]
    ]
    tech_table = Table(tech_data, colWidths=[80, 160, 230])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG_PARCHMENT),
        ('GRID', (0,0), (-1,-1), 1, BORDER_GOLD),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 15))

    # =========================================================
    # 4. TASK 1–5 IMPLEMENTATION EXPLANATION
    # =========================================================
    story.append(Paragraph("4. Task 1–5 Implementation Details", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))
    
    t1 = """<b>Task 1 — React Components:</b> Implemented five core components: <code>HomePage</code>, <code>BooksPage</code>, <code>BorrowPage</code>, <code>BookCard</code>, and <code>Navigation</code>. The <code>BookCard</code> component receives props (<code>title</code>, <code>author</code>, <code>category</code>, <code>available</code>) and displays visually distinct badges for Available (Emerald green badge) vs Not Available (Crimson red badge)."""
    story.append(Paragraph(t1, body_style))
    
    t2 = """<b>Task 2 — Routing & State:</b> Configured client-side routing using React Router v6 (<code>&lt;BrowserRouter&gt;</code>, <code>&lt;Routes&gt;</code>, <code>&lt;Route&gt;</code>) with <code>&lt;Link&gt;</code> elements navigating between <code>/</code>, <code>/books</code>, and <code>/borrow</code> without triggering full browser reloads. Implemented controlled form inputs in <code>BorrowPage</code> (Member Name, Book Title, Borrow Date, Return Date) using <code>useState</code> with a live updating Parchment Summary card."""
    story.append(Paragraph(t2, body_style))

    t3 = """<b>Task 3 — Express REST API & Middleware:</b> Developed Node/Express backend with in-memory API endpoints: <code>GET /api/v1/books</code> (status 200), <code>GET /api/v1/borrowings</code> (status 200), and <code>POST /api/v1/borrowings</code> (status 201). Created global <code>requestLogger</code> middleware logging <code>[METHOD] [PATH] [TIMESTAMP]</code> and global error-handling middleware placed as the last middleware to return structured JSON errors without exposing raw stack traces."""
    story.append(Paragraph(t3, body_style))

    t4 = """<b>Task 4 — React API Consumption:</b> <code>BooksPage</code> consumes the Express API using <code>useEffect()</code> and <code>fetch('http://localhost:5000/api/v1/books')</code>. Maintained <code>data</code>, <code>loading</code>, and <code>error</code> states with dedicated UI components for loading spinners, error retry alerts, and success grid rendering via <code>BookCard</code>."""
    story.append(Paragraph(t4, body_style))

    t5 = """<b>Task 5 — MongoDB & Mongoose Integration:</b> Defined three Mongoose models in <code>models/</code>: <code>Book.js</code> (required title/author/category, unique ISBN, default available true), <code>Member.js</code> (required name/email/dept, unique email), and <code>Borrowing.js</code> (references to Member and Book, borrow/return dates, status enum restricted to <code>['borrowed', 'returned', 'overdue']</code>). Connected via <code>MONGO_URI</code> from <code>.env</code> and demonstrated validation error handling returning 400 Bad Request."""
    story.append(Paragraph(t5, body_style))
    story.append(Spacer(1, 15))

    # =========================================================
    # 5. INTERACTIVE UX FEATURE & HOW TO RUN
    # =========================================================
    story.append(Paragraph("5. Interactive UX Feature & How to Run", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))
    
    ux_p = """<b>Quick Book Preview & Available Only Filter:</b> Clicking any <code>BookCard</code> triggers an ornate modal showing title, author, category, availability, and description. An <b>Available Only</b> toggle button allows instant state filtering on fetched API data using <code>useState</code> without extra backend requests."""
    story.append(Paragraph(ux_p, body_style))

    run_p = """<b>How to Run Application:</b><br/>
    1. Start Backend: <code>cd backend && npm install && node server.js</code> (Port 5000)<br/>
    2. Start Frontend: <code>cd frontend && npm install && npm run dev</code> (Port 5173)<br/>
    3. Access Browser: Open <code>http://localhost:5173</code>
    """
    story.append(Paragraph(run_p, body_style))
    story.append(PageBreak())

    # =========================================================
    # 6. VIVA CONCEPTS CHEAT SHEET
    # =========================================================
    story.append(Paragraph("6. Viva Key Concepts Reference", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))

    viva_data = [
        [Paragraph("<b>Concept</b>", body_style), Paragraph("<b>Key Explanation for Viva</b>", body_style)],
        [Paragraph("Components & Props", body_style), Paragraph("Components are reusable UI functions returning JSX. Props are read-only inputs passed from parent to child components.", body_style)],
        [Paragraph("React Router & Link", body_style), Paragraph("Enables client-side SPA routing without full page reload. Link updates URL history and renders matched route components.", body_style)],
        [Paragraph("Controlled Inputs", body_style), Paragraph("Form inputs bound to React state via value and onChange, making React the single source of truth.", body_style)],
        [Paragraph("useEffect & fetch", body_style), Paragraph("useEffect performs side effects after render (fetching API data on mount). fetch returns Promises for async HTTP calls.", body_style)],
        [Paragraph("Middleware & Error Handling", body_style), Paragraph("Functions executing in request-response cycle. Error handler (4 args) placed last formats structured JSON error responses.", body_style)],
        [Paragraph("Mongoose Validation & Enum", body_style), Paragraph("Schemas enforce types and constraints (required, unique, enum). Invalid data triggers ValidationError caught by Express.", body_style)]
    ]
    viva_table = Table(viva_data, colWidths=[130, 340])
    viva_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG_PARCHMENT),
        ('GRID', (0,0), (-1,-1), 1, BORDER_GOLD),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(viva_table)
    story.append(Spacer(1, 20))

    # =========================================================
    # 7. EVIDENCE SECTION (3 LARGE WHITE SCREENSHOT PLACEHOLDERS)
    # =========================================================
    story.append(Paragraph("7. Implementation Evidence & Screenshots", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=12, spaceBefore=2))
    
    notice_p = "<i>Note: In accordance with examination guidelines, structured empty placeholder boxes are provided below for inserting evaluation screenshots.</i>"
    story.append(Paragraph(notice_p, body_style))
    story.append(Spacer(1, 10))

    # Screenshot 1 Box — React Application
    sc1_content = [
        [Paragraph("<br/><br/><br/><br/><b>[ SCREENSHOT PLACEHOLDER 1 ]</b><br/><i>React Application UI (HomePage / BooksPage / BorrowPage)</i><br/><br/><br/><br/>", ParagraphStyle('BoxText', alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=12, textColor=colors.HexColor("#7a7a7a")))]
    ]
    sc1_table = Table(sc1_content, colWidths=[470], rowHeights=[170])
    sc1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc1_table)
    story.append(Paragraph("<b>Screenshot 1 — React Application</b>: Demonstrating LIBRANOVA classical UI, navigation header, book cards, and live borrow form state.", caption_style))
    story.append(Spacer(1, 15))

    # Screenshot 2 Box — REST API / Postman
    sc2_content = [
        [Paragraph("<br/><br/><br/><br/><b>[ SCREENSHOT PLACEHOLDER 2 ]</b><br/><i>Express REST API Request & Response (Postman / Browser GET /api/v1/books)</i><br/><br/><br/><br/>", ParagraphStyle('BoxText2', alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=12, textColor=colors.HexColor("#7a7a7a")))]
    ]
    sc2_table = Table(sc2_content, colWidths=[470], rowHeights=[170])
    sc2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc2_table)
    story.append(Paragraph("<b>Screenshot 2 — REST API/Postman</b>: Demonstrating GET /api/v1/books response (200 OK) and requestLogger terminal logs.", caption_style))
    story.append(PageBreak())

    # Screenshot 3 Box — MongoDB Compass / Atlas
    story.append(Paragraph("7. Implementation Evidence (Continued)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=12, spaceBefore=2))

    sc3_content = [
        [Paragraph("<br/><br/><br/><br/><br/><b>[ SCREENSHOT PLACEHOLDER 3 ]</b><br/><i>MongoDB Compass / Atlas Collection & Mongoose Validation Failure</i><br/><br/><br/><br/><br/>", ParagraphStyle('BoxText3', alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=12, textColor=colors.HexColor("#7a7a7a")))]
    ]
    sc3_table = Table(sc3_content, colWidths=[470], rowHeights=[200])
    sc3_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc3_table)
    story.append(Paragraph("<b>Screenshot 3 — MongoDB Compass/Atlas</b>: Demonstrating MongoDB database connection, Mongoose model documents, and validation error responses.", caption_style))

    doc.build(story)
    print(f"Report generated successfully: {pdf_filename}")

if __name__ == "__main__":
    create_report()
