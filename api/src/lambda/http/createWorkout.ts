import { Workout } from './../../models/Workout';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { getUserId } from '../../auth/utils';

const docClient: DocumentClient = createDynamoDBClient();
const workoutTable = process.env.WORKOUTS_TABLE;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event);

  let newWorkout: Workout = JSON.parse(event.body);

  const authorization = event.headers.Authorization;
  console.log('auth ',authorization)
  const split = authorization.split(' ');
  const jwtToken = split[1];
  const userId = getUserId(jwtToken);

  newWorkout.userId = userId;

  const newItem = await docClient
    .put({
      TableName: workoutTable,
      Item: newWorkout,
    })
    .promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      newItem,
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
