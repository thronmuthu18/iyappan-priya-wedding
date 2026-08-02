// ============================================================================
// wedding.config.ts — Single Source of Truth
// ============================================================================

export interface ParentInfo {
  father: string
  mother: string
}

export interface EventInfo {
  id: string
  name: { en: string; ta: string }
  subtitle: { en: string; ta: string }
  date: string
  time?: { en: string; ta: string }
  venue: { en: string; ta: string }
  location: { en: string; ta: string }
  mapLink: string
}

export interface StoryChapter {
  num: string
  title: { en: string; ta: string }
  date: string
  location: { en: string; ta: string }
  text: { en: string; ta: string }
  imageKey: string
  alt: { en: string; ta: string }
}



export interface FamilyGroup {
  side: 'bride' | 'groom'
  heading: { en: string; ta: string }
  parents: {
    father: { en: string; ta: string; name: string }
    mother: { en: string; ta: string; name: string }
  }
}

export interface VenueConfig {
  name: { en: string; ta: string }
  address: { en: string; ta: string }
  description: { en: string; ta: string }
  mapLink: string
  mapEmbedUrl: string
}

export interface RSVPConfig {
  deadline: string
  successMessageAttending: { en: string; ta: string }
  successMessageDeclined: { en: string; ta: string }
}

export interface LoaderConfig {
  title: { en: string; ta: string }
  subtitle: { en: string; ta: string }
  initials: string
  musicPromptTitle: { en: string; ta: string }
  musicPromptDescription: { en: string; ta: string }
  enterWithMusicLabel: { en: string; ta: string }
  enterSilentlyLabel: { en: string; ta: string }
}

export interface HeroConfig {
  overheadTag: { en: string; ta: string }
  tagline: { en: string; ta: string }
  backgroundAlt: string
}

export interface FooterConfig {
  closingMessage: { en: string; ta: string }
  designCredit: string
}

export interface WeddingConfig {
  couple: {
    groom: { en: string; ta: string }
    bride: { en: string; ta: string }
  }
  parents: {
    groom: ParentInfo
    bride: ParentInfo
  }
  contactNumber: string
  religion: string
  region: string
  events: EventInfo[]
  venueEngagement: VenueConfig
  venueWedding: VenueConfig
  countdown: {
    targetEventName: string
    label: { en: string; ta: string }
    sublabel: string
  }
  story: {
    sectionTitle: { en: string; ta: string }
    sectionSubtitle: { en: string; ta: string }
    chapters: StoryChapter[]
  }

  family: {
    sectionTitle: { en: string; ta: string }
    sectionSubtitle: { en: string; ta: string }
    groups: FamilyGroup[]
  }
  rsvp: RSVPConfig
  loader: LoaderConfig
  hero: HeroConfig
  footer: FooterConfig
  music: {
    backgroundTrack: string
  }
  introduction: {
    blessing: { en: string; ta: string }
    message: { en: string; ta: string }
  }
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: { en: 'Iyappan', ta: 'இயப்பன்' },
    bride: { en: 'Priya', ta: 'பிரியா' },
  },
  parents: {
    groom: { father: 'Subramanian', mother: 'Thavasu Lakshmi' },
    bride: { father: 'Ramachandran', mother: 'Meenatchi' },
  },
  contactNumber: '+91 75029 02121',
  religion: 'Hindu',
  region: 'Tamil Nadu',
  events: [
    {
      id: 'engagement',
      name: { en: 'Engagement', ta: 'நிச்சயதார்த்தம்' },
      subtitle: { en: 'NISCHAYATHARTHAM', ta: 'நிச்சயதார்த்தம்' },
      date: '2026-08-23',
      time: { en: '10:00 AM – 12:00 PM', ta: 'முற்பகல் 10:00 – பிற்பகல் 12:00' },
      venue: { en: 'Ponnammal Kalyana Mandapam', ta: 'பொன்னம்மாள் கல்யாண மண்டபம்' },
      location: { en: 'Palayamkottai, Tirunelveli', ta: 'பாளையங்கோட்டை, திருநெல்வேலி' },
      mapLink: 'https://maps.app.goo.gl/gz5Miak7k3GBqVB58?g_st=ac',
    },
    {
      id: 'mehendi',
      name: { en: 'Mehendi', ta: 'மேகந்தி விழா' },
      subtitle: { en: 'MEHENDI CEREMONY', ta: 'மேகந்தி விழா' },
      date: '2026-10-29',
      venue: { en: 'Tirunelveli', ta: 'திருநெல்வேலி' },
      location: { en: 'Tirunelveli, Tamil Nadu', ta: 'திருநெல்வேலி, தமிழ்நாடு' },
      mapLink: 'https://maps.app.goo.gl/gz5Miak7k3GBqVB58?g_st=ac',
    },
    {
      id: 'wedding',
      name: { en: 'Wedding', ta: 'திருமணம்' },
      subtitle: { en: 'THIRUMANAM', ta: 'திருமணம்' },
      date: '2026-10-30',
      venue: { en: 'Murugan Temple', ta: 'முருகன் கோவில்' },
      location: { en: 'Tirunelveli, Tamil Nadu', ta: 'திருநெல்வேலி, தமிழ்நாடு' },
      mapLink: 'https://maps.app.goo.gl/r8ZRZck9DAFCowio7',
    },
  ],
  venueEngagement: {
    name: { en: 'Ponnammal Kalyana Mandapam', ta: 'பொன்னம்மாள் கல்யாண மண்டபம்' },
    address: { en: 'Palayamkottai, Tirunelveli, Tamil Nadu', ta: 'பாளையங்கோட்டை, திருநெல்வேலி, தமிழ்நாடு' },
    description: {
      en: "A beautiful traditional hall adorned with marigold flowers and banana leaves, hosting the sacred engagement ceremony.",
      ta: "மங்களகரமான பாளையங்கோட்டையில் அமைந்துள்ள நிச்சயதார்த்த விழா நடைபெறும் இடம்.",
    },
    mapLink: 'https://maps.app.goo.gl/gz5Miak7k3GBqVB58?g_st=ac',
    mapEmbedUrl: "https://maps.google.com/maps?q=Ponnammal%20Kalyana%20Mandapam,%20Palayamkottai&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  venueWedding: {
    name: { en: 'Murugan Temple', ta: 'முருகன் கோவில்' },
    address: { en: 'Tirunelveli, Tamil Nadu', ta: 'திருநெல்வேலி, தமிழ்நாடு' },
    description: {
      en: "The divine Murugan Temple where the holy wedding ceremony (Thirumanam) will take place.",
      ta: "தெய்வீக திருவருள் புரியும் முருகன் திருக்கோவில்.",
    },
    mapLink: 'https://maps.app.goo.gl/r8ZRZck9DAFCowio7',
    mapEmbedUrl: "https://maps.google.com/maps?q=Murugan%20Temple,%20Tirunelveli&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  countdown: {
    targetEventName: 'Wedding',
    label: { en: 'Until We Say I Do', ta: 'திருமணம் வரை' },
    sublabel: '2026-10-30',
  },
  story: {
    sectionTitle: { en: 'Our Love Story', ta: 'எங்கள் காதல் கதை' },
    sectionSubtitle: { en: 'OUR JOURNEY TOGETHER', ta: 'எங்கள் பயணம்' },
    chapters: [
      {
        num: '01',
        title: { en: 'The First Meeting', ta: 'தெய்வீக சந்திப்பு' },
        date: 'THE BEGINNING',
        location: { en: 'TEMPLE SANCTUM', ta: 'கோவில் சன்னதி' },
        text: {
          en: "Iyappan and Priya first met in the divine aura of the temple, marking the beginning of their beautiful bond.",
          ta: "இயப்பனும் பிரியாவும் ஒரு முருகன் கோவிலில் முதன்முதலில் சந்தித்துக் கொண்டனர். அது அவர்களின் தெய்வீக பந்தத்திற்கு அடித்தளமாக அமைந்தது.",
        },
        imageKey: 'story_chapter_1',
        alt: { en: 'The First Meeting in Temple', ta: 'கோவிலில் முதல் சந்திப்பு' },
      },
      {
        num: '02',
        title: { en: '11 Years Journey', ta: '11 வருட காதல் பயணம்' },
        date: 'THE JOURNEY',
        location: { en: 'SHARED MOMENTS', ta: 'பகிரப்பட்ட நினைவுகள்' },
        text: {
          en: "For 11 years, they walked together, sharing silences, trust, and constructing an unbreakable bond of love.",
          ta: "கடந்த 11 ஆண்டுகளாக, அவர்கள் ஒருவருக்கொருவர் துணையாக நின்று, பரஸ்பர நம்பிக்கையுடனும் அன்புடனும் இந்த அழகிய காதல் பயணத்தை மேற்கொண்டனர்.",
        },
        imageKey: 'story_chapter_2',
        alt: { en: '11 Years of Togetherness', ta: '11 வருட காதல் பயணம்' },
      },
      {
        num: '03',
        title: { en: 'Families\' Blessing', ta: 'குடும்பத்தினர் ஆசீர்வாதம்' },
        date: 'THE PROMISE',
        location: { en: 'THE UNION', ta: 'இணைதல்' },
        text: {
          en: "With the loving hearts and complete blessings of both families, they are now uniting in sacred matrimony.",
          ta: "இரு குடும்பங்களின் முழு சம்மதத்துடனும் மனமார்ந்த ஆசீர்வாதங்களுடனும் இப்போது அவர்கள் திருமண பந்தத்தில் இணைகிறார்கள்.",
        },
        imageKey: 'story_chapter_3',
        alt: { en: 'Blessed by Families', ta: 'இரு குடும்பங்களின் ஆசீர்வாதம்' },
      },
    ],
  },

  family: {
    sectionTitle: { en: 'Family Members', ta: 'குடும்ப உறவுகள்' },
    sectionSubtitle: { en: 'THE FAMILIES', ta: 'உறவுகள்' },
    groups: [
      {
        side: 'bride',
        heading: { en: 'Bride\'s Family', ta: 'மணப்பெண் குடும்பம்' },
        parents: {
          father: { en: 'Ramachandran', ta: 'இராமச்சந்திரன்', name: 'Ramachandran' },
          mother: { en: 'Meenatchi', ta: 'மீனாட்சி', name: 'Meenatchi' },
        },
      },
      {
        side: 'groom',
        heading: { en: 'Groom\'s Family', ta: 'மணமகன் குடும்பம்' },
        parents: {
          father: { en: 'Subramanian', ta: 'சுப்பிரமணியன்', name: 'Subramanian' },
          mother: { en: 'Thavasu Lakshmi', ta: 'தவசு லட்சுமி', name: 'Thavasu Lakshmi' },
        },
      },
    ],
  },
  rsvp: {
    deadline: '2026-10-01',
    successMessageAttending: {
      en: "Thank you! Your response has been recorded. We cannot wait to celebrate with you!",
      ta: "நன்றி! உங்கள் பதிவு ஏற்றுக்கொள்ளப்பட்டது. உங்களை விழா மேடையில் காண ஆவலோடு காத்திருக்கிறோம்!",
    },
    successMessageDeclined: {
      en: "Thank you for letting us know. You will be dearly missed, but we carry your blessings in our hearts.",
      ta: "தகவலுக்கு நன்றி. உங்கள் வரவை மிஸ் செய்வோம், ஆனால் உங்கள் ஆசீர்வாதம் எங்களோடு இருக்கும்.",
    },
  },
  loader: {
    title: { en: 'A Gathering of Hearts', ta: 'இரு மனங்களின் இணைவு' },
    subtitle: {
      en: "We invite you to share in the beginning of our forever. Enable ambient music to fully experience our journey.",
      ta: "எங்கள் வாழ்வின் புதிய தொடக்கத்தைப் பகிர உங்களை அன்போடு அழைக்கிறோம். இன்னிசையுடன் அனுபவிக்க இசையை இயக்கவும்.",
    },
    initials: 'I & P',
    musicPromptTitle: { en: 'A Gathering of Hearts', ta: 'இரு மனங்களின் இணைவு' },
    musicPromptDescription: {
      en: "We invite you to share in the beginning of our forever. Enable ambient music to fully experience our journey.",
      ta: "எங்கள் வாழ்வின் புதிய தொடக்கத்தைப் பகிர உங்களை அன்போடு அழைக்கிறோம். இன்னிசையுடன் அனுபவிக்க இசையை இயக்கவும்.",
    },
    enterWithMusicLabel: { en: 'Enter with Music', ta: 'இசையுடன் நுழையவும்' },
    enterSilentlyLabel: { en: 'Enter Silently', ta: 'இசையின்றி நுழையவும்' },
  },
  hero: {
    overheadTag: { en: 'THE CELEBRATION OF', ta: 'மங்களத் திருமணம்' },
    tagline: {
      en: "With the blessings of Lord Ganesha, we begin our journey together.",
      ta: "ஸ்ரீ கணேஷாய நமஃ - இரு குடும்பங்களின் ஆசியோடு தொடங்கும் இல்லறம்.",
    },
    backgroundAlt: 'Wedding background',
  },
  footer: {
    closingMessage: {
      en: "With all our love, thank you for being a part of our story. We cannot wait to celebrate with you.",
      ta: "எங்கள் திருமண விழாவில் பங்கேற்று எங்களை வாழ்த்துமாறு அன்புடன் கேட்டுக்கொள்கிறோம்.",
    },
    designCredit: 'Designed for a lifetime of love.',
  },
  music: {
    backgroundTrack: '/assets/music/temple_bell.mp3',
  },
  introduction: {
    blessing: { en: 'With the blessings of Lord Ganesha', ta: 'விநாயகப் பெருமான் துணையுடன்' },
    message: {
      en: "We cordially invite you and your family to celebrate our Engagement and Wedding Ceremony.",
      ta: "எங்களது நிச்சயதார்த்தம் மற்றும் திருமண விழாவிற்கு தங்களை அன்போடு அழைக்கிறோம்.",
    },
  },
}

export function weddingVenueAddress(side: 'engagement' | 'wedding'): string {
  return side === 'engagement'
    ? 'Ponnammal Kalyana Mandapam, Palayamkottai, Tirunelveli, Tamil Nadu'
    : 'Murugan Temple, Tirunelveli, Tamil Nadu'
}

export function getEvent(name: string): EventInfo | undefined {
  return weddingConfig.events.find((e) => e.id === name || e.name.en === name)
}
