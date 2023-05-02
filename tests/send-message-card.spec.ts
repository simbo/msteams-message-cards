import { describe, it, jest } from '@jest/globals';

jest.unstable_mockModule('node-fetch', () => ({
  default: jest.fn()
}));

const { default: fetch } = await import('node-fetch');
const { sendMessageCard } = await import('../src/index.js');

const webhookURL = 'https://dummy-webhook.com/';

describe('sendMessageCard', () => {
  it('should call fetch without errors', async () => {
    (fetch as unknown as jest.Mock).mockClear().mockReturnValueOnce(Promise.resolve({ ok: true }));
    await expect(sendMessageCard({ webhookURL, text: 'foo' })).resolves.not.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should call fetch with payload options', async () => {
    (fetch as unknown as jest.Mock).mockClear().mockReturnValueOnce(Promise.resolve({ ok: true }));
    await expect(
      sendMessageCard({
        webhookURL,
        payload: { '@type': 'MessageCard', '@context': 'https://schema.org/extensions', text: 'foo' }
      })
    ).resolves.not.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://dummy-webhook.com/', {
      body: '{"@type":"MessageCard","@context":"https://schema.org/extensions","text":"foo"}',
      headers: { 'Content-Type': 'application/json' },
      method: 'post'
    });
  });

  it('should throw response errors', async () => {
    (fetch as unknown as jest.Mock).mockClear().mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Something unexpected happened.'
      })
    );
    await expect(sendMessageCard({ webhookURL, text: 'foo' })).rejects.toThrow(
      'MS Teams API Call failed: Response Status 500 (Internal Server Error) - Something unexpected happened.'
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw response errors with minimum error info', async () => {
    (fetch as unknown as jest.Mock).mockClear().mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 500,
        text: async () => undefined as unknown as string
      })
    );
    await expect(sendMessageCard({ webhookURL, text: 'foo' })).rejects.toThrow(
      'MS Teams API Call failed: Response Status 500'
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
