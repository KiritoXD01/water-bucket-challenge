import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SolveDto } from './dto/solve.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiExcludeEndpoint,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { State } from './interfaces/State';

@Controller()
@ApiTags('Water Jug Problem')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiExcludeEndpoint()
    getHello(@Res() response: Response): Response<Record<string, any>> {
        return response.json({
            message: 'Welcome to the Water Jug Problem API',
            endpoints: [
                {
                    method: 'POST',
                    path: '/solve',
                    description: 'Solve the water jug problem',
                    body: {
                        x_capacity: 'Number',
                        y_capacity: 'Number',
                        z_amount_wanted: 'Number',
                    },
                },
            ],
        });
    }

    @Post('/solve')
    @HttpCode(200)
    @ApiBody({
        type: SolveDto,
        description: 'The data to solve the water jug problem',
    })
    @ApiOkResponse({
        description: 'The steps to solve the water jug problem',
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
    })
    @ApiOperation({
        summary: 'Solve the water jug problem',
    })
    getSolve(@Body() data: SolveDto): State[] {
        return this.appService.solve({
            xCapacity: data.x_capacity,
            yCapacity: data.y_capacity,
            amountWanted: data.z_amount_wanted,
        });
    }
}
