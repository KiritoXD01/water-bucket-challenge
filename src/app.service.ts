import { BadRequestException, Injectable } from '@nestjs/common';
import { State } from './interfaces/State';

@Injectable()
export class AppService {
    /**
     * Solve the water jug problem
     * @param data The data to solve the water jug problem
     * @returns the steps to solve the water jug problem
     */
    solve({
        xCapacity,
        yCapacity,
        amountWanted,
    }: {
        xCapacity: number;
        yCapacity: number;
        amountWanted: number;
    }): State[] {
        const state: State[] = [];
        const currentState: State = {
            step: 0,
            bucketX: 0,
            bucketY: 0,
            action: 'Start',
        };

        // First we check if all the values are positive, this validation
        // is already done in the DTO but we can never be too sure
        if (xCapacity <= 0 || yCapacity <= 0 || amountWanted <= 0) {
            throw new BadRequestException('All values must be positive');
        }

        // Next we check if the amount wanted is divisible by the greatest
        // common divisor of the two capacities
        if (amountWanted % this.gcd(xCapacity, yCapacity) !== 0) {
            throw new BadRequestException(
                'The amount wanted must be divisible by the greatest common divisor of the two capacities',
            );
        }

        // Now we check if the amount wanted is greater than the sum of the two capacities
        if (amountWanted > xCapacity + yCapacity) {
            throw new BadRequestException(
                'The amount wanted must be less than or equal to the sum of the two capacities',
            );
        }

        // Now we check which bucket to fill first
        const fillXFirst =
            Math.abs(xCapacity - amountWanted) <
            Math.abs(yCapacity - amountWanted);

        let step = 0;

        while (!this.isGoalState(currentState, amountWanted)) {
            step++;
            if (fillXFirst) {
                if (currentState.bucketX === 0) {
                    currentState.bucketX = xCapacity;
                    currentState.action = `Fill bucket X`;
                } else if (currentState.bucketY === yCapacity) {
                    currentState.bucketY = 0;
                    currentState.action = `Fill bucket Y`;
                } else {
                    const transfer = this.pour(
                        currentState.bucketX,
                        currentState.bucketY,
                        yCapacity,
                    );
                    currentState.bucketX -= transfer;
                    currentState.bucketY += transfer;
                    currentState.action = `Transfer from bucket X to Y`;
                }
            } else {
                if (currentState.bucketY === 0) {
                    currentState.bucketY = yCapacity;
                    currentState.action = `Fill bucket Y`;
                } else if (currentState.bucketX === xCapacity) {
                    currentState.bucketX = 0;
                    currentState.action = `Fill bucket X`;
                } else {
                    const transfer = this.pour(
                        currentState.bucketY,
                        currentState.bucketX,
                        xCapacity,
                    );
                    currentState.bucketY -= transfer;
                    currentState.bucketX += transfer;
                    currentState.action = `Transfer from bucket Y to X`;
                }
            }

            state.push({ ...currentState, step });
        }

        // now let modify the last state to show the goal state
        state[state.length - 1].status = `Solved`;

        return state;
    }

    /**
     * Find the greatest common divisor of two numbers
     * @param a The first number
     * @param b The second number
     * @returns the greatest common divisor of a and b
     */
    private gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b);
    }

    /**
     * Check if the current state is the goal state
     * @param state  The current state
     * @param amountWanted  The amount of water wanted
     * @returns true if the current state is the goal state, false otherwise
     */
    private isGoalState(state: State, amountWanted: number): boolean {
        return state.bucketX === amountWanted || state.bucketY === amountWanted;
    }

    /**
     * Pour water from one bucket to another
     * @param from The bucket to pour from
     * @param to The bucket to pour to
     * @param sizeTo The size of the bucket to pour to
     * @returns the amount of water poured
     */
    private pour(from: number, to: number, sizeTo: number): number {
        return Math.min(from, sizeTo - to);
    }
}
