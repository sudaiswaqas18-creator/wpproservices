export type ScopeBuilderData = {
  platform: string;
  workstreams: string[];
  readinessScore: number;
};

export const SCOPE_BUILDER_STORAGE_KEY = 'scopeBuilderData';
export const SCOPE_BUILDER_INTENT_KEY = 'scopeBuilderIntent';

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

/** Only true after "Request a custom scope" in this browser session. */
export function hasScopeBuilderIntent(): boolean {
  try {
    return sessionStorage.getItem(SCOPE_BUILDER_INTENT_KEY) === '1';
  } catch {
    return false;
  }
}

export function markScopeBuilderIntent() {
  try {
    sessionStorage.setItem(SCOPE_BUILDER_INTENT_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function clearScopeBuilderData() {
  try {
    localStorage.removeItem(SCOPE_BUILDER_STORAGE_KEY);
    sessionStorage.removeItem(SCOPE_BUILDER_INTENT_KEY);
  } catch {
    /* ignore */
  }
}

/** Active draft to show on Contact — requires CTA intent this session. */
export function getActiveScopeBuilderData(): ScopeBuilderData | null {
  if (!hasScopeBuilderIntent()) return null;
  return readScopeBuilderData();
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
