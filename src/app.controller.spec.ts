// write the test file for the app controller
// Path: src/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Step } from './interfaces/Steps';
import { SolveDto } from './dto/solve.dto';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('solve', () => {
        it('should return an array of steps to solve the problem', () => {
            const solveDto: SolveDto = {
                x_capacity: 3,
                y_capacity: 5,
                z_amount_wanted: 4,
            };
            const steps: Step[] = [
                {
                    step: 1,
                    bucketX: 3,
                    bucketY: 0,
                    action: 'Fill bucket X',
                },
                {
                    step: 2,
                    bucketX: 0,
                    bucketY: 3,
                    action: 'Empty bucket Y',
                },
                {
                    step: 3,
                    bucketX: 3,
                    bucketY: 3,
                    action: 'Transfer from X to Y',
                },
                {
                    step: 4,
                    bucketX: 1,
                    bucketY: 5,
                    action: 'Empty bucket X',
                },
                {
                    step: 5,
                    bucketX: 1,
                    bucketY: 0,
                    action: 'Transfer from Y to X',
                },
                {
                    step: 6,
                    bucketX: 0,
                    bucketY: 1,
                    action: 'Fill bucket Y',
                },
                {
                    step: 7,
                    bucketX: 1,
                    bucketY: 1,
                    action: 'Transfer from Y to X',
                },
            ];

            jest.spyOn(appService, 'solve').mockImplementation(() => steps);

            expect(appController.getSolve(solveDto)).toBe(steps);
        });

        it('should return an array with a single step if the target volume is not achievable', () => {
            const solveDto: SolveDto = {
                x_capacity: 3,
                y_capacity: 5,
                z_amount_wanted: 7,
            };
            const steps: Step[] = [
                {
                    step: 1,
                    bucketX: 0,
                    bucketY: 0,
                    action: 'Target volume 7 is not achievable with jug capacities 3 and 5.',
                },
            ];

            jest.spyOn(appService, 'solve').mockImplementation(() => steps);

            expect(appController.getSolve(solveDto)).toBe(steps);
        });

        it('should return a validation error if the target volume is negative', () => {
            const solveDto: SolveDto = {
                x_capacity: 3,
                y_capacity: 5,
                z_amount_wanted: -1,
            };

            const steps: Step[] = [
                {
                    step: 1,
                    bucketX: 0,
                    bucketY: 0,
                    action: `All values must be positive.`,
                },
            ];

            jest.spyOn(appService, 'solve').mockImplementation(() => steps);

            expect(appController.getSolve(solveDto)).toBe(steps);
        });

        it('should return a validation error if the x capacity is negative', () => {
            const solveDto: SolveDto = {
                x_capacity: -3,
                y_capacity: 5,
                z_amount_wanted: 4,
            };

            const steps: Step[] = [
                {
                    step: 1,
                    bucketX: 0,
                    bucketY: 0,
                    action: `All values must be positive.`,
                },
            ];

            jest.spyOn(appService, 'solve').mockImplementation(() => steps);

            expect(appController.getSolve(solveDto)).toBe(steps);
        });

        it('should return a validation error if the y capacity is negative', () => {
            const solveDto: SolveDto = {
                x_capacity: 3,
                y_capacity: -5,
                z_amount_wanted: 4,
            };

            const steps: Step[] = [
                {
                    step: 1,
                    bucketX: 0,
                    bucketY: 0,
                    action: `All values must be positive.`,
                },
            ];

            jest.spyOn(appService, 'solve').mockImplementation(() => steps);

            expect(appController.getSolve(solveDto)).toBe(steps);
        });
    });
});
