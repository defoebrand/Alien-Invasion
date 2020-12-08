import lowerFirst from '../src/Helpers/stringMan';

describe('lowerFirst', () => {
  test('it lowercases the first letter of a string', () => {
    expect(lowerFirst('HELLO')).toEqual('hELLO');
  });
  test('it does not lowercases the entire string', () => {
    expect(lowerFirst('HELLO')).not.toEqual('hello');
  });
});
