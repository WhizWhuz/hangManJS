// Array of Words
const words = [
    "tree", "book", "fish", "lion", "ship", "wolf", "star", "moon", "rock", "frog",
    "apple", "grape", "chair", "zebra", "ocean", "camel", "clock", "bread", "cloud", "piano",
    "jungle", "planet", "rocket", "guitar", "garden", "castle", "button", "school", "forest", "turtle",
    "candle", "monster", "teacher", "library", "diamond", "rainbow", "sunrise", "picture", "painter", "justice"
];

const theBody = document.getElementById('thebody');
const blurScreen = document.getElementById('blurscreen');

// SVG Parts Array - Define the order of hangman parts to appear
const svgParts = [
    document.getElementById('ground'),
    document.getElementById('scaffold'),
    document.getElementById('head'),    
    document.getElementById('body'),    
    document.getElementById('arms'),    
    document.getElementById('legs')     
];

const playAgainButton = document.getElementById('playagain');

// Select Elements
const wordSlots = [
    document.getElementById('firstword'),
    document.getElementById('secondword'),  
    document.getElementById('thirdword'),
    document.getElementById('fourthword'),
    document.getElementById('fifthword'),
    document.getElementById('sixthword'),
];

const confetti = document.getElementById('confetti');
const guessedLettersDisplay = document.getElementById('guessedletters');
const inputField = document.getElementById('textfield');
const submitButton = document.getElementById('submitletter');
const playAgainWindow = document.getElementById('playagainwindow');
const outcomeText = document.getElementById('outcometext');

// Game Variables
const maxAttempts = svgParts.length;
let attempts = 0;
let guessedLetters = [];
let incorrectGuesses = [];
let currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

// Initialize Word Display for Correct Letters
function initializeDisplay() {
    guessedLettersDisplay.textContent = "_ ".repeat(currentWord.length).trim();
}
initializeDisplay();

// Update Display for Correct Guesses
function updateGuessedLettersDisplay() {
    let displayText = currentWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    guessedLettersDisplay.textContent = displayText;
}

// Display Incorrect Guesses in Word Slots
function displayIncorrectGuess(letter) {
    if (attempts - 1 < maxAttempts) { // Check to prevent overflow
        wordSlots[attempts - 1].textContent = letter;
    }
    if (attempts - 1 < svgParts.length) {
        svgParts[attempts - 1].style.visibility = "visible";
    }
}

// Check Guess Function
function checkGuess() {
    const guess = inputField.value.toUpperCase();
    inputField.value = "";

    if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
        alert("Enter a valid letter.");
        return;
    }

    if (guessedLetters.includes(guess) || incorrectGuesses.includes(guess)) {
        alert("You already guessed that letter!");
        return;
    }

    if (currentWord.includes(guess)) {
        guessedLetters.push(guess);
        updateGuessedLettersDisplay();
    } else {
        incorrectGuesses.push(guess);   
        attempts++;
        displayIncorrectGuess(guess);
    }

    // Check for Win/Lose Conditions
    if (guessedLetters.length === new Set(currentWord).size) {
        blurScreen.style.visibility = 'visible';
        outcomeText.innerHTML = `You won! <br> The right word was: <b>${currentWord}</b>`;
        theBody.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(100,237,125,1) 49%, rgba(165,237,100,1) 100%)";
        confetti.style.visibility = 'visible';
        playAgainWindow.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(100,237,125,1) 49%, rgba(165,237,100,1) 100%)";
        setTimeout(() => confetti.style.visibility = 'hidden', 2500);

    } else if (attempts >= maxAttempts) {
        blurScreen.style.visibility = 'visible';
        outcomeText.innerHTML = `You lost! <br> The word was: <b>${currentWord}</b>`;
        theBody.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(219,100,237,1) 49%, rgba(237,100,100,1) 99%)";
        playAgainWindow.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(219,100,237,1) 49%, rgba(237,100,100,1) 99%)";
    }
}

// Reset Game Function
function resetGame() {
    attempts = 0;
    guessedLetters = [];
    incorrectGuesses = [];
    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    guessedLettersDisplay.textContent = "_ ".repeat(currentWord.length).trim();
    wordSlots.forEach(slot => slot.textContent = "");
    svgParts.forEach(part => part.style.visibility = "hidden");

    theBody.style.background = 'radial-gradient(circle, rgba(145,179,240,1) 6%, rgba(100,149,237,1) 49%, rgba(100,149,237,1) 99%)';

    blurScreen.style.visibility = 'hidden';
    initializeDisplay();
}

// Event Listeners
playAgainButton.addEventListener('click', resetGame);
submitButton.addEventListener('click', checkGuess);
inputField.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

console.log(currentWord);
