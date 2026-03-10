const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add a message bubble
function addMessage(sender, text) {
    const message = document.createElement("div");
    message.className = sender;
    message.innerText = text;
    chatBox.appendChild(message);

    // Smooth scroll to bottom
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth"
    });

    return message;
}

// Function to handle sending messages
async function sendMessage() {

    const text = userInput.value.trim();
    if (!text) return;

    // 1️⃣ Add User Message
    addMessage("user", text);
    userInput.value = "";

    // 2️⃣ Show loading message
    const loadingMessage = addMessage("bot", "Typing...");

    try {

        const response = await fetch("https://peacepulse-ai05.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        // 3️⃣ Remove loading and show AI reply
        chatBox.removeChild(loadingMessage);
        addMessage("bot", data.reply);

    } catch (error) {

        chatBox.removeChild(loadingMessage);

        addMessage(
            "bot",
            "⚠️ I'm having trouble connecting to the server. Please try again."
        );

        console.error(error);
    }
}

// Button click
sendBtn.addEventListener("click", sendMessage);

// Press Enter
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Welcome message
window.onload = () => {

    setTimeout(() => {

        addMessage(
            "bot",
            "🌿 Welcome to PeacePulse. I'm here to listen. How are you feeling today?"
        );

    }, 600);

};
