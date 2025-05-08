const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// إعداد الاتصال بقاعدة البيانات
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'webpulse_db',
  password: 'yourpassword',
  port: 5432,
});

// مثال على واجهة لتسجيل الموقع
app.post('/register', async (req, res) => {
  const { websiteUrl } = req.body;
  try {
    const result = await pool.query('INSERT INTO websites (url) VALUES ($1) RETURNING *', [websiteUrl]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting website');
  }
});

// بدء السيرفر
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
