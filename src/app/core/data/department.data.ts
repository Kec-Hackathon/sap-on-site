export class DepartmentData {
    static availaleDepartaments = [
      { label: 'Electronics and Instrumentation Engineering', value: 'eie' },
      { label: 'Electronics and Electrical Engineering', value: 'eee' },
      { label: 'Electronics and Communication Engineering', value: 'ece' },
      { label: 'Computer Science and Engineering', value: 'cse' },
      { label: 'Informtion Technology', value: 'it' },
    ];
  
    static exportClass() {
      return [...this.availaleDepartaments.sort((a, b) => a.label.localeCompare(b.label))];
    }
  }