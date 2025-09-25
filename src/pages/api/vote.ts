import { NextApiRequest, NextApiResponse } from 'next'
import { updateStudentVotes, getAllStudents, getVotingStats } from '@/lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { winnerId } = req.body

    if (!winnerId) {
      return res.status(400).json({ message: 'Winner ID is required' })
    }

    // Update the vote in the database
    const updatedStudent = updateStudentVotes(winnerId)
    
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Get updated data
    const students = getAllStudents()
    const stats = getVotingStats()

    // Return updated data
    res.status(200).json({
      success: true,
      updatedStudent,
      students,
      stats,
      message: 'Vote recorded successfully'
    })

  } catch (error) {
    console.error('Error processing vote:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
