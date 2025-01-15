import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { Book } from "../entities/Books/Book";
import exp from "constants";

export class Shoppingcart{
    readonly page : Page;
    readonly checkoutbtn: Locator;
    readonly bookquantity : Locator; 
    readonly bookItem : Locator; 
    readonly totalAmount : Locator; 
    readonly continueBtn: Locator;

    constructor(page : Page){
        this.page = page;
        this.bookquantity = page.locator('.quantity_form input');
        this.bookItem = page.locator('.checkOut-product-list .row');
        this.totalAmount = page.locator('.checkoutPayment-total-amount');
        this.checkoutbtn = page.locator('.checkout-btn');
    } 

    // validate book details in the shopping cart
    async validateBookCheckoutList(bookList: Array<Book>){
        for(let i=0;i<bookList.length;i++){
            let book = bookList[i];
            await expect(this.bookItem.locator('.book-title').nth(i)).toContainText(book.title); // tittle
            await expect(this.bookItem.locator('author-title').nth(i)).toContainText(book.author); // author
            await expect(this.bookItem.locator('.preco-price').nth(i)).toContainText(book.price); // price
        }
    }

    // change the book quantity 
    async changeBookQuantity(quantity: number,index :number){
        await this.bookquantity.nth(index).clear(); // clear the book quantity
        await this.bookquantity.nth(index).fill(quantity.toString()); // change the book quantity
        await this.bookquantity.nth(index).press('Enter'); // confirmation of change input value
        expect(await this.bookquantity.nth(index).getAttribute('value')).toBe(quantity.toString()) // validate book quantity has been changed
    }

    // remove book from the cart
    async removeBookFromCart(index: number){
        // get the number of books added to the cart
        let numberOfProducts = (await this.page.locator('.product-details-content').all()).length;
        // remove book
        await this.page.locator('.product-edit .remove-product').nth(index).click();
        await this.page.waitForTimeout(500); // static wait cause waiting for api calls don't work. page needs to refresh, php things.
        //validate that the book has been removed
        let booksleft = await this.page.locator('.product-details-content').all()
        await expect(booksleft.length).toBeLessThan(numberOfProducts);
    }

    // access to shopping cart page
    async gotoPage(){
        // click on the shopping cart icon on nav bar
        await this.page.locator('.add-to-cart').click();
        // click on the checkout button
        await this.page.locator('.checkout-btn').click();
        // validate page has changed
        expect(this.page.locator('.h0')).toContainText('Checkout');   
    }

    //validate total amount
    async validateTotalAmount(totalAmount : number){
       await expect(this.totalAmount.last()).toContainText(totalAmount.toString().replace('.',','))
    }
}