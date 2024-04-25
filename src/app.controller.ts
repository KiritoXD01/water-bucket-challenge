import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Step } from './interfaces/Steps';
import { SolveDto } from './dto/solve.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('/solve')
    @HttpCode(200)
    getSolve(@Body() data: SolveDto): Step[] {
        return this.appService.solve({
            xCapacity: data.x_capacity,
            yCapacity: data.y_capacity,
            amountWanted: data.z_amount_wanted,
        });
    }
}
