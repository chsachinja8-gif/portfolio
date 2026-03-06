let recognition;
let isRecognizing = false;
let assistantActive = false;
let isSpeaking = false;

document.body.addEventListener("click", initAssistant);

function initAssistant() {
  if (recognition) return; // already initialized

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.continuous = false;

  recognition.onstart = () => {
    isRecognizing = true;
  };

  recognition.onresult = (event) => {
    if (isSpeaking) return; // prevent self voice detection

    let command = event.results[0][0].transcript.toLowerCase().trim();
    console.log("You said:", command);

    // 🔹 Wake Word
    if (!assistantActive) {
      if (command.includes("jarvis")) {
        assistantActive = true;
        speak("Hello Sachin, how can I help you?");
      }
      return;
    }

    // 🔹 Navigation Commands
    if (command.includes("project")) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      speak("Opening project section");

    } 
    else if(command.includes("dark mode")){
      document.body.style.backgroundColor = 'gray';
      speak("dark mode on");
    }
    else if(command.includes("light mode")){
      document.body.style.backgroundColor = 'white';
      speak("light mode on");
    }
    else if (command.includes("about")) {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      speak("Opening about section");

    } else if (command.includes("contact")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        speak("Opening contact section");}

  else if(command.includes("open google")){
  let a = document.createElement("a");
  a.href = "https://www.google.com";
  a.target = "_blank";
  a.click();
}

    else if (command.includes("scroll down")) {
      window.scrollBy({ top: 500, behavior: "smooth" });
      speak("Scrolling down");

    } else if (command.includes("scroll up")) {
      window.scrollBy({ top: -500, behavior: "smooth" });
      speak("Scrolling up");

    // 🔹 Open Websites (FIXED)
    } else if (command.includes("open google")) {
      openSite("https://www.google.com", "Opening Google");

    } else if (command.includes("open youtube")) {
      openSite("https://www.youtube.com", "Opening YouTube");

    } else if (command.includes("open whatsapp")) {
      openSite("https://web.whatsapp.com", "Opening WhatsApp");

    } else if (command.includes("open instagram")) {
      openSite("https://www.instagram.com", "Opening Instagram");

    // 🔹 Time
    } else if (command.includes("time")) {
      let time = new Date().toLocaleTimeString();
      speak("Current time is " + time);

    // 🔹 Date
    } else if (command.includes("date")) {
      let date = new Date().toDateString();
      speak("Today's date is " + date);

    // 🔹 Stop Assistant
    } else if (command.includes("stop")) {
      speak("Okay Sachin, assistant stopped");
      assistantActive = false;

    // 🔹 Unknown Command → Google Search
    } else {
      openSite(`https://www.google.com/search?q=${command}`, "Searching on Google");
    }
  };

  recognition.onend = () => {
    isRecognizing = false;
    if (assistantActive && !isSpeaking) {
      startRecognition();
    }
  };

  recognition.onerror = () => {
    isRecognizing = false;
  };

  startRecognition();
}

function startRecognition() {
  if (!isRecognizing && !isSpeaking) {
    recognition.start();
  }
}

function speak(text) {
  recognition.stop(); // stop mic while speaking
  isSpeaking = true;

  let utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-IN";

  utter.onend = () => {
    isSpeaking = false;
    if (assistantActive) {
      startRecognition();
    }
  };

  speechSynthesis.speak(utter);
}

// 🔥 Safe Website Opening Function
function openSite(url, message) {
  recognition.stop();
  isSpeaking = true;

  let utter = new SpeechSynthesisUtterance(message);
  utter.lang = "hi-IN";

  utter.onend = () => {
    window.open(url, "_blank");
    isSpeaking = false;
    if (assistantActive) {
      startRecognition();
    }
  };

  speechSynthesis.speak(utter);
}
