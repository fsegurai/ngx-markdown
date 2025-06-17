import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language',
})
export class LanguagePipe implements PipeTransform {
  /**
   * Transforms a string value by wrapping it in a Markdown code block for a specified language.
   *
   * @param value The string contents to be wrapped in a code block.
   * If null or undefined, it defaults to an empty string.
   * @param language The programming language for the code block (e.g., 'typescript', 'html', 'css').
   * If null or undefined, it defaults to an empty string.
   * @returns A string formatted as a Markdown code block
   * Returns an empty string if the input 'value' is not a string after null check,
   * or if 'language' is not a string after null check.
   */
  transform(value: string | null | undefined, language: string | null | undefined): string {
    const safeValue = value ?? '';
    const safeLanguage = language ?? '';

    if (typeof safeValue !== 'string') {
      console.error(
        `LanguagePipe: 'value' must be a string. Received type: [${typeof value}]. Returning empty string.`,
      );
      return '';
    }

    if (typeof safeLanguage !== 'string') {
      console.error(
        `LanguagePipe: 'language' must be a string. Received type: [${typeof language}]. Returning value without code block.`,
      );
      return safeValue;
    }

    return `\`\`\`${safeLanguage}\n${safeValue}\n\`\`\``;
  }
}