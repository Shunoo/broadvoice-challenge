import { test, expect } from '@playwright/test';
import { Homepage } from '../page-object/homepage/Homepage';
import { BookDetailsPage } from '../page-object/homepage/BookDetailsPage';
import { Shoppingcart } from '../page-object/ShoppingCart';
import { Book } from '../entities/Books/Book';

test('Validate total amount of 2 books', async ({ page }) => {
    let homepage = new Homepage(page);
       let bookDetailsPage = new BookDetailsPage(page);
       await homepage.goToPage();
       let book = new Book('1984','GEORGE ORWELL','12,50','',null);
       let book2 = new Book('O Triunfo dos Porcos','GEORGE ORWELL','9,90','Quinta Manor',null);
       let cartPage = new Shoppingcart(page);
    
       await homepage.searchForBookByAuthor(book);
       await homepage.openBookDetailsPageByBook(book);
       await bookDetailsPage.buyBook();
       await homepage.searchForBookByAuthor(book2);
       await homepage.openBookDetailsPageByBook(book2);
       await bookDetailsPage.buyBook();
       await cartPage.gotoPage();
       await cartPage.validateTotalAmount(22.4)
});
