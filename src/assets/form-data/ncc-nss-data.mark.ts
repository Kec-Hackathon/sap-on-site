export class NccNssMarkData {
  static availaleNssNccMarks = [
    { label: 'Less than a week', mark: 20 }, //consider as ncc member
    { label: '1 to 2 weeks', mark: 30 },
    { label: 'More than 2 weeks', mark: 50 },
  ];

  static exportClass() {
    return [...this.availaleNssNccMarks];
  }
}
