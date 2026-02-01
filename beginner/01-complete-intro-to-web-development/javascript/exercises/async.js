const DOG_URL = "https://dog.ceo/api/breeds/image/random";

async function addNewDoggo() {
  const promise = await fetch(DOG_URL);

  const processedResponse = await promise.json();

  console.log(processedResponse);
}

// addNewDoggo();

async function getName() {
  return "Mathews";
}

async function getLotOfNames() {
  const names = await Promise.all([
    getName("João"),
    getName("José"),
    getName("Maria"),
    getName("Ana"),
    getName("Foo"),
    getName("Bar"),
  ]);

  console.log(names);
}

console.log("a promise", getName());

getLotOfNames();

getName().then(function (name) {
  console.log("the actual name", name);
});
