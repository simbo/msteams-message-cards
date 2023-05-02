import Joi from 'joi';

import { Options } from './options.interface.js';
import { optionsSchema } from './options.schema.js';

export function validateMessageCardOptions(options: Options): void {
  const { error } = Joi.object({ options: optionsSchema }).validate({ options });
  if (error) throw new Error(error.message);
}
