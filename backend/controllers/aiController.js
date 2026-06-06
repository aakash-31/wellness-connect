const { GoogleGenerativeAI } = require('@google/generative-ai');
const Journal = require('../models/Journal');

// Initialize Gemini API
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API Key is missing. Please configure GEMINI_API_KEY in the backend .env file.');
  }
  return new GoogleGenerativeAI(apiKey);
};

// @desc    Converse with the AI Wellness Companion
// @route   POST /api/ai/chat
// @access  Private
const chatWithCompanion = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are Sanctuary's empathetic, supportive, and active-listening AI Wellness Companion. 
Your goal is to provide a safe, compassionate, and non-judgmental space for users to express feelings, share their daily struggles, or request mindfulness activities. 
Guidelines:
1. Be extremely warm, gentle, and validating. Acknowledge and name their feelings.
2. Keep responses brief, highly conversational, and easy to read. Use bullet points or short paragraphs.
3. Suggest simple, grounding exercises (e.g., box breathing, 5-4-3-2-1 technique, short visualizations) if the user is anxious or stressed.
4. Never diagnose medical conditions or give clinical treatment advice. Explicitly recommend seeking professional care if they express severe distress or self-harm (gently and caringly).
5. Always address the user directly and empathetically.`
    });

    // Filter history to ensure it starts with a user message (Gemini API requirement)
    const firstUserIndex = (history || []).findIndex((msg) => msg.role === 'user');
    const filteredHistory = firstUserIndex !== -1 ? (history || []).slice(firstUserIndex) : [];

    // Format history for Gemini SDK: Array of { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = filteredHistory.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content || msg.text || '' }]
    }));

    const chat = model.startChat({
      history: formattedHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const responseText = response.text();

    res.status(200).json({
      role: 'assistant',
      content: responseText
    });
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      message: 'Failed to communicate with AI Companion',
      error: error.message
    });
  }
};

// @desc    Analyze a journal entry on-demand
// @route   POST /api/ai/analyze/:id
// @access  Private
const analyzeJournal = async (req, res) => {
  try {
    const journalId = req.params.id;
    const journal = await Journal.findById(journalId);

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    // Ensure the journal belongs to the logged in user
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const genAI = getGeminiClient();
    // Using gemini-2.5-flash with application/json response type
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const prompt = `You are a supportive, warm, and professional mental health AI companion.
Analyze the following private journal entry:
Title: "${journal.title}"
User-selected Mood: "${journal.mood}"
Content:
"${journal.content}"

Provide your emotional analysis strictly in the following JSON format:
{
  "sentiment": "A single word summarizing the primary sentiment of the text, e.g. Anxious, Sad, Stressed, Calm, Reflective, Overwhelmed, Happy, etc.",
  "summary": "A 2-3 sentence warm, validating, and empathetic summary of their feelings. Speak directly to the user (use 'you'). Avoid clinical jargon.",
  "copingTips": ["Three short, practical, and actionable wellness suggestions or activities that can help them cope with or enhance their current state (e.g. mindfulness exercises, gratitude listing, gentle movement). Each tip should be a brief single sentence."],
  "encouragement": "A short, positive, and uplifting closing affirmation or note of encouragement."
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    let aiAnalysis;
    try {
      aiAnalysis = JSON.parse(responseText);
    } catch (parseError) {
      // Fallback cleaner for markdown blocks if any
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      aiAnalysis = JSON.parse(cleanJson);
    }

    // Update journal entry in database with the analysis
    journal.aiAnalysis = {
      sentiment: aiAnalysis.sentiment || 'Reflective',
      summary: aiAnalysis.summary || 'Thank you for sharing your thoughts.',
      copingTips: aiAnalysis.copingTips || ['Take a few slow, deep breaths.', 'Reflect on one positive thing today.'],
      encouragement: aiAnalysis.encouragement || 'You are doing great. Keep going!'
    };

    await journal.save();

    res.status(200).json(journal);
  } catch (error) {
    console.error('Gemini Journal Analysis Error:', error);
    res.status(500).json({
      message: 'Failed to perform journal analysis',
      error: error.message
    });
  }
};

module.exports = {
  chatWithCompanion,
  analyzeJournal
};
