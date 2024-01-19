export function validatePhoneNumber(phoneNumber: string): boolean {
    return /^[1-9]{1}[0-9]{9}$/.test(phoneNumber)
}
export function validateName(name: string): boolean {
    if (!name) return false
    return (name.length > 3)
}
export function validatePopText(text: string): boolean {
    if (!text) return false
    return (text.length > 10 && text.length < 500)
}