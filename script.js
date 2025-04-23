const body = document.body;
const themeIcon = document.getElementById("theme-icon");
const logo = document.getElementById("logo");
const chatbot = document.getElementById("chatbot");
const navLinks = document.getElementById("nav-links");
const hamburger = document.getElementById("hamburger");
const floatingControls = document.getElementById("floating-controls");
const chatBox = document.getElementById("chat-box");
let lastIntent = null;

// Theme Toggle (light/dark)
themeIcon.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode", !isDark);
  themeIcon.src = isDark ? "assets/sun-unscreen.gif" : "assets/night-unscreen.gif";
  logo.src = isDark ? "assets/thisgeeklogo-white.png" : "assets/thisgeeklogo.png";
});

// Toggle chatbot and hide/show icons
function toggleChatbot() {
  const isVisible = chatbot.style.display === "flex";
  chatbot.style.display = isVisible ? "none" : "flex";
  floatingControls.style.display = isVisible ? "flex" : "none";
}

// Send user message
function sendMessage() {
  const input = document.getElementById("message-input");
  const message = input.value.trim();

  if (message) {
    // Show user message
    const userMsg = document.createElement("div");
    userMsg.textContent = message;
    userMsg.style.margin = "10px 0";
    userMsg.style.background = body.classList.contains("dark-mode") ? "#2e2e2e" : "#eee";
    userMsg.style.color = body.classList.contains("dark-mode") ? "#fff" : "#000";
    userMsg.style.padding = "6px 10px";
    userMsg.style.borderRadius = "8px";
    userMsg.style.alignSelf = "flex-end";
    chatBox.appendChild(userMsg);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Bot reply with delay
    setTimeout(() => {
      const replyData = getBotReply(message.toLowerCase());
      const botMsg = document.createElement("div");
      botMsg.style.margin = "10px 0";
      botMsg.style.background = "#0078ff";
      botMsg.style.color = "#fff";
      botMsg.style.padding = "6px 10px";
      botMsg.style.borderRadius = "8px";
      botMsg.style.alignSelf = "flex-start";

      if (typeof replyData === "object") {
        botMsg.textContent = replyData.text;

        if (replyData.buttons) {
          replyData.buttons.forEach(label => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.style.margin = "5px 4px 0 0";
            btn.style.padding = "5px 12px";
            btn.style.border = "none";
            btn.style.borderRadius = "6px";
            btn.style.cursor = "pointer";
            btn.style.background = "#fff";
            btn.style.color = "#0078ff";
            btn.onclick = () => {
              document.getElementById("message-input").value = label;
              sendMessage();
            };
            botMsg.appendChild(document.createElement("br"));
            botMsg.appendChild(btn);
          });
        }
      } else {
        botMsg.textContent = replyData;
      }

      chatBox.appendChild(botMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
  }
}

// Enter key to send message
document.getElementById("message-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Mobile nav toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Bot replies with memory + buttons
function getBotReply(message) {
  if (/hi|hello|hey|good morning|good evening/.test(message)) {
    lastIntent = "greeting";
    return {
      text: "Hey there! How can I assist you today?",
      buttons: ["Get a Quote", "Book Appointment", "Browse Services"]
    };
  }

  if (/how are you|how's it going/.test(message)) {
    return "I'm doing great, thanks! What can I help you with?";
  }

  if (/service|offer|solutions|what do you do/.test(message)) {
    lastIntent = "services";
    return {
      text: "We offer IT support, cybersecurity, and geeky automation tools. Want to know more about a specific service?",
      buttons: ["Web Dev", "Cybersecurity", "IT Support"]
    };
  }

  if (/price|cost|quote|how much/.test(message)) {
    lastIntent = "pricing";
    return {
      text: "We offer flexible pricing depending on your needs. Want a quote?",
      buttons: ["Yes", "No"]
    };
  }

  if (message === "yes" && lastIntent === "pricing") {
    return "Great! Please tell me what service you're interested in.";
  }

  if (/book|appointment|schedule/.test(message)) {
    lastIntent = "appointment";
    return {
      text: "Sure! Want me to help you schedule a call?",
      buttons: ["Yes", "Maybe Later"]
    };
  }

  if (message === "get a quote") {
    return "Let’s get you a quote! What service are you interested in?";
  }

  if (message === "book appointment" || (message === "yes" && lastIntent === "appointment")) {
    return "Awesome! Please provide your preferred date and time.";
  }

  if (/contact|email|reach|call/.test(message)) {
    lastIntent = "contact";
    return "You can reach us at 069 807 7866 (Call/WhatsApp) or at hello@thisgeek.co.za or use our contact form.";
  }

  if (/thanks|thank you/.test(message)) {
    return "You're very welcome! Let me know if there's anything else.";
  }

  if (/bye|goodbye|see you/.test(message)) {
    return "Talk to you soon!";
  }

  return {
    text: "I’m here to help! You can ask about pricing, services, or how to book a call.",
    buttons: ["Pricing", "Services", "Contact"]
  };
}
