export const Signup=[
    {
      id:'name',
      label: 'Name',
      type: 'text',
      isDropdown: false,
      required: true,
      options: [],
      placeholder: 'Name',
    },
    {
      id:'roll_no',
      label: 'Roll Number',
      type: 'text',
      isDropdown: false,
      required: true,
      options: [],
      placeholder: 'Roll Number',
    },
    {
      id:'email',
      label: 'Email',
      type: 'email',
      isDropdown: false,
      required: true,
      options: [],
      placeholder: 'Email',
    },
    {
      id:'password',
      label: 'Password',
      type: 'password',
      isDropdown: false,
      required: true,
      options: [],
      placeholder: 'Password'
    },
    {
      id:'department',
      label: 'Department',
      type: 'select',
      isDropdown: true,
      required: true,
      options: [
        { name: 'EIE' },
        { name: 'CSE' },
        { name: 'IT' },
        { name: 'ECE' },
      ],
      placeholder: 'Department'
    },
    {
      id:'mentor_id',
      label: 'Mentor',
      type: 'select',
      isDropdown: true,
      required: true,
      options: [
        { name: 'EIE' },
        { name: 'CSE' },
        { name: 'IT' },
        { name: 'ECE' },
      ],
      placeholder: 'Mentor Name'
    },
    {
      id:'year',
      label: 'Year',
      type: 'select',
      isDropdown: true,
      required: true,
      options: [
        { name: '2020' },
        { name: '2021' },
        { name: '2022' },
        { name: '2023' },
        { name: '2024' },
        { name: '2025' },
        { name: '2026' },
      ],
      placeholder: 'Year'
    }

]
