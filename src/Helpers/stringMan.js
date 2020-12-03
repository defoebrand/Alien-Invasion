export const capFirst = (string) => {
  string = string.charAt(0).toUpperCase() + string.slice(1);

  return string;
};

export const lowerFirst = (string) => {
  string = string.charAt(0).toLowerCase() + string.slice(1);

  return string;
};