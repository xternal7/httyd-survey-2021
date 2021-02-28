export enum Villain {
  GreenDeath,
  Drago,
  DragoBewilderbeast,
  Grimmel,
  Viggo,
  Ryker,
  Dagur,
  Johann,
  THWWarlords,
  Alvin,
  Mildew,

  // popular demand:
  Stoick,

  // other stuff:
  Other,
  None,
  Multiple,
}

export function villain2enum(villain: string) {
  switch (villain.trim().toLowerCase()) {
    case 'green / red death':
    case 'green death':
    case 'red death':
      return Villain.GreenDeath;
    case 'drago bludvist':
    case 'drago':
      return Villain.Drago;
    case 'drago\'s bewilderbeast':
      return Villain.DragoBewilderbeast;
    case 'viggo':
      return Villain.Viggo;
    case 'grimmel':
      return Villain.Grimmel;
    case 'ryker':
      return Villain.Ryker;
    case 'dagur':
      return Villain.Dagur;
    case 'johann':
      return Villain.Johann;
    case 'the warlords (from httyd: thw)':
      return Villain.THWWarlords;
    case 'alvin':
      return Villain.Alvin;
    case 'mildew':
      return Villain.Mildew;
    case 'stoick':
      return Villain.Stoick;
    case '':
      return Villain.None;
    default: 
      return Villain.Other;
  }
}