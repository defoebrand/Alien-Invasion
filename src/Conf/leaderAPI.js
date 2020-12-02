const createGame = (input) => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    mode: 'cors',
    method: 'post',
    body: JSON.stringify({
      name: input
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(function(response) {
    response.json().then((data) => {
      console.log(data)
    })
  }).catch(function(err) {
    // console.log(err)
  });
}

const addScores = (name, score) => {
  let id = 'cji9jX3Fu759G2dMkPZ4'
  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`, {
    mode: 'cors',
    method: 'post',
    body: JSON.stringify({
      user: name,
      score: score
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(function(response) {
    response.json().then((data) => {
      console.log(data)
    })
  }).catch(function(err) {
    // console.log(err)
  });
}

const getScores = async () => {
  let id = 'cji9jX3Fu759G2dMkPZ4'
  try {
    const allScores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`, {
      mode: 'cors',
    });

    const scoresJson = await allScores.json();
    return scoresJson;
  } catch (err) {
    // console.log(err);
  }
}

export {
  createGame,
  addScores,
  getScores
}