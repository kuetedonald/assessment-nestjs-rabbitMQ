import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    async login(loginUserDto: LoginUserDto): Promise<any> {
        // find user in db
        const user = await 
             this.usersService.findByLogin(loginUserDto);

        return user;
    }


}
