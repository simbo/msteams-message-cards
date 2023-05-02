import { describe, it } from '@jest/globals';

import { PayloadOptions, validateMessageCardPayloadOptions } from '../src/index.js';

describe('validateMessageCardPayloadOptions', () => {
  it('should validate minimum options without errors', () => {
    const options: PayloadOptions = {
      text: 'foo'
    };
    expect(() => validateMessageCardPayloadOptions(options)).not.toThrow();
  });

  it('should validate invalid options with errors', () => {
    const options: PayloadOptions = {} as unknown as PayloadOptions;
    expect(() => validateMessageCardPayloadOptions(options)).toThrow();
  });
});
