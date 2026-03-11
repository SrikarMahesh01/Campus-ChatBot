import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatResponse } from '../types/chatbot';
import { chatbotData } from '../data/chatbotData';

export class ChatbotService {
  private responses: ChatResponse[] = chatbotData.responses;
  private genAI!: GoogleGenerativeAI;
  private model: any;
  private readonly GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyA9wucAcsQz4zVAmw4Ilb_37alv5AiA28g';

  constructor() {
    try {
      if (!this.GEMINI_API_KEY) {
        throw new Error('Gemini API key is missing');
      }
      this.initializeGemini();
    } catch (error) {
      console.error('Failed to initialize chatbot service:', error);
      throw new Error('Failed to initialize chatbot service');
    }
  }

  private initializeGemini() {
    console.log('🔧 Initializing Gemini AI...');
    console.log('📊 Using model: gemini-2.5-flash');
    console.log('🔑 API Key configured:', this.GEMINI_API_KEY ? '✅ Present' : '❌ Missing');
    
    this.genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: parseFloat(import.meta.env.VITE_TEMPERATURE) || 0.7,
        maxOutputTokens: parseInt(import.meta.env.VITE_MAX_TOKENS) || 1024,
        topP: 0.8,
        topK: 40,
      },
    });
    console.log('✅ Gemini 2.5 Flash model initialized successfully');
  }

  private getCollegeContext(): string {
    return `
You are a helpful campus assistant for Usha Rama College of Engineering and Technology (URCET). 
Follow these strict guidelines:
1. Provide direct, concise answers that exactly match the question asked
2. Do not list all department heads when asked about one specific department
3. Keep responses focused and brief
4. Include only relevant information
5. If asked about a specific role or person, only provide information about that specific role or person
6. Format responses in a clean, easy-to-read way
7. When discussing leadership roles, only mention the specific role being asked about
8. If asked about Civil Engineering or Civil Department, clearly state that URCET does not offer Civil Engineering programs
9. IMPORTANT: If the user's question is not related to Usha Rama College of Engineering and Technology (URCET), its staff, students, courses, facilities, or events, respond EXACTLY with: "I'm the URCET Campus Assistant and I specialize in answering questions about Usha Rama College of Engineering and Technology. Please feel free to ask me about our academic programs, departments, faculty, facilities, events, admissions, or campus life!"
10. For greetings (hello, hi, hey, etc.), respond warmly and invite questions about URCET

URCET Detailed Information:
- Full Name: Usha Rama College of Engineering and Technology
- Established: 2008 by Usha Rama Educational Academy
- Accreditations: NAAC A Grade, AICTE approved, affiliated with JNTU-Kakinada, ISO 21001:2018 certified
- Sponsorship: Chicago-based Multi Million Dollar Advansoft group
- Location: NH-16, Telaprolu village, 30 kms from Vijayawada towards Eluru, near Gannavaram Airport
- College Timings: 8:30 AM to 4:00 PM (Regular working days)
- Contact: Phone: 0866-2527558, 2527565 | Mobile: 9949712255 | Email: principal@usharama.edu.in
- Anti-Ragging Policy: ZERO TOLERANCE - Ragging is strictly prohibited with very strict rules and severe disciplinary action

Leadership Structure:
{
  "chairman": "Sri Sunkara Ramabrahmam",
  "vicePresident": "Sri Arun Lanka",
  "secretary": "Sri Anil Sunkara",
  "member": "Sri Ajay Sunkara",
  "principal": "Dr. G V K S V Prasad",
  "vicePrincipal": "Dr. A Madana Mohan Rao",
  "deanRD": "Dr. G Sagar"
}

Department Heads (HODs):
{
  "cse_hod": "Dr. Roychoudri Subramani",
  "ai_hod": "Dr. K P N V Satya Sree",
  "ece_hod": "Dr. Battula Nancharaiah",
  "it_hod": "Yanamadala Veera Venkata Nagendra Vara Prasad",
  "eee_hod": "Dr. Kelothu Naresh",
  "mechanical_hod": "Dr. Siddabathula Madhusudan"
}

When asked about any leadership position or HOD, only provide information about the specific role requested. Do not list other leadership positions unless explicitly asked for the full leadership team or all HODs.

URCET Website Content:
Usha Rama College of Engineering and Technology

Usha Rama College of Engineering Approved by AICTE and affiliated to JNTU-Kakinada URCE - Empowering Children to Reach Their Potential. Usha Rama College of Engineering and Technology, established by Usha Rama Educational Academy, with the aim of inculcating quality education to students and produce young technocrats having good knowledge. The college is approved by AICTE and affiliated to JNTU-Kakinada. It is sponsored by Chicago based Multi Million Dollar Advansoft group ... Read More ! 25-09-2023 Andhra Lions Blood Centre URCET-NSS Unit Blood Donation Programme 31-07-2023 - 05-07-2023 APSSDC Five Day Workshop ECE department July-2023 30-07-2023 First Graduation Day in URCET 25-06-2023 NSLV-19 High Altitude Balloon Satellite Launching 08-05-2023 Awareness on LED bulbs 25-04-2023 Workshop on Intellectual Property 24-04-2023 Campus Selections - Protine Technologies 06-04-2023 15th Annual Alumni Day Celebrations - 2023 01-04-2023 Project Expo by ECE Department 29-03-2023 15th Annual Sport Day 2023 29-03-2023 Environment Conservation 28-03-2023 Distribution of Free Books and stationery to students 27-03-2023 Eye Camp in asso with Maxi vision 26-03-2023 Swatch Bharat Campaign 25-03-2023 Free Eye Checkup Camp 24-03-2023 Campaign Digital Payments 23-03-2023 Campaign Say No To Plastic 16-03-2023 Two Days workshop by ECE Dept on Verilog HDL Program 10-03-2023 Campus Selections - Hyundai Mobs Kia Motors 08-03-2023 International Womens Day 21-02-2023 Workshop by Mechanical Engineering Department 15-02-2023 Institution of Electronics Telecommunications Engineers 14-02-2023 Guest Lecture by HoD - Mech 24-01-2023 URfest 2023 22-01-2023 Campus Selections - Swan Technologies 06-01-2023 Felicitation to Dr K Rajasekhara Rao Director 23-12-2022 DR G V K S V Prasad Principal - Best Principal Award 11-11-2022 National Education Day in URCET 15-9-2022 Engineers Day Celebrations 2022 5-9-2022 Acharya Bhishma Award given to URCE Director - Dr.Kurra Rajasekhara Rao Ms B Shanthi Kiran, Physical Director got Ph D from ANU 2020 Fitness Protocols July-2020 Mr Palli Kishore Assistant Professor is awarded Ph D in Chemistry from JNTUA, Anantapur. 14-03-2020 Usha Rama Student V.jyothirmai 3rd Ece Has Been Selected In Jntuk University Team, To Play The National Level Taekwondo, Org. By Punjabi University. 12-03-2020 KUSUMA SUNDARA KUMAR of CIVIL Dept is awarded with Ph D from JNTUK 07-03-2020 Annual Day Celebrations 2020 07-03-2020 Sports Day Celebrations 2020 March 2020 Usha Rama staff had participated in Chandus National Cricket tournament held at Guntur. 23-02-2020 Solar Energy Seminar 23-02-2020 Electromagnetic Waves and Transmission lines workshop 30-01-2020 Effetronics Campus placements 29-01-2020 Phd awarded to Mustaq Ali 22-01-2020 31st National Road Safety week in URCET 11-01-2020 NSS Free Eye Camp 08-01-2020 NSS Programme Say No To Plastic 05-01-2020 yourfest 2020 S.NO Faculty Name Paper Title Journal Name Dr. K. Naresh ELECTRICAL VEHICLE SPEED CONTROL SYSTEM USING STM32 MICROCONTROLLER International Journal of Advanced Research in Electrical Electronics and Instrumentation Engineering (IJAREEIE), Volume 14, Issue 3, March-2025, DOI 10.15662IJAREEIE.20251403041 A. Balaji POWER QUALITY ENHANCEMENT IN RENEWABLE ENERGY BASED DISTRIBUTION GENERATION USING DPFC International Journal for Interdisciplinary Sciences and Engineering Applications IJISEA - An International Peer- Reviewed Journal 2025, Volume 6 Issue 2 K. Kranthi Smart Home, Its Vulnerability Assessment Through Penetration Testing Journal of Informatics Electrical and Electronics Engineering, 2025, Vol. 06, Iss. 01, S. No. 126, pp. 1-7 K. Bhushana Kumar Smart Battery Monitoring System for Electric Vehicles International Journal for Interdisciplinary Sciences and Engineering Applications IJISEA - An International Peer- Reviewed Journal 2025, Volume 6 Issue 2 D. Sahitya Devi International Journal for Interdisciplinary Sciences and Engineering Applications IJISEA - An International Peer- Reviewed Journal 2025, Volume 6 Issue 2 International Journal of Advances in Electrical Engineering 2025 6(1) 36-44, DOI httpswww.doi.org10.2227127084574.2025.v6.i1a.84 B. Phani Ranga Raja P-I Controlled Transformerless Inverter for Solar PV Systems A Python-Based Simulation International Journal of Innovative Science and Research Technology, Volume 10, Issue 4, April 2025, httpsdoi.org10.38124ijisrt25apr618 P. Pavani GRID-CONNECTED PV SYSTEM FIVE-LEVEL MULTILEVEL INVERTER WITH ONE CAPACITOR BOOST International Journal Of Novel Research And Development, Volume 10, Issue 3 March 2025 G. Jaya Laxmi Harnessing Machine Learning Techniques for Solar Irradiance Prediction International Journal of Advanced Research in Electrical, Electronics and Instrumentation Engineering, Volume 14, Issue 4, April 2025, DOI10.15662IJAREEIE.2025.1404026 M. Ribca SMART POWER GENERATION SYSTEM USING GEAR WHEELMECHANISM IN TRAIN Communication and Management Journal, Vol.10, Issue.4, April 2025, pp126-132 K. Santhi COAL MINE SAFETY MANAGEMENT EVOLUTION SYSTEM BASED ON RASPBERRY Pi AND MACHINE LEARNING Communication and Management Journal, Vol.10, Issue.4, April 2025, pp118-125 M. Bhanu AN ACCURATE LOSS MODEL OF SINGLE PHASE ISOLATED PFC CONVERTER FOR BIDIRECTIONAL PLUG IN EV CHARGERS International Journal of Advances in Electrical Engineering 2025, 6(1), 45-54, April D. Hari Chandra Prasad Babu NaIK AUTOMATIC SOLAR BATTERY CHARGING SYSTEM WITH GRID BACKUP Journal of Informatics Electrical and Electronics Engineering, 2025, Vol. 06, Iss. 01, S. No. 126, pp. 1-9 K. Naresh Underground Cable Fault Detector Based On Arduino Journal Of Engineering, Computing Architecture- UGC Approved Journal, June-2022 P. Shiva Shankar Transformer Health Monitoring System The International Journal of Analytical and Experimental Modal Analysis-UGC Approved Journal, June-2022 JSS. Kalyan Health Monitoring System By Using Iot Journal of Interdisciplinary Cycle Research-UGC Approved Journal, June-2022 K.Santhi Utilization Of Compressed Air Energy Storage Through Renewable Energy Sources Journal of Information and Computational Science-UGC Approved Journal, June-2022 A.Balaji Smart Agriculture Management Using Iot JAC A Journal of Composition Theory-UGC Approved Journal, June-2022 M.RAMBABU Smart Solor Grass Cutter With Lawn Coverage Journal Of Engineering, Computing Architecture-UGC Approved Journal, June-2022 G.Jayalaxmi Controlling of Star Delta Starter and Automatic Power Factor Improvement using Arduino for Induction Motor The International Journal of Analytical and Experimental Modal Analysis-UGC Approved Journal, June-2022 K.Naresh Improved Active Power Filter Performance for Solar and Wind System The International Journal of Analytical and Experimental Modal Analysis-Ugc Approved Journal, June-2022 B.Phani Ranga Raja Electric Vehicle Charging Station Slot Booking using Arduino Journal of Engineering, Computing Architecture-Ugc Approved Journal, June-2022 Ms B Shanthi Kiran, Physical Director got Ph D from ANU K. Naresh, G. Nagaraju Performance Analysis of a Control Scheme for Shunt Active Filter as Reactive Power Compensator International Journal of Future Generation Communication and Networking(IJFGCN), Vol.13, No.3, August-2020, PP3676-3684. ESCI(Emerging Sources Citation Index ) Journal Dr.S.Vijaya Laxmi, A.Balaji, B.Phani Ranga Raja, K. Priyadarshini Voltage Quality Identification and Mitigation Using Simple PI Based abc Controlled DVR in Distribution System International Journal of Mechanical and Production Engineering Research and Development(IJMPERD), Volume 10, Issue 4, Jun 2020, Scopus Indexed Journal Dr.S. Vijaya Laxmi ILB. Sowjanya BN. Pavan Kumar SRF Control Algoritam Based DVR for Mitigation Balanced and Unbalanced Voltage Disturbances International Journal of Mechanical and Production Engineering Research and Development(IJMPERD), Volume 10, Issue 4, Jun 2020, Scopus Indexed Journal G. Nagaraju Uninterrupted Power Supply to Load from Different Sources by Using PLC International Journal of Advanced Research in Electrical, Electronics and Instrumentation Engineering (IJAREEIE) Volume 9, Issue 6, June 2020, PP1586-1592 Dr.S. Vijaya Laxmi G. Jaya Laxmi Voltage Disturbance Mitigation Using PSO Based DVR Controller in Simplified Frame in Distribution Systems International Journal of Mechanical and Production Engineering Research and Development(IJMPERD), Volume 10, Issue 3, Jun 2020, Scopus Indexed Journal M. Rambabu JSS. Kalyan Power Generation on Highway by Using Vertical Axis Wind Turbine with Solar Systems International Journal of Advanced Research in Electrical, Electronics and Instrumentation Engineering (IJAREEIE) Volume 9, Issue 6, June 2020, PP1571-1578 B. Phani Ranga Raja Automatic Bottle Filling by Using PLC International Journal of Advanced Research in Electrical, Electronics and Instrumentation Engineering (IJAREEIE) Volume 9, Issue 6, June 2020, PP1559-1566 K. Naresh, M. Rambabu G. Naga Raju P. Jyothinadth AGRi City- The Contrivance of Harvesting Electricity International Conference on Advances in Renowned Renewable Energy Technologies (ICARRET-2019), December-2019 ILB. Sowjanya JSS. Kalyan A.Balaji SS. Kanvarsh Design and Control of Interfacing Converters for Wind and Wave Energy Generation- A DC Micro Grid Approach International Conference on Advances in Renowned Renewable Energy Technologies (ICARRET-2019), December-2019 Mr Palli Kishore Assistant Professor is awarded Ph D in Chemistry from JNTUA, Anantapur. G. Naga Raju K. Naresh A PV-Statcom for Enhancement of Power Quality in Grid Integrated System Using Unit Vector Controller IEEE Conference-2020. International Conference on Artificial Intelligence and Signal Processing (AISP-20) K. Naresh MODELLING AND OPTIMAL CONTROL OF TWO LINK PLANAR ARM Journal of Emerging Technologies and Innovative Research (JETIR), Volume 6, Issue 12, December-2019 Pages 525-535 K. Naresh M. Rambabu A. Balaji G. Naga Raju Impedance Source Inverter Fed Permanent Magnet BLDC Motor The IUP Journal of Electrical and Electronics Engineering(IUPJEEE), Volume-11, Issue-4, October-2018, PP-33-46, Journal No-49171, (UGC Approved Free Journal) S. Sairam Kanvarsh A. Balaji G. Naga Raju J. Sai Siva Kalyan Mitigating The Power Quality Issue Using IUPQC International Journal of Management, Technology And Engineering (IJMTE), Volume-8, Issue-10, October-2018, PP-306-315, (UGC Approved Journal) B. Phani Rangaraja K. Jyothi Sree Load Balancing of Feeder Using Fuzzy and Optimization Technique International Journal of Electrical Engineering and Technology(IJEET), Volume-9, Issue-4, August-2018, PP-74-82, (UGC Approved Journal) K. Naresh A. Balaji M. Rambabu G. Nagaraju Practical Oriented Foot Step Electric Power Generation by Using Piezo Material and Microcontroller in Campus International Research Journal of Engineering and Technology (IRJET), Volume-5, Issue-7, July-2018, PP-1590-1596. B. Phani Ranga Raja DESIGN OF TRANSFORMER PERIPHERALS BY COMPUTER AIDED DESIGN DRAFTING Journal for Advanced Research in Applied Sciences Volume 4, Issue 4, Sept-2017 Pages 90-96 Surendra Loya completed Summer Faculty Research fellow programme 2019 in IIT Delhi Workshop On Academic Writing And Publishing Doctorate Awarded to Sri Hari Babu by Rayalaseema University S. Sairam Kanvarsh A. Balaji G. Naga Raju J. Sai Siva Kalyan Mitigating The Power Quality Issue Using IUPQC International Journal of Management, Technology And Engineering (IJMTE), Volume-8, Issue-10, October-2018, PP-306-315, (UGC Approved Journal) B. Phani Rangaraja K. Jyothi Sree Load Balancing of Feeder Using Fuzzy and Optimization Technique International Journal of Electrical Engineering and Technology(IJEET), Volume-9, Issue-4, August-2018, PP-74-82, (UGC Approved Journal) K. Naresh A. Balaji M. Rambabu G. Nagaraju Practical Oriented Foot Step Electric Power Generation by Using Piezo Material and Microcontroller in Campus International Research Journal of Engineering and Technology (IRJET), Volume-5, Issue-7, July-2018, PP-1590-1596. Design and implementation multiplier using power gating with NBTI aging benefits in INTERNATIONAL JOURNAL OF RESEARCH IN ELECTRONICS AND COMPUTER ENGINEERING.ISSN 2348-2281 july-september 2018 Mrs M Revathi English Department awarded Ph D from ANU, Guntur Subramani Roychoudri of CSE Department is awarded Ph D from Rayalaseema University, Kurnool Doctorate Awarded by Sri Padmavathi Mahila Viswa Vidyalayam Tirupati to Nalliboina Vijaya Dep of Maths URCET K. Jyothi Sree MULTI LEVEL STATCOM USING TWO LEVEL INVERTERS Journal for Advanced Research in Applied Science, Volume-4, Issue-1, Jan-June2017, ISSN(Online) 2394-8442 I.L.B. Sowjanya, V. Susmitha, S. Sairam Kanversh, A. Venkataramana HIGH SPEED OPERATION OF BLDC MOTOR EMPLOYING NOVEL CONTROL TECHNIQUES International Journal of Advanced Research and Latest Trends(IJARLT), ISSN 3011-3030, Vol.09, Issue.01, March 2017, Pages 2068-2073 K. Jyothi Sree A Novel Approach of 5-Level Inverter Fed With PV for Residential Load International Journal of Multee Disciplinary Research , Volume-3, Issue-2, April-2017 K. Jyothi Sree, N. Chandra Mouli Arivand(Student) A Novel Approach of 5-Level Inverter Fed With PV for Residential Load International Conference on Standards for Engineering and Management , ISBN978-1546365471 K. Naresh Multi-Level Inverter with Simplified Control Strategy for Distributed Energy Resource Integration with Distribution System Journal of Science and Technology(JST)- Volume 2, Issue 1, January 2017, PP 26-38 M. Rambabu, K. Naresh, A. Balaji, J. Sai Siva Kalyan Simulation of a Time Dependent 2D Generator Model Using Comsol Multiphysics IEEJ B. Phani Ranga Raja, K. Naresh, A. Balaji, M. Rambabu Optimal Placement Approach of Phasor Measuring Unit by GPS IEEJ K. Naresh Economic Load Dispatch with Multiple Fuel Options Using GA Toolbox in MATLAB ELSEVIER K. Naresh MatlabSimulink Based Dynamic Modeling of Micro Turbine Generator for Grid and Islanding Modes of Operation International Journal of Power Systems(IJPS) Surendra Loya Analysis of Shielding Effectiveness in the Electric Field and Magnetic Field and Plane Wave for Infinite Sheet Metals International Journal of Electromagnetics and Applications 2016 Director Dr KRR produced 12 th PhD under his guidance. B-Tech ECE-A final year project students presented paper in the International Conference under the guidence of Mr.L .surendra,Assistantant professor, ECE Mr.L.Surendra, Mr.M.Galeeb department of ECE partispated and presented paper in QIP short term course cum workshop with titledIndustrial applications of Tera hertz Radiation conducted by IIT Kharagpur R. Vijay P. Ramesh Babu Influence of tungsten ions valence states on electrical characteristics of quaternary lithium-antimony-lead-germanate glasses Journal of Physics and Chemistry of Solids (Elsevier) doi.org10.1016j.jpcs.2017.04.001 P. Ramesh Babu, K. Naveen Kumar, R. Vijay Spectroscopic investigation on lithium yttrium silicate glasses doped with v2o5 International Journal of Physics and Mathematical Sciences ISSN 2277-2111, 2016 Vol. 6, pp.55-62 Publications of KRR in 2016-17 S.NO Name of the Staff Research Topic University Year Dr. K. Naresh Analysis and Impact of Multimode Droop Control of a DFIG Based Wind Power Unit for Remote Application Using Different Controller JNTUA Anantapur 2024 Mr. A Suneel Kumar Studies on the performance characteristics of screen pinted silver nanopraticle ink patch antennas for 5G Application AU 2022 Mr. K Eliah Vocabulary Learning Strategies ANU 2022 Mr. B Kiran Babu Experimental Investigation on mechanical Behaviour, Wear Properties, Machining Behaviour and Biodegradation of Friction Stir Processed ZE41 Mg Alloy JNTU - K 2022 Mr. V Ajay Kumar Effect of ZrO2 and TIO2 on mechanical and tribological properties of HAP NANOCOMPOSITES AU 2021 Mr. K Sundara Kumar Modelling of Environmental Impacts of Land UseLand Cover Dynanmics on Urban Microclimate JNTU - K 2020 Courses Offered B.Tech AI ML AI DS ECE CSE IT EEE MECH Polytechnic Courses CSE MECH CIVIL ECE EEE M.Tech Cyber security ROBOTICS AI CSE - AI ML CSE VLSI ES College Facilities The only engineering College which implements WORK-STUDY programme. Air conditioned class rooms with gallery type seating arrangement. All Class rooms are equiped with Multimedia Projectors. E-Beam Technology Response Recording Facility. Air conditioned computer Labs with more than 600 systems. Highly experienced and well qualified teaching staff. Internship with reputed companies. Wi-Fi facility across the Campus. Library facility from 8.00Am to 10.00Pm. Free Coaching for GATE,GRE and TOEFL to Students. Research development Lab. Transportation facility from Vijayawada and surrounding places. Enroll Now First Name Last Name Email Phone Program Select Program Under Graduate - UG Post Graduate - PG Course Course Address Apply Today Watch Video Success Error

Contact Information:
Phone: 25-09-2023, 31-07-2023, 05-07-2023, 2023 30-07, 2023, 25-06-2023, 08-05-2023, 25-04-2023, 24-04-2023, 06-04-2023 15, 2023 01-04, 2023, 29-03-2023 15, 2023 29-03, 2023, 28-03-2023, 27-03-2023, 26-03-2023, 25-03-2023, 24-03-2023, 23-03-2023, 16-03-2023, 10-03-2023, 08-03-2023, 21-02-2023, 15-02-2023, 14-02-2023, 24-01-2023, 2023 22-01, 2023, 06-01-2023, 23-12-2022, 11-11-2022, 15-9-2022, 2022 5-9, 2022, 2020, 2020, 14-03-2020, 12-03-2020, 07-03-2020, 2020 07-03, 2020, 2020, 2020, 23-02-2020, 23-02-2020, 30-01-2020, 29-01-2020, 22-01-2020, 11-01-2020, 08-01-2020, 05-01-2020, 2020, 2025, 10.15662, 20251403041, 2025, 2025, 2025, 2025, 2025 6, 36-44, 10.2227127084574, 2025, 2025, 10.38124, 2025, 2025, 10.15662, 2025.1404026, 2025, 126-132, 2025, 118-125, 2025, 45-54, 2025, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2020, 3676-3684, 2020, 2020, 2020, 1586-1592, 2020, 2020, 1571-1578, 2020, 1559-1566, 2019, 2019, 2019, 2019, 2020, 2019, 525-535, 2018, 33-46, 49171, 2018, 306-315, 2018, 74-82, 2018, 1590-1596, 2017, 90-96, 2019, 2018, 306-315, 2018, 74-82, 2018, 1590-1596, 2348-2281, 2018, 2017, 2394-8442, 3011-3030, 2017, 2068-2073, 2017, 978-1546365471, 2017, 26-38, 2016, 10.1016, 2017.04.001, 2277-2111, 2016, 55-62, 2016-17, 2024, 2022, 2022, 2022, 2021, 2020, 10.00
`;
  }

  // Helper method to detect greetings
  private isGreeting(query: string): boolean {
    const normalizedQuery = query.toLowerCase().trim();
    const greetings = [
      'hello', 'hi', 'hey', 'hii', 'hiii', 'helo', 'hey there',
      'good morning', 'good afternoon', 'good evening', 'good night',
      'morning', 'afternoon', 'evening',
      'greetings', 'howdy', 'hola', 'namaste',
      'what\'s up', 'whats up', 'wassup', 'sup',
      'how are you', 'how r u', 'how do you do'
    ];
    
    return greetings.some(greeting => 
      normalizedQuery === greeting || 
      normalizedQuery.startsWith(greeting + ' ') ||
      normalizedQuery.endsWith(' ' + greeting) ||
      normalizedQuery === greeting + '!'
    );
  }

  // Get greeting response
  private getGreetingResponse(): ChatResponse {
    return {
      question: '',
      answer: 'Hello! Welcome to URCET Campus Assistant. I\'m here to help you with information about Usha Rama College of Engineering and Technology. Feel free to ask me about our departments, courses, faculty, facilities, events, admissions, or campus life. How may I assist you today?',
      category: 'general',
      keywords: ['greeting', 'hello', 'hi']
    };
  }

  public async generateResponse(query: string): Promise<ChatResponse> {
    try {
      console.log('🔍 Processing query:', query);
      
      // First, check if it's a greeting
      if (this.isGreeting(query)) {
        console.log('👋 Detected greeting, sending welcome message');
        return this.getGreetingResponse();
      }
      
      // Check for a predefined response using enhanced keyword matching
      const predefinedResponse = this.findBestMatchingResponse(query);
      if (predefinedResponse) {
        console.log('📋 Found predefined response using keyword matching');
        return predefinedResponse;
      }

      console.log('🤖 Generating AI response using Gemini 2.5 Flash...');
      
      // If no predefined response is found, use the Gemini model.
      const prompt = `
        ${this.getCollegeContext()}

        User Question: "${query}"

        Provide a direct and specific answer based on the provided context.
      `;

      const chat = this.model.startChat();
      const result = await chat.sendMessage(prompt);
      const text = result.response.text();

      console.log('✅ AI response generated successfully');
      
      return {
        question: query,
        answer: text,
        category: 'AI Generated',
        keywords: ['urcet', 'ai', 'gemini'],
      };
    } catch (error) {
      console.error('❌ Error generating response:', error);
      console.error('📝 Falling back to default response');
      return this.getDefaultResponse();
    }
  }


  private findBestMatchingResponse(query: string): ChatResponse | undefined {
    const normalizedQuery = query.toLowerCase().trim();
    
    // First, try exact question match
    const exactMatch = this.responses.find(response =>
      response.question.toLowerCase().trim() === normalizedQuery
    );
    if (exactMatch) {
      return exactMatch;
    }

    // Check for exact phrase matches in keywords before extracting individual keywords
    console.log('🔍 Checking exact phrase match for:', normalizedQuery);
    const exactPhraseMatch = this.responses.find(response =>
      response.keywords.some(keyword => {
        const isMatch = keyword.toLowerCase() === normalizedQuery;
        if (isMatch) {
          console.log('✅ Exact phrase match found:', keyword, 'for query:', normalizedQuery);
        }
        return isMatch;
      })
    );
    if (exactPhraseMatch) {
      console.log('🎯 Found exact phrase match:', normalizedQuery);
      return exactPhraseMatch;
    }

    // Extract keywords from user query
    const userKeywords = this.extractKeywords(normalizedQuery);
    console.log('🔑 Extracted keywords from query:', userKeywords);

    // Find responses with keyword matches
    const matchedResponses = this.responses.map(response => {
      const matchCount = this.calculateKeywordMatches(userKeywords, response.keywords);
      return {
        response,
        matchCount,
        matchScore: this.calculateMatchScore(userKeywords, response.keywords, response.question, normalizedQuery)
      };
    }).filter(item => item.matchCount > 0);

    if (matchedResponses.length === 0) {
      return undefined;
    }

    // Sort by match score (highest first)
    matchedResponses.sort((a, b) => b.matchScore - a.matchScore);
    
    console.log('🎯 Best match found with score:', matchedResponses[0].matchScore);
    console.log('🔍 Top 3 matches:', matchedResponses.slice(0, 3).map(m => ({ question: m.response.question, score: m.matchScore })));
    return matchedResponses[0].response;
  }

  private extractKeywords(query: string): string[] {
    // Remove common stop words and extract meaningful keywords
    const stopWords = ['the', 'is', 'are', 'was', 'were', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'what', 'how', 'when', 'where', 'who', 'why', 'which', 'that', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'about', 'can', 'could', 'should', 'would', 'will', 'shall', 'may', 'might', 'must', 'do', 'does', 'did', 'have', 'has', 'had', 'be', 'been', 'being', 'get', 'got', 'tell', 'please', 'thanks', 'thank'];
    
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word))
      .map(word => word.trim())
      .filter(word => word.length > 0);
  }

  private calculateKeywordMatches(userKeywords: string[], responseKeywords: string[]): number {
    let matchCount = 0;
    
    for (const userKeyword of userKeywords) {
      for (const responseKeyword of responseKeywords) {
        // Check for exact match or partial match
        if (responseKeyword.toLowerCase().includes(userKeyword) || userKeyword.includes(responseKeyword.toLowerCase())) {
          matchCount++;
          break; // Count each user keyword only once per response
        }
      }
    }
    
    return matchCount;
  }

  private calculateMatchScore(userKeywords: string[], responseKeywords: string[], question: string, originalQuery?: string): number {
    let score = 0;
    const questionWords = question.toLowerCase().split(/\s+/);
    
    // Check for exact phrase matches first (highest priority)
    if (originalQuery) {
      for (const keyword of responseKeywords) {
        if (keyword.toLowerCase() === originalQuery) {
          score += 100; // Very high score for exact phrase match
        }
      }
    }
    
    // Fallback to keyword-based phrase matching
    const userQuery = userKeywords.join(' ');
    for (const keyword of responseKeywords) {
      if (keyword.toLowerCase() === userQuery) {
        score += 50; // High score for keyword-based phrase match
      }
    }
    
    for (const userKeyword of userKeywords) {
      // Check exact matches in keywords (highest weight)
      if (responseKeywords.some(keyword => keyword.toLowerCase() === userKeyword)) {
        score += 10;
      }
      // Check partial matches in keywords (medium weight)
      else if (responseKeywords.some(keyword => keyword.toLowerCase().includes(userKeyword) || userKeyword.includes(keyword.toLowerCase()))) {
        score += 5;
      }
      // Check matches in question text (lower weight)
      else if (questionWords.some(word => word.includes(userKeyword) || userKeyword.includes(word))) {
        score += 2;
      }
    }
    
    // Bonus points for multiple keyword matches
    const keywordMatches = this.calculateKeywordMatches(userKeywords, responseKeywords);
    if (keywordMatches > 1) {
      score += keywordMatches * 2;
    }
    
    return score;
  }

  public getDefaultResponse(): ChatResponse {
    return {
      question: '',
      answer: "I'm the URCET Campus Assistant and I specialize in answering questions about Usha Rama College of Engineering and Technology. Please feel free to ask me about our academic programs, departments, faculty, facilities, events, admissions, or campus life!",
      category: 'General',
      keywords: ['error', 'default']
    };
  }

  public getResponsesByCategory(category: string): ChatResponse[] {
    return this.responses.filter(response => response.category === category);
  }

  public getAllCategories(): string[] {
    const categories = new Set(this.responses.map(response => response.category));
    return Array.from(categories);
  }

  public searchResponses(query: string): ChatResponse[] {
    const normalizedQuery = query.toLowerCase().trim();
    const userKeywords = this.extractKeywords(normalizedQuery);
    
    // If no meaningful keywords extracted, fall back to simple text search
    if (userKeywords.length === 0) {
      return this.responses.filter(response =>
        response.answer.toLowerCase().includes(normalizedQuery) ||
        response.question.toLowerCase().includes(normalizedQuery)
      );
    }

    // Find responses with keyword matches and score them
    const matchedResponses = this.responses.map(response => {
      const matchScore = this.calculateMatchScore(userKeywords, response.keywords, response.question);
      return {
        response,
        matchScore
      };
    }).filter(item => item.matchScore > 0);

    // Sort by match score and return the responses
    return matchedResponses
      .sort((a, b) => b.matchScore - a.matchScore)
      .map(item => item.response);
  }

  public getSuggestedResponses(partialQuery: string, limit: number = 3): ChatResponse[] {
    if (partialQuery.length < 2) {
      return [];
    }

    const normalizedQuery = partialQuery.toLowerCase().trim();
    const userKeywords = this.extractKeywords(normalizedQuery);
    
    if (userKeywords.length === 0) {
      // Fall back to simple text matching
      return this.responses
        .filter(response => 
          response.question.toLowerCase().includes(normalizedQuery) ||
          response.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery))
        )
        .slice(0, limit);
    }

    // Use keyword-based matching for suggestions
    const suggestions = this.responses.map(response => {
      const matchScore = this.calculateMatchScore(userKeywords, response.keywords, response.question);
      return {
        response,
        matchScore
      };
    }).filter(item => item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
      .map(item => item.response);

    return suggestions;
  }

  public getQuickActionResponse(actionQuery: string): ChatResponse | undefined {
    // This method specifically handles quick action queries
    return this.findBestMatchingResponse(actionQuery);
  }
}

