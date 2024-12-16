import { generatePassword } from './generator.js';
import { calculatePasswordStrength } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const passwordDisplay = document.getElementById('passwordDisplay');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const copyButton = document.getElementById('copyButton');
    const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

    generateBtn.addEventListener('click', () => {
        const length = parseInt(document.getElementById('length').value);
        const options = {
            includeUppercase: document.getElementById('uppercase').checked,
            includeLowercase: document.getElementById('lowercase').checked,
            includeNumbers: document.getElementById('numbers').checked,
            includeSymbols: document.getElementById('symbols').checked
        };

        try {
            const password = generatePassword(length, options);
            const strength = calculatePasswordStrength(password);
            
            passwordDisplay.textContent = password;
            strengthMeter.style.width = `${(strength.score / 6) * 100}%`;
            strengthMeter.style.backgroundColor = strength.color;
            strengthText.textContent = strength.label;
        } catch (error) {
            passwordDisplay.textContent = 'Please select at least one option';
        }
    });

    copyButton.addEventListener('click', () => {
        if (passwordDisplay.textContent) {
            navigator.clipboard.writeText(passwordDisplay.textContent)
                .then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                });
        }
    });

    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});