export class BookDetails{
    readonly isbn: string;
    readonly publisher: string;
    readonly releaseyear: number;
    readonly dimensions: string;
    readonly numberOfPages: number;

    constructor(isbn: string, publisher: string, releaseyear: number, dimensions: string, numberOfPages: number){
        this.isbn =isbn;
        this.publisher = publisher;
        this.releaseyear = releaseyear;
        this.dimensions = dimensions;
        this.numberOfPages = numberOfPages
    }
}