const format_turkish_phone_number = () => {
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

    let match;

    if (
        (match = number.match(internationalFormat)) ||
        (match = number.match(nationalFormat)) ||
        (match = number.match(localParensFormat)) ||
        (match = number.match(localSpaceFormat)) ||
        (match = number.match(localNoSpaceFormat))
    ) {
        return `(5${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }

    return null; // Geçersiz format
}

export default format_turkish_phone_number