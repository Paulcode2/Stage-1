const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

// colors
const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080"
];

// Generate a random color 
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Starting the game
function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;


  colorOptions.innerHTML = '';

  // Create 6 color buttons
  const options = [targetColor];
  while (options.length < 6) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }


  options.sort(() => Math.random() - 0.5);

  options.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => handleGuess(color));
    colorOptions.appendChild(button);
  });

  // Reset game status
  gameStatus.textContent = "Make your guess!";
  gameStatus.classList.remove('correct', 'wrong');
}

// Handle user guess
function handleGuess(guess) {
  if (guess === targetColor) {
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.classList.add('correct');
    score++;
    scoreElement.textContent = score;
    setTimeout(() => {
      initGame();
    }, 1000); 
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    gameStatus.classList.add('wrong');
    setTimeout(() => {
      gameStatus.classList.remove('wrong');
    }, 500); 
  }
}

// Reset the game
newGameButton.addEventListener('click', () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

// Start the game
initGame();