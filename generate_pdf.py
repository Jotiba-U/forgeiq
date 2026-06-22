import re
from fpdf import FPDF

class ProjectPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("helvetica", "I", 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 10, "ForgeIQ - Industrial Knowledge Intelligence Platform", border=0, align="R")
            self.ln(10)
            self.set_draw_color(200, 200, 200)
            self.line(10, 15, 200, 15)

    def footer(self):
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f"Page {self.page_no()}", border=0, align="C")

def build_pdf():
    pdf = ProjectPDF()
    pdf.set_margins(15, 20, 15)
    pdf.add_page()
    
    # ------------------ COVER PAGE ------------------
    pdf.set_y(40)
    pdf.set_font("helvetica", "B", 28)
    pdf.set_text_color(26, 54, 93) # Deep Blue
    pdf.cell(0, 15, "ForgeIQ", new_x="LMARGIN", new_y="NEXT", align="C")
    
    pdf.set_font("helvetica", "B", 18)
    pdf.set_text_color(74, 85, 104) # Muted slate
    pdf.cell(0, 15, "Industrial Knowledge Intelligence Platform", new_x="LMARGIN", new_y="NEXT", align="C")
    
    pdf.set_y(80)
    pdf.set_font("helvetica", "B", 14)
    pdf.set_text_color(229, 62, 62) # Operational Accent Red
    pdf.cell(0, 10, "Unified Asset & Operations Brain", new_x="LMARGIN", new_y="NEXT", align="C")
    
    pdf.set_y(120)
    pdf.set_font("helvetica", "", 12)
    pdf.set_text_color(45, 55, 72)
    desc = ("An AI-powered operational intelligence platform built for the ET AI Hackathon 2026. "
            "ForgeIQ ingests and links heterogeneous industrial manuals, drawings, and logs, "
            "enabling domain RAG queries, real-time compliance checking, and predictive "
            "reliability analysis at the point of need.")
    pdf.multi_cell(0, 7, desc, align="C")
    
    pdf.set_y(200)
    pdf.set_font("helvetica", "B", 10)
    pdf.set_text_color(74, 85, 104)
    pdf.cell(0, 5, "Submitted for Problem Statement 8", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.cell(0, 5, "ET AI Hackathon 2026", new_x="LMARGIN", new_y="NEXT", align="C")
    pdf.cell(0, 5, "Date: June 22, 2026", new_x="LMARGIN", new_y="NEXT", align="C")
    
    # ------------------ DOCUMENT CONTENT ------------------
    pdf.add_page()
    pdf.set_y(20)
    
    with open("project_documentation.md", "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        # Clean unicode characters that cannot be encoded in latin-1 (default helvetica)
        line = line.replace("\u2014", "-") # em dash
        line = line.replace("\u2013", "-") # en dash
        line = line.replace("\u2019", "'") # curly quote
        line = line.replace("\u2018", "'") # curly quote open
        line = line.replace("\u201c", '"') # curly double open
        line = line.replace("\u201d", '"') # curly double close
        line = line.replace("\u2022", "-") # bullet point
        line = line.replace("\u2013", "-")
        
        if not line:
            pdf.ln(4)
            continue
            
        # Ignore main title and subtitle as we built a cover page
        if line.startswith("# ForgeIQ") or line.startswith("## Unified") or line.startswith("**ET AI Hackathon"):
            continue
            
        if line.startswith("---"):
            pdf.ln(5)
            pdf.set_draw_color(220, 220, 220)
            pdf.line(pdf.get_x(), pdf.get_y(), 200, pdf.get_y())
            pdf.ln(5)
            continue
            
        # Parse Headings
        if line.startswith("## "):
            pdf.ln(6)
            pdf.set_font("helvetica", "B", 14)
            pdf.set_text_color(26, 54, 93)
            title = line.replace("## ", "")
            pdf.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(2)
            continue
            
        if line.startswith("### "):
            pdf.ln(4)
            pdf.set_font("helvetica", "B", 12)
            pdf.set_text_color(45, 55, 72)
            title = line.replace("### ", "")
            pdf.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(1)
            continue
            
        # Parse Bullet points
        if line.startswith("* "):
            pdf.set_font("helvetica", "", 10)
            pdf.set_text_color(45, 55, 72)
            bullet_text = line.replace("* ", "")
            
            # Simple bold highlight formatting (**text**)
            parts = re.split(r"(\*\*.*?\*\*)", bullet_text)
            pdf.set_x(20) # indent bullet
            pdf.cell(3, 6, "-", border=0) # safe ASCII bullet
            
            for part in parts:
                if part.startswith("**") and part.endswith("**"):
                    pdf.set_font("helvetica", "B", 10)
                    pdf.write(6, part.replace("**", ""))
                else:
                    pdf.set_font("helvetica", "", 10)
                    pdf.write(6, part)
            pdf.ln(7)
            continue
            
        # Regular paragraph text
        pdf.set_font("helvetica", "", 10)
        pdf.set_text_color(45, 55, 72)
        
        parts = re.split(r"(\*\*.*?\*\*)", line)
        for part in parts:
            if part.startswith("**") and part.endswith("**"):
                pdf.set_font("helvetica", "B", 10)
                pdf.write(6, part.replace("**", ""))
            else:
                pdf.set_font("helvetica", "", 10)
                pdf.write(6, part)
        pdf.ln(7)
        
    pdf.output("project_documentation.pdf")
    print("PDF successfully generated as project_documentation.pdf")

if __name__ == "__main__":
    build_pdf()
