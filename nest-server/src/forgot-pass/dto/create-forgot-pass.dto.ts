import { ApiProperty } from '@nestjs/swagger';
export class CreateForgotPassDto {

    @ApiProperty()
    email: string;
}
