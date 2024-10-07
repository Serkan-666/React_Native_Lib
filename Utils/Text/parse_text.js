import { Parser } from 'htmlparser2';

const parse_text = (htmlText) => {
  let parsedText = '';

  const parser = new Parser({
    ontext(text) {
      parsedText += text;
    },
  });

  parser.write(htmlText);
  parser.end();

  return parsedText;
};

export default parse_text;
