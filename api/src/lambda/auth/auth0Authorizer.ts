import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda';
import 'source-map-support/register';

import { verify } from 'jsonwebtoken';
import { JwtToken } from '../../auth/JwtToken';

const secretField = process.env.AUTH_0_SECRET_FIELD;

export const handler = async (
  event: CustomAuthorizerEvent,
  context
): Promise<CustomAuthorizerResult> => {
  console.log('here', event);

  try {
    const decodedToken = verifyToken(
      event.authorizationToken,
      context.AUTH_0_SECRET_FIELD[secretField]
    );
    console.log('User was authorized', decodedToken);

    return {
      principalId: decodedToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
      },
    };
  } catch (e) {
    console.log('User was not authorized', e.message);

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*',
          },
        ],
      },
    };
  }
};

function verifyToken(authHeader: string, secret: string): JwtToken {
  if (!authHeader) {
    throw new Error('No authoirzation header');
  }

  if (authHeader.toLocaleLowerCase().startsWith('bearer ')) {
    throw new Error('Invalid authoirzation header');
  }

  const split = authHeader.split(' ');
  const token = split[1];

  return verify(token, secret) as JwtToken;
}
