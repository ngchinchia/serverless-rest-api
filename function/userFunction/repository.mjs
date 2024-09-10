{
  /* Repository layer abstracts the database operations*/
}
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Membership } from "./model.mjs";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE;

export class MembershipRepository {
  async create(membershipData) {
    const params = {
      TableName: TABLE_NAME,
      Item: membershipData,
      ConditionExpression: "attribute_not_exists(email)",
    };

    try {
      await docClient.send(new PutCommand(params));
      return new Membership(membershipData);
    } catch (error) {
      if (error.name === "ConditionalCheckFailedException") {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  async findByEmail(email) {
    const params = {
      TableName: TABLE_NAME,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    try {
      const { Items } = await docClient.send(new QueryCommand(params));
      return Items.length > 0 ? new Membership(Items[0]) : null;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      throw error;
    }
  }

  async findById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };

    const { Item } = await docClient.send(new GetCommand(params));
    return Item ? new Membership(Item) : null;
  }

  async findAll() {
    const params = {
      TableName: TABLE_NAME,
    };

    const { Items } = await docClient.send(new ScanCommand(params));
    return Items ? Items.map((item) => new Membership(item)) : [];
  }
}
