# Water Jug Challenge

The Water Jug Challenge is a project that aims to solve the classic water jug puzzle. The puzzle involves two jugs of different capacities and the goal is to measure a specific amount of water using only these jugs. This project provides a solution to the puzzle by implementing an algorithm that calculates the steps required to reach the desired water measurement.

## Installation

To install and run this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/water-bucket-challenge.git
    ```

2. Navigate to the project directory:

    ```bash
    cd water-bucket-challenge
    ```

3. Install the dependencies:

    Note: if you have [nvm](https://github.com/nvm-sh/nvm) installed you can use the following command to install
    the node version found in the .nvmrc file

    ```bash
    nvm install
    ```

    after that you can use the following command to set the
    version after to navigate to the folder

    ```bash
    nvm use
    ```

    After that you can install the dependencies

    ```bash
    npm install
    ```

4. Run the project in development mode:

    ```bash
    npm run start:dev
    ```

    To run the project in production mode you can
    run the following command

    ```bash
    npm run start:prod
    ```

## Usage

Once the project is running, you can access the API documentation page in your web browser at <http://localhost:3000/api>

To run the tests use this command

```bash
npm run test
```

## Endpoints

### POST /solve

This endpoint is used to solve the water jug puzzle and calculate the steps required to reach the desired water measurement.

#### Parameters

| Name            | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| x_capacity      | number | The capacity of the first jug.  |
| y_capacity      | number | The capacity of the second jug. |
| z_amount_wanted | number | The desired water measurement.  |

#### Request Example

```json
{
    "x_capacity": 4,
    "y_capacity": 3,
    "z_amount_wanted": 2
}
```

#### Response Example

```json
[
    {
        "step": 1,
        "bucketX": 4,
        "bucketY": 0,
        "action": "Fill bucket X"
    },
    {
        "step": 2,
        "bucketX": 1,
        "bucketY": 3,
        "action": "Transfer from bucket X to bucket Y"
    },
    {
        "step": 3,
        "bucketX": 1,
        "bucketY": 0,
        "action": "Empty bucket Y"
    },
    {
        "step": 4,
        "bucketX": 0,
        "bucketY": 1,
        "action": "Transfer from bucket X to bucket Y"
    },
    {
        "step": 5,
        "bucketX": 4,
        "bucketY": 1,
        "action": "Fill bucket X"
    },
    {
        "step": 6,
        "bucketX": 2,
        "bucketY": 3,
        "action": "Transfer from bucket X to bucket Y"
    }
]
```
