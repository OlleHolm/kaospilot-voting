'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, Heart, Trophy, Star, Sparkles } from 'lucide-react'
import { Student, getRandomPair, getRandomStudent } from '@/utils/studentLoader'

interface VotingInterfaceProps {
  students: Student[]
  onVote: (winnerId: string) => void
}

export default function VotingInterface({ students, onVote }: VotingInterfaceProps) {
  const [currentPair, setCurrentPair] = useState<Student[]>([])
  const [votedStudent, setVotedStudent] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animatingStudent, setAnimatingStudent] = useState<string | null>(null)
  const isInitialized = useRef(false)

  // Initialize with two random students only once when component mounts
  useEffect(() => {
    if (students.length >= 2 && !isInitialized.current) {
      const randomPair = getRandomPair(students)
      setCurrentPair(randomPair)
      isInitialized.current = true
    }
  }, [students])

  const handleVote = (winnerId: string) => {
    setVotedStudent(winnerId)
    setShowConfetti(true)
    onVote(winnerId)
    
    // Keep the winner in their exact position, replace the loser
    const winnerIndex = currentPair.findIndex(s => s.id === winnerId)
    const loserId = currentPair.find(s => s.id !== winnerId)?.id
    
    if (loserId && winnerIndex !== -1) {
      const newStudent = getRandomStudent(students, [winnerId, loserId])
      if (newStudent) {
        // Create new pair maintaining winner's position
        const newPair = [...currentPair]
        newPair[winnerIndex] = currentPair[winnerIndex] // Keep winner in same position
        newPair[1 - winnerIndex] = newStudent // Replace loser with new student
        
        // Set animation state BEFORE updating the pair
        setAnimatingStudent(newStudent.id)
        
        // Update the pair
        setCurrentPair(newPair)
        
        // Clear animation after a delay
        setTimeout(() => {
          setAnimatingStudent(null)
        }, 2500)
      }
    }
    
    // Hide confetti after 2 seconds
    setTimeout(() => setShowConfetti(false), 2000)
    setTimeout(() => setVotedStudent(null), 1000)
  }

  if (currentPair.length < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ 
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: '32px',
          width: '32px',
          borderBottom: '2px solid #ec4899',
          margin: '0 auto 12px'
        }}></div>
        <p style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>Loading amazing students...</p>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #faf5ff, #fdf2f8, #eff6ff)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{ 
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{ 
          position: 'absolute',
          top: '60px',
          left: '40px',
          width: '60px',
          height: '60px',
          backgroundColor: '#fce7f3',
          borderRadius: '50%',
          opacity: 0.2,
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{ 
          position: 'absolute',
          top: '120px',
          right: '80px',
          width: '48px',
          height: '48px',
          backgroundColor: '#dbeafe',
          borderRadius: '50%',
          opacity: 0.3,
          animation: 'bounce 1s infinite'
        }}></div>
      </div>

      {/* Main Voting Interface - MOVED UP */}
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 16px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            color: '#111827',
            marginBottom: '8px',
            fontFamily: 'Montserrat, sans-serif'
                     }}>
            KP—Who's hotter?
          </h1>
          <p style={{ 
            color: '#4b5563',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Choose your favorite — the winner stays, the loser gets replaced.
          </p>
        </div>

        {/* BULLETPROOF Horizontal Layout Container - COMPACT */}
        <div style={{ 
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'nowrap',
          minHeight: '500px'
        }}>
          {/* Student 1 */}
          <div style={{ 
            position: 'relative',
            flexShrink: 0,
            width: '400px'
          }}>
            {/* Ultra-Visible Gradient Border for Voted Student */}
            {votedStudent === currentPair[0].id && (
              <div style={{
                background: 'linear-gradient(45deg, #ff0000, #ff4000, #ff8000, #ffbf00, #ffff00, #bfff00, #80ff00, #40ff00, #00ff00, #00ff40, #00ff80, #00ffbf, #00ffff, #00bfff, #0080ff, #0040ff, #0000ff, #4000ff, #8000ff, #bf00ff, #ff00ff, #ff00bf, #ff0080, #ff0040)',
                backgroundSize: '400% 400%',
                animation: 'gradientFlow 2s linear infinite',
                padding: '4px',
                borderRadius: '24px',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 255, 0, 0.3)',
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                right: '-4px',
                bottom: '-4px',
                zIndex: -1
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  width: '100%',
                  height: '100%'
                }}></div>
              </div>
            )}
            
            {/* Enhanced Floating Sparkles for Voted Student */}
            {votedStudent === currentPair[0].id && (
              <>
                <div style={{ 
                  position: 'absolute',
                  top: '-30px',
                  left: '-30px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2s ease-in-out infinite',
                  boxShadow: '0 0 12px rgba(255, 255, 0, 1), 0 0 24px rgba(255, 255, 0, 0.6)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  top: '-24px',
                  right: '-36px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#f472b6',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2.5s ease-in-out infinite 0.5s',
                  boxShadow: '0 0 10px rgba(255, 0, 255, 1), 0 0 20px rgba(255, 0, 255, 0.6)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-24px',
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#60a5fa',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2.2s ease-in-out infinite 1s',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 1), 0 0 20px rgba(0, 255, 255, 0.6)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  bottom: '-24px',
                  right: '-30px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#a78bfa',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2.8s ease-in-out infinite 1.5s',
                  boxShadow: '0 0 10px rgba(128, 0, 255, 1), 0 0 20px rgba(128, 0, 255, 0.6)'
                }}></div>
              </>
            )}

            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: votedStudent === currentPair[0].id ? '0 0 0 3px rgba(244, 114, 182, 0.3), 0 20px 40px -12px rgba(0, 0, 0, 0.25)' : '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'scale(1)',
              transition: 'all 0.5s ease',
              height: '500px',
              animation: animatingStudent === currentPair[0].id ? 'smoothSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ 
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 12px -3px rgba(0, 0, 0, 0.1)',
                  width: '350px',
                  height: '350px'
                }}>
                  <img 
                    src={currentPair[0].imageUrl} 
                    alt={currentPair[0].name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      animation: animatingStudent === currentPair[0].id ? 'gentleFadeIn 1.2s ease-out' : 'none'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentPair[0].name}&size=350&background=3b82f6&color=fff`
                    }}
                  />
                </div>
                {votedStudent === currentPair[0].id && (
                  <div style={{ 
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: '#ec4899',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '6px',
                    animation: 'bounce 1s infinite'
                  }}>
                    <Heart style={{ height: '18px', width: '18px', fill: 'currentColor' }} />
                  </div>
                )}
                {animatingStudent === currentPair[0].id && (
                  <div style={{ 
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, #f472b6, #a78bfa)',
                    opacity: 0,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'welcomeGlow 2s ease-out'
                  }}>
                    <div style={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      opacity: 0,
                      fontFamily: 'Montserrat, sans-serif',
                      animation: 'welcomeText 1.5s ease-out 0.3s forwards'
                    }}>
                      ✨ NEW CHALLENGER! ✨
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fixed height content area */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Trophy style={{ height: '16px', width: '16px', color: '#f59e0b', marginRight: '6px' }} />
                    <p style={{ 
                      color: '#ec4899',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      fontFamily: 'Montserrat, sans-serif'
                    }}>{currentPair[0].wins || 0} wins</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleVote(currentPair[0].id)}
                  style={{ 
                    background: 'linear-gradient(to right, #ec4899, #9333ea)',
                    color: 'white',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    transform: 'scale(1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    fontFamily: 'Montserrat, sans-serif',
                    padding: '16px 32px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -5px rgba(0, 0, 0, 0.04)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.background = 'linear-gradient(to right, #db2777, #7c3aed)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.background = 'linear-gradient(to right, #ec4899, #9333ea)'
                  }}
                >
                  <Heart style={{ height: '18px', width: '18px' }} />
                  <span>Vote</span>
                  <Sparkles style={{ height: '16px', width: '16px' }} />
                </button>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div style={{ 
            background: 'linear-gradient(to right, #ec4899, #9333ea, #2563eb)',
            color: 'white',
            fontWeight: '900',
            fontSize: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '150px'
          }}>
            VS
          </div>

          {/* Student 2 */}
          <div style={{ 
            position: 'relative',
            flexShrink: 0,
            width: '400px'
          }}>
            {/* Ultra-Visible Gradient Border for Voted Student */}
            {votedStudent === currentPair[1].id && (
              <div style={{
                background: 'linear-gradient(45deg, #ff0000, #ff4000, #ff8000, #ffbf00, #ffff00, #bfff00, #80ff00, #40ff00, #00ff00, #00ff40, #00ff80, #00ffbf, #00ffff, #00bfff, #0080ff, #0040ff, #0000ff, #4000ff, #8000ff, #bf00ff, #ff00ff, #ff00bf, #ff0080, #ff0040)',
                backgroundSize: '400% 400%',
                animation: 'gradientFlow 2s linear infinite',
                padding: '4px',
                borderRadius: '24px',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 255, 0, 0.3)',
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                right: '-4px',
                bottom: '-4px',
                zIndex: -1
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  width: '100%',
                  height: '100%'
                }}></div>
              </div>
            )}
            
            {/* Enhanced Floating Sparkles for Voted Student */}
            {votedStudent === currentPair[1].id && (
              <>
                <div style={{ 
                  position: 'absolute',
                  top: '-30px',
                  left: '-30px',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2s ease-in-out infinite',
                  boxShadow: '0 0 12px rgba(255, 255, 0, 1), 0 0 24px rgba(255, 255, 0, 0.6)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  top: '-24px',
                  right: '-36px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#f472b6',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2.5s ease-in-out infinite 0.5s',
                  boxShadow: '0 0 10px rgba(255, 0, 255, 1), 0 0 20px rgba(255, 0, 255, 0.6)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-24px',
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#60a5fa',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2.2s ease-in-out infinite 1s',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 1), 0 0 20px rgba(0, 255, 255, 0.6)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  bottom: '-24px',
                  right: '-30px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#a78bfa',
                  borderRadius: '50%',
                  animation: 'sparkleFloat 2.8s ease-in-out infinite 1.5s',
                  boxShadow: '0 0 10px rgba(128, 0, 255, 1), 0 0 20px rgba(128, 0, 255, 0.6)'
                }}></div>
              </>
            )}

            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: votedStudent === currentPair[1].id ? '0 0 0 3px rgba(244, 114, 182, 0.3), 0 20px 40px -12px rgba(0, 0, 0, 0.25)' : '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'scale(1)',
              transition: 'all 0.5s ease',
              height: '500px',
              animation: animatingStudent === currentPair[1].id ? 'smoothSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ 
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: 'linear-gradient(to bottom right, #dbeafe, #e9d5ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 12px -3px rgba(0, 0, 0, 0.1)',
                  width: '350px',
                  height: '350px'
                }}>
                  <img 
                    src={currentPair[1].imageUrl} 
                    alt={currentPair[1].name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      animation: animatingStudent === currentPair[1].id ? 'gentleFadeIn 1.2s ease-out' : 'none'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentPair[1].name}&size=350&background=3b82f6&color=fff`
                    }}
                  />
                </div>
                {votedStudent === currentPair[1].id && (
                  <div style={{ 
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: '#ec4899',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '6px',
                    animation: 'bounce 1s infinite'
                  }}>
                    <Heart style={{ height: '18px', width: '18px', fill: 'currentColor' }} />
                  </div>
                )}
                {animatingStudent === currentPair[1].id && (
                  <div style={{ 
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                    opacity: 0,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'welcomeGlow 2s ease-out'
                  }}>
                    <div style={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      opacity: 0,
                      fontFamily: 'Montserrat, sans-serif',
                      animation: 'welcomeText 1.5s ease-out 0.3s forwards'
                    }}>
                      ✨ NEW CHALLENGER! ✨
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fixed height content area */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Trophy style={{ height: '16px', width: '16px', color: '#f59e0b', marginRight: '6px' }} />
                    <p style={{ 
                      color: '#ec4899',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      fontFamily: 'Montserrat, sans-serif'
                    }}>{currentPair[1].wins || 0} wins</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleVote(currentPair[1].id)}
                  style={{ 
                    background: 'linear-gradient(to right, #3b82f6, #9333ea)',
                    color: 'white',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    transform: 'scale(1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    fontFamily: 'Montserrat, sans-serif',
                    padding: '16px 32px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -5px rgba(0, 0, 0, 0.04)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #9333ea)'
                  }}
                >
                  <Heart style={{ height: '18px', width: '18px' }} />
                  <span>Vote</span>
                  <Sparkles style={{ height: '16px', width: '16px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div style={{ 
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 40
        }}>
          <div style={{ 
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '6px',
            height: '6px',
            backgroundColor: '#ec4899',
            borderRadius: '50%',
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}></div>
          <div style={{ 
            position: 'absolute',
            top: '33%',
            right: '25%',
            width: '6px',
            height: '6px',
            backgroundColor: '#9333ea',
            borderRadius: '50%',
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.2s'
          }}></div>
          <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '33%',
            width: '6px',
            height: '6px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.4s'
          }}></div>
          <div style={{ 
            position: 'absolute',
            top: '67%',
            right: '33%',
            width: '6px',
            height: '6px',
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.6s'
          }}></div>
          <div style={{ 
            position: 'absolute',
            bottom: '25%',
            left: '50%',
            width: '6px',
            height: '6px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.8s'
          }}></div>
        </div>
      )}

      {/* Custom CSS for smooth animations and sparkling effects */}
      <style jsx>{`
        @keyframes smoothSlideIn {
          0% {
            transform: translateY(-30px) scale(0.95);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) scale(1.02);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes gentleFadeIn {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes welcomeGlow {
          0% {
            opacity: 0;
            background: linear-gradient(45deg, rgba(244, 114, 182, 0), rgba(168, 85, 247, 0));
          }
          30% {
            opacity: 0.4;
            background: linear-gradient(45deg, rgba(244, 114, 182, 0.3), rgba(168, 85, 247, 0.3));
          }
          70% {
            opacity: 0.6;
            background: linear-gradient(45deg, rgba(244, 114, 182, 0.4), rgba(168, 85, 247, 0.4));
          }
          100% {
            opacity: 0;
            background: linear-gradient(45deg, rgba(244, 114, 182, 0), rgba(168, 85, 247, 0));
          }
        }
        
        @keyframes welcomeText {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(1);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) scale(1.4);
            opacity: 1;
          }
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8,0,1,1);
          }
          50% {
            transform: none;
            animation-timing-function: cubic-bezier(0,0,0.2,1);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
