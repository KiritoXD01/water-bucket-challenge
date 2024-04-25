import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class SolveDto {
    @ApiProperty({
        description: 'The capacity of the first jug',
        example: 4,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    x_capacity: number;

    @ApiProperty({
        description: 'The capacity of the second jug',
        example: 3,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    y_capacity: number;

    @ApiProperty({
        description: 'The amount of water wanted in one of the jugs',
        example: 2,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    z_amount_wanted: number;
}
