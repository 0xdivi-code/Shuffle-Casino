export interface GameImage {
  primary: string;
  alternate?: string;
  local?: string;
  fallback: string;
}

export interface Game {
  id: string;
  title: string;
  href: string;
  image: GameImage;
  borderColor?: string;
  provider?: string;
  category?: string;
  isOriginal?: boolean;
}

export const games: Game[] = [
  {
    id: "dice",
    title: "Dice",
    href: "/games/originals/dice",
    image: {
      primary: "https://shuffle-com.imgix.net/437b7bc5-ded9-4555-ae0d-5e21cd272291?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/437b7bc5-ded9-4555-ae0d-5e21cd272291?auto=format&width=640",
      local: "/assets/games/dice.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#05D550",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "mines",
    title: "Mines",
    href: "/games/originals/mines",
    image: {
      primary: "https://shuffle-com.imgix.net/b69b5fd1-a433-4ff0-96f5-6ef2a351fb6e?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b69b5fd1-a433-4ff0-96f5-6ef2a351fb6e?auto=format&width=640",
      local: "/assets/games/mines.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#E42735",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "keno",
    title: "Keno",
    href: "/games/originals/keno",
    image: {
      primary: "https://shuffle-com.imgix.net/711f52fd-bf4b-412e-8e48-399aab1f3abb?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/711f52fd-bf4b-412e-8e48-399aab1f3abb?auto=format&width=640",
      local: "/assets/games/keno.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FD8C1A",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "limbo",
    title: "Limbo",
    href: "/games/originals/limbo",
    image: {
      primary: "https://shuffle-com.imgix.net/bbd65099-e147-4518-abde-3c9c9f67d50a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/bbd65099-e147-4518-abde-3c9c9f67d50a?auto=format&width=640",
      local: "/assets/games/limbo.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FD8C1A",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "plinko",
    title: "Plinko",
    href: "/games/originals/plinko",
    image: {
      primary: "https://shuffle-com.imgix.net/5355bb8c-4be3-479d-b967-20112873fcf5?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/5355bb8c-4be3-479d-b967-20112873fcf5?auto=format&width=640",
      local: "/assets/games/plinko.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#DF2079",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "blackjack",
    title: "Blackjack",
    href: "/games/originals/blackjack",
    image: {
      primary: "https://shuffle-com.imgix.net/6ff68630-512a-4e51-906d-e460beb0cf50?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/6ff68630-512a-4e51-906d-e460beb0cf50?auto=format&width=640",
      local: "/assets/games/blackjack.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#E33D4B",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "coinflip",
    title: "Coinflip",
    href: "/games/originals/coinflip",
    image: {
      primary: "https://shuffle-com.imgix.net/58541899-3d87-4975-a58b-fb22589cb849?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/58541899-3d87-4975-a58b-fb22589cb849?auto=format&width=640",
      local: "/assets/games/coinflip.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff1759",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "slide",
    title: "Slide",
    href: "/games/originals/slide",
    image: {
      primary: "https://shuffle-com.imgix.net/8d56b7cb-1c57-4171-bb88-17eb92445a0d?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/8d56b7cb-1c57-4171-bb88-17eb92445a0d?auto=format&width=640",
      local: "/assets/games/slide.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#00CDF2",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "floor-is-lava",
    title: "Floor Is Lava",
    href: "/games/originals/floor-is-lava",
    image: {
      primary: "https://shuffle-com.imgix.net/82a5198c-3057-4e11-b817-2c1e560d4ec9?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/82a5198c-3057-4e11-b817-2c1e560d4ec9?auto=format&width=640",
      local: "/assets/games/floor-is-lava.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff9c00",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "blitz",
    title: "Blitz",
    href: "/games/originals/blitz",
    image: {
      primary: "https://shuffle-com.imgix.net/85486902-e7e3-47eb-a4fd-3f5d03486abb?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/85486902-e7e3-47eb-a4fd-3f5d03486abb?auto=format&width=640",
      local: "/assets/games/blitz.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#e71ddc",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "hilo",
    title: "Hilo",
    href: "/games/originals/hilo",
    image: {
      primary: "https://shuffle-com.imgix.net/fbe2ffcc-fa44-45d7-b3f5-5a6a49c7e2fb?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/fbe2ffcc-fa44-45d7-b3f5-5a6a49c7e2fb?auto=format&width=640",
      local: "/assets/games/hilo.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#26B3EC",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "tower",
    title: "Waifu Tower",
    href: "/games/originals/tower",
    image: {
      primary: "https://shuffle-com.imgix.net/87b41ffb-ae88-4f2e-a649-242d4c35e27c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/87b41ffb-ae88-4f2e-a649-242d4c35e27c?auto=format&width=640",
      local: "/assets/games/tower.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#5335FF",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "crash",
    title: "Crash",
    href: "/games/originals/crash",
    image: {
      primary: "https://shuffle-com.imgix.net/7e6aeb42-0332-4697-9fe5-1fc82cc2b1c0?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/7e6aeb42-0332-4697-9fe5-1fc82cc2b1c0?auto=format&width=640",
      local: "/assets/games/crash.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9A61F7",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "chicken",
    title: "Chicken",
    href: "/games/originals/chicken",
    image: {
      primary: "https://shuffle-com.imgix.net/5ebcfe9d-1f82-4c9b-b33a-cb44898fd4e1?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/5ebcfe9d-1f82-4c9b-b33a-cb44898fd4e1?auto=format&width=640",
      local: "/assets/games/chicken.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#edb703",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "baccarat",
    title: "Baccarat",
    href: "/games/originals/baccarat",
    image: {
      primary: "https://shuffle-com.imgix.net/d2ebc1e2-435f-4ff8-905a-e3c67599a949?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/d2ebc1e2-435f-4ff8-905a-e3c67599a949?auto=format&width=640",
      local: "/assets/games/baccarat.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#03BF25",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "roulette",
    title: "Roulette",
    href: "/games/originals/roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/2437577c-af10-436e-bfa1-757749399ce1?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/2437577c-af10-436e-bfa1-757749399ce1?auto=format&width=640",
      local: "/assets/games/roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#8C26F0",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "wheel",
    title: "Wheel",
    href: "/games/originals/wheel",
    image: {
      primary: "https://shuffle-com.imgix.net/d0bac6f5-4052-4fc0-b3ef-bdb5c3049e88?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/d0bac6f5-4052-4fc0-b3ef-bdb5c3049e88?auto=format&width=640",
      local: "/assets/games/wheel.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#4168E4",
    provider: "Snuffle Games",
    isOriginal: true
  },
  {
    id: "hacksaw-demonic-dolls",
    title: "Demonic Dolls",
    href: "/games/hacksaw-demonic-dolls",
    image: {
      primary: "https://shuffle-com.imgix.net/166c19a1-3aa7-4d64-9562-b7a3150d9f02?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/166c19a1-3aa7-4d64-9562-b7a3150d9f02?auto=format&width=640",
      local: "/assets/games/hacksaw-demonic-dolls.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#fe0083",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-sugar-rush-super-scatter",
    title: "Sugar Rush Super Scatter",
    href: "/games/pragmaticplay-sugar-rush-super-scatter",
    image: {
      primary: "https://shuffle-com.imgix.net/fda63d25-42ba-40a1-98d6-479ad42930f7?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/fda63d25-42ba-40a1-98d6-479ad42930f7?auto=format&width=640",
      local: "/assets/games/pragmaticplay-sugar-rush-super-scatter.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#E258FC",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-duck-hunters-2",
    title: "Duck Hunters 2",
    href: "/games/nolimit-duck-hunters-2",
    image: {
      primary: "https://shuffle-com.imgix.net/c0d5e106-5ed4-4923-b2cd-a11d2742ce20?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/c0d5e106-5ed4-4923-b2cd-a11d2742ce20?auto=format&width=640",
      local: "/assets/games/nolimit-duck-hunters-2.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff6c00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-gatesof-olympus-super-scatter",
    title: "Gates of Olympus Super Scatter",
    href: "/games/pragmaticexternal-gatesof-olympus-super-scatter",
    image: {
      primary: "https://shuffle-com.imgix.net/bcc9a64c-d1fd-41b1-9980-d9c7c66d380b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/bcc9a64c-d1fd-41b1-9980-d9c7c66d380b?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-gatesof-olympus-super-scatter.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#E600FF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-le-prechaun",
    title: "Le Prechaun",
    href: "/games/hacksaw-le-prechaun",
    image: {
      primary: "https://shuffle-com.imgix.net/b388c27f-88ee-4158-9075-1d5683c4c71b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b388c27f-88ee-4158-9075-1d5683c4c71b?auto=format&width=640",
      local: "/assets/games/hacksaw-le-prechaun.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#6cdb00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-shuffle-bonanza-2500",
    title: "Snuffle Bonanza 2500",
    href: "/games/pragmaticplay-shuffle-bonanza-2500",
    image: {
      primary: "https://shuffle-com.imgix.net/b95f2f3f-d138-411f-81d7-1e2a32687d67?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b95f2f3f-d138-411f-81d7-1e2a32687d67?auto=format&width=640",
      local: "/assets/games/pragmaticplay-shuffle-bonanza-2500.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#fb41c7",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-outsourced-2",
    title: "Outsourced 2",
    href: "/games/nolimit-outsourced-2",
    image: {
      primary: "https://shuffle-com.imgix.net/3d4cdc5c-622d-40c9-b266-df3c95d3f574?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/3d4cdc5c-622d-40c9-b266-df3c95d3f574?auto=format&width=640",
      local: "/assets/games/nolimit-outsourced-2.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#0099f1",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-wanted-dead-or-a-wild",
    title: "Wanted Dead or a Wild",
    href: "/games/hacksaw-wanted-dead-or-a-wild",
    image: {
      primary: "https://shuffle-com.imgix.net/61aeb893-7b42-49a4-86cf-0b0a01eaf97b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/61aeb893-7b42-49a4-86cf-0b0a01eaf97b?auto=format&width=640",
      local: "/assets/games/hacksaw-wanted-dead-or-a-wild.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF1818",
    provider: "External",
    isOriginal: false
  },
  {
    id: "softswiss-clashof-gods-anubisvs-hades",
    title: "Clash of Gods: Power Duel",
    href: "/games/softswiss-clashof-gods-anubisvs-hades",
    image: {
      primary: "https://shuffle-com.imgix.net/f5f48a8d-5dad-495f-acc7-e78b4d6e8def?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/f5f48a8d-5dad-495f-acc7-e78b4d6e8def?auto=format&width=640",
      local: "/assets/games/softswiss-clashof-gods-anubisvs-hades.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#8300ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "7-rings-f-louvre",
    title: "F* Louvre",
    href: "/games/7-rings-f-louvre",
    image: {
      primary: "https://shuffle-com.imgix.net/54e903c1-e216-46aa-a0f8-fd1617c2bf63?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/54e903c1-e216-46aa-a0f8-fd1617c2bf63?auto=format&width=640",
      local: "/assets/games/7-rings-f-louvre.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ae1313",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-minted-mike",
    title: "Minted Mike",
    href: "/games/hacksaw-minted-mike",
    image: {
      primary: "https://shuffle-com.imgix.net/165b402a-6947-45b7-8bd5-75ebe4a12233?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/165b402a-6947-45b7-8bd5-75ebe4a12233?auto=format&width=640",
      local: "/assets/games/hacksaw-minted-mike.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#289cff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-duck-hunters",
    title: "Duck Hunters",
    href: "/games/nolimit-duck-hunters",
    image: {
      primary: "https://shuffle-com.imgix.net/abf47a6c-9752-4f95-b280-3a370d1cbdc9?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/abf47a6c-9752-4f95-b280-3a370d1cbdc9?auto=format&width=640",
      local: "/assets/games/nolimit-duck-hunters.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FEBC00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-the-luxe-hv",
    title: "The Luxe H.V.",
    href: "/games/hacksaw-the-luxe-hv",
    image: {
      primary: "https://shuffle-com.imgix.net/13179076-bbbc-44ff-bb72-a3ecff83c266?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/13179076-bbbc-44ff-bb72-a3ecff83c266?auto=format&width=640",
      local: "/assets/games/hacksaw-the-luxe-hv.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#F6B300",
    provider: "External",
    isOriginal: false
  },
  {
    id: "n-2-games-frog-n-loaded",
    title: "Frog N Loaded",
    href: "/games/n-2-games-frog-n-loaded",
    image: {
      primary: "https://shuffle-com.imgix.net/bd7af552-0378-481c-9668-cfd642e46da4?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/bd7af552-0378-481c-9668-cfd642e46da4?auto=format&width=640",
      local: "/assets/games/n-2-games-frog-n-loaded.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#EC8432",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-le-digger",
    title: "Le Digger",
    href: "/games/hacksaw-le-digger",
    image: {
      primary: "https://shuffle-com.imgix.net/ece892b2-151d-4891-83da-f57d0976eb4c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/ece892b2-151d-4891-83da-f57d0976eb4c?auto=format&width=640",
      local: "/assets/games/hacksaw-le-digger.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#00BC92",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-the-big-dog-house",
    title: "The Big Dog House",
    href: "/games/pragmaticplay-the-big-dog-house",
    image: {
      primary: "https://shuffle-com.imgix.net/80156824-180e-451f-875a-82864c83f705?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/80156824-180e-451f-875a-82864c83f705?auto=format&width=640",
      local: "/assets/games/pragmaticplay-the-big-dog-house.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#92ce1e",
    provider: "External",
    isOriginal: false
  },
  {
    id: "penguin-king-oct-thunderlineexpressholdandwin",
    title: "Thunderline Express: Hold and Win",
    href: "/games/penguin-king-oct-thunderlineexpressholdandwin",
    image: {
      primary: "https://shuffle-com.imgix.net/74267e86-e7c9-4a04-b176-59ca2eabefaf?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/74267e86-e7c9-4a04-b176-59ca2eabefaf?auto=format&width=640",
      local: "/assets/games/penguin-king-oct-thunderlineexpressholdandwin.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#1287ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "7-rings-alien-xvasion",
    title: "Alien X-vasion",
    href: "/games/7-rings-alien-xvasion",
    image: {
      primary: "https://shuffle-com.imgix.net/1fbb5e4f-cc27-4bae-8f01-ea897abcf63a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/1fbb5e4f-cc27-4bae-8f01-ea897abcf63a?auto=format&width=640",
      local: "/assets/games/7-rings-alien-xvasion.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9419fd",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-soaked-by-seamen",
    title: "Soaked By Seamen",
    href: "/games/nolimit-soaked-by-seamen",
    image: {
      primary: "https://shuffle-com.imgix.net/f7e0769b-c6a9-43f4-9b92-eee96eb99c89?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/f7e0769b-c6a9-43f4-9b92-eee96eb99c89?auto=format&width=640",
      local: "/assets/games/nolimit-soaked-by-seamen.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ffa001",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-duck-hunters-happy-hour",
    title: "Duck Hunters: Happy Hour",
    href: "/games/nolimit-duck-hunters-happy-hour",
    image: {
      primary: "https://shuffle-com.imgix.net/0bea709e-3cf5-4fa8-8dcf-85343a18c280?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/0bea709e-3cf5-4fa8-8dcf-85343a18c280?auto=format&width=640",
      local: "/assets/games/nolimit-duck-hunters-happy-hour.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#D93C32",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-moon-rush",
    title: "Moon Rush",
    href: "/games/pragmaticplay-moon-rush",
    image: {
      primary: "https://shuffle-com.imgix.net/60217505-a88c-4289-9358-4ed7de6e1ef6?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/60217505-a88c-4289-9358-4ed7de6e1ef6?auto=format&width=640",
      local: "/assets/games/pragmaticplay-moon-rush.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#873fff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "shady-lady-shdla-swoll",
    title: "SWOLL",
    href: "/games/shady-lady-shdla-swoll",
    image: {
      primary: "https://shuffle-com.imgix.net/2ef1a39f-0334-4330-99f8-429a864f8b3c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/2ef1a39f-0334-4330-99f8-429a864f8b3c?auto=format&width=640",
      local: "/assets/games/shady-lady-shdla-swoll.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF950C",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-le-bandit",
    title: "Le Bandit",
    href: "/games/hacksaw-le-bandit",
    image: {
      primary: "https://shuffle-com.imgix.net/5bee834e-caa2-47b0-b5ea-a51916febfec?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/5bee834e-caa2-47b0-b5ea-a51916febfec?auto=format&width=640",
      local: "/assets/games/hacksaw-le-bandit.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FC5102",
    provider: "External",
    isOriginal: false
  },
  {
    id: "softswiss-sugar-merge-up",
    title: "Sugar Merge Up",
    href: "/games/softswiss-sugar-merge-up",
    image: {
      primary: "https://shuffle-com.imgix.net/b4d2051d-421e-4b9c-ac1b-a702cefb314f?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b4d2051d-421e-4b9c-ac1b-a702cefb314f?auto=format&width=640",
      local: "/assets/games/softswiss-sugar-merge-up.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#018FFF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-shuffle-lobby",
    title: "Snuffle Live Lobby",
    href: "/games/pragmaticplay-shuffle-lobby",
    image: {
      primary: "https://shuffle-com.imgix.net/9faaefa1-8342-4076-b2f6-c44501da89ba?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/9faaefa1-8342-4076-b2f6-c44501da89ba?auto=format&width=640",
      local: "/assets/games/pragmaticplay-shuffle-lobby.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#7c1efc",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-baccarat-lobby",
    title: "Baccarat Lobby",
    href: "/games/pragmaticexternal-baccarat-lobby",
    image: {
      primary: "https://shuffle-com.imgix.net/b0d2441f-5e8c-455d-871d-b79602d5d891?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b0d2441f-5e8c-455d-871d-b79602d5d891?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-baccarat-lobby.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#B71316",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-lobby-roulette",
    title: "Roulette Lobby",
    href: "/games/pragmaticexternal-lobby-roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/b87dd7d1-0a18-41ee-9c4c-c315695de9a4?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b87dd7d1-0a18-41ee-9c4c-c315695de9a4?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-lobby-roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#00875D",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-shuffle-blackjack-1",
    title: "Snuffle Blackjack 1",
    href: "/games/pragmaticplay-shuffle-blackjack-1",
    image: {
      primary: "https://shuffle-com.imgix.net/0bd085df-3b7e-4d50-9723-918a50f8b158?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/0bd085df-3b7e-4d50-9723-918a50f8b158?auto=format&width=640",
      local: "/assets/games/pragmaticplay-shuffle-blackjack-1.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#a155ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-gates-of-olympus-roulette",
    title: "Gates of Olympus Roulette",
    href: "/games/pragmaticplay-gates-of-olympus-roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/cefe4c07-5ea7-4fc5-af6f-60f66116399b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/cefe4c07-5ea7-4fc5-af6f-60f66116399b?auto=format&width=640",
      local: "/assets/games/pragmaticplay-gates-of-olympus-roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#f48555",
    provider: "External",
    isOriginal: false
  },
  {
    id: "microgaming-playboy-roulette",
    title: "Playboy Roulette",
    href: "/games/microgaming-playboy-roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/0e39d193-3d14-4a65-b2ee-615179766e83?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/0e39d193-3d14-4a65-b2ee-615179766e83?auto=format&width=640",
      local: "/assets/games/microgaming-playboy-roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#DE3024",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-shuffle-vip-blackjack",
    title: "Snuffle VIP Blackjack",
    href: "/games/pragmaticplay-shuffle-vip-blackjack",
    image: {
      primary: "https://shuffle-com.imgix.net/fc4449af-e54b-4ca2-861c-71f6fd27877a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/fc4449af-e54b-4ca2-861c-71f6fd27877a?auto=format&width=640",
      local: "/assets/games/pragmaticplay-shuffle-vip-blackjack.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#e41efe",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-blackjack-live",
    title: "Blackjack Live",
    href: "/games/evolution-blackjack-live",
    image: {
      primary: "https://shuffle-com.imgix.net/6b4be803-8ffb-4e7f-b402-307b11d0a74d?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/6b4be803-8ffb-4e7f-b402-307b11d0a74d?auto=format&width=640",
      local: "/assets/games/evolution-blackjack-live.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#00C71D",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-baccarat-live",
    title: "Baccarat Live",
    href: "/games/evolution-baccarat-live",
    image: {
      primary: "https://shuffle-com.imgix.net/06b4e755-3400-4407-89e2-39d6a23bd3c3?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/06b4e755-3400-4407-89e2-39d6a23bd3c3?auto=format&width=640",
      local: "/assets/games/evolution-baccarat-live.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#EC0030",
    provider: "External",
    isOriginal: false
  },
  {
    id: "microgaming-playboy-blackjack",
    title: "Playboy Blackjack",
    href: "/games/microgaming-playboy-blackjack",
    image: {
      primary: "https://shuffle-com.imgix.net/43e92415-0709-494f-b9c7-9efe32ccbd7e?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/43e92415-0709-494f-b9c7-9efe32ccbd7e?auto=format&width=640",
      local: "/assets/games/microgaming-playboy-blackjack.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#DEAB3A",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-shuffle-speed-blackjack-1",
    title: "Snuffle Speed Blackjack 1",
    href: "/games/pragmaticplay-shuffle-speed-blackjack-1",
    image: {
      primary: "https://shuffle-com.imgix.net/9622e890-0245-4023-9d6b-093661c74059?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/9622e890-0245-4023-9d6b-093661c74059?auto=format&width=640",
      local: "/assets/games/pragmaticplay-shuffle-speed-blackjack-1.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#731eff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "microgaming-playboy-speed-baccarat-1",
    title: "Playboy Speed Baccarat 1",
    href: "/games/microgaming-playboy-speed-baccarat-1",
    image: {
      primary: "https://shuffle-com.imgix.net/d1467558-6708-4921-826a-4498ddc18d0b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/d1467558-6708-4921-826a-4498ddc18d0b?auto=format&width=640",
      local: "/assets/games/microgaming-playboy-speed-baccarat-1.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF0000",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-blackjack-lobby",
    title: "Blackjack Lobby",
    href: "/games/pragmaticexternal-blackjack-lobby",
    image: {
      primary: "https://shuffle-com.imgix.net/a0dc8a78-214d-4eb6-ba54-1f384a2be0c9?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/a0dc8a78-214d-4eb6-ba54-1f384a2be0c9?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-blackjack-lobby.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FFBB00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-lightning-roulette",
    title: "Lightning Roulette",
    href: "/games/evolution-lightning-roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/76c878e3-e40e-45e5-8343-de63e783ff32?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/76c878e3-e40e-45e5-8343-de63e783ff32?auto=format&width=640",
      local: "/assets/games/evolution-lightning-roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FD4700",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-speed-roulette-8256",
    title: "Speed Roulette",
    href: "/games/evolution-speed-roulette-8256",
    image: {
      primary: "https://shuffle-com.imgix.net/7847db8e-a36d-497b-9819-780df411f6fb?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/7847db8e-a36d-497b-9819-780df411f6fb?auto=format&width=640",
      local: "/assets/games/evolution-speed-roulette-8256.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#c1151b",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-roulette-direct",
    title: "Roulette Live",
    href: "/games/evolution-roulette-direct",
    image: {
      primary: "https://shuffle-com.imgix.net/df4b6c82-d06d-4ad6-8349-8f55f044184b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/df4b6c82-d06d-4ad6-8349-8f55f044184b?auto=format&width=640",
      local: "/assets/games/evolution-roulette-direct.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FD0000",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-super-trunfo",
    title: "Super Trunfo",
    href: "/games/pragmaticexternal-super-trunfo",
    image: {
      primary: "https://shuffle-com.imgix.net/f7447bc8-0bca-486c-87ae-fa3a071a0fd0?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/f7447bc8-0bca-486c-87ae-fa3a071a0fd0?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-super-trunfo.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ef9c25",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-ice-fishing",
    title: "Ice Fishing",
    href: "/games/evolution-ice-fishing",
    image: {
      primary: "https://shuffle-com.imgix.net/dc178b1c-55e3-4472-9131-e7f3bac09929?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/dc178b1c-55e3-4472-9131-e7f3bac09929?auto=format&width=640",
      local: "/assets/games/evolution-ice-fishing.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#0C78FF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-mega-roulette",
    title: "Mega Roulette",
    href: "/games/pragmaticexternal-mega-roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/09233c18-714f-45ef-98e3-1ec4b6275d44?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/09233c18-714f-45ef-98e3-1ec4b6275d44?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-mega-roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#60B1F9",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-lightning-storm",
    title: "Lightning Storm",
    href: "/games/evolution-lightning-storm",
    image: {
      primary: "https://shuffle-com.imgix.net/e78476ea-cf02-4c50-b43a-40ad40f378d7?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/e78476ea-cf02-4c50-b43a-40ad40f378d7?auto=format&width=640",
      local: "/assets/games/evolution-lightning-storm.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#05baff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-mega-sic-bac",
    title: "Mega Sic Bac",
    href: "/games/pragmaticexternal-mega-sic-bac",
    image: {
      primary: "https://shuffle-com.imgix.net/b97715f0-d103-4a54-a0ad-9926e7779c6c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b97715f0-d103-4a54-a0ad-9926e7779c6c?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-mega-sic-bac.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#fe0001",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-super-andar-bahar",
    title: "Super Andar Bahar",
    href: "/games/evolution-super-andar-bahar",
    image: {
      primary: "https://shuffle-com.imgix.net/e5fdea83-504b-4897-8562-e6a42624ff54?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/e5fdea83-504b-4897-8562-e6a42624ff54?auto=format&width=640",
      local: "/assets/games/evolution-super-andar-bahar.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9F1DFF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-sweet-bonanza-candyland",
    title: "Sweet Bonanza Candyland",
    href: "/games/pragmaticexternal-sweet-bonanza-candyland",
    image: {
      primary: "https://shuffle-com.imgix.net/344060d9-8c79-4d61-94f3-e39a0122546c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/344060d9-8c79-4d61-94f3-e39a0122546c?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-sweet-bonanza-candyland.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff5b9a",
    provider: "External",
    isOriginal: false
  },
  {
    id: "microgaming-playboy-speed-baccarat-2",
    title: "Playboy Speed Baccarat 2",
    href: "/games/microgaming-playboy-speed-baccarat-2",
    image: {
      primary: "https://shuffle-com.imgix.net/d5c186e3-f086-405b-9c76-ce2504f6f5c1?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/d5c186e3-f086-405b-9c76-ce2504f6f5c1?auto=format&width=640",
      local: "/assets/games/microgaming-playboy-speed-baccarat-2.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#EA3353",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-crazytime",
    title: "Crazy Time",
    href: "/games/evolution-crazytime",
    image: {
      primary: "https://shuffle-com.imgix.net/2d7c4815-c99c-43a2-b89a-4fe2376eb41b?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/2d7c4815-c99c-43a2-b89a-4fe2376eb41b?auto=format&width=640",
      local: "/assets/games/evolution-crazytime.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF2E8B",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-cctvgame-footfall",
    title: "CCTV Game - Footfall",
    href: "/games/155-io-zcl-3-u-cctvgame-footfall",
    image: {
      primary: "https://shuffle-com.imgix.net/cff3d17f-8015-4841-8f5f-bd68e3e63156?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/cff3d17f-8015-4841-8f5f-bd68e3e63156?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-cctvgame-footfall.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#f10000",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-disco-balls",
    title: "Disco Balls",
    href: "/games/evolution-disco-balls",
    image: {
      primary: "https://shuffle-com.imgix.net/b2525e88-3ffa-47f8-89e0-98c3af35665e?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b2525e88-3ffa-47f8-89e0-98c3af35665e?auto=format&width=640",
      local: "/assets/games/evolution-disco-balls.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff881f",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-cctvgame-rushhour",
    title: "CCTV Game - Rush Hour",
    href: "/games/155-io-zcl-3-u-cctvgame-rushhour",
    image: {
      primary: "https://shuffle-com.imgix.net/b2effc92-801b-42ec-a22a-842134a79638?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b2effc92-801b-42ec-a22a-842134a79638?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-cctvgame-rushhour.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#01C726",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-money-time",
    title: "Money Time",
    href: "/games/pragmaticplay-money-time",
    image: {
      primary: "https://shuffle-com.imgix.net/280caabd-c3dc-491b-81d5-a67d7acb5983?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/280caabd-c3dc-491b-81d5-a67d7acb5983?auto=format&width=640",
      local: "/assets/games/pragmaticplay-money-time.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#028fff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-cctvgame-snowrun",
    title: "CCTV Game - Snow Run",
    href: "/games/155-io-zcl-3-u-cctvgame-snowrun",
    image: {
      primary: "https://shuffle-com.imgix.net/d5cdb691-9a2f-48f0-80f1-e1bf9bcd6c1c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/d5cdb691-9a2f-48f0-80f1-e1bf9bcd6c1c?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-cctvgame-snowrun.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF8F11",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-cctvgame-duckriver",
    title: "CCTV Game - Duck River",
    href: "/games/155-io-zcl-3-u-cctvgame-duckriver",
    image: {
      primary: "https://shuffle-com.imgix.net/59c79923-2f3d-4813-a322-f7cc1aabddcd?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/59c79923-2f3d-4813-a322-f7cc1aabddcd?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-cctvgame-duckriver.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#2CC5FF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-monopoly-roulette",
    title: "MONOPOLY Roulette",
    href: "/games/evolution-monopoly-roulette",
    image: {
      primary: "https://shuffle-com.imgix.net/cfb54dce-1e27-4989-9457-1f8844865236?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/cfb54dce-1e27-4989-9457-1f8844865236?auto=format&width=640",
      local: "/assets/games/evolution-monopoly-roulette.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ED702D",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-marbleplinko-classic",
    title: "Marble Plinko - Classic",
    href: "/games/155-io-zcl-3-u-marbleplinko-classic",
    image: {
      primary: "https://shuffle-com.imgix.net/7bffef47-9a90-47fa-86cc-6997b05175a8?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/7bffef47-9a90-47fa-86cc-6997b05175a8?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-marbleplinko-classic.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff9500",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-ice-fishing",
    title: "Ice Fishing",
    href: "/games/evolution-ice-fishing",
    image: {
      primary: "https://shuffle-com.imgix.net/dc178b1c-55e3-4472-9131-e7f3bac09929?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/dc178b1c-55e3-4472-9131-e7f3bac09929?auto=format&width=640",
      local: "/assets/games/evolution-ice-fishing.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#0C78FF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-red-baron",
    title: "Red Baron",
    href: "/games/evolution-red-baron",
    image: {
      primary: "https://shuffle-com.imgix.net/36c9b414-2a68-4138-8f01-ade4e151a286?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/36c9b414-2a68-4138-8f01-ade4e151a286?auto=format&width=640",
      local: "/assets/games/evolution-red-baron.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FA1B1C",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-lightning-storm",
    title: "Lightning Storm",
    href: "/games/evolution-lightning-storm",
    image: {
      primary: "https://shuffle-com.imgix.net/e78476ea-cf02-4c50-b43a-40ad40f378d7?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/e78476ea-cf02-4c50-b43a-40ad40f378d7?auto=format&width=640",
      local: "/assets/games/evolution-lightning-storm.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#05baff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-fastlane",
    title: "Fast Lane",
    href: "/games/155-io-zcl-3-u-fastlane",
    image: {
      primary: "https://shuffle-com.imgix.net/16ef0679-52cc-429d-bad2-a9015e0199e2?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/16ef0679-52cc-429d-bad2-a9015e0199e2?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-fastlane.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#8403e0",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-boom-city",
    title: "Dice City",
    href: "/games/pragmaticexternal-boom-city",
    image: {
      primary: "https://shuffle-com.imgix.net/c4b59064-2e03-4b72-a76e-62c56eec92a8?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/c4b59064-2e03-4b72-a76e-62c56eec92a8?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-boom-city.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#f41e8c",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-sweet-bonanza-candyland",
    title: "Sweet Bonanza Candyland",
    href: "/games/pragmaticexternal-sweet-bonanza-candyland",
    image: {
      primary: "https://shuffle-com.imgix.net/344060d9-8c79-4d61-94f3-e39a0122546c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/344060d9-8c79-4d61-94f3-e39a0122546c?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-sweet-bonanza-candyland.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff5b9a",
    provider: "External",
    isOriginal: false
  },
  {
    id: "155-io-zcl-3-u-survivor",
    title: "Survivor",
    href: "/games/155-io-zcl-3-u-survivor",
    image: {
      primary: "https://shuffle-com.imgix.net/c99e5c00-bfe2-4ce8-8916-cc8eab8a27e8?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/c99e5c00-bfe2-4ce8-8916-cc8eab8a27e8?auto=format&width=640",
      local: "/assets/games/155-io-zcl-3-u-survivor.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#0A80EE",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-crazy-pachinko",
    title: "Crazy Pachinko",
    href: "/games/evolution-crazy-pachinko",
    image: {
      primary: "https://shuffle-com.imgix.net/59ee91dd-ca4e-4fb9-a842-f6c7c810a598?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/59ee91dd-ca4e-4fb9-a842-f6c7c810a598?auto=format&width=640",
      local: "/assets/games/evolution-crazy-pachinko.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FFB900",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticexternal-treasure-island",
    title: "Treasure Island",
    href: "/games/pragmaticexternal-treasure-island",
    image: {
      primary: "https://shuffle-com.imgix.net/48918787-2620-466c-8906-69d42f3e629a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/48918787-2620-466c-8906-69d42f3e629a?auto=format&width=640",
      local: "/assets/games/pragmaticexternal-treasure-island.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#e2243b",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-lightningdice",
    title: "Lightning Dice",
    href: "/games/evolution-lightningdice",
    image: {
      primary: "https://shuffle-com.imgix.net/e9f827f3-7a49-47af-b664-9fc48a2c0700?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/e9f827f3-7a49-47af-b664-9fc48a2c0700?auto=format&width=640",
      local: "/assets/games/evolution-lightningdice.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FD7900",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-balloon-race",
    title: "Balloon Race",
    href: "/games/evolution-balloon-race",
    image: {
      primary: "https://shuffle-com.imgix.net/f8775cfe-5f9a-4182-9f46-cf859bfc26c5?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/f8775cfe-5f9a-4182-9f46-cf859bfc26c5?auto=format&width=640",
      local: "/assets/games/evolution-balloon-race.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FE47BA",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-crazy-coin-flip-9148",
    title: "Crazy Coin Flip",
    href: "/games/evolution-crazy-coin-flip-9148",
    image: {
      primary: "https://shuffle-com.imgix.net/430e5520-1d5f-4109-8b42-2dd3783ef839?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/430e5520-1d5f-4109-8b42-2dd3783ef839?auto=format&width=640",
      local: "/assets/games/evolution-crazy-coin-flip-9148.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ffae2e",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-megaball",
    title: "Mega Ball",
    href: "/games/evolution-megaball",
    image: {
      primary: "https://shuffle-com.imgix.net/da2f6b5d-f8fc-4541-bbcd-b8c921fde6d4?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/da2f6b5d-f8fc-4541-bbcd-b8c921fde6d4?auto=format&width=640",
      local: "/assets/games/evolution-megaball.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9100FF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-color-game-bonanza",
    title: "Color Game Bonanza",
    href: "/games/pragmaticplay-color-game-bonanza",
    image: {
      primary: "https://shuffle-com.imgix.net/c664b872-1af8-488e-b864-e8ed109a9f30?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/c664b872-1af8-488e-b864-e8ed109a9f30?auto=format&width=640",
      local: "/assets/games/pragmaticplay-color-game-bonanza.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#31d0ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-funky-time",
    title: "Funky Time",
    href: "/games/evolution-funky-time",
    image: {
      primary: "https://shuffle-com.imgix.net/7ca0a1f9-7a36-4d62-8af8-9ec1cc00eaf3?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/7ca0a1f9-7a36-4d62-8af8-9ec1cc00eaf3?auto=format&width=640",
      local: "/assets/games/evolution-funky-time.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FD00E3",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-brute-force-alien-onslaught",
    title: "Brute Force: Alien Onslaught",
    href: "/games/nolimit-brute-force-alien-onslaught",
    image: {
      primary: "https://shuffle-com.imgix.net/4ff89f78-dd78-4cbf-9968-fff1ffc93a27?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/4ff89f78-dd78-4cbf-9968-fff1ffc93a27?auto=format&width=640",
      local: "/assets/games/nolimit-brute-force-alien-onslaught.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#B100CD",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-fistof-destruction",
    title: "Fist of Destruction",
    href: "/games/hacksaw-fistof-destruction",
    image: {
      primary: "https://shuffle-com.imgix.net/ceeee751-64ce-41df-88c6-1462bc7a1266?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/ceeee751-64ce-41df-88c6-1462bc7a1266?auto=format&width=640",
      local: "/assets/games/hacksaw-fistof-destruction.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FFAA00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "shady-lady-shdla-preachtv",
    title: "Preach TV",
    href: "/games/shady-lady-shdla-preachtv",
    image: {
      primary: "https://shuffle-com.imgix.net/25395352-da22-4c6f-94a9-17d5487f1273?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/25395352-da22-4c6f-94a9-17d5487f1273?auto=format&width=640",
      local: "/assets/games/shady-lady-shdla-preachtv.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#DD0536",
    provider: "External",
    isOriginal: false
  },
  {
    id: "playnetic-7-djinn-wishes",
    title: "7 Djinn Wishes",
    href: "/games/playnetic-7-djinn-wishes",
    image: {
      primary: "https://shuffle-com.imgix.net/539a46d6-e8f9-46fc-86f5-8ecb6b3aba9a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/539a46d6-e8f9-46fc-86f5-8ecb6b3aba9a?auto=format&width=640",
      local: "/assets/games/playnetic-7-djinn-wishes.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#8711db",
    provider: "External",
    isOriginal: false
  },
  {
    id: "n-2-games-de-rat-heist",
    title: "De Rat Heist",
    href: "/games/n-2-games-de-rat-heist",
    image: {
      primary: "https://shuffle-com.imgix.net/1e738eb3-5d3a-45a6-839f-9c623c10bffb?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/1e738eb3-5d3a-45a6-839f-9c623c10bffb?auto=format&width=640",
      local: "/assets/games/n-2-games-de-rat-heist.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#20c675",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-le-fisherman",
    title: "Le Fisherman",
    href: "/games/hacksaw-le-fisherman",
    image: {
      primary: "https://shuffle-com.imgix.net/a59a9310-97e9-4eab-8a56-5fb52d8e4f70?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/a59a9310-97e9-4eab-8a56-5fb52d8e4f70?auto=format&width=640",
      local: "/assets/games/hacksaw-le-fisherman.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF962F",
    provider: "External",
    isOriginal: false
  },
  {
    id: "penguin-king-oct-superboostedprizesholdandwin",
    title: "Super Boosted Prizes: Hold and Win",
    href: "/games/penguin-king-oct-superboostedprizesholdandwin",
    image: {
      primary: "https://shuffle-com.imgix.net/ff444618-7926-436b-9be6-908e0b97234f?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/ff444618-7926-436b-9be6-908e0b97234f?auto=format&width=640",
      local: "/assets/games/penguin-king-oct-superboostedprizesholdandwin.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff9026",
    provider: "External",
    isOriginal: false
  },
  {
    id: "playnetic-farmageddon",
    title: "Farmageddon",
    href: "/games/playnetic-farmageddon",
    image: {
      primary: "https://shuffle-com.imgix.net/cfee849a-2746-43d7-9e9e-3601c6936288?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/cfee849a-2746-43d7-9e9e-3601c6936288?auto=format&width=640",
      local: "/assets/games/playnetic-farmageddon.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#fd0000",
    provider: "External",
    isOriginal: false
  },
  {
    id: "nolimit-flight-mode",
    title: "Flight Mode",
    href: "/games/nolimit-flight-mode",
    image: {
      primary: "https://shuffle-com.imgix.net/6f1ddd2b-b103-4453-b108-98721ca4cf82?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/6f1ddd2b-b103-4453-b108-98721ca4cf82?auto=format&width=640",
      local: "/assets/games/nolimit-flight-mode.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF5151",
    provider: "External",
    isOriginal: false
  },
  {
    id: "clutch-gaming-clg-rocketreckon",
    title: "Rocket Reckon",
    href: "/games/clutch-gaming-clg-rocketreckon",
    image: {
      primary: "https://shuffle-com.imgix.net/b6c69ef6-133a-4db2-a458-52c68244118a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b6c69ef6-133a-4db2-a458-52c68244118a?auto=format&width=640",
      local: "/assets/games/clutch-gaming-clg-rocketreckon.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#f62031",
    provider: "External",
    isOriginal: false
  },
  {
    id: "delulu-mlk-voyage-50000-x",
    title: "MLK Voyage 50000X",
    href: "/games/delulu-mlk-voyage-50000-x",
    image: {
      primary: "https://shuffle-com.imgix.net/53a0dc3c-9a8e-48f2-a5f5-da70166a54d9?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/53a0dc3c-9a8e-48f2-a5f5-da70166a54d9?auto=format&width=640",
      local: "/assets/games/delulu-mlk-voyage-50000-x.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#e64141",
    provider: "External",
    isOriginal: false
  },
  {
    id: "just-slots-js-icevacation",
    title: "Ice Vacation",
    href: "/games/just-slots-js-icevacation",
    image: {
      primary: "https://shuffle-com.imgix.net/85404849-1a85-4fa1-bae0-9f75f58acbae?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/85404849-1a85-4fa1-bae0-9f75f58acbae?auto=format&width=640",
      local: "/assets/games/just-slots-js-icevacation.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FF7D00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "n-2-games-strawberry-land",
    title: "Strawberry Land",
    href: "/games/n-2-games-strawberry-land",
    image: {
      primary: "https://shuffle-com.imgix.net/bc8b734f-fbd1-4baa-a035-69362897f3fa?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/bc8b734f-fbd1-4baa-a035-69362897f3fa?auto=format&width=640",
      local: "/assets/games/n-2-games-strawberry-land.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff325d",
    provider: "External",
    isOriginal: false
  },
  {
    id: "clutch-gaming-clg-juicyblades",
    title: "Juicy Blades",
    href: "/games/clutch-gaming-clg-juicyblades",
    image: {
      primary: "https://shuffle-com.imgix.net/8cf736bf-a36e-4f2b-bfd6-906bf8c95ae8?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/8cf736bf-a36e-4f2b-bfd6-906bf8c95ae8?auto=format&width=640",
      local: "/assets/games/clutch-gaming-clg-juicyblades.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff9b26",
    provider: "External",
    isOriginal: false
  },
  {
    id: "novomatic-nvm-bonsaigold-2-ageofprosperity",
    title: "Bonsai Gold 2: Age of Prosperity",
    href: "/games/novomatic-nvm-bonsaigold-2-ageofprosperity",
    image: {
      primary: "https://shuffle-com.imgix.net/8e4038c5-b56d-43e8-9aad-aed3649de123?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/8e4038c5-b56d-43e8-9aad-aed3649de123?auto=format&width=640",
      local: "/assets/games/novomatic-nvm-bonsaigold-2-ageofprosperity.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9519ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "peter-sons-pets-barbarossarevenge",
    title: "Barbarossa Revenge",
    href: "/games/peter-sons-pets-barbarossarevenge",
    image: {
      primary: "https://shuffle-com.imgix.net/04f5ac28-d79c-4ac0-be35-1536b792ddd9?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/04f5ac28-d79c-4ac0-be35-1536b792ddd9?auto=format&width=640",
      local: "/assets/games/peter-sons-pets-barbarossarevenge.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#EE8031",
    provider: "External",
    isOriginal: false
  },
  {
    id: "endorphina-end-injazz",
    title: "In Jazz",
    href: "/games/endorphina-end-injazz",
    image: {
      primary: "https://shuffle-com.imgix.net/53014eaf-8782-455d-ad66-929c99ca9373?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/53014eaf-8782-455d-ad66-929c99ca9373?auto=format&width=640",
      local: "/assets/games/endorphina-end-injazz.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#E300FF",
    provider: "External",
    isOriginal: false
  },
  {
    id: "delulu-mlk-voyage",
    title: "MLK Voyage",
    href: "/games/delulu-mlk-voyage",
    image: {
      primary: "https://shuffle-com.imgix.net/6638ed60-aa25-4112-aacf-55914cdf06ac?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/6638ed60-aa25-4112-aacf-55914cdf06ac?auto=format&width=640",
      local: "/assets/games/delulu-mlk-voyage.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#f3ab00",
    provider: "External",
    isOriginal: false
  },
  {
    id: "exco-luna-x",
    title: "Luna X",
    href: "/games/exco-luna-x",
    image: {
      primary: "https://shuffle-com.imgix.net/190db8e9-a1bd-4592-ac57-97be13fbd495?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/190db8e9-a1bd-4592-ac57-97be13fbd495?auto=format&width=640",
      local: "/assets/games/exco-luna-x.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#FE02C8",
    provider: "External",
    isOriginal: false
  },
  {
    id: "1-spin-4-win-lucky-and-brave-win-spins",
    title: "Lucky And Brave Win Spins",
    href: "/games/1-spin-4-win-lucky-and-brave-win-spins",
    image: {
      primary: "https://shuffle-com.imgix.net/333667e1-8e43-4d80-8627-12bd303b7f36?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/333667e1-8e43-4d80-8627-12bd303b7f36?auto=format&width=640",
      local: "/assets/games/1-spin-4-win-lucky-and-brave-win-spins.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff0000",
    provider: "External",
    isOriginal: false
  },
  {
    id: "1-spin-4-win-retro-fruits-243-fortune",
    title: "Retro Fruits 243 Fortune",
    href: "/games/1-spin-4-win-retro-fruits-243-fortune",
    image: {
      primary: "https://shuffle-com.imgix.net/9fdd8d13-f50f-4f07-b0e2-522e7091a271?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/9fdd8d13-f50f-4f07-b0e2-522e7091a271?auto=format&width=640",
      local: "/assets/games/1-spin-4-win-retro-fruits-243-fortune.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ef5400",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-shuffle-spinman",
    title: "Snuffle Spinman",
    href: "/games/hacksaw-shuffle-spinman",
    image: {
      primary: "https://shuffle-com.imgix.net/a181bb0e-6e90-4477-b8a7-82f493973f73?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/a181bb0e-6e90-4477-b8a7-82f493973f73?auto=format&width=640",
      local: "/assets/games/hacksaw-shuffle-spinman.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#A621F4",
    provider: "External",
    isOriginal: false
  },
  {
    id: "softswiss-happy-bird",
    title: "Happy Bird",
    href: "/games/softswiss-happy-bird",
    image: {
      primary: "https://shuffle-com.imgix.net/a5435022-ce64-4226-983b-512486ad4bb5?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/a5435022-ce64-4226-983b-512486ad4bb5?auto=format&width=640",
      local: "/assets/games/softswiss-happy-bird.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#AA00FE",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pushgaming-retrotapes-01",
    title: "Retro Tapes",
    href: "/games/pushgaming-retrotapes-01",
    image: {
      primary: "https://shuffle-com.imgix.net/9b0bb21a-1ea2-4ed2-b6fe-6589915cef5e?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/9b0bb21a-1ea2-4ed2-b6fe-6589915cef5e?auto=format&width=640",
      local: "/assets/games/pushgaming-retrotapes-01.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#BD00FE",
    provider: "External",
    isOriginal: false
  },
  {
    id: "penguin-king-oct-hotchiliheatspicyhotpots",
    title: "Hot Chili Heat: Spicy Hot Pots",
    href: "/games/penguin-king-oct-hotchiliheatspicyhotpots",
    image: {
      primary: "https://shuffle-com.imgix.net/83c8dd35-546b-4084-9d2c-d41ad8951f02?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/83c8dd35-546b-4084-9d2c-d41ad8951f02?auto=format&width=640",
      local: "/assets/games/penguin-king-oct-hotchiliheatspicyhotpots.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff6e1f",
    provider: "External",
    isOriginal: false
  },
  {
    id: "clutch-gaming-clg-crazyburrows",
    title: "Crazy Burrows",
    href: "/games/clutch-gaming-clg-crazyburrows",
    image: {
      primary: "https://shuffle-com.imgix.net/c60ba75d-6d2f-4ce2-b44a-6b8fcde55b46?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/c60ba75d-6d2f-4ce2-b44a-6b8fcde55b46?auto=format&width=640",
      local: "/assets/games/clutch-gaming-clg-crazyburrows.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#a8cc19",
    provider: "External",
    isOriginal: false
  },
  {
    id: "peter-sons-pets-vikinglegacyholdandwin",
    title: "Viking Legacy: Hold and Win",
    href: "/games/peter-sons-pets-vikinglegacyholdandwin",
    image: {
      primary: "https://shuffle-com.imgix.net/2fc024c2-923b-4864-a194-c8d558d07d2a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/2fc024c2-923b-4864-a194-c8d558d07d2a?auto=format&width=640",
      local: "/assets/games/peter-sons-pets-vikinglegacyholdandwin.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ffa527",
    provider: "External",
    isOriginal: false
  },
  {
    id: "exco-apex-dregs",
    title: "Apex Dregs",
    href: "/games/exco-apex-dregs",
    image: {
      primary: "https://shuffle-com.imgix.net/0358107c-7328-49d8-9f7a-527528b9aabd?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/0358107c-7328-49d8-9f7a-527528b9aabd?auto=format&width=640",
      local: "/assets/games/exco-apex-dregs.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#fd006b",
    provider: "External",
    isOriginal: false
  },
  {
    id: "1-spin-4-win-lucky-foxilian-hold-and-win",
    title: "Lucky Foxilian Hold And Win",
    href: "/games/1-spin-4-win-lucky-foxilian-hold-and-win",
    image: {
      primary: "https://shuffle-com.imgix.net/013d7031-a38f-45ea-a1c1-18a76fa342c4?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/013d7031-a38f-45ea-a1c1-18a76fa342c4?auto=format&width=640",
      local: "/assets/games/1-spin-4-win-lucky-foxilian-hold-and-win.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#da0038",
    provider: "External",
    isOriginal: false
  },
  {
    id: "avatarux-blondes-and-beers",
    title: "Blondes &amp; Beers",
    href: "/games/avatarux-blondes-and-beers",
    image: {
      primary: "https://shuffle-com.imgix.net/7b5fd16d-403c-465f-a103-ff06e9660c7c?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/7b5fd16d-403c-465f-a103-ff06e9660c7c?auto=format&width=640",
      local: "/assets/games/avatarux-blondes-and-beers.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ffb529",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-scarab-ascension",
    title: "Scarab Ascension",
    href: "/games/hacksaw-scarab-ascension",
    image: {
      primary: "https://shuffle-com.imgix.net/46276eb2-8dcb-4c6f-84d0-db1f5ae8384f?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/46276eb2-8dcb-4c6f-84d0-db1f5ae8384f?auto=format&width=640",
      local: "/assets/games/hacksaw-scarab-ascension.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff4c1c",
    provider: "External",
    isOriginal: false
  },
  {
    id: "bgmng-bonanza-billion-merge-up",
    title: "Bonanza Billion Merge Up+",
    href: "/games/bgmng-bonanza-billion-merge-up",
    image: {
      primary: "https://shuffle-com.imgix.net/4a120d8c-ab7d-4bb5-8550-0fc870988247?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/4a120d8c-ab7d-4bb5-8550-0fc870988247?auto=format&width=640",
      local: "/assets/games/bgmng-bonanza-billion-merge-up.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#009bff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "penguin-king-oct-chonkykongholdandwin",
    title: "Chonky Kong: Hold and Win",
    href: "/games/penguin-king-oct-chonkykongholdandwin",
    image: {
      primary: "https://shuffle-com.imgix.net/eba77c00-c4e5-4f72-82d4-ce19cb5046c4?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/eba77c00-c4e5-4f72-82d4-ce19cb5046c4?auto=format&width=640",
      local: "/assets/games/penguin-king-oct-chonkykongholdandwin.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#a8d718",
    provider: "External",
    isOriginal: false
  },
  {
    id: "microgaming-possessed-fortunes",
    title: "Possessed Fortunes",
    href: "/games/microgaming-possessed-fortunes",
    image: {
      primary: "https://shuffle-com.imgix.net/aed32d47-e668-4277-8bfa-051ea89cd56a?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/aed32d47-e668-4277-8bfa-051ea89cd56a?auto=format&width=640",
      local: "/assets/games/microgaming-possessed-fortunes.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#cc07ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "microgaming-mahjong-wilds-link-merge",
    title: "Mahjong Wilds Link&amp;Merge",
    href: "/games/microgaming-mahjong-wilds-link-merge",
    image: {
      primary: "https://shuffle-com.imgix.net/84042230-0c4e-4623-a0d8-4f5e9d784055?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/84042230-0c4e-4623-a0d8-4f5e9d784055?auto=format&width=640",
      local: "/assets/games/microgaming-mahjong-wilds-link-merge.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff2b07",
    provider: "External",
    isOriginal: false
  },
  {
    id: "relax-money-train-5",
    title: "Money Train 5",
    href: "/games/relax-money-train-5",
    image: {
      primary: "https://shuffle-com.imgix.net/fd456bbe-0739-4284-a2b6-d05470cfe010?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/fd456bbe-0739-4284-a2b6-d05470cfe010?auto=format&width=640",
      local: "/assets/games/relax-money-train-5.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ad0000",
    provider: "External",
    isOriginal: false
  },
  {
    id: "elk-concrete-cowboys",
    title: "Concrete Cowboys",
    href: "/games/elk-concrete-cowboys",
    image: {
      primary: "https://shuffle-com.imgix.net/05c6e051-a3bb-4d34-935f-7799541bade5?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/05c6e051-a3bb-4d34-935f-7799541bade5?auto=format&width=640",
      local: "/assets/games/elk-concrete-cowboys.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#009ead",
    provider: "External",
    isOriginal: false
  },
  {
    id: "just-slots-js-sugarhell",
    title: "Sugar Hell",
    href: "/games/just-slots-js-sugarhell",
    image: {
      primary: "https://shuffle-com.imgix.net/cce2f398-3e02-4950-acee-3569522e17df?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/cce2f398-3e02-4950-acee-3569522e17df?auto=format&width=640",
      local: "/assets/games/just-slots-js-sugarhell.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff0172",
    provider: "External",
    isOriginal: false
  },
  {
    id: "gaming-corps-gco-starpigsoftheclusterverse",
    title: "Star Pigs of the Clusterverse",
    href: "/games/gaming-corps-gco-starpigsoftheclusterverse",
    image: {
      primary: "https://shuffle-com.imgix.net/4484b1fc-77f4-42ba-9c5f-9f56320d0b79?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/4484b1fc-77f4-42ba-9c5f-9f56320d0b79?auto=format&width=640",
      local: "/assets/games/gaming-corps-gco-starpigsoftheclusterverse.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9b1ccc",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-thors-rage-2",
    title: "Thor&#x27;s Rage 2",
    href: "/games/evolution-thors-rage-2",
    image: {
      primary: "https://shuffle-com.imgix.net/ea775e6e-d71f-455e-ade7-806eea4ce593?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/ea775e6e-d71f-455e-ade7-806eea4ce593?auto=format&width=640",
      local: "/assets/games/evolution-thors-rage-2.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff0048",
    provider: "External",
    isOriginal: false
  },
  {
    id: "shady-lady-shdla-nuukd",
    title: "NUUKD",
    href: "/games/shady-lady-shdla-nuukd",
    image: {
      primary: "https://shuffle-com.imgix.net/b7f0ba52-5e3e-4795-88a8-a2a1fe00a8ec?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/b7f0ba52-5e3e-4795-88a8-a2a1fe00a8ec?auto=format&width=640",
      local: "/assets/games/shady-lady-shdla-nuukd.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#86da02",
    provider: "External",
    isOriginal: false
  },
  {
    id: "pragmaticplay-big-bass-vegas-1000",
    title: "Big Bass Vegas 1000",
    href: "/games/pragmaticplay-big-bass-vegas-1000",
    image: {
      primary: "https://shuffle-com.imgix.net/0b51df3c-be56-4ca2-818f-c82dd94da3d5?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/0b51df3c-be56-4ca2-818f-c82dd94da3d5?auto=format&width=640",
      local: "/assets/games/pragmaticplay-big-bass-vegas-1000.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#9744ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "thunderkick-hot-potato-battleground",
    title: "Hot Potato Battleground",
    href: "/games/thunderkick-hot-potato-battleground",
    image: {
      primary: "https://shuffle-com.imgix.net/9f67f9c2-07f5-4d08-9e54-0f8a27f98410?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/9f67f9c2-07f5-4d08-9e54-0f8a27f98410?auto=format&width=640",
      local: "/assets/games/thunderkick-hot-potato-battleground.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff1a60",
    provider: "External",
    isOriginal: false
  },
  {
    id: "penguin-king-oct-3-firefrogs",
    title: "3 Fire Frogs",
    href: "/games/penguin-king-oct-3-firefrogs",
    image: {
      primary: "https://shuffle-com.imgix.net/87172654-27a4-4881-a48f-984f77da5ad6?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/87172654-27a4-4881-a48f-984f77da5ad6?auto=format&width=640",
      local: "/assets/games/penguin-king-oct-3-firefrogs.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff4527",
    provider: "External",
    isOriginal: false
  },
  {
    id: "delulu-toy-crush",
    title: "Toy Crush",
    href: "/games/delulu-toy-crush",
    image: {
      primary: "https://shuffle-com.imgix.net/95620bea-97bb-4a48-a766-7078e538cf54?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/95620bea-97bb-4a48-a766-7078e538cf54?auto=format&width=640",
      local: "/assets/games/delulu-toy-crush.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff1c76",
    provider: "External",
    isOriginal: false
  },
  {
    id: "evolution-extra-chilli-more-chilli",
    title: "Extra Chilli More Chilli",
    href: "/games/evolution-extra-chilli-more-chilli",
    image: {
      primary: "https://shuffle-com.imgix.net/329be509-ac78-44ef-9cc6-d5bcd4233ec9?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/329be509-ac78-44ef-9cc6-d5bcd4233ec9?auto=format&width=640",
      local: "/assets/games/evolution-extra-chilli-more-chilli.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#ff3858",
    provider: "External",
    isOriginal: false
  },
  {
    id: "hacksaw-boombear-bros",
    title: "Boombear Bros",
    href: "/games/hacksaw-boombear-bros",
    image: {
      primary: "https://shuffle-com.imgix.net/9ae1f1c9-928e-4f24-b608-a822ace37177?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/9ae1f1c9-928e-4f24-b608-a822ace37177?auto=format&width=640",
      local: "/assets/games/hacksaw-boombear-bros.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#a127ff",
    provider: "External",
    isOriginal: false
  },
  {
    id: "playnetic-big-wiz",
    title: "Big Wiz",
    href: "/games/playnetic-big-wiz",
    image: {
      primary: "https://shuffle-com.imgix.net/f7386f7c-ef35-429a-aaf0-ec47dfd9d365?auto=format&width=3840",
      alternate: "https://shuffle-com.imgix.net/f7386f7c-ef35-429a-aaf0-ec47dfd9d365?auto=format&width=640",
      local: "/assets/games/playnetic-big-wiz.webp",
      fallback: "/assets/fallbacks/game.webp"
    },
    borderColor: "#1ca6ff",
    provider: "External",
    isOriginal: false
  },
];
