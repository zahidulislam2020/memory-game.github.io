
var cards = document.querySelectorAll(".flip-card");
var timeDisplay = document.querySelector("#timeDisplay");
var overLay = document.querySelector(".winning-message");
var message = document.querySelector(".message");
var startBtn = document.querySelector("#start-btn");

var isFlipped = false;
var lockBoard = true;
var firstCard, secondCard, thisCard;

var stopTimer;
var timeCount = 1000;
var duration = timeDisplay.textContent;

startBtn.addEventListener('click', startGame);

function startGame() {
		if(startBtn.textContent == 'Play Again') {
			return window.location.reload();
		}
		stopTimer = setInterval(timer, timeCount);
		lockBoard = false;
}

duration = parseInt(duration);

function timer() {
	if(duration <= 0) {
		overLay.style.display = 'flex';
		message.classList.add('scale');
		startBtn.removeAttribute('disabled', '');
		startBtn.innerHTML = 'Play Again';
		clearInterval(stopTimer);
	}else {
		countDownTime = --duration;
		timeDisplay.innerHTML = makeMeTwoDigits(countDownTime);
		startBtn.setAttribute('disabled', '');
	}
}

function makeMeTwoDigits(n){
    return (n < 10 ? "0" : "") + n;
}

function cardsArray(card) {
	card.addEventListener('click', flipCard);
}

function flipCard(event) {
		if(lockBoard) return;
		if(this == firstCard) return;
		thisCard = event.currentTarget;
		thisCard.classList.add('flip');
   
	if(!isFlipped) {
		firstCard = thisCard;
		isFlipped = true;
		return;
		
	}else {
		secondCard = thisCard;
		checkIt();
		isFlipped = false;
	}	
}

function checkIt() {
		var matched = firstCard.dataset.type == secondCard.dataset.type;
		matched ? success() : fail();
}

var i = 0;

function success() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	++i;
	if(i === 8) {
		overLay.style.display = 'flex';
		message.classList.add('scale');
		startBtn.removeAttribute('disabled', '');
		startBtn.innerHTML = 'Play Again';
		message.innerHTML = 'You Win!!!';
		clearInterval(stopTimer);
	}
	reset();
}

function fail() {
	lockBoard = true;
	setTimeout(function (){
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		reset();
	}, 1000);
}

function reset() {
	[isFlipped, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function shuffle() {
	cards.forEach(function (card) {
		let orderIndex = Math.floor(Math.random() * 15) + 1
		card.style.order = orderIndex;
	});
}

shuffle();

cards.forEach(cardsArray);

//=====================================================










