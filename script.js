let userSum = 0;
let compSum = 0;

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

  if (count5 > 1) {
    alert('Компьютер остановил игру!');
        if (userSum > compSum) {
      alert('Победа!');
    } else if (compSum > userSum) {
      alert('Проиграл!');
      alert('Счет противника: ' + compSum);
    } else {
      alert('Ничья!');
    }
    
    location.reload();
  }

  if (count4 > 2) {
    alert('Компьютер остановил игру!');
        if (userSum > compSum) {
      alert('Победа!');
    } else if (compSum > userSum) {
      alert('Проиграл!');
      alert('Счет противника: ' + compSum);
    } else {
      alert('Ничья!');
    }
    
    location.reload();
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
        updateCompSum(); // обновляем значение compSum после добавления новой фишки
      }
    });
  });

  const stopButton = document.querySelector('.stop');
  stopButton.addEventListener('click', () => {

    if (userSum > compSum) {
      alert('Победа!');
    } else if (compSum > userSum) {
      alert('Проиграл!');
      alert('Счет противника: ' + compSum);
    } else {
      alert('Ничья!');
    }
    
    location.reload();
  });
});
