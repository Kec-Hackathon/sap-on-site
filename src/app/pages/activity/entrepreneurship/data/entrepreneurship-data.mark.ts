export class EntrepreneurshipMarkData {
  static availaleEntrepreneurshipTypesWithMarks = [
    { label: 'Workshop Attended', mark: 10 },
    { label: 'Registered for startup', mark: 50 },
    { label: 'Released Product', mark: 100 },
  ];

  static exportClass() {
    return [...this.availaleEntrepreneurshipTypesWithMarks];
  }
}
