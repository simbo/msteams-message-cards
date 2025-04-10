import { colorNameToCode } from 'color-name-to-code';

import { OptionsButton, OptionsSection, PayloadOptions } from './options.interface.js';
import { Payload, PayloadFact, PayloadPotentialAction, PayloadSection } from './payload.interface.js';
import { validateMessageCardPayloadOptions } from './validate-message-card-payload-options.js';

export function createMessageCardPayload(options: PayloadOptions): Payload {
  validateMessageCardPayloadOptions(options);
  const payload: Payload = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions'
  };
  if (options.summary) {
    payload.summary = options.summary;
  }
  if (options.title) {
    payload.title = options.title;
  }
  if (options.text) {
    payload.text = options.text;
  }
  if (options.color) {
    payload.themeColor = colorNameToCode(options.color, { hash: false });
  }
  if (options.buttons) {
    payload.potentialAction = createPotentialActions(options.buttons);
  }
  if (options.sections) {
    payload.sections = createSections(options.sections);
  }
  return payload;
}

function createPotentialActions(options: OptionsButton[]): PayloadPotentialAction[] {
  return options.reduce((actions, button) => {
    const { label: name, url: uri } = Array.isArray(button) ? { label: button[0], url: button[1] } : button;
    actions.push({ '@type': 'OpenUri', name, targets: [{ os: 'default', uri }] });
    return actions;
  }, [] as PayloadPotentialAction[]);
}

function createSections(options: OptionsSection[]): PayloadSection[] {
  return options.reduce((sections, option) => {
    const section: PayloadSection = {};
    if (option.activity) {
      if (option.activity.title) {
        section.activityTitle = option.activity.title;
      }
      if (option.activity.subtitle) {
        section.activitySubtitle = option.activity.subtitle;
      }
      if (option.activity.text) {
        section.activityText = option.activity.text;
      }
      if (option.activity.image) {
        section.activityImage = option.activity.image;
      }
    }
    if (option.text) {
      section.text = option.text;
    }
    if (option.buttons) {
      section.potentialAction = createPotentialActions(option.buttons);
    }
    if (option.facts) {
      section.facts = option.facts.reduce((facts, data) => {
        const { name, value } = Array.isArray(data) ? { name: data[0], value: data[1] } : data;
        facts.push({ name, value });
        return facts;
      }, [] as PayloadFact[]);
    }
    if (Object.keys(section).length > 0) {
      sections.push(section);
    }
    return sections;
  }, [] as PayloadSection[]);
}
