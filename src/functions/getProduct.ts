import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { dynamoClient } from "../lib/dynamoClient";

export async function handler(event: APIGatewayProxyEventV2) {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Product id is required",
      }),
    }
  }

  const command = new GetItemCommand({
    TableName: 'ProductsTable',
    Key: {
      id: { S: id },
    },
  })

  const { Item } = await dynamoClient.send(command);

  if (!Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Product not found",
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      product: Item,
    }),
  };
};
