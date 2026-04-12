import { useEffect, useRef } from 'react'

type Blob = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const TAU = Math.PI * 2

export function useLiquidCursor(blobCount = 6) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lowResCanvas = document.createElement('canvas')
    const lowResCtx = lowResCanvas.getContext('2d')
    if (!lowResCtx) return

    let rafId = 0
    let width = window.innerWidth
    let height = window.innerHeight
    const scale = 0.22

    const pointer = {
      x: width * 0.5,
      y: height * 0.5,
      tx: width * 0.5,
      ty: height * 0.5,
      radius: 155,
    }

    const randomBlob = (): Blob => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: 90 + Math.random() * 90,
    })

    const blobs: Blob[] = Array.from({ length: blobCount }, randomBlob)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      lowResCanvas.width = Math.max(2, Math.floor(width * scale))
      lowResCanvas.height = Math.max(2, Math.floor(height * scale))
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX
      pointer.ty = event.clientY
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      pointer.tx = touch.clientX
      pointer.ty = touch.clientY
    }

    const drawMetaballs = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.18
      pointer.y += (pointer.ty - pointer.y) * 0.18

      for (const blob of blobs) {
        blob.x += blob.vx
        blob.y += blob.vy
        if (blob.x < -blob.radius || blob.x > width + blob.radius) blob.vx *= -1
        if (blob.y < -blob.radius || blob.y > height + blob.radius) blob.vy *= -1
      }

      const lw = lowResCanvas.width
      const lh = lowResCanvas.height
      const imageData = lowResCtx.createImageData(lw, lh)
      const data = imageData.data

      for (let y = 0; y < lh; y += 1) {
        for (let x = 0; x < lw; x += 1) {
          const px = x / scale
          const py = y / scale

          let field = 0
          for (const blob of blobs) {
            const dx = px - blob.x
            const dy = py - blob.y
            field += (blob.radius * blob.radius) / (dx * dx + dy * dy + 1)
          }

          const cx = px - pointer.x
          const cy = py - pointer.y
          field += (pointer.radius * pointer.radius) / (cx * cx + cy * cy + 1)

          const i = (y * lw + x) * 4
          if (field > 1.08) {
            const glow = Math.min(1, (field - 1.08) / 1.6)
            data[i] = Math.floor(40 + glow * 45)
            data[i + 1] = Math.floor(145 + glow * 70)
            data[i + 2] = Math.floor(255 - glow * 20)
            data[i + 3] = Math.floor(50 + glow * 150)
          } else {
            data[i + 3] = 0
          }
        }
      }

      lowResCtx.clearRect(0, 0, lw, lh)
      lowResCtx.putImageData(imageData, 0, 0)

      ctx.clearRect(0, 0, width, height)
      const gradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        20,
        pointer.x,
        pointer.y,
        Math.max(width, height) * 0.75,
      )
      gradient.addColorStop(0, 'rgba(23, 80, 175, 0.2)')
      gradient.addColorStop(1, 'rgba(2, 8, 20, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(lowResCanvas, 0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      ctx.save()
      ctx.strokeStyle = 'rgba(120, 206, 255, 0.14)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(pointer.x, pointer.y, 36 + Math.sin(performance.now() * 0.004) * 4, 0, TAU)
      ctx.stroke()
      ctx.restore()
    }

    const render = () => {
      drawMetaballs()
      rafId = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    rafId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [blobCount])

  return canvasRef
}
