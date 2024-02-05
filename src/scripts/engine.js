const state = {
	view: {
		squares: document.querySelectorAll(".square"),
		enemy: document.querySelector(".enemy"),
		timeLeft: document.querySelector("#time-left"),
		score: document.querySelector("#score"),
		life: document.querySelector("#life"),
	},
	values: {
		gameVelocity: 1000,
		hitPosition: 0,
		result: 0,
		curretTime: 60,
		gameOn_flag: true,
		vida: 3,
	},
	actions: {
		timerId: setInterval(randomSquare, 3000),
		countDownTimerId: setInterval(countDown, 1000),
	},
};

function countDown() {
	state.view.timeLeft.textContent = --state.values.curretTime;
	if (state.values.curretTime <= 0) {
		gameOver();
	}
}

function gameOver() {
	cleamSquare();
	state.values.gameOn_flag = false;
	clearInterval(state.actions.countDownTimerId);
	clearInterval(state.actions.timerId);
	alert("Game Over! O seu resultado foi: " + state.values.result);
}

function playSound(audioName) {
	let audio = new Audio(`./src/audios/${audioName}.m4a`);
	audio.volume = 0.2;
	audio.play();
}

function randomSquare() {
	cleamSquare();

	let randomNumber = Math.floor(Math.random() * 9);
	let randomSquare = state.view.squares[randomNumber];
	randomSquare.classList.add("enemy");
	state.values.hitPosition = randomSquare.id;
}

function cleamSquare() {
	state.view.squares.forEach((square) => {
		square.classList.remove("enemy");
	});
}

function addListenerHitBox() {
	state.view.squares.forEach((square) => {
		square.addEventListener("mousedown", () => {
			if (state.values.gameOn_flag) {
				if (square.id === state.values.hitPosition) {
					state.values.result++;
					state.view.score.textContent = state.values.result;
					state.values.hitPosition = null;
					randomSquare();
					playSound("hit");
				} else {
					let vida = --state.values.vida;
					state.view.life.textContent = "x" + vida;
					if (vida <= 0) {
						gameOver();
					}
				}
			}
		});
	});
}

function initialize() {
	addListenerHitBox();
	randomSquare();
}

initialize();
