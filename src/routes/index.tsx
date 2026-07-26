import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'

// ============================================================
//  PORTFOLIO CONFIG — Edit everything here!
// ============================================================

const DEVELOPER = {
  handle: 'Buca‘s Domain',
  realName: 'Buca‘s Domain',
  title: 'Minecraft Developer & VPS and Hosting Provider',
  bio: `Hey, My name is Buca - I‘m 16 years old from the Netherlands.
I can do many things. I am currently open for comissions,
so feel free to contact me for your Server!
My username is ActualBuca on all platforms, reach out if u want.`,
  location: 'Sector 7-G, The Grid',
  available: true,
}

const PAST_SERVERS = [
  {
    name: 'EclipseSMP',
    role: 'Owner',
    period: '2026',
    serverIp: 'play.eclipsesmp.net',
    playerPeak: '80 concurrent',
    description:
      'Maintaned the Server, Retired due to innsuficient funds.',
    tags: ['Economy', 'Lifesteal', 'Pvp', 'Betrayals', 'Anarchy'],
    status: 'retired',
  },
  {
    name: 'TurtleSMP',
    role: 'Owner',
    period: '2026',
    serverIp: 'play.turtlesmp.net',
    playerPeak: '122 concurrent',
    description:
      'Creating, and configurating the Server Plugins and more.',
    tags: ['Economy', 'PvP', 'Duels', 'Network'],
    status: 'active',
  },
  {
    name: 'MonkeyVanilla',
    role: 'Developer',
    period: '2026',
    serverIp: 'play.monkeyvanilla.net',
    playerPeak: '0 concurrent',
    description:
      'Developing and configurating their plugins, not out yet.',
    tags: ['Economy', 'PvP', 'Survival'],
    status: 'active',
  },
  {
    name: 'UnstableFFA',
    role: 'Developer',
    period: '2026',
    serverIp: 'play.unstableffa.net',
    playerPeak: '460 concurrent',
    description:
      'Installing and creating new plugins for the server and developing the anticheat.',
    tags: ['Unstable', 'FFA', 'PvP', 'Kits'],
    status: 'retired',
  },
  {
    name: 'CromeVanilla',
    role: 'Owner',
    period: '2026',
    serverIp: 'play.cromevanilla.net',
    playerPeak: '0 concurrent',
    description:
      'Building and configurating a fresh Vanilla experience, not out yet.',
    tags: ['Vanilla', 'Survival'],
    status: 'active',
  },
  {
    name: 'LuxSMP',
    role: 'Owner',
    period: '2026',
    serverIp: 'play.luxsmp.net',
    playerPeak: '0 concurrent',
    description:
      'Setting up plugins and world configuration for the upcoming launch.',
    tags: ['Economy', 'SMP', 'Survival'],
    status: 'active',
  },
  {
    name: 'BlazeSMP',
    role: 'Owner',
    period: '2026',
    serverIp: 'play.blazesmp.net',
    playerPeak: '0 concurrent',
    description:
      'Developing custom plugins and anticheat ahead of the server opening.',
    tags: ['PvP', 'SMP', 'Kits'],
    status: 'active',
  },
  {
    name: 'CoreSMP',
    role: 'Owner',
    period: '2026',
    serverIp: 'play.coresmp.net',
    playerPeak: '0 concurrent',
    description:
      'Building the core plugin suite and network infrastructure, not out yet.',
    tags: ['Economy', 'Network', 'Survival'],
    status: 'active',
  },
]

const SERVICES = [
  {
    icon: '⬡',
    name: 'Custom Plugin Development',
    description:
      'Building requested custom plugins, prices may increase depending on how much work it requires.',
    price: 'From $6,50',
  },
  {
    icon: '◈',
    name: 'Server Setups',
    description:
      'Fully made Server Setup ready to be used on your Server.',
    price: 'From $15',
  },
  {
    icon: '◉',
    name: 'Server management',
    description:
      'I will find new Staff, Developers and manage the community server. Could be voluntary so slide me an dm.',
    price: 'From $10',
  },
  {
    icon: '◆',
    name: 'Server Development',
    description:
      'Working for your Server / Network fulltime, Custom plugins cost 5$ per month and are not included standard.',
    price: 'From $10/m',
  },
  {
    icon: '◇',
    name: 'Server Moderation',
    description:
      'Professionally moderating on your Server / Network or Community Server for 40 hours a week',
    price: 'From $5/m',
  },
  {
    icon: '△',
    name: 'Server Marketing',
    description:
      'Promoting your Server accross social media, Multiple Content Creators will creat an video about your server promoting it.',
    price: 'From $50',
  },
]

// ============================================================
//  UFO Component — bounces like a screensaver
// ============================================================

function UFO() {
  const posRef = useRef({ x: 80, y: 80 })
  const velRef = useRef({ vx: 1.4, vy: 0.9 })
  const animRef = useRef<number>(0)
  const elRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<{ x: number; y: number } | null>(null)
  const [, forceRender] = useState(0)

  const SIZE = 56

  const tick = useCallback(() => {
    const el = elRef.current
    if (!el) {
      animRef.current = requestAnimationFrame(tick)
      return
    }
    const W = window.innerWidth - SIZE
    const H = window.innerHeight - SIZE

    // If moving toward a click-target, lerp smoothly
    if (targetRef.current) {
      const { x: tx, y: ty } = targetRef.current
      const dx = tx - posRef.current.x
      const dy = ty - posRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3) {
        targetRef.current = null
        // Convert lerp position into proper bouncing velocity
        velRef.current.vx = (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 0.8)
        velRef.current.vy = (Math.random() > 0.5 ? 1 : -1) * (0.7 + Math.random() * 0.6)
      } else {
        const speed = 4
        posRef.current.x += (dx / dist) * speed
        posRef.current.y += (dy / dist) * speed
      }
    } else {
      // Normal screensaver bounce
      posRef.current.x += velRef.current.vx
      posRef.current.y += velRef.current.vy

      if (posRef.current.x >= W) {
        posRef.current.x = W
        velRef.current.vx = -Math.abs(velRef.current.vx)
      } else if (posRef.current.x <= 0) {
        posRef.current.x = 0
        velRef.current.vx = Math.abs(velRef.current.vx)
      }

      if (posRef.current.y >= H) {
        posRef.current.y = H
        velRef.current.vy = -Math.abs(velRef.current.vy)
      } else if (posRef.current.y <= 0) {
        posRef.current.y = 0
        velRef.current.vy = Math.abs(velRef.current.vy)
      }
    }

    el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
    animRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [tick])

  const handleClick = () => {
    const W = window.innerWidth - SIZE - 40
    const H = window.innerHeight - SIZE - 40
    targetRef.current = {
      x: 20 + Math.random() * W,
      y: 20 + Math.random() * H,
    }
    forceRender(n => n + 1)
  }

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        zIndex: 9998,
        willChange: 'transform',
        userSelect: 'none',
      }}
      onClick={handleClick}
      title="Click me!"
    >
      <svg
        className="ufo-svg"
        width={SIZE}
        height={SIZE}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow base */}
        <ellipse cx="28" cy="38" rx="18" ry="5" fill="rgba(220,38,38,0.18)" />
        {/* Beam */}
        <polygon points="20,38 36,38 32,52 24,52" fill="rgba(220,38,38,0.10)" />
        <polygon points="22,38 34,38 31,50 25,50" fill="rgba(220,38,38,0.08)" />
        {/* Body shadow */}
        <ellipse cx="28" cy="33" rx="17" ry="8" fill="#1a0000" />
        {/* Body */}
        <ellipse cx="28" cy="32" rx="16" ry="7" fill="#1f0505" stroke="#dc2626" strokeWidth="1" />
        {/* Dome */}
        <ellipse cx="28" cy="28" rx="9" ry="7" fill="#200808" stroke="#ef4444" strokeWidth="0.8" />
        {/* Dome glass sheen */}
        <ellipse cx="26" cy="25" rx="4" ry="3" fill="rgba(239,68,68,0.12)" />
        {/* Running lights */}
        <circle cx="14" cy="33" r="2" fill="#dc2626" />
        <circle cx="20" cy="36" r="1.5" fill="#ef4444" />
        <circle cx="28" cy="38" r="1.5" fill="#ef4444" />
        <circle cx="36" cy="36" r="1.5" fill="#ef4444" />
        <circle cx="42" cy="33" r="2" fill="#dc2626" />
        {/* Alien eyes */}
        <ellipse cx="25" cy="27" rx="2" ry="2.5" fill="#dc2626" opacity="0.9" />
        <ellipse cx="31" cy="27" rx="2" ry="2.5" fill="#dc2626" opacity="0.9" />
        <circle cx="25" cy="27" r="1" fill="#ff0000" />
        <circle cx="31" cy="27" r="1" fill="#ff0000" />
      </svg>
    </div>
  )
}

// ============================================================
//  Star Field Component
// ============================================================

function StarField() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.6 + 0.1,
    animDelay: Math.random() * 5,
  }))

  return (
    <div className="stars" aria-hidden="true">
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {stars.map(s => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill="white"
            opacity={s.opacity}
            style={{
              animation: `red-pulse ${2 + s.animDelay}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// ============================================================
//  Main Portfolio Page
// ============================================================

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  return (
    <div className="scanlines" style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative' }}>
      <StarField />
      <UFO />

      {/* NAV */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(220,38,38,0.2)',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        <span style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 800,
          fontSize: '1rem',
          color: '#ef4444',
          letterSpacing: '0.1em',
          textShadow: '0 0 12px rgba(239,68,68,0.7)',
        }}>
          {DEVELOPER.handle}
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['about', 'servers', 'services'].map(s => (
            <a
              key={s}
              href={`#${s}`}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
            >
              {s}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        position: 'relative',
        zIndex: 1,
        padding: '6rem 2rem 4rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <p className="section-label" style={{ marginBottom: '1rem' }}>// initialized</p>
        <h1 className="glitch-text" style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 900,
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          lineHeight: 1.05,
          color: '#f0f0f0',
          textShadow: '0 0 30px rgba(220,38,38,0.4)',
          marginBottom: '0.5rem',
        }}>
          {DEVELOPER.handle}
        </h1>
        <h2 style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: '#ef4444',
          letterSpacing: '0.08em',
          marginBottom: '1.5rem',
        }}>
          {DEVELOPER.title}
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.75rem',
            color: '#4b5563',
            letterSpacing: '0.1em',
          }}>
            LOC: {DEVELOPER.location}
          </span>
          {DEVELOPER.available && (
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.7rem',
              color: '#22c55e',
              letterSpacing: '0.12em',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                display: 'inline-block',
                animation: 'red-pulse 2s infinite',
              }} />
              AVAILABLE_FOR_HIRE
            </span>
          )}
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* ABOUT */}
        <section id="about" style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p className="section-label">01 / about</p>
            <div className="section-divider" style={{ flex: 1 }} />
          </div>

          <div className="border-glow card-clip" style={{
            background: '#111111',
            padding: '2rem',
            position: 'relative',
          }}>
            {/* Corner decoration */}
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '24px',
              height: '24px',
              borderTop: '2px solid #dc2626',
              borderRight: '2px solid #dc2626',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid #dc2626',
              borderLeft: '2px solid #dc2626',
            }} />

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <img
                  src="/profile-picture.jpg"
                  alt="BU profile picture"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '4px',
                    border: '2px solid #dc2626',
                    boxShadow: '0 0 20px rgba(220,38,38,0.3)',
                    display: 'block',
                    objectFit: 'cover',
                    marginBottom: '1.5rem',
                  }}
                />
                <p style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#f0f0f0',
                  marginBottom: '0.25rem',
                }}>
                  {DEVELOPER.realName}
                </p>
                <p style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.72rem',
                  color: '#dc2626',
                  letterSpacing: '0.1em',
                }}>
                  {DEVELOPER.title}
                </p>
              </div>
              <div style={{ flex: 2, minWidth: '240px' }}>
                <p style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: '#d1d5db',
                  whiteSpace: 'pre-line',
                }}>
                  {DEVELOPER.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAST SERVERS */}
        <section id="servers" style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p className="section-label">02 / past servers</p>
            <div className="section-divider" style={{ flex: 1 }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '1.25rem',
          }}>
            {PAST_SERVERS.map((server) => (
              <ServerCard key={server.name} server={server} />
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p className="section-label">03 / services</p>
            <div className="section-divider" style={{ flex: 1 }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}>
            {SERVICES.map((svc) => (
              <ServiceCard key={svc.name} service={svc} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: '1px solid rgba(220,38,38,0.15)',
          padding: '2rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.7rem',
            color: '#374151',
            letterSpacing: '0.1em',
          }}>
            © {new Date().getFullYear()} {DEVELOPER.handle} — ALL SYSTEMS NOMINAL
          </span>
          <span style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.65rem',
            color: '#dc2626',
            letterSpacing: '0.05em',
            opacity: 0.6,
          }}>
            SYS::BUILD_v2.4.1_STABLE
          </span>
        </footer>

      </div>
    </div>
  )
}

// ── Server Card ──

type Server = typeof PAST_SERVERS[number]

function ServerCard({ server }: { server: Server }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="card-clip hover-lift"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#161616' : '#111111',
        border: `1px solid ${hovered ? 'rgba(220,38,38,0.6)' : 'rgba(220,38,38,0.18)'}`,
        boxShadow: hovered
          ? 'inset 0 0 30px rgba(220,38,38,0.07), 0 0 20px rgba(220,38,38,0.12)'
          : 'inset 0 0 20px rgba(220,38,38,0.03)',
        padding: '1.5rem',
        position: 'relative',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.2s',
      }}
    >
      {/* Status dot */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: server.status === 'active' ? '#22c55e' : '#4b5563',
          boxShadow: server.status === 'active' ? '0 0 8px #22c55e' : 'none',
          display: 'inline-block',
        }} />
        <span style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.6rem',
          color: server.status === 'active' ? '#22c55e' : '#4b5563',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {server.status}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 700,
        fontSize: '0.95rem',
        color: '#f0f0f0',
        marginBottom: '0.2rem',
        paddingRight: '4rem',
      }}>
        {server.name}
      </h3>
      <p style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.68rem',
        color: '#dc2626',
        letterSpacing: '0.08em',
        marginBottom: '0.75rem',
      }}>
        {server.role} · {server.period}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        marginBottom: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.68rem',
          color: '#ef4444',
          letterSpacing: '0.05em',
        }}>
          IP: {server.serverIp}
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '0.85rem',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.62rem',
          color: '#6b7280',
          letterSpacing: '0.05em',
        }}>
          PEAK: {server.playerPeak}
        </span>
      </div>

      <p style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '0.95rem',
        fontWeight: 400,
        lineHeight: 1.6,
        color: '#9ca3af',
        marginBottom: '1rem',
      }}>
        {server.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {server.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.6rem',
            padding: '0.2rem 0.5rem',
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.25)',
            color: '#dc2626',
            letterSpacing: '0.05em',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Service Card ──

type Service = typeof SERVICES[number]

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="hover-lift"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#161616' : '#111111',
        border: `1px solid ${hovered ? 'rgba(220,38,38,0.5)' : 'rgba(220,38,38,0.15)'}`,
        boxShadow: hovered ? '0 0 20px rgba(220,38,38,0.1)' : 'none',
        padding: '1.5rem',
        position: 'relative',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.2s',
      }}
    >
      <div style={{
        fontFamily: 'monospace',
        fontSize: '1.6rem',
        color: '#dc2626',
        textShadow: '0 0 12px rgba(220,38,38,0.6)',
        marginBottom: '0.75rem',
        lineHeight: 1,
      }}>
        {service.icon}
      </div>
      <h3 style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 600,
        fontSize: '0.8rem',
        color: '#f0f0f0',
        marginBottom: '0.6rem',
        letterSpacing: '0.05em',
      }}>
        {service.name}
      </h3>
      <p style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '0.92rem',
        fontWeight: 400,
        lineHeight: 1.6,
        color: '#9ca3af',
        marginBottom: '1rem',
        flex: 1,
      }}>
        {service.description}
      </p>
      <div style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.7rem',
        color: '#ef4444',
        letterSpacing: '0.08em',
        borderTop: '1px solid rgba(220,38,38,0.15)',
        paddingTop: '0.75rem',
      }}>
        {service.price}
      </div>
    </div>
  )
}
