import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const docClient: DocumentClient = createDynamoDBClient();
const workoutTable = process.env.WORKOUTS_TABLE;
const workoutIdIndex = process.env.WORKOUT_ID_INDEX;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Caller event: ', event);

  //   const authorization = event.headers.Authorization;
  //   const split = authorization.split(' ');
  //   const jwtToken = split[1];
  //   const userId = getUserId(jwtToken);

  let items = await docClient
    .scan({
      TableName: workoutTable,
      IndexName: workoutIdIndex,
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      items
    }),
  };
};

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDb instance');
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  }

  return new AWS.DynamoDB.DocumentClient();
}
