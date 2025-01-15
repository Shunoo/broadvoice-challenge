import { test, expect } from '@playwright/test';
import { Homepage } from '../page-object/homepage/Homepage';
import { Book } from '../entities/Books/Book';
import { BookDetailsPage } from '../page-object/homepage/BookDetailsPage';

test('Validation of book details page for george', async ({ page }) => {
    let homepage = new Homepage(page);
    let bookDetailsPage = new BookDetailsPage(page);
    await homepage.goToPage();
    let georgeBook = new Book('O Triunfo dos Porcos','GEORGE ORWELL','9,90','Quinta Manor',null);
    await homepage.searchForBookByAuthor(georgeBook);
    await homepage.openBookDetailsPageByBook(georgeBook);
    await bookDetailsPage.validateSinopse(georgeBook.sinopse);
});
