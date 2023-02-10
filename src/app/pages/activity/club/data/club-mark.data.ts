export class ClubMarkData {
  static availaleClubPositionWithMarks = [
    { label: 'Leadership', mark: 10 },
    { label: 'Chairman', mark: 20 },
    { label: 'Secrtory', mark: 20 },
    { label: 'Join-Tresure', mark: 15 },
    { label: 'Board-Member', mark: 10 },
  ];

  static exportClass() {
    return [...this.availaleClubPositionWithMarks];
  }
}
