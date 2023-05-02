import { describe, it } from '@jest/globals';

import { Payload, validateMessageCardPayload } from '../src/index.js';

describe('validateMessageCardPayload', () => {
  it('should validate minimum payload without errors', () => {
    const payload: Payload = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      text: 'foo'
    };
    expect(() => validateMessageCardPayload(payload)).not.toThrow();
  });

  it('should validate invalid payload with errors', () => {
    const payload: Payload = {} as unknown as Payload;
    expect(() => validateMessageCardPayload(payload)).toThrow();
  });
});
