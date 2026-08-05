export type ScopeBuilderData = {
  platform: string;
  workstreams: string[];
  readinessScore: number;
};

export const SCOPE_BUILDER_STORAGE_KEY = 'scopeBuilderData';

export function readScopeBuilderData(): ScopeBuilderData | null {
  try {
    const raw = localStorage.getItem(SCOPE_BUILDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ScopeBuilderData>;
    if (!parsed?.platform || !Array.isArray(parsed.workstreams) || typeof parsed.readinessScore !== 'number') {
      return null;
    }
    return {
      platform: parsed.platform,
      workstreams: parsed.workstreams.filter((w): w is string => typeof w === 'string'),
      readinessScore: parsed.readinessScore,
    };
  } catch {
    return null;
  }
}

export function clearScopeBuilderData() {
  try {
    localStorage.removeItem(SCOPE_BUILDER_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function appendScopeToBrief(details: string, scope: ScopeBuilderData | null | undefined) {
  if (!scope) return details;
  const lines = [
    '',
    '--- Scope Builder ---',
    `Platform: ${scope.platform}`,
    `Workstreams: ${scope.workstreams.length ? scope.workstreams.join('; ') : 'None selected'}`,
    `Readiness score: ${scope.readinessScore}/100`,
  ];
  return `${details.trim()}${lines.join('\n')}`;
}
