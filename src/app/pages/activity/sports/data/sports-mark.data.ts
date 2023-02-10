export class SportsMarkData {
  static availaleLevelPrizeWithMarks = [
    { label: 'Inside - Participated', mark: 2 },
    { label: 'Zone/Outside - Participated', mark: 10 },
    { label: 'State/Interzone - Participated', mark: 20 },
    { label: 'National - Participated', mark: 50 },
    { label: 'International - Participated', mark: 100 },
    { label: 'Inside - Prize', mark: 5 },
    { label: 'Zone/Outside - Prize', mark: 20 },
    { label: 'State/Interzone - Prize', mark: 40 },
    { label: 'National - Prize', mark: 100 },
    { label: 'International - Prize', mark: 100 },
  ];

  static exportClass() {
    return [...this.availaleLevelPrizeWithMarks];
  }
}
