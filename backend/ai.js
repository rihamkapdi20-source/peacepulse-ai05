const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

async function getAIResponse(message) {

  const completion = await groq.chat.completions.create({

    messages: [
      {
        role: "system",
        content:
          "You are a supportive and empathetic mental health assistant. Help users reduce stress and provide calm suggestions."
      },
      {
        role: "user",
        content: message
      }
    ],

    model: "llama-3.3-70b-versatile"

  })

  return completion.choices[0].message.content

}

module.exports = { getAIResponse }
