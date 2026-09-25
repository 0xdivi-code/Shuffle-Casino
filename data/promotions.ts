export interface Promotion {
  id: string;
  title: string;
  alt: string;
  href: string;
  image: {
    primary: string;
    alternate?: string;
    local?: string;
    fallback: string;
  };
}

export const promotions: Promotion[] = [
  {
    id: "The Level Up!",
    title: "The Level Up!",
    alt: "The Level Up!",
    href: "/promotions/level-up",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/6TXhoCezdXO27MwDalDtSL/0f6fab1cb27cd192d3e7bea830af8c8b/BoostyrLevel-update9.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/6TXhoCezdXO27MwDalDtSL/0f6fab1cb27cd192d3e7bea830af8c8b/BoostyrLevel-update9.png?w=800",
      local: "/assets/promotions/BoostyrLevel-update9.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "20K-DEMONIC-DOLLS",
    title: "20K-DEMONIC-DOLLS",
    alt: "20K Demonic Dolls",
    href: "/promotions/demonic-dolls",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/CCkv33cIvc9sM2GOAaSal/38ac968b9f3ce404ad069086ba84bfeb/20K-DEMONIC-DOLLS.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/CCkv33cIvc9sM2GOAaSal/38ac968b9f3ce404ad069086ba84bfeb/20K-DEMONIC-DOLLS.png?w=800",
      local: "/assets/promotions/20K-DEMONIC-DOLLS.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "20K-PLAYNETIC-RACE",
    title: "20K-PLAYNETIC-RACE",
    alt: "20K Playnetic Race",
    href: "/promotions/playnetic-race",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/6nDFO77zVUP4KsO93o5lHH/0ab5df4dea56c949bc64164e7f6c79e9/20K-PLAYNETIC-RACE.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/6nDFO77zVUP4KsO93o5lHH/0ab5df4dea56c949bc64164e7f6c79e9/20K-PLAYNETIC-RACE.png?w=800",
      local: "/assets/promotions/20K-PLAYNETIC-RACE.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "1M_WEEKLY_AIRDROP",
    title: "1M_WEEKLY_AIRDROP",
    alt: "$1M Weekly Airdrop",
    href: "/airdrop",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/GVAvntRAl05ojLhyenja0/d7ec4d1a667d375b266b3e7f74a76470/1M_WEEKLY_AIRDROP.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/GVAvntRAl05ojLhyenja0/d7ec4d1a667d375b266b3e7f74a76470/1M_WEEKLY_AIRDROP.png?w=800",
      local: "/assets/promotions/1M_WEEKLY_AIRDROP.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "lot2m",
    title: "lot2m",
    alt: "Lottery $2M",
    href: "/lottery",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/3vejjImYbcT3c4beCWyBGn/795ddf1d80537a1cd88855483a510d14/lot2m.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/3vejjImYbcT3c4beCWyBGn/795ddf1d80537a1cd88855483a510d14/lot2m.png?w=800",
      local: "/assets/promotions/lot2m.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "100KWEEKLY_RACE",
    title: "100KWEEKLY_RACE",
    alt: "$100K Weekly Race",
    href: "/promotions/weekly-race",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/7C5N4FR6UlRzphuMBfATAh/f01726191cc9b39e4b10802813f9e6d1/100KWEEKLY_RACE.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/7C5N4FR6UlRzphuMBfATAh/f01726191cc9b39e4b10802813f9e6d1/100KWEEKLY_RACE.png?w=800",
      local: "/assets/promotions/100KWEEKLY_RACE.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "NEW_CCHALLENGES",
    title: "NEW_CCHALLENGES",
    alt: "Casino Challenges",
    href: "/challenges",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/40kCpFeSY4wMpT0E0T0YvL/7c2bc0cbecf4792e4f998403eb21ec91/NEW_CCHALLENGES.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/40kCpFeSY4wMpT0E0T0YvL/7c2bc0cbecf4792e4f998403eb21ec91/NEW_CCHALLENGES.png?w=800",
      local: "/assets/promotions/NEW_CCHALLENGES.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
  {
    id: "Affiliate_Banner_ENG",
    title: "Affiliate_Banner_ENG",
    alt: "Affiliate Program",
    href: "/affiliate",
    image: {
      primary: "https://images.ctfassets.net/9mngrv1pdae6/39yHZomNHe5z7xznIGH6I6/197c25b532eb8e7c38af7f8f95b3e768/Affiliate_Banner_ENG.png",
      alternate: "https://images.ctfassets.net/9mngrv1pdae6/39yHZomNHe5z7xznIGH6I6/197c25b532eb8e7c38af7f8f95b3e768/Affiliate_Banner_ENG.png?w=800",
      local: "/assets/promotions/Affiliate_Banner_ENG.png",
      fallback: "/assets/fallbacks/promotion.webp"
    }
  },
];
