import {
  addScores,
  getScores,
} from '../src/Conf/leaderAPI';

describe('getScores', () => {
  test('it does not return null', () => expect(getScores()).resolves.not.toBeNull());
  test('it returns an object', () => expect(getScores()).resolves.toBeInstanceOf(Object));
  test('it returns an object with a result', () => expect(getScores()).resolves.toHaveProperty('result'));
  test('it returns an object with a result that is not an empty array', () => expect(getScores()).resolves.not.toHaveProperty('result', []));
});

describe('addScores', () => {
  test('it does not return null', () => expect(addScores()).resolves.not.toBeNull());
  test('it returns an object', () => expect(addScores()).resolves.toBeInstanceOf(Object));
  test("it doesn't add score without valid score", () => expect(addScores('TestUser')).resolves.toHaveProperty('message', 'You need to provide a valid score for the leaderboard'));
  test("it doesn't add score without valid score", () => expect(addScores('', 10)).resolves.toHaveProperty('message', 'You need to provide a valid user for the score'));
  test("it doesn't add score without valid score", () => expect(addScores('TestUser', 10)).resolves.toHaveProperty('result', 'Leaderboard score created correctly.'));
});
