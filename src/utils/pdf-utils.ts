import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
import workerSrc from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const pageTexts: string[] = [];
  const maxPages = Math.min(pdf.numPages, 20);

  for (let pageNum = 1; pageNum <= maxPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => (item?.str ? item.str : ''))
      .join(' ');
    pageTexts.push(`Page ${pageNum}:
${text}`);
  }

  if (pdf.numPages > maxPages) {
    pageTexts.push(`\n[PDF truncated: only first ${maxPages} pages were loaded for analysis.]`);
  }

  return pageTexts.join('\n\n');
}
