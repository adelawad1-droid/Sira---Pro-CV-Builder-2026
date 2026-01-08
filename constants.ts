
import { CVData } from './types';

export const FLAT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjVmOSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzgiIHI9IjIwIiBmaWxsPSIjY2JkNWUxIi8+PHBhdGggZD0iTTIwIDkwYzAtMTUgMTItMjggMzAtMjhzMzAgMTMgMzAgMjh2MTBIMjBWOTB6IiBmaWxsPSIjY2JkNWUxIi8+PC9zdmc+";

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  languages: [],
};

export const SPECIALTIES_DATA: Record<string, { ar: CVData; en: CVData }> = {
  software: {
    ar: {
      personalInfo: {
        fullName: 'خالد عبد الله المنصور',
        jobTitle: 'مطور برمجيات أول (Senior Full-Stack Developer)',
        email: 'khaled.dev@example.com',
        phone: '+966 55 123 4567',
        location: 'الرياض، المملكة العربية السعودية',
        summary: 'مطور برمجيات خبير يتمتع بخلفية تقنية قوية في بناء وتطوير الأنظمة السحابية المعقدة. متخصص في تقنيات الويب الحديثة، مع سجل حافل في تحسين أداء التطبيقات بنسبة 40% وتطبيق حلول تقنية مبتكرة.',
        image: FLAT_AVATAR
      },
      experience: [
        { id: '1', company: 'شركة التقنية المتقدمة', position: 'رئيس فريق المطورين', startDate: '2021', endDate: 'الحاضر', description: '• قيادة فريق مكون من 10 مطورين لبناء منصات تجارة إلكترونية.\n• تصميم هندسة الأنظمة لضمان القابلية للتوسع.\n• مراجعة الكود وضمان جودة المخرجات البرمجية.' }
      ],
      education: [{ id: '3', institution: 'جامعة الملك سعود', degree: 'بكالوريوس علوم الحاسب', startDate: '2014', endDate: '2018', description: 'تخصص هندسة برمجيات.' }],
      skills: [{ id: 's1', name: 'React/Next.js', level: 5 }, { id: 's2', name: 'Node.js', level: 5 }, { id: 's3', name: 'Cloud Architecture', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'مستوى احترافي' }]
    },
    en: {
      personalInfo: {
        fullName: 'Khaled Mansour',
        jobTitle: 'Senior Full-Stack Developer',
        email: 'khaled.dev@example.com',
        phone: '+1 234 567 890',
        location: 'Dubai, UAE',
        summary: 'Expert Software Developer with a strong technical background in building and developing complex cloud systems. Specialized in modern web technologies with a proven track record of optimization.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Tech Solutions Corp', position: 'Lead Developer', startDate: '2021', endDate: 'Present', description: '• Leading a team of 10 developers.\n• System architecture design.\n• Code reviews and quality assurance.' }],
      education: [{ id: '3', institution: 'KSU', degree: 'B.S. in Computer Science', startDate: '2014', endDate: '2018', description: 'Software Engineering focus.' }],
      skills: [{ id: 's1', name: 'React/Next.js', level: 5 }, { id: 's2', name: 'Node.js', level: 5 }, { id: 's3', name: 'Cloud Architecture', level: 4 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  },
  design: {
    ar: {
      personalInfo: {
        fullName: 'سارة فهد العتيبي',
        jobTitle: 'مصممة واجهات وتجربة مستخدم (UI/UX Designer)',
        email: 'sara.ux@example.com',
        phone: '+966 50 123 9876',
        location: 'جدة، المملكة العربية السعودية',
        summary: 'مصممة مبدعة متخصصة في ابتكار تجارب مستخدم رقمية تركز على احتياجات الإنسان وتدعم أهداف الأعمال. خبيرة في بناء أنظمة التصميم وإجراء أبحاث المستخدم.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'استوديو الإبداع الرقمي', position: 'كبير مصممي واجهات المستخدم', startDate: '2020', endDate: 'الحاضر', description: '• تصميم واجهات تطبيقات جوال حصدت جوائز.\n• تحسين معدلات التحويل للمواقع بنسبة 25%.\n• بناء مكتبة عناصر التصميم (Design System) للشركة.' }],
      education: [{ id: '2', institution: 'جامعة الأميرة نورة', degree: 'بكالوريوس التصميم الجرافيكي', startDate: '2015', endDate: '2019', description: 'تخصص وسائط متعددة.' }],
      skills: [{ id: 's1', name: 'Figma & Adobe XD', level: 5 }, { id: 's2', name: 'User Research', level: 4 }, { id: 's3', name: 'Prototyping', level: 5 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'مستوى متقدم' }]
    },
    en: {
      personalInfo: {
        fullName: 'Sara Al-Otaibi',
        jobTitle: 'UI/UX Designer',
        email: 'sara.ux@example.com',
        phone: '+1 555 123 4567',
        location: 'London, UK',
        summary: 'Creative designer specializing in human-centered digital user experiences. Expert in building Design Systems and user research.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Creative Studio', position: 'Senior UI Designer', startDate: '2020', endDate: 'Present', description: '• Designing award-winning app interfaces.\n• Improving conversion rates by 25%.\n• Implementing corporate design systems.' }],
      education: [{ id: '2', institution: 'Arts University', degree: 'B.A. in Graphic Design', startDate: '2015', endDate: '2019', description: 'Multimedia focus.' }],
      skills: [{ id: 's1', name: 'Figma & Adobe XD', level: 5 }, { id: 's2', name: 'User Research', level: 4 }, { id: 's3', name: 'Prototyping', level: 5 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  },
  accounting: {
    ar: {
      personalInfo: {
        fullName: 'محمد علي الرشيد',
        jobTitle: 'محاسب مالي معتمد (CPA)',
        email: 'm.rashid@example.com',
        phone: '+966 50 444 5555',
        location: 'الرياض، السعودية',
        summary: 'محاسب مالي دقيق ذو خبرة في التدقيق المالي وإعداد الميزانيات السنوية. خبير في استخدام برامج المحاسبة السحابية وضمان الامتثال للمعايير الدولية (IFRS).',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'شركة التدقيق الكبرى', position: 'رئيس قسم المحاسبة', startDate: '2019', endDate: 'الحاضر', description: '• إدارة التدقيق المالي لـ 20 شركة كبرى.\n• إعداد التقارير المالية ربع السنوية.\n• تقليل التكاليف التشغيلية بنسبة 15%.' }],
      education: [{ id: '2', institution: 'جامعة الملك فهد', degree: 'بكالوريوس محاسبة', startDate: '2014', endDate: '2018', description: 'مرتبة الشرف الأولى.' }],
      skills: [{ id: 's1', name: 'Financial Audit', level: 5 }, { id: 's2', name: 'SAP ERP', level: 4 }, { id: 's3', name: 'Budgeting', level: 5 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'مستوى احترافي' }]
    },
    en: {
      personalInfo: {
        fullName: 'Mohammed Rashid',
        jobTitle: 'Certified Public Accountant (CPA)',
        email: 'm.rashid@example.com',
        phone: '+966 50 444 5555',
        location: 'Riyadh, KSA',
        summary: 'Detail-oriented financial accountant with experience in auditing and annual budgeting. Expert in cloud accounting software and IFRS compliance.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Global Audit Firm', position: 'Head of Accounting', startDate: '2019', endDate: 'Present', description: '• Managing financial audits for 20+ major firms.\n• Preparing quarterly financial statements.\n• Reducing operational costs by 15%.' }],
      education: [{ id: '2', institution: 'KFUPM', degree: 'B.S. in Accounting', startDate: '2014', endDate: '2018', description: 'First Class Honors.' }],
      skills: [{ id: 's1', name: 'Financial Audit', level: 5 }, { id: 's2', name: 'SAP ERP', level: 4 }, { id: 's3', name: 'Budgeting', level: 5 }],
      languages: [{ name: 'English', level: 'Professional' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  marketing: {
    ar: {
      personalInfo: {
        fullName: 'ياسمين أحمد جلال',
        jobTitle: 'مديرة تسويق رقمي',
        email: 'yasmine.mkt@example.com',
        phone: '+966 50 777 8888',
        location: 'دبي، الإمارات',
        summary: 'خبيرة في استراتيجيات التسويق الرقمي وإدارة الحملات الإعلانية الموجهة. متخصصة في تحليل البيانات لزيادة العائد على الاستثمار (ROI) وبناء الهوية البصرية.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'وكالة النمو الرقمي', position: 'مديرة استراتيجية التسويق', startDate: '2020', endDate: 'الحاضر', description: '• تحقيق نمو في المبيعات بنسبة 300% عبر حملات التواصل.\n• إدارة ميزانيات تسويقية سنوية تتجاوز مليون دولار.\n• تطوير استراتيجيات المحتوى لبرندات عالمية.' }],
      education: [{ id: '2', institution: 'الجامعة الأمريكية في بيروت', degree: 'ماجستير تسويق رقمي', startDate: '2016', endDate: '2018', description: 'تخصص تحليل سلوك المستهلك.' }],
      skills: [{ id: 's1', name: 'Google Ads & SEO', level: 5 }, { id: 's2', name: 'Data Analysis', level: 5 }, { id: 's3', name: 'Growth Hacking', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'بطلاقة' }]
    },
    en: {
      personalInfo: {
        fullName: 'Yasmine Jalal',
        jobTitle: 'Digital Marketing Manager',
        email: 'yasmine.mkt@example.com',
        phone: '+1 555 777 8888',
        location: 'Dubai, UAE',
        summary: 'Expert in digital marketing strategies and targeted ad campaign management. Specialized in data analytics to boost ROI and brand identity.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Growth Digital Agency', position: 'Marketing Strategy Manager', startDate: '2020', endDate: 'Present', description: '• Achieved 300% sales growth via social campaigns.\n• Managed annual budgets exceeding $1M.\n• Developed content strategies for global brands.' }],
      education: [{ id: '2', institution: 'AUB', degree: 'M.S. in Digital Marketing', startDate: '2016', endDate: '2018', description: 'Consumer behavior focus.' }],
      skills: [{ id: 's1', name: 'Google Ads & SEO', level: 5 }, { id: 's2', name: 'Data Analysis', level: 5 }, { id: 's3', name: 'Growth Hacking', level: 4 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  },
  medical: {
    ar: {
      personalInfo: {
        fullName: 'د. فهد بن ناصر السديري',
        jobTitle: 'طبيب استشاري باطنة',
        email: 'dr.fahad@example.com',
        phone: '+966 53 111 2222',
        location: 'الرياض، السعودية',
        summary: 'طبيب استشاري ذو خبرة تزيد عن 10 سنوات في طب الباطنة. متخصص في تشخيص الحالات المعقدة وإدارة الرعاية الصحية الشاملة للمرضى. ملتزم بأعلى معايير الجودة الطبية والبحث العلمي.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'مستشفى الملك فيصل التخصصي', position: 'استشاري أول', startDate: '2015', endDate: 'الحاضر', description: '• الإشراف على العيادات الخارجية وأجنحة التنويم.\n• المشاركة في الأبحاث السريرية المنشورة دولياً.\n• تدريب الأطباء المقيمين والزملاء.' }],
      education: [{ id: '2', institution: 'جامعة الملك سعود', degree: 'دكتوراه في الطب (MD)', startDate: '2005', endDate: '2012', description: 'الزمالة السعودية في طب الباطنة.' }],
      skills: [{ id: 's1', name: 'Diagnosis', level: 5 }, { id: 's2', name: 'Patient Care', level: 5 }, { id: 's3', name: 'Medical Research', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'مستوى احترافي' }]
    },
    en: {
      personalInfo: {
        fullName: 'Dr. Fahad Al-Sudairi',
        jobTitle: 'Consultant Internist',
        email: 'dr.fahad@example.com',
        phone: '+1 555 111 2222',
        location: 'Riyadh, Saudi Arabia',
        summary: 'Consultant physician with over 10 years of experience in internal medicine. Specialized in complex diagnoses and comprehensive patient care.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'King Faisal Specialist Hospital', position: 'Senior Consultant', startDate: '2015', endDate: 'Present', description: '• Overseeing outpatient clinics and inpatient wards.\n• Participating in international clinical research.\n• Training residents and fellows.' }],
      education: [{ id: '2', institution: 'KSU Medical College', degree: 'Doctor of Medicine (MD)', startDate: '2005', endDate: '2012', description: 'Saudi Board in Internal Medicine.' }],
      skills: [{ id: 's1', name: 'Diagnosis', level: 5 }, { id: 's2', name: 'Patient Care', level: 5 }, { id: 's3', name: 'Medical Research', level: 4 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  },
  sales: {
    ar: {
      personalInfo: {
        fullName: 'عمر إبراهيم الحربي',
        jobTitle: 'مدير مبيعات إقليمي',
        email: 'omar.sales@example.com',
        phone: '+966 54 888 7777',
        location: 'جدة، السعودية',
        summary: 'محترف مبيعات يتمتع بمهارات تفاوض استثنائية وقدرة على بناء علاقات تجارية طويلة الأمد. متخصص في استراتيجيات التوسع في الأسواق وتحقيق الأهداف البيعية الطموحة.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'شركة حلول التوريد', position: 'مدير مبيعات أول', startDate: '2018', endDate: 'الحاضر', description: '• زيادة حصة الشركة السوقية بنسبة 25%.\n• قيادة فريق مكون من 30 موظف مبيعات.\n• بناء علاقات استراتيجية مع كبار العملاء في المنطقة.' }],
      education: [{ id: '2', institution: 'جامعة جدة', degree: 'بكالوريوس إدارة أعمال', startDate: '2012', endDate: '2016', description: 'تخصص مبيعات وتسويق.' }],
      skills: [{ id: 's1', name: 'Negotiation', level: 5 }, { id: 's2', name: 'Strategic Planning', level: 4 }, { id: 's3', name: 'Team Leadership', level: 5 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'جيد جداً' }]
    },
    en: {
      personalInfo: {
        fullName: 'Omar Al-Harbi',
        jobTitle: 'Regional Sales Manager',
        email: 'omar.sales@example.com',
        phone: '+1 555 888 7777',
        location: 'Jeddah, KSA',
        summary: 'Sales professional with exceptional negotiation skills and a track record of building long-term business relationships. Expert in market expansion.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Supply Solutions Co', position: 'Senior Sales Director', startDate: '2018', endDate: 'Present', description: '• Increased market share by 25%.\n• Leading a team of 30 sales professionals.\n• Building strategic key account relationships.' }],
      education: [{ id: '2', institution: 'Jeddah University', degree: 'B.S. in Business Administration', startDate: '2012', endDate: '2016', description: 'Sales focus.' }],
      skills: [{ id: 's1', name: 'Negotiation', level: 5 }, { id: 's2', name: 'Strategic Planning', level: 4 }, { id: 's3', name: 'Team Leadership', level: 5 }],
      languages: [{ name: 'English', level: 'Fluent' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  civil: {
    ar: {
      personalInfo: {
        fullName: 'م. سامي محمد الفايز',
        jobTitle: 'مهندس مدني أول (Project Engineer)',
        email: 'sami.eng@example.com',
        phone: '+966 55 999 1111',
        location: 'نيوم، السعودية',
        summary: 'مهندس مدني متخصص في إدارة مشاريع البنية التحتية العملاقة. خبير في التخطيط الإنشائي، إدارة المواقع، وضمان معايير السلامة والجودة العالمية.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'شركة الإنشاءات الكبرى', position: 'مدير مشروع إنسائي', startDate: '2017', endDate: 'الحاضر', description: '• الإشراف على بناء مجمعات سكنية وتجارية.\n• مراجعة المخططات الهندسية بدقة عالية.\n• إدارة المقاولين والموردين لضمان الجدول الزمني.' }],
      education: [{ id: '2', institution: 'جامعة الملك سعود', degree: 'بكالوريوس هندسة مدنية', startDate: '2011', endDate: '2016', description: 'تخصص هندسة إنشائية.' }],
      skills: [{ id: 's1', name: 'AutoCAD & Civil 3D', level: 5 }, { id: 's2', name: 'Project Management', level: 5 }, { id: 's3', name: 'Structural Analysis', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'جيد جداً' }]
    },
    en: {
      personalInfo: {
        fullName: 'Eng. Sami Al-Faiz',
        jobTitle: 'Senior Civil Engineer',
        email: 'sami.eng@example.com',
        phone: '+1 555 999 1111',
        location: 'NEOM, KSA',
        summary: 'Civil engineer specialized in large-scale infrastructure projects. Expert in structural planning, site management, and global safety standards.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Mega Construction Corp', position: 'Project Site Manager', startDate: '2017', endDate: 'Present', description: '• Overseeing commercial and residential complexes.\n• Reviewing high-precision engineering blueprints.\n• Managing contractors to ensure deadlines.' }],
      education: [{ id: '2', institution: 'KSU', degree: 'B.S. in Civil Engineering', startDate: '2011', endDate: '2016', description: 'Structural focus.' }],
      skills: [{ id: 's1', name: 'AutoCAD & Civil 3D', level: 5 }, { id: 's2', name: 'Project Management', level: 5 }, { id: 's3', name: 'Structural Analysis', level: 4 }],
      languages: [{ name: 'English', level: 'Fluent' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  hr: {
    ar: {
      personalInfo: {
        fullName: 'ريم عبد العزيز القحطاني',
        jobTitle: 'مديرة موارد بشرية (HR Manager)',
        email: 'reem.hr@example.com',
        phone: '+966 50 222 3333',
        location: 'الرياض، السعودية',
        summary: 'أخصائية موارد بشرية خبيرة في التوظيف الاستراتيجي، التدريب، وتطوير ثقافة العمل المؤسسي. تهدف إلى بناء بيئة عمل محفزة ومنتجة تتماشى مع رؤية المنظمة.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'مجموعة الاتصالات السعودية', position: 'كبير أخصائي توظيف', startDate: '2019', endDate: 'الحاضر', description: '• تطوير استراتيجيات استقطاب المواهب.\n• تحسين معدل الاحتفاظ بالموظفين بنسبة 20%.\n• إدارة برامج التدريب والتطوير السنوي.' }],
      education: [{ id: '2', institution: 'جامعة الملك سعود', degree: 'بكالوريوس إدارة موارد بشرية', startDate: '2014', endDate: '2018', description: 'تخصص إدارة تنظيمية.' }],
      skills: [{ id: 's1', name: 'Strategic Recruitment', level: 5 }, { id: 's2', name: 'Conflict Resolution', level: 5 }, { id: 's3', name: 'HRIS Systems', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'ممتاز' }]
    },
    en: {
      personalInfo: {
        fullName: 'Reem Al-Qahtani',
        jobTitle: 'HR Manager',
        email: 'reem.hr@example.com',
        phone: '+1 555 222 3333',
        location: 'Riyadh, KSA',
        summary: 'HR professional expert in strategic recruitment, training, and corporate culture development. Aiming to build a motivating and productive work environment.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'STC Group', position: 'Senior Talent Acquisition', startDate: '2019', endDate: 'Present', description: '• Developing talent acquisition strategies.\n• Improving employee retention by 20%.\n• Managing annual L&D programs.' }],
      education: [{ id: '2', institution: 'KSU', degree: 'B.A. in HR Management', startDate: '2014', endDate: '2018', description: 'Organizational focus.' }],
      skills: [{ id: 's1', name: 'Strategic Recruitment', level: 5 }, { id: 's2', name: 'Conflict Resolution', level: 5 }, { id: 's3', name: 'HRIS Systems', level: 4 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  },
  pm: {
    ar: {
      personalInfo: {
        fullName: 'سعد بن علي المطيري',
        jobTitle: 'مدير مشاريع معتمد (PMP)',
        email: 'saad.pm@example.com',
        phone: '+966 54 333 4444',
        location: 'نيوم، السعودية',
        summary: 'مدير مشاريع محترف يمتلك خبرة واسعة في قيادة المشاريع التقنية والإنشائية. بارع في إدارة المخاطر، الجدولة الزمنية، وضمان الجودة وفق أعلى المعايير العالمية.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'هيئة تطوير الرياض', position: 'مدير مشاريع أول', startDate: '2018', endDate: 'الحاضر', description: '• قيادة مشاريع بقيمة تتجاوز 10 مليون دولار.\n• التنسيق مع جميع أطراف المصلحة لضمان نجاح التسليم.\n• تطبيق منهجيات Agile و Waterfall بكفاءة.' }],
      education: [{ id: '2', institution: 'جامعة الأمير سلطان', degree: 'ماجستير إدارة مشاريع', startDate: '2015', endDate: '2017', description: 'حاصل على شهادة PMP.' }],
      skills: [{ id: 's1', name: 'Risk Management', level: 5 }, { id: 's2', name: 'Stakeholder Mgmt', level: 5 }, { id: 's3', name: 'Agile/Scrum', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'احترافي' }]
    },
    en: {
      personalInfo: {
        fullName: 'Saad Al-Mutairi',
        jobTitle: 'PMP Certified Project Manager',
        email: 'saad.pm@example.com',
        phone: '+1 555 333 4444',
        location: 'NEOM, KSA',
        summary: 'Professional project manager with extensive experience leading tech and construction projects. Expert in risk management and quality assurance.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Riyadh Dev Authority', position: 'Senior PM', startDate: '2018', endDate: 'Present', description: '• Leading projects worth $10M+.\n• Coordinating stakeholders for successful delivery.\n• Implementing Agile & Waterfall methodologies.' }],
      education: [{ id: '2', institution: 'Prince Sultan Univ', degree: 'M.S. in Project Management', startDate: '2015', endDate: '2017', description: 'PMP Certified.' }],
      skills: [{ id: 's1', name: 'Risk Management', level: 5 }, { id: 's2', name: 'Stakeholder Mgmt', level: 5 }, { id: 's3', name: 'Agile/Scrum', level: 4 }],
      languages: [{ name: 'English', level: 'Professional' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  teaching: {
    ar: {
      personalInfo: {
        fullName: 'أ. فوزي بن محمد الغامدي',
        jobTitle: 'معلم أول لغة عربية',
        email: 'fawzi.edu@example.com',
        phone: '+966 56 111 2222',
        location: 'المدينة المنورة، السعودية',
        summary: 'معلم تربوي خبير في أساليب التدريس الحديثة وتحفيز الطلاب. متخصص في تبسيط اللغة العربية وتطوير مهارات القراءة والكتابة والبحث العلمي.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'مدارس المنارات الأهلية', position: 'مشرف قسم اللغة العربية', startDate: '2016', endDate: 'الحاضر', description: '• تطوير المناهج الدراسية وطرق التقييم.\n• تنظيم المسابقات الأدبية على مستوى المنطقة.\n• تدريب المعلمين الجدد على استراتيجيات التعليم النشط.' }],
      education: [{ id: '2', institution: 'جامعة طيبة', degree: 'بكالوريوس لغة عربية وتربية', startDate: '2010', endDate: '2014', description: 'دبلوم عالي في الإدارة المدرسية.' }],
      skills: [{ id: 's1', name: 'Classroom Management', level: 5 }, { id: 's2', name: 'Educational Tech', level: 4 }, { id: 's3', name: 'Curriculum Dev', level: 5 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'جيد' }]
    },
    en: {
      personalInfo: {
        fullName: 'Fawzi Al-Ghamdi',
        jobTitle: 'Senior Arabic Language Teacher',
        email: 'fawzi.edu@example.com',
        phone: '+1 555 111 2222',
        location: 'Madinah, KSA',
        summary: 'Expert educational teacher in modern teaching methods and student motivation. Specialized in simplifying Arabic and developing reading/writing skills.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Al-Manarat Schools', position: 'Arabic Dept Head', startDate: '2016', endDate: 'Present', description: '• Developing curricula and assessment methods.\n• Organizing regional literary competitions.\n• Training new teachers in active learning strategies.' }],
      education: [{ id: '2', institution: 'Taibah University', degree: 'B.A. in Education', startDate: '2010', endDate: '2014', description: 'School Mgmt diploma.' }],
      skills: [{ id: 's1', name: 'Classroom Management', level: 5 }, { id: 's2', name: 'Educational Tech', level: 4 }, { id: 's3', name: 'Curriculum Dev', level: 5 }],
      languages: [{ name: 'Arabic', level: 'Native' }, { name: 'English', level: 'Fluent' }]
    }
  },
  data: {
    ar: {
      personalInfo: {
        fullName: 'فيصل عبد الرحمن السعد',
        jobTitle: 'محلل بيانات أول (Senior Data Analyst)',
        email: 'faisal.data@example.com',
        phone: '+966 55 222 9999',
        location: 'الرياض، السعودية',
        summary: 'محلل بيانات خبير في تحويل البيانات المعقدة إلى رؤى استراتيجية تدعم اتخاذ القرار. محترف في استخدام لغات البرمجة وأدوات التصور البياني المتقدمة.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'شركة نوليدج للتحليلات', position: 'كبير محللي البيانات', startDate: '2020', endDate: 'الحاضر', description: '• بناء نماذج تنبؤية لزيادة كفاءة العمليات.\n• تصميم لوحات تحكم (Dashboards) تفاعلية للإدارة العليا.\n• تنظيف ومعالجة قواعد بيانات ضخمة (Big Data).' }],
      education: [{ id: '2', institution: 'جامعة الملك سعود', degree: 'بكالوريوس إحصاء وبحوث عمليات', startDate: '2015', endDate: '2019', description: 'تخصص علوم البيانات.' }],
      skills: [{ id: 's1', name: 'Python & SQL', level: 5 }, { id: 's2', name: 'Power BI / Tableau', level: 5 }, { id: 's3', name: 'Machine Learning', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'ممتاز' }]
    },
    en: {
      personalInfo: {
        fullName: 'Faisal Al-Saad',
        jobTitle: 'Senior Data Analyst',
        email: 'faisal.data@example.com',
        phone: '+1 555 222 9999',
        location: 'Riyadh, KSA',
        summary: 'Expert data analyst in turning complex data into strategic insights that drive decision-making. Proficient in programming and advanced visualization.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Knowledge Analytics', position: 'Lead Data Analyst', startDate: '2020', endDate: 'Present', description: '• Building predictive models for operational efficiency.\n• Designing interactive dashboards for senior mgmt.\n• Cleaning and processing Big Data sets.' }],
      education: [{ id: '2', institution: 'KSU', degree: 'B.S. in Statistics', startDate: '2015', endDate: '2019', description: 'Data Science focus.' }],
      skills: [{ id: 's1', name: 'Python & SQL', level: 5 }, { id: 's2', name: 'Power BI / Tableau', level: 5 }, { id: 's3', name: 'Machine Learning', level: 4 }],
      languages: [{ name: 'English', level: 'Professional' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  content: {
    ar: {
      personalInfo: {
        fullName: 'نورة بنت حمد العلي',
        jobTitle: 'صانعة محتوى ومسؤولة تواصل',
        email: 'noura.content@example.com',
        phone: '+966 50 111 0000',
        location: 'دبي، الإمارات',
        summary: 'كاتبة محتوى إبداعي متخصصة في بناء السرد القصصي للعلامات التجارية. خبيرة في استراتيجيات المحتوى الرقمي وإدارة منصات التواصل الاجتماعي لزيادة التفاعل.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'ستوديو الإلهام الإعلاني', position: 'كبير كتاب المحتوى', startDate: '2019', endDate: 'الحاضر', description: '• صياغة حملات إعلانية حققت انتشاراً واسعاً (Viral).\n• إدارة فريق إنتاج الفيديو والمحتوى المرئي.\n• زيادة عدد الزيارات للمدونة بنسبة 150%.' }],
      education: [{ id: '2', institution: 'الجامعة الأمريكية في الشارقة', degree: 'بكالوريوس إعلام', startDate: '2014', endDate: '2018', description: 'تخصص صحافة رقمية.' }],
      skills: [{ id: 's1', name: 'Copywriting', level: 5 }, { id: 's2', name: 'SEO Content', level: 5 }, { id: 's3', name: 'Video Scripting', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'ممتاز' }]
    },
    en: {
      personalInfo: {
        fullName: 'Noura Al-Ali',
        jobTitle: 'Content Creator & Communications Lead',
        email: 'noura.content@example.com',
        phone: '+1 555 111 0000',
        location: 'Dubai, UAE',
        summary: 'Creative content writer specializing in brand storytelling. Expert in digital content strategies and social media management for engagement.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Inspiration Ad Studio', position: 'Senior Copywriter', startDate: '2019', endDate: 'Present', description: '• Crafting viral advertising campaigns.\n• Leading video and visual content production.\n• Increasing blog traffic by 150%.' }],
      education: [{ id: '2', institution: 'AUS', degree: 'B.A. in Media', startDate: '2014', endDate: '2018', description: 'Digital journalism focus.' }],
      skills: [{ id: 's1', name: 'Copywriting', level: 5 }, { id: 's2', name: 'SEO Content', level: 5 }, { id: 's3', name: 'Video Scripting', level: 4 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  },
  lawyer: {
    ar: {
      personalInfo: {
        fullName: 'أ. جاسم بن منصور التميمي',
        jobTitle: 'محامٍ ومستشار قانوني',
        email: 'jassim.legal@example.com',
        phone: '+966 55 555 4444',
        location: 'الرياض، السعودية',
        summary: 'محامٍ متخصص في القوانين التجارية والشركات. خبير في صياغة العقود، حل النزاعات القانونية، وتقديم الاستشارات القانونية الوقائية للمنشآت.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'مكتب التميمي للمحاماة', position: 'شريك قانوني', startDate: '2015', endDate: 'الحاضر', description: '• تمثيل كبرى الشركات في القضايا التجارية.\n• صياغة ومراجعة اتفاقيات الاستثمار والاندماج.\n• تقديم حلول قانونية مبتكرة لتقليل المخاطر.' }],
      education: [{ id: '2', institution: 'جامعة الملك سعود', degree: 'بكالوريوس أنظمة (قانون)', startDate: '2008', endDate: '2012', description: 'ماجستير قانون تجاري.' }],
      skills: [{ id: 's1', name: 'Legal Drafting', level: 5 }, { id: 's2', name: 'Litigation', level: 5 }, { id: 's3', name: 'Corporate Law', level: 5 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'احترافي' }]
    },
    en: {
      personalInfo: {
        fullName: 'Jassim Al-Tamimi',
        jobTitle: 'Attorney & Legal Consultant',
        email: 'jassim.legal@example.com',
        phone: '+1 555 555 4444',
        location: 'Riyadh, KSA',
        summary: 'Attorney specialized in commercial and corporate law. Expert in contract drafting, dispute resolution, and providing preventive legal advice.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Al-Tamimi Law Firm', position: 'Legal Partner', startDate: '2015', endDate: 'Present', description: '• Representing major firms in commercial litigation.\n• Drafting M&A and investment agreements.\n• Providing innovative legal risk mitigation.' }],
      education: [{ id: '2', institution: 'KSU', degree: 'Bachelor of Laws (LLB)', startDate: '2008', endDate: '2012', description: 'Master of Commercial Law.' }],
      skills: [{ id: 's1', name: 'Legal Drafting', level: 5 }, { id: 's2', name: 'Litigation', level: 5 }, { id: 's3', name: 'Corporate Law', level: 5 }],
      languages: [{ name: 'English', level: 'Professional' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  customer: {
    ar: {
      personalInfo: {
        fullName: 'أحمد بن فهد الدوسري',
        jobTitle: 'مشرف خدمة عملاء (Customer Success)',
        email: 'ahmed.success@example.com',
        phone: '+966 54 111 3333',
        location: 'الدمام، السعودية',
        summary: 'محترف في خدمة العملاء ذو خبرة في إدارة تجربة العميل وحل المشكلات المعقدة. متميز في مهارات التواصل وبناء الثقة مع العملاء لضمان الولاء.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'شركة الاتصالات السعودية', position: 'مشرف فريق الدعم', startDate: '2018', endDate: 'الحاضر', description: '• تحسين معدل رضا العملاء (CSAT) بنسبة 35%.\n• إدارة الشكاوى المعقدة وتصعيدها بفعالية.\n• تدريب الموظفين الجدد على مهارات التعامل الراقي.' }],
      education: [{ id: '2', institution: 'جامعة الإمام عبد الرحمن', degree: 'بكالوريوس إدارة أعمال', startDate: '2013', endDate: '2017', description: 'تخصص تسويق.' }],
      skills: [{ id: 's1', name: 'Conflict Resolution', level: 5 }, { id: 's2', name: 'CRM Tools', level: 5 }, { id: 's3', name: 'Public Relations', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'جيد جداً' }]
    },
    en: {
      personalInfo: {
        fullName: 'Ahmed Al-Dossary',
        jobTitle: 'Customer Success Supervisor',
        email: 'ahmed.success@example.com',
        phone: '+1 555 111 3333',
        location: 'Dammam, KSA',
        summary: 'Customer service professional with experience in managing customer experience and resolving complex issues. Expert communicator.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'STC', position: 'Support Team Lead', startDate: '2018', endDate: 'Present', description: '• Improved CSAT scores by 35%.\n• Managing complex complaints and escalations.\n• Training staff on communication excellence.' }],
      education: [{ id: '2', institution: 'IAU', degree: 'B.S. in Business Administration', startDate: '2013', endDate: '2017', description: 'Marketing focus.' }],
      skills: [{ id: 's1', name: 'Conflict Resolution', level: 5 }, { id: 's2', name: 'CRM Tools', level: 5 }, { id: 's3', name: 'Public Relations', level: 4 }],
      languages: [{ name: 'English', level: 'Fluent' }, { name: 'Arabic', level: 'Native' }]
    }
  },
  architect: {
    ar: {
      personalInfo: {
        fullName: 'م. لمياء بنت فيصل العتيبي',
        jobTitle: 'مهندسة معمارية (Architect)',
        email: 'lamia.arch@example.com',
        phone: '+966 53 444 6666',
        location: 'الرياض، السعودية',
        summary: 'مهندسة معمارية مبدعة متخصصة في التصميم المستدام والعصري. تمتلك مهارات عالية في تحويل الرؤى إلى مساحات عمرانية فخمة وعملية.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'مكتب الإبداع المعماري', position: 'كبير المهندسين المعماريين', startDate: '2017', endDate: 'الحاضر', description: '• تصميم أبراج سكنية وفنادق فئة 5 نجوم.\n• الإشراف على مراحل التنفيذ لضمان مطابقة التصميم.\n• ابتكار حلول معمارية موفرة للطاقة.' }],
      education: [{ id: '2', institution: 'جامعة الملك سعود', degree: 'بكالوريوس هندسة معمارية', startDate: '2011', endDate: '2016', description: 'عضوية الهيئة السعودية للمهندسين.' }],
      skills: [{ id: 's1', name: 'Revit & Rhino', level: 5 }, { id: 's2', name: '3D Visualization', level: 5 }, { id: 's3', name: 'Sustainable Design', level: 4 }],
      languages: [{ name: 'العربية', level: 'اللغة الأم' }, { name: 'الإنجليزية', level: 'ممتاز' }]
    },
    en: {
      personalInfo: {
        fullName: 'Eng. Lamia Al-Otaibi',
        jobTitle: 'Professional Architect',
        email: 'lamia.arch@example.com',
        phone: '+1 555 444 6666',
        location: 'Riyadh, KSA',
        summary: 'Creative architect specializing in sustainable and modern design. Skilled in transforming visions into luxury functional spaces.',
        image: FLAT_AVATAR
      },
      experience: [{ id: '1', company: 'Creative Arch Studio', position: 'Senior Architect', startDate: '2017', endDate: 'Present', description: '• Designing residential towers and 5-star hotels.\n• Supervising implementation for design compliance.\n• Innovating energy-efficient architectural solutions.' }],
      education: [{ id: '2', institution: 'KSU', degree: 'B.S. in Architecture', startDate: '2011', endDate: '2016', description: 'SCE Member.' }],
      skills: [{ id: 's1', name: 'Revit & Rhino', level: 5 }, { id: 's2', name: '3D Visualization', level: 5 }, { id: 's3', name: 'Sustainable Design', level: 4 }],
      languages: [{ name: 'English', level: 'Native' }, { name: 'Arabic', level: 'Fluent' }]
    }
  }
};

export const SAMPLE_DATA_AR: CVData = SPECIALTIES_DATA.software.ar;
export const SAMPLE_DATA_EN: CVData = SPECIALTIES_DATA.software.en;
