import Joi from "joi";

export const membershipSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().email().trim().lowercase().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9+\-\s()]{10,15}$/)
    .allow(""),
  isActive: Joi.boolean(),
}).options({ stripUnknown: true });

export class Membership {
  constructor({ id, name, email, phoneNumber, isActive }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.isActive = isActive;
  }
}
