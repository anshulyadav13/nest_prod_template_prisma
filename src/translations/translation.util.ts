import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import it from './it.json';

const translations: Record<string, Record<string, string>> = {
  en,
  es,
  fr,
  de,
  it,
};

export function getTranslation(key: string, lang: string): string {
  const dict = translations[lang] || translations['en'];
  return dict[key] || key;
} 