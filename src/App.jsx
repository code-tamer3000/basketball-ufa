import { useEffect, useState } from 'react'
import { Clock3, MapPin, MessageCircle, Pause, Phone, Play, Trophy } from 'lucide-react'
import gamePhoto from './assets/game.jpg'
import coachPhoto from './assets/coach.jpg'
import groupPhoto from './assets/coach-group.jpg'
import awardsPhoto from './assets/coach-awards.jpg'

const coachName = 'Кучин Степан Алексеевич'
const phone = { label: '+7 917 800 05 64', href: 'tel:+79178000564' }
const telegram = { label: '@stepaa7', href: 'https://t.me/stepaa7' }
const maxHref = 'https://max.ru/u/f9LHodD0cOLgz5w6X0zvnJI3F5X1z51sDLuHzgE8pCDzkQQY9ab50r-lFEo'
const heroPhotos = [
  { src: gamePhoto, alt: 'Степан ведёт мяч в форме «Уфимца» под номером 66' },
  { src: coachPhoto, alt: 'Степан в синей форме «Уфимца» на баскетбольной площадке' },
]
const sessions = [
  { duration: '1 час', price: '1 189' },
  { duration: '1,5 часа', price: '1 489' },
  { duration: '2 часа', price: '1 789' },
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Баскетбол Уфа — на главную">
      <span className="brand-ball" aria-hidden="true"><span /></span>
      <span>БАСКЕТБОЛ<span className="brand-city">УФА</span></span>
    </a>
  )
}

function BookLink({ children, duration, className = '', icon: Icon }) {
  return (
    <a
      className={`button ${className}`}
      href={maxHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={duration ? `Выбрать в MAX тренировку на ${duration}` : undefined}
    >
      {Icon && <Icon size={17} aria-hidden="true" />}
      {children}
    </a>
  )
}

function HeroGallery() {
  const [active, setActive] = useState(0)
  const [rotating, setRotating] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    function respectMotionPreference(event) {
      if (event.matches) setRotating(false)
    }
    motion.addEventListener('change', respectMotionPreference)
    return () => motion.removeEventListener('change', respectMotionPreference)
  }, [])

  useEffect(() => {
    if (!rotating || hovered) return
    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % heroPhotos.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [hovered, rotating])

  return (
    <div className="hero-gallery" role="group" aria-label="Фотографии из «Уфимца»"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="hero-image" aria-live={rotating ? 'off' : 'polite'}>
        {heroPhotos.map(({ src, alt }, index) => (
          <div className={`hero-slide${index === active ? ' is-active' : ''}`} key={src} aria-hidden={index !== active}>
            <img src={src} alt={alt} width="1280" height="852" fetchPriority={index === 0 ? 'high' : undefined} />
          </div>
        ))}
      </div>
      <div className="hero-photo-tools">
        <div className="hero-caption"><span>БК «Уфимец»</span><span>Сезон 2024–2025</span></div>
        <div className="hero-controls" role="group" aria-label="Переключение фотографий">
          <button className="hero-control" type="button" onClick={() => setRotating(value => !value)}
            aria-label={rotating ? 'Остановить смену фото' : 'Включить смену фото'}>
            {rotating ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          </button>
          {heroPhotos.map(({ src }, index) => (
            <button className="hero-control hero-dot" key={src} type="button"
              aria-label={`Фото ${index + 1}`} aria-pressed={index === active}
              onFocus={() => setRotating(false)}
              onClick={() => {
                setRotating(false)
                setActive(index)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">К содержанию</a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="nav" aria-label="Разделы сайта">
            <a href="#coach">О тренере</a>
            <a href="#training">Тренировки</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <BookLink className="button-header">Записаться</BookLink>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div className="hero-content">
              <div className="eyebrow hero-eyebrow"><MapPin size={16} aria-hidden="true" /> Уфа <span /> Для детей</div>
              <h1 id="hero-title">Баскетбольные <em>тренировки</em></h1>
              <p className="hero-name">{coachName}</p>
              <blockquote className="hero-quote">
                «Строгость к себе сегодня — преимущество завтра. Стремлюсь показывать детям баскетбол таким, какой он есть на самом деле».
              </blockquote>
              <BookLink icon={MessageCircle} className="button-primary">Записаться в MAX</BookLink>
            </div>
          </div>
          <HeroGallery />
        </section>

        <div className="stats">
          <dl className="container stats-inner" aria-label="Игровой и тренерский опыт">
            <div className="stat">
              <dt>лет в баскетболе</dt>
              <dd>15<span>+</span></dd>
            </div>
            <div className="stat">
              <dt>года тренирую детей</dt>
              <dd>2,5</dd>
            </div>
            <div className="stat">
              <dt>номер на площадке</dt>
              <dd>1<span>-й</span></dd>
            </div>
          </dl>
        </div>

        <section className="coach section" id="coach" aria-labelledby="coach-title">
          <div className="container coach-inner">
            <div className="coach-photos">
              <img src={groupPhoto} width="1280" height="960" alt="Групповое фото с тренером в баскетбольном зале" loading="lazy" />
              <img src={awardsPhoto} width="1280" height="960" alt="Групповое фото с дипломами и наградами на площадке" loading="lazy" />
            </div>
            <div className="coach-content">
              <h2 id="coach-title">О тренере</h2>
              <p className="coach-name">{coachName}</p>
              <p className="coach-bio">Я выпускник СШОР № 2. В сезоне 2024–2025 выступал за «Уфимец». Всю игровую карьеру провёл на позиции разыгрывающего.</p>
              <div className="achievements">
                <Trophy size={25} aria-hidden="true" />
                <div>
                  <h3>Достижения</h3>
                  <ul>
                    <li>Призёр первенства России (ПФО)</li>
                    <li>Многократный чемпион Республики Башкортостан</li>
                    <li>Двукратный MVP школьной баскетбольной лиги «КЭС Баскет»</li>
                    <li>Чемпион лиги МЛБЛ Уфа в составе команды «Витязь» в сезоне 2021–2022</li>
                    <li>Вызван в сборную «КЭС Баскет» в сезоне 2021–2022</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="training section" id="training" aria-labelledby="training-title">
          <div className="container">
            <div className="training-intro">
              <h2 id="training-title">Тренировки</h2>
              <p>Занимаемся на уличной площадке в Уфе или индивидуально в зале. Аренда зала оплачивается отдельно.</p>
            </div>
            <ul className="sessions">
              {sessions.map(({ duration, price }) => (
                <li key={duration}>
                  <h3><Clock3 size={19} aria-hidden="true" />{duration}</h3>
                  <p>{price} <span>₽</span></p>
                  <BookLink className="button-session" duration={duration}>Выбрать в MAX</BookLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact section" id="contacts" aria-labelledby="contact-title">
          <div className="court" aria-hidden="true"><span /><span /><span /></div>
          <div className="container contact-inner">
            <div className="contact-content">
              <h2 id="contact-title">Запись на тренировку</h2>
              <p>Покажу и расскажу, и что самое главное, <strong>ОБУЧУ</strong> Вашего ребенка начальным шагам, а если это уже подготовленный ребенок, то к нему будет усиленный подход, для более развитых и опытных детей.</p>
              <div className="contact-actions">
                <BookLink icon={MessageCircle} className="button-primary">Записаться в MAX</BookLink>
                <a className="button button-contact" href={telegram.href} target="_blank" rel="noopener noreferrer">Telegram</a>
                <a className="button button-contact" href={phone.href}><Phone size={17} aria-hidden="true" />{phone.label}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <div className="footer-links">
            <a href={phone.href}>{phone.label}</a>
            <a href={telegram.href} target="_blank" rel="noopener noreferrer">{telegram.label}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
