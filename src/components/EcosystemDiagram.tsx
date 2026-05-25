import type { CSSProperties } from 'react'
import { LogoMark } from './LogoMark'
import './EcosystemDiagram.css'

type NodePosition = 'top' | 'left' | 'right' | 'bottom-left' | 'bottom-right'

type EcosystemNode = {
  id: string
  label: string
  position: NodePosition
  /** SVG anchor (viewBox 0–400) */
  anchor: { x: number; y: number }
}

const nodes: EcosystemNode[] = [
  { id: 'gov', label: 'Governments', position: 'top', anchor: { x: 200, y: 58 } },
  { id: 'fund', label: 'Funders', position: 'left', anchor: { x: 58, y: 188 } },
  { id: 'impl', label: 'Implementers', position: 'right', anchor: { x: 342, y: 188 } },
  { id: 'data', label: 'Data & DPI', position: 'bottom-left', anchor: { x: 108, y: 342 } },
  { id: 'impact', label: 'Impact', position: 'bottom-right', anchor: { x: 292, y: 342 } },
]

const CENTER = { x: 200, y: 200 }

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
      <svg className="ecosystem__svg" viewBox="0 0 400 400" role="presentation">
        <defs>
          <linearGradient id="ecosystem-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--teal)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--teal-bright)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <circle className="ecosystem__ring ecosystem__ring--outer" cx={CENTER.x} cy={CENTER.y} r="148" />
        <circle className="ecosystem__ring ecosystem__ring--inner" cx={CENTER.x} cy={CENTER.y} r="118" />

        {nodes.map((node, i) => (
          <path
            key={node.id}
            className="ecosystem__link"
            style={{ '--link-delay': `${i * 0.12}s` } as CSSProperties}
            d={`M ${CENTER.x} ${CENTER.y} Q ${(CENTER.x + node.anchor.x) / 2} ${(CENTER.y + node.anchor.y) / 2 - 20} ${node.anchor.x} ${node.anchor.y}`}
            pathLength={1}
            fill="none"
            stroke="url(#ecosystem-line)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {nodes.map((node, i) => (
          <circle
            key={`${node.id}-dot`}
            className="ecosystem__anchor"
            style={{ '--link-delay': `${i * 0.12 + 0.2}s` } as CSSProperties}
            cx={node.anchor.x}
            cy={node.anchor.y}
            r="4"
          />
        ))}
      </svg>

      <div className="ecosystem__hub">
        <span className="ecosystem__hub-glow" aria-hidden="true" />
        <span className="ecosystem__hub-ring" aria-hidden="true" />
        <div className="ecosystem__hub-core">
          <LogoMark variant="mark" className="ecosystem__logo" />
          <span className="ecosystem__hub-role">Catalyst</span>
        </div>
      </div>

      {nodes.map((node, i) => (
        <div
          key={node.id}
          className={`ecosystem__node ecosystem__node--${node.position}`}
          style={{ '--node-delay': `${i * 0.1}s` } as CSSProperties}
        >
          <span className="ecosystem__node-icon" aria-hidden="true" />
          <span className="ecosystem__node-label">{node.label}</span>
        </div>
      ))}
    </div>
  )
}
