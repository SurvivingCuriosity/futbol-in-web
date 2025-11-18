"use client"

import { getAllFutbolines } from '@/src/features/landing/actions/getAllFutbolines';
import { useQuery } from '@tanstack/react-query';

export function useAllFutbolines() {
  return useQuery({
    queryKey: ['futbolines', 'all'],
    queryFn: getAllFutbolines,
    placeholderData: [],
  });
}
