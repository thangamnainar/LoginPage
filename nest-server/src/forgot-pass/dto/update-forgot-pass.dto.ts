import { PartialType } from '@nestjs/mapped-types';
import { CreateForgotPassDto } from './create-forgot-pass.dto';

export class UpdateForgotPassDto extends PartialType(CreateForgotPassDto) {}
