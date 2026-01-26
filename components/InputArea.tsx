'use client'

import { FaArrowCircleRight } from 'react-icons/fa'

interface InputAreaProps {
  value: string
  onChange: (value: string) => void
  onTranslate: () => void
  onClear: () => void
  isLoading: boolean
}

export default function InputArea({
  value,
  onChange,
  onTranslate,
  onClear,
  isLoading
}: InputAreaProps) {
  return (
    <div className="space-y-5">
      <label htmlFor="office-input" className="block text-sm font-semibold tracking-wide" style={{ color: '#333C4D' }}>
        Enter office language to translate
      </label>
      
      <div className="relative group flex justify-center items-center  ">
        <textarea
          id="office-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              if (value.trim() && !isLoading) {
                onTranslate()
              }
            }
          }}
          placeholder="Type your office language here..."
          className="w-full px-5 py-4 pr-14 border-2 rounded-2xl resize-none transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-[#333C4D] focus:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#333C4D',
            borderColor: value.trim() ? '#333C4D' : '#E5E7EB',
            minHeight: '64px',
            maxHeight: '240px',
            fontSize: '15px',
            lineHeight: '1.6',
          }}
          rows={1}
          disabled={isLoading}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${Math.min(target.scrollHeight, 240)}px`
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#333C4D'
          }}
          onBlur={(e) => {
            if (!value.trim()) {
              e.target.style.borderColor = '#E5E7EB'
            }
          }}
        />
        <button
          onClick={onTranslate}
          disabled={!value.trim() || isLoading}
          className="absolute right-3 bottom-3 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
          style={{
            backgroundColor: !value.trim() || isLoading ? '#E5E7EB' : '#333C4D',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0,
          }}
          title="Translate (Ctrl/Cmd + Enter)"
        >
          {isLoading ? (
            <svg className="animate-spin" fill="none" viewBox="0 0 24 24" style={{ width: '20px', height: '20px', display: 'block' }}>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <FaArrowCircleRight 
              style={{ 
                width: '20px',
                height: '20px',
                display: 'block',
              }}
            />
          )}
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          onClick={onClear}
          disabled={!value && !isLoading}
          className="px-5 py-2.5 text-sm font-medium border-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 active:scale-95"
          style={{
            backgroundColor: 'transparent',
            color: '#333C4D',
            borderColor: (!value && !isLoading) ? '#E5E7EB' : '#333C4D',
          }}
        >
          Clear
        </button>
        <span className="text-xs text-gray-400">
          {value.trim() ? `${value.length} characters` : 'Press Ctrl/Cmd + Enter to translate'}
        </span>
      </div>
    </div>
  )
}
