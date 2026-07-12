"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import type { HandState } from "@/lib/hand-tracking";

interface HandTrackingContextValue {
  enabled: boolean;
  loading: boolean;
  tracking: boolean;
  toggle: () => void;
  videoElement: HTMLVideoElement | null;
}

const HandTrackingContext = createContext<HandTrackingContextValue>({
  enabled: false,
  loading: false,
  tracking: false,
  toggle: () => {},
  videoElement: null,
});

/**
 * Per-frame hand state lives here, NOT in React state: the detection loop
 * runs at camera framerate and pushing it through context would re-render
 * every consumer ~60 times per second. Consumers read it in their own rAF.
 */
export const handStateRef: { current: HandState | null } = { current: null };

export function HandTrackingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );

  const lastHoveredRef = useRef<Element | null>(null);
  const wasPinchingRef = useRef(false);

  const dispatchSyntheticEvents = useCallback((state: HandState) => {
    if (!state.detected) {
      // If we were hovering something, send mouseleave
      if (lastHoveredRef.current) {
        lastHoveredRef.current.dispatchEvent(
          new MouseEvent("mouseleave", { bubbles: true, clientX: -1000, clientY: -1000 })
        );
        lastHoveredRef.current = null;
      }
      return;
    }

    const { screenX, screenY } = state;

    // Dispatch on window for FlowField's listener
    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: screenX,
        clientY: screenY,
        bubbles: false,
      })
    );

    // Find element under cursor and dispatch on it
    const el = document.elementFromPoint(screenX, screenY);
    if (el) {
      // Handle enter/leave
      if (el !== lastHoveredRef.current) {
        if (lastHoveredRef.current) {
          lastHoveredRef.current.dispatchEvent(
            new MouseEvent("mouseleave", {
              bubbles: true,
              clientX: screenX,
              clientY: screenY,
            })
          );
        }
        el.dispatchEvent(
          new MouseEvent("mouseenter", {
            bubbles: true,
            clientX: screenX,
            clientY: screenY,
          })
        );
        lastHoveredRef.current = el;
      }

      el.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: screenX,
          clientY: screenY,
        })
      );

      // Pinch → click
      if (state.isPinching && !wasPinchingRef.current) {
        el.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            clientX: screenX,
            clientY: screenY,
          })
        );
      }
    }

    wasPinchingRef.current = state.isPinching;
  }, []);

  const handleHandState = useCallback(
    (state: HandState) => {
      handStateRef.current = state;
      dispatchSyntheticEvents(state);
    },
    [dispatchSyntheticEvents]
  );

  const toggle = useCallback(async () => {
    if (enabled) {
      // Stop tracking
      const { stopHandTracking } = await import("@/lib/hand-tracking");
      stopHandTracking();
      setEnabled(false);
      setTracking(false);
      setVideoElement(null);
      handStateRef.current = null;
      lastHoveredRef.current = null;
      wasPinchingRef.current = false;
      return;
    }

    // Start tracking
    setLoading(true);
    try {
      const { startHandTracking } = await import("@/lib/hand-tracking");
      const video = await startHandTracking(handleHandState);
      setVideoElement(video);
      setEnabled(true);
      setTracking(true);
    } catch (err) {
      console.error("Hand tracking failed:", err);
      setEnabled(false);
      setTracking(false);
    } finally {
      setLoading(false);
    }
  }, [enabled, handleHandState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (enabled) {
        import("@/lib/hand-tracking").then(({ stopHandTracking }) =>
          stopHandTracking()
        );
      }
    };
  }, [enabled]);

  const value = useMemo(
    () => ({ enabled, loading, tracking, toggle, videoElement }),
    [enabled, loading, tracking, toggle, videoElement]
  );

  return (
    <HandTrackingContext.Provider value={value}>
      {children}
    </HandTrackingContext.Provider>
  );
}

export function useHandTracking() {
  return useContext(HandTrackingContext);
}
