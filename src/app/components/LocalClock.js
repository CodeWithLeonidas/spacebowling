'use client'

import { useEffect, useState } from 'react'

// Athens time, 24h — built once, reused on every tick
const athensTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Athens',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export default function LocalClock() {
  const [time, setTime] = useState(null) // null until mounted — keeps SSR/client markup identical

  useEffect(() => {
    let timeoutId

    const tick = () => {
      setTime(athensTime.format(new Date()))
      // Re-render on the minute boundary only — no per-second timer draining mobile batteries
      timeoutId = setTimeout(tick, 60000 - (Date.now() % 60000) + 50)
    }
    tick()

    // Mobile browsers throttle timers in background tabs — resync when the user comes back
    const onVisibility = () => {
      if (document.visibilityState === 'visible') { clearTimeout(timeoutId); tick() }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const [hh, mm] = (time ?? '--:--').split(':')

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 rounded-full border border-[var(--border-cyan)] bg-[var(--cyan)]/[0.04] px-2 py-[3px] sm:px-2.5 sm:py-1 select-none"
      role="status"
      aria-live="off"
      aria-label={time ? `Local time in Greece: ${time}` : 'Local time in Greece'}
      title="Greece local time"
    >
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
        <span className="clock-dot-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)]" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_6px_var(--cyan)]" />
      </span>

      <time
        dateTime={time ?? undefined}
        suppressHydrationWarning
        className="font-mono-space text-[0.7rem] sm:text-xs lg:text-sm leading-none tracking-[0.08em] text-[var(--cyan)]/90 tabular-nums"
        style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
      >
        {hh}<span className="clock-colon mx-[1px]">:</span>{mm}
      </time>

      <span
        className="hidden lg:inline font-mono-space text-[0.6rem] leading-none tracking-[0.2em] text-white/35"
        style={{ fontFamily: 'var(--font-mono)' }}
        aria-hidden="true"
      >
        GR
      </span>
    </div>
  )
}
