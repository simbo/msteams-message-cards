import Joi from 'joi';

import { Payload } from './payload.interface.js';
import { payloadSchema } from './payload.schema.js';

export function validateMessageCardPayload(payload: Payload): void {
  const { error } = Joi.object({ payload: payloadSchema }).validate({ payload });
  if (error) throw new Error(error.message);
}
