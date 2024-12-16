const generatePassword = (length, options = {}) => {
    const {
        includeUppercase = true,
        includeLowercase = true,
        includeNumbers = true,
        includeSymbols = true,
        excludeSimilarCharacters = false
    } = options;

    if (length < 8 || length > 128) {
        throw new Error('Password length must be between 8 and 128 characters');
    }

    // Enhanced character sets
    const charSets = {
        uppercase: excludeSimilarCharacters ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: excludeSimilarCharacters ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz',
        numbers: excludeSimilarCharacters ? '23456789' : '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let availableChars = '';
    let requiredChars = '';

    // Build character sets and ensure minimum requirements
    if (includeUppercase) {
        availableChars += charSets.uppercase;
        requiredChars += charSets.uppercase[Math.floor(Math.random() * charSets.uppercase.length)];
    }
    if (includeLowercase) {
        availableChars += charSets.lowercase;
        requiredChars += charSets.lowercase[Math.floor(Math.random() * charSets.lowercase.length)];
    }
    if (includeNumbers) {
        availableChars += charSets.numbers;
        requiredChars += charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)];
    }
    if (includeSymbols) {
        availableChars += charSets.symbols;
        requiredChars += charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)];
    }

    if (!availableChars) {
        throw new Error('At least one character type must be selected');
    }

    let password = requiredChars;
    const remainingLength = length - requiredChars.length;
    const array = new Uint32Array(remainingLength);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < remainingLength; i++) {
        password += availableChars[Math.floor(array[i] / (0xffffffff + 1) * availableChars.length)];
    }

    const passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
};

export { generatePassword };