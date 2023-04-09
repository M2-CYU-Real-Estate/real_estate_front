/**
 * Util functions for working with time, such as settings delays for example
 */

export function delay(timeMs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMs);
    });
}
