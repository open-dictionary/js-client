import * as YAML from 'js-yaml';
export type OpenDictionaryLanguages = 'en' | 'fa';

export interface Definition {
  definition: string;
  pos?: 'noun' | 'verv' | 'adjective';
}

const GITHUB_USER = 'open-dictionary';
const PATH_SPLIT_SIZE = 2;

export class OpenDictionaryClient {
  constructor(
    protected readonly dictionary: 'english-dictionary' = 'english-dictionary',
    protected readonly ref = 'master',
    protected readonly host = 'https://raw.githubusercontent.com',
  ) {}

  protected get baseURL() {
    return `${this.host}/${GITHUB_USER}/${this.dictionary}/${this.ref}`;
  }

  public getDefinitionsFileURL(word: string, language: OpenDictionaryLanguages) {
    return `${this.baseURL}/${word
      .split('')
      .slice(0, PATH_SPLIT_SIZE)
      .join('/')}/${word}/definitions.${language}.yaml`;
  }

  public async getDefinitions(word: string, language: OpenDictionaryLanguages) {
    const url = this.getDefinitionsFileURL(word, language);
    const res = await fetch(url);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || error);
    } else {
      const yamlContent = await res.text();
      return YAML.load(yamlContent) as Definition[];
    }
  }
}
