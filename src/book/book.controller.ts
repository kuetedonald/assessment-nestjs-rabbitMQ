import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';
import { Book, Prisma } from '@prisma/client';

@Controller('book')
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiResponse({type: BookEntity})
  create(@Body() createBookDto: Prisma.BookCreateInput) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  @ApiOkResponse({type: BookEntity, isArray: true}) 
  findAll(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400, optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ errorHttpStatusCode: 400, optional: true })) perPage?: number) {

      if (!page || isNaN(page)) {
        page = 1;
      }
  
      if (!perPage || isNaN(perPage)) {
        perPage = 10;
      }

      return this.bookService.findAll(page, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: Prisma.BookUpdateInput) {
    return this.bookService.updateBook(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.deleteBook(+id);
  }
}
