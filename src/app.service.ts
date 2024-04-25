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

        const steps: Step[] = [];

        let step = 1;
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
     * @param a
     * @param b
     * @returns the greatest common divisor of a and b
     */
    private gcd(a: number, b: number): number {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
