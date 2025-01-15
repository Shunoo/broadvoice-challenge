import { BookDetails } from "./BookDetails";

export  class Book{
    readonly title : string;
    readonly author: string;
    readonly price: string;
    readonly sinopse: string;
    readonly details: BookDetails | null;
    
    constructor (title : string, author: string, price: string, sinopse: string, details: BookDetails | null = null){
        this.title = title;
        this.author = author;
        this.price = price;
        this.sinopse = sinopse;
        this.details = details;
    }
}