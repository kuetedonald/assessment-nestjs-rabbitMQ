import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BookService {

  constructor(private prisma: PrismaService) {}

  async createBook(createBookDto: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data: createBookDto
    });
  }


  findAll(page: number, perPage: number): Promise<Book[]> {
    const skip = (page - 1) * perPage;
    return this.prisma.book.findMany({
      include: {orders: true},
      skip,
      take: perPage,});
  }

  async findOne(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async updateBook(id: number, updateBookDto: Prisma.BookUpdateInput): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async deleteBook(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }
}
