import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto";
import { dynamoClient } from "../lib/dynamoClient";

export async function handler(event: APIGatewayProxyEventV2) {
  const body = JSON.parse(event.body || "{}");

  const command = new PutItemCommand({
    TableName: 'ProductsTable',
    Item: {
      id: { S: randomUUID() },
      name: { S: body.name },
      price: { N: `${body.price}` },
      tags: { SS: body.tags }
    },
  });

  const res = await dynamoClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify(res),
  };
};
