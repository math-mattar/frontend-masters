const ANSWER_LENGTH = 5;
const ROUNDS = 6;

const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

async function init() {
  let currentRow = 0;
  let currentGuess = "";
  let done = false;
  let isLoading = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day");

  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  const wordParts = word.split("");

  isLoading = false;
  setLoading(isLoading);

  const addLetter = (letter) => {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      current = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText =
      letter;
  };

  const commit = async () => {
    if (currentGuess.length !== ANSWER_LENGTH) {
      return;
    }

    isLoading = true;
    setLoading(isLoading);

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const { validWord } = await res.json();

    isLoading = false;
    setLoading(isLoading);

    if (!validWord) {
      markInvalidWord();
      return;
    }

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
    let allRight = true;

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
      } else if (map[guessParts[i]] && map[guessParts[i]] > 0) {
        allRight = false;

        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        allRight = false;

        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    currentRow++;
    currentGuess = "";

    if (allRight) {
      alert("you win");

      document.querySelector(".brand").classList.add("winner");
      done = true;
    } else if (currentRow === ROUNDS) {
      alert(`you lose, the word was ${word}`);

      done = true;
    }
  };

  const backspace = () => {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = "";
  };

  const markInvalidWord = () => {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

      setTimeout(
        () => letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid"),
        10,
      );
    }
  };

  document.addEventListener("keydown", (e) => {
    if (done || isLoading) {
      return;
    }

    const action = e.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
    }
  });
}

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

const setLoading = (isLoading) => {
  loadingDiv.classList.toggle("hidden", !isLoading);
};

const makeMap = (array) => {
  const obj = {};

  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }

  return obj;
};

init();
