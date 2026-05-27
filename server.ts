import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse large JSON requests (for images)
  app.use(express.json({ limit: '10mb' }));

  app.post('/api/verify-payment', async (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'System error: GEMINI_API_KEY is not configured.' });
      }

      const ai = new GoogleGenAI({ apiKey });

      const base64Data = imageBase64.split(',')[1] || imageBase64;
      const mimeTypeMatch = imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: 'Analyze this image. Is it a valid payment screenshot for a transaction (e.g. UPI, GPay, Paytm, PhonePe, Bank Transfer)? If it looks like a fake payment, a blank image, a random photo (like a face or landscape), or heavily manipulated/invalid, return "FAKE". If it appears to be a legitimate payment screenshot or receipt, return "VALID". Only return "VALID" or "FAKE", nothing else.',
              },
              {
                inlineData: {
                  data: base64Data,
                  mimeType,
                },
              },
            ],
          },
        ],
      });

      const text = response.text?.trim().toUpperCase() || 'FAKE';
      
      if (text.includes('VALID')) {
        res.json({ isValid: true });
      } else {
        res.json({ isValid: false, reason: 'Image does not appear to be a valid payment screenshot.' });
      }

    } catch (error: any) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment', details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
