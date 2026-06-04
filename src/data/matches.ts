export interface Team {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  league: string;
  country: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  minute: number | null;
  status: 'upcoming' | 'live' | 'finished';
  competition: string;
  competitionEmoji: string;
  venue: string;
  streamUrl?: string;
}

export const teams: Team[] = [
  // ── DEUTSCHLAND – Bundesliga ──────────────────────────────────
  { id: 'fcb',  name: 'Bayern München',           shortName: 'FCB', emoji: '🔴',    league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'bvb',  name: 'Borussia Dortmund',         shortName: 'BVB', emoji: '🟡',    league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'baye', name: 'Bayer Leverkusen',           shortName: 'B04', emoji: '🔴⚫',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'rbl',  name: 'RB Leipzig',                shortName: 'RBL', emoji: '🔴⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'sge',  name: 'Eintracht Frankfurt',        shortName: 'SGE', emoji: '⚫🔴',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'vfb',  name: 'VfB Stuttgart',             shortName: 'VFB', emoji: '⚪🔴',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'bmg',  name: 'Borussia Mönchengladbach',  shortName: 'BMG', emoji: '⚪🟢',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'wob',  name: 'VfL Wolfsburg',             shortName: 'WOB', emoji: '🟢⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'svw',  name: 'Werder Bremen',             shortName: 'SVW', emoji: '🟢⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'hsv',  name: 'Hamburger SV',              shortName: 'HSV', emoji: '🔴⚪🔵',league: 'Bundesliga',         country: '🇩🇪' },
  { id: 's04',  name: 'Schalke 04',                shortName: 'S04', emoji: '🔵⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'fcn',  name: '1. FC Nürnberg',            shortName: 'FCN', emoji: '🔴',    league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'koe',  name: '1. FC Köln',               shortName: 'KOE', emoji: '🔴⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'her',  name: 'Hertha BSC',               shortName: 'BSC', emoji: '🔵⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'mai',  name: '1. FSV Mainz 05',          shortName: 'M05', emoji: '🔴⚪',  league: 'Bundesliga',         country: '🇩🇪' },
  { id: 'aug',  name: 'FC Augsburg',              shortName: 'FCA', emoji: '🔴🟢',  league: 'Bundesliga',         country: '🇩🇪' },

  // ── ENGLAND – Premier League ──────────────────────────────────
  { id: 'mcity',name: 'Manchester City',           shortName: 'MCI', emoji: '🔵',    league: 'Premier League',     country: '🇬🇧' },
  { id: 'lfc',  name: 'Liverpool FC',              shortName: 'LFC', emoji: '🔴',    league: 'Premier League',     country: '🇬🇧' },
  { id: 'che',  name: 'Chelsea FC',               shortName: 'CHE', emoji: '🔵',    league: 'Premier League',     country: '🇬🇧' },
  { id: 'ars',  name: 'Arsenal FC',               shortName: 'ARS', emoji: '🔴⚪',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'mun',  name: 'Manchester United',         shortName: 'MUN', emoji: '🔴',    league: 'Premier League',     country: '🇬🇧' },
  { id: 'tot',  name: 'Tottenham Hotspur',        shortName: 'TOT', emoji: '⚪🔵',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'new',  name: 'Newcastle United',         shortName: 'NEW', emoji: '⚫⚪',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'avl',  name: 'Aston Villa',             shortName: 'AVL', emoji: '🟣🔵',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'whu',  name: 'West Ham United',          shortName: 'WHU', emoji: '🟣🔵',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'bha',  name: 'Brighton & Hove Albion',  shortName: 'BHA', emoji: '🔵⚪',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'eve',  name: 'Everton FC',              shortName: 'EVE', emoji: '🔵',    league: 'Premier League',     country: '🇬🇧' },
  { id: 'lei',  name: 'Leicester City',           shortName: 'LEI', emoji: '🔵',    league: 'Premier League',     country: '🇬🇧' },
  { id: 'wol',  name: 'Wolverhampton Wanderers', shortName: 'WOL', emoji: '🟠⚫',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'cry',  name: 'Crystal Palace',          shortName: 'CRY', emoji: '🔴🔵',  league: 'Premier League',     country: '🇬🇧' },
  { id: 'bur',  name: 'Burnley FC',              shortName: 'BUR', emoji: '🟤🔵',  league: 'Premier League',     country: '🇬🇧' },

  // ── SPANIEN – La Liga ─────────────────────────────────────────
  { id: 'rma',  name: 'Real Madrid',              shortName: 'RMA', emoji: '⚪',    league: 'La Liga',            country: '🇪🇸' },
  { id: 'bar',  name: 'FC Barcelona',             shortName: 'BAR', emoji: '🔵🔴',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'atm',  name: 'Atlético Madrid',          shortName: 'ATM', emoji: '🔴⚪',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'sev',  name: 'FC Sevilla',              shortName: 'SEV', emoji: '⚪🔴',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'val',  name: 'FC Valencia',             shortName: 'VAL', emoji: '⚪🟠',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'ath',  name: 'Athletic Bilbao',         shortName: 'ATH', emoji: '🔴⚪',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'rso',  name: 'Real Sociedad',           shortName: 'RSO', emoji: '🔵⚪',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'vil',  name: 'Villarreal CF',           shortName: 'VIL', emoji: '🟡',    league: 'La Liga',            country: '🇪🇸' },
  { id: 'bet',  name: 'Real Betis',              shortName: 'BET', emoji: '🟢⚪',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'cel2', name: 'Celta de Vigo',           shortName: 'CEL', emoji: '🔵⚪',  league: 'La Liga',            country: '🇪🇸' },
  { id: 'osa',  name: 'CA Osasuna',             shortName: 'OSA', emoji: '🔴',    league: 'La Liga',            country: '🇪🇸' },
  { id: 'gir',  name: 'Girona FC',              shortName: 'GIR', emoji: '🔴⚪',  league: 'La Liga',            country: '🇪🇸' },

  // ── ITALIEN – Serie A ─────────────────────────────────────────
  { id: 'juv',  name: 'Juventus FC',             shortName: 'JUV', emoji: '⚫⚪',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'int',  name: 'Inter Mailand',           shortName: 'INT', emoji: '🔵⚫',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'acm',  name: 'AC Milan',               shortName: 'ACM', emoji: '🔴⚫',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'nap',  name: 'SSC Napoli',             shortName: 'NAP', emoji: '🔵',    league: 'Serie A',            country: '🇮🇹' },
  { id: 'rom',  name: 'AS Roma',               shortName: 'ROM', emoji: '🟡🔴',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'laz',  name: 'SS Lazio',              shortName: 'LAZ', emoji: '🔵⚪',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'fio',  name: 'ACF Fiorentina',        shortName: 'FIO', emoji: '🟣',    league: 'Serie A',            country: '🇮🇹' },
  { id: 'ata',  name: 'Atalanta BC',           shortName: 'ATA', emoji: '⚫🔵',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'tor',  name: 'FC Turin',              shortName: 'TOR', emoji: '🟤',    league: 'Serie A',            country: '🇮🇹' },
  { id: 'udin', name: 'Udinese Calcio',        shortName: 'UDI', emoji: '⚫⚪',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'bol',  name: 'FC Bologna',            shortName: 'BOL', emoji: '🔴🔵',  league: 'Serie A',            country: '🇮🇹' },
  { id: 'sas',  name: 'US Sassuolo',           shortName: 'SAS', emoji: '🟢⚫',  league: 'Serie A',            country: '🇮🇹' },

  // ── FRANKREICH – Ligue 1 ──────────────────────────────────────
  { id: 'psg',  name: 'Paris Saint-Germain',    shortName: 'PSG', emoji: '🔵🔴',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'ol',   name: 'Olympique Lyon',         shortName: 'OL',  emoji: '🔴🔵',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'om',   name: 'Olympique Marseille',    shortName: 'OM',  emoji: '🔵⚪',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'asm',  name: 'AS Monaco',             shortName: 'ASM', emoji: '🔴⚪',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'lil',  name: 'LOSC Lille',            shortName: 'LIL', emoji: '🔴🟡',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'ren',  name: 'Stade Rennais',         shortName: 'REN', emoji: '🔴⚫',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'nic',  name: 'OGC Nice',              shortName: 'NIC', emoji: '🔴⚫',  league: 'Ligue 1',            country: '🇫🇷' },
  { id: 'len',  name: 'RC Lens',               shortName: 'LEN', emoji: '🟡🔴',  league: 'Ligue 1',            country: '🇫🇷' },

  // ── NIEDERLANDE – Eredivisie ──────────────────────────────────
  { id: 'aja',  name: 'AFC Ajax',              shortName: 'AJA', emoji: '🔴⚪',  league: 'Eredivisie',         country: '🇳🇱' },
  { id: 'psv',  name: 'PSV Eindhoven',         shortName: 'PSV', emoji: '🔴⚪',  league: 'Eredivisie',         country: '🇳🇱' },
  { id: 'fey',  name: 'Feyenoord Rotterdam',  shortName: 'FEY', emoji: '🔴⚪',  league: 'Eredivisie',         country: '🇳🇱' },
  { id: 'azt',  name: 'AZ Alkmaar',           shortName: 'AZ',  emoji: '🔴⚪',  league: 'Eredivisie',         country: '🇳🇱' },

  // ── PORTUGAL – Primeira Liga ──────────────────────────────────
  { id: 'ben',  name: 'SL Benfica',            shortName: 'BEN', emoji: '🔴',    league: 'Primeira Liga',      country: '🇵🇹' },
  { id: 'por',  name: 'FC Porto',              shortName: 'POR', emoji: '🔵⚪',  league: 'Primeira Liga',      country: '🇵🇹' },
  { id: 'scp',  name: 'Sporting CP',           shortName: 'SCP', emoji: '🟢⚪',  league: 'Primeira Liga',      country: '🇵🇹' },
  { id: 'bra',  name: 'SC Braga',              shortName: 'SCB', emoji: '🔴⚪',  league: 'Primeira Liga',      country: '🇵🇹' },

  // ── SCHOTTLAND ────────────────────────────────────────────────
  { id: 'cel',  name: 'Celtic FC',             shortName: 'CEL', emoji: '🟢⚪',  league: 'Scottish Premiership', country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'ran',  name: 'Rangers FC',            shortName: 'RAN', emoji: '🔵',    league: 'Scottish Premiership', country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },

  // ── TÜRKEI – Süper Lig ────────────────────────────────────────
  { id: 'gal',  name: 'Galatasaray',           shortName: 'GAL', emoji: '🔴🟡',  league: 'Süper Lig',          country: '🇹🇷' },
  { id: 'fen',  name: 'Fenerbahçe',            shortName: 'FEN', emoji: '🟡🔵',  league: 'Süper Lig',          country: '🇹🇷' },
  { id: 'bes',  name: 'Beşiktaş',              shortName: 'BJK', emoji: '⚫⚪',  league: 'Süper Lig',          country: '🇹🇷' },
  { id: 'tra',  name: 'Trabzonspor',           shortName: 'TRA', emoji: '🟣🔵',  league: 'Süper Lig',          country: '🇹🇷' },

  // ── RUSSLAND – Premier Liga ───────────────────────────────────
  { id: 'csk',  name: 'ZSKA Moskau',           shortName: 'CSK', emoji: '🔴⚫',  league: 'Russian Premier League', country: '🇷🇺' },
  { id: 'spa',  name: 'Spartak Moskau',        shortName: 'SPA', emoji: '🔴⚪',  league: 'Russian Premier League', country: '🇷🇺' },
  { id: 'zen',  name: 'Zenit St. Petersburg',  shortName: 'ZEN', emoji: '🔵⚪',  league: 'Russian Premier League', country: '🇷🇺' },

  // ── BELGIEN ───────────────────────────────────────────────────
  { id: 'clb',  name: 'Club Brügge',           shortName: 'CLB', emoji: '🔵⚫',  league: 'Belgian Pro League', country: '🇧🇪' },
  { id: 'and',  name: 'RSC Anderlecht',        shortName: 'AND', emoji: '🟣⚪',  league: 'Belgian Pro League', country: '🇧🇪' },

  // ── ÖSTERREICH ───────────────────────────────────────────────
  { id: 'rbs',  name: 'Red Bull Salzburg',     shortName: 'RBS', emoji: '🔴⚪',  league: 'Austrian Bundesliga', country: '🇦🇹' },
  { id: 'ski',  name: 'SK Rapid Wien',         shortName: 'SKR', emoji: '🟢⚪',  league: 'Austrian Bundesliga', country: '🇦🇹' },

  // ── SCHWEIZ ───────────────────────────────────────────────────
  { id: 'fcbs', name: 'FC Basel',              shortName: 'FCB', emoji: '🔴🔵',  league: 'Swiss Super League', country: '🇨🇭' },
  { id: 'ybs',  name: 'BSC Young Boys',        shortName: 'YB',  emoji: '🟡⚫',  league: 'Swiss Super League', country: '🇨🇭' },

  // ── GRIECHENLAND ─────────────────────────────────────────────
  { id: 'oly',  name: 'Olympiakos Piräus',     shortName: 'OLY', emoji: '🔴⚪',  league: 'Super League Greece', country: '🇬🇷' },
  { id: 'pao',  name: 'Panathinaikos',         shortName: 'PAO', emoji: '🟢⚪',  league: 'Super League Greece', country: '🇬🇷' },
  { id: 'aek',  name: 'AEK Athen',             shortName: 'AEK', emoji: '🟡⚫',  league: 'Super League Greece', country: '🇬🇷' },

  // ── USA – MLS ─────────────────────────────────────────────────
  { id: 'lac',  name: 'LA Galaxy',             shortName: 'LAG', emoji: '🔵🟡',  league: 'MLS',                country: '🇺🇸' },
  { id: 'nycfc',name: 'New York City FC',      shortName: 'NYC', emoji: '🔵',    league: 'MLS',                country: '🇺🇸' },
  { id: 'atlu', name: 'Atlanta United',        shortName: 'ATL', emoji: '🔴⚫',  league: 'MLS',                country: '🇺🇸' },
  { id: 'inter',name: 'Inter Miami CF',        shortName: 'MIA', emoji: '🩷⚫',  league: 'MLS',                country: '🇺🇸' },
  { id: 'seat', name: 'Seattle Sounders',      shortName: 'SEA', emoji: '🟢🔵',  league: 'MLS',                country: '🇺🇸' },
  { id: 'port', name: 'Portland Timbers',      shortName: 'POR', emoji: '🟢',    league: 'MLS',                country: '🇺🇸' },

  // ── BRASILIEN – Serie A ───────────────────────────────────────
  { id: 'flam', name: 'Flamengo',              shortName: 'FLA', emoji: '🔴⚫',  league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'palm', name: 'Palmeiras',             shortName: 'PAL', emoji: '🟢',    league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'saop', name: 'São Paulo FC',          shortName: 'SAO', emoji: '🔴⚫⚪', league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'cor',  name: 'Corinthians',           shortName: 'COR', emoji: '⚫⚪',  league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'sant', name: 'Santos FC',             shortName: 'SAN', emoji: '⚪⚫',  league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'gre',  name: 'Grêmio',               shortName: 'GRE', emoji: '🔵⚫',  league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'int2', name: 'Internacional',         shortName: 'INT', emoji: '🔴',    league: 'Brasileirão Serie A', country: '🇧🇷' },
  { id: 'athlm',name: 'Atlético Mineiro',      shortName: 'CAM', emoji: '⚫',    league: 'Brasileirão Serie A', country: '🇧🇷' },

  // ── ARGENTINIEN ───────────────────────────────────────────────
  { id: 'boca', name: 'Boca Juniors',          shortName: 'BOC', emoji: '🔵🟡',  league: 'Liga Profesional Argentina', country: '🇦🇷' },
  { id: 'riv',  name: 'River Plate',           shortName: 'RIV', emoji: '⚪🔴',  league: 'Liga Profesional Argentina', country: '🇦🇷' },
  { id: 'rac',  name: 'Racing Club',           shortName: 'RAC', emoji: '🔵⚪',  league: 'Liga Profesional Argentina', country: '🇦🇷' },
  { id: 'ind',  name: 'Independiente',         shortName: 'IND', emoji: '🔴',    league: 'Liga Profesional Argentina', country: '🇦🇷' },

  // ── MEXIKO – Liga MX ──────────────────────────────────────────
  { id: 'ame',  name: 'Club América',          shortName: 'AME', emoji: '🟡⚫',  league: 'Liga MX',            country: '🇲🇽' },
  { id: 'chv',  name: 'Guadalajara (Chivas)',  shortName: 'CHV', emoji: '🔴⚪',  league: 'Liga MX',            country: '🇲🇽' },
  { id: 'cruz', name: 'Cruz Azul',             shortName: 'CAZ', emoji: '🔵⚪',  league: 'Liga MX',            country: '🇲🇽' },
  { id: 'pum',  name: 'Pumas UNAM',            shortName: 'PUM', emoji: '🔵🟡',  league: 'Liga MX',            country: '🇲🇽' },

  // ── JAPAN – J-League ─────────────────────────────────────────
  { id: 'kash', name: 'Kashima Antlers',       shortName: 'KAS', emoji: '🔴',    league: 'J1 League',          country: '🇯🇵' },
  { id: 'gamp', name: 'Gamba Osaka',           shortName: 'GAM', emoji: '🔵',    league: 'J1 League',          country: '🇯🇵' },
  { id: 'ura',  name: 'Urawa Red Diamonds',    shortName: 'URA', emoji: '🔴',    league: 'J1 League',          country: '🇯🇵' },
  { id: 'yoko', name: 'Yokohama F. Marinos',   shortName: 'YFM', emoji: '🔵⚪🔴', league: 'J1 League',         country: '🇯🇵' },

  // ── SÜDKOREA – K-League ───────────────────────────────────────
  { id: 'jun',  name: 'Jeonbuk Motors',        shortName: 'JBM', emoji: '🟢',    league: 'K League 1',         country: '🇰🇷' },
  { id: 'ulsan',name: 'Ulsan Hyundai',         shortName: 'ULS', emoji: '🔵🟡',  league: 'K League 1',         country: '🇰🇷' },

  // ── CHINA – Super League ──────────────────────────────────────
  { id: 'shag', name: 'Shanghai Port FC',      shortName: 'SHG', emoji: '🔵🔴',  league: 'Chinese Super League', country: '🇨🇳' },
  { id: 'bfcg', name: 'Beijing Guoan',         shortName: 'BJG', emoji: '🟢',    league: 'Chinese Super League', country: '🇨🇳' },

  // ── SAUDI ARABIEN – SPL ───────────────────────────────────────
  { id: 'ahli', name: 'Al-Ahli SC',            shortName: 'AHL', emoji: '🟢⚪',  league: 'Saudi Pro League',   country: '🇸🇦' },
  { id: 'hiil', name: 'Al-Hilal SFC',          shortName: 'HIL', emoji: '🔵',    league: 'Saudi Pro League',   country: '🇸🇦' },
  { id: 'nasr', name: 'Al-Nassr FC',           shortName: 'NAS', emoji: '🟡',    league: 'Saudi Pro League',   country: '🇸🇦' },
  { id: 'ittih',name: 'Al-Ittihad',            shortName: 'ITT', emoji: '🟡⚫',  league: 'Saudi Pro League',   country: '🇸🇦' },

  // ── ÄGYPTEN – Egyptian Premier League ────────────────────────
  { id: 'eahli',name: 'Al Ahly SC',            shortName: 'AHL', emoji: '🔴',    league: 'Egyptian Premier League', country: '🇪🇬' },
  { id: 'zam',  name: 'Zamalek SC',            shortName: 'ZAM', emoji: '⚪',    league: 'Egyptian Premier League', country: '🇪🇬' },

  // ── SÜDAFRIKA ─────────────────────────────────────────────────
  { id: 'kai',  name: 'Kaizer Chiefs',         shortName: 'KAI', emoji: '🟡⚫',  league: 'South African PSL',  country: '🇿🇦' },
  { id: 'or',   name: 'Orlando Pirates',       shortName: 'ORP', emoji: '⚫⚪',  league: 'South African PSL',  country: '🇿🇦' },

  // ── AUSTRALIEN – A-League ─────────────────────────────────────
  { id: 'syd',  name: 'Sydney FC',             shortName: 'SYD', emoji: '🔵',    league: 'A-League',           country: '🇦🇺' },
  { id: 'melt', name: 'Melbourne City',        shortName: 'MLC', emoji: '🔵⚪',  league: 'A-League',           country: '🇦🇺' },

  // ── SYRIEN ────────────────────────────────────────────────────
  { id: 'alhil_sy', name: 'Al-Hilal Damaskus',    shortName: 'HLD', emoji: '🔵⚪',  league: 'Syrian Premier League', country: '🇸🇾' },
  { id: 'wahed',    name: 'Al-Wahda SC',           shortName: 'WAH', emoji: '🔴⚪',  league: 'Syrian Premier League', country: '🇸🇾' },
  { id: 'jais',     name: 'Al-Jaish SC',           shortName: 'JAI', emoji: '🟢⚪',  league: 'Syrian Premier League', country: '🇸🇾' },
  { id: 'karam',    name: 'Al-Karamah SC',         shortName: 'KAR', emoji: '🔴🟡',  league: 'Syrian Premier League', country: '🇸🇾' },
  { id: 'majd',     name: 'Al-Majd SC',            shortName: 'MAJ', emoji: '🔵🟡',  league: 'Syrian Premier League', country: '🇸🇾' },
  { id: 'wathbah',  name: 'Al-Wathbah Homs',       shortName: 'WAT', emoji: '🟢⚫',  league: 'Syrian Premier League', country: '🇸🇾' },
];

function getTeam(id: string): Team {
  return teams.find(t => t.id === id)!;
}

export const matches: Match[] = [
  // ── LIVE ──────────────────────────────────────────────────────
  {
    id: 'm1',
    homeTeam: getTeam('fcb'), awayTeam: getTeam('rma'),
    homeScore: 2, awayScore: 1,
    date: new Date().toISOString(), minute: 67,
    status: 'live',
    competition: 'UEFA Champions League', competitionEmoji: '⭐',
    venue: 'Allianz Arena, München',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1',
  },
  {
    id: 'm2',
    homeTeam: getTeam('lfc'), awayTeam: getTeam('psg'),
    homeScore: 1, awayScore: 1,
    date: new Date().toISOString(), minute: 34,
    status: 'live',
    competition: 'UEFA Champions League', competitionEmoji: '⭐',
    venue: 'Anfield, Liverpool',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1',
  },
  {
    id: 'm3',
    homeTeam: getTeam('bvb'), awayTeam: getTeam('bar'),
    homeScore: 0, awayScore: 2,
    date: new Date().toISOString(), minute: 81,
    status: 'live',
    competition: 'UEFA Champions League', competitionEmoji: '⭐',
    venue: 'Signal Iduna Park, Dortmund',
    streamUrl: 'https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1',
  },
  // ── BEVORSTEHEND ──────────────────────────────────────────────
  { id: 'm4',  homeTeam: getTeam('mcity'), awayTeam: getTeam('juv'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 2*3600000).toISOString(),   minute: null, status: 'upcoming', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Etihad Stadium, Manchester' },
  { id: 'm5',  homeTeam: getTeam('rma'),  awayTeam: getTeam('atm'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 5*3600000).toISOString(),   minute: null, status: 'upcoming', competition: 'La Liga',              competitionEmoji: '🇪🇸', venue: 'Santiago Bernabéu, Madrid' },
  { id: 'm6',  homeTeam: getTeam('fcb'),  awayTeam: getTeam('bvb'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 24*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Bundesliga',           competitionEmoji: '🇩🇪', venue: 'Allianz Arena, München' },
  { id: 'm7',  homeTeam: getTeam('bar'),  awayTeam: getTeam('che'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 26*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Camp Nou, Barcelona' },
  { id: 'm8',  homeTeam: getTeam('int'),  awayTeam: getTeam('juv'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 30*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Serie A',              competitionEmoji: '🇮🇹', venue: 'Stadio Meazza, Mailand' },
  { id: 'm9',  homeTeam: getTeam('lfc'),  awayTeam: getTeam('mcity'),homeScore: null, awayScore: null, date: new Date(Date.now() + 48*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Premier League',       competitionEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: 'Anfield, Liverpool' },
  { id: 'm10', homeTeam: getTeam('psg'),  awayTeam: getTeam('rma'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 50*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Parc des Princes, Paris' },
  { id: 'm11', homeTeam: getTeam('baye'), awayTeam: getTeam('fcb'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 72*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Bundesliga',           competitionEmoji: '🇩🇪', venue: 'BayArena, Leverkusen' },
  { id: 'm12', homeTeam: getTeam('atm'),  awayTeam: getTeam('bar'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 74*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'La Liga',              competitionEmoji: '🇪🇸', venue: 'Metropolitano, Madrid' },
  { id: 'm13', homeTeam: getTeam('che'),  awayTeam: getTeam('lfc'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 96*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Premier League',       competitionEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: 'Stamford Bridge, London' },
  { id: 'm14', homeTeam: getTeam('juv'),  awayTeam: getTeam('psg'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 120*3600000).toISOString(), minute: null, status: 'upcoming', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Allianz Stadium, Turin' },
  { id: 'm21', homeTeam: getTeam('ars'),  awayTeam: getTeam('tot'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 28*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Premier League',       competitionEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: 'Emirates Stadium, London' },
  { id: 'm22', homeTeam: getTeam('acm'),  awayTeam: getTeam('nap'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 32*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Serie A',              competitionEmoji: '🇮🇹', venue: 'San Siro, Mailand' },
  { id: 'm23', homeTeam: getTeam('ol'),   awayTeam: getTeam('om'),   homeScore: null, awayScore: null, date: new Date(Date.now() + 36*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Ligue 1',              competitionEmoji: '🇫🇷', venue: 'Groupama Stadium, Lyon' },
  { id: 'm24', homeTeam: getTeam('rbl'),  awayTeam: getTeam('vfb'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 40*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Bundesliga',           competitionEmoji: '🇩🇪', venue: 'Red Bull Arena, Leipzig' },
  { id: 'm25', homeTeam: getTeam('ben'),  awayTeam: getTeam('por'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 44*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Primeira Liga',        competitionEmoji: '🇵🇹', venue: 'Estádio da Luz, Lissabon' },
  { id: 'm26', homeTeam: getTeam('new'),  awayTeam: getTeam('mun'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 56*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Premier League',       competitionEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: 'St. James Park, Newcastle' },
  { id: 'm27', homeTeam: getTeam('sev'),  awayTeam: getTeam('vil'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 60*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'La Liga',              competitionEmoji: '🇪🇸', venue: 'Sánchez Pizjuán, Sevilla' },
  { id: 'm28', homeTeam: getTeam('aja'),  awayTeam: getTeam('cel'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 80*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'UEFA Europa League',   competitionEmoji: '🏆',  venue: 'Johan Cruyff Arena, Amsterdam' },
  { id: 'm29', homeTeam: getTeam('ata'),  awayTeam: getTeam('rom'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 84*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Serie A',              competitionEmoji: '🇮🇹', venue: 'Gewiss Stadium, Bergamo' },
  { id: 'm30', homeTeam: getTeam('asm'),  awayTeam: getTeam('lil'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 100*3600000).toISOString(), minute: null, status: 'upcoming', competition: 'Ligue 1',              competitionEmoji: '🇫🇷', venue: 'Stade Louis II, Monaco' },
  { id: 'm31', homeTeam: getTeam('gal'),  awayTeam: getTeam('fen'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 46*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Süper Lig',            competitionEmoji: '🇹🇷', venue: 'RAMS Park, Istanbul' },
  { id: 'm32', homeTeam: getTeam('flam'), awayTeam: getTeam('palm'), homeScore: null, awayScore: null, date: new Date(Date.now() + 54*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Brasileirão',          competitionEmoji: '🇧🇷', venue: 'Maracanã, Rio de Janeiro' },
  { id: 'm33', homeTeam: getTeam('boca'), awayTeam: getTeam('riv'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 62*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Liga Profesional',     competitionEmoji: '🇦🇷', venue: 'La Bombonera, Buenos Aires' },
  { id: 'm34', homeTeam: getTeam('inter'),awayTeam: getTeam('atlu'), homeScore: null, awayScore: null, date: new Date(Date.now() + 66*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'MLS',                  competitionEmoji: '🇺🇸', venue: 'Chase Stadium, Miami' },
  { id: 'm35', homeTeam: getTeam('nasr'), awayTeam: getTeam('hiil'), homeScore: null, awayScore: null, date: new Date(Date.now() + 70*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Saudi Pro League',     competitionEmoji: '🇸🇦', venue: 'Mrsool Park, Riad' },
  { id: 'm36', homeTeam: getTeam('psv'),  awayTeam: getTeam('fey'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 76*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Eredivisie',           competitionEmoji: '🇳🇱', venue: 'Philips Stadion, Eindhoven' },
  { id: 'm37', homeTeam: getTeam('rbs'),  awayTeam: getTeam('ybs'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 90*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Austrian Bundesliga',  competitionEmoji: '🇦🇹', venue: 'Red Bull Arena, Salzburg' },
  { id: 'm38', homeTeam: getTeam('scp'),  awayTeam: getTeam('bra'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 92*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Primeira Liga',        competitionEmoji: '🇵🇹', venue: 'Estádio de Alvalade, Lissabon' },
  { id: 'm39', homeTeam: getTeam('eahli'),awayTeam: getTeam('zam'),  homeScore: null, awayScore: null, date: new Date(Date.now() + 94*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'Egyptian Premier League',competitionEmoji: '🇪🇬', venue: 'Cairo International Stadium' },
  { id: 'm40', homeTeam: getTeam('kash'), awayTeam: getTeam('yoko'), homeScore: null, awayScore: null, date: new Date(Date.now() + 98*3600000).toISOString(),  minute: null, status: 'upcoming', competition: 'J1 League',            competitionEmoji: '🇯🇵', venue: 'Kashima Soccer Stadium' },
  // ── ABGESCHLOSSEN ─────────────────────────────────────────────
  { id: 'm15', homeTeam: getTeam('mcity'), awayTeam: getTeam('bvb'),  homeScore: 3, awayScore: 1, date: new Date(Date.now() - 24*3600000).toISOString(),  minute: 90, status: 'finished', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Etihad Stadium, Manchester' },
  { id: 'm16', homeTeam: getTeam('rma'),   awayTeam: getTeam('juv'),  homeScore: 2, awayScore: 0, date: new Date(Date.now() - 48*3600000).toISOString(),  minute: 90, status: 'finished', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Santiago Bernabéu, Madrid' },
  { id: 'm17', homeTeam: getTeam('fcb'),   awayTeam: getTeam('int'),  homeScore: 4, awayScore: 2, date: new Date(Date.now() - 72*3600000).toISOString(),  minute: 90, status: 'finished', competition: 'UEFA Champions League', competitionEmoji: '⭐',  venue: 'Allianz Arena, München' },
  { id: 'm18', homeTeam: getTeam('bar'),   awayTeam: getTeam('atm'),  homeScore: 1, awayScore: 1, date: new Date(Date.now() - 96*3600000).toISOString(),  minute: 90, status: 'finished', competition: 'La Liga',              competitionEmoji: '🇪🇸', venue: 'Camp Nou, Barcelona' },
  { id: 'm19', homeTeam: getTeam('lfc'),   awayTeam: getTeam('che'),  homeScore: 2, awayScore: 0, date: new Date(Date.now() - 120*3600000).toISOString(), minute: 90, status: 'finished', competition: 'Premier League',       competitionEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: 'Anfield, Liverpool' },
  { id: 'm20', homeTeam: getTeam('bvb'),   awayTeam: getTeam('baye'), homeScore: 1, awayScore: 3, date: new Date(Date.now() - 144*3600000).toISOString(), minute: 90, status: 'finished', competition: 'Bundesliga',           competitionEmoji: '🇩🇪', venue: 'Signal Iduna Park, Dortmund' },
  { id: 'm41', homeTeam: getTeam('flam'),  awayTeam: getTeam('cor'),  homeScore: 2, awayScore: 1, date: new Date(Date.now() - 36*3600000).toISOString(),  minute: 90, status: 'finished', competition: 'Brasileirão',          competitionEmoji: '🇧🇷', venue: 'Maracanã, Rio de Janeiro' },
  { id: 'm42', homeTeam: getTeam('gal'),   awayTeam: getTeam('bes'),  homeScore: 3, awayScore: 0, date: new Date(Date.now() - 60*3600000).toISOString(),  minute: 90, status: 'finished', competition: 'Süper Lig',            competitionEmoji: '🇹🇷', venue: 'RAMS Park, Istanbul' },
];
