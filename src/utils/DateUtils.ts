/**
 * Various functions for working with dates
 */

const frenchMonthsByNumber = new Map([
    [1, 'Janvier'],
    [2, 'Février'],
    [3, 'Mars'],
    [4, 'Avril'],
    [5, 'Mai'],
    [6, 'Juin'],
    [7, 'Juillet'],
    [8, 'Août'],
    [9, 'Septembre'],
    [10, 'Octobre'],
    [11, 'Novembre'],
    [12, 'Décembre'],
]);

/**
 * Convert a timestamp to a french date string.
 *
 * Example '2023-03-05T18:25:43.511Z' => '5 Mars 2023'
 */
export function toFrenchDate(date: Date): string {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // normally in range [0-11]
    const year = date.getUTCFullYear();

    const frenchMonth = frenchMonthsByNumber.get(month);

    return `${day} ${frenchMonth || 'X'} ${year}`;
}
