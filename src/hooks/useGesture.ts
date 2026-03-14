import { useRef, useState, useCallback } from 'react'

interface UseGestureOptions {
  holdDuration?: number // ms to trigger, default 1200
  onTrigger: () => void
}

export function useGesture({ holdDuration = 1200, onTrigger }: UseGestureOptions) {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const timerRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const frameRef = useRef<number>(0)

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startRef.current
    const p = Math.min(elapsed / holdDuration, 1)
    setProgress(p)

    if (p >= 1) {
      // Trigger!
      if (navigator.vibrate) navigator.vibrate(50)
      setIsHolding(false)
      setProgress(0)
      onTrigger()
      return
    }

    frameRef.current = requestAnimationFrame(updateProgress)
  }, [holdDuration, onTrigger])

  const onPointerDown = useCallback(() => {
    startRef.current = Date.now()
    setIsHolding(true)
    frameRef.current = requestAnimationFrame(updateProgress)
  }, [updateProgress])

  const onPointerUp = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsHolding(false)
    setProgress(0)
  }, [])

  return {
    progress,
    isHolding,
    gestureHandlers: {
      onPointerDown,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerCancel: onPointerUp,
    },
  }
}
