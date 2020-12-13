import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'title', example: "Gym" })
    title: string;
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'decription', example: "Run 10km" })
    description: string;
}