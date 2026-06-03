import React, { useState } from 'react';
import { ai, modelName, generationConfig, safetySettings } from '@/scripts/index.ts';
import { extractPdfText } from '@/utils/pdf-utils';
import './AiFileAnalyser.css';

const AiFileAnalyser: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [topics, setTopics] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult('');
      setErrorMessage('');
    }
  };

  const handleAnalyse = async () => {
    if (!file) {
      setErrorMessage('Please upload a PDF file to analyze.');
      return;
    }

    if (!topics.trim()) {
      setErrorMessage('Please enter the topic(s) you want notes and questions for.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are supported for the topic-based analysis feature.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');
    setResult('');

    try {
      const pdfText = await extractPdfText(file);
      const trimmedPdfText = pdfText.length > 28000 ? `${pdfText.slice(0, 28000)}\n\n[PDF truncated for prompt size]` : pdfText;

      const prompt = `You are an expert study assistant. Analyze the PDF content and the requested study topics, then generate:
1) concise study notes for the requested topics,
2) the most important study points from the document,
3) a section of exam-style important questions and answers that students should focus on.

PDF content:
${trimmedPdfText}

Study topics or keywords:
${topics}

Provide the response in Markdown format with headings, bullet points, and a separate "Important Questions" section.`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          ...generationConfig,
          safetySettings: safetySettings,
        },
      });

      const generatedText = response.text ?? 'The AI returned an empty response. Please try again with a smaller PDF or shorter topic list.';
      setResult(generatedText);
    } catch (error) {
      console.error('PDF analysis failed:', error);
      setErrorMessage('There was an error processing the PDF. Please check the file and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="ai-container">
      <h2 className="ai-heading">📄 PDF Topic Analyzer</h2>

      <p className="ai-description">
        Upload a <strong>PDF</strong> and enter the topics or subjects. The system will analyze the document and generate study notes plus important questions.
      </p>

      <div className="ai-file-upload">
        <label htmlFor="file-upload" className="ai-file-label">
          {file ? `File Selected: ${file.name}` : 'Click to select a PDF file'}
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="ai-file-hidden"
        />

        <button
          type="button"
          className="ai-browse-btn"
          onClick={() =>
            (document.getElementById('file-upload') as HTMLInputElement | null)?.click()
          }
        >
          {file ? 'Change File' : 'Browse'}
        </button>
      </div>

      <textarea
        className="ai-topic-input"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        placeholder="Enter the topics or subject areas for analysis, e.g. 'linear algebra, probability, exam questions'"
        disabled={isProcessing}
      />

      <button
        onClick={handleAnalyse}
        disabled={!file || isProcessing}
        className={`ai-primary-btn ${(!file || isProcessing) ? 'disabled' : ''}`}
      >
        {isProcessing ? (
          <>
            <span className="spinner"></span> Analysing...
          </>
        ) : (
          '🚀 Analyse PDF & Topics'
        )}
      </button>

      {errorMessage && <p className="ai-error-text">{errorMessage}</p>}

      {result && (
        <div className="ai-result-box">
          <h3 className="ai-result-heading">AI Generated Notes & Questions</h3>
          <pre className="ai-result-text">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default AiFileAnalyser;
