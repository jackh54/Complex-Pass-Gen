function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomCharacters(length, characterSet) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += getRandomElement(characterSet);
    }
    return result;
}

function isStrongPassword(password) {
    const lengthCriteria = password.length >= 12;
    const numberCriteria = /[0-9]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return lengthCriteria && numberCriteria && uppercaseCriteria && lowercaseCriteria && symbolCriteria;
}

const calculatePasswordStrength = (password) => {
    let score = 0;
    
    // Basic checks
    if (password.length >= 12) score += 2;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return {
        score,
        label: getStrengthLabel(score),
        color: getStrengthColor(score)
    };
};

const getStrengthLabel = (score) => {
    if (score >= 5) return 'Strong';
    if (score >= 3) return 'Medium';
    return 'Basic';
};

const getStrengthColor = (score) => {
    if (score >= 5) return '#15803d';
    if (score >= 3) return '#eab308';
    return '#ef4444';
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculatePasswordStrength };
} else {
    window.calculatePasswordStrength = calculatePasswordStrength;
}

export { generateRandomCharacters, isStrongPassword, calculatePasswordStrength };