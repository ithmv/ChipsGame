let userSum = 0;
let compSum = 0;




let win = document.querySelector('.win');
let lose = document.querySelector('.lose');
let nothing = document.querySelector('.nothing');
let compEnd = document.querySelector('.compEnd');




function endGame() {
  const spans = document.querySelectorAll('span');
  spans.forEach((spans) => {
    spans.style.display = 'block';
  });

  const scoreSpans = document.querySelectorAll('.user-score');
  scoreSpans.forEach((span) => {
    span.innerHTML = userSum;
  });

  const CompSpans = document.querySelectorAll('.comp-score');
  CompSpans.forEach((span) => {
    span.innerHTML = compSum;
  });
  

  if (userSum > compSum) {
    win.style.animation = 'winlose .3s ease-in-out forwards';
  } else if (compSum > userSum) {
    lose.style.animation = 'winlose .3s ease-in-out forwards';
  } else {
    nothing.style.animation = 'winlose .3s ease-in-out forwards';
  }
}




function updateCompSum() {
  const computerFishList = document.querySelectorAll('.computer div span');
  compSum = 0;
  let count4 = 0;
  let count5 = 0;
  computerFishList.forEach(fish => {
    const numbers = fish.textContent.split(' ');
    const fishNum = parseInt(numbers[numbers.length - 1]);
    compSum += fishNum;
    if (fishNum === 4) {
      count4++;
    }
    if (fishNum === 5) {
      count5++;
    }
  });

  if (count5 > 0) {
    compEnd.style.animation = 'compEnd .2s ease-in-out forwards';
    compEnd.style.display = 'block';
    endGame();
  }

  if (count4 > 1) {
    compEnd.style.animation = 'compEnd .2s ease-in-out forwards';
    compEnd.style.display = 'block';
    endGame();
  }
}




window.addEventListener('load', function() {
  const field = document.querySelector('.field');
  for (let i = field.children.length; i >= 0; i--) {
    field.append(field.children[Math.random() * i | 0]);
  }
  
  const fishColors = ['red', 'green', 'blue', 'purple'];
  const numbers = [];

  while (numbers.length < fishColors.length) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  fishColors.forEach((color, index) => {
    const fishes = document.querySelectorAll(`.field .fish_${color} span`);
    const numbers = [];
    
    while (numbers.length < fishes.length) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    
    fishes.forEach((fish, index) => {
      fish.textContent += ` ${numbers[index]}`;
    });
  });
  

  const fishList = document.querySelectorAll('.field div');
  const userField = document.querySelector('.user');
  const computerField = document.querySelector('.computer');
  const score = document.querySelector('.score');

  fishList.forEach(fish => {
    fish.addEventListener('click', () => {
      const clonedFish = fish.cloneNode(true);
      userField.append(clonedFish);
      fish.remove();

      const userFishList = document.querySelectorAll('.user div span');
      userSum = 0;
      userFishList.forEach(fish => {
        const numbers = fish.textContent.split(' ');
        userSum += parseInt(numbers[numbers.length - 1]);
      });
      score.textContent = userSum;

      const computerFishList = document.querySelectorAll('.computer div span');
      compSum = 0;
      computerFishList.forEach(fish => {
        const numbers = fish.textContent.split(' ');
        compSum += parseInt(numbers[numbers.length - 1]);
      });

      const computerFishListVisible = document.querySelectorAll('.field:not(.user) div:not(.hidden)');
      if (computerFishListVisible.length > 0) {
        const randomFish = computerFishListVisible[Math.floor(Math.random() * computerFishListVisible.length)];
        const clonedRandomFish = randomFish.cloneNode(true);
        computerField.append(clonedRandomFish);
        randomFish.classList.add('hidden');
        randomFish.remove();
        updateCompSum();
      }
    });
  });

  const stopButton = document.querySelector('.stop');
  stopButton.addEventListener('click', () => {
    endGame();
  });

  const restartButtons = document.querySelectorAll('.restart');
  restartButtons.forEach((restartButton) => {
    restartButton.addEventListener('click', () => {
      location.reload();
    });
  });
});