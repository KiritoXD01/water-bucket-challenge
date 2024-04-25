import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class SolveDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    x_capacity: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    y_capacity: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    z_amount_wanted: number;
}
