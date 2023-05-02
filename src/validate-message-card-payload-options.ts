import Joi from 'joi';

import { PayloadOptions } from './options.interface.js';
import { payloadOptionsSchema } from './options.schema.js';

export function validateMessageCardPayloadOptions(options: PayloadOptions): void {
  const { error } = Joi.object({ options: payloadOptionsSchema }).validate({ options });
  if (error) throw new Error(error.message);
}
