export type OutcomeArea = {
  id: string
  title: string
  tagline: string
  description: string
  image: string
}

export const outcomeStats = [
  { value: 'Toward 1B', label: 'Lives we aim to touch', accent: true },
  { value: '8', label: 'Outcome areas we work across' },
  { value: '12+', label: 'Institutional partners' },
]

export const outcomeAreas: OutcomeArea[] = [
  {
    id: 'health',
    title: 'Health',
    tagline: 'Systems that reach everyone',
    description:
      'Strengthening health policy, access to care, and coordination between government and development partners.',
    image: '/outcomes/outcome-health.jpg',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    tagline: 'Better lives through good food',
    description:
      'Rice fortification, national nutrition programmes, and multilateral alignment from pilot to policy.',
    image: '/outcomes/outcome-nutrition.jpg',
  },
  {
    id: 'child',
    title: 'Child wellbeing',
    tagline: 'Protecting the next generation',
    description:
      'Childhood cancer support, disability inclusion, and prevention programmes that keep children safe.',
    image: '/outcomes/outcome-child.jpg',
  },
  {
    id: 'finance',
    title: 'Financial inclusion',
    tagline: 'Economic independence',
    description:
      'Connecting institutions and technology so underserved communities access finance and opportunity.',
    image: '/outcomes/outcome-finance.jpg',
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    tagline: 'Modernising smallholder systems',
    description:
      'IDAT, AgriTech accelerators, and digital public infrastructure for farmers, markets, and ministries.',
    image: '/outcomes/outcome-agriculture.jpg',
  },
  {
    id: 'food',
    title: 'Food security',
    tagline: 'Enough to eat, always',
    description:
      'National food systems, fortification at scale, and learning from regional programmes that deliver.',
    image: '/outcomes/outcome-food.jpg',
  },
  {
    id: 'climate',
    title: 'Climate',
    tagline: 'Sustainable futures',
    description:
      'Regional environmental cooperation and programmes that align development with climate resilience.',
    image: '/outcomes/outcome-climate.jpg',
  },
  {
    id: 'poverty',
    title: 'Poverty alleviation',
    tagline: 'Empowerment and opportunity',
    description:
      'Economic empowerment and essential services as the lever to move people out of poverty for good.',
    image: '/outcomes/outcome-poverty.jpg',
  },
]

export const outcomePathway = [
  {
    num: '01',
    title: 'Convene the ecosystem',
    text: 'Governments, funders and implementers around one fundable plan.',
  },
  {
    num: '02',
    title: 'Reduce complexity',
    text: 'Navigate institutions so reform commitments become action.',
  },
  {
    num: '03',
    title: 'Enable delivery',
    text: 'Coordination, data and advisory that keep programmes on track.',
  },
  {
    num: '04',
    title: 'Build systems that last',
    text: 'Governments own the outcomes — capacity, not dependency.',
  },
]
