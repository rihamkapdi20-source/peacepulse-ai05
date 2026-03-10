const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// CHANGE THIS TO YOUR RENDER BACKEND URL
const API_URL = "";

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.className = sender;
    message.innerText = text;
    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
    return message;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    const loading = addMessage("bot", "Typing...");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        loading.remove();
        addMessage("bot", data.reply);

    } catch (error) {
        loading.remove();
        addMessage("bot", "⚠️ Cannot connect to AI server.");
        console.error(error);
    }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

window.onload = () => {
    addMessage("bot", "Hello 🌿 I'm PeacePulse. How are you feeling today?");
};
