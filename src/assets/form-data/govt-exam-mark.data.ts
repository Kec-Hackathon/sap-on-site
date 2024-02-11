export class GovtExamMarkData {
    static availaleGovtExamMarks = [
      { label: 'Appeared', mark: 5 }, //consider as ncc member
      { label: 'Qualified', mark: 30 },
      { label: 'Good National Ranking', mark: 100 },
      { label: 'Cleared Govt. Exam', mark: 100 },
    ];
  
    static exportClass() {
      return [...this.availaleGovtExamMarks];
    }
  }
  