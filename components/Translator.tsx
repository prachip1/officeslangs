'use client'

import { useState } from 'react'
import InputArea from './InputArea'
import OutputDisplay from './OutputDisplay'
import { translateWithGPT } from '@/utils/translator'

interface TranslationOutput {
  actualMeaning: string
  whatTheyReallyMean: string
  urgencyLevel: 'Low' | 'Medium' | 'High'
  expectedAction: string
}

export default function Translator() {
  const [inputText, setInputText] = useState('')
  const [output, setOutput] = useState<TranslationOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const result = await translateWithGPT(inputText)
      
      if (typeof result === 'string') {
        // Error message
        setError(result)
        setOutput(null)
      } else {
        // Success - translation result
        setOutput(result)
        setError(null)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      setOutput(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutput(null)
    setError(null)
  }

  return (
    <div
      className="rounded-[28px] p-6 sm:p-8 space-y-6 transition-shadow hover:shadow-[var(--cute-shadow-hover)]"
      style={{
        background: 'var(--cute-surface)',
        boxShadow: 'var(--cute-shadow)',
        border: '1px solid var(--cute-pink-light)',
      }}
    >
      <InputArea
        value={inputText}
        onChange={setInputText}
        onTranslate={handleTranslate}
        onClear={handleClear}
        isLoading={isLoading}
      />

      {error && (
        <div className="pt-6 border-t" style={{ borderColor: 'var(--cute-pink-light)' }}>
          <div
            className="rounded-2xl p-4"
            style={{
              background: 'rgba(255, 228, 196, 0.5)',
              border: '1px solid var(--cute-pink-light)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--cute-text)' }}>🌸 {error}</p>
          </div>
        </div>
      )}

      {output && <OutputDisplay output={output} />}
    </div>
  )
}
