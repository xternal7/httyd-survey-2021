export enum Draconid {
  NightFury,
  ThotFury,
  ThotLights,
  Nadder,
  Gronckle,
  Nightmare,
  GreenDeath,
  Skrill,
  Stormcutter,
  Bewilderbeast,
  Deathgripper,
  Gorecutter,

  // popular demand:
  WhisperingDeath, 
  Terror,
  Zippleback,

  // other stuff:
  Other,
  None,
  Multiple
}

export function draconid2enum(draconid: string) {
  switch (draconid.trim().toLowerCase()) {
    case 'night fury':
      return Draconid.NightFury;
    case 'light fury':
      return Draconid.ThotFury;
    case 'night light':
    case 'night lights':
      return Draconid.ThotLights;
    case 'deadly nadder':
      return Draconid.Nadder;
    case 'stormcutter':
      return Draconid.Stormcutter;
    case 'monstrous nightmare':
      return Draconid.Nightmare;
    case 'skrill':
      return Draconid.Skrill;
    case 'bewilderbeast':
      return Draconid.Bewilderbeast;
    case 'green / red death':
    case 'green death':
    case 'red death':
      return Draconid.GreenDeath;
    case 'deathgripper':
      return Draconid.Deathgripper;
    case 'terrible terror':
    case 'terrible terrors':
      return Draconid.Terror;
    case 'gronckle':
      return Draconid.Gronckle;
    case 'whispering death':
      return Draconid.WhisperingDeath;
    case 'zippleback':
    case 'hideous zippleback':
      return Draconid.Zippleback;
    case 'crimson gorecutter':
      return Draconid.Gorecutter;
    case '':
      return Draconid.None;
    default:
      return Draconid.Other;
  }
}