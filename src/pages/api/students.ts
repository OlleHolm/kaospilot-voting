import { NextApiRequest, NextApiResponse } from 'next'
import { getAllStudents, getVotingStats } from '@/lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const students = getAllStudents()
    const stats = getVotingStats()

    res.status(200).json({
      students,
      stats
    })

  } catch (error) {
    console.error('Error fetching students:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
