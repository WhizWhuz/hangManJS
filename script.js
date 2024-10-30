// Array of Words
const words = [
    "tree", "book", "fish", "lion", "ship", "wolf", "star", "moon", "rock", "frog",
    "apple", "grape", "chair", "zebra", "ocean", "camel", "clock", "bread", "cloud", "piano",
    "jungle", "planet", "rocket", "guitar", "garden", "castle", "button", "school", "forest", "turtle",
    "candle", "monster", "teacher", "library", "diamond", "rainbow", "sunrise", "picture", "painter", "justice"
];

const theBody = document.getElementById('thebody')

const blurScreen = document.getElementById('blurscreen')

// SVG Parts Array - Define the order of hangman parts to appear
const svgParts = [
    document.getElementById('ground'),
    document.getElementById('scaffold'), // 1st wrong guess
    document.getElementById('head'),     // 2nd wrong guess
    document.getElementById('body'),     // 3rd wrong guess
    document.getElementById('arms'),     // 4th wrong guess
    document.getElementById('legs')      // 5th wrong guess
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

// Game Variables
const maxAttempts = svgParts.length;
let attempts = 0;
let guessedLetters = [];
let incorrectGuesses = [];
let currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

// Initialize Word Display for Correct Letters
function initializeDisplay() {
    guessedLettersDisplay.textContent = "_ ".repeat(currentWord.length).trim(); // Show underscores for each letter
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
        // Reveal the next part of the SVG hangman
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
        displayIncorrectGuess(guess); // Display incorrect guess in the next available slot
    }

    // Check for Win/Lose Conditions
    if (guessedLetters.length === new Set(currentWord).size) {
        alert("Congratulations! You've guessed the word!");
        theBody.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(100,237,125,1) 49%, rgba(165,237,100,1) 100%)";
        confetti.style.visibility = 'visible';
        setTimeout(() => confetti.style.visibility = 'hidden', 2500); // hide after 3 seconds
        blurScreen.style.visibility = 'visible';
        blurScreen.addEventListener('click', resetGame);

    } else if (attempts >= maxAttempts) {
        alert(`Game over! The word was: ${currentWord}`);
        theBody.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(219,100,237,1) 49%, rgba(237,100,100,1) 99%)";
            // Show "Play Again" button
    blurScreen.style.visibility = 'visible';
    playAgainButton.addEventListener('click', resetGame);
}

    }

// Listen for "Enter" key on the input field
inputField.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        checkGuess();  // Call the guess function when Enter is pressed
    }
});

// Reset Game Function 

function resetGame() {
    // Reset game variables
    attempts = 0;
    guessedLetters = [];
    incorrectGuesses = [];
    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    // Reset displays
    guessedLettersDisplay.textContent = "_ ".repeat(currentWord.length).trim();
    wordSlots.forEach(slot => slot.textContent = ""); // Clear incorrect guesses
    svgParts.forEach(part => part.style.visibility = "hidden"); // Hide hangman parts

    // Reset background color
    theBody.style.background = 'radial-gradient(circle, rgba(145,179,240,1) 6%, rgba(100,149,237,1) 49%, rgba(100,149,237,1) 99%)';

    // Hide "Play Again" button
    blurScreen.style.visibility = 'hidden';


    // Re-initialize word display
    initializeDisplay();
}


submitButton.addEventListener('click', checkGuess);


console.log(currentWord)