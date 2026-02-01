const DOG_URL = "https://dog.ceo/api/breeds/image/random";

// function addNewDoggo() {
//   const promise = fetch(DOG_URL);

//   promise
//     .then(function (response) {
//       const processingPromise = response.text();

//       return processingPromise;
//     })
//     .then(function (processedResponse) {
//       const dogObject = JSON.parse(processedResponse);

//       console.log(dogObject);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

function addNewDoggo() {
  const promise = fetch(DOG_URL);

  promise
    .then(function (response) {
      const processingPromise = response.json(); // json instead of text

      return processingPromise;
    })
    .then(function (processedResponse) {
      // we get to skip thos line since it'll already be an object
      // const dogObject = JSON.parse(processedResponse);

      console.log(processedResponse);
    })
    .catch(function (error) {
      console.log(error);
    });
}

addNewDoggo();
