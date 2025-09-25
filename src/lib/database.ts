// Simple in-memory database for demo purposes
// In production, you'd use a real database like PostgreSQL, MongoDB, etc.

export interface Student {
  id: string
  name: string
  classYear: string
  wins: number
  totalVotes: number
  imageUrl: string
  lastVotedAt?: Date
}

// In-memory storage
let students: Student[] = []
let isInitialized = false

// Initialize students data
export function initializeStudents(studentData: Omit<Student, 'wins' | 'totalVotes'>[]): Student[] {
  if (!isInitialized) {
    students = studentData.map(student => ({
      ...student,
      wins: 0,
      totalVotes: 0
    }))
    isInitialized = true
  }
  return students
}

// Get all students
export function getAllStudents(): Student[] {
  return [...students]
}

// Get student by ID
export function getStudentById(id: string): Student | undefined {
  return students.find(student => student.id === id)
}

// Update student votes
export function updateStudentVotes(winnerId: string): Student | null {
  const student = students.find(s => s.id === winnerId)
  if (student) {
    student.wins += 1
    student.totalVotes += 1
    student.lastVotedAt = new Date()
    return { ...student }
  }
  return null
}

// Get leaderboard (sorted by wins)
export function getLeaderboard(): Student[] {
  return [...students].sort((a, b) => b.wins - a.wins)
}

// Get voting statistics
export function getVotingStats() {
  const totalVotes = students.reduce((sum, student) => sum + student.totalVotes, 0)
  const totalWins = students.reduce((sum, student) => sum + student.wins, 0)
  const activeStudents = students.filter(student => student.totalVotes > 0).length
  
  return {
    totalVotes,
    totalWins,
    activeStudents,
    totalStudents: students.length
  }
}

// Reset all votes (for testing)
export function resetAllVotes(): void {
  students.forEach(student => {
    student.wins = 0
    student.totalVotes = 0
    student.lastVotedAt = undefined
  })
}
