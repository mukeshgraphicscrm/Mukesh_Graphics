import express from 'express';
import cors from 'cors';
import { adminDb } from './firebase.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/quote', async (req, res) => {
  try {
    const { product, quantity, finish, name, email, phone } = req.body;
    
    // Add to quotes collection in Firestore
    const docRef = await adminDb.collection('quote_requests').add({
      product,
      quantity,
      finish,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      status: 'new'
    });
    
    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Expose the Express app for Vercel Serverless Functions
export default app;

// Also start a local server if running directly (e.g. nodemon during dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
  });
}
