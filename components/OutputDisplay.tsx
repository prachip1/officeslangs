'use client'

interface Output {
  actualMeaning: string
  whatTheyReallyMean: string
  urgencyLevel: 'Low' | 'Medium' | 'High'
  expectedAction: string
}

interface OutputDisplayProps {
  output: Output
}

export default function OutputDisplay({ output }: OutputDisplayProps) {
  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return { bg: '#FFE4EC', text: '#C75D7A', border: '#F8B4C4' }
      case 'Medium':
        return { bg: '#FFF4E4', text: '#B8860B', border: '#FFE4B5' }
      case 'Low':
        return { bg: '#E8F8F2', text: '#2E7D5E', border: '#B5EAD7' }
      default:
        return { bg: 'var(--cute-pink-light)', text: 'var(--cute-text)', border: 'var(--cute-pink)' }
    }
  }

  const urgencyStyle = getUrgencyStyle(output.urgencyLevel)

  const section = (label: string, value: string, emoji: string) => (
    <div
      className="rounded-2xl p-4"
      style={{
        background: 'var(--cute-bg)',
        border: '1px solid var(--cute-pink-light)',
      }}
    >
      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--cute-text-soft)' }}>
        {emoji} {label}
      </h3>
      <p className="text-[15px] leading-relaxed" style={{ color: 'var(--cute-text)' }}>
        {value}
      </p>
    </div>
  )

  return (
    <div className="pt-6 space-y-4" style={{ borderTop: '1px solid var(--cute-pink-light)' }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--cute-text)' }}>
        ✨ Your translation
      </h2>

      <div className="space-y-4">
        {section('Actual meaning', output.actualMeaning, '📖')}
        {section('What they really mean', output.whatTheyReallyMean, '😏')}
        <div
          className="rounded-2xl px-4 py-3 inline-block"
          style={{
            background: urgencyStyle.bg,
            border: `1px solid ${urgencyStyle.border}`,
            color: urgencyStyle.text,
          }}
        >
          <span className="text-sm font-semibold">⚡ Urgency: {output.urgencyLevel}</span>
        </div>
        {section('What’s expected from you', output.expectedAction, '👋')}
      </div>
    </div>
  )
}
