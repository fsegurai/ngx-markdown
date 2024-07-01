import { MermaidAPI } from 'ngx-markdown';
import { Theme } from './app.models';

export const DEFAULT_THEME = Theme.Light;
export const LOCAL_STORAGE_THEME_KEY = 'ngx-markdown:theme';
export const MERMAID_THEME = MermaidAPI.Theme.Dark;
