// Multilingual text configuration
const textConfig = {
  languages: {
    fr: {
      name: "Français",
      paragraphs: [
        "Hey Mère,",
        "Je vais bien et je continue",
        "mon chemin de petit bonhomme.",
        "Oui, tu l'aurais deviné,",
        "chaque 19 Avril demeures toujours spécial.",
        "Ça me fait bizarre parfois!!!",
        "Te rappelles-tu le temps",
        "où tu restais en inquiétude,",
        "quand je tremblais de peur, d'effroi?",
        "Ça y est,",
        "je suis peut-être arrivé à les surmonter,",
        "je ne sais pas. Mais sois rassurée,",
        "sur ce chemin d'apprentissage qu'est la vie,",
        "je peux te dire que j'accepte désormais mes peurs,",
        "et on croise le fer.",
        "Je suis reconnaissant pour mes sœurs,",
        "mes proches, tout mon entourage.",
        "Et eux aussi d'ailleurs le sont en retour.",
        "Tu leur as laissé une personne",
        "capable de vieillir comme du bon vin.",
        "Tu étais mon plus grand Bonheur.",
        "A ta Santé."
      ],
      signature: "Espoir Tounde Badjossou.",
      ui: {
        pause: '<i class="fas fa-pause"></i>',
        continue: '<i class="fas fa-play"></i>',
        speed: '<i class="fas fa-tachometer-alt"></i>',
        restart: '<i class="fas fa-redo"></i>',
        language: '<i class="fas fa-language"></i>'
      }
    },
    en: {
      name: "English",
      paragraphs: [
        "Hey Mom,",
        "I'm doing well and I continue",
        "on my path as a little man.",
        "Yes, you would have guessed,",
        "every April 19th remains special.",
        "It feels weird sometimes!!!",
        "Do you remember the time",
        "when you would worry,",
        "when I trembled with fear, with dread?",
        "There you go,",
        "I may have managed to overcome them,",
        "I don't know. But rest assured,",
        "on this learning path that is life,",
        "I can tell you that I now accept my fears,",
        "and we cross swords.",
        "I am grateful for my sisters,",
        "my loved ones, all my surroundings.",
        "And they are too in return.",
        "You left them a person",
        "capable of aging like fine wine.",
        "You were my greatest happiness.",
        "Cheers."
      ],
      signature: "Espoir Tounde Badjossou.",
      ui: {
        pause: '<i class="fas fa-pause"></i>',
        continue: '<i class="fas fa-play"></i>',
        speed: '<i class="fas fa-tachometer-alt"></i>',
        restart: '<i class="fas fa-redo"></i>',
        language: '<i class="fas fa-language"></i>'
      }
    },
    de: {
      name: "Deutsch",
      paragraphs: [
        "Hallo Mutter,",
        "Mir geht es gut und ich gehe weiter",
        "meinen Weg als kleiner Mann.",
        "Ja, du hättest es erraten,",
        "jeder 19. April bleibt etwas Besonderes.",
        "Es fühlt sich manchmal komisch an!!!",
        "Erinnerst du dich an die Zeit",
        "als du besorgt warst,",
        "als ich vor Angst, vor Schreck zitterte?",
        "Da ist es,",
        "ich habe es vielleicht geschafft, sie zu überwinden,",
        "Ich weiß es nicht. Aber sei versichert,",
        "auf diesem Lernpfad, der das Leben ist,",
        "kann ich dir sagen, dass ich meine Ängste jetzt akzeptiere,",
        "und wir kreuzen die Klingen.",
        "Ich bin dankbar für meine Schwestern,",
        "meine Lieben, all meine Umgebung.",
        "Und sie sind es auch im Gegenzug.",
        "Du hast ihnen eine Person hinterlassen",
        "die wie guter Wein altern kann.",
        "Du warst mein größtes Glück.",
        "Prost."
      ],
      signature: "Espoir Tounde Badjossou.",
      ui: {
        pause: '<i class="fas fa-pause"></i>',
        continue: '<i class="fas fa-play"></i>',
        speed: '<i class="fas fa-tachometer-alt"></i>',
        restart: '<i class="fas fa-redo"></i>',
        language: '<i class="fas fa-language"></i>'
      }
    }
  },
  groupSize: 3,
  separator: "<br><br>",
  defaultLanguage: "en"
};

// Animation timing configuration
const animationConfig = {
  typingSpeed: 50,
  deleteSpeed: 30,
  pauseAfterTyping: 2000,
  pauseBetweenGroups: 500,
  initialSpeed: 1
};

// DOM elements
const elements = {
  text: document.getElementById("text"),
  pauseBtn: document.getElementById("pauseBtn"),
  speedBtn: document.getElementById("speedBtn"),
  restartBtn: document.getElementById("restartBtn"),
  languageSelect: document.createElement("select")
};

// Animation state
const state = {
  currentGroup: 0,
  charIndex: 0,
  speedMultiplier: animationConfig.initialSpeed,
  isTyping: true,
  isDeleting: false,
  timeoutId: null,
  paragraphGroups: [],
  currentLanguage: textConfig.defaultLanguage,
  showingSignature: false
};

// Initialize the application
function init() {
  createLanguageSelector();
  createParagraphGroups();
  setupEventListeners();
  updateUIText();
  startAnimation();
}

// Create language selection dropdown
function createLanguageSelector() {
  const controls = document.querySelector(".controls");
  const languageContainer = document.createElement("div");
  languageContainer.className = "language-container";
  
  const languageIcon = document.createElement("span");
  languageIcon.innerHTML = textConfig.languages[state.currentLanguage].ui.language;
  languageIcon.className = "language-icon";
  
  elements.languageSelect.id = "languageSelect";
  
  for (const [code, lang] of Object.entries(textConfig.languages)) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = lang.name;
    elements.languageSelect.appendChild(option);
  }
  
  elements.languageSelect.value = state.currentLanguage;
  elements.languageSelect.addEventListener("change", (e) => {
    state.currentLanguage = e.target.value;
    updateUIText();
    restartAnimation();
  });
  
  languageContainer.appendChild(languageIcon);
  languageContainer.appendChild(elements.languageSelect);
  controls.insertBefore(languageContainer, controls.firstChild);
}

// Update UI text based on current language
function updateUIText() {
  const uiText = textConfig.languages[state.currentLanguage].ui;
  
  if (state.isTyping) {
    elements.pauseBtn.innerHTML = uiText.pause;
  } else {
    elements.pauseBtn.innerHTML = uiText.continue;
  }
  
  elements.speedBtn.innerHTML = `${uiText.speed} x${state.speedMultiplier}`;
  elements.restartBtn.innerHTML = uiText.restart;
  
  const languageIcon = document.querySelector(".language-icon");
  if (languageIcon) {
    languageIcon.innerHTML = uiText.language;
  }
}

// Group paragraphs into chunks for display
function createParagraphGroups() {
  const { paragraphs, signature } = textConfig.languages[state.currentLanguage];
  const { groupSize, separator } = textConfig;
  
  state.paragraphGroups = [];
  
  for (let i = 0; i < paragraphs.length; i += groupSize) {
    const group = paragraphs.slice(i, i + groupSize).join(separator);
    state.paragraphGroups.push(group);
  }
  
  state.paragraphGroups.push(`<div class="signature">${signature}</div>`);
}

// Set up all event listeners
function setupEventListeners() {
  elements.pauseBtn.addEventListener("click", togglePause);
  elements.speedBtn.addEventListener("click", toggleSpeed);
  elements.restartBtn.addEventListener("click", restartAnimation);
}

// Start or restart the typing animation
function startAnimation() {
  state.isTyping = true;
  state.isDeleting = false;
  state.currentGroup = 0;
  state.charIndex = 0;
  state.showingSignature = false;
  elements.text.innerHTML = "";
  updateUIText();
  typeText();
}

// Main animation function
function typeText() {
  if (!state.isTyping) return;
  
  const currentText = state.paragraphGroups[state.currentGroup];
  const {
    typingSpeed,
    deleteSpeed,
    pauseAfterTyping,
    pauseBetweenGroups
  } = animationConfig;
  
  if (!state.isDeleting && state.charIndex < currentText.length) {
    elements.text.innerHTML = currentText.substring(0, state.charIndex + 1);
    state.charIndex++;
    state.timeoutId = setTimeout(typeText, typingSpeed / state.speedMultiplier);
  } 
  else if (!state.isDeleting && state.charIndex === currentText.length) {
    if (state.currentGroup === state.paragraphGroups.length - 1) {
      state.showingSignature = true;
      return;
    }
    
    state.isDeleting = true;
    state.timeoutId = setTimeout(typeText, pauseAfterTyping / state.speedMultiplier);
  } 
  else if (state.isDeleting && state.charIndex > 0) {
    elements.text.innerHTML = currentText.substring(0, state.charIndex - 1);
    state.charIndex--;
    state.timeoutId = setTimeout(typeText, deleteSpeed / state.speedMultiplier);
  } 
  else if (state.isDeleting && state.charIndex === 0) {
    state.isDeleting = false;
    state.currentGroup = (state.currentGroup + 1) % state.paragraphGroups.length;
    state.timeoutId = setTimeout(typeText, pauseBetweenGroups / state.speedMultiplier);
  }
}

// Toggle pause/continue animation
function togglePause() {
  if (state.isTyping) {
    clearTimeout(state.timeoutId);
    state.isTyping = false;
  } else {
    state.isTyping = true;
    typeText();
  }
  updateUIText();
}

// Toggle animation speed
function toggleSpeed() {
  state.speedMultiplier = state.speedMultiplier === 1 ? 2 : 1;
  updateUIText();
}

// Restart the animation
function restartAnimation() {
  clearTimeout(state.timeoutId);
  createParagraphGroups();
  startAnimation();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);