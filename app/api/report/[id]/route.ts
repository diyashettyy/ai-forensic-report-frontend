import { NextRequest, NextResponse } from 'next/server'

// Mock data store (in real app, this would be a database)
function getMockReport(reportId: string) {
  return {
    id: reportId,
    status: 'completed',
    transcript: [
      {
        id: "1",
        timestamp: "00:00:15",
        speaker: "Investigator A",
        text: "This is the initial statement regarding the incident. We received the call at approximately 9:47 AM from a concerned citizen.",
      },
      {
        id: "2",
        timestamp: "00:01:32",
        speaker: "Witness B",
        text: "I observed the suspect entering the building at approximately 2:30 PM. The individual was wearing a dark jacket and carrying a backpack.",
      },
      {
        id: "3",
        timestamp: "00:03:45",
        speaker: "Investigator A",
        text: "Can you describe the suspect's appearance in detail? Any distinctive features or identifying marks?",
      },
      {
        id: "4",
        timestamp: "00:04:20",
        speaker: "Witness B",
        text: "The individual was approximately 5'10\" tall, medium build. I noticed the suspect had a tattoo on the right hand - looked like some kind of symbol or letter.",
      },
      {
        id: "5",
        timestamp: "00:05:55",
        speaker: "Witness C",
        text: "I saw someone matching that description leaving the area around 4:15 PM. The person seemed to be in a hurry and kept looking over their shoulder.",
      }
    ],
    executiveSummary: "This forensic analysis examines witness statements from a recent security incident. The investigation focused on gathering consistent accounts and identifying key witness observations that could aid in suspect identification and apprehension.",
    keyFindings: [
      "Consistent witness descriptions of suspect height (5'10\") and build",
      "Suspect wears dark jacket with distinctive tattoo on right hand",
      "Timeline establishes suspect presence between 2:30 PM and 4:15 PM",
      "Suspect displayed nervous behavior suggesting awareness of being observed"
    ],
    recommendations: [
      "Issue suspect sketch based on composite descriptions",
      "Check local tattoo parlors for matching tattoo designs",
      "Review security camera footage from surrounding businesses",
      "Follow up with additional witnesses in the area during relevant time period"
    ],
    metadata: {
      fileName: "security_incident_recording.mp4",
      duration: "00:07:23",
      processingDate: new Date().toISOString(),
      aiConfidence: "87%"
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params

    // Generate report for the given ID
    const report = getMockReport(reportId)

    // In a real implementation, you would:
    // 1. Check if the report is still processing
    // 2. Fetch from database or cache
    // 3. Handle different report statuses (pending, processing, completed, failed)

    return NextResponse.json({
      success: true,
      report: report
    })

  } catch (error) {
    console.error('Report fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: POST endpoint for updating report status or regenerating
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params
    const body = await request.json()

    // In real implementation, this could regenerate the report
    // or update report metadata

    return NextResponse.json({
      success: true,
      message: `Report ${reportId} updated`,
      data: body
    })

  } catch (error) {
    console.error('Report update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
