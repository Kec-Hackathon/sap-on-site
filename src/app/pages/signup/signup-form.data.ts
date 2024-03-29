export const Signup = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    isDropdown: false,
    required: true,
    options: [],
    placeholder: 'Name',
  },
  {
    id: 'roll_no',
    label: 'Roll Number',
    type: 'text',
    isDropdown: false,
    required: true,
    options: [],
    placeholder: 'Roll Number',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    isDropdown: false,
    required: true,
    options: [],
    placeholder: 'Kongu email',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    isDropdown: false,
    required: true,
    options: [],
    placeholder: 'Password',
  },
  {
    id: 'department',
    label: 'Department',
    type: 'select',
    isDropdown: true,
    required: true,
    options: ['eie', 'ece', 'cse', 'it'],
    placeholder: 'Department',
  },
  {
    id: 'year',
    label: 'Year',
    type: 'select',
    isDropdown: true,
    required: true,
    options: [2023, 2024, 2025],
    placeholder: 'Year',
  },
];
