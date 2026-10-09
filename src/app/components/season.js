import { useEffect, useState } from 'react'

/*
 * 2026 season finale — the one place to edit the final dates and hours.
 * Times carry Athens' summer offset (+03:00) so "open now" / "tonight" are
 * right whatever timezone the visitor's phone is set to.
 * Once the last night closes the site switches itself to "closed until 2027".
 */
export const FINAL_NIGHTS = [
  { day: 'Friday',   short: 'FRI', date: 9,  opens: new Date('2026-10-09T18:00:00+03:00'), closes: new Date('2026-10-10T01:00:00+03:00') },
  { day: 'Saturday', short: 'SAT', date: 10, opens: new Date('2026-10-10T18:00:00+03:00'), closes: new Date('2026-10-11T01:00:00+03:00') },
  { day: 'Sunday',   short: 'SUN', date: 11, opens: new Date('2026-10-11T18:00:00+03:00'), closes: new Date('2026-10-12T01:00:00+03:00') },
]

export const REOPENING = 'SUMMER 2027'

const SEASON_END = FINAL_NIGHTS[FINAL_NIGHTS.length - 1].closes

const athensTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Athens', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const athensDay  = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Athens', year: 'numeric', month: '2-digit', day: '2-digit' })

export const hoursLabel = (night) => `${athensTime.format(night.opens)}–${athensTime.format(night.closes)}`

export const isSeasonOver = (now) => now !== null && now >= SEASON_END

// 'open' | 'tonight' | 'upcoming' | 'past' — null until the clock has mounted
export function nightStatus(night, now) {
  if (!now) return null
  if (now >= night.closes) return 'past'
  if (now >= night.opens) return 'open'
  return athensDay.format(now) === athensDay.format(night.opens) ? 'tonight' : 'upcoming'
}

/*
 * Current time, refreshed on each minute boundary. null until mounted so the
 * server HTML and the first client render match (same approach as LocalClock).
 */
export function useNow() {
  const [now, setNow] = useState(null)

  useEffect(() => {
    let timeoutId

    const tick = () => {
      setNow(new Date())
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

  return now
}
