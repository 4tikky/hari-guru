import { StrictMode, useEffect, useRef, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Heart, Image as ImageIcon, Mail, Music2, Pause, Play, RotateCcw, Sprout, Volume2, VolumeX, X } from 'lucide-react'
import { images, tribute as t, type PhotoKey } from './data/tribute'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/cormorant-garamond/latin-600-italic.css'
import '@fontsource/lora/latin-400.css'
import '@fontsource/lora/latin-400-italic.css'
import '@fontsource/caveat/latin-400.css'
import '@fontsource/caveat/latin-500.css'
import '@fontsource/caveat/latin-600.css'
import './style.css'

const chapters = [
  ['home', 'Dedication'], ['school', 'At school'], ['family', 'At home'], ['lessons', 'Life lessons'],
  ['memories', 'Memories'], ['roles', 'Two roles'], ['letter', 'The letter'], ['ending', 'For Ayah'],
] as const

function Photo({ name, eager = false }: { name: PhotoKey; eager?: boolean }) {
  const { src, caption } = images[name]
  const [failedSrc, setFailedSrc] = useState('')
  return <div className={`photo photo-${name}`}>
    <div className="photo-placeholder" role="img" aria-label={`Photo placeholder: ${caption}`}>
      <ImageIcon size={25} strokeWidth={1.15} />
      <span>{caption}</span>
      <small>Photo placeholder</small>
    </div>
    {failedSrc !== src && <img src={src} alt={caption} loading={eager ? 'eager' : 'lazy'} decoding="async"
      onError={() => setFailedSrc(src)} onLoad={event => {
        if (!event.currentTarget.naturalWidth) setFailedSrc(src)
        else event.currentTarget.classList.add('loaded')
      }} />}
  </div>
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 'some' }} transition={{ duration: 0.65 }}>
    {children}
  </motion.div>
}

function StoryQuote({ children }: { children: string }) {
  const reduce = useReducedMotion()
  return <motion.blockquote className="story-quote"
    initial={reduce ? false : { opacity: 0.65 }}
    whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
    {children}
  </motion.blockquote>
}

function Story({ personal = false }: { personal?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const progress = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(progress.scrollYProgress, [0, 1], [18, -18])
  const story = personal ? t.familyStory : t.schoolStory
  return <section id={personal ? 'family' : 'school'} ref={ref} className={`story chapter ${personal ? 'personal' : ''}`}>
    <Reveal className="story-copy">
      <p className="eyebrow">{personal ? '02 / At home' : '01 / At school'}</p>
      <h2>{story.title}</h2>
      <div lang="id">{story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {personal && <StoryQuote>{t.familyStory.quote}</StoryQuote>}
    </Reveal>
    <Reveal className="story-photos">
      <motion.figure className="polaroid large-print" style={reduce ? undefined : { y: drift }}>
        <Photo name={personal ? 'childhood' : 'teaching'} />
        <figcaption>{personal ? images.childhood.caption : t.school}</figcaption>
        {!personal && <small>{t.schoolStory.caption}</small>}
      </motion.figure>
      <figure className="polaroid small-print" aria-hidden="true"><Photo name={personal ? 'family' : 'classroom'} /></figure>
    </Reveal>
  </section>
}

function Notebook() {
  return <section className="notebook-section chapter" id="lessons">
    <Reveal className="center heading"><p className="eyebrow">03 / Life lessons</p><h2>{t.notebookTitle}</h2></Reveal>
    <Reveal className="notebook">
      {t.lessons.map(([title, message], index) => <details key={title} className="lesson">
        <summary><span className="lesson-number">{String(index + 1).padStart(2, '0')}</span><span>{title}</span><span className="lesson-toggle" aria-hidden="true" /></summary>
        <motion.p lang="id" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.3 }}>{message}</motion.p>
      </details>)}
    </Reveal>
  </section>
}

function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number | null>(null)
  const [selected, setSelected] = useState(0)
  const list = t.gallery.photos
  const shift = (by: number) => setSelected(index => (index + by + list.length) % list.length)

  return <section id="memories" className="gallery-section chapter">
    <Reveal className="gallery-heading">
      <div><p className="eyebrow">04 / The family album</p><h2>{t.gallery.title}</h2><p>{t.gallery.subtitle}</p></div>
      <div className="gallery-arrows">
        <button className="circle" aria-label="Scroll photos left" onClick={() => track.current?.scrollBy({ left: -280 })}><ArrowLeft size={18} /></button>
        <button className="circle" aria-label="Scroll photos right" onClick={() => track.current?.scrollBy({ left: 280 })}><ArrowRight size={18} /></button>
      </div>
    </Reveal>
    <Reveal><div className="gallery-track" ref={track}>
      {list.map((name, index) => <button key={name} className="polaroid gallery-print" onClick={() => { setSelected(index); dialog.current?.showModal() }}>
        <Photo name={name} /><span className="caption">{images[name].caption}</span>
      </button>)}
    </div></Reveal>
    <StoryQuote>{t.gallery.quote}</StoryQuote>
    <dialog ref={dialog} className="lightbox" aria-label="Family photograph" onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close()
    }} onKeyDown={event => {
      if (event.key === 'ArrowLeft') shift(-1)
      if (event.key === 'ArrowRight') shift(1)
    }}>
      <div className="lightbox-inner" onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
        onTouchEnd={event => {
          if (touchStart.current === null) return
          const delta = event.changedTouches[0].clientX - touchStart.current
          if (Math.abs(delta) > 45) shift(delta < 0 ? 1 : -1)
          touchStart.current = null
        }}>
        <button className="circle close-photo" aria-label="Close photo" onClick={() => dialog.current?.close()}><X size={20} /></button>
        <Photo key={list[selected]} name={list[selected]} eager />
        <div className="lightbox-controls">
          <button className="circle" aria-label="Previous photo" onClick={() => shift(-1)}><ArrowLeft size={18} /></button>
          <div className="caption" aria-live="polite">{images[list[selected]].caption}<small>{selected + 1} / {list.length}</small></div>
          <button className="circle" aria-label="Next photo" onClick={() => shift(1)}><ArrowRight size={18} /></button>
        </div>
      </div>
    </dialog>
  </section>
}

function Roles() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const progress = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const gap = useTransform(progress.scrollYProgress, [0, 1], ['2rem', '0rem'])
  return <section id="roles" ref={ref} className="roles chapter">
    <motion.div className="diptych" style={reduce ? undefined : { gap }}>
      <div><Photo name="teaching" /><p>{t.roles.left}</p></div>
      <div><Photo name="family" /><p>{t.roles.right}</p></div>
    </motion.div>
    <Reveal className="center roles-message"><p className="eyebrow">05 / Two roles</p><h2>{t.roles.conclusion}</h2><p className="roles-summary">{t.roles.summary}</p></Reveal>
  </section>
}

function Letter() {
  const [opened, setOpened] = useState(false)
  const paper = useRef<HTMLElement>(null)

  function open() {
    setOpened(true)
    if (t.music.paperSound) {
      const sound = new Audio(t.music.paperSound)
      sound.volume = 0.25
      void sound.play().catch(() => {})
    }
  }

  return <section id="letter" className="letter-section chapter">
    <Reveal className="center heading"><p className="eyebrow">06 / A personal note</p><h2>{t.letter.title}</h2></Reveal>
    <Reveal>
      <div className={`envelope ${opened ? 'unsealed' : ''}`}>
        <div className="envelope-fold" />
        <div className="envelope-address">{t.letter.address}</div>
        <div className="wax" aria-hidden="true"><Heart size={24} strokeWidth={1.3} /></div>
      </div>
      <div className="center letter-button">
        <button className="pill dark-pill" aria-expanded={opened} aria-controls="letter-paper" onClick={() => {
          if (opened) {
            paper.current?.focus()
            paper.current?.scrollIntoView({ block: 'start' })
          } else open()
        }}><Mail size={16} />{opened ? 'Read Your Letter' : t.letter.action}</button>
      </div>
      <article className="letter-paper" id="letter-paper" tabIndex={-1} ref={paper} hidden={!opened} lang="id">
        {t.letter.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 || index === t.letter.paragraphs.length - 1 ? 'signature' : ''}>
          {t.daughter && index === t.letter.paragraphs.length - 1 ? paragraph.replace('Your daughter.', t.daughter) : paragraph}
        </p>)}
      </article>
    </Reveal>
  </section>
}

function App() {
  const [entered, setEntered] = useState(false)
  const [opening, setOpening] = useState(false)
  const [active, setActive] = useState('home')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [missing, setMissing] = useState(!t.music.src)
  const audio = useRef<HTMLAudioElement>(null)
  const openButton = useRef<HTMLButtonElement>(null)
  const hero = useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const endingFade = { hidden: { opacity: reduce ? 1 : 0 }, shown: { opacity: 1, transition: { duration: reduce ? 0 : 0.65 } } }

  useEffect(() => {
    if (!entered) return
    hero.current?.focus({ preventScroll: true })
    const update = () => {
      const current = chapters.reduce<string>((section, [id]) =>
        (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * 0.42 ? id : section, 'home')
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [entered])

  function play() {
    if (!audio.current || missing) return
    audio.current.volume = t.music.volume
    void audio.current.play().catch(() => {
      if (audio.current?.error) setMissing(true)
    })
  }

  function begin() {
    if (opening) return
    setOpening(true)
    play()
  }

  function replay() {
    audio.current?.pause()
    if (audio.current?.readyState) audio.current.currentTime = 0
    if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpening(false)
    setEntered(false)
    setActive('home')
    requestAnimationFrame(() => openButton.current?.focus())
  }

  return <>
    <audio ref={audio} src={t.music.src || undefined} loop preload="none"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setMissing(true)} />
    {!entered ? <motion.main className="opening grain" initial={false} animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.45 }} onAnimationComplete={() => { if (opening) setEntered(true) }}>
      <div className="opening-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="opening-header"><span>{t.occasion}</span><span>{t.date}</span></header>
      <div className="opening-content">
        <div className="opening-emblem" aria-hidden="true"><i /><Heart size={17} strokeWidth={1.3} /><i /></div>
        <div className="opening-lines">{t.intro.lines.map((line, index) => <p key={line} style={{ animationDelay: `${index * 230}ms` }}>{line}</p>)}</div>
        <h1>{t.intro.title}</h1>
        <button ref={openButton} className="pill intro-button" onClick={begin}><Mail size={17} strokeWidth={1.5} />{t.intro.action}<ArrowUpRight size={16} strokeWidth={1.5} /></button>
      </div>
      <footer className="opening-footer"><span /><span>From your daughter</span><span /></footer>
    </motion.main> : <>
      <a className="skip-link" href="#home">Skip to the tribute</a>
      <header className="site-header">
        <a href="#home" className="brand"><Heart size={15} /> For Ayah</a>
        <nav aria-label="Chapters" className="chapter-nav">
          {chapters.map(([id, label], index) => <a href={`#${id}`} key={id} aria-label={label} title={label} aria-current={active === id ? 'location' : undefined}><span>{String(index + 1).padStart(2, '0')}</span></a>)}
        </nav>
        <div className="audio-controls" aria-label="Background music">
          {missing ? <span className="music-status"><Music2 size={15} /> <span>Music unavailable</span></span> : <>
            <button className="circle" aria-label={playing ? 'Pause music' : 'Play music'} onClick={() => playing ? audio.current?.pause() : play()}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>
            <button className="circle" aria-label={muted ? 'Unmute music' : 'Mute music'} onClick={() => {
              if (audio.current) { audio.current.muted = !muted; setMuted(!muted) }
            }}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          </>}
        </div>
        <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      </header>
      <motion.main initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }}>
        <section id="home" className="hero cinematic">
          <div className="cinematic-photo"><Photo name="hero" eager /></div>
          <Sprout className="hero-ornament" aria-hidden="true" strokeWidth={0.65} />
          <div className="cinematic-copy">
            <p className="eyebrow">{t.date}<br />{t.occasion}</p>
            <h1 ref={hero} tabIndex={-1}>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
            <p className="handwritten">{t.father || t.hero.note}</p>
          </div>
          <a href="#school" className="scroll-cue" aria-label="Continue to A Teacher to Many"><ArrowDown size={18} /></a>
        </section>
        <Story /><Story personal /><Notebook /><Gallery /><Roles /><Letter />
        <section id="ending" className="ending cinematic">
          <div className="cinematic-photo"><Photo name="ending" /></div>
          <motion.div className="cinematic-copy center" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 'some' }}
            variants={{ shown: { transition: { staggerChildren: reduce ? 0 : 0.16 } } }}>
            <motion.div variants={endingFade}>{t.ending.lines.map(line => <p key={line}>{line}</p>)}</motion.div>
            <motion.div variants={endingFade}>
              <Heart className="floating-heart" size={24} strokeWidth={1.2} aria-hidden="true" />
              <h2>{t.ending.title}</h2>
              <p className="dedication">{t.ending.dedication}</p>
            </motion.div>
            <motion.p variants={endingFade} className="handwritten" lang="id">{t.ending.prayer}</motion.p>
            <motion.div variants={endingFade}>
              <p className="credit">{t.daughter ? `Made with love, by ${t.daughter}.` : t.ending.credit}<br />{t.date}.</p>
              <button className="pill replay" onClick={replay}><RotateCcw size={16} />{t.ending.replay}</button>
            </motion.div>
          </motion.div>
        </section>
      </motion.main>
    </>}
  </>
}

createRoot(document.getElementById('root')!).render(<StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></StrictMode>)
