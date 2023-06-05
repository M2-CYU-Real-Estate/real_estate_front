/**
 * Declare basic types and modules used by apis
 */

/**
 * A page response sent by the server, containing the wanted data 
 * and metadata on the current page fetched.
 */
interface PageResponse<T> {
    /**
     * The total number of elements that can be returned.
     */
    totalCount: number;
    /**
     * The number of elements in this page
     */
    size: number;
    /**
     * The index of the page, 0 based
     */
    pageNumber: Size;
    /**
     * The total number of pages
     */
    pageCount: number;
    /**
     * The content of the page
     */
    content: T[];
}
