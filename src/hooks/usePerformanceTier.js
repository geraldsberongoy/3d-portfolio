import { useState, useEffect, useMemo } from "react";
import { getGPUTier } from "detect-gpu";

/**
 * Performance tier levels for adaptive quality
 * - LOW: Integrated GPUs, older laptops, mobile devices
 * - MEDIUM: Mid-range dedicated GPUs, recent integrated graphics
 * - HIGH: High-end dedicated GPUs, gaming laptops
 */
export const PERFORMANCE_TIERS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

/**
 * Default settings for each performance tier
 */
export const TIER_SETTINGS = {
  [PERFORMANCE_TIERS.LOW]: {
    // Canvas settings
    dpr: [0.75, 1],
    antialias: false,
    precision: "lowp",
    shadows: false,
    // Effects
    enableBloom: false,
    enableEnvironment: false,
    enableAreaLights: false,
    // Particles
    particleCount: 20,
    particleUpdateFrequency: 4,
    // Animation
    floatIntensity: 0.2,
    rotationIntensity: 0.1,
    enableFloat: false,
    // Materials
    useLowPolyMaterials: true,
    // Performance
    frameloop: "demand",
    performanceMin: 0.3,
  },
  [PERFORMANCE_TIERS.MEDIUM]: {
    // Canvas settings
    dpr: [1, 1.5],
    antialias: true,
    precision: "mediump",
    shadows: true,
    // Effects
    enableBloom: false,
    enableEnvironment: true,
    enableAreaLights: false,
    // Particles
    particleCount: 50,
    particleUpdateFrequency: 2,
    // Animation
    floatIntensity: 0.5,
    rotationIntensity: 0.3,
    enableFloat: true,
    // Materials
    useLowPolyMaterials: false,
    // Performance
    frameloop: "always",
    performanceMin: 0.5,
  },
  [PERFORMANCE_TIERS.HIGH]: {
    // Canvas settings
    dpr: [1, 2],
    antialias: true,
    precision: "highp",
    shadows: true,
    // Effects
    enableBloom: true,
    enableEnvironment: true,
    enableAreaLights: true,
    // Particles
    particleCount: 100,
    particleUpdateFrequency: 1,
    // Animation
    floatIntensity: 0.9,
    rotationIntensity: 0.5,
    enableFloat: true,
    // Materials
    useLowPolyMaterials: false,
    // Performance
    frameloop: "always",
    performanceMin: 0.5,
  },
};

/**
 * Hook to detect the GPU tier and provide performance settings
 * @returns {{ tier: string, settings: object, isLoading: boolean, gpuInfo: object }}
 */
export const usePerformanceTier = () => {
  const [gpuTier, setGpuTier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const detectGPU = async () => {
      try {
        const tierResult = await getGPUTier({
          // Optional: benchmark options
          glContext: undefined,
          failIfMajorPerformanceCaveat: false,
          desktopTiers: [0, 15, 30, 60], // FPS thresholds for tier 1, 2, 3
          mobileTiers: [0, 15, 30, 60],
        });

        if (isMounted) {
          setGpuTier(tierResult);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("GPU detection failed, using medium tier:", error);
        if (isMounted) {
          setGpuTier({ tier: 2, type: "FALLBACK" });
          setIsLoading(false);
        }
      }
    };

    detectGPU();

    return () => {
      isMounted = false;
    };
  }, []);

  // Map GPU tier (0-3) to our performance tier
  const performanceTier = useMemo(() => {
    if (!gpuTier) return PERFORMANCE_TIERS.MEDIUM; // Default while loading

    // GPU tier: 0 = no GPU, 1 = low, 2 = medium, 3 = high
    const { tier, isMobile } = gpuTier;

    // Always use LOW for mobile devices regardless of GPU tier
    if (isMobile) {
      return PERFORMANCE_TIERS.LOW;
    }

    // Check for low memory or battery saver mode
    if (typeof navigator !== "undefined") {
      // Check for battery saver (if available)
      if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
          if (battery.charging === false && battery.level < 0.2) {
            return PERFORMANCE_TIERS.LOW;
          }
        });
      }
    }

    // Map GPU tier to performance tier
    if (tier <= 1) return PERFORMANCE_TIERS.LOW;
    if (tier === 2) return PERFORMANCE_TIERS.MEDIUM;
    return PERFORMANCE_TIERS.HIGH;
  }, [gpuTier]);

  const settings = useMemo(() => {
    return TIER_SETTINGS[performanceTier];
  }, [performanceTier]);

  return {
    tier: performanceTier,
    settings,
    isLoading,
    gpuInfo: gpuTier,
  };
};

/**
 * Simpler hook for components that just need to know if they should be lightweight
 * @returns {boolean}
 */
export const useShouldReduceQuality = () => {
  const { tier } = usePerformanceTier();
  return tier === PERFORMANCE_TIERS.LOW;
};

export default usePerformanceTier;
