import { Language } from './draft-types';

export type TranslationStrings = {
  appName: string;
  appTagline: string;
  generateHint: string;
  labelName: string;
  placeholderName: string;
  labelDocType: string;
  labelUniversity: string;
  placeholderUniversity: string;
  labelBackground: string;
  placeholderBackground: string;
  labelAchievement: string;
  placeholderAchievement: string;
  labelMotivation: string;
  placeholderMotivation: string;
  generateButton: string;
  generatingButton: string;
  footer: string;
  backToForm: string;
  copy: string;
  copied: string;
  tipsHeading: string;
  docTypePersonalStatement: string;
  docTypeScholarship: string;
  docTypeErasmus: string;
  tips: {
    'personal-statement': { title: string; text: string }[];
    scholarship: { title: string; text: string }[];
    erasmus: { title: string; text: string }[];
  };
};

export const translations: Record<Language, TranslationStrings> = {
  english: {
    appName: 'DraftMe',
    appTagline: 'Tell us about yourself, pick your document type, and get a full draft in seconds. No blank page, no stress.',
    generateHint: 'Your draft will be around 350 words — a strong starting point to make your own.',
    labelName: 'Your name',
    placeholderName: 'e.g. Maria Gonzalez',
    labelDocType: 'Document type',
    labelUniversity: 'University or program',
    placeholderUniversity: 'e.g. MSc Computer Science at TU Munich',
    labelBackground: 'Your background in 2–3 sentences',
    placeholderBackground: "e.g. I'm a final-year student in Electrical Engineering at the University of Lisbon...",
    labelAchievement: 'Your biggest achievement',
    placeholderAchievement: 'e.g. I led a team that won the national robotics competition...',
    labelMotivation: 'Why you want this opportunity',
    placeholderMotivation: "e.g. This program's focus on autonomous systems aligns perfectly with my research interests...",
    generateButton: 'Generate Draft',
    generatingButton: 'Writing your draft...',
    footer: 'DraftMe generates a starting point — always personalize before submitting.',
    backToForm: 'Back to form',
    copy: 'Copy',
    copied: 'Copied',
    tipsHeading: 'Tips to strengthen your application',
    docTypePersonalStatement: 'Personal Statement',
    docTypeScholarship: 'Scholarship Application',
    docTypeErasmus: 'Erasmus Motivation Letter',
    tips: {
      'personal-statement': [
        { title: 'Be specific', text: "Replace generic claims with concrete examples. \"I'm passionate about science\" is weaker than describing the experiment that changed your perspective." },
        { title: 'Show growth', text: "Admissions committees want to see how you've evolved. Connect past experiences to your future academic goals." },
        { title: 'Keep your voice', text: 'This draft is a starting point. Rewrite sections in your own words so the statement sounds authentically you.' },
      ],
      scholarship: [
        { title: 'Align with their mission', text: "Research the scholarship provider's values and mirror them in your application." },
        { title: 'Quantify impact', text: 'Use numbers where possible: hours volunteered, people helped, grades improved.' },
        { title: 'Address the "why you"', text: 'Explain what makes your situation unique. Financial need, first-generation status, or unusual life experiences add compelling context.' },
      ],
      erasmus: [
        { title: 'Research the destination', text: 'Mention specific courses, professors, or cultural aspects of the host university.' },
        { title: 'Link to your degree', text: 'Explain how this exchange complements your home university studies.' },
        { title: 'Mention language skills', text: "Even basic language knowledge shows commitment. If you're learning the local language, mention it." },
      ],
    },
  },
  arabic: {
    appName: 'DraftMe',
    appTagline: 'أخبرنا عن نفسك، اختر نوع المستند، واحصل على مسودة كاملة في ثوانٍ. لا صفحة فارغة، لا توتر.',
    generateHint: 'ستكون مسودتك حوالي ٣٥٠ كلمة — نقطة انطلاق قوية لتجعلها خاصة بك.',
    labelName: 'اسمك',
    placeholderName: 'مثال: ماريا غونزاليز',
    labelDocType: 'نوع المستند',
    labelUniversity: 'الجامعة أو البرنامج',
    placeholderUniversity: 'مثال: ماجستير علوم الحاسوب في جامعة ميونخ التقنية',
    labelBackground: 'خلفيتك في ٢–٣ جمل',
    placeholderBackground: 'مثال: أنا طالب في السنة الأخيرة في الهندسة الكهربائية...',
    labelAchievement: 'أبرز إنجازاتك',
    placeholderAchievement: 'مثال: قدت فريقاً فاز بمسابقة الروبوتات الوطنية...',
    labelMotivation: 'لماذا تريد هذه الفرصة',
    placeholderMotivation: 'مثال: تركيز هذا البرنامج على الأنظمة المستقلة يتوافق تماماً مع اهتماماتي البحثية...',
    generateButton: 'إنشاء المسودة',
    generatingButton: 'جارٍ كتابة مسودتك...',
    footer: 'DraftMe ينشئ نقطة بداية — قم دائماً بتخصيصها قبل التقديم.',
    backToForm: 'العودة إلى النموذج',
    copy: 'نسخ',
    copied: 'تم النسخ',
    tipsHeading: 'نصائح لتقوية طلبك',
    docTypePersonalStatement: 'بيان شخصي',
    docTypeScholarship: 'طلب منحة دراسية',
    docTypeErasmus: 'رسالة دافع إيراسموس',
    tips: {
      'personal-statement': [
        { title: 'كن محدداً', text: 'استبدل الادعاءات العامة بأمثلة ملموسة. "أنا شغوف بالعلوم" أضعف من وصف التجربة التي غيرت منظورك.' },
        { title: 'أظهر التطور', text: 'تريد لجان القبول أن ترى كيف تطورت. اربط تجاربك الماضية بأهدافك الأكاديمية المستقبلية.' },
        { title: 'حافظ على صوتك', text: 'هذه المسودة نقطة بداية. أعد كتابة الأقسام بكلماتك الخاصة.' },
      ],
      scholarship: [
        { title: 'تماشَ مع رسالتهم', text: 'ابحث عن قيم مقدم المنحة وعكسها في طلبك.' },
        { title: 'حدد الأثر بالأرقام', text: 'استخدم الأرقام حيثما أمكن: ساعات التطوع، الأشخاص الذين ساعدتهم.' },
        { title: 'أجب عن "لماذا أنت"', text: 'اشرح ما يجعل وضعك فريداً.' },
      ],
      erasmus: [
        { title: 'ابحث عن الوجهة', text: 'اذكر دورات أو أساتذة أو جوانب ثقافية محددة في الجامعة المضيفة.' },
        { title: 'اربطها بشهادتك', text: 'اشرح كيف يكمل هذا التبادل دراساتك في جامعتك الأصلية.' },
        { title: 'اذكر مهاراتك اللغوية', text: 'حتى المعرفة الأساسية باللغة تُظهر الالتزام.' },
      ],
    },
  },
  italian: {
    appName: 'DraftMe',
    appTagline: 'Genera una prima bozza della tua candidatura in pochi secondi.',
    labelName: 'Il tuo nome',
    placeholderName: 'es. Maria Gonzalez',
    labelDocType: 'Tipo di documento',
    labelUniversity: 'Università o programma',
    placeholderUniversity: 'es. MSc Informatica presso TU Munich',
    labelBackground: 'Il tuo background in 2–3 frasi',
    placeholderBackground: "es. Sono uno studente dell'ultimo anno in Ingegneria Elettrica...",
    labelAchievement: 'Il tuo più grande traguardo',
    placeholderAchievement: 'es. Ho guidato un team che ha vinto la competizione nazionale di robotica...',
    labelMotivation: 'Perché vuoi questa opportunità',
    placeholderMotivation: "es. L'attenzione di questo programma sui sistemi autonomi si allinea perfettamente con i miei interessi di ricerca...",
    generateButton: 'Genera Bozza',
    generatingButton: 'Sto scrivendo la tua bozza...',
    footer: 'DraftMe genera un punto di partenza — personalizza sempre prima di inviare.',
    backToForm: 'Torna al modulo',
    copy: 'Copia',
    copied: 'Copiato',
    tipsHeading: 'Consigli per rafforzare la tua candidatura',
    docTypePersonalStatement: 'Dichiarazione Personale',
    docTypeScholarship: 'Domanda di Borsa di Studio',
    docTypeErasmus: 'Lettera Motivazionale Erasmus',
    tips: {
      'personal-statement': [
        { title: 'Sii specifico', text: 'Sostituisci le affermazioni generiche con esempi concreti.' },
        { title: 'Mostra la crescita', text: 'Le commissioni vogliono vedere come ti sei evoluto. Collega le esperienze passate ai tuoi obiettivi accademici futuri.' },
        { title: 'Mantieni la tua voce', text: 'Questa bozza è un punto di partenza. Riscrivi le sezioni con le tue parole.' },
      ],
      scholarship: [
        { title: 'Allineati alla loro missione', text: "Ricerca i valori del fornitore della borsa e rispecchiali nella tua domanda." },
        { title: "Quantifica l'impatto", text: 'Usa i numeri dove possibile: ore di volontariato, persone aiutate, voti migliorati.' },
        { title: 'Rispondi al "perché tu"', text: 'Spiega cosa rende unica la tua situazione.' },
      ],
      erasmus: [
        { title: 'Ricerca la destinazione', text: "Menziona corsi specifici, professori o aspetti culturali dell'università ospitante." },
        { title: 'Collegalo alla tua laurea', text: 'Spiega come questo scambio complementa i tuoi studi.' },
        { title: 'Menziona le competenze linguistiche', text: 'Anche una conoscenza base della lingua dimostra impegno.' },
      ],
    },
  },
  french: {
    appName: 'DraftMe',
    appTagline: 'Générez un premier brouillon de votre candidature en quelques secondes.',
    labelName: 'Votre nom',
    placeholderName: 'ex. Maria Gonzalez',
    labelDocType: 'Type de document',
    labelUniversity: 'Université ou programme',
    placeholderUniversity: "ex. MSc Informatique à TU Munich",
    labelBackground: 'Votre parcours en 2–3 phrases',
    placeholderBackground: "ex. Je suis étudiant en dernière année en Génie Électrique...",
    labelAchievement: 'Votre plus grande réussite',
    placeholderAchievement: "ex. J'ai dirigé une équipe qui a remporté le concours national de robotique...",
    labelMotivation: 'Pourquoi vous voulez cette opportunité',
    placeholderMotivation: "ex. L'accent de ce programme sur les systèmes autonomes correspond parfaitement à mes intérêts de recherche...",
    generateButton: 'Générer le Brouillon',
    generatingButton: 'Rédaction de votre brouillon...',
    footer: 'DraftMe génère un point de départ — personnalisez toujours avant de soumettre.',
    backToForm: 'Retour au formulaire',
    copy: 'Copier',
    copied: 'Copié',
    tipsHeading: 'Conseils pour renforcer votre candidature',
    docTypePersonalStatement: 'Déclaration Personnelle',
    docTypeScholarship: 'Demande de Bourse',
    docTypeErasmus: 'Lettre de Motivation Erasmus',
    tips: {
      'personal-statement': [
        { title: 'Soyez précis', text: 'Remplacez les affirmations génériques par des exemples concrets.' },
        { title: 'Montrez votre évolution', text: "Les comités d'admission veulent voir comment vous avez évolué." },
        { title: 'Gardez votre voix', text: 'Ce brouillon est un point de départ. Réécrivez les sections avec vos propres mots.' },
      ],
      scholarship: [
        { title: 'Alignez-vous sur leur mission', text: 'Recherchez les valeurs du fournisseur de bourse et reflétez-les dans votre candidature.' },
        { title: "Quantifiez l'impact", text: 'Utilisez des chiffres : heures de bénévolat, personnes aidées, notes améliorées.' },
        { title: 'Répondez au "pourquoi vous"', text: 'Expliquez ce qui rend votre situation unique.' },
      ],
      erasmus: [
        { title: 'Renseignez-vous sur la destination', text: "Mentionnez des cours spécifiques, des professeurs ou des aspects culturels de l'université d'accueil." },
        { title: 'Liez à votre diplôme', text: 'Expliquez comment cet échange complète vos études.' },
        { title: 'Mentionnez vos compétences linguistiques', text: 'Même une connaissance basique de la langue montre votre engagement.' },
      ],
    },
  },
};
