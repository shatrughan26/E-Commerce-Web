import express from 'express';
import Banner from '../models/HomePageBanner.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Admin uploads banner (POST)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('File:', req.file);
    console.log('Body:', req.body);

    const { title } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const image = `/uploads/${req.file.filename}`;

    const banner = new Banner({ title, image });
    await banner.save();

    res.status(201).json({ message: 'Banner uploaded successfully', banner });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload banner' });
  }
});


// User fetches the latest banner (GET)
router.get('/', async (req, res) => {
  try {
    const banner = await Banner.findOne().sort({ _id: -1 }); // Get latest
    if (!banner) return res.status(404).json({ message: 'No banner found' });

    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banner' });
  }
});

export default router;
