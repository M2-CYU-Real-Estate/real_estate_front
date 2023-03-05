/**
 * Contains various functions in order to work with strings
 */

export function convertToCurrency(value?: number): string {
    if (!value) {
        return 'Prix non défini';
    }
    return value.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });
}

export function convertToArea(value?: number): string | undefined {
    if (!value) {
        return undefined;
    }
    return `${Math.round(value)} m²`;
}
