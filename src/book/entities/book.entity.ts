import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Tag } from '@prisma/client';

export class BookEntity implements Prisma.BookCreateInput {
    
    @ApiProperty()
    id?: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    writer: string;

    @ApiProperty()
    coverImage: string;

    @ApiProperty()
    point: number;

    @ApiProperty()
    tags: Tag[];

    @ApiProperty()
    orders?: Prisma.OrderCreateNestedManyWithoutBooksInput;
}

