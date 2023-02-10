export class ProjectPaperMarkData {
  static availaleProjectPaperWithMarks = [
    { label: 'SCI Indexed - Submitted', mark: 10 },
    { label: 'SCI Indexed - Published', mark: 50 },
    { label: 'WOS/Scopus Journal/Conference - Submitted', mark: 10 },
    { label: 'WOS/Scopus Journal/Conference - Published', mark: 30 },
    { label: 'Other Journal Conference', mark: 50 },
    { label: 'Patent - Applied', mark: 10 },
    { label: 'Patent - Published', mark: 20 },
    { label: 'Patent - Obtained', mark: 100 },
    { label: 'Copyright - Applied', mark: 5 },
    { label: 'Copyright - Published', mark: 10 },
  ];

  static exportClass() {
    return [...this.availaleProjectPaperWithMarks];
  }
}
