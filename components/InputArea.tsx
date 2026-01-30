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
    <div className="space-y-5 leading-tight">
      <label htmlFor="office-input" className="block text-base font-semibold tracking-wide text-[var(--text)]">
        Paste your office speak here
      </label>

      <div className="relative flex justify-center items-center">
        <textarea
          id="office-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              if (value.trim() && !isLoading) onTranslate()
            }
          }}
          placeholder="e.g. Let's circle back and synergize..."
          className="w-full px-5 py-4 pr-14 rounded-2xl resize-none transition-all duration-200 bg-white border-2 border-[var(--border)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:border-[var(--accent)] disabled:opacity-60 disabled:cursor-not-allowed text-[var(--text)]"
          style={{
            minHeight: '72px',
            maxHeight: '240px',
            fontSize: '15px',
            lineHeight: '1.6',
            borderColor: value.trim() ? 'var(--text-muted)' : undefined,
          }}
          rows={1}
          disabled={isLoading}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${Math.min(target.scrollHeight, 240)}px`
          }}
        />
        <button
          onClick={onTranslate}
          disabled={!value.trim() || isLoading}
          className="absolute right-3 bottom-3 rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          style={{
            background: !value.trim() || isLoading ? '#E5E7EB' : '#333C4D',
            color: 'white',
            boxShadow: '0 4px 14px rgba(51, 60, 77, 0.25)',
          }}
          title="Translate (Ctrl/Cmd + Enter)"
        >
          {isLoading ? (
            <svg className="animate-spin" fill="none" viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <FaArrowCircleRight style={{ width: '22px', height: '22px' }} />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onClear}
          disabled={!value && !isLoading}
          className="px-5 py-2.5 text-sm font-medium rounded-2xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 hover:scale-[1.02] active:scale-95"
          style={{
            background: '#333C4D',
            color: 'white',
            border: '2px solid #333C4D',
          }}
        >
          Clear
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          {value.trim() ? `${value.length} characters` : 'Ctrl/Cmd + Enter to translate'}
        </span>
      </div>
    </div>
  )
}
