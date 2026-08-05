import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { fallbackData, fetchWithFallback } from '../api/fallback';

type DataKey = keyof typeof fallbackData;

function ensureArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

export function useApiData<K extends DataKey>(key: K) {
  const [data, setData] = useState<(typeof fallbackData)[K]>(fallbackData[key]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fallback = fallbackData[key];
    const fetchers: Record<DataKey, () => Promise<unknown>> = {
      testimonials: api.getTestimonials,
      caseStudies: api.getCaseStudies,
      services: api.getServices,
      pricing: api.getPricing,
      faqs: api.getFaqs,
      blog: api.getBlog,
      industries: api.getIndustries,
      portfolio: api.getPortfolio,
      awards: api.getAwards,
      tools: api.getTools,
      guidebooks: api.getGuidebooks,
      siteStats: api.getSiteStats,
    };

    const load = () => {
      fetchWithFallback(fetchers[key], fallback)
        .then((result) => {
          if (cancelled) return;
          // Live API arrays win (including empty). Fallback only when fetch fails.
          if (Array.isArray(result)) {
            setData(result as (typeof fallbackData)[K]);
          } else {
            setData(ensureArray(result, fallback as unknown[]) as (typeof fallbackData)[K]);
          }
        })
        .catch(() => {
          if (!cancelled) setData(fallback);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    setLoading(true);
    load();
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', onFocus);
    };
  }, [key]);

  return { data, loading };
}
