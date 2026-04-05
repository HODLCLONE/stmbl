export type DiscoveryItem = {
  id: string;
  author: string;
  handle: string;
  channel: string;
  text: string;
  href: string;
  engagement: string;
};

export const CASTS: DiscoveryItem[] = [
  {
    id: "cast-lorenzo-007-0x7260fbf6",
    author: "lorenzo-007",
    handle: "@lorenzo-007",
    channel: "/farcaster",
    text: "I wish Farcaster can just give me my remaining 6months of pro user money back It's kinda mid being a pro user when the wallets don't even work well, user rewards no more.",
    href: "https://farcaster.xyz/lorenzo-007/0x7260fbf6",
    engagement: "1 like · 0 recasts · 4 replies",
  },
  {
    id: "cast-sa-0x5ad8364f",
    author: "sa",
    handle: "@sa",
    channel: "/farcaster",
    text: "Going through my Channel follows to clean it up today was rough. Do not recommend if your FID is under like 500K.",
    href: "https://farcaster.xyz/sa/0x5ad8364f",
    engagement: "0 likes · 0 recasts · 6 replies",
  },
  {
    id: "cast-kayonfire-0xb79a081e",
    author: "kayonfire",
    handle: "@kayonfire",
    channel: "/farcaster",
    text: "NeonTetris has me in a chokehold 😤",
    href: "https://farcaster.xyz/kayonfire/0xb79a081e",
    engagement: "1 like · 0 recasts · 4 replies",
  },
  {
    id: "cast-bytebot-0x2821a296",
    author: "bytebot",
    handle: "@bytebot",
    channel: "/farcaster",
    text: "Curious, what do the base ambassadors really build on base?",
    href: "https://farcaster.xyz/bytebot/0x2821a296",
    engagement: "4 likes · 2 recasts · 8 replies",
  },
  {
    id: "cast-fuckcoolpussy-0xaadb037a",
    author: "fuckcoolpussy.eth",
    handle: "@fuckcoolpussy.eth",
    channel: "/farcaster",
    text: "After more than 2 years in crypto and earning $256, I lost everything today My mental state is at rock bottom, completely devoid of life I called my family and friends to share this important news I've decided to leave crypto today and come back tomorrow Thank everyone",
    href: "https://farcaster.xyz/fuckcoolpussy.eth/0xaadb037a",
    engagement: "17 likes · 1 recast · 43 replies",
  },
  {
    id: "cast-86ed-0x466c8edd",
    author: "86ed",
    handle: "@86ed",
    channel: "/farcaster",
    text: "If Y'ALL GOT AI JOBS OR ANY GOOD PAYING WEB3 JOB OR AI TRAINING JOB PLEASE PLEASE PLEASE Holl at me. I'M FULLY looking for a job",
    href: "https://farcaster.xyz/86ed/0x466c8edd",
    engagement: "0 likes · 0 recasts · 4 replies",
  },
  {
    id: "cast-statuette-0xfb2c7ec2",
    author: "statuette",
    handle: "@statuette",
    channel: "/farcaster",
    text: "My Neynar score is 0.97 I’ve been watching my score lately because I noticed that it keeps fluctuating between 0.97 and 0.98. I may be wrong, didn’t read the docs but it seems like posting miniapp template shares might be lowering my score.",
    href: "https://farcaster.xyz/statuette/0xfb2c7ec2",
    engagement: "3 likes · 1 recast · 16 replies",
  },
  {
    id: "cast-crezno-0x76a6dd7d",
    author: "crezno",
    handle: "@crezno",
    channel: "/farcaster",
    text: "I went to Boston",
    href: "https://farcaster.xyz/crezno/0x76a6dd7d",
    engagement: "2 likes · 2 recasts · 7 replies",
  },
  {
    id: "cast-cinthiaponce27-0x66d90407",
    author: "cinthiaponce27",
    handle: "@cinthiaponce27",
    channel: "/farcaster",
    text: "GM",
    href: "https://farcaster.xyz/cinthiaponce27/0x66d90407",
    engagement: "2 likes · 0 recasts · 7 replies",
  },
  {
    id: "cast-bfg-0x79de9d7e",
    author: "bfg",
    handle: "@bfg",
    channel: "/farcaster",
    text: "We're live - Farcaster Agentic Bootcamp Day #5 Wow 🤩 who'd say it's already a full week of daily learning about building agents on top of Farcaster stack (but most topics are applicable anywhere)",
    href: "https://farcaster.xyz/bfg/0x79de9d7e",
    engagement: "0 likes · 1 recast · 9 replies",
  },
  {
    id: "cast-antimofm-0xed2bbf27",
    author: "antimofm.eth",
    handle: "@antimofm.eth",
    channel: "/farcaster",
    text: "just realised casts show a double reaction line based on whether it's a timeline or a single cast url; gut feeling is this is obviously suboptimal (because information is duplicate, redundant and proximal) but the solution is not as obviouus",
    href: "https://farcaster.xyz/antimofm.eth/0xed2bbf27",
    engagement: "1 like · 1 recast · 10 replies",
  },
  {
    id: "cast-statuette-0x59641945",
    author: "statuette",
    handle: "@statuette",
    channel: "/farcaster",
    text: "Calling all @farcaster Agentic Bootcamp students! 📢🤓 Tomorrow is picture day! Don’t miss FAB class of ‘26 yearbook group photo shoot.",
    href: "https://farcaster.xyz/statuette/0x59641945",
    engagement: "4 likes · 7 recasts · 35 replies",
  },
  {
    id: "cast-bfg-0x64bfb1ea",
    author: "bfg",
    handle: "@bfg",
    channel: "/farcaster",
    text: "We're live with Farcaster Agentic Bootcamp Day #4 Learning about Memory and Context when building agents 🤯 Do you prompt your agent correctly and efficiently?",
    href: "https://farcaster.xyz/bfg/0x64bfb1ea",
    engagement: "0 likes · 0 recasts · 6 replies",
  },
  {
    id: "cast-aldirus-0xc1e76211",
    author: "aldirus",
    handle: "@aldirus",
    channel: "/farcaster",
    text: "0x392a1fc34F2fD81aa556800813c0b1CCde85BB07 Just Launch IT",
    href: "https://farcaster.xyz/aldirus/0xc1e76211",
    engagement: "0 likes · 0 recasts · 7 replies",
  },
];

export function getDiscovery(excludeIds: string[] = []): DiscoveryItem {
  const exclude = new Set(excludeIds);
  const available = CASTS.filter((item) => !exclude.has(item.id));
  const pool = available.length > 0 ? available : CASTS;
  return pool[Math.floor(Math.random() * pool.length)] ?? CASTS[0];
}
