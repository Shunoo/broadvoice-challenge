import { test, expect } from '@playwright/test';
import { Homepage } from '../page-object/homepage/Homepage';
import { Book } from '../entities/Books/Book';
import { BookDetailsPage } from '../page-object/homepage/BookDetailsPage';

test('Validation of more books from author GEORGE ORWELL', async ({ page }) => {
    let homepage = new Homepage(page);
    let bookDetailsPage = new BookDetailsPage(page);
    await homepage.goToPage();
    let book = new Book('1984','GEORGE ORWELL','12,50','',null);
    let moreBooks = new Array<Book>();
    
    moreBooks.push(new Book('O Triunfo dos Porcos','GEORGE ORWELL','9,90','',null));
    moreBooks.push(new Book('George Orwell - Ensaios - eBook','GEORGE ORWELL','20,99','',null))
    await homepage.searchForBookByAuthor(book);
    await homepage.openBookDetailsPageByBook(book);
    await bookDetailsPage.validateMoreBooks(moreBooks);
});
