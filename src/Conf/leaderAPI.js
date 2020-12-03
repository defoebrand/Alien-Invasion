const createGame = async (input) => {
  try {
    const createGameID = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
      mode: 'cors',
      method: 'post',
      body: JSON.stringify({
        name: input,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const createSuccess = await createGameID.json();
  } catch (err) {
    return err;
  }
};

const addScores = async (name, score) => {
  const id = 'cji9jX3Fu759G2dMkPZ4';
  try {
    const addScore = fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`, {
      mode: 'cors',
      method: 'post',
      body: JSON.stringify({
        user: name,
        score: score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const scoreSuccess = await addScore.json();
    return scoreSuccess
  } catch (err) {
    return err;
  }
};

const getScores = async () => {
  const id = 'cji9jX3Fu759G2dMkPZ4';
  try {
    const allScores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`, {
      mode: 'cors',
    });
    const scoresJson = await allScores.json();
    return scoresJson;
  } catch (err) {
    return err;
  }
};

export {
  createGame,
  addScores,
  getScores,
};
