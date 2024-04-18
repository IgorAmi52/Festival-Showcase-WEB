import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch',
})
export class HighlightSearchPipe implements PipeTransform {
  transform(text: string, searchText: string): string {
    if (!text || !searchText) {
      return text; // Handle empty text or search term gracefully
    }

    const regex = new RegExp(`${searchText}`, 'i'); // Case-insensitive match (optional)
    const match = text.search(regex); // Find the first occurrence only

    if (match !== -1) {
      // Check if there's a match
      const highlightedText =
        text.slice(0, match) + // Text before the match
        `<mark class='highlight'>${text.slice(
          match,
          match + searchText.length
        )}</mark>` + // Highlighted text
        text.slice(match + searchText.length); // Text after the match
      return highlightedText;
    }

    return text; // No match found, return original text
  }
}
