'use client'

import { useState } from 'react'
import { Trophy, Medal, Award, Crown, Star, Users, Zap, ArrowUp, ArrowDown, Sparkles } from 'lucide-react'

interface Student {
  id: string
  name: string
  classYear: string
  wins: number
  imageUrl: string
}

interface LeaderboardProps {
  students: Student[]
}

export default function Leaderboard({ students }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'top' | 'recent'>('all')
  const sortedStudents = [...students].sort((a, b) => (b.wins || 0) - (a.wins || 0))

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-8 w-8 text-yellow-500" />
      case 1:
        return <Crown className="h-7 w-7 text-gray-400" />
      case 2:
        return <Crown className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
    }
  }

  const getRankChange = (index: number) => {
    // Simulate rank changes for demo
    const changes = ['up', 'down', 'same']
    return changes[index % 3]
  }

  const getTopThree = () => sortedStudents.slice(0, 3)
  const getRestOfStudents = () => sortedStudents.slice(3, 10)

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #fef3c7, #fed7aa, #fde68a)',
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
          top: '10%',
          left: '5%',
          width: '60px',
          height: '60px',
          backgroundColor: 'rgba(251, 191, 36, 0.3)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{ 
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite 2s'
        }}></div>
        <div style={{ 
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '50px',
          height: '50px',
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          borderRadius: '50%',
          animation: 'float 7s ease-in-out infinite 4s'
        }}></div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Trophy style={{ height: '32px', width: '32px', color: '#f59e0b', marginRight: '12px' }} />
            <h1 style={{ 
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #f59e0b, #d97706, #b45309)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Leaderboard
            </h1>
            <Sparkles style={{ height: '28px', width: '28px', color: '#f59e0b', marginLeft: '12px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          </div>
          <p style={{ 
            color: '#92400e',
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: 'Montserrat, sans-serif'
          }}>See who's leading the Kaospilot community!</p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '16px',
          padding: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          {[
            { id: 'all', label: 'All Students', icon: Users },
            { id: 'top', label: 'Top Performers', icon: Crown },
            { id: 'recent', label: 'Recent Activity', icon: Zap }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
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
                background: activeTab === id 
                  ? 'linear-gradient(to right, #f59e0b, #d97706)' 
                  : 'transparent',
                color: activeTab === id ? 'white' : '#92400e',
                boxShadow: activeTab === id 
                  ? '0 4px 8px -2px rgba(245, 158, 11, 0.3)' 
                  : 'none',
                transform: activeTab === id ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <Icon style={{ height: '18px', width: '18px' }} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {getTopThree().length > 0 && (
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            gap: '20px',
            marginBottom: '40px',
            position: 'relative'
          }}>
            {/* Confetti around top 3 */}
            <div style={{ 
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px'
            }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: ['#f59e0b', '#fbbf24', '#fde047', '#a3e635', '#34d399', '#60a5fa'][i],
                    borderRadius: '50%',
                    animation: `confetti 2s ease-in-out infinite ${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            {/* 2nd Place */}
            {getTopThree()[1] && (
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(20px)',
                minWidth: '140px'
              }}>
                <div style={{ 
                  position: 'relative',
                  marginBottom: '12px'
                }}>
                  <div style={{ 
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #9ca3af',
                    boxShadow: '0 4px 8px -2px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src={getTopThree()[1].imageUrl} 
                      alt={getTopThree()[1].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${getTopThree()[1].name}&size=80&background=9ca3af&color=fff`
                      }}
                    />
                  </div>
                  <div style={{ 
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'linear-gradient(to right, #9ca3af, #6b7280)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    2
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#374151',
                  margin: '0 0 4px 0',
                  fontFamily: 'Montserrat, sans-serif'
                }}>{getTopThree()[1].name}</h3>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  <Trophy style={{ height: '14px', width: '14px' }} />
                  <span style={{ fontWeight: '600' }}>{getTopThree()[1].wins || 0} wins</span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {getTopThree()[0] && (
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 20px 40px -10px rgba(245, 158, 11, 0.3)',
                border: '3px solid #f59e0b',
                minWidth: '160px',
                position: 'relative'
              }}>
                <Crown style={{ 
                  height: '32px', 
                  width: '32px', 
                  color: '#f59e0b',
                  marginBottom: '8px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }} />
                <div style={{ 
                  position: 'relative',
                  marginBottom: '16px'
                }}>
                  <div style={{ 
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid #f59e0b',
                    boxShadow: '0 8px 16px -4px rgba(245, 158, 11, 0.4)'
                  }}>
                    <img 
                      src={getTopThree()[0].imageUrl} 
                      alt={getTopThree()[0].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${getTopThree()[0].name}&size=100&background=f59e0b&color=fff`
                      }}
                    />
                  </div>
                  <div style={{ 
                    position: 'absolute',
                    top: '-12px',
                    right: '-12px',
                    background: 'linear-gradient(to right, #f59e0b, #d97706)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px -2px rgba(245, 158, 11, 0.4)'
                  }}>
                    1
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#92400e',
                  margin: '0 0 6px 0',
                  fontFamily: 'Montserrat, sans-serif'
                }}>{getTopThree()[0].name}</h3>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#b45309',
                  fontSize: '16px'
                }}>
                  <Trophy style={{ height: '16px', width: '16px' }} />
                  <span style={{ fontWeight: '700' }}>{getTopThree()[0].wins || 0} wins</span>
                  <ArrowUp style={{ height: '14px', width: '14px', color: '#10b981' }} />
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {getTopThree()[2] && (
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(20px)',
                minWidth: '140px'
              }}>
                <div style={{ 
                  position: 'relative',
                  marginBottom: '12px'
                }}>
                  <div style={{ 
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #d97706',
                    boxShadow: '0 4px 8px -2px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src={getTopThree()[2].imageUrl} 
                      alt={getTopThree()[2].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${getTopThree()[2].name}&size=80&background=d97706&color=fff`
                      }}
                    />
                  </div>
                  <div style={{ 
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'linear-gradient(to right, #d97706, #b45309)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    3
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#374151',
                  margin: '0 0 4px 0',
                  fontFamily: 'Montserrat, sans-serif'
                }}>{getTopThree()[2].name}</h3>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  <Trophy style={{ height: '14px', width: '14px' }} />
                  <span style={{ fontWeight: '600' }}>{getTopThree()[2].wins || 0} wins</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rest of the Leaderboard */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '20px',
            fontFamily: 'Montserrat, sans-serif'
          }}>All Rankings</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {getRestOfStudents().map((student, index) => {
              const actualRank = index + 4
              const rankChange = getRankChange(index)
              
              return (
                <div
                  key={student.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flex: 1
                  }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      minWidth: '60px'
                    }}>
                      <span style={{ 
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#6b7280',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{actualRank}</span>
                      {rankChange === 'up' && <ArrowUp style={{ height: '16px', width: '16px', color: '#10b981' }} />}
                      {rankChange === 'down' && <ArrowDown style={{ height: '16px', width: '16px', color: '#ef4444' }} />}
                    </div>
                    
                    <div style={{ 
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #f59e0b',
                      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                      <img 
                        src={student.imageUrl} 
                        alt={student.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${student.name}&size=48&background=f59e0b&color=fff`
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 4px 0',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{student.name}</h3>
                      <p style={{ 
                        fontSize: '14px',
                        color: '#6b7280',
                        margin: 0
                      }}>{student.classYear}</p>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#f59e0b',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      <Trophy style={{ height: '16px', width: '16px' }} />
                      <span>{student.wins || 0} wins</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes confetti {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .7;
          }
        }
      `}</style>
    </div>
  )
}
