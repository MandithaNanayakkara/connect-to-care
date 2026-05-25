type SectionIntroProps = {
  label: string
  title: string
  titleLight?: boolean
  accent?: string
  aside?: string
}

export function SectionIntro({ label, title, titleLight, accent, aside }: SectionIntroProps) {
  const titleParts = accent ? title.split(accent) : null

  return (
    <header className={`section-intro${aside ? ' section-intro--split' : ''}`}>
      <div className="section-intro__main">
        <p className="section-label">{label}</p>
        <h2 className={`display-title${titleLight ? ' display-title--light' : ''}`}>
          {titleParts ? (
            <>
              {titleParts[0]}
              <em>{accent}</em>
              {titleParts[1]}
            </>
          ) : (
            title
          )}
        </h2>
      </div>
      {aside && <p className="section-intro__aside">{aside}</p>}
    </header>
  )
}
