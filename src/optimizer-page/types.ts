interface Unit {
  id: string;
  displayName: string;
  blocks: {
    id: string;
    url: string;
    brokenLinks: string[];
    lockedLinks: string[];
  }[];
}

interface SubSection {
  id: string;
  displayName: string;
  units: Unit[];
}

interface Section {
  id: string;
  displayName: string;
  subsections: SubSection[];
}

export interface LinkCheckResult {
  sections: Section[];
}