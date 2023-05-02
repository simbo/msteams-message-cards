# MS Teams Message Cards

[![npm Package Version](https://img.shields.io/npm/v/msteams-message-cards?)](https://www.npmjs.com/package/msteams-message-cards)
[![License MIT](https://img.shields.io/badge/license-MIT-4cc552)](http://simbo.mit-license.org/)
[![GitHub Repo](https://img.shields.io/badge/repo-public-87ceeb)](https://github.com/simbo/msteams-message-cards)
![Native Typescript Support](https://img.shields.io/npm/types/msteams-message-cards)
[![Coveralls Coverage](https://img.shields.io/coveralls/github/simbo/msteams-message-cards)](https://coveralls.io/github/simbo/msteams-message-cards)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/simbo/msteams-message-cards/ci.yml?branch=main)](https://github.com/simbo/msteams-message-cards/actions/workflows/ci.yml)

A javascript library that creates message cards for MS Teams and sends them to a
webhook (aka "connector").

It uses the
[legacy actionable message card](https://learn.microsoft.com/en-us/outlook/actionable-messages/message-card-reference)
format.

This library only supports basic features of message cards (just the ones I
needed). If you are missing a feature, feel free to create an
[issue](https://github.com/simbo/msteams-message-cards/issues/new) or a
[pull request](https://github.com/simbo/msteams-message-cards/compare).

Supported Message Card Features:

- `title`
- `text`
- `summary`
- `themeColor` (can be set via a color name using
  [`color-name-to-code`](https://www.npmjs.com/package/color-name-to-code))
- `potentialAction` (URL buttons only)
- `sections`, containing:
  - `text`
  - `activityTitle`
  - `activitySubtitle`
  - `activityText`
  - `activityImage`
  - `potentialAction` (URL buttons only)
  - `facts`

---

## Installation

This library is published to npm registry as
[`msteams-message-cards`](https://www.npmjs.com/package/msteams-message-cards).

You can install it:

```sh
# with npm
npm install --save msteams-message-cards

# with yarn
yarn add msteams-message-cards
```

ℹ️ **HINT**: This library is a pure ESM package. (You may want to
[read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).)

## Usage Examples

```js
import {
  createMessageCardPayload,
  sendMessageCard
} from 'msteams-message-cards';

const webhookURL = 'https://my-teams.com/webhook/123/';

// most simple usage
try {
  await sendMessageCard({
    webhookURL,
    text: 'Hello World!'
  });
} catch (error) {
  console.error(error);
}

// create and log payload before sending
try {
  const payload = createMessageCardPayload({ text: 'Hello World!' });
  console.log(`Message Payload:\n${JSON.stringify(payload, null, 2)}`);
  await sendMessageCard({ webhookURL, payload });
} catch (error) {
  console.error(error);
}

// using some more features
try {
  await sendMessageCard({
    webhookURL,
    title: 'This is great!',
    text: "And here's my awesome message.",
    summary: 'Awesome summary!',
    color: 'dodger blue',
    buttons: [{ label: 'More Awesomeness', url: 'https://awesome.com/' }],
    sections: [
      {
        facts: [
          { name: '1', value: 'Foo' },
          { name: '2', value: 'Bar' },
          { name: '3', value: 'Baz' }
        ]
      }
    ]
  });
} catch (error) {
  console.error(error);
}
```

## API

### `sendMessageCard`

```ts
async function sendMessageCard(options: Options): Promise<void>;
```

#### Options

```ts
type Options = {
  webhookURL: string;
  payload?: Payload;
} & PayloadOptions;
```

- `webhookURL: string` (required)  
  …defines the webhook URL for the MS Teams connector.

- `payload?: Payload` (optional)  
  …defines the fully formatted payload to send.  
  Only required if there are no additional [payload options](#payload-options)
  present from which a payload could be generated.

The options for `sendMessageCard` can also include all
[payload options](#payload-options).

### `createMessageCardPayload`

```ts
function createMessageCardPayload(options: PayloadOptions): Payload;
```

#### Payload Options

```ts
interface PayloadOptions {
  summary?: string;
  title?: string;
  text?: string;
  color?: string;
  buttons?: Button[];
  sections?: Section[];
}

type Button = { label: string; url: string } | [string, string];

interface Section {
  text?: string;
  buttons?: Button[];
  facts?: Fact[];
  activity?: Activity;
}

type Fact = { name: string; value: string } | [string, string];

interface Activity {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: string;
}
```

For a valid minimum payload, at least `text` or `summary` needs to be present.

See also the
[official documentation for legacy actionable message cards](https://learn.microsoft.com/en-us/outlook/actionable-messages/message-card-reference)
for more details about the different message card options.

- `summary?: string`  
  …defines the message card summary. This is should be a one-liner and it used
  in Outlook notifications.

- `title?: string`  
  …defines the message card title.

- `text?: string`  
  …defines the message card text. It can contain basic HTML and CSS.

- `color?: string`  
  …defines the message card theme color. Should be either a color hex code or a
  color name that can be interpreted by
  [`color-name-to-code`](https://www.npmjs.com/package/color-name-to-code).

- `buttons?: Button[]`  
  …defines the message card buttons. It should be an array of either objects
  containing `label:string` and `url:string` or arrays where the first element
  is used as label and the second as URL.

- `sections?: Section[]`  
  …defines one or more message card sections with multiple optional features, of
  which at least one needs to be present:

  - `text?: string`  
    …defines the section text.

  - `buttons?: string`  
    …defines the section buttons. It should be an array of either objects
    containing `label:string` and `url:string` or arrays where the first element
    is used as label and the second as URL.

  - `facts?: string`  
    …defines the facts table of a section. It should be an array of either
    objects containing `name:string` and `value:string` or arrays where the
    first element it used as name and the second as value.

  - `activity?: Activity`  
    …defines an activity section which is suitable to represent and article or
    post. It's defined using an object with the following properties:

    - `title?: string`  
      …defines the title for the activity.

    - `subtitle?: string`  
      …defines the subtitle for the activity.

    - `text?: string`  
      …defines the text for the activity.

    - `image?: string`  
      …defines the image for the activity.

## License

[MIT &copy; Simon Lepel](http://simbo.mit-license.org/)
