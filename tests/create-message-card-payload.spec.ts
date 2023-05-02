import { describe, it } from '@jest/globals';

import { createMessageCardPayload, Payload } from '../src/index.js';

const basePayload: Payload = {
  '@type': 'MessageCard',
  '@context': 'https://schema.org/extensions'
};

describe('createMessageCardPayload', () => {
  it('should create a payload with only text', () => {
    const payload: Payload = {
      ...basePayload,
      text: 'foo'
    };
    expect(createMessageCardPayload({ text: 'foo' })).toStrictEqual(payload);
  });

  it('should create a payload with only summary', () => {
    const payload: Payload = {
      ...basePayload,
      summary: 'foo'
    };
    expect(createMessageCardPayload({ summary: 'foo' })).toStrictEqual(payload);
  });

  it('should create a payload with a title', () => {
    const payload: Payload = {
      ...basePayload,
      text: 'foo',
      title: 'Foo!'
    };
    expect(createMessageCardPayload({ title: 'Foo!', text: 'foo' })).toStrictEqual(payload);
  });

  it('should create a payload with a themeColor', () => {
    const payload: Payload = {
      ...basePayload,
      text: 'foo',
      themeColor: 'FF0000'
    };
    expect(createMessageCardPayload({ text: 'foo', color: 'red' })).toStrictEqual(payload);
  });

  it('should create a payload with buttons from an object definition', () => {
    const payload: Payload = {
      ...basePayload,
      text: 'foo',
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Foo!',
          targets: [
            {
              os: 'default',
              uri: 'https://foo.com/'
            }
          ]
        }
      ]
    };
    expect(
      createMessageCardPayload({ text: 'foo', buttons: [{ label: 'Foo!', url: 'https://foo.com/' }] })
    ).toStrictEqual(payload);
  });

  it('should create a payload with buttons from an array definition', () => {
    const payload: Payload = {
      ...basePayload,
      text: 'foo',
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Foo!',
          targets: [
            {
              os: 'default',
              uri: 'https://foo.com/'
            }
          ]
        }
      ]
    };
    expect(createMessageCardPayload({ text: 'foo', buttons: [['Foo!', 'https://foo.com/']] })).toStrictEqual(payload);
  });

  it('should create a payload with a section containing text', () => {
    const payload = {
      ...basePayload,
      text: 'foo',
      sections: [{ text: 'bar' }]
    };
    expect(createMessageCardPayload({ text: 'foo', sections: [{ text: 'bar' }] })).toStrictEqual(payload);
  });

  it('should create a payload with a section containing activity data', () => {
    const payload = {
      ...basePayload,
      text: 'foo',
      sections: [
        {
          activityTitle: 'Foo!',
          activitySubtitle: 'foo',
          activityText: 'Foo bar.',
          activityImage: 'https://foo.com/image.png'
        }
      ]
    };
    expect(
      createMessageCardPayload({
        text: 'foo',
        sections: [
          { activity: { title: 'Foo!', subtitle: 'foo', text: 'Foo bar.', image: 'https://foo.com/image.png' } }
        ]
      })
    ).toStrictEqual(payload);
  });

  it('should create a payload with a section containing buttons', () => {
    const payload = {
      ...basePayload,
      text: 'foo',
      sections: [
        {
          potentialAction: [
            {
              '@type': 'OpenUri',
              name: 'Foo!',
              targets: [
                {
                  os: 'default',
                  uri: 'https://foo.com/'
                }
              ]
            }
          ]
        }
      ]
    };
    expect(
      createMessageCardPayload({
        text: 'foo',
        sections: [{ buttons: [{ label: 'Foo!', url: 'https://foo.com/' }] }]
      })
    ).toStrictEqual(payload);
  });

  it('should create a payload with a section containing facts from an object definition', () => {
    const payload = {
      ...basePayload,
      text: 'foo',
      sections: [
        {
          facts: [
            {
              name: 'foo',
              value: 'bar'
            }
          ]
        }
      ]
    };
    expect(
      createMessageCardPayload({
        text: 'foo',
        sections: [{ facts: [{ name: 'foo', value: 'bar' }] }]
      })
    ).toStrictEqual(payload);
  });

  it('should create a payload with a section containing facts from an array definition', () => {
    const payload = {
      ...basePayload,
      text: 'foo',
      sections: [
        {
          facts: [
            {
              name: 'foo',
              value: 'bar'
            }
          ]
        }
      ]
    };
    expect(
      createMessageCardPayload({
        text: 'foo',
        sections: [{ facts: [['foo', 'bar']] }]
      })
    ).toStrictEqual(payload);
  });
});
