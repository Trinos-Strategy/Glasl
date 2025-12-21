import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react'

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const phases = [
  { id: 1, nameEn: 'Win–Win', nameKo: '상호 승리', descEn: 'Cooperation possible', descKo: '협력 가능', color: '#10B981', colorLight: 'rgba(16,185,129,0.12)', stages: [1,2,3] },
  { id: 2, nameEn: 'Win–Lose', nameKo: '승패 구도', descEn: 'Distrust increases', descKo: '불신 증가', color: '#F59E0B', colorLight: 'rgba(245,158,11,0.12)', stages: [4,5,6] },
  { id: 3, nameEn: 'Lose–Lose', nameKo: '상호 손실', descEn: 'Causing damage', descKo: '피해 유발', color: '#EF4444', colorLight: 'rgba(239,68,68,0.12)', stages: [7,8,9] },
]

const stages = [
  { id: 1, phaseId: 1, nameEn: 'Hardening', nameKo: '경직화', statusKo: '대화 가능', statusEn: 'Dialogue possible', 
    characteristics: { en: ['Interests become positions', 'Only own view counts', 'Facts get distorted', 'Cooperation > competition'], ko: ['이해관계가 입장으로 변환', '자기 관점만 옳다고 인식', '사실이 왜곡되기 시작', '협력이 경쟁보다 우세'] },
    interventionKo: '자체 해결 가능', interventionEn: 'Self-resolution possible' },
  { id: 2, phaseId: 1, nameEn: 'Debate & Polemic', nameKo: '논쟁과 대립', statusKo: '대화→종료 과도기', statusEn: 'Dialogue ending',
    characteristics: { en: ['Tactical manipulation', 'Verbal confrontations', 'Polarization deepens', 'Emotions over logic'], ko: ['전술적 조작', '언어적 대립', '양극화 심화', '감정이 이성 압도'] },
    interventionKo: '비공식 도움으로 해결', interventionEn: 'Informal third party help' },
  { id: 3, phaseId: 1, nameEn: 'Actions Not Words', nameKo: '계획을 행동으로', statusKo: '대화 종료', statusEn: 'End of dialogue',
    characteristics: { en: ['One-sided actions', 'Fait accompli tactics', 'Empathy diminishes', 'Competition > cooperation'], ko: ['일방적 행동', '기정사실화 전술', '공감 능력 저하', '경쟁이 협력 압도'] },
    interventionKo: '훈련받은 제3자 필요', interventionEn: 'Trained mediator needed' },
  { id: 4, phaseId: 2, nameEn: 'Images & Coalitions', nameKo: '이미지와 연합', statusKo: '불신 증가', statusEn: 'Distrust grows',
    characteristics: { en: ['Personal attacks begin', 'Black-white thinking', 'Forming alliances', 'Avoid losing face'], ko: ['인신공격 시작', '흑백 논리', '동맹 형성', '체면 손상 회피'] },
    interventionKo: '전문 조정자 필요', interventionEn: 'Professional mediator needed' },
  { id: 5, phaseId: 2, nameEn: 'Loss of Face', nameKo: '체면 손상', statusKo: '적대감 증가', statusEn: 'Animosity grows',
    characteristics: { en: ['Attack moral integrity', 'See other negatively', 'Manipulation & sabotage', 'Foul games begin'], ko: ['도덕성 공격', '상대를 부정적으로만 인식', '조작과 방해 공작', '비열한 수단 동원'] },
    interventionKo: '전문 조정자 필수', interventionEn: 'Professional mediator essential' },
  { id: 6, phaseId: 2, nameEn: 'Threat Strategies', nameKo: '위협 전략', statusKo: '통제력 상실', statusEn: 'Control lost',
    characteristics: { en: ['Demands & sanctions', 'Threat-counter-threat spiral', 'Loss of control', 'Increasingly complex'], ko: ['요구와 제재', '위협-맞위협 악순환', '통제력 상실', '점점 복잡해짐'] },
    interventionKo: '전문 조정자 필수', interventionEn: 'Professional mediator essential' },
  { id: 7, phaseId: 3, nameEn: 'Limited Destruction', nameKo: '손상 가하기', statusKo: '소통 단절', statusEn: 'No communication',
    characteristics: { en: ['Execute threats', 'No reaction expected', 'Goal is causing damage', "Enemy's loss = my win"], ko: ['위협 실행', '반응 기대 않음', '피해 유발이 목표', '적의 손실 = 나의 승리'] },
    interventionKo: '공식적 개입 필요', interventionEn: 'Formal intervention needed' },
  { id: 8, phaseId: 3, nameEn: 'Fragmentation', nameKo: '적의 파괴', statusKo: '파괴 모드', statusEn: 'Destruction mode',
    characteristics: { en: ['Physical/economic/psychological destruction', 'Direct attacks', 'Self-preservation only'], ko: ['물리적/경제적/심리적 파괴', '직접적 공격', '자기 보존 본능만 남음'] },
    interventionKo: '공식적 전문 개입', interventionEn: 'Formal professional intervention' },
  { id: 9, phaseId: 3, nameEn: 'Together into Abyss', nameKo: '함께 나락으로', statusKo: '돌아갈 길 없음', statusEn: 'No way back',
    characteristics: { en: ['Destroy at cost of self-destruction', 'No way back', 'Total annihilation'], ko: ['자기 파멸 감수하고 파괴', '돌아갈 길 없음', '완전한 파멸'] },
    interventionKo: '공식적 전문 개입', interventionEn: 'Formal professional intervention' },
]

const insights = [
  { icon: '⚡', titleEn: 'Gravity Effect', titleKo: '중력 효과', descEn: 'Falling is easy, climbing back is hard.', descKo: '내려가기는 쉽고 올라오기는 어렵다.' },
  { icon: '🚪', titleEn: 'Critical Thresholds', titleKo: '결정적 임계점', descEn: 'Stages 3→4 and 6→7 are turning points.', descKo: '3→4단계와 6→7단계가 전환점.' },
  { icon: '💰', titleEn: 'Cost of Delay', titleKo: '지연의 대가', descEn: 'Intervention cost grows exponentially.', descKo: '개입 비용이 기하급수적 증가.' },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const getPhase = (id) => phases.find(p => p.stages.includes(id))

const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center gap-3 text-xs tracking-widest">
    <button 
      onClick={() => setLang('en')} 
      className={`transition-all duration-300 hover:scale-105 ${lang === 'en' ? 'text-white font-medium' : 'text-white/40 hover:text-white/70'}`}
    >
      EN
    </button>
    <span className="text-white/20">|</span>
    <button 
      onClick={() => setLang('ko')} 
      className={`transition-all duration-300 hover:scale-105 ${lang === 'ko' ? 'text-white font-medium' : 'text-white/40 hover:text-white/70'}`}
    >
      한국어
    </button>
  </div>
)

const PhaseNav = ({ activePhase, lang }) => (
  <div className="hidden md:flex items-center gap-5">
    {phases.map(p => (
      <div key={p.id} className="flex items-center gap-2 group cursor-default">
        <motion.div 
          animate={{ scale: activePhase === p.id ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5 }}
          className="w-2 h-2 rounded-full transition-all duration-500" 
          style={{ 
            backgroundColor: activePhase === p.id ? p.color : 'rgba(255,255,255,0.2)', 
            boxShadow: activePhase === p.id ? `0 0 12px ${p.color}` : 'none' 
          }} 
        />
        <span 
          className="text-[10px] tracking-widest uppercase transition-colors duration-300" 
          style={{ color: activePhase === p.id ? p.color : 'rgba(255,255,255,0.35)' }}
        >
          {lang === 'ko' ? p.nameKo : p.nameEn}
        </span>
      </div>
    ))}
  </div>
)

const InsightCard = ({ insight, lang, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 30, scale: 0.95 }} 
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="p-6 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm cursor-default transition-all duration-500"
    >
      <motion.span 
        className="text-2xl mb-3 block"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        {insight.icon}
      </motion.span>
      <h3 className="text-base font-light tracking-wide mb-2">
        {lang === 'ko' ? insight.titleKo : insight.titleEn}
      </h3>
      <p className="text-white/45 text-sm leading-relaxed">
        {lang === 'ko' ? insight.descKo : insight.descEn}
      </p>
    </motion.div>
  )
}

const StageCard = ({ stage, lang, onClick, index }) => {
  const phase = getPhase(stage.id)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, x: -40, rotateY: -5 }} 
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick} 
      className="group cursor-pointer" 
      style={{ marginLeft: `${Math.min(index * 2.5, 20)}%`, marginTop: index === 0 ? 0 : '-0.5rem' }}
    >
      <motion.div 
        whileHover={{ x: 12, scale: 1.008 }} 
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-xl bg-gradient-to-br from-[#111111] to-[#0a0a0a] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden shadow-xl shadow-black/20"
        style={{ borderLeftColor: phase.color, borderLeftWidth: '2px' }}
      >
        <div 
          className="absolute -top-px left-4 px-3 py-1 text-[9px] tracking-[0.15em] uppercase font-medium"
          style={{ backgroundColor: phase.color, color: '#000' }}
        >
          {lang === 'ko' ? phase.nameKo : phase.nameEn}
        </div>
        
        <div className="p-6 pt-8">
          <div className="flex items-baseline gap-4 mb-3">
            <motion.span 
              className="font-mono text-4xl font-extralight" 
              style={{ color: phase.color }}
              whileHover={{ scale: 1.05 }}
            >
              {String(stage.id).padStart(2, '0')}
            </motion.span>
            <div>
              <h3 className="text-xl font-light tracking-wide">
                {lang === 'ko' ? stage.nameKo : stage.nameEn}
              </h3>
              {lang === 'ko' && (
                <p className="text-white/25 text-xs mt-0.5 tracking-wide">{stage.nameEn}</p>
              )}
            </div>
          </div>
          
          <div 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 text-[10px] tracking-wider rounded-sm"
            style={{ backgroundColor: phase.colorLight, color: phase.color }}
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-1 rounded-full" 
              style={{ backgroundColor: phase.color }} 
            />
            {lang === 'ko' ? stage.statusKo : stage.statusEn}
          </div>
          
          <p className="text-white/40 text-sm leading-relaxed line-clamp-1">
            {lang === 'ko' ? stage.characteristics.ko[0] : stage.characteristics.en[0]}
          </p>
          
          <div className="mt-4 flex items-center gap-2 text-white/20 text-[10px] tracking-wider group-hover:text-white/40 transition-colors">
            <span>{lang === 'ko' ? '상세 보기' : 'View details'}</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 20% 50%, ${phase.colorLight}, transparent 60%)` }} 
        />
      </motion.div>
    </motion.div>
  )
}

const DetailPanel = ({ stage, lang, onClose }) => {
  const phase = getPhase(stage.id)
  
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.3 }}
        onClick={onClose} 
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md" 
      />
      
      <motion.aside 
        initial={{ x: '100%', opacity: 0.5 }} 
        animate={{ x: 0, opacity: 1 }} 
        exit={{ x: '100%', opacity: 0.5 }}
        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-gradient-to-b from-[#0d0d0d] to-[#080808] border-l border-white/10 overflow-y-auto"
      >
        <header 
          className="sticky top-0 z-10 px-8 py-6 border-b border-white/[0.06]"
          style={{ background: `linear-gradient(135deg, ${phase.colorLight}, transparent 80%)` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-baseline gap-4">
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-4xl font-extralight" 
                style={{ color: phase.color }}
              >
                {String(stage.id).padStart(2, '0')}
              </motion.span>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase mb-0.5" style={{ color: phase.color }}>
                  {lang === 'ko' ? phase.nameKo : phase.nameEn}
                </p>
                <h2 className="text-xl font-light tracking-wide">
                  {lang === 'ko' ? stage.nameKo : stage.nameEn}
                </h2>
                {lang === 'ko' && <p className="text-white/35 text-xs mt-0.5">{stage.nameEn}</p>}
              </div>
            </div>
            <motion.button 
              onClick={onClose} 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white/40 hover:text-white transition-colors" 
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </header>
        
        <div className="px-8 py-8 space-y-8">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-white/35 mb-3">
              {lang === 'ko' ? '상태' : 'Status'}
            </h3>
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm" 
              style={{ backgroundColor: phase.colorLight, color: phase.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
              {lang === 'ko' ? stage.statusKo : stage.statusEn}
            </div>
          </motion.section>
          
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-white/35 mb-4">
              {lang === 'ko' ? '특징' : 'Characteristics'}
            </h3>
            <ul className="space-y-3">
              {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-3 group"
                >
                  <span 
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-150" 
                    style={{ backgroundColor: phase.color }} 
                  />
                  <span className="text-white/65 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
          
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-white/35 mb-3">
              {lang === 'ko' ? '권장 개입' : 'Intervention'}
            </h3>
            <div className="p-4 border border-white/10 bg-white/[0.02] rounded-sm">
              <p className="text-white/60 text-sm">
                {lang === 'ko' ? stage.interventionKo : stage.interventionEn}
              </p>
            </div>
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="p-5 border-l-2 rounded-sm" 
            style={{ borderColor: phase.color, backgroundColor: phase.colorLight }}
          >
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-white/35 mb-1">
              {lang === 'ko' ? '국면' : 'Phase'}
            </h3>
            <p className="text-base font-light" style={{ color: phase.color }}>
              {lang === 'ko' ? phase.descKo : phase.descEn}
            </p>
          </motion.section>
        </div>
      </motion.aside>
    </>
  )
}

const Hero = ({ lang }) => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.12], [0, -50])
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.95])
  
  return (
    <motion.section 
      style={{ opacity, y, scale }} 
      className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} 
        className="relative z-10"
      >
        <motion.p 
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/35 text-[10px] tracking-[0.3em] uppercase mb-6"
        >
          Friedrich Glasl, 1980
        </motion.p>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.1]">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block"
          >
            {lang === 'ko' ? '갈등 격화' : 'Conflict'}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block mt-1" 
            style={{ 
              background: 'linear-gradient(120deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            {lang === 'ko' ? '9단계' : 'Escalation'}
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/40 text-base max-w-sm mx-auto leading-relaxed mt-6 font-light"
        >
          {lang === 'ko' 
            ? '갈등이 어떻게 단계적으로 격화되는지 이해하세요.' 
            : 'Understand how conflicts escalate through stages.'}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}}
          className="mt-12 text-white/25"
        >
          <svg className="w-5 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 20 32">
            <rect x="4" y="1" width="12" height="18" rx="6" strokeWidth="1.5" />
            <circle cx="10" cy="7" r="1.5" fill="currentColor" />
            <path d="M10 22v6M7 26l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  
  return (
    <motion.div 
      style={{ scaleX, transformOrigin: 'left' }} 
      className="fixed top-0 left-0 right-0 h-[2px] z-50"
    >
      <div 
        className="h-full w-full" 
        style={{ background: 'linear-gradient(90deg, #10B981, #F59E0B, #EF4444)' }} 
      />
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [activeStage, setActiveStage] = useState(null)
  const [activePhase, setActivePhase] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (progress < 0.35) setActivePhase(1)
      else if (progress < 0.65) setActivePhase(2)
      else setActivePhase(3)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20 selection:text-white">
      <ScrollProgress />
      
      <header className="fixed top-0 left-0 right-0 z-40 px-5 md:px-8 py-5 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <PhaseNav activePhase={activePhase} lang={lang} />
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </header>
      
      <Hero lang={lang} />
      
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-[9px] tracking-[0.25em] uppercase text-white/35 mb-8 text-center"
          >
            {lang === 'ko' ? '핵심 인사이트' : 'Key Insights'}
          </motion.p>
          <div className="grid sm:grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="h-1/3" style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.02), transparent)' }} />
          <div className="h-1/3" style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.02), transparent)' }} />
          <div className="h-1/3" style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.02), transparent)' }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-5 mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-extralight tracking-tight"
          >
            {lang === 'ko' ? '9단계 격화 계단' : 'The Nine Stages'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/35 mt-2 max-w-md text-sm"
          >
            {lang === 'ko' 
              ? '각 단계를 클릭하여 상세 정보를 확인하세요.' 
              : 'Click each stage for detailed information.'}
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto px-5 relative">
          {stages.map((stage, i) => (
            <StageCard 
              key={stage.id} 
              stage={stage} 
              lang={lang} 
              onClick={() => setActiveStage(stage)} 
              index={i} 
            />
          ))}
        </div>
      </section>
      
      <footer className="py-16 px-5 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/25 text-xs tracking-wider">
            Glasl's Model of Conflict Escalation
          </p>
          <p className="text-white/15 text-[10px] mt-1.5">
            Friedrich Glasl, <em>Konfliktmanagement</em>, 1980
          </p>
        </div>
      </footer>
      
      <AnimatePresence>
        {activeStage && (
          <DetailPanel 
            stage={activeStage} 
            lang={lang} 
            onClose={() => setActiveStage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}
