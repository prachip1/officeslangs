import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Please provide office language to translate.' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      )
    }

    const prompt = `You are an "Office Slang Translator". Your job is to translate informal, indirect, or hierarchical office language into clear, simple, human English.

IMPORTANT RULES:
- You are NOT a chatbot.
- You do NOT give advice.
- You do NOT add opinions.
- You do NOT moralise or judge.
- You ONLY output in the exact JSON format below.

Given this office sentence: "${text}"

Decode:
1. What is ACTUALLY being said
2. What is IMPLIED (urgency, pressure, hierarchy)
3. What the sender EXPECTS next

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "actualMeaning": "one clear sentence",
  "whatTheyReallyMean": "one clear sentence",
  "urgencyLevel": "Low" or "Medium" or "High",
  "expectedAction": "one short action-oriented sentence"
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an office language translator. Always respond with valid JSON only, no markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    })

    const responseText = completion.choices[0]?.message?.content || ''
    
    // Try to parse JSON (handle markdown code blocks if present)
    let parsed
    try {
      // Remove markdown code blocks if present
      const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch (e) {
      // If parsing fails, return error
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      )
    }

    // Validate the response structure
    if (
      !parsed.actualMeaning ||
      !parsed.whatTheyReallyMean ||
      !parsed.urgencyLevel ||
      !parsed.expectedAction
    ) {
      return NextResponse.json(
        { error: 'Invalid response format from AI.' },
        { status: 500 }
      )
    }

    // Validate urgency level
    if (!['Low', 'Medium', 'High'].includes(parsed.urgencyLevel)) {
      parsed.urgencyLevel = 'Medium'
    }

    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to translate. Please try again.' },
      { status: 500 }
    )
  }
}
