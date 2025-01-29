// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    window.scrollTo({
        top: document.querySelector(targetId).offsetTop - 70,
        behavior: "smooth"
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    // For forms with "mailto:" action, prevent default is not needed
    // Remove preventDefault to allow mailto to work
    // e.preventDefault(); 

    // Optionally, display a thank-you message before form submission
    alert('Your email client will now open to send the message.');
});

// Typing Animation
const typedTextSpan = document.getElementById('typed-text');
const cursorSpan = document.getElementById('cursor');

const textArray = [
    "A driven and ambitious professional.",
    "Passionate about software engineering.",
    "Ready to make a meaningful impact."
];
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 1500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});



// Simple NLP Implementation
function getBotResponse(userMessage) {
    // Show typing indicator
    displayMessage('', 'bot typing');

    setTimeout(() => {
        // Remove typing indicator
        const typingMessage = document.querySelector('.message.bot.typing');
        if (typingMessage) {
            typingMessage.remove();
        }

        userMessage = userMessage.toLowerCase();
        let botMessage = '';

        if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
            botMessage = 'Hello! How can I assist you today?';
        } else if (userMessage.includes('project') || userMessage.includes('projects')) {
            botMessage = 'I have worked on several projects like the Clue Game, C++ API Project, and Geo Map Project. Which one would you like to know about?';
        } else if (userMessage.includes('clue game')) {
            botMessage = 'The Clue Game is a project where I recreated the classic board game using Java and OOP principles. Would you like to know more?';
        } else if (userMessage.includes('skills')) {
            botMessage = 'I am proficient in C++, Java, Python, SQL, and JavaScript. I also have experience with Git, Agile methodologies, and unit testing.';
        } else {
            botMessage = 'I\'m sorry, I didn\'t quite understand that. Could you please rephrase?';
        }

        // Display bot's response
        displayMessage(botMessage, 'bot');
    }, 1000);
}

// Voice Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

voiceBtn.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    sendMessage();
};

// Speech Synthesis
function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}