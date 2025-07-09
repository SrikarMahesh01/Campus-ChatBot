import type { ChatbotData } from '../types/chatbot';

export const chatbotData: ChatbotData = {
  responses: [
    // About URCET
    {
      id: 'about-1',
      text: 'URCET (Usha Rama College of Engineering and Technology) is an engineering college established by Usha Rama Educational Academy. It\'s approved by AICTE, affiliated to JNTU-Kakinada, and sponsored by Chicago-based Multi Million Dollar Advansoft group.',
      category: 'general',
      keywords: ['what is urcet', 'about urcet', 'urcet college', 'usha rama college', 'engineering college', 'advansoft', 'educational academy', 'established', 'founded']
    },
    {
      id: 'accreditation-1',
      text: 'URCET is approved by AICTE, affiliated to JNTU-Kakinada, NAAC accredited, and ISO 21001:2018 certified.',
      category: 'general',
      keywords: ['accreditation', 'accredited', 'aicte approved', 'jntu kakinada', 'jntu affiliated', 'naac', 'iso certified', 'approved', 'certification']
    },

    // B.Tech Courses
    {
      id: 'btech-1',
      text: 'URCET offers 7 B.Tech programs:\n- AI & ML (Artificial Intelligence & Machine Learning)\n- AI & DS (Artificial Intelligence & Data Science)\n- ECE (Electronics & Communication Engineering)\n- CSE (Computer Science Engineering)\n- IT (Information Technology)\n- EEE (Electrical & Electronics Engineering)\n- MECH (Mechanical Engineering)',
      category: 'academics',
      keywords: ['btech courses', 'btech programs', 'undergraduate courses', 'what courses', 'engineering courses', 'artificial intelligence', 'machine learning', 'computer science', 'electronics communication', 'mechanical engineering', 'electrical engineering', 'information technology', 'ai ml', 'ai ds', 'cse', 'ece', 'eee', 'mech', 'it']
    },
    {
      id: 'polytechnic-1',
      text: 'Yes, URCET offers Polytechnic (Diploma) courses in: CSE, MECH, CIVIL, ECE, EEE',
      category: 'academics',
      keywords: ['polytechnic courses', 'diploma courses', 'polytechnic programs', 'diploma programs', 'civil engineering diploma', 'does urcet offer polytechnic']
    },
    {
      id: 'mtech-1',
      text: 'URCET offers M.Tech in:\n- Cyber Security\n- Robotics & AI\n- CSE - AI & ML\n- CSE\n- VLSI & ES (VLSI & Embedded Systems)',
      category: 'academics',
      keywords: ['mtech courses', 'mtech programs', 'masters programs', 'postgraduate courses', 'cyber security', 'robotics artificial intelligence', 'vlsi embedded systems', 'masters degree']
    },

    // Facilities
    {
      id: 'facilities-1',
      text: 'Key facilities include:\n- Air-conditioned classrooms with multimedia projectors\n- 600+ computer systems in AC labs\n- Wi-Fi across campus\n- Library (8:00 AM to 10:00 PM)\n- Transportation from Vijayawada\n- Free GATE, GRE, TOEFL coaching\n- Work-Study program\n- Research & Development Lab',
      category: 'facilities',
      keywords: ['what facilities','about classrooms', 'urcet facilities', 'campus facilities', 'college facilities', 'infrastructure', 'air conditioned classrooms', 'computer labs', 'wifi campus', 'research lab']
    },
    {
      id: 'library-1',
      text: 'Library is open from 8:00 AM to 10:00 PM daily.',
      category: 'facilities',
      keywords: ['library timings', 'about library','library hours', 'library time', 'when library open', 'library timing', 'library schedule', '8am to 10pm', 'library opens']
    },
    {
      id: 'transport-1',
      text: 'Yes, URCET provides transportation facility from Vijayawada and surrounding places.',
      category: 'facilities',
      keywords: ['about transportation','transportation', 'transport facility', 'bus facility', 'does urcet provide transportation', 'transport from vijayawada', 'bus service', 'college bus', 'transportation service']
    },
    {
      id: 'work-study-1',
      text: 'URCET is the only engineering college that implements a WORK-STUDY program, allowing students to gain practical experience alongside academics.',
      category: 'academics',
      keywords: ['work study program', 'work-study', 'practical experience', 'unique program', 'what makes urcet unique', 'work study', 'industry experience']
    },

    // Admissions & Contact
    {
      id: 'admission-1',
      text: 'For admissions, fill the online admission enquiry form available on the website https://usharama.edu.in/ or contact the admissions office directly.',
      category: 'admissions',
      keywords: ['admission process', 'how to apply', 'admission enquiry', 'application form', 'admissions', 'how can i apply', 'admission form', 'apply to urcet']
    },
    {
      id: 'location-1',
      text: 'URCET is located near Vijayawada, Andhra Pradesh, and is affiliated to JNTU-Kakinada.',
      category: 'general',
      keywords: ['urcet location', 'where is urcet', 'urcet address', 'college location', 'vijayawada', 'andhra pradesh', 'where is college located']
    },
    {
      id: 'website-1',
      text: 'Official website: https://usharama.edu.in/',
      category: 'general',
      keywords: ['urcet website', 'official website', 'college website', 'usharama website', 'website url', 'site']
    },

    // Events
    {
      id: 'events-1',
      text: 'yoUR fest is URCET\'s annual techno-cultural festival. The latest was yoUR fest 2025 (website: https://yourfest2025.live/).',
      category: 'events',
      keywords: ['your fest', 'yourfest', 'annual fest', 'techno cultural festival', 'urcet fest', 'college festival', 'cultural events', 'technical festival']
    },
    {
      id: 'activities-1',
      text: 'URCET organizes: Annual Day celebrations, Sports Day, Technical workshops, Blood donation camps (NSS), Eye camps, Campus placements, Research conferences.',
      category: 'events',
      keywords: ['college activities', 'campus events', 'annual day', 'sports day', 'technical workshops', 'nss activities', 'blood donation', 'eye camps', 'campus activities']
    },

    // Placements
    {
      id: 'placements-1',
      text: 'Recent campus recruiters include: Hyundai Mobis & Kia Motors, Swan Technologies, Protine Technologies, Efftronics, and other reputed companies.',
      category: 'placements',
      keywords: ['campus placements', 'placement companies', 'recruiters', 'which companies visit', 'job placements', 'hyundai', 'kia motors', 'placement record', 'companies for placements']
    },
    {
      id: 'internships-1',
      text: 'Yes, URCET provides internship opportunities with reputed companies as part of their industry exposure program.',
      category: 'placements',
      keywords: ['internship opportunities', 'internships', 'industry exposure', 'company internships', 'does urcet provide internships', 'internship program']
    },

    // Special Features
    {
      id: 'unique-1',
      text: 'URCET\'s unique features:\n- Only engineering college with Work-Study program\n- E-Beam Technology & Response Recording Facility\n- Gallery-type seating in AC classrooms\n- Free coaching for competitive exams\n- Chicago-based Advansoft group sponsorship\n- Strong industry connections',
      category: 'general',
      keywords: ['what makes urcet unique', 'unique features', 'special features', 'urcet advantages', 'why choose urcet', 'ebeam technology', 'gallery seating', 'advansoft sponsorship']
    },
    {
      id: 'coaching-1',
      text: 'Yes, URCET provides free coaching for GATE, GRE, and TOEFL to students.',
      category: 'academics',
      keywords: ['free coaching', 'gate coaching', 'gre coaching', 'toefl coaching', 'competitive exam coaching', 'does urcet offer coaching', 'exam preparation']
    }
  ],
  quickActions: [
    { id: 'qa-1', label: 'B.Tech Courses', category: 'academics', query: 'What B.Tech courses does URCET offer?' },
    { id: 'qa-2', label: 'Library Timings', category: 'facilities', query: 'What are URCET library timings?' },
    { id: 'qa-3', label: 'About URCET', category: 'general', query: 'What is URCET?' },
    { id: 'qa-4', label: 'Facilities', category: 'facilities', query: 'What facilities does URCET provide?' },
    { id: 'qa-5', label: 'Placements', category: 'placements', query: 'Which companies visit URCET for placements?' },
    { id: 'qa-6', label: 'Admissions', category: 'admissions', query: 'How can I apply for admission to URCET?' },
    { id: 'qa-7', label: 'Location', category: 'general', query: 'Where is URCET located?' },
    { id: 'qa-8', label: 'Transportation', category: 'facilities', query: 'Does URCET provide transportation?' },
    { id: 'qa-9', label: 'yoUR Fest', category: 'events', query: 'What is yoUR fest?' },
    { id: 'qa-10', label: 'Free Coaching', category: 'academics', query: 'Does URCET offer free coaching?' }
  ]
};
