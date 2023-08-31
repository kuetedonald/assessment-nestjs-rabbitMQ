import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class OrderEntity implements Prisma.OrderCreateInput {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    orderDate: Date;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    books: Prisma.BookCreateNestedManyWithoutOrdersInput;

    @ApiProperty()
    user: Prisma.UserCreateNestedOneWithoutOrdersInput;
}