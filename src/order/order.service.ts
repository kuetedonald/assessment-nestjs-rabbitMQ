import { BadRequestException, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const books = await this.prisma.book.findMany({
      where: {
        id: {
          in: createOrderDto.bookIds,
        },
      },
    });

    const { userId } = createOrderDto

    const totalPoints = books.reduce((acc, book) => acc + book.point, 0);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.points < totalPoints) {
      throw new BadRequestException('Insufficient points');
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        books: {
          connect: books.map((book) => ({ id: book.id })),
        },
      },
    });

    // Décrémentez les points de l'utilisateur
    await this.prisma.user.update({
      where: { id: userId },
      data: { points: user.points - totalPoints },
    });

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({include: {books: true, user: true}});
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({where: {id} });
  }

  findOrderByUser(userId: number, page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    return this.prisma.order.findMany({
      include: {books: true},
      where: {userId: Number(userId)}, 
      skip,
      take: perPage});
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  cancelOrder(id: number) {
    return this.prisma.order.update({where: {id}, data: {status: OrderStatus.cancelled}})
  }
}
