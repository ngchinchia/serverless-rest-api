import { v4 as uuidv4 } from "uuid";
import { membershipSchema } from "./model.mjs";
import { MembershipRepository } from "./repository.mjs";

export class MembershipService {
  constructor() {
    this.repository = new MembershipRepository();
  }

  async createMembership(data) {
    const { error } = membershipSchema.validate(data);
    if (error) throw new Error(error.details[0].message);

    const existingMember = await this.repository.findByEmail(data.email);
    if (existingMember) {
      throw new Error("Email already exists");
    }

    const membershipData = {
      id: uuidv4(),
      ...data,
    };

    return this.repository.create(membershipData);
  }

  async getMembership(id) {
    const membership = await this.repository.findById(id);
    if (!membership) throw new Error("Membership not found");
    return membership;
  }

  async getAllMemberships() {
    return this.repository.findAll();
  }
}
