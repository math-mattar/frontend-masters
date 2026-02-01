const timesToRepeat = 10;
const character = "a";

// some loop that takes that character and repeats if that many times

let answer = "";

for (let i = 0; i < timesToRepeat; i++) {
  answer += character;
}

let i = 0;

while (i < timesToRepeat) {
  answer += character;
  i++;
}

console.log(answer);

console.log(character.repeat(timesToRepeat));

console.log("".padStart(timesToRepeat, character));
