import { BoardPhoto } from '../components/BoardPhoto'
import { CtaCard } from '../components/CtaCard'
import { Reveal } from '../components/Reveal'
import { getPeopleData } from '../data/people'
import './Team.css'

export function Team() {
  const { board, leadership } = getPeopleData()

  return (
    <div className="team-page">
      <header className="team-hero">
        <div className="container team-hero__inner">
          <p className="section-label team-anim" style={{ animationDelay: '0.15s' }}>
            People
          </p>
          <h1 className="team-hero__title team-anim" style={{ animationDelay: '0.3s' }}>
            Governance and <em>leadership.</em>
          </h1>
          <p className="team-hero__sub team-anim" style={{ animationDelay: '0.45s' }}>
            The board sets direction; our leadership team delivers programmes on the ground.
          </p>
          <nav className="team-hero__jump team-anim" style={{ animationDelay: '0.55s' }} aria-label="On this page">
            <a href="#board">Board of directors</a>
            <a href="#leadership">Leadership team</a>
          </nav>
        </div>
      </header>

      <Reveal as="section" id="board" className="team-board section-pad">
        <div className="container">
          <p className="section-label">Governance</p>
          <h2 className="display-title team-section__headline">Board of directors.</h2>
          <p className="team-section__intro">
            Stewarding our mission and long-term direction — hover a portrait to read more.
          </p>

          <div className="board-grid">
            {board.map((member) => (
              <article
                key={member.name}
                className={`board-card${member.chairman ? ' board-card--chairman' : ''}`}
                tabIndex={0}
              >
                <div className="board-card__frame">
                  <BoardPhoto name={member.name} image={member.image} />
                  <div className="board-card__spotlight" aria-hidden="true" />
                  <div className="board-card__overlay">
                    <p className="board-card__bio">{member.bio}</p>
                  </div>
                </div>
                <div className="board-card__meta">
                  {member.chairman && <span className="board-card__badge">Chairman</span>}
                  <h3 className="board-card__name">{member.name}</h3>
                  <p className="board-card__role">{member.role}</p>
                  {member.subtitle && <p className="board-card__subtitle">{member.subtitle}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="leadership" className="team-leaders section-pad">
        <div className="container">
          <p className="section-label">Operations</p>
          <h2 className="display-title team-section__headline">Leadership team.</h2>
          <p className="team-section__intro">
            The people running programmes day to day — hover to expand their story.
          </p>

          <div className="leader-grid">
            {leadership.map((person, i) => (
              <article
                key={person.name}
                className={`leader-card${i % 2 === 0 ? ' leader-card--cream' : ' leader-card--white'}`}
                tabIndex={0}
              >
                <div className="leader-card__photo">
                  <BoardPhoto name={person.name} image={person.image} className="leader-card__avatar" />
                </div>
                <div className="leader-card__body">
                  <h3 className="leader-card__name">{person.name}</h3>
                  <p className="leader-card__role">{person.role}</p>
                  <div className="leader-card__expand">
                    <p className="leader-card__bio">{person.bio}</p>
                  </div>
                </div>
                <span className="leader-card__hint" aria-hidden="true">
                  +
                </span>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <CtaCard
        label="Work with us"
        title="Ready to build something bigger?"
        body="We partner with governments, development agencies and institutions to design and deliver initiatives at scale."
        buttonText="Start a conversation"
        trackLocation="team_cta"
      />
    </div>
  )
}
