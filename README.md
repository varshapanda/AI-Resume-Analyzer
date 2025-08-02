# AI Resume Analyzer

**AI Resume Analyzer** is a full-stack web application that leverages **Generative AI** to evaluate resumes against job descriptions. It uses the **Google Gemini (PaLM 2)** API to perform a deep, contextual understanding of candidate profiles and return actionable, human-like feedback.

Built to demonstrate practical, real-world use of AI in the hiring process, this tool offers career-driven users personalized insights — not just keyword matching — enabling better preparation for job interviews and role alignment.

---

## 🎯 Purpose

This project was developed to fulfill the following goals:

- **AI Project Portfolio**: Demonstrate my hands-on experience with building a product that uses Generative AI in a meaningful, production-ready way.
- **Career Enablement**: Help job seekers understand how their resumes align with job postings.
- **Technical Depth**: Apply cloud-based AI APIs (Google Gemini), full-stack development with Node.js and React, and file handling via NLP preprocessing tools like `pdf-parse`, `mammoth`, and `multer`.

---

## 🧠 How AI Is Used

This project leverages **Google's Gemini 1.5/2.5 Flash Model** via its public API. Here’s a breakdown of how AI powers the core functionality:

### 🧾 Input:
- A user's **resume** (uploaded or pasted as text)
- A **job description** (pasted as input)

### 🤖 AI Task:
- Generate a deep comparative analysis between the resume and the job description using a carefully designed **structured prompt**.
- Extract a JSON-formatted response with:
  - **Match Score (0-100%)**
  - **Top 3 Strengths**
  - **Top 3 Areas for Improvement**
  - **Missing Skills**
  - **5 Predicted Interview Questions with Suggested Answers**

### 🧬 AI Capabilities Utilized:
- Natural Language Understanding (NLU)
- Contextual Comparison of Text Blocks
- Summarization and Explanation Generation
- Structured JSON response formatting

The AI replaces manual human analysis by performing semantic matching rather than simple keyword scanning.

---

## ✨ Key Features

- Upload `.pdf`, `.doc`, `.docx`, `.txt` resumes
- Uses **Gemini API** for advanced reasoning
- Visual match score bar
- Personalized suggestions for interview prep
- Clean, minimal UI built with React + Tailwind CSS
- Instant feedback loop without requiring user login

---

## 🧰 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | React, Tailwind CSS, Vite          |
| Backend     | Node.js, Express                   |
| AI Provider | Google Gemini 1.5 / 2.5 Flash API  |
| File Parsing| `pdf-parse`, `mammoth`, `multer`   |
| Deployment  | (Optional) Render / Vercel         |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
