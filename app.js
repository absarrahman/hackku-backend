const express = require('express');
const recordRoutes = require('./routes/recordRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use('/record', recordRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
