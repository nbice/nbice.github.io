const WORD_LIST = [
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
    "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE",
    "ALONG", "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA",
    "ARGUE", "ARISE", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWARD", "AWARE"
];

class WordGame {
    constructor() {
        this.maxAttempts = 6;
        this.attempts = 0;
        this.gameOver = false;
        this.words = WORD_LIST;
        this.guessInput = document.getElementById('guess');
        if (!this.guessInput) {
            console.error('Could not find guess input element');
            return;
        }
        this.targetWord = this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
        console.log('Game initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        this.guessInput.addEventListener('keypress', (e) => {
            console.log('Key pressed:', e.key);
            if (e.key === 'Enter') {
                console.log('Enter pressed, making guess');
                this.makeGuess(this.guessInput.value.toLowerCase());
                this.guessInput.value = '';
            }
        });
    }

    makeGuess(guess) {
        if (this.gameOver) {
            this.displayMessage('Game is over! Refresh to play again.');
            return;
        }

        if (guess.length !== 5) {
            this.displayMessage('Please enter a 5-letter word');
            return;
        }

        if (!this.words.includes(guess.toUpperCase())) {
            this.displayMessage('Not a valid word');
            return;
        }

        this.attempts++;
        const result = this.checkGuess(guess);
        this.displayResult(guess, result);

        if (guess === this.targetWord) {
            this.gameOver = true;
            this.displayMessage(`Congratulations! You won in ${this.attempts} attempts!`);
            return;
        }

        if (this.attempts >= this.maxAttempts) {
            this.gameOver = true;
            this.displayMessage(`Game Over! The word was: ${this.targetWord}`);
        }
    }

    checkGuess(guess) {
        const result = new Array(5).fill('wrong');
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');

        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                targetLetters[i] = null;
                guessLetters[i] = null;
            }
        }

        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === null) continue;
            
            const targetIndex = targetLetters.indexOf(guessLetters[i]);
            if (targetIndex !== -1) {
                result[i] = 'misplaced';
                targetLetters[targetIndex] = null;
            }
        }

        return result;
    }

    displayResult(guess, result) {
        const guessDisplay = document.createElement('div');
        guessDisplay.className = 'guess-result';

        guess.split('').forEach((letter, index) => {
            const letterBox = document.createElement('span');
            letterBox.textContent = letter.toUpperCase();
            letterBox.className = `letter ${result[index]}`;
            guessDisplay.appendChild(letterBox);
        });

        document.getElementById('results').appendChild(guessDisplay);
    }

    displayMessage(message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
    }
}

// Initialize the game when the module loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new WordGame();
}); 