import type { PageMetaProps } from '../components/PageMeta'

export const PAGE_META: Record<string, PageMetaProps> = {
  '/': {
    title: 'Connect To Care — Impact at Scale Platform',
    description:
      'A purpose-driven platform consultancy weaving corporations, non-profits and government into ecosystems that deliver impact at scale. Toward one billion.',
    path: '/',
  },
  '/about': {
    title: 'About',
    description:
      'Who we are, our vision and mission, and what Connect To Care does — enabling national priorities through systems, coordination, and delivery across Sri Lanka.',
    path: '/about',
  },
  '/team': {
    title: 'Team',
    description:
      'Board of directors and leadership team at Connect to Care — governance and the people delivering programmes across Sri Lanka.',
    path: '/team',
  },
  '/outcomes': {
    title: 'Outcomes',
    description:
      'Health, nutrition, agriculture, climate and more — the outcome areas where Connect To Care works toward one billion lives across Sri Lanka.',
    path: '/outcomes',
  },
  '/newsletter': {
    title: 'Newsletter',
    description:
      'Stories, monthly dispatches, and field notes from Connect To Care — programmes, policy, and impact across Sri Lanka.',
    path: '/newsletter',
  },
  '/impact': {
    title: 'Impact',
    description:
      'Programmes designed, coalitions built, reforms delivered — dairy sector reform, IDAT digital agriculture, and notable engagements.',
    path: '/impact',
  },
  '/connect': {
    title: 'Connect',
    description:
      'Partner with Connect To Care. Start a conversation about ecosystem-level coordination with governments and development institutions.',
    path: '/connect',
  },
}
