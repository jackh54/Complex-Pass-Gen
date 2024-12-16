import { generatePassword } from '../scripts/generator.js';

describe('Password Generator', () => {
    test('should generate a password of specified length', () => {
        const password = generatePassword(12);
        expect(password.length).toBe(12);
    });

    test('should include at least one uppercase letter', () => {
        const password = generatePassword(12, { includeUppercase: true });
        expect(password).toMatch(/[A-Z]/);
    });

    test('should include at least one lowercase letter', () => {
        const password = generatePassword(12, { includeLowercase: true });
        expect(password).toMatch(/[a-z]/);
    });

    test('should include at least one number', () => {
        const password = generatePassword(12, { includeNumbers: true });
        expect(password).toMatch(/[0-9]/);
    });

    test('should include at least one special character', () => {
        const password = generatePassword(12, { includeSymbols: true });
        expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
    });

    test('should throw an error for invalid length', () => {
        expect(() => generatePassword(5)).toThrow('Password length must be between 8 and 128 characters');
    });
});