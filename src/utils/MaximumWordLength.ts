export const MaximumWordLength = (word: string, length: number): string => {
    if (word.length <= length) {
        return word;
    } else {
        return word.slice(0, length) + "...";
    }
}