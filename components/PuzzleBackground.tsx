'use client'

import { useEffect, useRef } from 'react'

interface Block {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  speed: number
  shape: 'square' | 'l' | 't' | 'z'
}

export default function PuzzleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blocksRef = useRef<Block[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create initial blocks
    const createBlock = (): Block => {
      const shapes: Block['shape'][] = ['square', 'l', 't', 'z']
      return {
        x: Math.random() * canvas.width,
        y: -100 - Math.random() * 500,
        width: 60 + Math.random() * 80,
        height: 60 + Math.random() * 80,
        rotation: Math.random() * 360,
        speed: 0.5 + Math.random() * 1.5,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }
    }

    // Initialize blocks
    for (let i = 0; i < 15; i++) {
      blocksRef.current.push(createBlock())
    }

    const drawSketchBlock = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      rotation: number,
      shape: Block['shape']
    ) => {
      ctx.save()
      ctx.translate(x + width / 2, y + height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(-width / 2, -height / 2)

      // Sketchy style - pure black color
      ctx.strokeStyle = 'rgb(0, 0, 0)'
      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Draw shape with sketchy edges
      ctx.beginPath()
      
      if (shape === 'square') {
        // Square with sketchy edges
        const wobble = 2
        ctx.moveTo(wobble * (Math.random() - 0.5), wobble * (Math.random() - 0.5))
        ctx.lineTo(width + wobble * (Math.random() - 0.5), wobble * (Math.random() - 0.5))
        ctx.lineTo(width + wobble * (Math.random() - 0.5), height + wobble * (Math.random() - 0.5))
        ctx.lineTo(wobble * (Math.random() - 0.5), height + wobble * (Math.random() - 0.5))
        ctx.closePath()
      } else if (shape === 'l') {
        // L shape
        const wobble = 2
        ctx.moveTo(0, 0)
        ctx.lineTo(width * 0.6 + wobble, 0)
        ctx.lineTo(width * 0.6 + wobble, height * 0.4 + wobble)
        ctx.lineTo(width + wobble, height * 0.4 + wobble)
        ctx.lineTo(width + wobble, height + wobble)
        ctx.lineTo(0, height + wobble)
        ctx.closePath()
      } else if (shape === 't') {
        // T shape
        const wobble = 2
        ctx.moveTo(width * 0.3, 0)
        ctx.lineTo(width * 0.7 + wobble, 0)
        ctx.lineTo(width * 0.7 + wobble, height * 0.4 + wobble)
        ctx.lineTo(width + wobble, height * 0.4 + wobble)
        ctx.lineTo(width + wobble, height + wobble)
        ctx.lineTo(0, height + wobble)
        ctx.lineTo(0, height * 0.4)
        ctx.lineTo(width * 0.3, height * 0.4)
        ctx.closePath()
      } else {
        // Z shape
        const wobble = 2
        ctx.moveTo(0, 0)
        ctx.lineTo(width * 0.7 + wobble, 0)
        ctx.lineTo(width * 0.7 + wobble, height * 0.4 + wobble)
        ctx.lineTo(width + wobble, height * 0.4 + wobble)
        ctx.lineTo(width * 0.3 + wobble, height + wobble)
        ctx.lineTo(0, height + wobble)
        ctx.lineTo(0, height * 0.6)
        ctx.lineTo(width * 0.3, height * 0.6)
        ctx.closePath()
      }

      ctx.fill()
      ctx.stroke()

      // Add sketchy details
      ctx.strokeStyle = 'rgb(0, 0, 0)'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(
          Math.random() * width,
          Math.random() * height
        )
        ctx.lineTo(
          Math.random() * width,
          Math.random() * height
        )
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blocksRef.current.forEach((block, index) => {
        // Update position - only if not stacked
        if (block.y < canvas.height - 50) {
          block.y += block.speed
          block.rotation += 0.5
        } else {
          // Stop rotation when stacked
          block.rotation = Math.round(block.rotation / 90) * 90
        }

        // Check collision with bottom or other stacked blocks
        let canMove = true
        const bottomY = canvas.height - 50

        // Check if block has reached bottom
        if (block.y + block.height / 2 >= bottomY) {
          block.y = bottomY - block.height / 2
          canMove = false
        }

        // Check collision with other stacked blocks
        blocksRef.current.forEach((otherBlock, otherIndex) => {
          if (index !== otherIndex && otherBlock.y >= bottomY - 100) {
            const dx = block.x - otherBlock.x
            const dy = block.y - otherBlock.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (block.width + otherBlock.width) / 2 + 10

            if (distance < minDistance && distance > 0) {
              // Push block up or to the side
              const angle = Math.atan2(dy, dx)
              if (block.y < bottomY - 50) {
                block.x += Math.cos(angle) * 2
              } else {
                // Already stacked, adjust horizontally
                block.x += Math.cos(angle) * 1
                block.y = Math.max(block.y, otherBlock.y - block.height - 5)
              }
              canMove = false
            }
          }
        })

        // Only move if not colliding
        if (canMove && block.y < bottomY - 50) {
          block.y += block.speed
        }

        // Draw block
        drawSketchBlock(
          ctx,
          block.x,
          block.y,
          block.width,
          block.height,
          block.rotation,
          block.shape
        )

        // Reset if completely off screen (only from top)
        if (block.y < -300) {
          block.x = Math.random() * canvas.width
          block.y = -200
          block.speed = 0.5 + Math.random() * 1.5
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
