function pluralize(noun, count, suffix = 's') {
  return `${noun}${count !== 1 ? suffix : ''}`;
}

export default pluralize;
