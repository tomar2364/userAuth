/* eslint-disable prettier/prettier */
import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetUserFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The search Keyword',
        default: '',
      })
    search: string;
}