'use client'

import { useEffect, useRef } from 'react'

export default function SaturnBall() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const W = 480, H = 480, CX = 240, CY = 240, R = 130
    const RING_RX = 210, RING_RY = 58, RING_TILT = 0.46
    const CYAN = '#00f5ff', MAG = '#ff00aa', VIO = '#7b2fff', GOLD = '#ffd700'

    const HOLES = [
      { th: -0.42, ph:  0.3  },
      { th: -0.42, ph: -0.3  },
      { th: -0.68, ph:  0.0  },
    ]

    const SWIRL = [
      { th:  0.25, ph: -1.9 },
      { th:  0.5,  ph: -1.0 },
      { th:  0.1,  ph:  0.0 },
      { th: -0.3,  ph:  1.0 },
      { th:  0.05, ph:  1.9 },
    ]

    const RPARTS = Array.from({ length: 6 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 6,
      speed: 0.004 + i * 0.0008,
      col:   [GOLD, CYAN, MAG, GOLD, VIO, CYAN][i],
      size:  2.5 + (i % 3),
    }))

    function sph(th, ph, r) {
      return {
        x: r * Math.cos(th) * Math.sin(ph),
        y: r * Math.sin(th),
        z: r * Math.cos(th) * Math.cos(ph),
      }
    }

    function rotY(p, a) {
      return {
        x:  p.x * Math.cos(a) + p.z * Math.sin(a),
        y:  p.y,
        z: -p.x * Math.sin(a) + p.z * Math.cos(a),
      }
    }

    function rotX(p, a) {
      return {
        x: p.x,
        y: p.y * Math.cos(a) - p.z * Math.sin(a),
        z: p.y * Math.sin(a) + p.z * Math.cos(a),
      }
    }

    function proj(p) {
      const fov = 700
      const s   = fov / (fov + p.z)
      return { x: CX + p.x * s, y: CY - p.y * s, s }
    }

    function drawRingHalf(front) {
      const start = front ? 0 : Math.PI
      const end   = front ? Math.PI : Math.PI * 2

      ctx.save()
      if (front) { ctx.shadowColor = MAG; ctx.shadowBlur = 22 }

      // outer ring
      ctx.beginPath()
      ctx.ellipse(CX, CY + 14, RING_RX, RING_RY, RING_TILT, start, end)
      ctx.strokeStyle = front ? 'rgba(255,0,170,0.82)' : 'rgba(255,0,170,0.2)'
      ctx.lineWidth   = front ? 5 : 3
      ctx.stroke()

      // middle band
      ctx.beginPath()
      ctx.ellipse(CX, CY + 14, RING_RX - 10, RING_RY - 4, RING_TILT, start, end)
      ctx.strokeStyle = front ? 'rgba(123,47,255,0.6)' : 'rgba(123,47,255,0.15)'
      ctx.lineWidth   = front ? 8 : 5
      ctx.stroke()

      // inner edge
      ctx.beginPath()
      ctx.ellipse(CX, CY + 14, RING_RX - 18, RING_RY - 7, RING_TILT, start, end)
      ctx.strokeStyle = front ? 'rgba(0,245,255,0.35)' : 'rgba(0,245,255,0.08)'
      ctx.lineWidth   = front ? 2 : 1
      ctx.stroke()

      if (front) ctx.shadowBlur = 0
      ctx.restore()
    }

    let raf

    function tick(ts) {
      const t  = ts * 0.001
      const ry = t * 0.38
      const rx = 0.1 + Math.sin(t * 0.4) * 0.018

      ctx.clearRect(0, 0, W, H)

      // back ring half (behind ball)
      drawRingHalf(false)

      // ball body
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.fillStyle = '#04091a'
      ctx.fill()

      // deep glow aura
      ctx.shadowColor = CYAN
      ctx.shadowBlur  = 55
      ctx.strokeStyle = 'rgba(0,245,255,0.12)'
      ctx.lineWidth   = 18
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0

      // crisp rim
      ctx.shadowColor = CYAN
      ctx.shadowBlur  = 16
      ctx.strokeStyle = 'rgba(0,245,255,0.55)'
      ctx.lineWidth   = 1.8
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.restore()

      // specular highlight
      ctx.save()
      const hg = ctx.createRadialGradient(
        CX - R * 0.32, CY - R * 0.34, 0,
        CX - R * 0.32, CY - R * 0.34, R * 0.58
      )
      hg.addColorStop(0,    'rgba(255,255,255,0.16)')
      hg.addColorStop(0.35, 'rgba(255,255,255,0.05)')
      hg.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.fillStyle = hg
      ctx.fill()
      ctx.restore()

      // magenta bounce light
      ctx.save()
      const mg = ctx.createRadialGradient(
        CX + R * 0.4, CY + R * 0.35, 0,
        CX + R * 0.4, CY + R * 0.35, R * 0.55
      )
      mg.addColorStop(0, 'rgba(255,0,170,0.07)')
      mg.addColorStop(1, 'rgba(255,0,170,0)')
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.fillStyle = mg
      ctx.fill()
      ctx.restore()

      // swirl line
      ctx.save()
      const sp = SWIRL.map(s => {
        let p = sph(s.th, s.ph, R)
        p = rotX(p, rx)
        p = rotY(p, ry)
        return { ...proj(p), z: p.z }
      })
      ctx.beginPath()
      sp.forEach((pt, i) => {
        if (i === 0) {
          ctx.moveTo(pt.x, pt.y)
        } else {
          const pv = sp[i - 1]
          ctx.quadraticCurveTo(pv.x, pv.y, (pv.x + pt.x) / 2, (pv.y + pt.y) / 2)
        }
      })
      ctx.strokeStyle = 'rgba(0,245,255,0.2)'
      ctx.lineWidth   = 2
      ctx.shadowColor = CYAN
      ctx.shadowBlur  = 10
      ctx.stroke()
      ctx.shadowBlur  = 0
      ctx.restore()

      // finger holes
      ctx.save()
      HOLES.forEach(h => {
        let p = sph(h.th, h.ph, R)
        p = rotX(p, rx)
        p = rotY(p, ry)
        if (p.z < -R * 0.1) return
        const pr  = proj(p)
        const dep = (p.z + R) / (2 * R)
        ctx.globalAlpha = 0.55 + dep * 0.45
        ctx.beginPath()
        ctx.arc(pr.x, pr.y, (7 + dep * 7) * pr.s, 0, Math.PI * 2)
        ctx.fillStyle = '#020408'
        ctx.fill()
        ctx.shadowColor = CYAN
        ctx.shadowBlur  = 10 * dep
        ctx.strokeStyle = `rgba(0,245,255,${(0.4 + dep * 0.45).toFixed(2)})`
        ctx.lineWidth   = 1.4 * pr.s
        ctx.stroke()
        ctx.shadowBlur  = 0
      })
      ctx.restore()

      // front ring half (over ball)
      drawRingHalf(true)

      // ring particles
      RPARTS.forEach(p => {
        p.angle += p.speed
        const px = CX + Math.cos(p.angle) * RING_RX * Math.cos(RING_TILT)
                      - Math.sin(p.angle) * RING_RY * Math.sin(RING_TILT)
        const py = CY + 14
                      + Math.cos(p.angle) * RING_RX * Math.sin(RING_TILT)
                      + Math.sin(p.angle) * RING_RY * Math.cos(RING_TILT)
        const pz = Math.sin(p.angle) * RING_RX
        if (pz <= 0) return
        ctx.save()
        ctx.globalAlpha = 0.7 + 0.3 * Math.sin(p.angle * 3)
        ctx.shadowColor = p.col
        ctx.shadowBlur  = 16
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.col
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.restore()
      })

      // ground shadow
      ctx.save()
      ctx.globalAlpha = 0.13
      const sg = ctx.createRadialGradient(CX, CY + R + 22, 0, CX, CY + R + 22, R * 0.75)
      sg.addColorStop(0, 'rgba(0,245,255,0.4)')
      sg.addColorStop(1, 'rgba(0,245,255,0)')
      ctx.beginPath()
      ctx.ellipse(CX, CY + R + 22, R * 0.6, R * 0.1, 0, 0, Math.PI * 2)
      ctx.fillStyle = sg
      ctx.fill()
      ctx.restore()

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={480}
      style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block' }}
      aria-label="Animated 3D neon bowling ball with Saturn ring"
    />
  )
}