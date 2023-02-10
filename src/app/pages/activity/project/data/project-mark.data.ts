export class ProjectMarkData {
  static availalePaperPositionWithMarks = [
    { label: 'Prize - Inside College', prize: true, mark: 20 },
    { label: 'Prize - Outside College', prize: true, mark: 30 },
    { label: 'Prize - Premier Instiute', prize: true, mark: 50 },
    { label: 'Presented - Inside College', prize: false, mark: 5 },
    { label: 'Presented - Outside College', prize: false, mark: 10 },
    { label: 'Presented - Premier Instiute', prize: false, mark: 20 },
    { label: 'Submitted', prize: false, mark: 2 },
  ];

  static exportClass() {
    return [...this.availalePaperPositionWithMarks];
  }
}
