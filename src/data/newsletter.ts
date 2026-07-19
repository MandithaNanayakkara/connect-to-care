export type NewsletterCategory =
  | 'all'
  | 'digest'
  | 'nutrition'
  | 'agriculture'
  | 'policy'
  | 'partnerships'

export type NewsletterArticle = {
  slug: string
  title: string
  excerpt: string
  body?: string
  category: Exclude<NewsletterCategory, 'all'>
  date: string
  readTime: string
  featured?: boolean
  image?: string
  url: string
  project?: string
}

export type ProjectSpotlight = {
  title: string
  tag: string
  summary: string
  href: string
}

export const NEWSLETTER_URL = 'https://newsletter.connecttocare.co'

export const categories: { id: NewsletterCategory; label: string }[] = [
  { id: 'all', label: 'All stories' },
  { id: 'digest', label: 'Monthly digest' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'policy', label: 'Policy' },
  { id: 'partnerships', label: 'Partnerships' },
]

const NEWSLETTER_STORAGE_KEY = 'connect-to-care-newsletter-data'

export const DEFAULT_ARTICLES: NewsletterArticle[] = [
  {
    slug: 'rice-fortification-children',
    title: "Rice fortification: A game-changer for Sri Lanka's children",
    excerpt:
      'How convening ministries, PATH and WFP unblocked Treasury financing and put national rice fortification back on track.',
    category: 'nutrition',
    date: 'Mar 2025',
    readTime: '6 min',
    featured: true,
    image: '/newsletter/rice-fortification.jpg',
    url: NEWSLETTER_URL,
    project: 'National nutrition programme',
  },
  {
    slug: 'impact-march-2025',
    title: 'Last Month in Impact — March 2025',
    excerpt:
      'A monthly round-up of coalitions convened, policy windows opened, and delivery milestones across CTC programmes.',
    category: 'digest',
    date: 'Mar 2025',
    readTime: '4 min',
    image: '/newsletter/digest-march.jpg',
    url: NEWSLETTER_URL,
  },
  {
    slug: 'india-8-trillion',
    title: "India's Path to $8 Trillion — Why Sri Lanka Must Be a Strategic Partner",
    excerpt:
      'Regional economic gravity, trade corridors, and why Sri Lanka cannot afford to stand outside the conversation.',
    category: 'policy',
    date: 'Feb 2025',
    readTime: '8 min',
    image: '/newsletter/india-partnership.jpg',
    url: NEWSLETTER_URL,
  },
  {
    slug: 'idat-agritech-accelerator',
    title: 'From IDAT to GoviLab: standing up national AgriTech infrastructure',
    excerpt:
      'Four ministries aligned, a cohort launched, and AITS positioned as digital public infrastructure for smallholders.',
    category: 'agriculture',
    date: 'Feb 2025',
    readTime: '7 min',
    image: '/newsletter/idat-agritech.jpg',
    url: NEWSLETTER_URL,
    project: 'Inclusive Digital Agriculture',
  },
  {
    slug: 'impact-february-2025',
    title: 'Last Month in Impact — February 2025',
    excerpt:
      'Field notes from dairy reform meetings, fortification learning visits, and cross-ministry coordination.',
    category: 'digest',
    date: 'Feb 2025',
    readTime: '4 min',
    image: '/newsletter/digest-february.jpg',
    url: NEWSLETTER_URL,
  },
  {
    slug: 'dairy-five-year-plan',
    title: 'Five-year dairy reform: from meetings to ministerial endorsement',
    excerpt:
      'Six high-level sessions with DAPH, NLDB and the Ministry of Agriculture — and a formal ask to co-design national reform.',
    category: 'policy',
    date: 'Jan 2025',
    readTime: '5 min',
    image: '/newsletter/dairy-reform.jpg',
    url: NEWSLETTER_URL,
    project: 'Dairy sector reform',
  },
  {
    slug: 'fortification-india-visit',
    title: 'Learning from India: fortification at scale',
    excerpt:
      'NFPB representatives study large-scale fortification and the Mid-Day Meal Program — lessons for Sri Lankan rollout.',
    category: 'nutrition',
    date: 'Jan 2025',
    readTime: '6 min',
    image: '/newsletter/india-visit.jpg',
    url: NEWSLETTER_URL,
    project: 'Food fortification',
  },
  {
    slug: 'govilab-demo-day',
    title: 'GoviLab Regional Demo Day: cohort one takes the stage',
    excerpt:
      'Hatch and Sarvodaya join the IDAT AgriTech accelerator for a regional showcase of Sri Lankan agri-innovation.',
    category: 'agriculture',
    date: 'Dec 2024',
    readTime: '5 min',
    image: '/newsletter/govilab.jpg',
    url: NEWSLETTER_URL,
    project: 'GoviLab · IDAT',
  },
  {
    slug: 'path-partnership',
    title: 'PATH, Gates and WFP: aligning on malnutrition',
    excerpt:
      'Partnership updates on rice fortification initiatives and coordination across Sri Lankan nutrition actors.',
    category: 'partnerships',
    date: 'Nov 2024',
    readTime: '5 min',
    image: '/newsletter/path-partnership.jpg',
    url: NEWSLETTER_URL,
    project: 'PATH partnership',
  },
]

export const DEFAULT_PROJECT_SPOTLIGHTS: ProjectSpotlight[] = [
  {
    tag: 'Nutrition',
    title: 'Fortified rice → national policy',
    summary: 'Treasury unblocked. MRI survey underway. Pathway to national-scale intervention.',
    href: '/impact',
  },
  {
    tag: 'Agriculture',
    title: 'IDAT & AgriTech accelerator',
    summary: 'Cross-ministry digital alignment. Cohort launched. AITS as national DPI.',
    href: '/impact',
  },
  {
    tag: 'Dairy',
    title: '5-Year Dairy Strategic Plan',
    summary: 'Ministerial endorsement across six meetings. CTC co-designing national reform.',
    href: '/impact',
  },
]

function loadStoredNewsletterData() {
  if (typeof window === 'undefined') {
    return {
      articles: DEFAULT_ARTICLES,
      projectSpotlights: DEFAULT_PROJECT_SPOTLIGHTS,
    }
  }

  const stored = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY)
  if (!stored) {
    return {
      articles: DEFAULT_ARTICLES,
      projectSpotlights: DEFAULT_PROJECT_SPOTLIGHTS,
    }
  }

  try {
    const parsed = JSON.parse(stored) as {
      articles?: NewsletterArticle[]
      projectSpotlights?: ProjectSpotlight[]
    }

    return {
      articles: Array.isArray(parsed.articles) ? parsed.articles : DEFAULT_ARTICLES,
      projectSpotlights: Array.isArray(parsed.projectSpotlights)
        ? parsed.projectSpotlights
        : DEFAULT_PROJECT_SPOTLIGHTS,
    }
  } catch {
    return {
      articles: DEFAULT_ARTICLES,
      projectSpotlights: DEFAULT_PROJECT_SPOTLIGHTS,
    }
  }
}

export function getNewsletterData() {
  return loadStoredNewsletterData()
}

export function saveNewsletterData(
  articles: NewsletterArticle[],
  projectSpotlights: ProjectSpotlight[],
) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    NEWSLETTER_STORAGE_KEY,
    JSON.stringify({ articles, projectSpotlights }),
  )
}

export const articles = DEFAULT_ARTICLES
export const projectSpotlights = DEFAULT_PROJECT_SPOTLIGHTS
