// models/bannerModel.js
import mongoose from 'mongoose';

const bannerHomePageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
});


export default mongoose.model('Banner', bannerHomePageSchema);
