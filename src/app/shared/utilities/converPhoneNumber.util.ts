export function convertPhoneNumber(phoneNumber: string): string {
    // Удаляем все символы, кроме цифр
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    return cleanedPhoneNumber;
}