// app.js
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import urlshorten from './routes/urlshorten.routes.js';
const app = express();


app.use(cors());
connectDB();
app.use(express.json({ limit: "16kb" }));

app.use('/api/shorten', urlshorten);



// Set the port from environment or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
