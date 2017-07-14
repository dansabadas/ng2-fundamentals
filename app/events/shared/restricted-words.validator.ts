import { FormControl } from '@angular/forms';

export function restrictedWords(words) {
    return (control: FormControl): {[key: string]: any} => {
      if (!words) {
        return null;   // null => validator passes
      }

      const invalidWords = words
        .map((w) => control.value.includes(w) ? w : null)
        .filter((w) => w != null);

      // usually the name of the key 'restrictedWords' matches the name of the function validator restrictedWords
      return invalidWords && invalidWords.length > 0
        ? {restrictedWords: invalidWords.join(', ')}  
        : null;
    };
  }
