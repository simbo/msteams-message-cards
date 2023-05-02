import { env } from 'node:process';

import Joi from 'joi';

import { sendMessageCard } from '../src/index.js';

const webhookURL = env.TEAMS_WEBHOOK as string;

const { error } = Joi.object({ webhookURL: Joi.string().required().uri({ scheme: 'https' }) }).validate({ webhookURL });

if (error) {
  throw new Error(error.message);
}

await sendMessageCard({
  webhookURL,
  title: '❤️ <em>Hello</em>',
  text: '<h1>❤️ <em>Hello</em></h1><strong>Foo!</strong>'
});
