import React, { useState } from 'react';

import { ai, modelName, generationConfig, safetySettings } from '@/scripts/index.ts'; 
interface Source {

  uri: string; 
  title: string;
}

const SmartSearchAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false); 

  const handleSearch = async () => {
    if (!query.trim()) {
      setNotes('Please enter a topic to search to generate notes.');
      setSources([]);
      return;
    }

    setLoading(true);
    setNotes(''); 
    setSources([]);
    const prompt = `
      You are a world-class study assistant specializing in generating concise, 
      well-structured study notes.
      
      Your task: Generate detailed study notes for the topic: "${query}". 
      Format the notes using Markdown (headers, bolding, and bullet points) 
      to make them easy to read.
      
      After the notes, include a final section titled "Relevant Sources" 
      and list 2-3 specific, relevant web sources (use plain URLs if needed).
    `;
    
    try {
const response = await ai.models.generateContent({
    model: modelName,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
        ...generationConfig,
        safetySettings: safetySettings,
        tools: [{ googleSearch: {} }] as const 
    },
});

      const generatedText: string = response.text ?? "Error: AI response was empty or invalid.";
      setNotes(generatedText);
      
      let citationSources: Source[] = [];
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

if (groundingMetadata && groundingMetadata.groundingChunks) {
    citationSources = groundingMetadata.groundingChunks 
        .map(attribution => ({
            uri: attribution.web?.uri || '#',
            title: attribution.web?.title || 'Unknown Source Title',
        }))
        .filter(source => source.uri && source.title && source.uri !== '#');
}

setSources(citationSources);

      setSources(citationSources);

    } catch (error) {
      console.error("Gemini API Error:", error);
      setNotes("Sorry, there was an error generating notes. Check your console for details.");
      setSources([]);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
        Smart Search & Notes Assistant
      </h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search any topic (e.g., 'First Law of Thermodynamics')..."
          style={{ padding: '10px', flexGrow: 1, borderRadius: '8px', border: '1px solid #d1d5db' }}
          disabled={loading}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            padding: '10px 20px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading ? '#9ca3af' : '#10b981',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            transition: 'background-color 0.3s'
          }}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Search & Learn'}
        </button>
      </div>
      {loading && (
        <p style={{ color: '#10b981', marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>
          Searching and generating study notes...
        </p>
      )}

      {notes && !loading && (
        <div 
          className="notes-output"
          style={{ border: '1px solid #34d399', borderRadius: '12px', padding: '20px', marginTop: '20px', backgroundColor: '#f0fdf4', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
        >
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {notes}
          </div>

          {(sources.length > 0) && (
            <>
              <h3 style={{ marginTop: '25px', borderBottom: '1px solid #a7f3d0', paddingBottom: '5px', fontSize: '1.3rem', color: '#065f46' }}>
                Grounding Citations
              </h3>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {sources.map(source => (
                  <li key={source.uri} style={{ marginBottom: '8px' }}>
                    <a href={source.uri} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline' }}>
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearchAssistant;