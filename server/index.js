import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pdf from 'html-pdf';
import helmet from 'helmet';  // Import helmet for security headers
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import invoiceRoutes from './routes/invoices.js';
import clientRoutes from './routes/clients.js';
import userRoutes from './routes/userRoutes.js';
import profile from './routes/profile.js';
import pdfTemplate from './documents/index.js';
import emailTemplate from './documents/email.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// CORS configuration with restricted origins
const corsOptions = {
  origin: ['http://localhost:3000', 'https://another-trusted-site.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true  
};
app.use(cors(corsOptions));

// Disable 'X-Powered-By' header to prevent information leakage
app.disable('x-powered-by');

// Use helmet for security headers, including X-Content-Type-Options
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));  // This sets X-Frame-Options to DENY

// Manually ensure X-Content-Type-Options is set in case of special needs
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.use('/invoices', invoiceRoutes);
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profile);

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
  const { email, company } = req.body;
  pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
    transporter.sendMail({
      from: `Accountill <hello@accountill.com>`, 
      to: `${email}`, 
      replyTo: `${company?.email}`,
      subject: `Invoice from ${company?.businessName ? company?.businessName : company?.name}`, 
      text: `Invoice from ${company?.businessName ? company?.businessName : company?.name}`, 
      html: emailTemplate(req.body), 
      attachments: [{
        filename: 'invoice.pdf',
        path: `${__dirname}/invoice.pdf`
      }]
    });
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
});

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
