const mask = (res = '', regex) => {
  if (res.replace(/\D+/gim, '').length == 0) return '';
  if (res.replace(/\D+/gim, '').length > regex.replace(/\D+/gim, '').length)
    return res.slice(0, regex.replace(/\[|\]/gim, '').length);
  let regexNumber = regex.match(/\d+/gim, ''), //sadece sayılar
    totalLen = res.match(/\d+/gim, '').join('').length, //gelen değerin uzunluğu
    number = res.match(/\d+/gim, '').join('') + new Array(regexNumber.join('').length - totalLen).fill('_').join(''),
    len = 0,
    rlen = 0;
  let match = regex.replace(/\[\d+\]/gim, (m, k) => m.replace(/\[\d+\]/gim, '$' + rlen++));
  regexNumber.map((i, k) => {
    match = match.replace('$' + k, number.slice(len, len + i.length));
    len = len + i.length;
  });
  return match.replace(/[\D]+$/gim, '');
};
export default mask