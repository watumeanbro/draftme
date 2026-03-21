import { Language } from './draft-types';

export type TranslationStrings = {
  appName: string;
  appTagline: string;
  generateHint: string;
  labelName: string;
  placeholderName: string;
  labelDocType: string;
  labelFieldOfStudy: string;
  placeholderFieldOfStudy: string;
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
  downloadPdf: string;
  downloadImage: string;
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
    labelFieldOfStudy: 'Field of study',
    placeholderFieldOfStudy: 'e.g. Medicine, Computer Science, Engineering',
    labelUniversity: 'University or institution name',
    placeholderUniversity: 'e.g. Harvard, Politecnico di Milano, UWC',
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
    downloadPdf: 'Download PDF',
    downloadImage: 'Download Image',
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
    labelFieldOfStudy: 'مجال الدراسة',
    placeholderFieldOfStudy: 'مثال: الطب، علوم الحاسوب، الهندسة',
    labelUniversity: 'اسم الجامعة أو المؤسسة',
    placeholderUniversity: 'مثال: هارفارد، بوليتكنيكو دي ميلانو',
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
    downloadPdf: 'تحميل PDF',
    downloadImage: 'تحميل صورة',
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
    appTagline: 'Parlaci di te, scegli il tipo di documento e ottieni una bozza completa in pochi secondi. Nessuna pagina vuota, nessuno stress.',
    generateHint: 'La tua bozza sarà di circa 350 parole — un ottimo punto di partenza da personalizzare.',
    labelName: 'Il tuo nome',
    placeholderName: 'es. Maria Gonzalez',
    labelDocType: 'Tipo di documento',
    labelFieldOfStudy: 'Campo di studio',
    placeholderFieldOfStudy: 'es. Medicina, Informatica, Ingegneria',
    labelUniversity: "Nome dell'università o istituzione",
    placeholderUniversity: 'es. Harvard, Politecnico di Milano, UWC',
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
    downloadPdf: 'Scarica PDF',
    downloadImage: 'Scarica Immagine',
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
    appTagline: 'Parlez-nous de vous, choisissez votre type de document et obtenez un brouillon complet en quelques secondes. Pas de page blanche, pas de stress.',
    generateHint: 'Votre brouillon fera environ 350 mots — un excellent point de départ à personnaliser.',
    labelName: 'Votre nom',
    placeholderName: 'ex. Maria Gonzalez',
    labelDocType: 'Type de document',
    labelFieldOfStudy: "Domaine d'études",
    placeholderFieldOfStudy: 'ex. Médecine, Informatique, Ingénierie',
    labelUniversity: "Nom de l'université ou institution",
    placeholderUniversity: 'ex. Harvard, Politecnico di Milano, UWC',
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
    downloadPdf: 'Télécharger PDF',
    downloadImage: 'Télécharger Image',
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
  spanish: {
    appName: 'DraftMe',
    appTagline: 'Cuéntanos sobre ti, elige el tipo de documento y obtén un borrador completo en segundos. Sin página en blanco, sin estrés.',
    generateHint: 'Tu borrador tendrá unas 350 palabras — un sólido punto de partida para hacerlo tuyo.',
    labelName: 'Tu nombre',
    placeholderName: 'ej. María González',
    labelDocType: 'Tipo de documento',
    labelFieldOfStudy: 'Campo de estudio',
    placeholderFieldOfStudy: 'ej. Medicina, Informática, Ingeniería',
    labelUniversity: 'Nombre de la universidad o institución',
    placeholderUniversity: 'ej. Harvard, Politecnico di Milano, UWC',
    labelBackground: 'Tu trayectoria en 2–3 frases',
    placeholderBackground: 'ej. Soy estudiante de último año de Ingeniería Eléctrica en la Universidad de Lisboa...',
    labelAchievement: 'Tu mayor logro',
    placeholderAchievement: 'ej. Lideré un equipo que ganó el concurso nacional de robótica...',
    labelMotivation: 'Por qué quieres esta oportunidad',
    placeholderMotivation: 'ej. El enfoque de este programa en sistemas autónomos se alinea perfectamente con mis intereses de investigación...',
    generateButton: 'Generar Borrador',
    generatingButton: 'Escribiendo tu borrador...',
    footer: 'DraftMe genera un punto de partida — personaliza siempre antes de enviar.',
    backToForm: 'Volver al formulario',
    copy: 'Copiar',
    copied: 'Copiado',
    downloadPdf: 'Descargar PDF',
    downloadImage: 'Descargar imagen',
    tipsHeading: 'Consejos para reforzar tu candidatura',
    docTypePersonalStatement: 'Declaración Personal',
    docTypeScholarship: 'Solicitud de Beca',
    docTypeErasmus: 'Carta de Motivación Erasmus',
    tips: {
      'personal-statement': [
        { title: 'Sé específico', text: 'Reemplaza afirmaciones genéricas con ejemplos concretos. "Me apasiona la ciencia" es más débil que describir el experimento que cambió tu perspectiva.' },
        { title: 'Muestra tu crecimiento', text: 'Los comités de admisión quieren ver cómo has evolucionado. Conecta tus experiencias pasadas con tus metas académicas futuras.' },
        { title: 'Mantén tu voz', text: 'Este borrador es un punto de partida. Reescribe las secciones con tus propias palabras para que suene auténticamente tuyo.' },
      ],
      scholarship: [
        { title: 'Alinéate con su misión', text: 'Investiga los valores del proveedor de la beca y refléjalos en tu solicitud. Demuestra que no solo eres competente, sino el candidato ideal.' },
        { title: 'Cuantifica el impacto', text: 'Usa cifras siempre que sea posible: horas de voluntariado, personas ayudadas, notas mejoradas.' },
        { title: 'Responde al "¿por qué tú?"', text: 'Explica qué hace única tu situación. La necesidad económica, ser primera generación o experiencias de vida inusuales aportan contexto valioso.' },
      ],
      erasmus: [
        { title: 'Investiga el destino', text: 'Menciona cursos, profesores o aspectos culturales específicos de la universidad de acogida. El entusiasmo genérico no impresionará al comité.' },
        { title: 'Vincúlalo a tu carrera', text: 'Explica cómo este intercambio complementa tus estudios en la universidad de origen. Muestra una justificación académica clara.' },
        { title: 'Menciona tus habilidades lingüísticas', text: 'Incluso un conocimiento básico del idioma demuestra compromiso. Si estás aprendiendo la lengua local, menciónalo.' },
      ],
    },
  },
  german: {
    appName: 'DraftMe',
    appTagline: 'Erzähl uns von dir, wähle deinen Dokumenttyp und erhalte in Sekunden einen vollständigen Entwurf. Kein leeres Blatt, kein Stress.',
    generateHint: 'Dein Entwurf wird etwa 350 Wörter umfassen — ein starker Ausgangspunkt, den du nach deinen Wünschen gestalten kannst.',
    labelName: 'Dein Name',
    placeholderName: 'z. B. Maria Gonzalez',
    labelDocType: 'Dokumenttyp',
    labelFieldOfStudy: 'Studienrichtung',
    placeholderFieldOfStudy: 'z. B. Medizin, Informatik, Ingenieurwesen',
    labelUniversity: 'Name der Universität oder Institution',
    placeholderUniversity: 'z. B. Harvard, Politecnico di Milano, UWC',
    labelBackground: 'Dein Werdegang in 2–3 Sätzen',
    placeholderBackground: 'z. B. Ich bin Masterstudent im letzten Jahr der Elektrotechnik an der Universität Lissabon...',
    labelAchievement: 'Deine größte Leistung',
    placeholderAchievement: 'z. B. Ich leitete ein Team, das den nationalen Robotikwettbewerb gewann...',
    labelMotivation: 'Warum du diese Chance möchtest',
    placeholderMotivation: 'z. B. Der Fokus dieses Programms auf autonome Systeme deckt sich perfekt mit meinen Forschungsinteressen...',
    generateButton: 'Entwurf erstellen',
    generatingButton: 'Dein Entwurf wird geschrieben...',
    footer: 'DraftMe erstellt einen Ausgangspunkt — personalisiere ihn immer, bevor du ihn einreichst.',
    backToForm: 'Zurück zum Formular',
    copy: 'Kopieren',
    copied: 'Kopiert',
    downloadPdf: 'PDF herunterladen',
    downloadImage: 'Bild herunterladen',
    tipsHeading: 'Tipps zur Stärkung deiner Bewerbung',
    docTypePersonalStatement: 'Persönliche Erklärung',
    docTypeScholarship: 'Stipendienbewerbung',
    docTypeErasmus: 'Erasmus-Motivationsschreiben',
    tips: {
      'personal-statement': [
        { title: 'Sei konkret', text: 'Ersetze allgemeine Aussagen durch konkrete Beispiele. „Ich bin leidenschaftlich an Wissenschaft interessiert" ist schwächer als die Beschreibung des Experiments, das deine Perspektive verändert hat.' },
        { title: 'Zeige Entwicklung', text: 'Zulassungsausschüsse möchten sehen, wie du dich weiterentwickelt hast. Verbinde vergangene Erfahrungen mit deinen zukünftigen akademischen Zielen.' },
        { title: 'Behalte deinen Stil', text: 'Dieser Entwurf ist ein Ausgangspunkt. Schreibe Abschnitte in deinen eigenen Worten, damit die Erklärung authentisch klingt.' },
      ],
      scholarship: [
        { title: 'Richte dich an ihrer Mission aus', text: 'Recherchiere die Werte des Stipendiengebers und spiegele sie in deiner Bewerbung wider. Zeige, dass du nicht nur qualifiziert bist, sondern ideal passt.' },
        { title: 'Quantifiziere deinen Einfluss', text: 'Nutze Zahlen, wo immer möglich: Ehrenamtsstunden, unterstützte Personen, verbesserte Noten.' },
        { title: 'Beantworte das „Warum du?"', text: 'Erkläre, was deine Situation einzigartig macht. Finanzielle Bedürftigkeit, Bildungsaufsteiger oder ungewöhnliche Lebenserfahrungen liefern überzeugende Kontexte.' },
      ],
      erasmus: [
        { title: 'Recherchiere das Zielland', text: 'Erwähne konkrete Kurse, Professoren oder kulturelle Aspekte der Gastuniversität. Allgemeine Begeisterung überzeugt den Auswahlausschuss nicht.' },
        { title: 'Verbinde es mit deinem Studium', text: 'Erkläre, wie dieser Austausch dein Heimstudium ergänzt. Zeige eine klare akademische Begründung, nicht nur Reiselust.' },
        { title: 'Erwähne deine Sprachkenntnisse', text: 'Selbst grundlegende Sprachkenntnisse zeigen Engagement. Wenn du die Landessprache lernst, erwähne es — das beweist Vorbereitung.' },
      ],
    },
  },
};
