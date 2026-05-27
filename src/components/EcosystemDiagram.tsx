import type { CSSProperties } from 'react'
import './EcosystemDiagram.css'

const leftNodes = [
  { id: 'gov',  label: 'Government',    sub: 'Ministries & Treasury',    y: 27  },
  { id: 'mul',  label: 'Multilaterals', sub: 'WFP · PATH · Gates Fdn',   y: 103 },
  { id: 'priv', label: 'Private Sector', sub: 'FinTech & AgriTech',      y: 179 },
  { id: 'cso',  label: 'Civil Society', sub: 'NGOs & Communities',        y: 255 },
]

const rightNodes = [
  { id: 'nutr',    label: 'Nutrition',        sub: 'Fortification at scale',  y: 27  },
  { id: 'agri',    label: 'Agriculture',      sub: 'IDAT · AITS · GoviLab',  y: 103 },
  { id: 'health',  label: 'Health Systems',   sub: 'Policy & delivery',       y: 179 },
  { id: 'climate', label: 'Finance & Climate', sub: 'Inclusive economies',    y: 255 },
]

const NODE_W = 108
const NODE_H = 48
const LEFT_X  = 0
const RIGHT_X = 272
const CX = 190
const CY = 165
const HUB_R = 43

/** y-centre of a node */
const nc = (y: number) => y + NODE_H / 2

/** Bezier: left-node right-edge → hub left-edge */
const inPath = (y: number) => {
  const ay = nc(y)
  return `M ${LEFT_X + NODE_W} ${ay} C 150 ${ay}, 150 ${CY}, ${CX - HUB_R} ${CY}`
}

/** Bezier: hub right-edge → right-node left-edge */
const outPath = (y: number) => {
  const ay = nc(y)
  return `M ${CX + HUB_R} ${CY} C 250 ${CY}, 250 ${ay}, ${RIGHT_X} ${ay}`
}

type EcosystemDiagramProps = {
  className?: string
  animated?: boolean
}

export function EcosystemDiagram({ className = '', animated = true }: EcosystemDiagramProps) {
  return (
    <div
      className={`ecosystem${animated ? ' ecosystem--live' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <svg className="ecosystem__svg" viewBox="0 0 380 320" role="presentation">
        <defs>
          <linearGradient id="eco-hub-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d2137" />
            <stop offset="100%" stopColor="#1a3a52" />
          </linearGradient>
          <linearGradient id="eco-in-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a9e8f" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1a9e8f" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id="eco-out-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a9e8f" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#0fd4b5" stopOpacity="0.28" />
          </linearGradient>
          <marker id="eco-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="#0fd4b5" opacity="0.65" />
          </marker>
        </defs>

        {/* ── Input connection paths ── */}
        {leftNodes.map((n, i) => (
          <path
            key={`ip-${n.id}`}
            id={`eco-ip-${n.id}`}
            className="eco-path"
            style={{ '--eco-delay': `${i * 0.14}s` } as CSSProperties}
            d={inPath(n.y)}
            pathLength={1}
            fill="none"
            stroke="url(#eco-in-g)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {/* ── Output connection paths ── */}
        {rightNodes.map((n, i) => (
          <path
            key={`op-${n.id}`}
            id={`eco-op-${n.id}`}
            className="eco-path"
            style={{ '--eco-delay': `${i * 0.14 + 0.7}s` } as CSSProperties}
            d={outPath(n.y)}
            pathLength={1}
            fill="none"
            stroke="url(#eco-out-g)"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#eco-arr)"
          />
        ))}

        {/* ── Traveling dots on input paths ── */}
        {animated && leftNodes.map((n, i) => (
          <circle key={`id-${n.id}`} r="2.5" fill="#1a9e8f" opacity="0.9">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.6}s`}>
              <mpath href={`#eco-ip-${n.id}`} />
            </animateMotion>
          </circle>
        ))}

        {/* ── Traveling dots on output paths ── */}
        {animated && rightNodes.map((n, i) => (
          <circle key={`od-${n.id}`} r="2.5" fill="#0fd4b5" opacity="0.9">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.6 + 1.2}s`}>
              <mpath href={`#eco-op-${n.id}`} />
            </animateMotion>
          </circle>
        ))}

        {/* ── Hub: glow, spinning ring, core ── */}
        <circle cx={CX} cy={CY} r={HUB_R + 22} fill="rgba(26,158,143,0.07)" />
        <circle
          cx={CX} cy={CY} r={HUB_R + 11}
          className="eco-hub-ring"
          fill="none" stroke="#1a9e8f" strokeWidth="1"
          strokeDasharray="3 9" opacity="0.32"
        />
        <circle cx={CX} cy={CY} r={HUB_R} fill="url(#eco-hub-g)" />
        <circle cx={CX} cy={CY} r={HUB_R} fill="none" stroke="#1a9e8f" strokeWidth="1" opacity="0.45" />

        {/* Hub labels */}
        <text x={CX} y={CY - 11} textAnchor="middle" fill="white"
          fontSize="14" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif">CTC</text>
        <text x={CX} y={CY + 4} textAnchor="middle" fill="#1a9e8f"
          fontSize="6" fontWeight="600" letterSpacing="2">PLATFORM</text>
        <text x={CX} y={CY + 17} textAnchor="middle" fill="rgba(255,255,255,0.38)"
          fontSize="5.8">Convene · Catalyse</text>
        <text x={CX} y={CY + 28} textAnchor="middle" fill="rgba(255,255,255,0.38)"
          fontSize="5.8">Coordinate · Connect</text>

        {/* ── Left (input) nodes ── */}
        {leftNodes.map((n, i) => (
          <g key={n.id} className="eco-node" style={{ '--eco-node-delay': `${i * 0.1}s` } as CSSProperties}>
            <rect x={LEFT_X} y={n.y} width={NODE_W} height={NODE_H} rx={9}
              fill="white" stroke="#dce3ee" strokeWidth="1" />
            {/* navy left accent */}
            <rect x={LEFT_X} y={n.y + 9} width={3} height={NODE_H - 18} rx={1.5} fill="#0d2137" />
            <text x={LEFT_X + 11} y={n.y + 19} fontSize="8.5" fontWeight="600" fill="#0d2137"
              fontFamily="system-ui, -apple-system, sans-serif">{n.label}</text>
            <text x={LEFT_X + 11} y={n.y + 33} fontSize="7" fill="#7a8694"
              fontFamily="system-ui, -apple-system, sans-serif">{n.sub}</text>
            {/* anchor dot */}
            <circle cx={LEFT_X + NODE_W} cy={nc(n.y)} r="3" fill="#1a9e8f" />
          </g>
        ))}

        {/* ── Right (output) nodes ── */}
        {rightNodes.map((n, i) => (
          <g key={n.id} className="eco-node" style={{ '--eco-node-delay': `${i * 0.1 + 0.45}s` } as CSSProperties}>
            <rect x={RIGHT_X} y={n.y} width={NODE_W} height={NODE_H} rx={9}
              fill="white" stroke="#1a9e8f" strokeWidth="1" strokeOpacity="0.4" />
            {/* teal right accent */}
            <rect x={RIGHT_X + NODE_W - 3} y={n.y + 9} width={3} height={NODE_H - 18} rx={1.5} fill="#1a9e8f" />
            <text x={RIGHT_X + 9} y={n.y + 19} fontSize="8.5" fontWeight="600" fill="#0d2137"
              fontFamily="system-ui, -apple-system, sans-serif">{n.label}</text>
            <text x={RIGHT_X + 9} y={n.y + 33} fontSize="7" fill="#7a8694"
              fontFamily="system-ui, -apple-system, sans-serif">{n.sub}</text>
            {/* anchor dot */}
            <circle cx={RIGHT_X} cy={nc(n.y)} r="3" fill="#0fd4b5" />
          </g>
        ))}

        {/* ── Column labels ── */}
        <text x={LEFT_X + NODE_W / 2} y={313} textAnchor="middle"
          fill="#9ca8b4" fontSize="6" fontWeight="500" letterSpacing="0.08em"
          fontFamily="system-ui, -apple-system, sans-serif">INPUT STAKEHOLDERS</text>
        <text x={CX} y={313} textAnchor="middle"
          fill="#1a9e8f" fontSize="6" fontWeight="600" letterSpacing="0.08em"
          fontFamily="system-ui, -apple-system, sans-serif">CATALYST</text>
        <text x={RIGHT_X + NODE_W / 2} y={313} textAnchor="middle"
          fill="#9ca8b4" fontSize="6" fontWeight="500" letterSpacing="0.08em"
          fontFamily="system-ui, -apple-system, sans-serif">IMPACT AREAS</text>
      </svg>
    </div>
  )
}
