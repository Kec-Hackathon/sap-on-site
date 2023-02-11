export class NptelMarkData {
  static availaleCreditWithMarks = [
    { label: '1 Credit - 4 week', mark: 10 },
    { label: '2 Credit - 8 week', mark: 20 },
    { label: '3 Credit - 12 week', mark: 30 },
  ];

  static exportClass() {
    return [...this.availaleCreditWithMarks];
  }
}
