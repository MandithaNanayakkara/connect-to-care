export type BoardMember = {
  name: string
  role: string
  bio: string
  image?: string
  chairman?: boolean
  subtitle?: string
}

export type Leader = {
  name: string
  role: string
  bio: string
  image?: string
}

const PEOPLE_STORAGE_KEY = 'connect-to-care-people-data'

export const DEFAULT_BOARD: BoardMember[] = [
  {
    name: 'Chandita Samaranayake',
    role: 'Chairman & Founder',
    subtitle: 'Director, Connect to Care Global',
    bio: 'Driving force behind Connect to Care — purpose-driven boutique consultancy creating mutual benefit for corporates, nonprofits and government partners across Sri Lanka and beyond.',
    image: 'team/Chandita.jpg',
    chairman: true,
  },
  {
    name: 'Damitha',
    role: 'Director',
    bio: 'Board leadership guiding governance, strategy and long-term direction for Connect to Care.',
  },
  {
    name: 'Rehan',
    role: 'Director',
    bio: 'Board leadership supporting institutional growth and partner stewardship.',
    image: 'team/Rehan.jpg',
  },
  {
    name: 'Lakshi Nethicumara',
    role: 'Director',
    bio: 'Design and business leadership across hospitality; contributes financial audits and investment management to strengthen CTC operations.',
    image: 'team/Lakshi.jpg',
  },
  {
    name: 'Anjali Nayyar',
    role: 'Director',
    bio: 'Executive VP at Global Health Strategies with 20+ years shaping health policy and integrated strategies across the global south.',
    image: 'team/anjali.jpg',
  },
]

export const DEFAULT_LEADERSHIP: Leader[] = [
  {
    name: 'Emaali Gunasekara',
    role: 'CEO',
    bio: '15+ years in operations and marketing, driving purpose-driven initiatives at scale.',
    image: 'team/Emaali.jpg',
  },
  {
    name: 'Laksiri Abeysekera',
    role: 'Strategic Advisor',
    bio: '40+ years in strategic financial management across Africa, Asia and the Middle East.',
    image: 'team/Laksiri.jpg',
  },
  {
    name: 'Shazmina Faizer',
    role: 'Head of Operations',
    bio: 'Leads organisational effectiveness and operational delivery across all CTC programmes.',
    image: 'team/Shazmina.jpg',
  },
  {
    name: 'Timothy John Millar',
    role: 'Team Lead',
    bio: 'Advocate for justice and human rights; bridges the institutional gap to catalyse positive social impact.',
    image: 'team/Tim.jpg',
  },
  {
    name: 'Chandana Priyantha Arangalla',
    role: 'Project Director — IDAT',
    bio: "34+ years in national security and agricultural modernisation; leads Sri Lanka's IDAT programme.",
  },
]

function loadStoredPeopleData() {
  if (typeof window === 'undefined') {
    return { board: DEFAULT_BOARD, leadership: DEFAULT_LEADERSHIP }
  }

  const stored = window.localStorage.getItem(PEOPLE_STORAGE_KEY)
  if (!stored) {
    return { board: DEFAULT_BOARD, leadership: DEFAULT_LEADERSHIP }
  }

  try {
    const parsed = JSON.parse(stored) as {
      board?: BoardMember[]
      leadership?: Leader[]
    }

    return {
      board: Array.isArray(parsed.board) ? parsed.board : DEFAULT_BOARD,
      leadership: Array.isArray(parsed.leadership) ? parsed.leadership : DEFAULT_LEADERSHIP,
    }
  } catch {
    return { board: DEFAULT_BOARD, leadership: DEFAULT_LEADERSHIP }
  }
}

export function getPeopleData() {
  return loadStoredPeopleData()
}

export function savePeopleData(board: BoardMember[], leadership: Leader[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify({ board, leadership }))
}
