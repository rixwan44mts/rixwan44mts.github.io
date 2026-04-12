import { useEffect, type RefObject } from 'react'
import { Application, DisplacementFilter, Sprite, Texture } from 'pixi.js'

function createGradientTexture(): Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 800
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return Texture.WHITE
  }

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, '#060912')
  gradient.addColorStop(0.45, '#0b1730')
  gradient.addColorStop(1, '#09101f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 18; i += 1) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = 80 + Math.random() * 220
    const orb = ctx.createRadialGradient(x, y, 0, x, y, radius)
    orb.addColorStop(0, 'rgba(56, 189, 248, 0.12)')
    orb.addColorStop(1, 'rgba(56, 189, 248, 0)')
    ctx.fillStyle = orb
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  return Texture.from(canvas)
}

function createRippleTexture(): Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return Texture.WHITE
  }

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 128)
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
  gradient.addColorStop(0.28, 'rgba(130,198,255,0.7)')
  gradient.addColorStop(0.65, 'rgba(130,198,255,0.2)')
  gradient.addColorStop(1, 'rgba(130,198,255,0)')

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(128, 128, 128, 0, Math.PI * 2)
  ctx.fill()

  return Texture.from(canvas)
}

function useLiquidCursor(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    let isUnmounted = false
    const ripples: Sprite[] = []

    const initialize = async () => {
      if (!containerRef.current) return

      const app = new Application()
      await app.init({
        resizeTo: containerRef.current,
        antialias: true,
        backgroundAlpha: 1,
        backgroundColor: 0x05080f,
      })

      if (isUnmounted || !containerRef.current) {
        app.destroy(true)
        return
      }

      containerRef.current.appendChild(app.canvas)

      const gradientTexture = createGradientTexture()
      const rippleTexture = createRippleTexture()

      const background = new Sprite(gradientTexture)
      background.width = app.screen.width
      background.height = app.screen.height

      const displacementMap = new Sprite(rippleTexture)
      displacementMap.anchor.set(0.5)
      displacementMap.alpha = 0.12
      displacementMap.x = app.screen.width / 2
      displacementMap.y = app.screen.height / 2
      displacementMap.scale.set(2)

      const displacementFilter = new DisplacementFilter(displacementMap)
      displacementFilter.scale.set(32, 32)
      background.filters = [displacementFilter]

      app.stage.addChild(background)
      app.stage.addChild(displacementMap)

      let targetX = app.screen.width / 2
      let targetY = app.screen.height / 2
      let currentX = targetX
      let currentY = targetY
      let pulse = 0
      let speed = 0

      const emitRipple = (x: number, y: number) => {
        const ripple = new Sprite(rippleTexture)
        ripple.anchor.set(0.5)
        ripple.x = x
        ripple.y = y
        ripple.alpha = 0.28
        ripple.scale.set(0.18)
        app.stage.addChild(ripple)
        ripples.push(ripple)
      }

      const onPointerMove = (event: PointerEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
          return
        }

        const dx = x - targetX
        const dy = y - targetY
        speed = Math.min(80, Math.hypot(dx, dy))
        targetX = x
        targetY = y
        emitRipple(targetX, targetY)
      }

      const onResize = () => {
        background.width = app.screen.width
        background.height = app.screen.height
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('resize', onResize)

      app.ticker.add(() => {
        currentX += (targetX - currentX) * 0.14
        currentY += (targetY - currentY) * 0.14

        pulse += 0.06
        const pulseScale = 1.9 + Math.sin(pulse) * 0.2 + speed * 0.01

        displacementMap.x = currentX
        displacementMap.y = currentY
        displacementMap.scale.set(pulseScale)
        displacementMap.rotation += 0.005 + speed * 0.00008

        const energy = 18 + speed * 0.7
        displacementFilter.scale.set(energy, energy)

        for (let i = ripples.length - 1; i >= 0; i -= 1) {
          const ripple = ripples[i]
          ripple.scale.x += 0.02
          ripple.scale.y += 0.02
          ripple.alpha *= 0.95
          if (ripple.alpha < 0.01) {
            app.stage.removeChild(ripple)
            ripple.destroy()
            ripples.splice(i, 1)
          }
        }

        speed *= 0.9
      })

      return () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('resize', onResize)
        ripples.forEach((ripple) => ripple.destroy())
        app.destroy(true)
      }
    }

    let cleanup: (() => void) | undefined

    void initialize().then((destroyer) => {
      cleanup = destroyer
    })

    return () => {
      isUnmounted = true
      cleanup?.()
    }
  }, [containerRef])
}

export default useLiquidCursor
