export type DocumentType = 'personal-statement' | 'scholarship' | 'erasmus';
export type Language = 'english' | 'arabic' | 'italian' | 'french' | 'spanish' | 'german';

export interface DraftFormData {
  name: string;
  documentType: DocumentType;
  language: Language;
  fieldOfStudy: string;
  university: string;
  background: string;
  achievement: string;
  motivation: string;
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  english: 'English',
  arabic: 'Arabic',
  italian: 'Italian',
  french: 'French',
  spanish: 'Spanish',
  german: 'German',
};

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  'personal-statement': 'Personal Statement',
  'scholarship': 'Scholarship Application',
  'erasmus': 'Erasmus Motivation Letter',
};

export const TIPS: Record<DocumentType, { title: string; text: string }[]> = {
  'personal-statement': [
    { title: 'Be specific', text: 'Replace generic claims with concrete examples. "I\'m passionate about science" is weaker than describing the experiment that changed your perspective.' },
    { title: 'Show growth', text: 'Admissions committees want to see how you\'ve evolved. Connect past experiences to your future academic goals.' },
    { title: 'Keep your voice', text: 'This draft is a starting point. Rewrite sections in your own words so the statement sounds authentically you.' },
  ],
  'scholarship': [
    { title: 'Align with their mission', text: 'Research the scholarship provider\'s values and mirror them in your application. Show you\'re not just qualified — you\'re the right fit.' },
    { title: 'Quantify impact', text: 'Use numbers where possible: hours volunteered, people helped, grades improved. Concrete data stands out in a stack of essays.' },
    { title: 'Address the "why you"', text: 'Explain what makes your situation unique. Financial need, first-generation status, or unusual life experiences add compelling context.' },
  ],
  'erasmus': [
    { title: 'Research the destination', text: 'Mention specific courses, professors, or cultural aspects of the host university. Generic enthusiasm won\'t impress the selection committee.' },
    { title: 'Link to your degree', text: 'Explain how this exchange complements your home university studies. Show a clear academic rationale, not just wanderlust.' },
    { title: 'Mention language skills', text: 'Even basic language knowledge shows commitment. If you\'re learning the local language, mention it — it demonstrates preparation.' },
  ],
};
