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
    
    # Theme color palette
    PRIMARY_MAHOGANY = colors.HexColor("#1c0f0a")
    ACCENT_GOLD = colors.HexColor("#9e7b23")
    ACCENT_CRIMSON = colors.HexColor("#800020")
    TEXT_DARK = colors.HexColor("#2b1810")
    BG_PARCHMENT = colors.HexColor("#f7f1e3")
    BORDER_GOLD = colors.HexColor("#d4af37")

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Title'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=PRIMARY_MAHOGANY,
        alignment=TA_CENTER
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=13,
        leading=16,
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
        fontSize=15,
        leading=18,
        textColor=PRIMARY_MAHOGANY,
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )

    caption_style = ParagraphStyle(
        'Caption_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-BoldOblique',
        fontSize=9.5,
        leading=12.5,
        textColor=ACCENT_CRIMSON,
        alignment=TA_CENTER,
        spaceBefore=5,
        spaceAfter=12
    )

    box_text_style = ParagraphStyle(
        'BoxText',
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=colors.HexColor("#7a7a7a")
    )

    story = []

    # =========================================================
    # PAGE 1: COVER PAGE & PROJECT OVERVIEW
    # =========================================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("PRACTICAL EXAMINATION LABORATORY REPORT", subtitle_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("LIBRANOVA", title_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph('"Your Books. Your Knowledge. Your Library."', subtitle_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="85%", thickness=2, color=BORDER_GOLD, spaceAfter=15, spaceBefore=8))
    
    meta_text = """
    <b>Candidate Student Roll No:</b> 24DCS074 &nbsp;|&nbsp; <b>Batch:</b> 5CSE1-C &nbsp;|&nbsp; <b>Exam Set:</b> Set B<br/>
    <b>Course Title & Code:</b> ITUE301 Web Application Development<br/>
    <b>Repository Name:</b> <code>itue301-exam-24dcs074-5CSE1-C</code> &nbsp;|&nbsp; <b>Date:</b> August 20, 2026
    """
    story.append(Paragraph(meta_text, meta_style))
    story.append(Spacer(1, 15))

    story.append(Paragraph("1. Project Overview & Architecture", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=8, spaceBefore=2))
    overview_text = """
    <b>LIBRANOVA</b> is a complete, full-stack Library Book Management System developed specifically for the Set B Practical Examination.
    The application features an Academia/Classical aesthetic (dark mahogany palette, parchment card containers, gold border flourishes, and Roman numeral VOLUME section headers).
    The architecture cleanly separates React component views, client-side routing, Express RESTful API endpoints, and a persistent MongoDB database managed via Mongoose schemas.
    """
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 10))

    story.append(Paragraph("2. Detailed Implementation of Tasks 1–5", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=8, spaceBefore=2))
    
    t1 = "<b>Task 1 — React Components:</b> Developed five modular UI components: <code>Navigation</code> (header bar), <code>BookCard</code> (reusable item display with distinct Emerald 'Available' vs Crimson 'Not Available' badges), <code>HomePage</code> (hero banner), <code>BooksPage</code> (catalog view), and <code>BorrowPage</code> (requisition manager)."
    story.append(Paragraph(t1, body_style))

    t2 = "<b>Task 2 — Routing & State:</b> Integrated React Router v6 (<code>&lt;BrowserRouter&gt;</code>, <code>&lt;Routes&gt;</code>, <code>&lt;Route&gt;</code>) with <code>&lt;Link&gt;</code> elements navigating between <code>/</code>, <code>/books</code>, and <code>/borrow</code> without page reload. Form inputs on <code>BorrowPage</code> are controlled using React <code>useState</code>, updating a real-time Live Borrowing Summary card as the user types."
    story.append(Paragraph(t2, body_style))

    t3 = "<b>Task 3 — Express REST API & Middleware:</b> Configured Node/Express backend APIs: <code>GET /api/v1/books</code> (200 OK), <code>GET /api/v1/borrowings</code> (200 OK), and <code>POST /api/v1/borrowings</code> (201 Created). Added global <code>requestLogger</code> logging <code>[METHOD] [PATH] [TIMESTAMP]</code> and global error-handling middleware returning structured JSON without stack traces."
    story.append(Paragraph(t3, body_style))

    t4 = "<b>Task 4 — React API Consumption:</b> <code>BooksPage</code> consumes the Express API using <code>useEffect()</code> and native <code>fetch()</code>. Maintained <code>data</code>, <code>loading</code>, and <code>error</code> state hooks with UI feedback for loading indicators, connection retry alerts, and rendered <code>BookCard</code> grids."
    story.append(Paragraph(t4, body_style))

    t5 = "<b>Task 5 — MongoDB & Mongoose Integration:</b> Created three Mongoose models (<code>Book.js</code>, <code>Member.js</code>, <code>Borrowing.js</code>) with schema constraints (required fields, unique ISBN/email, status enum). Connected via <code>MONGO_URI</code> from <code>.env</code>. Endpoints query directly from MongoDB, returning structured JSON 400 Bad Request error responses on validation failures."
    story.append(Paragraph(t5, body_style))

    story.append(PageBreak())

    # =========================================================
    # PAGE 2: EVIDENCE SECTION — FRONTEND SCREENS 1 & 2
    # =========================================================
    story.append(Paragraph("3. Implementation Evidence & Screenshots", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))
    
    note_p = "<i>Note: Structured white rectangular frames are provided below for pasting evaluation evidence screenshots.</i>"
    story.append(Paragraph(note_p, body_style))
    story.append(Spacer(1, 8))

    # SCREENSHOT 1 PLACEHOLDER — FRONTEND HOME PAGE
    sc1_content = [[
        Paragraph("<br/><br/><br/><br/><b>[ FRONTEND SCREENSHOT 1 — HOME PAGE ]</b><br/><i>LIBRANOVA Volume I Hero Banner, Tagline & Navigation Header</i><br/><br/><br/><br/>", box_text_style)
    ]]
    sc1_table = Table(sc1_content, colWidths=[480], rowHeights=[175])
    sc1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc1_table)
    story.append(Paragraph("<b>Screenshot 1 — Frontend Screen 1 (HomePage)</b>: Classical Academia UI, Volume I banner, tagline, student details badge, and React Router navigation header.", caption_style))
    story.append(Spacer(1, 10))

    # SCREENSHOT 2 PLACEHOLDER — FRONTEND BOOKS PAGE
    sc2_content = [[
        Paragraph("<br/><br/><br/><br/><b>[ FRONTEND SCREENSHOT 2 — BOOKS COLLECTION PAGE ]</b><br/><i>Volume III Catalog, BookCards, Available Only Filter & Quick Preview Modal</i><br/><br/><br/><br/>", box_text_style)
    ]]
    sc2_table = Table(sc2_content, colWidths=[480], rowHeights=[175])
    sc2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc2_table)
    story.append(Paragraph("<b>Screenshot 2 — Frontend Screen 2 (BooksPage)</b>: Catalog view rendered via API fetch, BookCards with availability status, Available Only filter, and Quick Preview modal.", caption_style))

    story.append(PageBreak())

    # =========================================================
    # PAGE 3: EVIDENCE SECTION — FRONTEND SCREEN 3 & REST API SCREEN
    # =========================================================
    story.append(Paragraph("3. Implementation Evidence (Continued)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_GOLD, spaceAfter=10, spaceBefore=2))

    # SCREENSHOT 3 PLACEHOLDER — FRONTEND BORROW PAGE
    sc3_content = [[
        Paragraph("<br/><br/><br/><br/><b>[ FRONTEND SCREENSHOT 3 — BORROW PAGE & RECORDS ]</b><br/><i>Volume IV Requisition Form, Live Summary & Volume V Borrowing Records List</i><br/><br/><br/><br/>", box_text_style)
    ]]
    sc3_table = Table(sc3_content, colWidths=[480], rowHeights=[175])
    sc3_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc3_table)
    story.append(Paragraph("<b>Screenshot 3 — Frontend Screen 3 (BorrowPage)</b>: Controlled input form, Live Borrowing Summary parchment card, and unified Borrowing Records list.", caption_style))
    story.append(Spacer(1, 10))

    # SCREENSHOT 4 PLACEHOLDER — REST API BOOKS SCREEN
    sc4_content = [[
        Paragraph("<br/><br/><br/><br/><b>[ REST API SCREENSHOT — EXPRESS GET /api/v1/books ]</b><br/><i>JSON API Response (200 OK) & Terminal Output [METHOD] [PATH] [TIMESTAMP]</i><br/><br/><br/><br/>", box_text_style)
    ]]
    sc4_table = Table(sc4_content, colWidths=[480], rowHeights=[175])
    sc4_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, BORDER_GOLD),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER')
    ]))
    story.append(sc4_table)
    story.append(Paragraph("<b>Screenshot 4 — REST API Screen (Books Endpoint)</b>: Postman/Browser execution of GET /api/v1/books showing 200 OK JSON output and terminal logger logs.", caption_style))

    doc.build(story)
    print(f"Report generated successfully: {pdf_filename}")

if __name__ == "__main__":
    create_report()
