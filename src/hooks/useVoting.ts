import { useState, useEffect } from 'react'
import { Student } from '@/lib/database'
import { useSocket } from './useSocket'

interface VotingStats {
  totalVotes: number
  totalWins: number
  activeStudents: number
  totalStudents: number
}

export const useVoting = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [stats, setStats] = useState<VotingStats>({
    totalVotes: 0,
    totalWins: 0,
    activeStudents: 0,
    totalStudents: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { socket, isConnected } = useSocket()

  // Fetch initial data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students')
        if (!response.ok) throw new Error('Failed to fetch students')
        
        const data = await response.json()
        setStudents(data.students)
        setStats(data.stats)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // Listen for real-time updates
  useEffect(() => {
    if (socket) {
      socket.on('voteUpdate', (data: { students: Student[], stats: VotingStats }) => {
        setStudents(data.students)
        setStats(data.stats)
      })

      socket.on('studentUpdate', (updatedStudent: Student) => {
        setStudents(prev => 
          prev.map(student => 
            student.id === updatedStudent.id ? updatedStudent : student
          )
        )
      })

      return () => {
        socket.off('voteUpdate')
        socket.off('studentUpdate')
      }
    }
  }, [socket])

  // Vote for a student
  const voteForStudent = async (winnerId: string) => {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ winnerId }),
      })

      if (!response.ok) throw new Error('Failed to vote')

      const data = await response.json()
      
      // Update local state immediately for better UX
      setStudents(data.students)
      setStats(data.stats)

      // Emit to other clients via socket
      if (socket) {
        socket.emit('vote', { winnerId })
      }

      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Vote failed')
      throw err
    }
  }

  return {
    students,
    stats,
    loading,
    error,
    isConnected,
    voteForStudent,
    clearError: () => setError(null)
  }
}
