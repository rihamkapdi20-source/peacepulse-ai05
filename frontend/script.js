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
        behavior: 'smooth'
    });
    
    return message;
}

// Function to handle sending messages
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage("user", text);
    userInput.value = "";

    // 2. Add temporary loading indicator
    const loadingMessage = addMessage("bot", "...");

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        // 3. Replace loading with actual response
        chatBox.removeChild(loadingMessage);
        addMessage("bot", data.reply);

    } catch (error) {
        chatBox.removeChild(loadingMessage);
        addMessage("bot", "I'm having trouble connecting to the server. Please check your backend.");
    }
}

// Event Listeners
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Initial Welcome Message
window.onload = () => {
    setTimeout(() => {
        addMessage("bot", "Welcome to PeacePulse. I'm here to listen. How are you feeling today?");
    }, 600);
};
