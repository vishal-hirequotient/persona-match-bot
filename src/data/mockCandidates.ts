
import { Candidate } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const mockCandidates: Candidate[] = [
  {
    id: uuidv4(),
    name: 'Sarah Rodriguez',
    avatar: '/placeholder.svg',
    title: 'Product Lead',
    company: 'HireQuotient',
    email: 'srodriguez@gmail.com',
    phone: '+1 528456825',
    experience: 4,
    location: 'Singapore',
    skills: [
      { name: 'UI Design' },
      { name: 'Figma' },
      { name: 'Landing Page' },
      { name: 'Web Design' },
      { name: 'Product Management' },
      { name: 'UX/UI' },
      { name: 'User Experience' }
    ],
    pastCompanies: [
      { name: 'BMZ Infotech' },
      { name: 'Adobe' },
      { name: 'Mentive' }
    ],
    experienceDetails: [
      {
        company: 'Cognizent',
        title: 'Software Engineer',
        duration: '2 years 6 months',
        startDate: 'Aug 2018',
        endDate: '2021'
      },
      {
        company: 'ATVISION',
        title: 'Sales Rep',
        duration: '2 years',
        startDate: 'Aug 2017',
        endDate: '2019'
      }
    ],
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: uuidv4(),
    name: 'Michael Chen',
    avatar: '/placeholder.svg',
    title: 'Frontend Developer',
    company: 'TechSolutions',
    email: 'mchen@techsolutions.com',
    phone: '+1 555-123-4567',
    experience: 3,
    location: 'New York, USA',
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'CSS' },
      { name: 'Responsive Design' },
      { name: 'UI/UX' }
    ],
    pastCompanies: [
      { name: 'WebDesign Co' },
      { name: 'Digital Solutions' }
    ],
    experienceDetails: [
      {
        company: 'WebDesign Co',
        title: 'Junior Developer',
        duration: '1 year 6 months',
        startDate: 'Jan 2019',
        endDate: 'Jun 2020'
      },
      {
        company: 'Digital Solutions',
        title: 'Frontend Engineer',
        duration: '1 year 5 months',
        startDate: 'Aug 2020',
        endDate: 'Jan 2022'
      }
    ],
    about: 'Passionate frontend developer with experience in building responsive and accessible web applications.'
  },
  {
    id: uuidv4(),
    name: 'Priya Sharma',
    avatar: '/placeholder.svg',
    title: 'UX Researcher',
    company: 'DesignFirst',
    email: 'psharma@designfirst.io',
    phone: '+91 9876543210',
    experience: 5,
    location: 'Bangalore, India',
    skills: [
      { name: 'User Research' },
      { name: 'Usability Testing' },
      { name: 'Figma' },
      { name: 'Prototyping' },
      { name: 'Information Architecture' }
    ],
    pastCompanies: [
      { name: 'UX Innovations' },
      { name: 'Tech Giants Inc' }
    ],
    experienceDetails: [
      {
        company: 'UX Innovations',
        title: 'Junior UX Researcher',
        duration: '2 years',
        startDate: 'Mar 2017',
        endDate: 'Mar 2019'
      },
      {
        company: 'Tech Giants Inc',
        title: 'Senior UX Researcher',
        duration: '3 years',
        startDate: 'Apr 2019',
        endDate: 'Present'
      }
    ],
    about: 'Experienced UX researcher focused on creating human-centered design solutions backed by qualitative and quantitative data.'
  },
  {
    id: uuidv4(),
    name: 'David Wilson',
    avatar: '/placeholder.svg',
    title: 'Backend Engineer',
    company: 'CloudSystems',
    email: 'dwilson@cloudsys.tech',
    phone: '+44 7700 900123',
    experience: 6,
    location: 'London, UK',
    skills: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'PostgreSQL' },
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'Microservices' }
    ],
    pastCompanies: [
      { name: 'Tech Startup' },
      { name: 'Global Solutions' }
    ],
    experienceDetails: [
      {
        company: 'Tech Startup',
        title: 'Software Developer',
        duration: '2 years',
        startDate: 'Jun 2016',
        endDate: 'Jun 2018'
      },
      {
        company: 'Global Solutions',
        title: 'Lead Backend Developer',
        duration: '4 years',
        startDate: 'Jul 2018',
        endDate: 'Present'
      }
    ],
    about: 'Backend engineer specializing in scalable cloud architecture and distributed systems.'
  },
  {
    id: uuidv4(),
    name: 'Emily Johnson',
    avatar: '/placeholder.svg',
    title: 'Product Manager',
    company: 'InnovateTech',
    email: 'ejohnson@innovatetech.com',
    phone: '+1 555-987-6543',
    experience: 7,
    location: 'San Francisco, USA',
    skills: [
      { name: 'Product Strategy' },
      { name: 'User Stories' },
      { name: 'Agile' },
      { name: 'Market Research' },
      { name: 'Roadmapping' }
    ],
    pastCompanies: [
      { name: 'StartupX' },
      { name: 'Big Corp Inc' }
    ],
    experienceDetails: [
      {
        company: 'StartupX',
        title: 'Associate Product Manager',
        duration: '3 years',
        startDate: 'Feb 2015',
        endDate: 'Feb 2018'
      },
      {
        company: 'Big Corp Inc',
        title: 'Senior Product Manager',
        duration: '4 years',
        startDate: 'Mar 2018',
        endDate: 'Present'
      }
    ],
    about: 'Product manager with a track record of launching successful products that delight users and drive business growth.'
  },
];
