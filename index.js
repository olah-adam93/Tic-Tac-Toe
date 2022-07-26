// selecting all required elements

const selectBox = document.querySelector('.select-box'),
  selectBtnX = selectBox.querySelector('.options .playerX'),
  selectBtnO = selectBox.querySelector('.options .playerO'),
  playBoard = document.querySelector('.play-board'),
  players = document.querySelector('.players'),
  allBox = document.querySelectorAll('section span'),
  resultBox = document.querySelector('.result-box'),
  wonText = resultBox.querySelector('.won-text'),
  replayBtn = resultBox.querySelector('button');

window.onload = () => {
  allBox.forEach((i) => {
    i.setAttribute('onclick', 'clickedBox(this)');
  });
};

selectBtnX.onclick = () => {
  selectBox.classList.add('hide');
  playBoard.classList.add('show'); //show the playboard section on playerX button clicked
};
selectBtnO.onclick = () => {
  selectBox.classList.add('hide');
  playBoard.classList.add('show'); //show the playboard section on playerO button clicked
  players.setAttribute('class', 'players active player');
};

let playerXIcon = 'fas fa-times', //class name of fontawesome cross icon
  playerOIcon = 'far fa-circle', //class name of fontawesome circle icon
  playerSign = 'X', //suppose player will be X
  runBot = true;

//user click function

function clickedBox(element) {
  if (players.classList.contains('player')) {
    playerSign = 'O'; //if player will be O then we'll change the sign
    element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
    players.classList.remove('active');
    element.setAttribute('id', playerSign);
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
    element.setAttribute('id', playerSign);
    players.classList.add('active');
  }
  selectWinner();
  element.style.pointerEvents = 'none'; //once user select any box then that box can't be selected again
  playBoard.style.pointerEvents = 'none';
  let randomTimeDelay = (Math.random() * 1000 + 350).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomTimeDelay); //passing random delay time
}

//bot click function

function bot(runBot) {
  let array = []; //empty array... I'll store unselected box index in this array
  if (runBot) {
    playerSign = 'O';
    allBox.forEach((element, index) => {
      if (element.childElementCount == 0) {
        //if span has no any child element
        array.push(index); //inserting unclicked or unselected boxes inside array means that span has no children
        console.log(index + '' + 'has no children');
      }
    });
    console.log(array);
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
    console.log(randomBox);

    if (array.length > 0) {
      if (players.classList.contains('player')) {
        playerSign = 'X';
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        allBox[randomBox].setAttribute('id', playerSign);
        players.classList.add('active');
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.remove('active');
        allBox[randomBox].setAttribute('id', playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = 'none'; //once bot select any box then user can't select or click on that box
    playBoard.style.pointerEvents = 'auto';
    playerSign = 'X';
  }
}

//select the winner

function getId(idname) {
  return document.querySelector('.box' + idname).id; //returning id name
}

function checkThreeIds(val1, val2, val3, sign) {
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

//if one combination of them matched then select the winner

function selectWinner() {
  if (
    checkThreeIds(1, 2, 3, playerSign) ||
    checkThreeIds(4, 5, 6, playerSign) ||
    checkThreeIds(7, 8, 9, playerSign) ||
    checkThreeIds(1, 4, 7, playerSign) ||
    checkThreeIds(2, 5, 8, playerSign) ||
    checkThreeIds(3, 6, 9, playerSign) ||
    checkThreeIds(1, 5, 9, playerSign) ||
    checkThreeIds(3, 5, 7, playerSign)
  ) {
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      //we'll delay to show result box
      resultBox.classList.add('show');
      playBoard.classList.remove('show');
    }, 680); //680 ms delay

    wonText.innerHTML = `<p>Player ${playerSign} won the game!🥇</p>`;
  } else if (
    getId(1) != '' &&
    getId(2) != '' &&
    getId(3) != '' &&
    getId(4) != '' &&
    getId(5) != '' &&
    getId(6) != '' &&
    getId(7) != '' &&
    getId(8) != '' &&
    getId(9) != ''
  ) {
    //if match has drawn
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      //we'll delay to show result box
      resultBox.classList.add('show');
      playBoard.classList.remove('show');
    }, 680); //680 ms delay
    wonText.innerHTML = `<p>The game has been drawn!🎉</p>`;
  }
}

replayBtn.onclick = () => {
  window.location.reload(); //reload the current page
};
