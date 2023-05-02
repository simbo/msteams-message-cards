import fetch from 'node-fetch';

import { createMessageCardPayload } from './create-message-card-payload.js';
import { Options, PayloadOptions } from './options.interface.js';
import { validateMessageCardPayload } from './validate-message-card-payload.js';

export async function sendMessageCard(options: Options): Promise<void> {
  const payload =
    options.payload ??
    createMessageCardPayload({
      ...Object.entries(options).reduce(
        (opts, [key, value]) => ({ ...opts, ...(['webhookURL', 'payload'].includes(key) ? {} : { [key]: value }) }),
        {} as PayloadOptions
      )
    });
  validateMessageCardPayload(payload);

  const { webhookURL } = options;

  const response = await fetch(webhookURL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      [
        'MS Teams API Call failed: Response Status',
        `${response.status}`,
        typeof response.statusText === 'string' && response.statusText.length > 0 ? `(${response.statusText})` : '',
        typeof text === 'string' && text.length > 0 ? `- ${text}` : ''
      ]
        .filter(txt => txt.length > 0)
        .join(' ')
    );
  }
}
