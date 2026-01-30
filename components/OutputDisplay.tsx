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
        return { bg: '#0F0F0F', text: '#FAFAFA', border: '#0F0F0F' }
      case 'Medium':
        return { bg: 'var(--accent)', text: '#FFFFFF', border: 'var(--accent)' }
      case 'Low':
        return { bg: '#E5E5E5', text: '#525252', border: '#E5E5E5' }
      default:
        return { bg: '#E5E5E5', text: 'var(--text)', border: 'var(--border)' }
    }
  }

  const urgencyStyle = getUrgencyStyle(output.urgencyLevel)

  const section = (label: string, value: string) => (
    <div className="rounded-2xl p-4 bg-[var(--bg)] border border-[var(--border)]">
      <h3 className="text-sm font-semibold mb-2 text-[var(--text-muted)]">{label}</h3>
      <p className="text-[15px] leading-relaxed text-[var(--text)]">{value}</p>
    </div>
  )

  return (
    <div className="pt-6 space-y-4 border-t border-[var(--border)]">
      <h2 className="text-xl font-bold mb-4 text-[var(--text)]">Your translation</h2>

      <div className="space-y-4">
        {section('Actual meaning', output.actualMeaning)}
        {section('What they really mean', output.whatTheyReallyMean)}
        <div
          className="rounded-2xl px-4 py-3 inline-block"
          style={{
            background: urgencyStyle.bg,
            border: `1px solid ${urgencyStyle.border}`,
            color: urgencyStyle.text,
          }}
        >
          <span className="text-sm font-semibold">Urgency: {output.urgencyLevel}</span>
        </div>
        {section('What’s expected from you', output.expectedAction)}
      </div>
    </div>
  )
}
