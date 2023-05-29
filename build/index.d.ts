declare module "index" {
    export type OpenDictionaryLanguages = 'en' | 'fa';
    export interface Definition {
        definition: string;
        pos?: 'noun' | 'verv' | 'adjective';
    }
    export class OpenDictionaryClient {
        protected readonly dictionary: 'english-dictionary';
        protected readonly ref: string;
        protected readonly host: string;
        constructor(dictionary?: 'english-dictionary', ref?: string, host?: string);
        protected get baseURL(): string;
        getDefinitionsFileURL(word: string, language: OpenDictionaryLanguages): string;
        getDefinitions(word: string, language: OpenDictionaryLanguages): Promise<Definition[]>;
    }
}
