# PrepMate — Feature & Change Report

Date: 2026-06-01

## Summary of new features

- PDF Topic Analyzer: a new UI that accepts a PDF and topic(s), extracts the PDF text in-browser, sends the PDF content plus topics to the app's AI model, and returns study notes, key points, and exam-style important questions with answers.
- PDF extraction utility: `src/utils/pdf-utils.ts` uses `pdfjs-dist` to extract text from the first 20 pages of uploaded PDFs.
- Home CTA: Added a button on the Home page to open the PDF Topic Analyzer (`/file-analyser`).
- Contact updates: Added and preserved multiple contact emails/phone numbers and WhatsApp links on the Contact Us page.
- TypeScript fixes: resolved several unused-import and prop-typo issues so the project compiles cleanly.
- Dev & build validation: installed `pdfjs-dist`, started the dev server, and ran a production build successfully.

## Files added

- `src/utils/pdf-utils.ts` — PDF text extraction helper using `pdfjs-dist`.
- `src/FEATURE_REPORT.md` — this report file.

## Files modified (high level)

- [src/routes/AiFileAnalyser.tsx](src/routes/AiFileAnalyser.tsx#L1-L1): Reworked UI and logic to accept a PDF + topics, extract PDF text, generate an AI prompt, and display AI-generated notes and questions.
- [src/routes/AiFileAnalyser.css](src/routes/AiFileAnalyser.css#L1-L1): Styles for the new analyzer UI (topic input, result panel, errors).
- [src/routes/home.tsx](src/routes/home.tsx#L1-L1): Added "Analyze PDF & Topics" CTA; adjusted imports.
- [src/routes/contact-us.tsx](src/routes/contact-us.tsx#L1-L1): Added both new and previous emails, phone numbers, and WhatsApp links.
- [src/components/ui/pin.tsx](src/components/ui/pin.tsx#L1-L1): Fixed prop typo `disbaled` → `disabled`.
- [src/components/ui/logo-container.tsx](src/components/ui/logo-container.tsx#L1-L1): Removed unused imports.
- [src/layouts/auth-layout.tsx](src/layouts/auth-layout.tsx#L1-L1): Removed unused `React` import.
- [src/handlers/auth-handler.tsx](src/handlers/auth-handler.tsx#L1-L1): Ensured `storeUserData()` is invoked inside `useEffect` to persist user data.
- [src/routes/services.tsx](src/routes/services.tsx#L1-L1): Removed unused import.

## Dependencies added

- `pdfjs-dist` — used to extract PDF text inside the browser.

## Commands run during development

- `npm install pdfjs-dist`
- `npx tsc -p tsconfig.app.json --noEmit` (type-check)
- `npm run dev` (Vite dev server at http://localhost:5174/)
- `npm run build` (production build; `dist/` created)

## Notes on implementation details

- The PDF extraction loads and converts the first 20 PDF pages to avoid massive prompts. If you need full-document support, we can implement server-side chunking, summarization, or upload to cloud storage before analysis.
- The AI prompt concatenates the (trimmed) PDF text and the provided topics and asks the model to generate notes, key points, and important questions in Markdown.
- The analyzer currently requires PDF files (image OCR is not included yet). We can add OCR support later.

## Next recommended steps

- Add OCR (Tesseract or cloud OCR) to support scanned PDFs/images.
- Add pagination or chunking for very large PDFs and show progress during processing.
- Save generated reports to storage (Firebase Storage) and show history/exports.
- Add user-visible grounding citations (if desired) by sending the model tools that return sources.
- Improve chunking/code-splitting to reduce bundle size reported by the production build.

---

If you want, I can: 
- Add OCR support now;
- Save AI reports to `Firebase Storage` and add a report history page; or
- Create a downloadable Word/PDF export of the generated report.

Tell me which next step to implement and I will proceed.