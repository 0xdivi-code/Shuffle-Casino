import { games, Game } from './games';

export interface GameSection {
  id: string;
  title: string;
  icon?: string;
  href: string;
  games: Game[];
}

function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const getGamesByTitles = (titles: string[]): Game[] => {
  const result: Game[] = [];
  const usedIds = new Set<string>();
  
  for (const t of titles) {
    const decoded = decodeHtml(t);
    // Try exact match, then decoded match, then case-insensitive
    let game = games.find(g => g.title === t || g.title === decoded);
    if (!game) {
      game = games.find(g => decodeHtml(g.title) === decoded);
    }
    if (!game) {
      game = games.find(g => g.title.toLowerCase() === decoded.toLowerCase());
    }
    if (game && !usedIds.has(game.id)) {
      result.push(game);
      usedIds.add(game.id);
    } else if (game && usedIds.has(game.id)) {
      // Duplicate id, find alternative with same title but different id
      const alt = games.filter(g => decodeHtml(g.title) === decoded && !usedIds.has(g.id))[0];
      if (alt) {
        result.push(alt);
        usedIds.add(alt.id);
      }
    }
  }
  return result;
};

export const gameSections: GameSection[] = [
  {
    id: "shuffle-games",
    title: "Shuffle Games",
    icon: "/icons/shuffle-logo.svg",
    href: "/casino/providers/shuffle-games",
    games: getGamesByTitles(["Dice", "Mines", "Keno", "Limbo", "Plinko", "Blackjack", "Coinflip", "Slide", "Floor Is Lava", "Blitz", "Hilo", "Waifu Tower", "Crash", "Chicken", "Baccarat", "Roulette", "Wheel"])
  },
  {
    id: "slots",
    title: "Slots",
    icon: "/icons/slots.svg",
    href: "/casino/categories/slots",
    games: getGamesByTitles(["Demonic Dolls", "Sugar Rush Super Scatter", "Duck Hunters 2", "Gates of Olympus Super Scatter", "Le Prechaun", "Shuffle Bonanza 2500", "Outsourced 2", "Wanted Dead or a Wild", "Clash of Gods: Power Duel", "F* Louvre", "Minted Mike", "Duck Hunters", "The Luxe H.V.", "Frog N Loaded", "Le Digger", "The Big Dog House", "Thunderline Express: Hold and Win", "Alien X-vasion", "Soaked By Seamen", "Duck Hunters: Happy Hour", "Moon Rush", "SWOLL", "Le Bandit", "Sugar Merge Up"])
  },
  {
    id: "live-casino",
    title: "Live Casino",
    icon: "/icons/live-casino.svg",
    href: "/casino/categories/live-casino",
    games: getGamesByTitles(["Shuffle Live Lobby", "Baccarat Lobby", "Roulette Lobby", "Shuffle Blackjack 1", "Gates of Olympus Roulette", "Playboy Roulette", "Shuffle VIP Blackjack", "Blackjack Live", "Baccarat Live", "Playboy Blackjack", "Shuffle Speed Blackjack 1", "Playboy Speed Baccarat 1", "Blackjack Lobby", "Lightning Roulette", "Speed Roulette", "Roulette Live", "Super Trunfo", "Ice Fishing", "Mega Roulette", "Lightning Storm", "Mega Sic Bac", "Super Andar Bahar", "Sweet Bonanza Candyland", "Playboy Speed Baccarat 2"])
  },
  {
    id: "game-shows",
    title: "Game Shows",
    icon: "/icons/game-show.svg",
    href: "/casino/categories/game-shows",
    games: getGamesByTitles(["Crazy Time", "CCTV Game - Footfall", "Disco Balls", "CCTV Game - Rush Hour", "Money Time", "CCTV Game - Snow Run", "CCTV Game - Duck River", "MONOPOLY Roulette", "Marble Plinko - Classic", "Ice Fishing", "Red Baron", "Lightning Storm", "Fast Lane", "Dice City", "Sweet Bonanza Candyland", "Survivor", "Crazy Pachinko", "Treasure Island", "Lightning Dice", "Balloon Race", "Crazy Coin Flip", "Mega Ball", "Color Game Bonanza", "Funky Time"])
  },
  {
    id: "shuffle-picks",
    title: "Shuffle Picks",
    icon: "/icons/star.svg",
    href: "/casino/categories/shuffle-picks",
    games: getGamesByTitles(["Brute Force: Alien Onslaught", "Fist of Destruction", "Preach TV", "7 Djinn Wishes", "De Rat Heist", "Le Fisherman", "Super Boosted Prizes: Hold and Win", "Farmageddon", "Flight Mode", "Rocket Reckon", "MLK Voyage 50000X", "Ice Vacation", "Strawberry Land", "Juicy Blades", "Bonsai Gold 2: Age of Prosperity", "Barbarossa Revenge", "In Jazz", "MLK Voyage", "Luna X", "Lucky And Brave Win Spins", "Retro Fruits 243 Fortune", "Shuffle Spinman", "Happy Bird", "Retro Tapes"])
  },
  {
    id: "latest-releases",
    title: "Latest Releases",
    icon: "/icons/latest-releases.svg",
    href: "/casino/categories/latest-releases",
    games: getGamesByTitles(["Hot Chili Heat: Spicy Hot Pots", "Crazy Burrows", "Viking Legacy: Hold and Win", "Apex Dregs", "Lucky Foxilian Hold And Win", "Blondes & Beers", "Scarab Ascension", "Bonanza Billion Merge Up+", "Chonky Kong: Hold and Win", "Possessed Fortunes", "Mahjong Wilds Link&Merge", "Money Train 5", "Concrete Cowboys", "Sugar Hell", "Star Pigs of the Clusterverse", "Thor's Rage 2", "NUUKD", "Big Bass Vegas 1000", "Hot Potato Battleground", "3 Fire Frogs", "Toy Crush", "Extra Chilli More Chilli", "Boombear Bros", "Big Wiz"])
  },
];
