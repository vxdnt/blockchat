document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const currentUserDisplay = document.getElementById("currentUser");
    const userList = document.getElementById("users").getElementsByTagName("li");

    let currentUser = null;
    let chatHistory = {}; // Store chat history for each user

    // Function to select a user
    function selectUser(user) {
        currentUser = user;
        currentUserDisplay.textContent = `${user}`;
        loadChat();
    }

    // Function to send a message
    function sendMessage(sender, message) {
        if (!currentUser) {
            alert("Please select a user first!");
            return;
        }
        if (message.trim() === "") return;

        // Create message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);

        // Store message
        storeMessage(sender, message);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear input
        messageInput.value = "";

        // Auto-reply for testing
        if (sender === "user") {
            setTimeout(autoReply, 1000);
        }
    }

    // Function to auto-reply (for testing)
    function autoReply() {
        const replies = [
            "Hey there!",
            "How's it going?",
            "That's interesting!",
            "Tell me more.",
            "I'm here to chat!"
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        sendMessage("bot", reply);
    }

    // Store messages per user
    function storeMessage(sender, message) {
        if (!chatHistory[currentUser]) {
            chatHistory[currentUser] = [];
        }
        chatHistory[currentUser].push({ sender, message });
    }

    // Load chat history for selected user
    function loadChat() {
        chatBox.innerHTML = "";
        if (chatHistory[currentUser]) {
            chatHistory[currentUser].forEach(({ sender, message }) => {
                const messageElement = document.createElement("div");
                messageElement.classList.add("message", sender);
                messageElement.textContent = message;
                chatBox.appendChild(messageElement);
            });
        }
    }

    // Event listener for sending messages
    sendBtn.addEventListener("click", () => {
        sendMessage("user", messageInput.value);
    });

    // Allow pressing 'Enter' to send messages
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage("user", messageInput.value);
        }
    });

    // User selection event listeners
    for (let i = 0; i < userList.length; i++) {
        userList[i].addEventListener("click", function () {
            selectUser(this.textContent);
        });
    }
});
