'use client'

import { useState, useEffect } from 'react'
import { Zap, Trophy, Users, Star, Sparkles, Wifi, WifiOff } from 'lucide-react'
import VotingInterface from '@/components/VotingInterface'
import Leaderboard from '@/components/Leaderboard'
import { loadStudents } from '@/utils/studentLoader'

export default function Home() {
  const [currentView, setCurrentView] = useState<'voting' | 'leaderboard'>('voting')
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load students data
  useEffect(() => {
    try {
      const studentData = loadStudents()
      setStudents(studentData)
      setLoading(false)
    } catch (err) {
      setError('Failed to load students')
      setLoading(false)
    }
  }, [])

  const handleVote = (winnerId: string) => {
    // Simple local vote handling - just update the local state
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === winnerId 
          ? { ...student, wins: (student.wins || 0) + 1 }
          : student
      )
    )
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #faf5ff, #fdf2f8, #eff6ff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            animation: 'spin 1s linear infinite',
            borderRadius: '50%',
            height: '48px',
            width: '48px',
            borderBottom: '2px solid #ec4899',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '18px', fontWeight: '500' }}>Loading amazing students...</p>
        </div>
      </div>
    )
  }

  const totalVotes = students.reduce((sum, student) => sum + (student.wins || 0), 0)

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #faf5ff, #fdf2f8, #eff6ff)'
    }}>
      {/* BULLETPROOF Horizontal Header Layout */}
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #fce7f3'
      }}>
        <div style={{ 
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px 16px'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            gap: '24px'
          }}>
            {/* Left Section - Title and Description */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexShrink: 0
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(to right, #ec4899, #9333ea)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  <Zap style={{ height: '28px', width: '28px', color: 'white' }} />
                </div>
                <div style={{ 
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star style={{ height: '8px', width: '8px', color: 'white', fill: 'currentColor' }} />
                </div>
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #db2777, #9333ea, #2563eb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                  margin: 0,
                  lineHeight: '1.2'
                }}>
                  KAOSPILOT Community
                </h1>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '14px',
                  fontWeight: '500',
                  margin: 0,
                  marginTop: '4px'
                }}>Vote for your favorites! 🎉</p>
              </div>
            </div>
            
            {/* Center Section - Navigation Buttons */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexShrink: 0
            }}>
              <button
                onClick={() => setCurrentView('voting')}
                style={{ 
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  background: currentView === 'voting' 
                    ? 'linear-gradient(to right, #ec4899, #9333ea)' 
                    : 'transparent',
                  color: currentView === 'voting' ? 'white' : '#6b7280',
                  boxShadow: currentView === 'voting' 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                    : 'none',
                  transform: currentView === 'voting' ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (currentView !== 'voting') {
                    e.currentTarget.style.backgroundColor = '#fdf2f8'
                    e.currentTarget.style.color = '#ec4899'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== 'voting') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                  }
                }}
              >
                <Sparkles style={{ height: '20px', width: '20px' }} />
                <span>Vote</span>
              </button>
              <button
                onClick={() => setCurrentView('leaderboard')}
                style={{ 
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  background: currentView === 'leaderboard' 
                    ? 'linear-gradient(to right, #9333ea, #2563eb)' 
                    : 'transparent',
                  color: currentView === 'leaderboard' ? 'white' : '#6b7280',
                  boxShadow: currentView === 'leaderboard' 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                    : 'none',
                  transform: currentView === 'leaderboard' ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (currentView !== 'leaderboard') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                    e.currentTarget.style.color = '#9333ea'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== 'leaderboard') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                  }
                }}
              >
                <Trophy style={{ height: '20px', width: '20px' }} />
                <span>Leaderboard</span>
              </button>
            </div>
            
            {/* Right Section - Statistics and Connection Status */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexShrink: 0
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <Users style={{ height: '16px', width: '16px' }} />
                <span style={{ 
                  fontWeight: '600',
                  fontFamily: 'Montserrat, sans-serif'
                }}>{students.length} students</span>
              </div>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <Zap style={{ height: '16px', width: '16px' }} />
                <span style={{ fontWeight: '500' }}>{totalVotes} votes</span>
              </div>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#10b981'
              }}>
                <Wifi style={{ height: '16px', width: '16px' }} />
                <span style={{ fontWeight: '500' }}>Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{ 
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px 16px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {error}
          <button 
            onClick={() => setError(null)}
            style={{ 
              marginLeft: '12px',
              background: 'none',
              border: 'none',
              color: '#dc2626',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content */}
      <main>
        {currentView === 'voting' ? (
          <VotingInterface students={students} onVote={handleVote} />
        ) : (
          <Leaderboard students={students} />
        )}
      </main>

      {/* Enhanced Footer */}
      <footer style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #fce7f3',
        marginTop: '48px'
      }}>
        <div style={{ 
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 16px',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '24px' }}>❤️</span>
            <p style={{ 
              color: '#6b7280',
              fontWeight: '500',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>Built with love for the Kaospilot community</p>
            <span style={{ fontSize: '24px' }}>❤️</span>
          </div>
          <p style={{ 
            fontSize: '14px',
            color: '#9ca3af',
            fontWeight: '500',
            margin: 0
          }}>Keep the voting fun and respectful! ✨</p>
          <p style={{ 
            fontSize: '12px',
            color: '#9ca3af',
            margin: '8px 0 0 0'
          }}>
            Local voting • Ready • {totalVotes} total votes
          </p>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
