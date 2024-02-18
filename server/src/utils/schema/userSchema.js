import Joi from "joi";
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  // You can adjust the password regex pattern based on your requirements
});

export default userSchema;
