const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('ModerationService: GEMINI_API_KEY is not configured in .env');
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

const candidateModels = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite'
];

/**
 * Moderates community post title and content using Google Gemini.
 * Accurately distinguishes between vulnerable mental health expressions (permitted)
 * and malicious hate speech, harassment, or self-harm encouragement (flagged).
 *
 * @param {string} title - Post title
 * @param {string} content - Post body content
 * @returns {Promise<{ flagged: boolean, reason: string }>}
 */
const moderateContent = async (title, content) => {
  try {
    const genAI = getGeminiClient();
    if (!genAI) {
      // If AI key is missing, allow post with warning
      return { flagged: false, reason: '' };
    }

    const prompt = `You are the automated AI Content Moderation Guardian for "Wellness Connect", a supportive mental health and well-being community platform.
Your objective is to inspect community post submissions for severe violations (hate speech, targeted harassment, severe abuse, or active incitement of violence/self-harm).

CRITICAL CONTEXT & GUIDELINES:
1. SAFE & PERMITTED (DO NOT FLAG):
   - Emotional vulnerability, sadness, grief, depression, feeling empty, burnout, heartbreak, social anxiety, or loneliness.
   - Users asking for encouragement, venting about hard life circumstances, or sharing recovery struggles.
   - These are the core purpose of the platform and MUST NOT be flagged.

2. VIOLATIONS (MUST FLAG):
   - Hate Speech: Slurs, derogatory attacks, or demonization based on race, ethnicity, religion, gender, sexual orientation, disability, or nationality.
   - Harassment & Bullying: Direct attacks against specific individuals, abusive name-calling, doxxing, or threats of violence.
   - Encouragement of Self-Harm / Suicide: Telling others to hurt or kill themselves, providing methods/instructions for self-harm, or glorifying suicide. (Note: A user sharing their own emotional pain is NOT encouragement; telling someone to harm themselves IS).
   - Malicious Trolling or Explicit Graphic Hostility.

Analyze this submission:
Post Title: "${title.replace(/"/g, '\\"')}"
Post Content: "${content.replace(/"/g, '\\"')}"

Respond STRICTLY with a valid JSON object:
{
  "flagged": true or false,
  "reason": "Clear, concise 1-sentence explanation of why it violates community safety (if flagged), or empty string (if not flagged)."
}`;

    let lastError;
    let moderationResult = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1, // Low temperature for consistent classification
          }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
          const parsed = JSON.parse(text);
          moderationResult = {
            flagged: Boolean(parsed.flagged),
            reason: parsed.reason || ''
          };
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`ModerationService: Model ${modelName} encountered an error:`, err.message || err);
      }
    }

    if (moderationResult) {
      return moderationResult;
    }

    // If all models failed, log warning and fail gracefully
    console.error('ModerationService: All candidate models failed, passing through:', lastError?.message);
    return { flagged: false, reason: '' };

  } catch (error) {
    console.error('ModerationService error:', error.message);
    // Graceful fallback to avoid locking users out if moderation fails
    return { flagged: false, reason: '' };
  }
};

module.exports = { moderateContent };
