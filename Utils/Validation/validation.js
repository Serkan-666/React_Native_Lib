function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return pattern.test(email);
}
function isValidPhoneNumber(phoneNumber) {
  const pattern = /^\(5\d{2}\) \d{3} \d{2} \d{2}$/;
  return pattern.test(phoneNumber);
}
function isValidTurkishPhoneNumber(number) {
  // Uluslararası format: +90 507 095 68 26 veya +90 507 095 6826 veya +90 507 095-6826
  const internationalFormat = /^\+90\s?5(\d{2})\s?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;

  // Milli format: 0507 095 68 26 veya 0507 095 6826 veya 0507 095-6826
  const nationalFormat = /^0?5(\d{2})\s?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;

  // Yerli format (Parantezli): (507) 095 68 26 veya (507) 095 6826 veya (507) 095-6826
  const localParensFormat = /^\(5(\d{2})\)\s?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;

  // Yerli format (Boşluklu): 507 095 68 26 veya 507 095 6826 veya 507 095-6826
  const localSpaceFormat = /^5(\d{2})\s?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;

  // Yerli format (Bitişik): 05070956826 veya 5070956826
  const localNoSpaceFormat = /^0?5(\d{2})(\d{3})(\d{2})(\d{2})$/;

  return (
    internationalFormat.test(number) ||
    nationalFormat.test(number) ||
    localParensFormat.test(number) ||
    localSpaceFormat.test(number) ||
    localNoSpaceFormat.test(number)
  );
}
export { isValidEmail, isValidPhoneNumber, isValidTurkishPhoneNumber };

// import {isValidEmail, isValidPhoneNumber } from "@/src/hooks/validation";
