import { Injectable } from '@nestjs/common';
import { Step } from './interfaces/Steps';

@Injectable()
export class AppService {
    solve({
        xCapacity,
        yCapacity,
        amountWanted,
    }: {
        xCapacity: number;
        yCapacity: number;
        amountWanted: number;
    }): Step[] {
        // Calculate the greatest common divisor of the two capacities
        const gcd = this.gcd(xCapacity, yCapacity);

        // First we check if all the values are positive
        if (xCapacity <= 0 || yCapacity <= 0 || amountWanted <= 0) {
            return [
                {
                    step: 1,
                    bucketX: 0,
                    bucketY: 0,
                    action: `All values must be positive.`,
                },
            ];
        }

        // If the target volume is not divisible by the gcd, it is not achievable
        if (amountWanted % gcd !== 0) {
            return [
                {
                    step: 1,
                    bucketX: 0,
                    bucketY: 0,
                    action: `Target volume ${amountWanted} is not achievable with jug capacities ${xCapacity} and ${yCapacity}.`,
                },
            ];
        }

        // Initialize buckets
        let bucketX = 0;
        let bucketY = 0;

        // Initialize steps
        const steps: Step[] = [];

        // Initialize step counter
        let step = 1;

        // Solve the problem
        // Loop until one of the buckets contains the target volume
        while (bucketX !== amountWanted && bucketY !== amountWanted) {
            if (bucketX === 0) {
                bucketX = xCapacity;
                steps.push({
                    step: step++,
                    bucketX,
                    bucketY,
                    action: `Fill bucket X`,
                });
            } else if (bucketY === yCapacity) {
                bucketY = 0;
                steps.push({
                    step: step++,
                    bucketX,
                    bucketY,
                    action: `Empty bucket Y`,
                });
            } else {
                const transfer = Math.min(bucketX, yCapacity - bucketY);
                bucketX -= transfer;
                bucketY += transfer;
                steps.push({
                    step: step++,
                    bucketX,
                    bucketY,
                    action: `Transfer from bucket X to bucket Y`,
                });
            }
        }

        return steps;
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
}
