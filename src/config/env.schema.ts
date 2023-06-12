import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().positive().integer().default(8080),
});
