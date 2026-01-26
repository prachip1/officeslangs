interface TranslationResult {
  actualMeaning: string
  whatTheyReallyMean: string
  urgencyLevel: 'Low' | 'Medium' | 'High'
  expectedAction: string
}

interface Pattern {
  actual: string
  implied: string
  urgency: 'Low' | 'Medium' | 'High'
  expected: string
}

const patterns: Record<string, Pattern> = {
  'circle back': {
    actual: 'We are not moving forward with this right now.',
    implied: 'This is being postponed without a clear priority.',
    urgency: 'Low',
    expected: 'Wait and do not follow up unless asked.'
  },
  'touch base': {
    actual: 'We need to discuss this.',
    implied: 'This requires a conversation, not just an email.',
    urgency: 'Medium',
    expected: 'Schedule a meeting or call soon.'
  },
  'take a quick look': {
    actual: 'Review this and give feedback.',
    implied: 'This is expected to be done soon, even if not stated clearly.',
    urgency: 'Medium',
    expected: 'Review it and respond within a few hours.'
  },
  'when you have a chance': {
    actual: 'Do this when you can.',
    implied: 'This is not urgent but should be done eventually.',
    urgency: 'Low',
    expected: 'Complete this when you have time, but do not forget about it.'
  },
  'asap': {
    actual: 'Do this immediately.',
    implied: 'This is urgent and should be prioritized.',
    urgency: 'High',
    expected: 'Drop other tasks and complete this now.'
  },
  'at your earliest convenience': {
    actual: 'Do this soon, but politely.',
    implied: 'This is important but not an emergency.',
    urgency: 'Medium',
    expected: 'Complete this within 1-2 business days.'
  },
  'ping me': {
    actual: 'Contact me about this.',
    implied: 'They want a quick update or response.',
    urgency: 'Medium',
    expected: 'Send a message or email soon.'
  },
  'let\'s align': {
    actual: 'We need to agree on this.',
    implied: 'There may be disagreement or confusion that needs resolution.',
    urgency: 'Medium',
    expected: 'Schedule a meeting to discuss and reach agreement.'
  },
  'move the needle': {
    actual: 'Make measurable progress.',
    implied: 'Current progress is insufficient.',
    urgency: 'High',
    expected: 'Take action that produces visible results.'
  },
  'low-hanging fruit': {
    actual: 'Easy tasks that can be done quickly.',
    implied: 'Start with these to show progress.',
    urgency: 'Medium',
    expected: 'Complete the easy tasks first.'
  },
  'deep dive': {
    actual: 'Thoroughly analyze this.',
    implied: 'Surface-level understanding is not enough.',
    urgency: 'Medium',
    expected: 'Spend significant time researching and analyzing.'
  },
  'think outside the box': {
    actual: 'Come up with creative solutions.',
    implied: 'Standard approaches are not working.',
    urgency: 'Medium',
    expected: 'Propose unconventional ideas.'
  },
  'bandwidth': {
    actual: 'Do you have time to do this?',
    implied: 'They are asking if you can take on more work.',
    urgency: 'Low',
    expected: 'Respond honestly about your availability.'
  },
  'synergy': {
    actual: 'Work together effectively.',
    implied: 'Current collaboration may be lacking.',
    urgency: 'Low',
    expected: 'Improve coordination with others.'
  },
  'per my last email': {
    actual: 'I already told you this.',
    implied: 'You may have missed or ignored previous information.',
    urgency: 'High',
    expected: 'Read previous emails and respond accordingly.'
  },
  'let\'s take this offline': {
    actual: 'Discuss this privately, not in this meeting.',
    implied: 'This topic is sensitive or not for everyone.',
    urgency: 'Medium',
    expected: 'Schedule a private conversation.'
  },
  'parking lot': {
    actual: 'We are setting this aside for later.',
    implied: 'This is not a priority right now.',
    urgency: 'Low',
    expected: 'Do not pursue this topic now.'
  },
  'drill down': {
    actual: 'Examine this in detail.',
    implied: 'More specific information is needed.',
    urgency: 'Medium',
    expected: 'Provide detailed analysis or information.'
  },
  'ballpark': {
    actual: 'Give an approximate estimate.',
    implied: 'An exact number is not needed, but a range is.',
    urgency: 'Low',
    expected: 'Provide a rough estimate quickly.'
  },
  'close the loop': {
    actual: 'Finish this task and confirm completion.',
    implied: 'This task has been open for a while.',
    urgency: 'Medium',
    expected: 'Complete the task and notify relevant people.'
  },
  'follow up': {
    actual: 'Check on this again later.',
    implied: 'This needs continued attention.',
    urgency: 'Medium',
    expected: 'Revisit this topic in the future.'
  },
  'action items': {
    actual: 'Tasks that need to be completed.',
    implied: 'These are expected to be done.',
    urgency: 'Medium',
    expected: 'Complete the assigned tasks.'
  },
  'stakeholders': {
    actual: 'People who have an interest in this.',
    implied: 'Multiple people need to be considered.',
    urgency: 'Medium',
    expected: 'Consider all relevant parties in your decisions.'
  },
  'brb': {
    actual: 'I will be right back.',
    implied: 'They are stepping away briefly and will return soon.',
    urgency: 'Low',
    expected: 'Wait for them to return before continuing.'
  },
  'don\'t entertain': {
    actual: 'Do not engage with or respond to.',
    implied: 'They want you to ignore or avoid something.',
    urgency: 'Medium',
    expected: 'Avoid engaging with the specified person or topic.'
  }
}

const sensitiveKeywords = [
  // Sexual content
  'sexual harassment', 'sexual assault', 'rape', 'molestation',
  // Mental health crisis
  'suicide', 'self-harm', 'kill myself', 'end my life', 'mental health crisis',
  // Severe abuse/violence
  'physical abuse', 'domestic violence', 'death threat', 'murder threat'
]

const officeKeywords = [
  'meeting', 'email', 'project', 'deadline', 'team', 'manager',
  'client', 'stakeholder', 'deliverable', 'follow up', 'action item',
  'status update', 'review', 'feedback', 'schedule', 'calendar',
  'presentation', 'report', 'budget', 'quarter', 'kpi', 'metric',
  'circle back', 'touch base', 'ping', 'align', 'synergy',
  'bandwidth', 'asap', 'urgent', 'priority', 'task', 'work',
  'colleague', 'boss', 'supervisor', 'office', 'corporate',
  'workplace', 'business', 'company', 'look', 'check', 'update',
  'discuss', 'conversation', 'call', 'request', 'need', 'please',
  'brb', 'entertain', 'user', 'customer', 'end user', 'client'
]

function checkSensitiveContent(text: string): boolean {
  const textLower = text.toLowerCase()
  return sensitiveKeywords.some(keyword => textLower.includes(keyword))
}

function checkOfficeRelated(text: string): boolean {
  const textLower = text.toLowerCase()
  return officeKeywords.some(keyword => textLower.includes(keyword))
}

function matchPattern(text: string): Pattern | null {
  const textLower = text.toLowerCase()
  
  // Check for exact or partial matches
  for (const [pattern, result] of Object.entries(patterns)) {
    if (textLower.includes(pattern)) {
      return result
    }
  }
  
  // Check for urgency indicators
  const urgencyHigh = ['asap', 'urgent', 'immediately', 'right now', 'emergency', 'critical', 'important']
  const urgencyMedium = ['soon', 'quickly', 'priority', 'important', 'needed', 'please review']
  const urgencyLow = ['when you can', 'eventually', 'no rush', 'whenever', 'when convenient']
  
  if (urgencyHigh.some(phrase => textLower.includes(phrase))) {
    return {
      actual: 'This needs immediate attention.',
      implied: 'This is a high-priority request.',
      urgency: 'High',
      expected: 'Address this immediately.'
    }
  }
  
  if (urgencyMedium.some(phrase => textLower.includes(phrase))) {
    return {
      actual: 'This should be done soon.',
      implied: 'This is important but not an emergency.',
      urgency: 'Medium',
      expected: 'Complete this within 1-2 business days.'
    }
  }
  
  if (urgencyLow.some(phrase => textLower.includes(phrase))) {
    return {
      actual: 'This can be done when convenient.',
      implied: 'This is not urgent.',
      urgency: 'Low',
      expected: 'Complete this when you have time.'
    }
  }
  
  return null
}

function analyzeGeneric(text: string): Pattern {
  const textLower = text.toLowerCase()
  
  // Detect question vs statement
  const isQuestion = text.includes('?')
  
  // Detect politeness markers
  const politeMarkers = ['please', 'would you', 'could you', 'if possible', 'if you don\'t mind']
  const isPolite = politeMarkers.some(marker => textLower.includes(marker))
  
  // Default analysis
  if (isQuestion) {
    return {
      actual: 'They are asking you to do something.',
      implied: 'This is a request, not a command.',
      urgency: 'Medium',
      expected: 'Respond to the request appropriately.'
    }
  } else {
    return {
      actual: 'They are stating something or making a request.',
      implied: 'This may require action from you.',
      urgency: 'Medium',
      expected: 'Understand the message and take appropriate action.'
    }
  }
}

export function translate(text: string): TranslationResult | string {
  if (!text || !text.trim()) {
    return 'Please provide office language to translate.'
  }
  
  const trimmedText = text.trim()
  
  // Check for sensitive content
  if (checkSensitiveContent(trimmedText)) {
    return 'This input is outside the supported scope of this tool.'
  }
  
  // Try to match known patterns first
  const patternResult = matchPattern(trimmedText)
  
  if (patternResult) {
    return {
      actualMeaning: patternResult.actual,
      whatTheyReallyMean: patternResult.implied,
      urgencyLevel: patternResult.urgency,
      expectedAction: patternResult.expected
    }
  }
  
  // No pattern matched - check if office-related
  if (!checkOfficeRelated(trimmedText)) {
    return 'This tool only translates office/workplace language.'
  }
  
  // Generic analysis for office-related text without specific patterns
  const genericResult = analyzeGeneric(trimmedText)
  return {
    actualMeaning: genericResult.actual,
    whatTheyReallyMean: genericResult.implied,
    urgencyLevel: genericResult.urgency,
    expectedAction: genericResult.expected
  }
}

// Async function to translate with GPT fallback
export async function translateWithGPT(text: string): Promise<TranslationResult | string> {
  if (!text || !text.trim()) {
    return 'Please provide office language to translate.'
  }
  
  const trimmedText = text.trim()
  
  // Check for sensitive content
  if (checkSensitiveContent(trimmedText)) {
    return 'This input is outside the supported scope of this tool.'
  }
  
  // Try pattern matching first (fast, free)
  const patternResult = matchPattern(trimmedText)
  if (patternResult) {
    return {
      actualMeaning: patternResult.actual,
      whatTheyReallyMean: patternResult.implied,
      urgencyLevel: patternResult.urgency,
      expectedAction: patternResult.expected
    }
  }
  
  // No pattern matched - check if office-related
  if (!checkOfficeRelated(trimmedText)) {
    return 'This tool only translates office/workplace language.'
  }
  
  // Fallback to GPT for unmatched office language
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: trimmedText }),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.error || 'Failed to translate. Please try again.'
      
      // If API key not configured, fall back to generic analysis
      if (errorMessage.includes('API key not configured')) {
        const genericResult = analyzeGeneric(trimmedText)
        return {
          actualMeaning: genericResult.actual,
          whatTheyReallyMean: genericResult.implied,
          urgencyLevel: genericResult.urgency,
          expectedAction: genericResult.expected
        }
      }
      
      return errorMessage
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    // If GPT fails, fall back to generic analysis
    const genericResult = analyzeGeneric(trimmedText)
    return {
      actualMeaning: genericResult.actual,
      whatTheyReallyMean: genericResult.implied,
      urgencyLevel: genericResult.urgency,
      expectedAction: genericResult.expected
    }
  }
}
