/**
 * Contains various functions in order to work with strings
 */

export function convertToCurrency(
    value?: number,
    doRounding: boolean = false
): string {
    if (value == null) {
        return 'Prix non défini';
    }
    const locale = 'fr-FR';
    const baseParams = {
        style: 'currency',
        currency: 'EUR',
    };

    if (doRounding) {
        return value.toLocaleString(locale, {
            ...baseParams,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    }

    return value.toLocaleString(locale, baseParams);
}

export function convertToArea(value?: number): string | undefined {
    if (value == null) {
        return undefined;
    }
    return `${Math.round(value)} m²`;
}

export function splitThousands(value: number): string {
    // If it is an integer
    if (value % 1 === 0) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    // We have a float number
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}
