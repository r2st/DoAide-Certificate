export const tools = [
  {
    slug: 'certificate-of-appreciation',
    templateId: 'appreciation',
    title: 'Free Certificate of Appreciation Generator',
    shortTitle: 'Certificate of Appreciation',
    description: 'Create professional certificates of appreciation for employees, volunteers, teachers, and team members. Free, no login required. Download as PDF or PNG instantly.',
    heroDesc: 'Recognize outstanding contributions with a beautifully designed certificate of appreciation. Perfect for employers, schools, non-profits, and event organizers.',
    keywords: 'certificate of appreciation, appreciation certificate maker, free appreciation certificate, thank you certificate, recognition certificate',
    faqs: [
      {
        q: 'What is a certificate of appreciation?',
        a: 'A certificate of appreciation is a formal document that recognizes and thanks an individual for their contribution, service, or achievement. It is commonly used by organizations, schools, and companies to acknowledge outstanding work or dedication.',
      },
      {
        q: 'How do I create a certificate of appreciation online?',
        a: 'Use our free tool above: enter the recipient name, organization, description, and date. Optionally upload your logo and signature. Click Download PNG or Download PDF to save your certificate instantly. No sign-up required.',
      },
      {
        q: 'Can I create bulk appreciation certificates?',
        a: 'Yes! Click the "Bulk Generate from CSV" button in the editor. Upload a CSV file with a "Name" column and generate hundreds of personalized certificates at once, downloaded as a ZIP file.',
      },
      {
        q: 'Is this certificate maker really free?',
        a: 'Yes, completely free with no hidden costs. There is no login required, no watermarks on your certificates, and unlimited downloads.',
      },
    ],
  },
  {
    slug: 'course-completion-certificate',
    templateId: 'course-completion',
    title: 'Free Course Completion Certificate Generator',
    shortTitle: 'Course Completion Certificate',
    description: 'Create professional course completion certificates for online courses, training programs, and workshops. Free, no login. Download PDF or PNG.',
    heroDesc: 'Issue polished course completion certificates to your students and trainees. Ideal for online courses, corporate training, bootcamps, and educational institutions.',
    keywords: 'course completion certificate, course certificate maker, training certificate generator, free course certificate, online course certificate',
    faqs: [
      {
        q: 'What should a course completion certificate include?',
        a: 'A course completion certificate should include the recipient\'s name, course title, issuing organization, completion date, and an authorized signature. Optional elements include a QR verification code, course duration, and organization logo.',
      },
      {
        q: 'How do I issue certificates for my online course?',
        a: 'Use this free generator: enter the student name, course title, your organization name, and the completion date. Download as PDF or PNG. For multiple students, use the bulk generation feature with a CSV file.',
      },
      {
        q: 'Can I add my company logo to the certificate?',
        a: 'Yes! Upload your organization logo in the editor panel. It will appear at the top of the certificate. You can also upload a custom signature image.',
      },
      {
        q: 'Do you offer certificate verification?',
        a: 'Yes, each certificate gets a unique ID. Enable the QR code option to add a verification QR code that links to the certificate verification page.',
      },
    ],
  },
  {
    slug: 'award-certificate',
    templateId: 'achievement',
    title: 'Free Award Certificate Generator',
    shortTitle: 'Award Certificate',
    description: 'Design and download professional award certificates for achievements, competitions, and recognition. Free online tool, no sign-up needed.',
    heroDesc: 'Create stunning award certificates for competitions, academic achievements, employee recognition, and special events. Professional templates with instant download.',
    keywords: 'award certificate maker, free award certificate, achievement certificate generator, competition certificate, recognition award template',
    faqs: [
      {
        q: 'What types of awards can I create certificates for?',
        a: 'You can create certificates for any type of award: employee of the month, academic achievement, sports competition, best performance, volunteer recognition, hackathon winner, and more.',
      },
      {
        q: 'Can I customize the colors and design?',
        a: 'Yes! Change the accent color using the color picker, choose from multiple border and seal styles, upload your own logo and signature, and edit all text fields to match your needs.',
      },
      {
        q: 'What format can I download the certificate in?',
        a: 'Download your award certificate as a high-resolution PNG image or a print-ready PDF. Both formats are suitable for printing or digital sharing.',
      },
      {
        q: 'Can I share the certificate on social media?',
        a: 'Yes! Use the Share button to share directly on WhatsApp or LinkedIn. You can also copy the verification link or embed the certificate on your website.',
      },
    ],
  },
];

export const getTool = (slug) => tools.find((t) => t.slug === slug);
