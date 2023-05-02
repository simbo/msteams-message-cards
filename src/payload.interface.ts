export interface Payload {
  '@type': 'MessageCard';
  '@context': 'https://schema.org/extensions';
  summary?: string;
  title?: string;
  text?: string;
  themeColor?: string;
  sections?: PayloadSection[];
  potentialAction?: PayloadPotentialAction[];
}

export interface PayloadSection {
  activityTitle?: string;
  activitySubtitle?: string;
  activityText?: string;
  activityImage?: string;
  text?: string;
  potentialAction?: PayloadPotentialAction[];
  facts?: PayloadFact[];
}

export interface PayloadFact {
  name: string;
  value: string;
}

export interface PayloadPotentialAction {
  '@type': 'OpenUri';
  name: string;
  targets: [
    {
      os: 'default';
      uri: string;
    }
  ];
}
