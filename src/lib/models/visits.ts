import { model, models, Schema } from 'mongoose';

const visitSchema = new Schema({
  ip: { type: String, required: true },
  referrer: { type: String, required: true },
  path: { type: String, required: true },
  method: { type: String, required: true },
  status: { type: Number, required: true },
  userAgent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Visit = models.Visit || model('Visit', visitSchema);
export default Visit;
