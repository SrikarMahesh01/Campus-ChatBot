import type { ChatbotData } from '../types/chatbot';

export const chatbotData: ChatbotData = {
  responses: [
    // Academics
    {
      id: 'academics-1',
      text: 'URCET offers undergraduate programs in Computer Science Engineering, Electronics & Communication Engineering, Mechanical Engineering, Civil Engineering, and Electrical Engineering. All programs are affiliated with JNTUA.',
      category: 'academics',
      keywords: ['courses', 'programs', 'undergraduate', 'engineering', 'branches', 'departments']
    },
    {
      id: 'academics-2',
      text: 'Class timings are from 9:00 AM to 4:30 PM on weekdays. Each period is 50 minutes with 10-minute breaks between classes. Lunch break is from 12:30 PM to 1:30 PM.',
      category: 'academics',
      keywords: ['class timings', 'schedule', 'time table', 'periods', 'lunch break']
    },
    {
      id: 'academics-3',
      text: 'Examination schedules are announced 2 weeks in advance. Mid-term exams are conducted in the 3rd week of each semester, and final exams are held at the end of the semester. Results are typically announced within 15 days.',
      category: 'academics',
      keywords: ['exams', 'examination', 'results', 'schedule', 'mid-term', 'final']
    },
    {
      id: 'academics-4',
      text: 'The library is open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends. It houses over 15,000 books and provides digital resources, journals, and free Wi-Fi.',
      category: 'academics',
      keywords: ['library', 'timings', 'books', 'digital resources', 'wifi']
    },

    // Events
    {
      id: 'events-1',
      text: 'URCET hosts an annual technical fest "TECHNOVATION" featuring coding competitions, robotics, project exhibitions, and guest lectures by industry experts. Registration details are announced on the college website.',
      category: 'events',
      keywords: ['technovation', 'tech fest', 'technical', 'coding', 'robotics', 'competitions']
    },
    {
      id: 'events-2',
      text: 'Cultural events include the annual day celebration "UTSAV", talent shows, dance competitions, and music festivals. These events are organized by the student council throughout the academic year.',
      category: 'events',
      keywords: ['cultural', 'utsav', 'annual day', 'dance', 'music', 'talent show']
    },
    {
      id: 'events-3',
      text: 'Career development workshops, industry visits, and placement drives are conducted regularly. Companies like TCS, Infosys, Wipro, and local industries visit the campus for recruitment.',
      category: 'events',
      keywords: ['placement', 'career', 'workshop', 'industry visits', 'companies', 'recruitment']
    },

    // Departments
    {
      id: 'departments-1',
      text: 'Computer Science & Engineering Department offers courses in programming, data structures, algorithms, database management, web development, machine learning, and cybersecurity.',
      category: 'departments',
      keywords: ['cse', 'computer science', 'programming', 'data structures', 'machine learning']
    },
    {
      id: 'departments-2',
      text: 'Electronics & Communication Engineering focuses on digital electronics, signal processing, communication systems, VLSI design, and embedded systems.',
      category: 'departments',
      keywords: ['ece', 'electronics', 'communication', 'vlsi', 'embedded systems']
    },
    {
      id: 'departments-3',
      text: 'Mechanical Engineering Department covers thermodynamics, fluid mechanics, manufacturing processes, CAD/CAM, and automotive engineering.',
      category: 'departments',
      keywords: ['mechanical', 'thermodynamics', 'manufacturing', 'cad', 'automotive']
    },
    {
      id: 'departments-4',
      text: 'Civil Engineering Department teaches structural engineering, transportation, environmental engineering, surveying, and construction management.',
      category: 'departments',
      keywords: ['civil', 'structural', 'transportation', 'environmental', 'construction']
    },

    // Facilities
    {
      id: 'facilities-1',
      text: 'URCET campus includes modern laboratories, computer centers with latest software, a well-equipped library, sports facilities, cafeteria, and separate hostels for boys and girls.',
      category: 'facilities',
      keywords: ['campus', 'laboratories', 'computer center', 'hostel', 'sports', 'cafeteria']
    },
    {
      id: 'facilities-2',
      text: 'The college provides bus transportation from various locations in Tirupati and surrounding areas. Bus timings and routes are available at the transport office.',
      category: 'facilities',
      keywords: ['transport', 'bus', 'tirupati', 'routes', 'timings']
    },
    {
      id: 'facilities-3',
      text: 'Medical facilities include a college dispensary with a qualified nurse. For emergencies, the college has tie-ups with nearby hospitals. First aid is available 24/7.',
      category: 'facilities',
      keywords: ['medical', 'dispensary', 'hospital', 'first aid', 'emergency']
    },
    {
      id: 'facilities-4',
      text: 'Sports facilities include basketball court, volleyball court, cricket ground, indoor games room with table tennis and chess, and a gymnasium.',
      category: 'facilities',
      keywords: ['sports', 'basketball', 'volleyball', 'cricket', 'gymnasium', 'indoor games']
    },

    // General
    {
      id: 'general-1',
      text: 'URCET (Usha Rama College of Engineering and Technology) is located in Telaprolu, near Vijayawada, Andhra Pradesh. It is affiliated with JNTUA and approved by AICTE.',
      category: 'general',
      keywords: ['urcet', 'location', 'telaprolu', 'vijayawada', 'jntua', 'aicte']
    },
    {
      id: 'general-2',
      text: 'College office hours are from 9:00 AM to 5:00 PM on weekdays. For urgent matters, contact the administrative office. Principal\'s office hours are by appointment.',
      category: 'general',
      keywords: ['office hours', 'contact', 'administrative', 'principal', 'appointment']
    },
    {
      id: 'general-3',
      text: 'To contact URCET: Phone: +91-863-XXXXXXX, Email: info@urcet.edu.in, Website: www.urcet.edu.in. For admissions, contact the admissions office.',
      category: 'general',
      keywords: ['contact', 'phone', 'email', 'website', 'admissions']
    }
  ],
  quickActions: [
    { id: 'qa-1', label: 'Class Timings', category: 'academics', query: 'class timings' },
    { id: 'qa-2', label: 'Exam Schedule', category: 'academics', query: 'exam schedule' },
    { id: 'qa-3', label: 'Library Hours', category: 'academics', query: 'library timings' },
    { id: 'qa-4', label: 'Tech Fest', category: 'events', query: 'technovation' },
    { id: 'qa-5', label: 'Placement Info', category: 'events', query: 'placement' },
    { id: 'qa-6', label: 'CSE Department', category: 'departments', query: 'computer science' },
    { id: 'qa-7', label: 'Campus Facilities', category: 'facilities', query: 'campus facilities' },
    { id: 'qa-8', label: 'Transportation', category: 'facilities', query: 'bus transport' },
    { id: 'qa-9', label: 'Contact Info', category: 'general', query: 'contact' },
    { id: 'qa-10', label: 'About URCET', category: 'general', query: 'about urcet' }
  ]
};
