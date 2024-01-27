import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS } from '@/constants/responsive';

export const useBreakpoint = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAKPOINTS.sm}px)` });
  const isTablet = useMediaQuery({ query: `(max-width: ${BREAKPOINTS.lg}px)` });
  const isDesktop = useMediaQuery({ query: `(max-width: ${BREAKPOINTS.xl}px)` });

  return { isMobile, isTablet, isDesktop };
};
