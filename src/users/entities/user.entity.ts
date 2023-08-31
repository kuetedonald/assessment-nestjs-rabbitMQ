import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UserEntity implements Prisma.UserCreateInput {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    points: number;

    @ApiProperty()
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
}