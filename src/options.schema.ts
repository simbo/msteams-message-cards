import Joi from 'joi';

import { payloadFactSchema, payloadSchema } from './payload.schema.js';

export const optionsButtonSchema = Joi.alternatives().try(
  Joi.object({
    label: Joi.string().required(),
    url: Joi.string().required().uri({ scheme: 'https' })
  }),
  Joi.array().length(2).items(Joi.string())
);

export const optionsFactSchema = Joi.alternatives().try(payloadFactSchema, Joi.array().length(2).items(Joi.string()));

export const optionsActivitySchema = Joi.object({
  title: Joi.string(),
  subtitle: Joi.string(),
  text: Joi.string(),
  image: Joi.string().uri({ scheme: 'https' })
}).or('title', 'subtitle', 'text', 'image');

export const optionsSectionSchema = Joi.object({
  activity: optionsActivitySchema,
  text: Joi.string(),
  buttons: Joi.array().items(optionsButtonSchema),
  facts: Joi.array().items(optionsFactSchema)
});

const properties = {
  summary: Joi.string(),
  title: Joi.string(),
  text: Joi.string(),
  color: Joi.string(),
  buttons: Joi.array().items(optionsButtonSchema),
  sections: Joi.array().items(optionsSectionSchema)
};

export const optionsSchema = Joi.object({
  webhookURL: Joi.string().required().uri({ scheme: 'https' }),
  payload: payloadSchema,
  ...properties
}).or('text', 'summary', 'payload');

export const payloadOptionsSchema = Joi.object({
  ...properties
}).or('text', 'summary');
