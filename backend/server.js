const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {

const userMessage = req.body.message;

let reply = "I'm here to listen. Tell me more about how you're feeling.";

if(userMessage.toLowerCase().includes("stress")){
reply = "I'm sorry you're feeling stressed. Taking a few deep breaths can help calm your mind.";
}

if(userMessage.toLowerCase().includes("sad")){
reply = "I'm here for you. Remember that difficult feelings pass with time.";
}

res.json({ reply });

});

app.get("/", (req,res)=>{
res.send("PeacePulse AI Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running on port " + PORT);
});
