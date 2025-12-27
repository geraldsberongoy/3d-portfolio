import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { usePerformanceTier, PERFORMANCE_TIERS, TIER_SETTINGS } from "../hooks/usePerformanceTier";

/**
 * Performance Context for sharing performance settings across the app
 * This eliminates the need for multiple GPU detections and useMediaQuery calls
 */
const PerformanceContext = createContext(null);

/**
 * Performance Provider Component
 * Wraps the app and provides performance settings to all children
 */
export const PerformanceProvider = ({ children }) => {
  const { tier, settings, isLoading, gpuInfo } = usePerformanceTier();
  const [manualOverride, setManualOverride] = useState(null);
  const [viewportSize, setViewportSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  // Handle viewport size changes with debouncing
  useEffect(() => {
    let timeoutId;

    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportSize({
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
      });
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 150);
    };

    // Initial check
    updateViewport();

    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  // Function to manually override performance tier (for testing or user preference)
  const setPerformanceOverride = useCallback((overrideTier) => {
    if (overrideTier === null || Object.values(PERFORMANCE_TIERS).includes(overrideTier)) {
      setManualOverride(overrideTier);
    }
  }, []);

  // Resolve the final tier (manual override takes precedence)
  const effectiveTier = useMemo(() => {
    if (manualOverride) return manualOverride;
    
    // If on mobile viewport, force LOW tier regardless of GPU
    if (viewportSize.isMobile) return PERFORMANCE_TIERS.LOW;
    
    return tier;
  }, [manualOverride, tier, viewportSize.isMobile]);

  // Get settings for the effective tier
  const effectiveSettings = useMemo(() => {
    const baseSettings = TIER_SETTINGS[effectiveTier];
    
    // Apply viewport-specific adjustments
    if (viewportSize.isTablet && effectiveTier === PERFORMANCE_TIERS.HIGH) {
      return {
        ...baseSettings,
        enableBloom: false, // Disable bloom on tablets even with good GPU
        particleCount: Math.floor(baseSettings.particleCount * 0.7),
      };
    }
    
    return baseSettings;
  }, [effectiveTier, viewportSize.isTablet]);

  const value = useMemo(() => ({
    // Performance tier info
    tier: effectiveTier,
    settings: effectiveSettings,
    isLoading,
    gpuInfo,
    
    // Viewport info
    viewport: viewportSize,
    
    // Manual override controls
    setPerformanceOverride,
    hasOverride: manualOverride !== null,
    
    // Convenience booleans
    isLowTier: effectiveTier === PERFORMANCE_TIERS.LOW,
    isMediumTier: effectiveTier === PERFORMANCE_TIERS.MEDIUM,
    isHighTier: effectiveTier === PERFORMANCE_TIERS.HIGH,
    
    // Quick access to common checks
    shouldUseSimpleMaterials: effectiveSettings.useLowPolyMaterials,
    shouldEnableEffects: effectiveSettings.enableBloom || effectiveSettings.enableEnvironment,
  }), [effectiveTier, effectiveSettings, isLoading, gpuInfo, viewportSize, setPerformanceOverride, manualOverride]);

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

/**
 * Hook to access performance context
 * @returns {object} Performance context value
 */
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  
  if (!context) {
    // Return default values if used outside provider (for backwards compatibility)
    console.warn("usePerformance used outside PerformanceProvider, using defaults");
    return {
      tier: PERFORMANCE_TIERS.MEDIUM,
      settings: TIER_SETTINGS[PERFORMANCE_TIERS.MEDIUM],
      isLoading: false,
      gpuInfo: null,
      viewport: {
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth > 1024,
      },
      setPerformanceOverride: () => {},
      hasOverride: false,
      isLowTier: false,
      isMediumTier: true,
      isHighTier: false,
      shouldUseSimpleMaterials: false,
      shouldEnableEffects: true,
    };
  }
  
  return context;
};

export { PERFORMANCE_TIERS };
export default PerformanceProvider;
