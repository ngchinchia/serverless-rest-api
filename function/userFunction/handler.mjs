import { createMembership, getMembership, getAllMemberships } from './controller.mjs';

export async function handler(event) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  switch (event.httpMethod) {
    case 'POST':
      return createMembership(event);
    case 'GET':
      if (event.pathParameters?.id) {
        return getMembership(event);
      } else {
        return getAllMemberships();
      }
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
  }
}