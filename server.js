import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ 
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true 
}));
app.use(express.json({ limit: '100kb' }));
app.use('/api/', rateLimit({ windowMs: 15*60*1000, max: 100 }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Invalid input' });

  console.log('Contact form received:', { name, email, message });
  res.json({ ok: true, message: 'Form received successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
