import { test, expect } from '@playwright/test';
import { Homepage } from '../page-object/homepage/Homepage';
import { BookDetailsPage } from '../page-object/homepage/BookDetailsPage';
import { Shoppingcart } from '../page-object/ShoppingCart';
import { Book } from '../entities/Books/Book';

test('Remove book from the shopping cart', async ({ page }) => {
    let homepage = new Homepage(page);
       let bookDetailsPage = new BookDetailsPage(page);
       await homepage.goToPage();
       let book = new Book('1984','GEORGE ORWELL','12,50','',null);
       let moreBooks = new Array<Book>();
       let cartPage = new Shoppingcart(page);
    
       await homepage.searchForBookByAuthor(book);
       await homepage.openBookDetailsPageByBook(book);
       await bookDetailsPage.buyBook();
       await cartPage.gotoPage();
       await cartPage.removeBookFromCart(0);
       await cartPage.validateTotalAmount(0)
});
