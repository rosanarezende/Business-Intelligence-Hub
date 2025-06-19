// Tipos compartilhados entre frontend e backend

export interface DiscoveryConfig {
  experimentName: string;
  responsible: string;
  wave: string;
  prototypeUrl: string;
  repositories: Repository[];
  googleDocs: GoogleDoc[];
  figmaFiles: FigmaFile[];
  questions: string[];
  aiModel?: 'gpt-4' | 'gemini';
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  clone_url: string;
  default_branch: string;
  paths: string[];
  language?: string;
}

export interface GoogleDoc {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  content?: string;
}

export interface FigmaFile {
  key: string;
  name: string;
  thumbnail_url?: string;
  last_modified: string;
  components: string[];
  flows: string[];
}

export interface DiscoveryResult {
  id: string;
  config: DiscoveryConfig;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'completed' | 'exported';
}

export interface CodeFile {
  path: string;
  content: string;
  language: string;
  size: number;
}

export interface ContextData {
  code: CodeFile[];
  docs: GoogleDoc[];
  designs: FigmaFile[];
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthTokens {
  github?: string;
  google?: string;
  jira?: string;
  figma?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tokens: AuthTokens;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: string[];
  createdBy: string;
  createdAt: Date;
}

export interface SearchFilters {
  team?: string;
  wave?: string;
  responsible?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

