import { test } from '@playwright/test';
import { Homepage } from '../page-object/homepage/Homepage';
import { Book } from '../entities/Books/Book';
import { BookDetailsPage } from '../page-object/homepage/BookDetailsPage';
import { BookDetails } from '../entities/Books/BookDetails';

test('Validation of book details for 1984', async ({ page }) => {
    let homepage = new Homepage(page);
    let bookDetailsPage = new BookDetailsPage(page);
    let bookdetails = new BookDetails('9789722071550','DOM QUIXOTE',2021,'235 x 157 x 23 mm',344)
    await homepage.goToPage();
    let book = new Book('1984','GEORGE ORWELL','12,50','',bookdetails);
    await homepage.searchForBookByAuthor(book);
    await homepage.openBookDetailsPageByBook(book);
    await bookDetailsPage.validateDetails(book.details);
});
