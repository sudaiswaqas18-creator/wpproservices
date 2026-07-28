import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { fallbackData, fetchWithFallback } from '../api/fallback';

type DataKey = keyof typeof fallbackData;

function ensureArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? value : fallback;
}

export function useApiData<K extends DataKey>(key: K) {
  const [data, setData] = useState<(typeof fallbackData)[K]>(fallbackData[key]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    };

    fetchWithFallback(fetchers[key], fallback)
      .then((result) => setData(ensureArray(result, fallback as unknown[]) as (typeof fallbackData)[K]))
      .catch(() => setData(fallback))
      .finally(() => setLoading(false));
  }, [key]);

  return { data, loading };
}
