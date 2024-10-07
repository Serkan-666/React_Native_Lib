const truncate_text = (text, maxLength = 150) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};
export default truncate_text;
