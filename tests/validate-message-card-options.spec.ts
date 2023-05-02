import { describe, it } from '@jest/globals';

import { Options, validateMessageCardOptions } from '../src/index.js';

const webhookURL = 'https://dummy-webhook.com/';

describe('validateMessageCardOptions', () => {
  it('should validate minimum options without errors', () => {
    const options: Options = {
      webhookURL,
      text: 'foo'
    };
    expect(() => validateMessageCardOptions(options)).not.toThrow();
  });

  it('should validate invalid options with errors', () => {
    const options: Options = {} as unknown as Options;
    expect(() => validateMessageCardOptions(options)).toThrow();
  });
});
