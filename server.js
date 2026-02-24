require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { OpenAI } = require('openai');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const preprompt = fs.readFileSync('saeriel_prompt.txt', 'utf8');

// ✅ Use new-style client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: preprompt },
                { role: 'user', content: message }
            ],
            temperature: 0.9
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error('OpenAI error:', err.message);
        res.status(500).json({ reply: 'The mists are silent. Try again soon.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✨ Saeriel server running at ${PORT}`);
});
