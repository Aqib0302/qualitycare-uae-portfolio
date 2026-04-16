

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quoteSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  phone:     { type: String, required: true },
  email:     { type: String },
  service:   { type: String },           
  city:      { type: String },           
  message:   { type: String },
  status:    { type: String, default: 'new' }, 
  createdAt: { type: Date, default: Date.now },
});
const Quote = mongoose.model('Quote', quoteSchema);
const serviceSchema = new mongoose.Schema({
  slug:        { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  description: { type: String },
  image:       { type: String },
  cities:      [{ type: String }],       
  rating:      { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 100 },
  isActive:    { type: Boolean, default: true },
});
const Service = mongoose.model('Service', serviceSchema);
const blogSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  slug:      { type: String, required: true, unique: true },
  content:   { type: String },
  excerpt:   { type: String },
  image:     { type: String },
  author:    { type: String, default: 'Quality Care Team' },
  tags:      [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Blog = mongoose.model('Blog', blogSchema);

const clientSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  logo:    { type: String },
  website: { type: String },
  type:    { type: String },             
  order:   { type: Number, default: 0 },
});
const Client = mongoose.model('Client', clientSchema);

app.post('/api/quotes', async (req, res) => {
  try {
    const quote = await Quote.create(req.body);


    await sendAdminNotification(quote);

    res.status(201).json({ success: true, data: quote });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get('/api/quotes', async (req, res) => {
  // Admin only — protected by auth middleware in production
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.json({ success: true, data: quotes });
});

app.patch('/api/quotes/:id/status', async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json({ success: true, data: quote });
});

// ── SERVICES ──
app.get('/api/services', async (req, res) => {
  const services = await Service.find({ isActive: true });
  res.json({ success: true, data: services });
});

app.get('/api/services/:slug', async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: service });
});
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
  res.json({ success: true, data: blogs });
});

app.get('/api/blogs/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, published: true });
  if (!blog) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: blog });
});

app.get('/api/clients', async (req, res) => {
  const clients = await Client.find().sort({ order: 1 });
  res.json({ success: true, data: clients });
});

app.get('/api/contact/whatsapp', (req, res) => {
  const phone = process.env.WHATSAPP_NUMBER || '971565656825';
  const msg = encodeURIComponent(req.query.message || 'Hi, I need a quote!');
  res.redirect(`https://wa.me/${phone}?text=${msg}`);
});

async function sendAdminNotification(quote) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Quote Request — ${quote.name}`,
    html: `
      <h2>New Quote Request</h2>
      <p><b>Name:</b> ${quote.name}</p>
      <p><b>Phone:</b> ${quote.phone}</p>
      <p><b>Service:</b> ${quote.service}</p>
      <p><b>City:</b> ${quote.city}</p>
      <p><b>Message:</b> ${quote.message}</p>
    `,
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;