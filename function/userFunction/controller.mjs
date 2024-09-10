import { MembershipService } from "./service.mjs";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const service = new MembershipService();
const sns = new SNSClient({});

const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

async function sendSNSNotification(membership) {
  const params = {
    Message: JSON.stringify(membership),
    TopicArn: SNS_TOPIC_ARN,
    Subject: 'New Membership Created'
  };

  try {
    await sns.send(new PublishCommand(params));
    console.log('SNS notification sent successfully');
  } catch (error) {
    console.error('Error sending SNS notification:', error);
    // We're logging the error but not throwing it to prevent API failure if notification fails
  }
}

export async function createMembership(event) {
  try {
    const data = JSON.parse(event.body);
    const membership = await service.createMembership(data);
    
    // Send SNS notification
    await sendSNSNotification(membership);

    return {
      statusCode: 201,
      body: JSON.stringify(membership),
    };
  } catch (error) {
    if (error.message === "Email already exists") {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: "Email already exists" }),
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

export async function getMembership(event) {
  try {
    const { id } = event.pathParameters;
    const membership = await service.getMembership(id);
    return {
      statusCode: 200,
      body: JSON.stringify(membership),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

export async function getAllMemberships() {
  const memberships = await service.getAllMemberships();
  return {
    statusCode: 200,
    body: JSON.stringify(memberships),
  };
}