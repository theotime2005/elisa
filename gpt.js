const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env.GPT_KEY
});

async function main(question) {
    const completion = await openai.chat.completions.create({
        max_tokens: 50,
        messages: [{ role: "system", content: "You are a helpful assistant." },
            {role: "user", content: question}],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0];
}

exports.ask_gpt=main;