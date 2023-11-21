import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from './Office';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: OfficeService) {}

  @Get()
  getAllBooks(@Query('author') author: string): Array<Office> {
    if (author) {
      return this.bookService.getBooksOfCaracteristique(author);
    }
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() book: Office): Office {
    this.bookService.addBook(book);
    return this.bookService.getBook(book.isbn);
  }

  @Get(':isbn')
  getBook(@Param('isbn') isbn: string): Office {
    return this.bookService.getBook(isbn);
  }

  @Delete(':isbn')
  deleteBook(@Param('isbn') isbn: string): void {
    this.bookService.delete(isbn);
  }

  @Post('search')
  @HttpCode(200)
  searchBooks(@Body('term') term: string): Array<Office> {
    return this.bookService.search(term);
  }
}
