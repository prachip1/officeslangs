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
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <InputArea
        value={inputText}
        onChange={setInputText}
        onTranslate={handleTranslate}
        onClear={handleClear}
        isLoading={isLoading}
      />
      
      {error && (
        <div className="border-t pt-6 border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {output && (
        <OutputDisplay output={output} />
      )}
    </div>
  )
}
