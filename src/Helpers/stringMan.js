const lowerFirst = (string) => {
  string = string.charAt(0).toLowerCase() + string.slice(1);

  return string;
};

export default lowerFirst;
