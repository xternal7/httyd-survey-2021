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
export function enum2draconid(draconid: Draconid, originalValue?: string) {
  switch (draconid) {
    case Draconid.NightFury:
      return 'Night Fury';
    case Draconid.ThotFury:
      return 'Light Fury';
    case Draconid.ThotLights:
      return 'Night Lights';
    case Draconid.Nadder:
      return 'Deadly Nadder';
    case Draconid.Stormcutter:
      return 'Stormcutter';
    case Draconid.Nightmare:
      return 'Monstrous Nightmare';
    case Draconid.Skrill:
      return 'Skrill';
    case Draconid.Bewilderbeast:
      return 'Bewilderbeast';
    case Draconid.GreenDeath:
      return 'Green/Red Death';
    case Draconid.Deathgripper:
      return 'Deathgripper';
    case Draconid.Terror:
      return 'Terrible Terror';
    case Draconid.Gronckle:
      return 'Gronckle';
    case Draconid.WhisperingDeath:
      return 'Whispering Death';
    case Draconid.Zippleback:
      return 'Hideous Zippleback';
    case Draconid.Gorecutter:
      return 'Crimson Gorecutter';
    case Draconid.None:
      return '<none>';
    case Draconid.Other:
      return `Other — ${originalValue || 'unknown'}`;
    default:
      return `MISSINGO — ${draconid}`;
  }
}