'use client'

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
    <div className="space-y-4">
      <label htmlFor="office-input" className="block text-sm font-medium" style={{ color: '#333C4D' }}>
        Enter office language to translate:
      </label>
      
      <div className="relative">
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
          className="w-full px-4 py-3 pr-12 border rounded-2xl resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#333C4D',
            borderColor: '#E5E7EB',
            minHeight: '56px',
            maxHeight: '200px',
          }}
          rows={1}
          disabled={isLoading}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${Math.min(target.scrollHeight, 200)}px`
          }}
        />
        <button
          onClick={onTranslate}
          disabled={!value.trim() || isLoading}
          className="absolute right-2 bottom-2 p-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 flex items-center justify-center"
          style={{
            backgroundColor: !value.trim() || isLoading ? '#E5E7EB' : '#333C4D',
            color: '#FFFFFF',
            width: '36px',
            height: '36px',
          }}
          title="Translate (Ctrl/Cmd + Enter)"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ overflow: 'visible' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </button>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onClear}
          disabled={!value && !isLoading}
          className="px-4 py-2 text-sm border rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: 'transparent',
            color: '#333C4D',
            borderColor: '#E5E7EB',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
