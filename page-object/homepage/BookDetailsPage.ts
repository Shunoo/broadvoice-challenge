import { Locator, Page } from "playwright";
import { Book } from "../../entities/Books/Book";
import { expect } from "playwright/test";
import { BookDetails } from "../../entities/Books/BookDetails";

export class BookDetailsPage{
    readonly page: Page;
    readonly title: Locator;
    readonly buyBtn: Locator;
    readonly freeTryBtn: Locator;
    readonly sinopse: Locator;
    readonly details: Locator;
    readonly moreBooks: Locator;
    readonly bookImage: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator('.nome-livro').first();
        this.buyBtn = page.locator('.book .buy-button').first();
        this.freeTryBtn = page.locator('.choose-op-item .secundary');
        this.sinopse = page.locator('.sinopse .show-more');
        this.details = page.locator('._sinpose-address li');
        this.moreBooks = page.locator('.similar-books');
        this.bookImage = page.locator('.banner img').first();
    }

    async validateMoreBooks(booklist : Array<Book>){
        for(let i=0;i<booklist.length;i++){
            let book = booklist[i];
            await expect(this.moreBooks.locator('.single-book-details .book-author').nth(i)).toContainText(book.author);
            await expect(this.moreBooks.locator('.single-book-details .book-title').nth(i)).toContainText(book.title);
            await expect(this.moreBooks.locator('.single-book-price').nth(i).locator('h6')).toContainText(book.price);
        }
    }

    async validateSinopse(sinopse : string){
        await expect(this.sinopse).toContainText(sinopse);   
    }

    async validateDetails(details :BookDetails | null){
        if (details) {
            await expect(this.details.nth(0)).toContainText(details.isbn ?? ''); // if its null checks with empty string
            await expect(this.details.nth(2)).toContainText(details.publisher ?? ''); // if its null checks with empty string
            await expect(this.details.nth(3)).toContainText(details.releaseyear?.toString() ?? ''); // if its null checks with empty string
            await expect(this.details.nth(4)).toContainText(details.dimensions ?? ''); // if its null checks with empty string
            await expect(this.details.nth(5)).toContainText(details.numberOfPages?.toString() ?? ''); // if its null checks with empty string
        }
    }

    async buyBook(){
        await this.buyBtn.click();
        await expect(this.page.locator('.add-to-cart .icontag').getAttribute('data-tag')).not.toBe('0');
    }

    async backToHomePage(){
        await this.page.goto('https://www.leyaonline.com/pt/');
    }
    async validateBookImage(url : string){
        await expect(this.bookImage.getAttribute('href')).toBe(url);
    }
    
    async openBookDetailsPage(){
        this.page.locator('.single-search-book-item').nth(1).locator('.book-name').click();
    }

  
} 