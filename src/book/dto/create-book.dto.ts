import { Order } from "@prisma/client"

export class CreateBookDto {
    title: string
    writer: string
    coverImage: string
    point: number
    tags?: string[]
    orders?: Order[]
}
