import { useState } from 'react';
import { Trophy, Star, Zap, Shield, Target, Users, Trash2, Pencil } from 'lucide-react';
import { useCoins, type PlayerCard } from '../context/CoinContext';

const CARDS: PlayerCard[] = [
  /* ═══════════════════════════════════
     NORMAL  3000–5000
  ═══════════════════════════════════ */
  // Bundesliga
  { id:'c1',  name:'Müller',          team:'Bayern München',  teamEmoji:'🔴', position:'ST', rating:82, pace:72, shooting:84, passing:79, defending:35, rarity:'normal', price:3000, image:'👨' },
  { id:'c2',  name:'Kimmich',         team:'Bayern München',  teamEmoji:'🔴', position:'MF', rating:86, pace:70, shooting:72, passing:90, defending:78, rarity:'normal', price:4500, image:'👨' },
  { id:'c3',  name:'Goretzka',        team:'Bayern München',  teamEmoji:'🔴', position:'MF', rating:84, pace:75, shooting:78, passing:83, defending:75, rarity:'normal', price:3500, image:'👨' },
  { id:'c4',  name:'Gnabry',          team:'Bayern München',  teamEmoji:'🔴', position:'RW', rating:83, pace:90, shooting:80, passing:74, defending:38, rarity:'normal', price:3400, image:'👨' },
  { id:'c5',  name:'Upamecano',       team:'Bayern München',  teamEmoji:'🔴', position:'CB', rating:83, pace:80, shooting:40, passing:68, defending:84, rarity:'normal', price:3300, image:'👨' },
  { id:'c6',  name:'Füllkrug',        team:'Borussia Dortmund',teamEmoji:'🟡',position:'ST', rating:82, pace:68, shooting:83, passing:70, defending:30, rarity:'normal', price:3200, image:'👨' },
  { id:'c7',  name:'Brandt',          team:'Borussia Dortmund',teamEmoji:'🟡',position:'MF', rating:82, pace:76, shooting:76, passing:84, defending:55, rarity:'normal', price:3100, image:'👨' },
  { id:'c8',  name:'Schlotterbeck',   team:'Borussia Dortmund',teamEmoji:'🟡',position:'CB', rating:82, pace:74, shooting:42, passing:72, defending:83, rarity:'normal', price:3000, image:'👨' },
  { id:'c9',  name:'Koch',            team:'Borussia Dortmund',teamEmoji:'🟡',position:'CB', rating:81, pace:72, shooting:38, passing:70, defending:82, rarity:'normal', price:3000, image:'👨' },
  { id:'c10', name:'Stach',           team:'1. FC Nürnberg',  teamEmoji:'🔴', position:'MF', rating:78, pace:74, shooting:70, passing:78, defending:68, rarity:'normal', price:3000, image:'👨' },
  // Premier League
  { id:'c11', name:'Rüdiger',         team:'Real Madrid',     teamEmoji:'⚪', position:'CB', rating:84, pace:74, shooting:45, passing:68, defending:86, rarity:'normal', price:3800, image:'👨' },
  { id:'c12', name:'Dias',            team:'Man City',        teamEmoji:'🩵', position:'CB', rating:86, pace:72, shooting:42, passing:70, defending:87, rarity:'normal', price:4000, image:'👨' },
  { id:'c13', name:'Salah',           team:'Liverpool',       teamEmoji:'🔴', position:'RW', rating:88, pace:94, shooting:87, passing:80, defending:45, rarity:'normal', price:5000, image:'👨' },
  { id:'c14', name:'Trent',           team:'Real Madrid',     teamEmoji:'⚪', position:'RB', rating:88, pace:80, shooting:72, passing:88, defending:76, rarity:'normal', price:4800, image:'👨' },
  { id:'c15', name:'Walker',          team:'Man City',        teamEmoji:'🩵', position:'RB', rating:82, pace:88, shooting:50, passing:68, defending:80, rarity:'normal', price:3200, image:'👨' },
  { id:'c16', name:'Chilwell',        team:'Chelsea',         teamEmoji:'🔵', position:'LB', rating:80, pace:80, shooting:58, passing:72, defending:78, rarity:'normal', price:3000, image:'👨' },
  { id:'c17', name:'Saka',            team:'Arsenal',         teamEmoji:'🔴', position:'RW', rating:87, pace:88, shooting:82, passing:82, defending:48, rarity:'normal', price:4800, image:'👨' },
  { id:'c18', name:'Martinelli',      team:'Arsenal',         teamEmoji:'🔴', position:'LW', rating:84, pace:90, shooting:80, passing:74, defending:40, rarity:'normal', price:3600, image:'👨' },
  { id:'c19', name:'Ødegaard',        team:'Arsenal',         teamEmoji:'🔴', position:'AM', rating:88, pace:78, shooting:82, passing:90, defending:56, rarity:'normal', price:4900, image:'👨' },
  { id:'c20', name:'White',           team:'Arsenal',         teamEmoji:'🔴', position:'RB', rating:82, pace:80, shooting:52, passing:74, defending:82, rarity:'normal', price:3200, image:'👨' },
  { id:'c21', name:'Trippier',        team:'Newcastle',       teamEmoji:'⚫', position:'RB', rating:83, pace:74, shooting:64, passing:82, defending:80, rarity:'normal', price:3400, image:'👨' },
  { id:'c22', name:'Isak',            team:'Newcastle',       teamEmoji:'⚫', position:'ST', rating:84, pace:86, shooting:82, passing:72, defending:32, rarity:'normal', price:3800, image:'👨' },
  { id:'c23', name:'Son',             team:'Tottenham',       teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:86, passing:78, defending:40, rarity:'normal', price:4500, image:'👨' },
  { id:'c24', name:'Vardy',           team:'Leicester City',  teamEmoji:'🔵', position:'ST', rating:80, pace:90, shooting:80, passing:60, defending:28, rarity:'normal', price:3000, image:'👨' },
  // La Liga
  { id:'c25', name:'Carvajal',        team:'Real Madrid',     teamEmoji:'⚪', position:'RB', rating:83, pace:78, shooting:60, passing:76, defending:82, rarity:'normal', price:3200, image:'👨' },
  { id:'c26', name:'Mendy',           team:'Real Madrid',     teamEmoji:'⚪', position:'LB', rating:82, pace:84, shooting:50, passing:72, defending:80, rarity:'normal', price:3100, image:'👨' },
  { id:'c27', name:'Militão',         team:'Real Madrid',     teamEmoji:'⚪', position:'CB', rating:86, pace:80, shooting:42, passing:68, defending:88, rarity:'normal', price:4200, image:'👨' },
  { id:'c28', name:'Balde',           team:'Barcelona',       teamEmoji:'🔵', position:'LB', rating:83, pace:90, shooting:52, passing:74, defending:80, rarity:'normal', price:3400, image:'👨' },
  { id:'c29', name:'Koundé',          team:'Barcelona',       teamEmoji:'🔵', position:'RB', rating:85, pace:82, shooting:52, passing:76, defending:84, rarity:'normal', price:3800, image:'👨' },
  { id:'c30', name:'Christensen',     team:'Barcelona',       teamEmoji:'🔵', position:'CB', rating:82, pace:72, shooting:40, passing:72, defending:82, rarity:'normal', price:3200, image:'👨' },
  { id:'c31', name:'Correa',          team:'Atlético Madrid', teamEmoji:'🔴', position:'ST', rating:80, pace:82, shooting:76, passing:68, defending:38, rarity:'normal', price:3000, image:'👨' },
  { id:'c32', name:'Lino',            team:'Atlético Madrid', teamEmoji:'🔴', position:'LB', rating:80, pace:80, shooting:52, passing:70, defending:78, rarity:'normal', price:3000, image:'👨' },
  // Serie A
  { id:'c33', name:'Barella',         team:'Inter Mailand',   teamEmoji:'⚫', position:'MF', rating:88, pace:78, shooting:78, passing:86, defending:78, rarity:'normal', price:4800, image:'👨' },
  { id:'c34', name:'Bastoni',         team:'Inter Mailand',   teamEmoji:'⚫', position:'CB', rating:87, pace:74, shooting:44, passing:78, defending:86, rarity:'normal', price:4500, image:'👨' },
  { id:'c35', name:'Dumfries',        team:'Inter Mailand',   teamEmoji:'⚫', position:'RB', rating:82, pace:84, shooting:60, passing:70, defending:78, rarity:'normal', price:3200, image:'👨' },
  { id:'c36', name:'Dimarco',         team:'Inter Mailand',   teamEmoji:'⚫', position:'LB', rating:83, pace:80, shooting:68, passing:76, defending:78, rarity:'normal', price:3400, image:'👨' },
  { id:'c37', name:'Rabiot',          team:'Juventus',        teamEmoji:'⚫', position:'MF', rating:83, pace:76, shooting:72, passing:80, defending:76, rarity:'normal', price:3400, image:'👨' },
  { id:'c38', name:'Locatelli',       team:'Juventus',        teamEmoji:'⚫', position:'MF', rating:82, pace:70, shooting:68, passing:82, defending:78, rarity:'normal', price:3200, image:'👨' },
  { id:'c39', name:'De Ketalaere',    team:'Atalanta',        teamEmoji:'🔵', position:'AM', rating:82, pace:76, shooting:76, passing:80, defending:50, rarity:'normal', price:3200, image:'👨' },
  { id:'c40', name:'Lookman',         team:'Atalanta',        teamEmoji:'🔵', position:'LW', rating:84, pace:88, shooting:82, passing:74, defending:38, rarity:'normal', price:3800, image:'👨' },
  // Ligue 1
  { id:'c41', name:'Marquinhos',      team:'Paris SG',        teamEmoji:'🔵', position:'CB', rating:87, pace:76, shooting:48, passing:78, defending:88, rarity:'normal', price:4500, image:'👨' },
  { id:'c42', name:'Hakimi',          team:'Paris SG',        teamEmoji:'🔵', position:'RB', rating:87, pace:92, shooting:68, passing:80, defending:78, rarity:'normal', price:4500, image:'👨' },
  { id:'c43', name:'Pacho',           team:'Paris SG',        teamEmoji:'🔵', position:'CB', rating:83, pace:78, shooting:40, passing:68, defending:84, rarity:'normal', price:3400, image:'👨' },
  { id:'c44', name:'Salas',           team:'Monaco',          teamEmoji:'🔴', position:'ST', rating:80, pace:80, shooting:78, passing:68, defending:30, rarity:'normal', price:3000, image:'👨' },
  // Saudi Pro League
  { id:'c45', name:'Al-Dawsari',      team:'Al-Hilal',        teamEmoji:'🔵', position:'LW', rating:80, pace:82, shooting:76, passing:74, defending:38, rarity:'normal', price:3000, image:'👨' },
  { id:'c46', name:'Mitrović',        team:'Al-Hilal',        teamEmoji:'🔵', position:'ST', rating:82, pace:68, shooting:86, passing:60, defending:28, rarity:'normal', price:3400, image:'👨' },
  { id:'c47', name:'Odriozola',       team:'Al-Ittihad',      teamEmoji:'🟡', position:'RB', rating:78, pace:80, shooting:52, passing:68, defending:76, rarity:'normal', price:3000, image:'👨' },
  // Liga MX / MLS
  { id:'c48', name:'Guardado',        team:'Club León',       teamEmoji:'🟢', position:'MF', rating:79, pace:72, shooting:68, passing:80, defending:68, rarity:'normal', price:3000, image:'👨' },
  { id:'c49', name:'Chicharito',      team:'Chivas',          teamEmoji:'🔴', position:'ST', rating:78, pace:72, shooting:80, passing:62, defending:22, rarity:'normal', price:3000, image:'👨' },
  { id:'c50', name:'Cucho',           team:'Columbus Crew',   teamEmoji:'🟡', position:'ST', rating:80, pace:88, shooting:78, passing:66, defending:28, rarity:'normal', price:3000, image:'👨' },
  // Südamerika
  { id:'c51', name:'Arias',           team:'Fluminense',      teamEmoji:'🔴', position:'RB', rating:80, pace:82, shooting:54, passing:72, defending:78, rarity:'normal', price:3000, image:'👨' },
  { id:'c52', name:'German Cano',     team:'Fluminense',      teamEmoji:'🔴', position:'ST', rating:80, pace:70, shooting:82, passing:62, defending:24, rarity:'normal', price:3000, image:'👨' },
  { id:'c53', name:'De La Cruz',      team:'River Plate',     teamEmoji:'🔴', position:'MF', rating:82, pace:78, shooting:72, passing:84, defending:58, rarity:'normal', price:3200, image:'👨' },
  // Asien
  { id:'c54', name:'Kubo',            team:'Real Sociedad',   teamEmoji:'🔵', position:'RW', rating:83, pace:84, shooting:78, passing:80, defending:44, rarity:'normal', price:3500, image:'👨' },
  { id:'c55', name:'Mitoma',          team:'Brighton',        teamEmoji:'🔵', position:'LW', rating:83, pace:92, shooting:78, passing:74, defending:42, rarity:'normal', price:3500, image:'👨' },
  { id:'c56', name:'Lee Jae-sung',    team:'Mainz 05',        teamEmoji:'🔴', position:'MF', rating:79, pace:74, shooting:70, passing:78, defending:68, rarity:'normal', price:3000, image:'👨' },
  // Syrien
  { id:'c57', name:'Omar Al-Soma',    team:'Syrien NT',       teamEmoji:'🇸🇾', position:'ST', rating:80, pace:72, shooting:82, passing:66, defending:28, rarity:'normal', price:3200, image:'👨' },
  { id:'c58', name:'Firas Al-Khatib', team:'Syrien NT',       teamEmoji:'🇸🇾', position:'ST', rating:79, pace:70, shooting:80, passing:68, defending:26, rarity:'normal', price:3000, image:'👨' },
  { id:'c59', name:'Amro Jenaat',     team:'Syrien NT',       teamEmoji:'🇸🇾', position:'MF', rating:78, pace:74, shooting:68, passing:78, defending:64, rarity:'normal', price:3000, image:'👨' },
  { id:'c60', name:'Khaled Al-Mobayed',team:'Syrien NT',      teamEmoji:'🇸🇾', position:'CB', rating:77, pace:70, shooting:36, passing:66, defending:78, rarity:'normal', price:3000, image:'👨' },
  { id:'c61', name:'Mahmoud Al-Baher',team:'Syrien NT',       teamEmoji:'🇸🇾', position:'GK', rating:77, pace:48, shooting:18, passing:64, defending:78, rarity:'normal', price:3000, image:'👨' },
  { id:'c62', name:'Murad Aboud',     team:'Syrien NT',       teamEmoji:'🇸🇾', position:'LB', rating:76, pace:74, shooting:44, passing:66, defending:76, rarity:'normal', price:3000, image:'👨' },
  { id:'c63', name:'Youssef Kalfa',   team:'Syrien NT',       teamEmoji:'🇸🇾', position:'RW', rating:76, pace:80, shooting:72, passing:68, defending:36, rarity:'normal', price:3000, image:'👨' },
  // Afrika
  { id:'c64', name:'Zaha',            team:'Al-Qadsiah',      teamEmoji:'🟣', position:'LW', rating:81, pace:90, shooting:76, passing:72, defending:36, rarity:'normal', price:3100, image:'👨' },
  { id:'c65', name:'Mahrez',          team:'Al-Ahli',         teamEmoji:'🟢', position:'RW', rating:84, pace:84, shooting:80, passing:80, defending:38, rarity:'normal', price:3800, image:'👨' },
  { id:'c66', name:'Ziyech',          team:'Galatasaray',     teamEmoji:'🟡', position:'RW', rating:82, pace:80, shooting:78, passing:80, defending:38, rarity:'normal', price:3300, image:'👨' },
  { id:'c67', name:'Mané',            team:'Al-Nassr',        teamEmoji:'🔵', position:'LW', rating:84, pace:92, shooting:84, passing:76, defending:44, rarity:'normal', price:3800, image:'👨' },

  /* ═══════════════════════════════════
     RARE  5000–10000
  ═══════════════════════════════════ */
  // Top Europa
  { id:'c68', name:'Kane',            team:'Bayern München',  teamEmoji:'🔴', position:'ST', rating:90, pace:72, shooting:93, passing:84, defending:38, rarity:'rare', price:6000, image:'⭐' },
  { id:'c69', name:'Bellingham',      team:'Real Madrid',     teamEmoji:'⚪', position:'MF', rating:91, pace:82, shooting:85, passing:87, defending:70, rarity:'rare', price:7500, image:'⭐' },
  { id:'c70', name:'Rodrygo',         team:'Real Madrid',     teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:82, passing:79, defending:38, rarity:'rare', price:5500, image:'⭐' },
  { id:'c71', name:'De Bruyne',       team:'Man City',        teamEmoji:'🩵', position:'MF', rating:91, pace:76, shooting:85, passing:95, defending:62, rarity:'rare', price:8000, image:'⭐' },
  { id:'c72', name:'Kroos',           team:'Real Madrid',     teamEmoji:'⚪', position:'MF', rating:88, pace:60, shooting:80, passing:94, defending:72, rarity:'rare', price:7000, image:'⭐' },
  { id:'c73', name:'Musiala',         team:'Bayern München',  teamEmoji:'🔴', position:'AM', rating:87, pace:82, shooting:82, passing:86, defending:48, rarity:'rare', price:6500, image:'⭐' },
  { id:'c74', name:'Sané',            team:'Bayern München',  teamEmoji:'🔴', position:'RW', rating:86, pace:92, shooting:80, passing:78, defending:40, rarity:'rare', price:5800, image:'⭐' },
  { id:'c75', name:'Vinicius',        team:'Real Madrid',     teamEmoji:'⚪', position:'LW', rating:91, pace:95, shooting:84, passing:76, defending:32, rarity:'rare', price:9000, image:'⭐' },
  { id:'c76', name:'Foden',           team:'Man City',        teamEmoji:'🩵', position:'AM', rating:88, pace:84, shooting:82, passing:86, defending:48, rarity:'rare', price:6800, image:'⭐' },
  { id:'c77', name:'Gvardiol',        team:'Man City',        teamEmoji:'🩵', position:'LB', rating:86, pace:82, shooting:56, passing:76, defending:86, rarity:'rare', price:5500, image:'⭐' },
  { id:'c78', name:'Grealish',        team:'Man City',        teamEmoji:'🩵', position:'LW', rating:84, pace:80, shooting:74, passing:82, defending:42, rarity:'rare', price:5200, image:'⭐' },
  { id:'c79', name:'Rashford',        team:'Man United',      teamEmoji:'🔴', position:'LW', rating:85, pace:92, shooting:80, passing:72, defending:38, rarity:'rare', price:5200, image:'⭐' },
  { id:'c80', name:'Bruno Fernandes', team:'Man United',      teamEmoji:'🔴', position:'AM', rating:87, pace:76, shooting:82, passing:88, defending:54, rarity:'rare', price:6000, image:'⭐' },
  { id:'c81', name:'Saliba',          team:'Arsenal',         teamEmoji:'🔴', position:'CB', rating:87, pace:82, shooting:44, passing:76, defending:88, rarity:'rare', price:6000, image:'⭐' },
  { id:'c82', name:'Havertz',         team:'Arsenal',         teamEmoji:'🔴', position:'ST', rating:84, pace:76, shooting:80, passing:80, defending:50, rarity:'rare', price:5500, image:'⭐' },
  { id:'c83', name:'Reece James',     team:'Chelsea',         teamEmoji:'🔵', position:'RB', rating:86, pace:84, shooting:66, passing:78, defending:84, rarity:'rare', price:5800, image:'⭐' },
  { id:'c84', name:'Palmer',          team:'Chelsea',         teamEmoji:'🔵', position:'AM', rating:87, pace:78, shooting:86, passing:84, defending:44, rarity:'rare', price:6500, image:'⭐' },
  { id:'c85', name:'Cucurella',       team:'Chelsea',         teamEmoji:'🔵', position:'LB', rating:82, pace:82, shooting:48, passing:72, defending:80, rarity:'rare', price:5000, image:'⭐' },
  { id:'c86', name:'Luis Díaz',       team:'Liverpool',       teamEmoji:'🔴', position:'LW', rating:85, pace:90, shooting:80, passing:74, defending:42, rarity:'rare', price:5500, image:'⭐' },
  { id:'c87', name:'Szoboszlai',      team:'Liverpool',       teamEmoji:'🔴', position:'MF', rating:85, pace:80, shooting:80, passing:84, defending:62, rarity:'rare', price:5200, image:'⭐' },
  { id:'c88', name:'Griezmann',       team:'Atlético Madrid', teamEmoji:'🔴', position:'AM', rating:87, pace:78, shooting:84, passing:82, defending:56, rarity:'rare', price:6000, image:'⭐' },
  { id:'c89', name:'Félix',           team:'Atlético Madrid', teamEmoji:'🔴', position:'AM', rating:84, pace:82, shooting:80, passing:78, defending:42, rarity:'rare', price:5500, image:'⭐' },
  { id:'c90', name:'Morata',          team:'Atlético Madrid', teamEmoji:'🔴', position:'ST', rating:83, pace:80, shooting:80, passing:72, defending:40, rarity:'rare', price:5000, image:'⭐' },
  { id:'c91', name:'Gündoğan',        team:'Barcelona',       teamEmoji:'🔵', position:'MF', rating:86, pace:72, shooting:80, passing:88, defending:70, rarity:'rare', price:5800, image:'⭐' },
  { id:'c92', name:'Lamine Yamal',    team:'Barcelona',       teamEmoji:'🔵', position:'RW', rating:88, pace:92, shooting:84, passing:82, defending:35, rarity:'rare', price:8500, image:'⭐' },
  { id:'c93', name:'Lautaro Martínez',team:'Inter Mailand',   teamEmoji:'⚫', position:'ST', rating:90, pace:80, shooting:88, passing:76, defending:38, rarity:'rare', price:7000, image:'⭐' },
  { id:'c94', name:'Thuram',          team:'Inter Mailand',   teamEmoji:'⚫', position:'ST', rating:86, pace:88, shooting:80, passing:70, defending:36, rarity:'rare', price:5500, image:'⭐' },
  { id:'c95', name:'Diaby',           team:'Al-Ittihad',      teamEmoji:'🟡', position:'LW', rating:84, pace:94, shooting:76, passing:72, defending:34, rarity:'rare', price:5200, image:'⭐' },
  { id:'c96', name:'Zielinski',       team:'Inter Mailand',   teamEmoji:'⚫', position:'MF', rating:84, pace:72, shooting:76, passing:86, defending:62, rarity:'rare', price:5200, image:'⭐' },
  { id:'c97', name:'Vlahović',        team:'Juventus',        teamEmoji:'⚫', position:'ST', rating:86, pace:78, shooting:88, passing:66, defending:30, rarity:'rare', price:5800, image:'⭐' },
  { id:'c98', name:'Chiesa',          team:'Liverpool',       teamEmoji:'🔴', position:'RW', rating:84, pace:90, shooting:80, passing:72, defending:38, rarity:'rare', price:5200, image:'⭐' },
  { id:'c99', name:'Osimhen',         team:'Galatasaray',     teamEmoji:'🟡', position:'ST', rating:87, pace:90, shooting:88, passing:68, defending:32, rarity:'rare', price:6500, image:'⭐' },
  { id:'c100',name:'Kvaratskhelia',   team:'Paris SG',        teamEmoji:'🔵', position:'LW', rating:87, pace:88, shooting:82, passing:80, defending:40, rarity:'rare', price:6500, image:'⭐' },
  { id:'c101',name:'Dembelé',         team:'Paris SG',        teamEmoji:'🔵', position:'RW', rating:86, pace:96, shooting:80, passing:74, defending:36, rarity:'rare', price:5800, image:'⭐' },
  // Saudi Pro League Stars
  { id:'c102',name:'Neymar',          team:'Al-Hilal',        teamEmoji:'🔵', position:'LW', rating:87, pace:88, shooting:84, passing:86, defending:36, rarity:'rare', price:7500, image:'⭐' },
  { id:'c103',name:'Benzema',         team:'Al-Ittihad',      teamEmoji:'🟡', position:'ST', rating:88, pace:74, shooting:88, passing:80, defending:36, rarity:'rare', price:7000, image:'⭐' },
  { id:'c104',name:'Kanté',           team:'Al-Ittihad',      teamEmoji:'🟡', position:'MF', rating:85, pace:76, shooting:64, passing:74, defending:88, rarity:'rare', price:5500, image:'⭐' },
  { id:'c105',name:'Firmino',         team:'Al-Ahli',         teamEmoji:'🟢', position:'ST', rating:83, pace:78, shooting:82, passing:78, defending:42, rarity:'rare', price:5000, image:'⭐' },
  { id:'c106',name:'Mendy F.',        team:'Al-Ahli',         teamEmoji:'🟢', position:'GK', rating:84, pace:50, shooting:20, passing:70, defending:84, rarity:'rare', price:5000, image:'⭐' },
  // MLS / Americas
  { id:'c107',name:'Messi (Inter MIA)',team:'Inter Miami',    teamEmoji:'🌸', position:'AM', rating:91, pace:78, shooting:88, passing:94, defending:38, rarity:'rare', price:9500, image:'⭐' },
  { id:'c108',name:'Suárez',          team:'Inter Miami',     teamEmoji:'🌸', position:'ST', rating:83, pace:72, shooting:84, passing:74, defending:30, rarity:'rare', price:5500, image:'⭐' },
  { id:'c109',name:'Busquets',        team:'Inter Miami',     teamEmoji:'🌸', position:'MF', rating:82, pace:56, shooting:60, passing:88, defending:82, rarity:'rare', price:5000, image:'⭐' },
  { id:'c110',name:'Pulisic',         team:'AC Mailand',      teamEmoji:'⚫', position:'AM', rating:84, pace:82, shooting:78, passing:78, defending:46, rarity:'rare', price:5200, image:'⭐' },
  { id:'c111',name:'Reyna',           team:'Borussia Dortmund',teamEmoji:'🟡',position:'AM', rating:82, pace:80, shooting:74, passing:80, defending:48, rarity:'rare', price:5000, image:'⭐' },
  { id:'c112',name:'Vela',            team:'LAFC',            teamEmoji:'⚫', position:'ST', rating:80, pace:80, shooting:80, passing:72, defending:30, rarity:'rare', price:5000, image:'⭐' },
  // Afrika Stars
  { id:'c113',name:'Osimhen NGA',     team:'Galatasaray',     teamEmoji:'🟡', position:'ST', rating:87, pace:90, shooting:88, passing:68, defending:32, rarity:'rare', price:6800, image:'⭐' },
  { id:'c114',name:'Simon',           team:'Barcelona',       teamEmoji:'🔵', position:'LW', rating:82, pace:88, shooting:74, passing:72, defending:38, rarity:'rare', price:5000, image:'⭐' },
  { id:'c115',name:'Onana',           team:'Man United',      teamEmoji:'🔴', position:'GK', rating:84, pace:48, shooting:20, passing:72, defending:84, rarity:'rare', price:5200, image:'⭐' },
  { id:'c116',name:'Mazraoui',        team:'Man United',      teamEmoji:'🔴', position:'RB', rating:82, pace:82, shooting:56, passing:72, defending:80, rarity:'rare', price:5000, image:'⭐' },
  // Japan/Korea/Asien
  { id:'c117',name:'Doan',            team:'SC Freiburg',     teamEmoji:'🔵', position:'RW', rating:81, pace:84, shooting:76, passing:74, defending:50, rarity:'rare', price:5000, image:'⭐' },
  { id:'c118',name:'Son Heung-min',   team:'Tottenham',       teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:86, passing:78, defending:40, rarity:'rare', price:6000, image:'⭐' },

  /* ═══════════════════════════════════
     EPIC  10000–16000
  ═══════════════════════════════════ */
  { id:'c119',name:'Mbappé',          team:'Real Madrid',     teamEmoji:'⚪', position:'ST', rating:95, pace:99, shooting:93, passing:80, defending:38, rarity:'epic', price:12000, image:'💫' },
  { id:'c120',name:'Haaland',         team:'Man City',        teamEmoji:'🩵', position:'ST', rating:94, pace:89, shooting:96, passing:66, defending:42, rarity:'epic', price:11000, image:'💫' },
  { id:'c121',name:'Pedri',           team:'Barcelona',       teamEmoji:'🔵', position:'MF', rating:89, pace:78, shooting:76, passing:90, defending:68, rarity:'epic', price:10000, image:'💫' },
  { id:'c122',name:'Lautaro',         team:'Inter Mailand',   teamEmoji:'⚫', position:'ST', rating:90, pace:80, shooting:88, passing:76, defending:38, rarity:'epic', price:10500, image:'💫' },
  { id:'c123',name:'Alaba',           team:'Real Madrid',     teamEmoji:'⚪', position:'CB', rating:87, pace:72, shooting:62, passing:80, defending:88, rarity:'epic', price:10200, image:'💫' },
  { id:'c124',name:'Lewandowski',     team:'Barcelona',       teamEmoji:'🔵', position:'ST', rating:90, pace:78, shooting:92, passing:78, defending:40, rarity:'epic', price:13000, image:'💫' },
  { id:'c125',name:'Salah EPIC',      team:'Liverpool',       teamEmoji:'🔴', position:'RW', rating:91, pace:94, shooting:89, passing:82, defending:46, rarity:'epic', price:11500, image:'💫' },
  { id:'c126',name:'Vinicius EPIC',   team:'Real Madrid',     teamEmoji:'⚪', position:'LW', rating:92, pace:96, shooting:86, passing:78, defending:34, rarity:'epic', price:13500, image:'💫' },
  { id:'c127',name:'Bellingham EPIC', team:'Real Madrid',     teamEmoji:'⚪', position:'AM', rating:92, pace:84, shooting:87, passing:89, defending:72, rarity:'epic', price:14000, image:'💫' },
  { id:'c128',name:'De Bruyne EPIC',  team:'Man City',        teamEmoji:'🩵', position:'MF', rating:92, pace:78, shooting:87, passing:96, defending:64, rarity:'epic', price:13000, image:'💫' },
  { id:'c129',name:'Musiala EPIC',    team:'Bayern München',  teamEmoji:'🔴', position:'AM', rating:90, pace:84, shooting:85, passing:88, defending:50, rarity:'epic', price:12000, image:'💫' },
  { id:'c130',name:'Yamal EPIC',      team:'Barcelona',       teamEmoji:'🔵', position:'RW', rating:91, pace:94, shooting:87, passing:85, defending:37, rarity:'epic', price:14500, image:'💫' },
  { id:'c131',name:'Ramos',           team:'Sevilla',         teamEmoji:'🔴', position:'CB', rating:86, pace:72, shooting:62, passing:74, defending:88, rarity:'epic', price:10000, image:'💫' },
  { id:'c132',name:'Palhinha',        team:'Bayern München',  teamEmoji:'🔴', position:'MF', rating:86, pace:74, shooting:64, passing:76, defending:88, rarity:'epic', price:10200, image:'💫' },
  { id:'c133',name:'Osimhen EPIC',    team:'Napoli',          teamEmoji:'🔵', position:'ST', rating:88, pace:92, shooting:90, passing:70, defending:34, rarity:'epic', price:11000, image:'💫' },
  { id:'c134',name:'Kvaratskhelia EPIC',team:'Paris SG',      teamEmoji:'🔵', position:'LW', rating:89, pace:90, shooting:84, passing:82, defending:42, rarity:'epic', price:12500, image:'💫' },
  { id:'c135',name:'Rodri',           team:'Man City',        teamEmoji:'🩵', position:'MF', rating:91, pace:70, shooting:70, passing:86, defending:90, rarity:'epic', price:12000, image:'💫' },
  { id:'c136',name:'Kroos EPIC',      team:'Real Madrid',     teamEmoji:'⚪', position:'MF', rating:90, pace:62, shooting:82, passing:96, defending:74, rarity:'epic', price:12000, image:'💫' },
  // Ronaldo & Messi historic
  { id:'c137',name:'Ronaldo',         team:'Al-Nassr',        teamEmoji:'🔵', position:'ST', rating:90, pace:82, shooting:93, passing:76, defending:34, rarity:'epic', price:15000, image:'💫' },
  { id:'c138',name:'Messi',           team:'Inter Miami',     teamEmoji:'🌸', position:'AM', rating:93, pace:80, shooting:90, passing:96, defending:38, rarity:'epic', price:16000, image:'💫' },

  /* ═══════════════════════════════════
     LEGEND  16000–20000
  ═══════════════════════════════════ */
  { id:'c139',name:'Modric',          team:'Real Madrid',     teamEmoji:'⚪', position:'MF', rating:88, pace:74, shooting:76, passing:92, defending:68, rarity:'legend', price:16000, image:'👑' },
  { id:'c140',name:'Alisson',         team:'Liverpool',       teamEmoji:'🔴', position:'GK', rating:89, pace:52, shooting:22, passing:78, defending:89, rarity:'legend', price:17000, image:'👑' },
  { id:'c141',name:'Neuer',           team:'Bayern München',  teamEmoji:'🔴', position:'GK', rating:88, pace:54, shooting:24, passing:80, defending:92, rarity:'legend', price:17500, image:'👑' },
  { id:'c142',name:'Ter Stegen',      team:'Barcelona',       teamEmoji:'🔵', position:'GK', rating:90, pace:50, shooting:20, passing:82, defending:90, rarity:'legend', price:19000, image:'👑' },
  { id:'c143',name:'Courtois',        team:'Real Madrid',     teamEmoji:'⚪', position:'GK', rating:91, pace:48, shooting:18, passing:78, defending:92, rarity:'legend', price:20000, image:'👑' },
  { id:'c144',name:'Buffon',          team:'Parma',           teamEmoji:'🟡', position:'GK', rating:88, pace:46, shooting:18, passing:76, defending:92, rarity:'legend', price:18000, image:'👑' },
  { id:'c145',name:'Van Dijk',        team:'Liverpool',       teamEmoji:'🔴', position:'CB', rating:90, pace:78, shooting:52, passing:76, defending:92, rarity:'legend', price:17500, image:'👑' },
  { id:'c146',name:'Thiago Silva',    team:'Fluminense',      teamEmoji:'🔴', position:'CB', rating:87, pace:70, shooting:48, passing:78, defending:90, rarity:'legend', price:16500, image:'👑' },
  { id:'c147',name:'Sergio Ramos',    team:'Sevilla',         teamEmoji:'🔴', position:'CB', rating:88, pace:72, shooting:64, passing:74, defending:92, rarity:'legend', price:17000, image:'👑' },
  { id:'c148',name:'Xavi',            team:'Barcelona Coach', teamEmoji:'🔵', position:'MF', rating:90, pace:72, shooting:74, passing:97, defending:74, rarity:'legend', price:18500, image:'👑' },
  { id:'c149',name:'Iniesta',         team:'Vissel Kobe',     teamEmoji:'🔵', position:'MF', rating:90, pace:78, shooting:76, passing:96, defending:68, rarity:'legend', price:18000, image:'👑' },
  { id:'c150',name:'Pirlo',           team:'Juventus (Leg.)', teamEmoji:'⚫', position:'MF', rating:90, pace:66, shooting:78, passing:96, defending:72, rarity:'legend', price:18000, image:'👑' },
  { id:'c151',name:'Ronaldo R9',      team:'Brasilien (Leg.)',teamEmoji:'🟢', position:'ST', rating:97, pace:96, shooting:96, passing:78, defending:28, rarity:'legend', price:20000, image:'👑' },
  { id:'c152',name:'Zidane',          team:'Frankreich (Leg.)',teamEmoji:'🔵',position:'AM', rating:95, pace:76, shooting:82, passing:96, defending:58, rarity:'legend', price:20000, image:'👑' },
  { id:'c153',name:'Ronaldinho',      team:'Brasilien (Leg.)',teamEmoji:'🟢', position:'AM', rating:95, pace:86, shooting:88, passing:92, defending:38, rarity:'legend', price:20000, image:'👑' },
  { id:'c154',name:'Maradona',        team:'Argentinien (Leg.)',teamEmoji:'🔵',position:'AM',rating:98, pace:88, shooting:90, passing:94, defending:50, rarity:'legend', price:20000, image:'👑' },
  { id:'c155',name:'Pele',            team:'Brasilien (Leg.)',teamEmoji:'🟢', position:'ST', rating:98, pace:90, shooting:98, passing:88, defending:42, rarity:'legend', price:20000, image:'👑' },
  { id:'c156',name:'Beckenbauer',     team:'Deutschland (Leg.)',teamEmoji:'🔴',position:'CB',rating:94, pace:78, shooting:64, passing:84, defending:94, rarity:'legend', price:19500, image:'👑' },
  { id:'c157',name:'Cruyff',          team:'Niederlande (Leg.)',teamEmoji:'🟠',position:'ST',rating:96, pace:88, shooting:86, passing:90, defending:48, rarity:'legend', price:20000, image:'👑' },
  { id:'c158',name:'Maldini',         team:'AC Mailand (Leg.)',teamEmoji:'⚫',position:'CB', rating:94, pace:80, shooting:50, passing:78, defending:96, rarity:'legend', price:19500, image:'👑' },
  { id:'c159',name:'Cannavaro',       team:'Italien (Leg.)',  teamEmoji:'🔵', position:'CB', rating:91, pace:76, shooting:44, passing:72, defending:94, rarity:'legend', price:18000, image:'👑' },
  { id:'c160',name:'Ronaldo C.R.7',   team:'Al-Nassr (Leg.)',teamEmoji:'🔵',  position:'ST', rating:95, pace:86, shooting:95, passing:78, defending:34, rarity:'legend', price:20000, image:'👑' },
  { id:'c161',name:'Messi (Leg.)',    team:'Inter Miami (Leg.)',teamEmoji:'🌸',position:'AM',rating:97, pace:82, shooting:93, passing:97, defending:40, rarity:'legend', price:20000, image:'👑' },
  { id:'c162',name:'Firas Al-Khatib (Leg.)',team:'Syrien (Leg.)',teamEmoji:'🇸🇾',position:'ST',rating:84,pace:72,shooting:86,passing:70,defending:28,rarity:'legend',price:16500,image:'👑' },
];

const RARITY_CONFIG = {
  normal: { label:'Normal',  bg:'from-slate-700 to-slate-900',   border:'border-slate-500',   badge:'bg-slate-600',   glow:'',                         stars:1 },
  rare:   { label:'Rare',    bg:'from-blue-800 to-slate-900',    border:'border-blue-500',    badge:'bg-blue-600',    glow:'shadow-[0_0_20px_#3b82f680]', stars:2 },
  epic:   { label:'Epic',    bg:'from-purple-800 to-slate-900',  border:'border-purple-500',  badge:'bg-purple-600',  glow:'shadow-[0_0_25px_#a855f780]', stars:3 },
  legend: { label:'Legende', bg:'from-amber-700 to-slate-900',   border:'border-amber-400',   badge:'bg-amber-500',   glow:'shadow-[0_0_30px_#f59e0b90]', stars:4 },
};

const POSITIONS = ['Alle','GK','CB','RB','LB','MF','AM','ST','RW','LW'];
const RARITIES  = ['Alle','normal','rare','epic','legend'] as const;

function StatBar({ label, value, color }:{ label:string; value:number; color:string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-slate-400 w-5 font-bold shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{width:`${value}%`, background:color}}/>
      </div>
      <span className="text-[10px] text-white font-bold w-6 text-right">{value}</span>
    </div>
  );
}

function Card({ card, owned, onBuy }:{ card:PlayerCard; owned:boolean; onBuy:()=>void }) {
  const cfg = RARITY_CONFIG[card.rarity];
  const [flip, setFlip] = useState(false);

  return (
    <div className="cursor-pointer" style={{perspective:'800px'}} onClick={()=>setFlip(f=>!f)}>
      <div className="relative transition-transform duration-500" style={{
        transformStyle:'preserve-3d',
        transform: flip ? 'rotateY(180deg)' : 'none',
        height: 260,
      }}>
        {/* FRONT */}
        <div className={`absolute inset-0 rounded-2xl border-2 ${cfg.border} ${cfg.glow} bg-gradient-to-b ${cfg.bg} overflow-hidden backface-hidden`}>
          {/* rarity badge */}
          <div className={`absolute top-2 left-2 ${cfg.badge} text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide`}>
            {cfg.label}
          </div>
          {owned && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">✓ Besitzt</div>
          )}

          {/* avatar area */}
          <div className="flex items-center justify-center pt-8 pb-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl bg-gradient-to-b ${cfg.bg} border-2 ${cfg.border}`}>
              {card.image}
            </div>
          </div>

          {/* rating circle */}
          <div className="absolute top-8 right-3 flex flex-col items-center">
            <span className="text-white font-black text-2xl leading-none">{card.rating}</span>
            <span className="text-slate-400 text-[9px] font-bold">{card.position}</span>
          </div>

          {/* name & team */}
          <div className="text-center px-3 pb-1">
            <h3 className="text-white font-black text-base leading-tight">{card.name}</h3>
            <p className="text-slate-400 text-[11px]">{card.teamEmoji} {card.team}</p>
          </div>

          {/* stars */}
          <div className="flex justify-center gap-0.5 mb-2">
            {Array.from({length:cfg.stars}).map((_,i)=>(
              <Star key={i} size={10} className="text-amber-400 fill-amber-400"/>
            ))}
          </div>

          {/* price / buy */}
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-amber-400 font-black text-sm">🪙 {card.price.toLocaleString()}</span>
            <button
              onClick={e=>{e.stopPropagation();onBuy();}}
              disabled={owned}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                owned
                  ? 'bg-green-700/40 text-green-400 cursor-default'
                  : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95'
              }`}>
              {owned ? 'Im Besitz' : 'Kaufen'}
            </button>
          </div>

          <p className="absolute bottom-12 w-full text-center text-slate-500 text-[9px]">Tippen zum Umdrehen</p>
        </div>

        {/* BACK */}
        <div className={`absolute inset-0 rounded-2xl border-2 ${cfg.border} ${cfg.glow} bg-gradient-to-b ${cfg.bg} overflow-hidden`}
          style={{transform:'rotateY(180deg)', backfaceVisibility:'hidden'}}>
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{card.image}</span>
              <div>
                <h3 className="text-white font-black text-sm">{card.name}</h3>
                <p className="text-slate-400 text-[10px]">{card.teamEmoji} {card.team} · {card.position}</p>
              </div>
              <span className="ml-auto text-white font-black text-2xl">{card.rating}</span>
            </div>

            <div className="flex-1 space-y-1.5">
              <StatBar label="PAC" value={card.pace}      color="#22d3ee"/>
              <StatBar label="SHO" value={card.shooting}  color="#f59e0b"/>
              <StatBar label="PAS" value={card.passing}   color="#34d399"/>
              <StatBar label="DEF" value={card.defending} color="#6366f1"/>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-amber-400 font-black text-sm">🪙 {card.price.toLocaleString()}</span>
              <button
                onClick={e=>{e.stopPropagation();onBuy();}}
                disabled={owned}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  owned ? 'bg-green-700/40 text-green-400 cursor-default' : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95'
                }`}>
                {owned ? 'Im Besitz' : 'Kaufen'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Karten() {
  const { state, dispatch } = useCoins();
  const [posFilter,  setPosFilter]  = useState('Alle');
  const [rarFilter,  setRarFilter]  = useState<typeof RARITIES[number]>('Alle');
  const [tab,        setTab]        = useState<'shop'|'sammlung'|'meine'>('shop');
  const [toast,      setToast]      = useState('');
  const [search,     setSearch]     = useState('');

  function showToast(msg:string){ setToast(msg); setTimeout(()=>setToast(''),2500); }

  function buy(card:PlayerCard){
    if(state.ownedCards.includes(card.id)){ showToast('Karte bereits im Besitz!'); return; }
    if(state.coins < card.price){ showToast(`Nicht genug Münzen! Du brauchst 🪙 ${(card.price-state.coins).toLocaleString()} mehr.`); return; }
    dispatch({ type:'BUY_CARD', cardId:card.id, price:card.price });
    showToast(`✅ ${card.name} gekauft!`);
  }

  const filtered = CARDS.filter(c=>{
    if(tab==='sammlung' && !state.ownedCards.includes(c.id)) return false;
    if(posFilter!=='Alle' && c.position!==posFilter) return false;
    if(rarFilter!=='Alle' && c.rarity!==rarFilter) return false;
    if(search.trim()){
      const q = search.toLowerCase();
      if(!c.name.toLowerCase().includes(q) && !c.team.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <Trophy size={20} className="text-amber-400"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Spielerkarten</h1>
          <p className="text-slate-500 text-sm">Sammle Spieler · Kaufe mit Münzen</p>
        </div>
        <div className="ml-auto text-amber-400 font-bold text-base">🪙 {state.coins.toLocaleString()}</div>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-white">{state.ownedCards.length}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-center gap-1"><Users size={11}/>Karten</div>
        </div>
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-amber-400">{CARDS.filter(c=>c.rarity==='legend'&&state.ownedCards.includes(c.id)).length}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-center gap-1"><Star size={11}/>Legenden</div>
        </div>
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-purple-400">{CARDS.filter(c=>c.rarity==='epic'&&state.ownedCards.includes(c.id)).length}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-center gap-1"><Zap size={11}/>Episch</div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['shop','sammlung','meine'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              tab===t ? 'bg-[#6c63ff] text-white' : 'bg-[#12121a] border border-[#22223a] text-slate-400 hover:border-[#6c63ff]/40'
            }`}>
            {t==='shop' ? '🏪 Shop' : t==='sammlung' ? `📦 Sammlung (${state.ownedCards.length})` : `🎨 Meine Figuren (${(state.customCards??[]).length})`}
          </button>
        ))}
      </div>

      {/* price guide */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {(Object.entries(RARITY_CONFIG) as [keyof typeof RARITY_CONFIG, typeof RARITY_CONFIG[keyof typeof RARITY_CONFIG]][]).map(([k,v])=>(
          <div key={k} className={`bg-[#12121a] border-2 ${v.border} rounded-xl px-3 py-2 flex items-center gap-2`}>
            <div className="flex gap-0.5">{Array.from({length:v.stars}).map((_,i)=><Star key={i} size={8} className="text-amber-400 fill-amber-400"/>)}</div>
            <div>
              <div className="text-white font-bold text-xs">{v.label}</div>
              <div className="text-slate-400 text-[10px]">
                {k==='normal'?'3.000–5.000':k==='rare'?'5.000–10.000':k==='epic'?'10.000–16.000':'16.000–20.000'} 🪙
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* filters — only for shop/sammlung */}
      {/* search */}
      {tab !== 'meine' && (
        <input
          type="text"
          placeholder="Spieler oder Team suchen… (z.B. Syrien, Messi, Bayern)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#12121a] border border-[#22223a] focus:border-[#6c63ff] text-white placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none mb-3 transition"
        />
      )}
      {tab !== 'meine' && <>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <Shield size={12} className="text-slate-500"/>
            {POSITIONS.map(p=>(
              <button key={p} onClick={()=>setPosFilter(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  posFilter===p ? 'bg-[#6c63ff] text-white' : 'bg-[#12121a] border border-[#22223a] text-slate-400'
                }`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <Target size={12} className="text-slate-500"/>
            {RARITIES.map(r=>(
              <button key={r} onClick={()=>setRarFilter(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  rarFilter===r ? 'bg-[#6c63ff] text-white' : 'bg-[#12121a] border border-[#22223a] text-slate-400'
                }`}>{r==='Alle'?'Alle':RARITY_CONFIG[r].label}</button>
            ))}
          </div>
        </div>
      </>}

      {/* ── Meine Figuren tab ── */}
      {tab === 'meine' ? (
        (state.customCards ?? []).length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Pencil size={40} className="mx-auto mb-3 opacity-30"/>
            <p className="font-bold">Noch keine eigenen Figuren!</p>
            <p className="text-sm mt-1">Gehe zu <strong className="text-white">Spieler zeichnen</strong>, zeichne eine Figur und speichere sie als Karte.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(state.customCards ?? []).map(cc => (
              <div key={cc.id} className="relative group rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-[0_0_20px_#f59e0b40] bg-gradient-to-b from-amber-900/40 to-[#12121a]">
                {/* delete button */}
                <button
                  onClick={() => dispatch({ type: 'DELETE_CUSTOM_CARD', id: cc.id })}
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={13}/>
                </button>

                {/* drawn figure */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-white">
                  <img src={cc.imageData} alt={cc.name} className="w-full h-full object-cover"/>
                </div>

                {/* info bar */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-black text-sm truncate">{cc.name}</span>
                    <span className="text-amber-400 text-[10px] font-bold bg-amber-500/20 px-1.5 py-0.5 rounded-md">{cc.position}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">🎨 Eigene Figur</span>
                  </div>
                  <p className="text-slate-600 text-[9px] mt-1">
                    {new Date(cc.createdAt).toLocaleDateString('de-DE')}
                  </p>
                </div>

                {/* shimmer top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"/>
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          {/* cards grid */}
          {filtered.length===0 ? (
            <div className="text-center py-16 text-slate-500">
              <Trophy size={40} className="mx-auto mb-3 opacity-30"/>
              <p className="font-bold">{tab==='sammlung'?'Noch keine Karten gesammelt!':'Keine Karten gefunden.'}</p>
              {tab==='sammlung'&&<p className="text-sm mt-1">Gehe zum Shop und kaufe deine erste Karte!</p>}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map(card=>(
                <Card
                  key={card.id}
                  card={card}
                  owned={state.ownedCards.includes(card.id)}
                  onBuy={()=>buy(card)}/>
              ))}
            </div>
          )}
        </>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a2e] border border-[#6c63ff]/40 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-2xl whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
