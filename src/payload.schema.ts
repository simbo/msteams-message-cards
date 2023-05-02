import Joi from 'joi';

export const payloadPotentialActionSchema = Joi.object({
  '@type': Joi.string()
    .required()
    .pattern(/^OpenUri$/),
  name: Joi.string().required(),
  targets: Joi.array()
    .items(
      Joi.object({
        os: Joi.string()
          .required()
          .pattern(/^default$/),
        uri: Joi.string().required().uri({ scheme: 'https' })
      })
    )
    .length(1)
    .required()
});

export const payloadFactSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().required()
});

export const payloadSectionSchema = Joi.object({
  activityTitle: Joi.string(),
  activitySubtitle: Joi.string(),
  activityText: Joi.string(),
  activityImage: Joi.string().uri({ scheme: 'https' }),
  text: Joi.string(),
  potentialAction: payloadPotentialActionSchema,
  facts: Joi.array().items(payloadFactSchema)
}).or('activityTitle', 'activitySubtitle', 'activityImage', 'text', 'potentialAction', 'facts');

export const payloadSchema = Joi.object({
  '@type': Joi.string()
    .required()
    .pattern(/^MessageCard$/),
  '@context': Joi.string()
    .required()
    .pattern(/^https:\/\/schema.org\/extensions$/),
  summary: Joi.string(),
  title: Joi.string(),
  text: Joi.string(),
  themeColor: Joi.string().pattern(/^[\da-f]{6}/i),
  potentialAction: payloadPotentialActionSchema,
  sections: Joi.array().items(payloadSectionSchema)
}).or('text', 'summary');
