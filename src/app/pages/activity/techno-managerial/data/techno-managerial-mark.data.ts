export class TechnoManagerialMarkData {
  static availaleLevelWithMarks = [
    { label: 'Participated - Inside', prize: false, mark: 2 },
    { label: 'Participated - Outside', prize: false, mark: 5 },
    { label: 'Participated - State', prize: false, mark: 10 },
    { label: 'Participated - National/International', prize: false, mark: 20 },
    { label: 'Prize - Inside', prize: true, mark: 10 },
    { label: 'Prize - Outside', prize: true, mark: 20 },
    { label: 'Prize - State', prize: true, mark: 30 },
    { label: 'Prize - National/International', prize: true, mark: 50 },
  ];

  static exportClass() {
    return [...this.availaleLevelWithMarks];
  }
}
