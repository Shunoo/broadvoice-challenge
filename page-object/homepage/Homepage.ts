import { Locator, Page } from "playwright";
import { Book } from "../../entities/Books/Book";
import { expect } from "playwright/test";

export class Homepage{
    readonly page : Page;
    readonly searchbar: Locator;
    readonly cart: Locator;
    readonly darkMode: Locator;

    constructor(page :Page){
        this.page = page;
        this.searchbar= page.locator('#searchbar-large');
        this.darkMode = page.locator('#darkmode');
        this.cart = page.locator('.add-to-cart');
   
    }

    async goToPage(){
        await this.page.goto('https://www.leyaonline.com/pt/');
    }

    async searchForBookByTitle(book :Book){
        await this.searchbar.click();
        await this.searchbar.fill(book.title);
        await expect(this.page.locator('.single-search-book-item').locator('.book-name').filter({hasText:book.title})).toContainText(book.title);  
    }

    
    async searchForBookByAuthor(book :Book){
        await this.searchbar.click();
        await this.searchbar.fill(book.author);
        await expect(this.page.locator('.single-search-book-item').locator('.book-name').filter({hasText:book.title})).toContainText(book.title);  
    }

    async searchBook(text : string){
        await this.searchbar.click();
        await this.searchbar.fill(text);
    }   

    async openBookDetailsPageByBook(book: Book){
        await this.page.locator('.single-search-book-item').filter({hasText:book.title}).click();
    }

    async openBookDetailsPageByText(text: string){
        await this.page.locator('.single-search-book-item').nth(2).filter({hasText:text}).click();
    }

    async activateDarkMode(){
        let darkmodeOn = await this.darkMode.locator('i').getAttribute('class');
        if(!darkmodeOn?.includes('icon-moon')){
            await this.darkMode.click();
            await expect(await this.darkMode.locator('i').getAttribute('class')).toContain('moon');
        }
    }

    async activateLightMode(){
        let lightMode = await this.darkMode.locator('i').getAttribute('class');
        if(!lightMode?.includes('icon-sun')){
            await this.darkMode.click();
            await expect(await this.darkMode.locator('i').getAttribute('class')).toContain('sun');
        }
    }
}