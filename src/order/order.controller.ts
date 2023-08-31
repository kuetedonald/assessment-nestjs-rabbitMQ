import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({type: OrderEntity})
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('users/:userId')
  findAllOrderByuser(
    @Param('userId') userId: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400, optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ errorHttpStatusCode: 400, optional: true })) perPage?: number) {

      if (!page || isNaN(page)) {
        page = 1;
      }
  
      if (!perPage || isNaN(perPage)) {
        perPage = 10;
      }

      return this.orderService.findOrderByUser(userId, page, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Patch('/cancel/:order_id')
  cancelOrder(@Param('order_id') order_id: number) {
    return this.orderService.cancelOrder(+order_id);
  }
}
