export class PlacementMarkData {
  static availaleClubPositionWithMarks = [
    { label: 'Not Placed Cleared Rounds', mark: 5 },
    { label: 'Placed without Internship', mark: 40 },
    { label: 'Placed with Internship', mark: 50 },
    { label: 'Intern without Placement', mark: 20 },
  ];

  static exportClass() {
    return [...this.availaleClubPositionWithMarks];
  }
}
