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
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="border-t pt-6 space-y-4 border-gray-200">
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#333C4D' }}>Translation:</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Actual Meaning:</h3>
          <p style={{ color: '#333C4D' }}>{output.actualMeaning}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">What They Really Mean:</h3>
          <p style={{ color: '#333C4D' }}>{output.whatTheyReallyMean}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Urgency Level:</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(output.urgencyLevel)}`}>
            {output.urgencyLevel}
          </span>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">What Is Expected From You:</h3>
          <p style={{ color: '#333C4D' }}>{output.expectedAction}</p>
        </div>
      </div>
    </div>
  )
}
