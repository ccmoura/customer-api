import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().port().default(8080),

  CACHE_PORT: Joi.number().port().default(6379),
  CACHE_HOST: Joi.string().hostname().required(),
  CACHE_USERNAME: Joi.string().required(),
  CACHE_PASSWORD: Joi.string(),
  CACHE_PREFIX: Joi.string().default('customer'),
});
