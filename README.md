# dynamodb-serverless-perfect-duo

A simple serverless CRUD API for products, built with AWS Lambda, API Gateway (HTTP API) and DynamoDB, deployed with the Serverless Framework.

## Stack

- Node.js 24 (`arm64`) + TypeScript
- Serverless Framework (built-in esbuild bundling)
- AWS Lambda + API Gateway HTTP API
- DynamoDB (`ProductsTable`, on-demand billing) via `@aws-sdk/lib-dynamodb`

## Installation

> [!IMPORTANT]
> Be sure to follow the instructions below in the correct order.

#### Prerequisites

```sh
Install Node.js 24+
Install the Serverless Framework: npm i -g serverless
Configure your AWS credentials (aws configure or serverless dashboard)
Update the `org` in `serverless.yml` to your own Serverless org
```

#### Install dependencies

```sh
npm install
```

#### Deploy

```sh
sls deploy
```

This creates the `ProductsTable` DynamoDB table, the IAM role with the required DynamoDB permissions, the Lambda functions and the HTTP API. The API base URL is printed at the end of the deploy.

## Endpoints

| Method   | Path             | Function        | Description          |
| -------- | ---------------- | --------------- | -------------------- |
| `GET`    | `/products`      | `listProducts`  | List all products    |
| `GET`    | `/products/{id}` | `getProduct`    | Get a product by id  |
| `POST`   | `/products`      | `createProduct` | Create a product     |
| `PUT`    | `/products/{id}` | `updateProduct` | Update a product     |
| `DELETE` | `/products/{id}` | `deleteProduct` | Delete a product     |

#### Creating a product

```sh
Make a POST request to {API_URL}/products with the following body:

{
  "name": "Keyboard",
  "price": 199.9,
  "tags": ["peripherals", "office"]
}

The response will be 201 Created
```

#### Updating a product

```sh
Make a PUT request to {API_URL}/products/{id} with the following body:

{
  "name": "Mechanical Keyboard",
  "price": 299.9,
  "tags": ["peripherals"]
}

The response will be 204 No Content
```

#### Getting / deleting a product

```sh
GET {API_URL}/products/{id}     -> 200 with { "product": { ... } }, or 404 if not found
DELETE {API_URL}/products/{id}  -> 204 No Content
```

## Useful commands

```sh
sls deploy                          # deploy the entire stack
sls deploy function -f {function}   # deploy only a function's code
sls invoke local -f {function}      # invoke a function locally
sls package                         # generate the deployment package
sls remove                          # remove the stack from AWS
```

## Extra

> [!IMPORTANT]
> The DynamoDB client is shared across all functions in `src/lib/dynamoClient.ts`. `@aws-sdk/*` is excluded from the bundle since it's already provided by the Lambda runtime.
