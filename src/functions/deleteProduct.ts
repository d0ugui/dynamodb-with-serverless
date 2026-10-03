import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
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

  const command = new DeleteCommand({
    TableName: "ProductsTable",
    Key: {
      id,
    },
  })

  await dynamoClient.send(command);

  return {
    statusCode: 204,
    body: null,
  };
};
