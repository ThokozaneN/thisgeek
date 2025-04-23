const body = document.body;
const themeIcon = document.getElementById("theme-icon");
const logo = document.getElementById("logo");
const chatbot = document.getElementById("chatbot");
const navLinks = document.getElementById("nav-links");
const hamburger = document.getElementById("hamburger");
const floatingControls = document.getElementById("floating-controls");

// Theme Toggle (light/dark)
themeIcon.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode", !isDark);

  // Update theme icon and logo
  themeIcon.src = isDark ? "assets/sun-unscreen.gif" : "assets/night-unscreen.gif";
  logo.src = isDark ? "assets/thisgeeklogo-white.png" : "assets/thisgeeklogo.png";
});

// Toggle chatbot and hide/show floating icons
function toggleChatbot() {
  if (!chatbot) return;

  const isVisible = chatbot.style.display === "flex";
  chatbot.style.display = isVisible ? "none" : "flex";

  floatingControls.style.display = isVisible ? "flex" : "none";
}

// Send message from input
function sendMessage() {
  const input = document.getElementById("message-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();

  if (message) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    msgDiv.style.margin = "10px 0";
    msgDiv.style.background = body.classList.contains("dark-mode") ? "#2e2e2e" : "#eee";
    msgDiv.style.color = body.classList.contains("dark-mode") ? "#fff" : "#000";
    msgDiv.style.padding = "6px 10px";
    msgDiv.style.borderRadius = "8px";

    chatBox.appendChild(msgDiv);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Support Enter key for message input
document.getElementById("message-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Hamburger menu toggle (mobile nav)
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});