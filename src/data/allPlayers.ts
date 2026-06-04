import type { PlayerCard } from '../context/CoinContext';

export const ALL_PLAYERS: PlayerCard[] = [
  /* ══════════════════════════════════════════════
     🇩🇪 BUNDESLIGA
  ══════════════════════════════════════════════ */
  // Bayern München
  { id:'p1',  name:'Manuel Neuer',      team:'Bayern München',    teamEmoji:'🔴', position:'GK', rating:88, pace:54, shooting:24, passing:80, defending:92, rarity:'legend', price:17500, image:'👑' },
  { id:'p2',  name:'Thomas Müller',     team:'Bayern München',    teamEmoji:'🔴', position:'ST', rating:82, pace:72, shooting:84, passing:79, defending:35, rarity:'normal', price:3000,  image:'👨' },
  { id:'p3',  name:'Joshua Kimmich',    team:'Bayern München',    teamEmoji:'🔴', position:'MF', rating:87, pace:70, shooting:74, passing:91, defending:79, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p4',  name:'Leon Goretzka',     team:'Bayern München',    teamEmoji:'🔴', position:'MF', rating:84, pace:76, shooting:78, passing:83, defending:75, rarity:'normal', price:3500,  image:'👨' },
  { id:'p5',  name:'Leroy Sané',        team:'Bayern München',    teamEmoji:'🔴', position:'RW', rating:86, pace:92, shooting:80, passing:78, defending:40, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p6',  name:'Jamal Musiala',     team:'Bayern München',    teamEmoji:'🔴', position:'AM', rating:88, pace:84, shooting:83, passing:87, defending:49, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p7',  name:'Harry Kane',        team:'Bayern München',    teamEmoji:'🔴', position:'ST', rating:90, pace:72, shooting:93, passing:84, defending:38, rarity:'rare',   price:7500,  image:'⭐' },
  { id:'p8',  name:'Dayot Upamecano',   team:'Bayern München',    teamEmoji:'🔴', position:'CB', rating:83, pace:80, shooting:40, passing:68, defending:84, rarity:'normal', price:3300,  image:'👨' },
  { id:'p9',  name:'Min-jae Kim',       team:'Bayern München',    teamEmoji:'🔴', position:'CB', rating:86, pace:80, shooting:42, passing:70, defending:87, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p10', name:'Alphonso Davies',   team:'Bayern München',    teamEmoji:'🔴', position:'LB', rating:85, pace:97, shooting:56, passing:74, defending:78, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p11', name:'Noussair Mazraoui', team:'Bayern München',    teamEmoji:'🔴', position:'RB', rating:82, pace:82, shooting:56, passing:72, defending:80, rarity:'normal', price:3200,  image:'👨' },
  { id:'p12', name:'Konrad Laimer',     team:'Bayern München',    teamEmoji:'🔴', position:'MF', rating:82, pace:84, shooting:68, passing:76, defending:78, rarity:'normal', price:3100,  image:'👨' },
  { id:'p13', name:'Serge Gnabry',      team:'Bayern München',    teamEmoji:'🔴', position:'RW', rating:83, pace:90, shooting:80, passing:74, defending:38, rarity:'normal', price:3400,  image:'👨' },
  { id:'p14', name:'Kingsley Coman',    team:'Bayern München',    teamEmoji:'🔴', position:'LW', rating:84, pace:94, shooting:76, passing:74, defending:38, rarity:'normal', price:3600,  image:'👨' },
  { id:'p15', name:'Sven Ulreich',      team:'Bayern München',    teamEmoji:'🔴', position:'GK', rating:78, pace:46, shooting:14, passing:68, defending:78, rarity:'normal', price:3000,  image:'👨' },
  // Borussia Dortmund
  { id:'p16', name:'Gregor Kobel',      team:'Borussia Dortmund', teamEmoji:'🟡', position:'GK', rating:85, pace:50, shooting:18, passing:74, defending:86, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p17', name:'Emre Can',          team:'Borussia Dortmund', teamEmoji:'🟡', position:'MF', rating:81, pace:72, shooting:68, passing:78, defending:80, rarity:'normal', price:3100,  image:'👨' },
  { id:'p18', name:'Julian Brandt',     team:'Borussia Dortmund', teamEmoji:'🟡', position:'MF', rating:82, pace:76, shooting:76, passing:84, defending:55, rarity:'normal', price:3100,  image:'👨' },
  { id:'p19', name:'Marco Reus',        team:'Borussia Dortmund', teamEmoji:'🟡', position:'AM', rating:83, pace:80, shooting:80, passing:84, defending:46, rarity:'normal', price:3400,  image:'👨' },
  { id:'p20', name:'Nico Schlotterbeck',team:'Borussia Dortmund', teamEmoji:'🟡', position:'CB', rating:82, pace:74, shooting:42, passing:72, defending:83, rarity:'normal', price:3000,  image:'👨' },
  { id:'p21', name:'Sebastien Haller',  team:'Borussia Dortmund', teamEmoji:'🟡', position:'ST', rating:80, pace:72, shooting:80, passing:64, defending:28, rarity:'normal', price:3000,  image:'👨' },
  { id:'p22', name:'Giovanni Reyna',    team:'Borussia Dortmund', teamEmoji:'🟡', position:'AM', rating:82, pace:80, shooting:74, passing:80, defending:48, rarity:'normal', price:3000,  image:'👨' },
  { id:'p23', name:'Karim Adeyemi',     team:'Borussia Dortmund', teamEmoji:'🟡', position:'LW', rating:82, pace:92, shooting:76, passing:68, defending:36, rarity:'normal', price:3200,  image:'👨' },
  { id:'p24', name:'Niklas Süle',       team:'Borussia Dortmund', teamEmoji:'🟡', position:'CB', rating:82, pace:76, shooting:44, passing:70, defending:83, rarity:'normal', price:3100,  image:'👨' },
  // Bayer Leverkusen
  { id:'p25', name:'Granit Xhaka',      team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'MF', rating:85, pace:68, shooting:72, passing:86, defending:80, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p26', name:'Florian Wirtz',     team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'AM', rating:88, pace:80, shooting:82, passing:88, defending:50, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p27', name:'Granit Xhaka',      team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'MF', rating:85, pace:68, shooting:72, passing:86, defending:80, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p28', name:'Victor Boniface',   team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'ST', rating:84, pace:84, shooting:82, passing:68, defending:32, rarity:'normal', price:3800,  image:'👨' },
  { id:'p29', name:'Alejandro Grimaldo',team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'LB', rating:85, pace:84, shooting:70, passing:80, defending:78, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p30', name:'Lukáš Hrádecký',   team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'GK', rating:84, pace:48, shooting:18, passing:72, defending:84, rarity:'normal', price:3600,  image:'👨' },
  // RB Leipzig
  { id:'p31', name:'Xavi Simons',       team:'RB Leipzig',        teamEmoji:'🔵', position:'AM', rating:85, pace:84, shooting:80, passing:84, defending:48, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p32', name:'Lois Openda',       team:'RB Leipzig',        teamEmoji:'🔵', position:'ST', rating:84, pace:90, shooting:82, passing:68, defending:30, rarity:'normal', price:3800,  image:'👨' },
  { id:'p33', name:'Willi Orban',       team:'RB Leipzig',        teamEmoji:'🔵', position:'CB', rating:81, pace:72, shooting:42, passing:68, defending:82, rarity:'normal', price:3000,  image:'👨' },
  { id:'p34', name:'Benjamin Sesko',    team:'RB Leipzig',        teamEmoji:'🔵', position:'ST', rating:83, pace:82, shooting:82, passing:64, defending:28, rarity:'normal', price:3500,  image:'👨' },
  // Borussia Mönchengladbach / Frankfurt / Freiburg
  { id:'p35', name:'Randal Kolo Muani', team:'Eintracht Frankfurt',teamEmoji:'🔴',position:'ST', rating:83, pace:88, shooting:78, passing:70, defending:32, rarity:'normal', price:3400,  image:'👨' },
  { id:'p36', name:'Lucas Alario',      team:'Eintracht Frankfurt',teamEmoji:'🔴',position:'ST', rating:79, pace:72, shooting:78, passing:62, defending:28, rarity:'normal', price:3000,  image:'👨' },
  { id:'p37', name:'Ritsu Doan',        team:'SC Freiburg',        teamEmoji:'🔵',position:'RW', rating:81, pace:84, shooting:76, passing:74, defending:50, rarity:'normal', price:3000,  image:'👨' },
  { id:'p38', name:'Vincenzo Grifo',    team:'SC Freiburg',        teamEmoji:'🔵',position:'LW', rating:81, pace:76, shooting:76, passing:78, defending:44, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE
  ══════════════════════════════════════════════ */
  // Arsenal
  { id:'p39', name:'David Raya',        team:'Arsenal',           teamEmoji:'🔴', position:'GK', rating:85, pace:50, shooting:18, passing:74, defending:85, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p40', name:'Ben White',         team:'Arsenal',           teamEmoji:'🔴', position:'RB', rating:82, pace:80, shooting:52, passing:74, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p41', name:'Kieran Tierney',    team:'Arsenal',           teamEmoji:'🔴', position:'LB', rating:80, pace:80, shooting:52, passing:70, defending:78, rarity:'normal', price:3000,  image:'👨' },
  { id:'p42', name:'Gabriel Magalhães', team:'Arsenal',           teamEmoji:'🔴', position:'CB', rating:85, pace:72, shooting:48, passing:70, defending:86, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p43', name:'William Saliba',    team:'Arsenal',           teamEmoji:'🔴', position:'CB', rating:87, pace:82, shooting:44, passing:76, defending:88, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p44', name:'Thomas Partey',     team:'Arsenal',           teamEmoji:'🔴', position:'MF', rating:84, pace:74, shooting:68, passing:80, defending:84, rarity:'normal', price:3700,  image:'👨' },
  { id:'p45', name:'Martin Ødegaard',   team:'Arsenal',           teamEmoji:'🔴', position:'AM', rating:88, pace:78, shooting:82, passing:90, defending:56, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p46', name:'Bukayo Saka',       team:'Arsenal',           teamEmoji:'🔴', position:'RW', rating:87, pace:88, shooting:82, passing:82, defending:48, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p47', name:'Gabriel Martinelli',team:'Arsenal',           teamEmoji:'🔴', position:'LW', rating:84, pace:90, shooting:80, passing:74, defending:40, rarity:'normal', price:3600,  image:'👨' },
  { id:'p48', name:'Kai Havertz',       team:'Arsenal',           teamEmoji:'🔴', position:'ST', rating:84, pace:76, shooting:80, passing:80, defending:50, rarity:'normal', price:3700,  image:'👨' },
  { id:'p49', name:'Gabriel Jesus',     team:'Arsenal',           teamEmoji:'🔴', position:'ST', rating:83, pace:88, shooting:78, passing:74, defending:44, rarity:'normal', price:3400,  image:'👨' },
  // Manchester City
  { id:'p50', name:'Ederson',           team:'Manchester City',   teamEmoji:'🩵', position:'GK', rating:89, pace:56, shooting:20, passing:82, defending:88, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p51', name:'Kyle Walker',       team:'Manchester City',   teamEmoji:'🩵', position:'RB', rating:82, pace:88, shooting:50, passing:68, defending:80, rarity:'normal', price:3200,  image:'👨' },
  { id:'p52', name:'Rúben Dias',        team:'Manchester City',   teamEmoji:'🩵', position:'CB', rating:86, pace:72, shooting:42, passing:70, defending:87, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p53', name:'Manuel Akanji',     team:'Manchester City',   teamEmoji:'🩵', position:'CB', rating:83, pace:76, shooting:40, passing:70, defending:84, rarity:'normal', price:3400,  image:'👨' },
  { id:'p54', name:'Joško Gvardiol',    team:'Manchester City',   teamEmoji:'🩵', position:'LB', rating:86, pace:82, shooting:56, passing:76, defending:86, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p55', name:'Rodri',             team:'Manchester City',   teamEmoji:'🩵', position:'MF', rating:91, pace:70, shooting:70, passing:86, defending:90, rarity:'epic',   price:11000, image:'💫' },
  { id:'p56', name:'Kevin De Bruyne',   team:'Manchester City',   teamEmoji:'🩵', position:'MF', rating:91, pace:76, shooting:85, passing:95, defending:62, rarity:'epic',   price:12000, image:'💫' },
  { id:'p57', name:'Bernardo Silva',    team:'Manchester City',   teamEmoji:'🩵', position:'MF', rating:88, pace:80, shooting:78, passing:86, defending:68, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p58', name:'Phil Foden',        team:'Manchester City',   teamEmoji:'🩵', position:'AM', rating:88, pace:84, shooting:82, passing:86, defending:48, rarity:'rare',   price:6800,  image:'⭐' },
  { id:'p59', name:'Jack Grealish',     team:'Manchester City',   teamEmoji:'🩵', position:'LW', rating:84, pace:80, shooting:74, passing:82, defending:42, rarity:'normal', price:3700,  image:'👨' },
  { id:'p60', name:'Erling Haaland',    team:'Manchester City',   teamEmoji:'🩵', position:'ST', rating:94, pace:89, shooting:96, passing:66, defending:42, rarity:'epic',   price:14000, image:'💫' },
  { id:'p61', name:'Jeremy Doku',       team:'Manchester City',   teamEmoji:'🩵', position:'LW', rating:82, pace:96, shooting:72, passing:70, defending:36, rarity:'normal', price:3300,  image:'👨' },
  // Liverpool
  { id:'p62', name:'Alisson Becker',    team:'Liverpool',         teamEmoji:'🔴', position:'GK', rating:89, pace:52, shooting:22, passing:78, defending:89, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p63', name:'Virgil van Dijk',   team:'Liverpool',         teamEmoji:'🔴', position:'CB', rating:90, pace:78, shooting:52, passing:76, defending:92, rarity:'epic',   price:10500, image:'💫' },
  { id:'p64', name:'Andrew Robertson',  team:'Liverpool',         teamEmoji:'🔴', position:'LB', rating:85, pace:84, shooting:58, passing:80, defending:82, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p65', name:'Mo Salah',          team:'Liverpool',         teamEmoji:'🔴', position:'RW', rating:90, pace:94, shooting:89, passing:82, defending:46, rarity:'epic',   price:11000, image:'💫' },
  { id:'p66', name:'Dominik Szoboszlai',team:'Liverpool',         teamEmoji:'🔴', position:'MF', rating:85, pace:80, shooting:80, passing:84, defending:62, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p67', name:'Alexis Mac Allister',team:'Liverpool',        teamEmoji:'🔴', position:'MF', rating:85, pace:74, shooting:76, passing:84, defending:70, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p68', name:'Luis Díaz',         team:'Liverpool',         teamEmoji:'🔴', position:'LW', rating:85, pace:90, shooting:80, passing:74, defending:42, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p69', name:'Darwin Núñez',      team:'Liverpool',         teamEmoji:'🔴', position:'ST', rating:84, pace:92, shooting:82, passing:68, defending:32, rarity:'normal', price:3800,  image:'👨' },
  { id:'p70', name:'Curtis Jones',      team:'Liverpool',         teamEmoji:'🔴', position:'MF', rating:81, pace:76, shooting:72, passing:78, defending:62, rarity:'normal', price:3000,  image:'👨' },
  { id:'p71', name:'Harvey Elliott',    team:'Liverpool',         teamEmoji:'🔴', position:'MF', rating:80, pace:78, shooting:72, passing:78, defending:52, rarity:'normal', price:3000,  image:'👨' },
  // Chelsea
  { id:'p72', name:'Robert Sánchez',    team:'Chelsea',           teamEmoji:'🔵', position:'GK', rating:82, pace:50, shooting:16, passing:70, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p73', name:'Reece James',       team:'Chelsea',           teamEmoji:'🔵', position:'RB', rating:86, pace:84, shooting:66, passing:78, defending:84, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p74', name:'Thiago Silva',      team:'Chelsea',           teamEmoji:'🔵', position:'CB', rating:85, pace:68, shooting:46, passing:76, defending:88, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p75', name:'Levi Colwill',      team:'Chelsea',           teamEmoji:'🔵', position:'CB', rating:82, pace:76, shooting:42, passing:72, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p76', name:'Marc Cucurella',    team:'Chelsea',           teamEmoji:'🔵', position:'LB', rating:82, pace:82, shooting:48, passing:72, defending:80, rarity:'normal', price:3100,  image:'👨' },
  { id:'p77', name:'Cole Palmer',       team:'Chelsea',           teamEmoji:'🔵', position:'AM', rating:87, pace:78, shooting:86, passing:84, defending:44, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p78', name:'Moisés Caicedo',    team:'Chelsea',           teamEmoji:'🔵', position:'MF', rating:84, pace:76, shooting:66, passing:78, defending:84, rarity:'normal', price:3700,  image:'👨' },
  { id:'p79', name:'Enzo Fernández',    team:'Chelsea',           teamEmoji:'🔵', position:'MF', rating:84, pace:74, shooting:74, passing:82, defending:72, rarity:'normal', price:3700,  image:'👨' },
  { id:'p80', name:'Raheem Sterling',   team:'Chelsea',           teamEmoji:'🔵', position:'LW', rating:83, pace:90, shooting:78, passing:72, defending:38, rarity:'normal', price:3400,  image:'👨' },
  { id:'p81', name:'Nicolas Jackson',   team:'Chelsea',           teamEmoji:'🔵', position:'ST', rating:82, pace:88, shooting:78, passing:66, defending:30, rarity:'normal', price:3300,  image:'👨' },
  // Tottenham
  { id:'p82', name:'Guglielmo Vicario', team:'Tottenham',         teamEmoji:'⚪', position:'GK', rating:84, pace:50, shooting:18, passing:72, defending:84, rarity:'normal', price:3700,  image:'👨' },
  { id:'p83', name:'Pedro Porro',       team:'Tottenham',         teamEmoji:'⚪', position:'RB', rating:82, pace:82, shooting:58, passing:72, defending:78, rarity:'normal', price:3200,  image:'👨' },
  { id:'p84', name:'Cristian Romero',   team:'Tottenham',         teamEmoji:'⚪', position:'CB', rating:85, pace:78, shooting:46, passing:68, defending:87, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p85', name:'Son Heung-min',     team:'Tottenham',         teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:86, passing:78, defending:40, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p86', name:'James Maddison',    team:'Tottenham',         teamEmoji:'⚪', position:'AM', rating:84, pace:74, shooting:78, passing:84, defending:50, rarity:'normal', price:3700,  image:'👨' },
  { id:'p87', name:'Richarlison',       team:'Tottenham',         teamEmoji:'⚪', position:'ST', rating:83, pace:82, shooting:80, passing:68, defending:38, rarity:'normal', price:3400,  image:'👨' },
  // Manchester United
  { id:'p88', name:'André Onana',       team:'Manchester United', teamEmoji:'🔴', position:'GK', rating:84, pace:48, shooting:20, passing:72, defending:84, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p89', name:'Noussair Mazraoui', team:'Manchester United', teamEmoji:'🔴', position:'RB', rating:82, pace:82, shooting:56, passing:72, defending:80, rarity:'normal', price:3200,  image:'👨' },
  { id:'p90', name:'Lisandro Martínez', team:'Manchester United', teamEmoji:'🔴', position:'CB', rating:85, pace:74, shooting:44, passing:70, defending:87, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p91', name:'Bruno Fernandes',   team:'Manchester United', teamEmoji:'🔴', position:'AM', rating:87, pace:76, shooting:82, passing:88, defending:54, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p92', name:'Marcus Rashford',   team:'Manchester United', teamEmoji:'🔴', position:'LW', rating:85, pace:92, shooting:80, passing:72, defending:38, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p93', name:'Rasmus Højlund',    team:'Manchester United', teamEmoji:'🔴', position:'ST', rating:82, pace:86, shooting:80, passing:66, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p94', name:'Kobbie Mainoo',     team:'Manchester United', teamEmoji:'🔴', position:'MF', rating:82, pace:76, shooting:70, passing:78, defending:72, rarity:'normal', price:3300,  image:'👨' },
  // Newcastle
  { id:'p95', name:'Nick Pope',         team:'Newcastle',         teamEmoji:'⚫', position:'GK', rating:85, pace:50, shooting:16, passing:70, defending:85, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p96', name:'Kieran Trippier',   team:'Newcastle',         teamEmoji:'⚫', position:'RB', rating:83, pace:74, shooting:64, passing:82, defending:80, rarity:'normal', price:3400,  image:'👨' },
  { id:'p97', name:'Fabian Schär',      team:'Newcastle',         teamEmoji:'⚫', position:'CB', rating:82, pace:70, shooting:52, passing:72, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p98', name:'Sven Botman',       team:'Newcastle',         teamEmoji:'⚫', position:'CB', rating:83, pace:72, shooting:40, passing:70, defending:84, rarity:'normal', price:3400,  image:'👨' },
  { id:'p99', name:'Alexander Isak',    team:'Newcastle',         teamEmoji:'⚫', position:'ST', rating:85, pace:86, shooting:83, passing:72, defending:32, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p100',name:'Bruno Guimarães',   team:'Newcastle',         teamEmoji:'⚫', position:'MF', rating:86, pace:74, shooting:72, passing:84, defending:80, rarity:'rare',   price:5500,  image:'⭐' },

  /* ══════════════════════════════════════════════
     🇪🇸 LA LIGA
  ══════════════════════════════════════════════ */
  // Real Madrid
  { id:'p101',name:'Thibaut Courtois',  team:'Real Madrid',       teamEmoji:'⚪', position:'GK', rating:91, pace:48, shooting:18, passing:78, defending:92, rarity:'epic',   price:12000, image:'💫' },
  { id:'p102',name:'Dani Carvajal',     team:'Real Madrid',       teamEmoji:'⚪', position:'RB', rating:83, pace:78, shooting:60, passing:76, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p103',name:'Éder Militão',      team:'Real Madrid',       teamEmoji:'⚪', position:'CB', rating:86, pace:80, shooting:42, passing:68, defending:88, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p104',name:'Antonio Rüdiger',   team:'Real Madrid',       teamEmoji:'⚪', position:'CB', rating:84, pace:74, shooting:45, passing:68, defending:86, rarity:'normal', price:3800,  image:'👨' },
  { id:'p105',name:'Ferland Mendy',     team:'Real Madrid',       teamEmoji:'⚪', position:'LB', rating:82, pace:84, shooting:50, passing:72, defending:80, rarity:'normal', price:3100,  image:'👨' },
  { id:'p106',name:'Aurelien Tchouaméni',team:'Real Madrid',      teamEmoji:'⚪', position:'MF', rating:85, pace:74, shooting:68, passing:78, defending:86, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p107',name:'Eduardo Camavinga', team:'Real Madrid',       teamEmoji:'⚪', position:'MF', rating:85, pace:82, shooting:68, passing:80, defending:76, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p108',name:'Luka Modrić',       team:'Real Madrid',       teamEmoji:'⚪', position:'MF', rating:88, pace:74, shooting:76, passing:92, defending:68, rarity:'rare',   price:7500,  image:'⭐' },
  { id:'p109',name:'Toni Kroos',        team:'Real Madrid',       teamEmoji:'⚪', position:'MF', rating:88, pace:60, shooting:80, passing:94, defending:72, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p110',name:'Jude Bellingham',   team:'Real Madrid',       teamEmoji:'⚪', position:'AM', rating:92, pace:84, shooting:87, passing:89, defending:72, rarity:'epic',   price:13000, image:'💫' },
  { id:'p111',name:'Vinicius Jr.',      team:'Real Madrid',       teamEmoji:'⚪', position:'LW', rating:92, pace:96, shooting:85, passing:78, defending:34, rarity:'epic',   price:13500, image:'💫' },
  { id:'p112',name:'Rodrygo Goes',      team:'Real Madrid',       teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:82, passing:79, defending:38, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p113',name:'Kylian Mbappé',     team:'Real Madrid',       teamEmoji:'⚪', position:'ST', rating:95, pace:99, shooting:93, passing:80, defending:38, rarity:'epic',   price:15000, image:'💫' },
  { id:'p114',name:'Brahim Díaz',       team:'Real Madrid',       teamEmoji:'⚪', position:'AM', rating:82, pace:82, shooting:76, passing:78, defending:38, rarity:'normal', price:3300,  image:'👨' },
  { id:'p115',name:'Trent A.-Arnold',   team:'Real Madrid',       teamEmoji:'⚪', position:'RB', rating:88, pace:80, shooting:72, passing:88, defending:76, rarity:'rare',   price:6500,  image:'⭐' },
  // Barcelona
  { id:'p116',name:'Marc-André ter Stegen',team:'Barcelona',      teamEmoji:'🔵', position:'GK', rating:90, pace:50, shooting:20, passing:82, defending:90, rarity:'epic',   price:10500, image:'💫' },
  { id:'p117',name:'Jules Koundé',      team:'Barcelona',         teamEmoji:'🔵', position:'RB', rating:85, pace:82, shooting:52, passing:76, defending:84, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p118',name:'Pau Cubarsí',       team:'Barcelona',         teamEmoji:'🔵', position:'CB', rating:83, pace:74, shooting:42, passing:72, defending:84, rarity:'normal', price:3500,  image:'👨' },
  { id:'p119',name:'Iñigo Martínez',    team:'Barcelona',         teamEmoji:'🔵', position:'CB', rating:82, pace:70, shooting:44, passing:72, defending:83, rarity:'normal', price:3200,  image:'👨' },
  { id:'p120',name:'Alejandro Balde',   team:'Barcelona',         teamEmoji:'🔵', position:'LB', rating:83, pace:90, shooting:52, passing:74, defending:80, rarity:'normal', price:3400,  image:'👨' },
  { id:'p121',name:'Frenkie de Jong',   team:'Barcelona',         teamEmoji:'🔵', position:'MF', rating:86, pace:76, shooting:72, passing:86, defending:72, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p122',name:'Gavi',              team:'Barcelona',         teamEmoji:'🔵', position:'MF', rating:86, pace:78, shooting:72, passing:88, defending:72, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p123',name:'Pedri González',    team:'Barcelona',         teamEmoji:'🔵', position:'MF', rating:89, pace:78, shooting:76, passing:90, defending:68, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p124',name:'Ilkay Gündoğan',    team:'Barcelona',         teamEmoji:'🔵', position:'MF', rating:86, pace:72, shooting:80, passing:88, defending:70, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p125',name:'Lamine Yamal',      team:'Barcelona',         teamEmoji:'🔵', position:'RW', rating:89, pace:92, shooting:85, passing:83, defending:36, rarity:'rare',   price:8500,  image:'⭐' },
  { id:'p126',name:'Raphinha',          team:'Barcelona',         teamEmoji:'🔵', position:'RW', rating:86, pace:88, shooting:82, passing:78, defending:40, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p127',name:'Ferran Torres',     team:'Barcelona',         teamEmoji:'🔵', position:'LW', rating:82, pace:84, shooting:78, passing:72, defending:38, rarity:'normal', price:3300,  image:'👨' },
  { id:'p128',name:'Robert Lewandowski',team:'Barcelona',         teamEmoji:'🔵', position:'ST', rating:90, pace:78, shooting:92, passing:78, defending:40, rarity:'epic',   price:11000, image:'💫' },
  { id:'p129',name:'Eric García',       team:'Barcelona',         teamEmoji:'🔵', position:'CB', rating:80, pace:72, shooting:38, passing:70, defending:80, rarity:'normal', price:3000,  image:'👨' },
  // Atlético Madrid
  { id:'p130',name:'Jan Oblak',         team:'Atlético Madrid',   teamEmoji:'🔴', position:'GK', rating:90, pace:46, shooting:18, passing:74, defending:90, rarity:'epic',   price:10500, image:'💫' },
  { id:'p131',name:'José Giménez',      team:'Atlético Madrid',   teamEmoji:'🔴', position:'CB', rating:84, pace:76, shooting:44, passing:68, defending:85, rarity:'normal', price:3700,  image:'👨' },
  { id:'p132',name:'Antoine Griezmann', team:'Atlético Madrid',   teamEmoji:'🔴', position:'AM', rating:87, pace:78, shooting:84, passing:82, defending:56, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p133',name:'Álvaro Morata',     team:'Atlético Madrid',   teamEmoji:'🔴', position:'ST', rating:83, pace:80, shooting:80, passing:72, defending:40, rarity:'normal', price:3400,  image:'👨' },
  { id:'p134',name:'João Félix',        team:'Atlético Madrid',   teamEmoji:'🔴', position:'AM', rating:84, pace:82, shooting:80, passing:78, defending:42, rarity:'normal', price:3700,  image:'👨' },
  { id:'p135',name:'Marcos Llorente',   team:'Atlético Madrid',   teamEmoji:'🔴', position:'MF', rating:82, pace:84, shooting:72, passing:78, defending:72, rarity:'normal', price:3200,  image:'👨' },
  { id:'p136',name:'Samuel Lino',       team:'Atlético Madrid',   teamEmoji:'🔴', position:'LW', rating:81, pace:82, shooting:72, passing:68, defending:38, rarity:'normal', price:3000,  image:'👨' },
  // Sevilla / Villarreal / Real Sociedad / Valencia
  { id:'p137',name:'Takefusa Kubo',     team:'Real Sociedad',     teamEmoji:'🔵', position:'RW', rating:84, pace:84, shooting:78, passing:80, defending:44, rarity:'normal', price:3700,  image:'👨' },
  { id:'p138',name:'Mikel Oyarzabal',   team:'Real Sociedad',     teamEmoji:'🔵', position:'LW', rating:83, pace:78, shooting:80, passing:78, defending:44, rarity:'normal', price:3400,  image:'👨' },
  { id:'p139',name:'Gerard Moreno',     team:'Villarreal',        teamEmoji:'🟡', position:'ST', rating:84, pace:76, shooting:84, passing:72, defending:32, rarity:'normal', price:3600,  image:'👨' },
  { id:'p140',name:'Dani Parejo',       team:'Villarreal',        teamEmoji:'🟡', position:'MF', rating:82, pace:64, shooting:70, passing:86, defending:68, rarity:'normal', price:3200,  image:'👨' },
  { id:'p141',name:'Youssef En-Nesyri', team:'Fenerbahçe',        teamEmoji:'🟡', position:'ST', rating:83, pace:78, shooting:82, passing:64, defending:30, rarity:'normal', price:3400,  image:'👨' },

  /* ══════════════════════════════════════════════
     🇮🇹 SERIE A
  ══════════════════════════════════════════════ */
  // Inter Milan
  { id:'p142',name:'Yann Sommer',       team:'Inter Mailand',     teamEmoji:'⚫', position:'GK', rating:86, pace:48, shooting:18, passing:74, defending:86, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p143',name:'Alessandro Bastoni',team:'Inter Mailand',     teamEmoji:'⚫', position:'CB', rating:87, pace:74, shooting:44, passing:78, defending:86, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p144',name:'Francesco Acerbi',  team:'Inter Mailand',     teamEmoji:'⚫', position:'CB', rating:83, pace:68, shooting:42, passing:70, defending:84, rarity:'normal', price:3400,  image:'👨' },
  { id:'p145',name:'Matteo Darmian',    team:'Inter Mailand',     teamEmoji:'⚫', position:'RB', rating:80, pace:78, shooting:50, passing:68, defending:78, rarity:'normal', price:3000,  image:'👨' },
  { id:'p146',name:'Federico Dimarco',  team:'Inter Mailand',     teamEmoji:'⚫', position:'LB', rating:83, pace:80, shooting:68, passing:76, defending:78, rarity:'normal', price:3400,  image:'👨' },
  { id:'p147',name:'Nicolò Barella',    team:'Inter Mailand',     teamEmoji:'⚫', position:'MF', rating:88, pace:78, shooting:78, passing:86, defending:78, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p148',name:'Hakan Çalhanoğlu',  team:'Inter Mailand',     teamEmoji:'⚫', position:'MF', rating:86, pace:72, shooting:78, passing:86, defending:72, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p149',name:'Piotr Zielinski',   team:'Inter Mailand',     teamEmoji:'⚫', position:'MF', rating:84, pace:72, shooting:76, passing:86, defending:62, rarity:'normal', price:3700,  image:'👨' },
  { id:'p150',name:'Lautaro Martínez',  team:'Inter Mailand',     teamEmoji:'⚫', position:'ST', rating:90, pace:80, shooting:88, passing:76, defending:38, rarity:'epic',   price:10500, image:'💫' },
  { id:'p151',name:'Marcus Thuram',     team:'Inter Mailand',     teamEmoji:'⚫', position:'ST', rating:86, pace:88, shooting:80, passing:70, defending:36, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p152',name:'Denzel Dumfries',   team:'Inter Mailand',     teamEmoji:'⚫', position:'RB', rating:82, pace:84, shooting:60, passing:70, defending:78, rarity:'normal', price:3200,  image:'👨' },
  // Juventus
  { id:'p153',name:'Wojciech Szczęsny', team:'Juventus',          teamEmoji:'⚫', position:'GK', rating:85, pace:46, shooting:18, passing:72, defending:85, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p154',name:'Gleison Bremer',    team:'Juventus',          teamEmoji:'⚫', position:'CB', rating:85, pace:74, shooting:44, passing:68, defending:87, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p155',name:'Adrien Rabiot',     team:'Juventus',          teamEmoji:'⚫', position:'MF', rating:83, pace:76, shooting:72, passing:80, defending:76, rarity:'normal', price:3400,  image:'👨' },
  { id:'p156',name:'Manuel Locatelli',  team:'Juventus',          teamEmoji:'⚫', position:'MF', rating:82, pace:70, shooting:68, passing:82, defending:78, rarity:'normal', price:3200,  image:'👨' },
  { id:'p157',name:'Dušan Vlahović',    team:'Juventus',          teamEmoji:'⚫', position:'ST', rating:86, pace:78, shooting:88, passing:66, defending:30, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p158',name:'Federico Chiesa',   team:'Juventus',          teamEmoji:'⚫', position:'RW', rating:84, pace:90, shooting:80, passing:72, defending:38, rarity:'normal', price:3600,  image:'👨' },
  { id:'p159',name:'Filip Kostić',      team:'Juventus',          teamEmoji:'⚫', position:'LW', rating:81, pace:78, shooting:68, passing:72, defending:54, rarity:'normal', price:3000,  image:'👨' },
  // AC Milan
  { id:'p160',name:'Mike Maignan',      team:'AC Mailand',        teamEmoji:'⚫', position:'GK', rating:88, pace:56, shooting:20, passing:76, defending:88, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p161',name:'Theo Hernández',    team:'AC Mailand',        teamEmoji:'⚫', position:'LB', rating:87, pace:90, shooting:64, passing:74, defending:78, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p162',name:'Rafael Leão',       team:'AC Mailand',        teamEmoji:'⚫', position:'LW', rating:87, pace:92, shooting:80, passing:74, defending:36, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p163',name:'Christian Pulisic', team:'AC Mailand',        teamEmoji:'⚫', position:'AM', rating:84, pace:82, shooting:78, passing:78, defending:46, rarity:'normal', price:3700,  image:'👨' },
  { id:'p164',name:'Olivier Giroud',    team:'Los Angeles FC',    teamEmoji:'⚫', position:'ST', rating:82, pace:64, shooting:82, passing:70, defending:32, rarity:'normal', price:3200,  image:'👨' },
  { id:'p165',name:'Sandro Tonali',     team:'Newcastle',         teamEmoji:'⚫', position:'MF', rating:84, pace:74, shooting:70, passing:82, defending:78, rarity:'normal', price:3700,  image:'👨' },
  // Napoli / Atalanta / Roma / Lazio
  { id:'p166',name:'Victor Osimhen',    team:'Napoli',            teamEmoji:'🔵', position:'ST', rating:88, pace:92, shooting:90, passing:70, defending:34, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p167',name:'Khvicha Kvaratskhelia',team:'Paris SG',       teamEmoji:'🔵', position:'LW', rating:88, pace:90, shooting:84, passing:82, defending:42, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p168',name:'Ademola Lookman',   team:'Atalanta',          teamEmoji:'🔵', position:'LW', rating:84, pace:88, shooting:82, passing:74, defending:38, rarity:'normal', price:3800,  image:'👨' },
  { id:'p169',name:'Gianluca Scamacca', team:'Atalanta',          teamEmoji:'🔵', position:'ST', rating:83, pace:80, shooting:82, passing:66, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p170',name:'Charles De Ketelaere',team:'Atalanta',        teamEmoji:'🔵', position:'AM', rating:82, pace:76, shooting:76, passing:80, defending:50, rarity:'normal', price:3200,  image:'👨' },
  { id:'p171',name:'Paulo Dybala',      team:'AS Roma',           teamEmoji:'🔴', position:'AM', rating:86, pace:78, shooting:84, passing:82, defending:40, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p172',name:'Lorenzo Pellegrini',team:'AS Roma',           teamEmoji:'🔴', position:'AM', rating:83, pace:74, shooting:76, passing:82, defending:58, rarity:'normal', price:3400,  image:'👨' },
  { id:'p173',name:'Ciro Immobile',     team:'Beşiktaş',          teamEmoji:'⚫', position:'ST', rating:83, pace:76, shooting:86, passing:68, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p174',name:'Sergej Milinković-Savić',team:'Al-Hilal',     teamEmoji:'🔵', position:'MF', rating:85, pace:72, shooting:76, passing:82, defending:66, rarity:'rare',   price:5000,  image:'⭐' },

  /* ══════════════════════════════════════════════
     🇫🇷 LIGUE 1
  ══════════════════════════════════════════════ */
  // Paris Saint-Germain
  { id:'p175',name:'Gianluigi Donnarumma',team:'Paris SG',        teamEmoji:'🔵', position:'GK', rating:90, pace:52, shooting:18, passing:76, defending:90, rarity:'epic',   price:10500, image:'💫' },
  { id:'p176',name:'Achraf Hakimi',      team:'Paris SG',         teamEmoji:'🔵', position:'RB', rating:87, pace:92, shooting:68, passing:80, defending:78, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p177',name:'Marquinhos',         team:'Paris SG',         teamEmoji:'🔵', position:'CB', rating:87, pace:76, shooting:48, passing:78, defending:88, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p178',name:'Lucas Hernández',    team:'Paris SG',         teamEmoji:'🔵', position:'CB', rating:84, pace:80, shooting:44, passing:70, defending:85, rarity:'normal', price:3700,  image:'👨' },
  { id:'p179',name:'Ousmane Dembélé',    team:'Paris SG',         teamEmoji:'🔵', position:'RW', rating:86, pace:96, shooting:80, passing:74, defending:36, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p180',name:'Fabian Ruiz',        team:'Paris SG',         teamEmoji:'🔵', position:'MF', rating:84, pace:70, shooting:74, passing:84, defending:68, rarity:'normal', price:3700,  image:'👨' },
  { id:'p181',name:'Vitinha',            team:'Paris SG',         teamEmoji:'🔵', position:'MF', rating:84, pace:76, shooting:72, passing:84, defending:64, rarity:'normal', price:3700,  image:'👨' },
  { id:'p182',name:'Bradley Barcola',    team:'Paris SG',         teamEmoji:'🔵', position:'LW', rating:83, pace:92, shooting:76, passing:72, defending:36, rarity:'normal', price:3600,  image:'👨' },
  // Olympique Marseille / Lyon / Monaco
  { id:'p183',name:'Pierre-Emerick Aubameyang',team:'Marseille',  teamEmoji:'🔵', position:'ST', rating:82, pace:88, shooting:80, passing:64, defending:28, rarity:'normal', price:3300,  image:'👨' },
  { id:'p184',name:'Azzedine Ounahi',    team:'Marseille',        teamEmoji:'🔵', position:'MF', rating:80, pace:78, shooting:66, passing:78, defending:66, rarity:'normal', price:3000,  image:'👨' },
  { id:'p185',name:'Alexandre Lacazette',team:'Lyon',             teamEmoji:'🔵', position:'ST', rating:82, pace:72, shooting:82, passing:70, defending:32, rarity:'normal', price:3200,  image:'👨' },
  { id:'p186',name:'Rayan Cherki',       team:'Lyon',             teamEmoji:'🔵', position:'AM', rating:82, pace:82, shooting:76, passing:80, defending:42, rarity:'normal', price:3300,  image:'👨' },
  { id:'p187',name:'Wissam Ben Yedder',  team:'Monaco',           teamEmoji:'🔴', position:'ST', rating:82, pace:76, shooting:84, passing:70, defending:28, rarity:'normal', price:3200,  image:'👨' },
  { id:'p188',name:'Breel Embolo',       team:'Monaco',           teamEmoji:'🔴', position:'ST', rating:81, pace:82, shooting:76, passing:66, defending:32, rarity:'normal', price:3000,  image:'👨' },
  { id:'p189',name:'Takumi Minamino',    team:'Monaco',           teamEmoji:'🔴', position:'AM', rating:80, pace:80, shooting:74, passing:74, defending:50, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🇵🇹 PORTUGAL – PRIMEIRA LIGA
  ══════════════════════════════════════════════ */
  { id:'p190',name:'João Palhinha',      team:'Bayern München',   teamEmoji:'🔴', position:'MF', rating:86, pace:74, shooting:64, passing:76, defending:88, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p191',name:'Pedro Neto',         team:'Chelsea',          teamEmoji:'🔵', position:'RW', rating:84, pace:90, shooting:74, passing:76, defending:38, rarity:'normal', price:3700,  image:'👨' },
  { id:'p192',name:'Rúben Neves',        team:'Al-Hilal',         teamEmoji:'🔵', position:'MF', rating:84, pace:70, shooting:74, passing:84, defending:76, rarity:'normal', price:3700,  image:'👨' },
  { id:'p193',name:'Pepe',               team:'FC Porto',         teamEmoji:'🔵', position:'CB', rating:80, pace:66, shooting:44, passing:64, defending:82, rarity:'normal', price:3000,  image:'👨' },
  { id:'p194',name:'Gonçalo Inácio',     team:'Sporting CP',      teamEmoji:'🟢', position:'CB', rating:82, pace:76, shooting:42, passing:72, defending:83, rarity:'normal', price:3300,  image:'👨' },
  { id:'p195',name:'Viktor Gyökeres',    team:'Sporting CP',      teamEmoji:'🟢', position:'ST', rating:86, pace:84, shooting:86, passing:68, defending:28, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p196',name:'Ricardo Horta',      team:'Sporting Braga',   teamEmoji:'🔴', position:'LW', rating:81, pace:80, shooting:76, passing:74, defending:40, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🇳🇱 EREDIVISIE
  ══════════════════════════════════════════════ */
  { id:'p197',name:'Steven Bergwijn',    team:'Ajax',             teamEmoji:'🔴', position:'LW', rating:82, pace:88, shooting:76, passing:72, defending:38, rarity:'normal', price:3200,  image:'👨' },
  { id:'p198',name:'Cody Gakpo',         team:'Liverpool',        teamEmoji:'🔴', position:'LW', rating:85, pace:84, shooting:80, passing:74, defending:40, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p199',name:'Xavi Simons',        team:'RB Leipzig',       teamEmoji:'🔵', position:'AM', rating:85, pace:84, shooting:80, passing:84, defending:48, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p200',name:'Donyell Malen',      team:'Borussia Dortmund',teamEmoji:'🟡', position:'RW', rating:82, pace:90, shooting:76, passing:68, defending:34, rarity:'normal', price:3200,  image:'👨' },

  /* ══════════════════════════════════════════════
     🇹🇷 TÜRKIYE – SÜPER LIG
  ══════════════════════════════════════════════ */
  { id:'p201',name:'Mauro Icardi',       team:'Galatasaray',      teamEmoji:'🟡', position:'ST', rating:82, pace:72, shooting:84, passing:64, defending:28, rarity:'normal', price:3300,  image:'👨' },
  { id:'p202',name:'Victor Osimhen',     team:'Galatasaray',      teamEmoji:'🟡', position:'ST', rating:88, pace:92, shooting:89, passing:70, defending:32, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p203',name:'Hakim Ziyech',       team:'Galatasaray',      teamEmoji:'🟡', position:'RW', rating:82, pace:80, shooting:78, passing:80, defending:38, rarity:'normal', price:3300,  image:'👨' },
  { id:'p204',name:'Ciro Immobile',      team:'Beşiktaş',         teamEmoji:'⚫', position:'ST', rating:83, pace:76, shooting:86, passing:68, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p205',name:'Dusan Tadic',        team:'Fenerbahçe',       teamEmoji:'🔵', position:'AM', rating:82, pace:72, shooting:76, passing:84, defending:48, rarity:'normal', price:3200,  image:'👨' },
  { id:'p206',name:'Enner Valencia',     team:'Fenerbahçe',       teamEmoji:'🔵', position:'ST', rating:80, pace:80, shooting:78, passing:64, defending:28, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🇸🇦 SAUDI PRO LEAGUE
  ══════════════════════════════════════════════ */
  { id:'p207',name:'Cristiano Ronaldo',  team:'Al-Nassr',         teamEmoji:'🔵', position:'ST', rating:90, pace:82, shooting:93, passing:76, defending:34, rarity:'epic',   price:14000, image:'💫' },
  { id:'p208',name:'Sadio Mané',         team:'Al-Nassr',         teamEmoji:'🔵', position:'LW', rating:84, pace:92, shooting:84, passing:76, defending:44, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p209',name:'Karim Benzema',      team:'Al-Ittihad',       teamEmoji:'🟡', position:'ST', rating:88, pace:74, shooting:88, passing:80, defending:36, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p210',name:'N\'Golo Kanté',      team:'Al-Ittihad',       teamEmoji:'🟡', position:'MF', rating:85, pace:76, shooting:64, passing:74, defending:88, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p211',name:'Fabinho',            team:'Al-Ittihad',       teamEmoji:'🟡', position:'MF', rating:83, pace:72, shooting:62, passing:74, defending:86, rarity:'normal', price:3400,  image:'👨' },
  { id:'p212',name:'Neymar Jr.',         team:'Al-Hilal',         teamEmoji:'🔵', position:'LW', rating:87, pace:88, shooting:84, passing:86, defending:36, rarity:'rare',   price:7500,  image:'⭐' },
  { id:'p213',name:'Kalidou Koulibaly',  team:'Al-Hilal',         teamEmoji:'🔵', position:'CB', rating:84, pace:76, shooting:42, passing:68, defending:86, rarity:'normal', price:3700,  image:'👨' },
  { id:'p214',name:'Sergej MLS',         team:'Al-Hilal',         teamEmoji:'🔵', position:'MF', rating:85, pace:72, shooting:76, passing:82, defending:66, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p215',name:'Riyad Mahrez',       team:'Al-Ahli',          teamEmoji:'🟢', position:'RW', rating:84, pace:84, shooting:80, passing:80, defending:38, rarity:'normal', price:3700,  image:'👨' },
  { id:'p216',name:'Roberto Firmino',    team:'Al-Ahli',          teamEmoji:'🟢', position:'ST', rating:83, pace:78, shooting:82, passing:78, defending:42, rarity:'normal', price:3400,  image:'👨' },
  { id:'p217',name:'Franck Kessié',      team:'Al-Ahli',          teamEmoji:'🟢', position:'MF', rating:82, pace:74, shooting:72, passing:74, defending:80, rarity:'normal', price:3200,  image:'👨' },
  { id:'p218',name:'Moussa Diaby',       team:'Al-Ittihad',       teamEmoji:'🟡', position:'LW', rating:84, pace:94, shooting:76, passing:72, defending:34, rarity:'normal', price:3700,  image:'👨' },
  { id:'p219',name:'Ruben Neves',        team:'Al-Hilal',         teamEmoji:'🔵', position:'MF', rating:84, pace:70, shooting:74, passing:84, defending:76, rarity:'normal', price:3700,  image:'👨' },
  { id:'p220',name:'Seko Fofana',        team:'Al-Qadsiah',       teamEmoji:'🟣', position:'MF', rating:83, pace:80, shooting:70, passing:78, defending:78, rarity:'normal', price:3400,  image:'👨' },
  { id:'p221',name:'Salem Al-Dawsari',   team:'Al-Hilal',         teamEmoji:'🔵', position:'LW', rating:80, pace:82, shooting:76, passing:74, defending:38, rarity:'normal', price:3000,  image:'👨' },
  { id:'p222',name:'Firas Al-Buraikan',  team:'Al-Fateh',         teamEmoji:'🟢', position:'ST', rating:79, pace:80, shooting:78, passing:62, defending:26, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🇸🇾 SYRIEN
  ══════════════════════════════════════════════ */
  { id:'p223',name:'Omar Al-Soma',       team:'Syrien NT',        teamEmoji:'🇸🇾', position:'ST', rating:81, pace:72, shooting:83, passing:66, defending:28, rarity:'normal', price:3200,  image:'👨' },
  { id:'p224',name:'Firas Al-Khatib',    team:'Syrien NT',        teamEmoji:'🇸🇾', position:'ST', rating:80, pace:70, shooting:82, passing:68, defending:26, rarity:'normal', price:3000,  image:'👨' },
  { id:'p225',name:'Amro Jenaat',        team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:78, pace:74, shooting:68, passing:78, defending:64, rarity:'normal', price:3000,  image:'👨' },
  { id:'p226',name:'Khaled Al-Mobayed', team:'Syrien NT',         teamEmoji:'🇸🇾', position:'CB', rating:77, pace:70, shooting:36, passing:66, defending:78, rarity:'normal', price:3000,  image:'👨' },
  { id:'p227',name:'Mahmoud Al-Baher',   team:'Syrien NT',        teamEmoji:'🇸🇾', position:'GK', rating:77, pace:48, shooting:18, passing:64, defending:78, rarity:'normal', price:3000,  image:'👨' },
  { id:'p228',name:'Murad Aboud',        team:'Syrien NT',        teamEmoji:'🇸🇾', position:'LB', rating:76, pace:74, shooting:44, passing:66, defending:76, rarity:'normal', price:3000,  image:'👨' },
  { id:'p229',name:'Youssef Kalfa',      team:'Syrien NT',        teamEmoji:'🇸🇾', position:'RW', rating:76, pace:80, shooting:72, passing:68, defending:36, rarity:'normal', price:3000,  image:'👨' },
  { id:'p230',name:'Mohamad Al-Zino',    team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:77, pace:76, shooting:66, passing:76, defending:60, rarity:'normal', price:3000,  image:'👨' },
  { id:'p231',name:'Ali Al-Aswad',       team:'Syrien NT',        teamEmoji:'🇸🇾', position:'ST', rating:76, pace:74, shooting:76, passing:60, defending:24, rarity:'normal', price:3000,  image:'👨' },
  { id:'p232',name:'Mahmoud Al-Mawas',   team:'Syrien NT',        teamEmoji:'🇸🇾', position:'RB', rating:75, pace:76, shooting:42, passing:64, defending:74, rarity:'normal', price:3000,  image:'👨' },
  { id:'p235s',name:'Maher Al-Sayed',     team:'Syrien NT',        teamEmoji:'🇸🇾', position:'GK', rating:76, pace:46, shooting:16, passing:62, defending:76, rarity:'normal', price:3000,  image:'👨' },
  { id:'p236s',name:'Ahmad Al-Saleh',    team:'Syrien NT',        teamEmoji:'🇸🇾', position:'CB', rating:76, pace:68, shooting:34, passing:64, defending:76, rarity:'normal', price:3000,  image:'👨' },
  { id:'p237s',name:'Mosab Balhous',     team:'Syrien NT',        teamEmoji:'🇸🇾', position:'CB', rating:75, pace:70, shooting:32, passing:62, defending:75, rarity:'normal', price:3000,  image:'👨' },
  { id:'p238s',name:'Abdelrazak Al-Husein',team:'Syrien NT',      teamEmoji:'🇸🇾', position:'RB', rating:75, pace:74, shooting:40, passing:64, defending:74, rarity:'normal', price:3000,  image:'👨' },
  { id:'p239s',name:'Basel Ramadan',     team:'Syrien NT',        teamEmoji:'🇸🇾', position:'LB', rating:75, pace:72, shooting:42, passing:62, defending:74, rarity:'normal', price:3000,  image:'👨' },
  { id:'p240s',name:'Abdullah Al-Hafez', team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:77, pace:76, shooting:64, passing:76, defending:62, rarity:'normal', price:3000,  image:'👨' },
  { id:'p241s',name:'Osama Omari',       team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:76, pace:74, shooting:62, passing:74, defending:64, rarity:'normal', price:3000,  image:'👨' },
  { id:'p242s',name:'Ali Dyab',          team:'Syrien NT',        teamEmoji:'🇸🇾', position:'AM', rating:77, pace:80, shooting:72, passing:74, defending:42, rarity:'normal', price:3000,  image:'👨' },
  { id:'p243s',name:'Majd Al-Deen Ingaz',team:'Syrien NT',        teamEmoji:'🇸🇾', position:'AM', rating:76, pace:78, shooting:70, passing:72, defending:40, rarity:'normal', price:3000,  image:'👨' },
  { id:'p244s',name:'Alaa Al-Deen Abou Zamra',team:'Syrien NT',   teamEmoji:'🇸🇾', position:'LW', rating:76, pace:80, shooting:70, passing:68, defending:36, rarity:'normal', price:3000,  image:'👨' },
  { id:'p245s',name:'Nadim Sabag',       team:'Syrien NT',        teamEmoji:'🇸🇾', position:'ST', rating:77, pace:76, shooting:76, passing:62, defending:24, rarity:'normal', price:3000,  image:'👨' },
  { id:'p246s',name:'Al-Moataz Bellah Alhamwi',team:'Syrien NT',  teamEmoji:'🇸🇾', position:'CB', rating:75, pace:68, shooting:30, passing:60, defending:75, rarity:'normal', price:3000,  image:'👨' },
  { id:'p247s',name:'Ghaith Alwan',      team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:76, pace:74, shooting:64, passing:74, defending:60, rarity:'normal', price:3000,  image:'👨' },
  { id:'p248s',name:'Bader Al-Din Kaddour',team:'Syrien NT',      teamEmoji:'🇸🇾', position:'RW', rating:75, pace:78, shooting:68, passing:66, defending:34, rarity:'normal', price:3000,  image:'👨' },
  { id:'p249s',name:'Mahmoud Al-Asa',    team:'Syrien NT',        teamEmoji:'🇸🇾', position:'GK', rating:74, pace:44, shooting:14, passing:60, defending:74, rarity:'normal', price:3000,  image:'👨' },
  { id:'p257s',name:'Elias Hadaya',      team:'Syrien NT',        teamEmoji:'🇸🇾', position:'GK', rating:76, pace:46, shooting:16, passing:64, defending:76, rarity:'normal', price:3000,  image:'👨' },
  { id:'p250s',name:'Firas Mawas',       team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:76, pace:76, shooting:66, passing:74, defending:62, rarity:'normal', price:3000,  image:'👨' },
  { id:'p251s',name:'Mahmoud Al-Douri',  team:'Syrien NT',        teamEmoji:'🇸🇾', position:'ST', rating:75, pace:72, shooting:74, passing:58, defending:22, rarity:'normal', price:3000,  image:'👨' },
  { id:'p252s',name:'Junior Sambia',     team:'Syrien NT',        teamEmoji:'🇸🇾', position:'RB', rating:78, pace:84, shooting:52, passing:68, defending:76, rarity:'normal', price:3000,  image:'👨' },
  { id:'p253s',name:'Ihab Jumah',        team:'Syrien NT',        teamEmoji:'🇸🇾', position:'CB', rating:75, pace:70, shooting:32, passing:62, defending:75, rarity:'normal', price:3000,  image:'👨' },
  { id:'p254s',name:'Maan Abdallah',     team:'Syrien NT',        teamEmoji:'🇸🇾', position:'LW', rating:76, pace:80, shooting:68, passing:68, defending:36, rarity:'normal', price:3000,  image:'👨' },
  { id:'p255s',name:'Tamer Haj Mohamad',team:'Syrien NT',         teamEmoji:'🇸🇾', position:'AM', rating:77, pace:78, shooting:72, passing:76, defending:44, rarity:'normal', price:3000,  image:'👨' },
  { id:'p256s',name:'Ziad Al-Khouja',    team:'Syrien NT',        teamEmoji:'🇸🇾', position:'MF', rating:75, pace:72, shooting:60, passing:72, defending:66, rarity:'normal', price:3000,  image:'👨' },
  { id:'p233',name:'Firas Al-Khatib (Leg.)',team:'Syrien (Leg.)', teamEmoji:'🇸🇾', position:'ST', rating:84, pace:72, shooting:86, passing:70, defending:28, rarity:'legend', price:16500, image:'👑' },
  { id:'p234',name:'Omar Al-Soma (Epic)',team:'Syrien (Epic)',     teamEmoji:'🇸🇾', position:'ST', rating:86, pace:74, shooting:86, passing:68, defending:30, rarity:'epic',   price:10000, image:'💫' },

  /* ══════════════════════════════════════════════
     🌍 ANDERE ARABISCHE LÄNDER
  ══════════════════════════════════════════════ */
  { id:'p235',name:'Mo Salah (ÄGY)',     team:'Ägypten NT',       teamEmoji:'🇪🇬', position:'RW', rating:90, pace:94, shooting:89, passing:82, defending:46, rarity:'epic',   price:11000, image:'💫' },
  { id:'p236',name:'Achraf Hakimi (MAR)',team:'Marokko NT',        teamEmoji:'🇲🇦', position:'RB', rating:87, pace:92, shooting:68, passing:80, defending:78, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p237',name:'Hakim Ziyech (MAR)', team:'Marokko NT',        teamEmoji:'🇲🇦', position:'RW', rating:82, pace:80, shooting:78, passing:80, defending:38, rarity:'normal', price:3300,  image:'👨' },
  { id:'p238',name:'Yassine Bounou',     team:'Marokko NT',        teamEmoji:'🇲🇦', position:'GK', rating:86, pace:50, shooting:18, passing:72, defending:86, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p239',name:'Youssef En-Nesyri',  team:'Marokko NT',        teamEmoji:'🇲🇦', position:'ST', rating:83, pace:78, shooting:82, passing:64, defending:30, rarity:'normal', price:3400,  image:'👨' },
  { id:'p240',name:'Azzedine Ounahi',    team:'Marokko NT',        teamEmoji:'🇲🇦', position:'MF', rating:80, pace:78, shooting:66, passing:78, defending:66, rarity:'normal', price:3000,  image:'👨' },
  { id:'p241',name:'Sofiane Boufal',     team:'Marokko NT',        teamEmoji:'🇲🇦', position:'LW', rating:81, pace:84, shooting:74, passing:74, defending:36, rarity:'normal', price:3100,  image:'👨' },
  { id:'p242',name:'Ali Al-Bulaihi',     team:'Saudi-Arabien NT',  teamEmoji:'🇸🇦', position:'CB', rating:77, pace:70, shooting:38, passing:64, defending:76, rarity:'normal', price:3000,  image:'👨' },
  { id:'p243',name:'Saleh Al-Shehri',    team:'Saudi-Arabien NT',  teamEmoji:'🇸🇦', position:'ST', rating:78, pace:78, shooting:76, passing:60, defending:26, rarity:'normal', price:3000,  image:'👨' },
  { id:'p244',name:'Marouane Fellaini',  team:'Shandong Taishan',  teamEmoji:'🇧🇪', position:'MF', rating:79, pace:64, shooting:70, passing:72, defending:72, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🌍 AFRICA – TOP PLAYERS
  ══════════════════════════════════════════════ */
  { id:'p245',name:'Edouard Mendy',      team:'Al-Ahli',          teamEmoji:'🟢', position:'GK', rating:84, pace:50, shooting:20, passing:70, defending:84, rarity:'normal', price:3700,  image:'👨' },
  { id:'p246',name:'Victor Osimhen (NGA)',team:'Nigeria NT',       teamEmoji:'🇳🇬', position:'ST', rating:87, pace:90, shooting:88, passing:68, defending:32, rarity:'rare',   price:6800,  image:'⭐' },
  { id:'p247',name:'Wilfried Zaha',      team:'Galatasaray',       teamEmoji:'🟡', position:'LW', rating:81, pace:90, shooting:76, passing:72, defending:36, rarity:'normal', price:3100,  image:'👨' },
  { id:'p248',name:'Pierre-Emerick Auba.',team:'Marseille',        teamEmoji:'🔵', position:'ST', rating:82, pace:88, shooting:80, passing:64, defending:28, rarity:'normal', price:3300,  image:'👨' },
  { id:'p249',name:'Riyad Mahrez (ALG)', team:'Algerien NT',       teamEmoji:'🇩🇿', position:'RW', rating:84, pace:84, shooting:80, passing:80, defending:38, rarity:'normal', price:3700,  image:'👨' },
  { id:'p250',name:'Andre Onana (KAM)',  team:'Kamerun NT',        teamEmoji:'🇨🇲', position:'GK', rating:84, pace:48, shooting:20, passing:72, defending:84, rarity:'normal', price:3700,  image:'👨' },
  { id:'p251',name:'Sadio Mané (SEN)',   team:'Senegal NT',        teamEmoji:'🇸🇳', position:'LW', rating:86, pace:92, shooting:84, passing:76, defending:44, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p252',name:'Kalidou Koulibaly (SEN)',team:'Senegal NT',    teamEmoji:'🇸🇳', position:'CB', rating:85, pace:76, shooting:42, passing:68, defending:87, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p253',name:'Serhou Guirassy',    team:'Borussia Dortmund', teamEmoji:'🟡', position:'ST', rating:84, pace:82, shooting:84, passing:64, defending:28, rarity:'normal', price:3700,  image:'👨' },
  { id:'p254',name:'Simon Adingra',      team:'Brighton',          teamEmoji:'🔵', position:'RW', rating:82, pace:90, shooting:74, passing:70, defending:36, rarity:'normal', price:3200,  image:'👨' },

  /* ══════════════════════════════════════════════
     🌎 SÜDAMERIKA
  ══════════════════════════════════════════════ */
  // Brasilien
  { id:'p255',name:'Alisson (BRA)',      team:'Brasilien NT',      teamEmoji:'🇧🇷', position:'GK', rating:90, pace:52, shooting:22, passing:78, defending:90, rarity:'epic',   price:10500, image:'💫' },
  { id:'p256',name:'Casemiro',           team:'Man United',        teamEmoji:'🔴', position:'MF', rating:85, pace:68, shooting:66, passing:74, defending:88, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p257',name:'Marquinhos (BRA)',   team:'Brasilien NT',      teamEmoji:'🇧🇷', position:'CB', rating:87, pace:76, shooting:48, passing:78, defending:88, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p258',name:'Rodrygo (BRA)',      team:'Brasilien NT',      teamEmoji:'🇧🇷', position:'RW', rating:87, pace:88, shooting:82, passing:79, defending:38, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p259',name:'Vinicius (BRA)',     team:'Brasilien NT',      teamEmoji:'🇧🇷', position:'LW', rating:92, pace:96, shooting:85, passing:78, defending:34, rarity:'epic',   price:13500, image:'💫' },
  { id:'p260',name:'Endrick',            team:'Real Madrid',       teamEmoji:'⚪', position:'ST', rating:82, pace:84, shooting:80, passing:64, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p261',name:'Gabriel Martinelli (BRA)',team:'Brasilien NT', teamEmoji:'🇧🇷', position:'LW', rating:84, pace:90, shooting:80, passing:74, defending:40, rarity:'normal', price:3700,  image:'👨' },
  { id:'p262',name:'Richarlison (BRA)',  team:'Brasilien NT',      teamEmoji:'🇧🇷', position:'ST', rating:84, pace:82, shooting:80, passing:68, defending:38, rarity:'normal', price:3700,  image:'👨' },
  // Argentinien
  { id:'p263',name:'Lionel Messi',       team:'Inter Miami',       teamEmoji:'🌸', position:'AM', rating:93, pace:80, shooting:90, passing:96, defending:38, rarity:'epic',   price:16000, image:'💫' },
  { id:'p264',name:'Messi (Legende)',    team:'Argentinien (Leg.)',teamEmoji:'🇦🇷', position:'AM', rating:97, pace:82, shooting:93, passing:97, defending:40, rarity:'legend', price:20000, image:'👑' },
  { id:'p265',name:'Emiliano Martínez',  team:'Aston Villa',       teamEmoji:'🟣', position:'GK', rating:88, pace:52, shooting:18, passing:72, defending:88, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p266',name:'Cristian Romero (ARG)',team:'Argentinien NT',  teamEmoji:'🇦🇷', position:'CB', rating:85, pace:78, shooting:46, passing:68, defending:87, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p267',name:'Lautaro Martínez (ARG)',team:'Argentinien NT', teamEmoji:'🇦🇷', position:'ST', rating:90, pace:80, shooting:88, passing:76, defending:38, rarity:'epic',   price:11000, image:'💫' },
  { id:'p268',name:'Julián Álvarez',     team:'Atlético Madrid',   teamEmoji:'🔴', position:'ST', rating:85, pace:82, shooting:82, passing:74, defending:42, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p269',name:'Rodrigo De Paul',    team:'Atlético Madrid',   teamEmoji:'🔴', position:'MF', rating:84, pace:78, shooting:72, passing:82, defending:72, rarity:'normal', price:3700,  image:'👨' },
  { id:'p270',name:'Mac Allister (ARG)', team:'Argentinien NT',    teamEmoji:'🇦🇷', position:'MF', rating:85, pace:74, shooting:76, passing:84, defending:70, rarity:'rare',   price:5000,  image:'⭐' },
  // Kolumbien / Uruguay / Chile
  { id:'p271',name:'Luis Díaz (KOL)',    team:'Kolumbien NT',      teamEmoji:'🇨🇴', position:'LW', rating:85, pace:90, shooting:80, passing:74, defending:42, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p272',name:'James Rodríguez',    team:'Rayo Vallecano',    teamEmoji:'🔴', position:'AM', rating:82, pace:72, shooting:76, passing:86, defending:44, rarity:'normal', price:3300,  image:'👨' },
  { id:'p273',name:'Darwin Núñez (URU)', team:'Uruguay NT',        teamEmoji:'🇺🇾', position:'ST', rating:84, pace:92, shooting:82, passing:68, defending:32, rarity:'normal', price:3700,  image:'👨' },
  { id:'p274',name:'Federico Valverde', team:'Real Madrid',        teamEmoji:'⚪', position:'MF', rating:87, pace:84, shooting:76, passing:82, defending:76, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p275',name:'Ronald Araújo',      team:'Barcelona',         teamEmoji:'🔵', position:'CB', rating:86, pace:80, shooting:44, passing:70, defending:87, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p276',name:'Alexis Sánchez',     team:'Udinese',           teamEmoji:'⚫', position:'LW', rating:81, pace:80, shooting:76, passing:72, defending:44, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🌏 ASIEN
  ══════════════════════════════════════════════ */
  // Japan
  { id:'p277',name:'Takefusa Kubo',      team:'Real Sociedad',     teamEmoji:'🔵', position:'RW', rating:84, pace:84, shooting:78, passing:80, defending:44, rarity:'normal', price:3700,  image:'👨' },
  { id:'p278',name:'Kaoru Mitoma',       team:'Brighton',          teamEmoji:'🔵', position:'LW', rating:83, pace:92, shooting:78, passing:74, defending:42, rarity:'normal', price:3500,  image:'👨' },
  { id:'p279',name:'Wataru Endo',        team:'Liverpool',         teamEmoji:'🔴', position:'MF', rating:82, pace:72, shooting:64, passing:76, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p280',name:'Ritsu Doan',         team:'SC Freiburg',       teamEmoji:'🔵', position:'RW', rating:81, pace:84, shooting:76, passing:74, defending:50, rarity:'normal', price:3000,  image:'👨' },
  { id:'p281',name:'Daichi Kamada',      team:'Crystal Palace',    teamEmoji:'🔵', position:'AM', rating:81, pace:72, shooting:74, passing:80, defending:52, rarity:'normal', price:3000,  image:'👨' },
  { id:'p282',name:'Junya Ito',          team:'Reims',             teamEmoji:'🔴', position:'RW', rating:80, pace:86, shooting:72, passing:68, defending:42, rarity:'normal', price:3000,  image:'👨' },
  { id:'p283',name:'Takehiro Tomiyasu',  team:'Arsenal',           teamEmoji:'🔴', position:'RB', rating:81, pace:78, shooting:48, passing:70, defending:80, rarity:'normal', price:3000,  image:'👨' },
  { id:'p284',name:'Hidemasa Morita',    team:'Sporting CP',       teamEmoji:'🟢', position:'MF', rating:80, pace:70, shooting:62, passing:76, defending:78, rarity:'normal', price:3000,  image:'👨' },
  // Südkorea
  { id:'p285',name:'Son Heung-min',      team:'Tottenham',         teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:86, passing:78, defending:40, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'p286',name:'Hwang Hee-chan',     team:'Wolverhampton',     teamEmoji:'🟡', position:'ST', rating:81, pace:88, shooting:78, passing:68, defending:34, rarity:'normal', price:3100,  image:'👨' },
  { id:'p287',name:'Hwang In-beom',     team:'Feyenoord',         teamEmoji:'🔴', position:'MF', rating:80, pace:78, shooting:68, passing:78, defending:68, rarity:'normal', price:3000,  image:'👨' },
  { id:'p288',name:'Kim Min-jae',        team:'Bayern München',    teamEmoji:'🔴', position:'CB', rating:86, pace:80, shooting:42, passing:70, defending:87, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p289',name:'Lee Jae-sung',       team:'Mainz 05',          teamEmoji:'🔴', position:'MF', rating:79, pace:74, shooting:70, passing:78, defending:68, rarity:'normal', price:3000,  image:'👨' },
  // Iran / Irak / Jordanien
  { id:'p290',name:'Sardar Azmoun',      team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'ST', rating:83, pace:78, shooting:82, passing:70, defending:30, rarity:'normal', price:3400,  image:'👨' },
  { id:'p291',name:'Mehdi Taremi',       team:'Inter Mailand',     teamEmoji:'⚫', position:'ST', rating:83, pace:76, shooting:82, passing:72, defending:30, rarity:'normal', price:3400,  image:'👨' },
  { id:'p292',name:'Mohanad Ali',        team:'Irak NT',           teamEmoji:'🇮🇶', position:'ST', rating:77, pace:74, shooting:76, passing:62, defending:26, rarity:'normal', price:3000,  image:'👨' },
  { id:'p293',name:'Yazan Al-Naimat',    team:'Jordanien NT',      teamEmoji:'🇯🇴', position:'MF', rating:75, pace:72, shooting:66, passing:72, defending:62, rarity:'normal', price:3000,  image:'👨' },
  // China / Australien
  { id:'p294',name:'Wu Lei',             team:'Espanyol',          teamEmoji:'🔵', position:'RW', rating:78, pace:82, shooting:72, passing:66, defending:36, rarity:'normal', price:3000,  image:'👨' },
  { id:'p295',name:'Mathew Ryan',        team:'Real Sociedad',     teamEmoji:'🔵', position:'GK', rating:83, pace:50, shooting:16, passing:70, defending:83, rarity:'normal', price:3400,  image:'👨' },
  { id:'p296',name:'Awer Mabil',         team:'Australien NT',     teamEmoji:'🇦🇺', position:'RW', rating:78, pace:84, shooting:70, passing:66, defending:36, rarity:'normal', price:3000,  image:'👨' },
  { id:'p297',name:'Ajdin Hrustic',      team:'Hellas Verona',     teamEmoji:'🔵', position:'AM', rating:79, pace:74, shooting:70, passing:78, defending:50, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🌎 MLS / LIGA MX / CONCACAF
  ══════════════════════════════════════════════ */
  { id:'p298',name:'Lionel Messi (MIA)', team:'Inter Miami',       teamEmoji:'🌸', position:'AM', rating:93, pace:80, shooting:90, passing:96, defending:38, rarity:'epic',   price:15000, image:'💫' },
  { id:'p299',name:'Luis Suárez',        team:'Inter Miami',       teamEmoji:'🌸', position:'ST', rating:83, pace:72, shooting:84, passing:74, defending:30, rarity:'normal', price:3500,  image:'👨' },
  { id:'p300',name:'Sergio Busquets',    team:'Inter Miami',       teamEmoji:'🌸', position:'MF', rating:82, pace:56, shooting:60, passing:88, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p301',name:'Lorenzo Insigne',    team:'Toronto FC',        teamEmoji:'🔵', position:'LW', rating:81, pace:78, shooting:78, passing:80, defending:38, rarity:'normal', price:3100,  image:'👨' },
  { id:'p302',name:'Christian Pulisic (USA)',team:'USA NT',         teamEmoji:'🇺🇸', position:'AM', rating:84, pace:82, shooting:78, passing:78, defending:46, rarity:'normal', price:3700,  image:'👨' },
  { id:'p303',name:'Tyler Adams',        team:'Bournemouth',       teamEmoji:'🔴', position:'MF', rating:81, pace:80, shooting:60, passing:74, defending:80, rarity:'normal', price:3000,  image:'👨' },
  { id:'p304',name:'Weston McKennie',    team:'Juventus',          teamEmoji:'⚫', position:'MF', rating:81, pace:78, shooting:70, passing:74, defending:72, rarity:'normal', price:3000,  image:'👨' },
  { id:'p305',name:'Gio Reyna',          team:'Borussia Dortmund', teamEmoji:'🟡', position:'AM', rating:82, pace:80, shooting:74, passing:80, defending:48, rarity:'normal', price:3000,  image:'👨' },
  { id:'p306',name:'Hirving Lozano',     team:'PSV',               teamEmoji:'🔴', position:'RW', rating:83, pace:92, shooting:76, passing:70, defending:38, rarity:'normal', price:3400,  image:'👨' },
  { id:'p307',name:'Javier Hernández',   team:'Chivas',            teamEmoji:'🔴', position:'ST', rating:78, pace:72, shooting:80, passing:62, defending:22, rarity:'normal', price:3000,  image:'👨' },
  { id:'p308',name:'Raúl Jiménez',       team:'Fulham',            teamEmoji:'⚪', position:'ST', rating:82, pace:76, shooting:80, passing:68, defending:28, rarity:'normal', price:3200,  image:'👨' },
  { id:'p309',name:'Carlos Vela',        team:'LAFC',              teamEmoji:'⚫', position:'ST', rating:80, pace:80, shooting:80, passing:72, defending:30, rarity:'normal', price:3000,  image:'👨' },

  /* ══════════════════════════════════════════════
     🌍 EUROPA – ANDERE NATIONEN
  ══════════════════════════════════════════════ */
  // Polen / Tschechien / Kroatien / Serbien
  { id:'p310',name:'Wojciech Szczęsny',  team:'Juventus',          teamEmoji:'⚫', position:'GK', rating:85, pace:46, shooting:18, passing:72, defending:85, rarity:'rare',   price:5000,  image:'⭐' },
  { id:'p311',name:'Patrik Schick',      team:'Bayer Leverkusen',  teamEmoji:'🔴', position:'ST', rating:83, pace:76, shooting:82, passing:66, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p312',name:'Luka Modrić (KRO)', team:'Kroatien NT',        teamEmoji:'🇭🇷', position:'MF', rating:88, pace:74, shooting:76, passing:92, defending:68, rarity:'rare',   price:7500,  image:'⭐' },
  { id:'p313',name:'Ivan Perišić',       team:'Hajduk Split',      teamEmoji:'⚪', position:'LW', rating:83, pace:80, shooting:76, passing:76, defending:60, rarity:'normal', price:3400,  image:'👨' },
  { id:'p314',name:'Aleksandar Mitrović',team:'Al-Hilal',          teamEmoji:'🔵', position:'ST', rating:83, pace:68, shooting:87, passing:60, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p315',name:'Dušan Vlahović (SER)',team:'Serbien NT',       teamEmoji:'🇷🇸', position:'ST', rating:86, pace:78, shooting:88, passing:66, defending:30, rarity:'rare',   price:5800,  image:'⭐' },
  // Belgien / Dänemark / Schweiz
  { id:'p316',name:'Kevin De Bruyne (BEL)',team:'Belgien NT',       teamEmoji:'🇧🇪', position:'MF', rating:91, pace:76, shooting:85, passing:95, defending:62, rarity:'epic',   price:12000, image:'💫' },
  { id:'p317',name:'Romelu Lukaku',      team:'AS Roma',           teamEmoji:'🔴', position:'ST', rating:85, pace:82, shooting:84, passing:64, defending:32, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p318',name:'Kasper Schmeichel', team:'Anderlecht',         teamEmoji:'🟣', position:'GK', rating:83, pace:48, shooting:18, passing:70, defending:83, rarity:'normal', price:3400,  image:'👨' },
  { id:'p319',name:'Pierre-Emile Højbjerg',team:'Marseille',       teamEmoji:'🔵', position:'MF', rating:82, pace:70, shooting:66, passing:78, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'p320',name:'Granit Xhaka (SUI)', team:'Schweiz NT',        teamEmoji:'🇨🇭', position:'MF', rating:85, pace:68, shooting:72, passing:86, defending:80, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p321',name:'Breel Embolo (SUI)', team:'Schweiz NT',        teamEmoji:'🇨🇭', position:'ST', rating:81, pace:82, shooting:76, passing:66, defending:32, rarity:'normal', price:3000,  image:'👨' },
  { id:'p322',name:'Manuel Akanji (SUI)',team:'Schweiz NT',        teamEmoji:'🇨🇭', position:'CB', rating:83, pace:76, shooting:40, passing:70, defending:84, rarity:'normal', price:3400,  image:'👨' },
  // Frankreich / Spanien / Deutschland NT
  { id:'p323',name:'Kylian Mbappé (FRA)',team:'Frankreich NT',     teamEmoji:'🇫🇷', position:'ST', rating:95, pace:99, shooting:93, passing:80, defending:38, rarity:'epic',   price:15000, image:'💫' },
  { id:'p324',name:'Antoine Griezmann (FRA)',team:'Frankreich NT', teamEmoji:'🇫🇷', position:'AM', rating:87, pace:78, shooting:84, passing:82, defending:56, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p325',name:'Aurélien Tchouaméni',team:'Frankreich NT',     teamEmoji:'🇫🇷', position:'MF', rating:85, pace:74, shooting:68, passing:78, defending:86, rarity:'rare',   price:5200,  image:'⭐' },
  { id:'p326',name:'Ousmane Dembélé (FRA)',team:'Frankreich NT',   teamEmoji:'🇫🇷', position:'RW', rating:86, pace:96, shooting:80, passing:74, defending:36, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'p327',name:'Pedri (ESP)',         team:'Spanien NT',        teamEmoji:'🇪🇸', position:'MF', rating:89, pace:78, shooting:76, passing:90, defending:68, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p328',name:'Lamine Yamal (ESP)', team:'Spanien NT',        teamEmoji:'🇪🇸', position:'RW', rating:89, pace:92, shooting:85, passing:83, defending:36, rarity:'rare',   price:8500,  image:'⭐' },
  { id:'p329',name:'Rodrigo (ESP)',       team:'Spanien NT',        teamEmoji:'🇪🇸', position:'MF', rating:91, pace:70, shooting:70, passing:86, defending:90, rarity:'epic',   price:11500, image:'💫' },
  { id:'p330',name:'Florian Wirtz (GER)',team:'Deutschland NT',    teamEmoji:'🇩🇪', position:'AM', rating:88, pace:80, shooting:82, passing:88, defending:50, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p331',name:'Jamal Musiala (GER)',team:'Deutschland NT',    teamEmoji:'🇩🇪', position:'AM', rating:88, pace:84, shooting:83, passing:87, defending:49, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'p332',name:'Joshua Kimmich (GER)',team:'Deutschland NT',   teamEmoji:'🇩🇪', position:'MF', rating:87, pace:70, shooting:74, passing:91, defending:79, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p333',name:'Kai Havertz (GER)',  team:'Deutschland NT',    teamEmoji:'🇩🇪', position:'ST', rating:84, pace:76, shooting:80, passing:80, defending:50, rarity:'normal', price:3700,  image:'👨' },
  // England / Italien / Portugal
  { id:'p334',name:'Jude Bellingham (ENG)',team:'England NT',      teamEmoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'AM', rating:92, pace:84, shooting:87, passing:89, defending:72, rarity:'epic',   price:13000, image:'💫' },
  { id:'p335',name:'Harry Kane (ENG)',   team:'England NT',        teamEmoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'ST', rating:90, pace:72, shooting:93, passing:84, defending:38, rarity:'rare',   price:7500,  image:'⭐' },
  { id:'p336',name:'Bukayo Saka (ENG)', team:'England NT',         teamEmoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', position:'RW', rating:87, pace:88, shooting:82, passing:82, defending:48, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p337',name:'Gianluigi Donnarumma (ITA)',team:'Italien NT', teamEmoji:'🇮🇹', position:'GK', rating:90, pace:52, shooting:18, passing:76, defending:90, rarity:'epic',   price:10500, image:'💫' },
  { id:'p338',name:'Nicolò Barella (ITA)',team:'Italien NT',       teamEmoji:'🇮🇹', position:'MF', rating:88, pace:78, shooting:78, passing:86, defending:78, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p339',name:'Cristiano Ronaldo (PRT)',team:'Portugal NT',   teamEmoji:'🇵🇹', position:'ST', rating:90, pace:82, shooting:93, passing:76, defending:34, rarity:'epic',   price:14000, image:'💫' },
  { id:'p340',name:'Rúben Dias (PRT)',   team:'Portugal NT',       teamEmoji:'🇵🇹', position:'CB', rating:86, pace:72, shooting:42, passing:70, defending:87, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'p341',name:'Bruno Fernandes (PRT)',team:'Portugal NT',     teamEmoji:'🇵🇹', position:'AM', rating:87, pace:76, shooting:82, passing:88, defending:54, rarity:'rare',   price:6000,  image:'⭐' },
  // Osteuropa / Russland / Ukraine
  { id:'p342',name:'Andriy Lunin',       team:'Real Madrid',       teamEmoji:'⚪', position:'GK', rating:84, pace:50, shooting:16, passing:72, defending:84, rarity:'normal', price:3700,  image:'👨' },
  { id:'p343',name:'Mykhailo Mudryk',    team:'Chelsea',           teamEmoji:'🔵', position:'LW', rating:82, pace:90, shooting:74, passing:70, defending:36, rarity:'normal', price:3300,  image:'👨' },
  { id:'p344',name:'Viktor Tsygankov',   team:'Girona',            teamEmoji:'🔴', position:'RW', rating:81, pace:84, shooting:74, passing:72, defending:38, rarity:'normal', price:3000,  image:'👨' },
  { id:'p345',name:'Robert Lewandowski (POL)',team:'Polen NT',      teamEmoji:'🇵🇱', position:'ST', rating:90, pace:78, shooting:92, passing:78, defending:40, rarity:'epic',   price:11000, image:'💫' },
  { id:'p346',name:'Piotr Zielinski (POL)',team:'Polen NT',        teamEmoji:'🇵🇱', position:'MF', rating:84, pace:72, shooting:76, passing:86, defending:62, rarity:'normal', price:3700,  image:'👨' },
  // Skandinavien
  { id:'p347',name:'Erling Haaland (NOR)',team:'Norwegen NT',      teamEmoji:'🇳🇴', position:'ST', rating:94, pace:89, shooting:96, passing:66, defending:42, rarity:'epic',   price:14000, image:'💫' },
  { id:'p348',name:'Martin Ødegaard (NOR)',team:'Norwegen NT',     teamEmoji:'🇳🇴', position:'AM', rating:88, pace:78, shooting:82, passing:90, defending:56, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'p349',name:'Rasmus Højlund (DEN)',team:'Dänemark NT',      teamEmoji:'🇩🇰', position:'ST', rating:82, pace:86, shooting:80, passing:66, defending:28, rarity:'normal', price:3400,  image:'👨' },
  { id:'p350',name:'Christian Eriksen',  team:'Manchester United', teamEmoji:'🔴', position:'MF', rating:84, pace:72, shooting:74, passing:88, defending:56, rarity:'normal', price:3700,  image:'👨' },
  { id:'p351',name:'Victor Olsen (SVE)', team:'Schweden NT',       teamEmoji:'🇸🇪', position:'ST', rating:78, pace:76, shooting:76, passing:62, defending:26, rarity:'normal', price:3000,  image:'👨' },
  { id:'p352',name:'Alexander Isak (SVE)',team:'Schweden NT',      teamEmoji:'🇸🇪', position:'ST', rating:85, pace:86, shooting:83, passing:72, defending:32, rarity:'rare',   price:5500,  image:'⭐' },

  /* ══════════════════════════════════════════════
     👑 LEGENDEN
  ══════════════════════════════════════════════ */
  { id:'p353',name:'Pelé',               team:'Brasilien (Leg.)',  teamEmoji:'🇧🇷', position:'ST', rating:98, pace:90, shooting:98, passing:88, defending:42, rarity:'legend', price:20000, image:'👑' },
  { id:'p354',name:'Diego Maradona',     team:'Argentinien (Leg.)',teamEmoji:'🇦🇷', position:'AM', rating:98, pace:88, shooting:90, passing:94, defending:50, rarity:'legend', price:20000, image:'👑' },
  { id:'p355',name:'Ronaldinho',         team:'Brasilien (Leg.)', teamEmoji:'🇧🇷',  position:'AM', rating:95, pace:86, shooting:88, passing:92, defending:38, rarity:'legend', price:20000, image:'👑' },
  { id:'p356',name:'Ronaldo R9',         team:'Brasilien (Leg.)', teamEmoji:'🇧🇷',  position:'ST', rating:97, pace:96, shooting:96, passing:78, defending:28, rarity:'legend', price:20000, image:'👑' },
  { id:'p357',name:'Zinedine Zidane',    team:'Frankreich (Leg.)',teamEmoji:'🇫🇷',  position:'AM', rating:95, pace:76, shooting:82, passing:96, defending:58, rarity:'legend', price:20000, image:'👑' },
  { id:'p358',name:'Johan Cruyff',       team:'Niederlande (Leg.)',teamEmoji:'🇳🇱', position:'ST', rating:96, pace:88, shooting:86, passing:90, defending:48, rarity:'legend', price:20000, image:'👑' },
  { id:'p359',name:'Franz Beckenbauer',  team:'Deutschland (Leg.)',teamEmoji:'🇩🇪', position:'CB', rating:94, pace:78, shooting:64, passing:84, defending:94, rarity:'legend', price:19500, image:'👑' },
  { id:'p360',name:'Paolo Maldini',      team:'AC Mailand (Leg.)',teamEmoji:'🔴',   position:'CB', rating:94, pace:80, shooting:50, passing:78, defending:96, rarity:'legend', price:19500, image:'👑' },
  { id:'p361',name:'Luka Modrić (Leg.)',team:'Real Madrid (Leg.)',teamEmoji:'⚪',   position:'MF', rating:90, pace:76, shooting:78, passing:94, defending:70, rarity:'legend', price:17000, image:'👑' },
  { id:'p362',name:'Andres Iniesta',     team:'Spanien (Leg.)',   teamEmoji:'🇪🇸',  position:'MF', rating:90, pace:78, shooting:76, passing:96, defending:68, rarity:'legend', price:18000, image:'👑' },
  { id:'p363',name:'Xavi Hernández',     team:'Spanien (Leg.)',   teamEmoji:'🇪🇸',  position:'MF', rating:90, pace:72, shooting:74, passing:97, defending:74, rarity:'legend', price:18500, image:'👑' },
  { id:'p364',name:'Andrea Pirlo',       team:'Juventus (Leg.)',  teamEmoji:'🇮🇹',  position:'MF', rating:90, pace:66, shooting:78, passing:96, defending:72, rarity:'legend', price:18000, image:'👑' },
  { id:'p365',name:'Roberto Carlos',     team:'Brasilien (Leg.)', teamEmoji:'🇧🇷',  position:'LB', rating:91, pace:92, shooting:76, passing:78, defending:84, rarity:'legend', price:17500, image:'👑' },
  { id:'p366',name:'Cafu',               team:'Brasilien (Leg.)', teamEmoji:'🇧🇷',  position:'RB', rating:90, pace:92, shooting:68, passing:76, defending:84, rarity:'legend', price:17000, image:'👑' },
  { id:'p367',name:'Thierry Henry',      team:'Frankreich (Leg.)',teamEmoji:'🇫🇷',  position:'ST', rating:94, pace:94, shooting:90, passing:80, defending:38, rarity:'legend', price:19000, image:'👑' },
  { id:'p368',name:'Samuel Eto\'o',      team:'Kamerun (Leg.)',   teamEmoji:'🇨🇲',  position:'ST', rating:92, pace:92, shooting:90, passing:72, defending:34, rarity:'legend', price:18500, image:'👑' },
  { id:'p369',name:'Didier Drogba',      team:'Elfenbeinküste (Leg.)',teamEmoji:'🇨🇮',position:'ST',rating:91,pace:82,shooting:88,passing:68,defending:36,rarity:'legend',price:17500,image:'👑' },
  { id:'p370',name:'Gianluigi Buffon',   team:'Juventus (Leg.)',  teamEmoji:'🇮🇹',  position:'GK', rating:91, pace:46, shooting:18, passing:76, defending:93, rarity:'legend', price:18000, image:'👑' },
  { id:'p371',name:'Peter Schmeichel',   team:'Dänemark (Leg.)',  teamEmoji:'🇩🇰',  position:'GK', rating:92, pace:50, shooting:20, passing:72, defending:93, rarity:'legend', price:18000, image:'👑' },
  { id:'p372',name:'Lothar Matthäus',    team:'Deutschland (Leg.)',teamEmoji:'🇩🇪', position:'MF', rating:93, pace:80, shooting:82, passing:86, defending:82, rarity:'legend', price:18500, image:'👑' },
  { id:'p373',name:'Ronaldo Fenômeno',   team:'Brasilien (Leg.)', teamEmoji:'🇧🇷',  position:'ST', rating:97, pace:96, shooting:96, passing:78, defending:28, rarity:'legend', price:20000, image:'👑' },
  { id:'p374',name:'Firas Al-Khatib (Leg.)',team:'Syrien (Leg.)', teamEmoji:'🇸🇾',  position:'ST', rating:84, pace:72, shooting:86, passing:70, defending:28, rarity:'legend', price:16500, image:'👑' },
  { id:'p375',name:'Serhiy Rebrov',      team:'Ukraine (Leg.)',   teamEmoji:'🇺🇦',  position:'ST', rating:85, pace:80, shooting:82, passing:72, defending:30, rarity:'legend', price:16000, image:'👑' },
  { id:'p376',name:'Hristo Stoichkov',   team:'Bulgarien (Leg.)', teamEmoji:'🇧🇬',  position:'LW', rating:91, pace:86, shooting:86, passing:80, defending:44, rarity:'legend', price:17000, image:'👑' },
  { id:'p377',name:'Eusébio',            team:'Portugal (Leg.)',  teamEmoji:'🇵🇹',  position:'ST', rating:95, pace:90, shooting:94, passing:78, defending:36, rarity:'legend', price:20000, image:'👑' },
  { id:'p378',name:'Garrincha',          team:'Brasilien (Leg.)', teamEmoji:'🇧🇷',  position:'RW', rating:93, pace:92, shooting:80, passing:80, defending:30, rarity:'legend', price:19000, image:'👑' },
  { id:'p379',name:'Ferenc Puskás',      team:'Ungarn (Leg.)',    teamEmoji:'🇭🇺',  position:'ST', rating:94, pace:80, shooting:94, passing:80, defending:28, rarity:'legend', price:19500, image:'👑' },
  { id:'p380',name:'George Best',        team:'Nordirland (Leg.)',teamEmoji:'🇬🇧',  position:'RW', rating:93, pace:88, shooting:84, passing:82, defending:36, rarity:'legend', price:19000, image:'👑' },
];
