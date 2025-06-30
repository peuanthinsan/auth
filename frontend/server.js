const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
const PORT = process.env.FRONTEND_PORT || 4000;
app.listen(PORT, () => console.log(`Frontend running on ${PORT}`));
