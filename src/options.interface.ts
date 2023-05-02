import { Payload, PayloadFact } from './payload.interface.js';

export interface PayloadOptions {
  summary?: string;
  title?: string;
  text?: string;
  color?: string;
  buttons?: OptionsButton[];
  sections?: OptionsSection[];
}

export type Options = PayloadOptions & {
  webhookURL: string;
  payload?: Payload;
};

export interface OptionsSection {
  activity?: OptionsActivity;
  text?: string;
  buttons?: OptionsButton[];
  facts?: OptionsFact[];
}

export interface OptionsActivity {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: string;
}

export type OptionsButton = [string, string] | { label: string; url: string };

export type OptionsFact = [string, string] | PayloadFact;
