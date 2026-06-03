import express from 'express';
import { 
    ai,
    modelName, 
    generationConfig, 
    safetySettings 
} from './gemini-client.js'; 

const router = express.Router();

const generateAiContent = async (contents, modelOverride = modelName, tools = undefined) => {
    const response = await ai.models.generateContent({
        model: modelOverride,
        contents: contents,
        config: {
            ...generationConfig,
            safetySettings,
            ...(tools && { tools: tools }), 
        },
    });
    return response;
};


router.post('/smart-search', async (req, res) => {
    const { query } = req.body; 

    if (!query) {
        return res.status(400).json({ error: 'Query is required.' });
    }

    try {
        const prompt = `You are a world-class study assistant. Generate concise, well-structured, easy-to-read study notes for the topic: "${query}". Format the notes using Markdown.`;
        
        const tools = [{ googleSearch: {} }];

        const response = await generateAiContent(prompt, modelName, tools);
        const generatedNotes = response.text;

        let citationSources = [];
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

        if (groundingMetadata && groundingMetadata.groundingChunks) {
            citationSources = groundingMetadata.groundingChunks
                .map(chunk => ({
                    url: chunk.web?.uri || '#',
                    title: chunk.web?.title || 'Unknown Source Title',
                }))
                .filter(source => source.url && source.url !== '#');
        }

        res.json({
            notes: generatedNotes,
            sources: citationSources,
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: 'Failed to generate notes.' });
    }
});

router.post('/generate-questions', async (req, res) => {

    const { message } = req.body; 

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        const contents = [{ role: "user", parts: [{ text: message }] }];
        
        const response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
                ...generationConfig,
                safetySettings,
                responseMimeType: 'application/json',
            },
        });
        const rawAiResponse = response.text; 

        res.json({
            response: rawAiResponse,
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: 'Failed to generate questions.' });
    }
});

export default router;