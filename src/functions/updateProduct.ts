import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../lib/dynamoClient";

export async function handler(event: APIGatewayProxyEventV2) {
  const body = JSON.parse(event.body ?? "{}");
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Product id is required",
      }),
    }
  }

  const command = new UpdateCommand({
    TableName: "ProductsTable",
    Key: {
      id,
    },
    UpdateExpression: "set #n = :n, #p = :p, #t = :t",
    ExpressionAttributeNames: {
      "#n": "name",
      "#p": "price",
      "#t": "tags",
    },
    ExpressionAttributeValues: {
      ":n": body.name,
      ":p": body.price,
      ":t": body.tags,
    },
  })

  await dynamoClient.send(command);

  return {
    statusCode: 204,
    body: null,
  };
};
