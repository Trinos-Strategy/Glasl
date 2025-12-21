import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages (Dante's Inferno Style)
// ═══════════════════════════════════════════════════════════════

const stages = [
  {
    id: 1,
    nameEn: 'Hardening',
    nameKo: '경직화',
    icon: '💬',
    color: '#34D399',
    lightColor: '#6EE7B7',
    characteristics: {
      ko: ['입장이 충돌하지만 대화 가능', '아직 협력 의지 존재', '긴장감 있으나 해결 희망'],
      en: ['Positions clash but dialogue possible', 'Still willing to cooperate', 'Tension exists but hope for resolution']
    },
    behaviors: {
      ko: ['입장 고수', '상대 의견 경청 감소', '사실 왜곡 시작'],
      en: ['Holding positions', 'Less listening to others', 'Facts start to distort']
    },
    intervention: { ko: '자체 해결 가능', en: 'Self-resolution possible' },
    phase: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' }
  },
  {
    id: 2,
    nameEn: 'Debate',
    nameKo: '논쟁',
    icon: '⚡',
    color: '#2DD4BF',
    lightColor: '#5EEAD4',
    characteristics: {
      ko: ['언어적 대립 심화', '논리보다 감정 우세', '승리에 집착 시작'],
      en: ['Verbal confrontation intensifies', 'Emotions over logic', 'Obsession with winning begins']
    },
    behaviors: {
      ko: ['전술적 조작', '양극화 심화', '상대 폄하'],
      en: ['Tactical manipulation', 'Polarization deepens', 'Belittling opponent']
    },
    intervention: { ko: '비공식 제3자 도움', en: 'Informal third-party help' },
    phase: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' }
  },
  {
    id: 3,
    nameEn: 'Actions',
    nameKo: '행동화',
    icon: '🏃',
    color: '#10B981',
    lightColor: '#34D399',
    characteristics: {
      ko: ['대화 중단', '일방적 행동 시작', '공감 능력 저하'],
      en: ['Dialogue stops', 'Unilateral actions begin', 'Empathy diminishes']
    },
    behaviors: {
      ko: ['기정사실화 전술', '말보다 행동', '압박 증가'],
      en: ['Fait accompli tactics', 'Actions over words', 'Increasing pressure']
    },
    intervention: { ko: '훈련된 조정자 필요', en: 'Trained mediator needed' },
    phase: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' }
  },
  {
    id: 4,
    nameEn: 'Coalitions',
    nameKo: '연합',
    icon: '👥',
    color: '#FBBF24',
    lightColor: '#FCD34D',
    characteristics: {
      ko: ['상대를 적으로 인식', '동맹 형성 시작', '체면 중시'],
      en: ['Seeing opponent as enemy', 'Alliance forming begins', 'Focus on saving face']
    },
    behaviors: {
      ko: ['인신공격 시작', '흑백 논리', '지지자 모집'],
      en: ['Personal attacks begin', 'Black-white thinking', 'Recruiting supporters']
    },
    intervention: { ko: '전문 조정자 필요', en: 'Professional mediator needed' },
    phase: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' }
  },
  {
    id: 5,
    nameEn: 'Loss of Face',
    nameKo: '체면 손상',
    icon: '😤',
    color: '#F59E0B',
    lightColor: '#FBBF24',
    characteristics: {
      ko: ['상대 도덕성 공격', '완전한 불신', '공개적 망신'],
      en: ['Attacking moral integrity', 'Complete distrust', 'Public humiliation']
    },
    behaviors: {
      ko: ['조작과 방해', '비열한 수단', '상대 악마화'],
      en: ['Manipulation & sabotage', 'Foul play', 'Demonizing opponent']
    },
    intervention: { ko: '전문 조정 필수', en: 'Professional mediation essential' },
    phase: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' }
  },
  {
    id: 6,
    nameEn: 'Threats',
    nameKo: '위협',
    icon: '⚠️',
    color: '#EF4444',
    lightColor: '#F87171',
    characteristics: {
      ko: ['위협과 맞위협', '통제력 상실', '요구와 최후통첩'],
      en: ['Threats and counter-threats', 'Loss of control', 'Demands and ultimatums']
    },
    behaviors: {
      ko: ['제재 위협', '위협 악순환', '합리성 상실'],
      en: ['Threatening sanctions', 'Threat spiral', 'Loss of rationality']
    },
    intervention: { ko: '전문 조정 필수', en: 'Professional mediation essential' },
    phase: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' }
  },
  {
    id: 7,
    nameEn: 'Destruction',
    nameKo: '파괴',
    icon: '💥',
    color: '#DC2626',
    lightColor: '#EF4444',
    characteristics: {
      ko: ['상대에게 피해 주기', '소통 완전 단절', '적의 손실이 나의 이득'],
      en: ['Causing harm to opponent', 'No communication', "Enemy's loss = my gain"]
    },
    behaviors: {
      ko: ['위협 실행', '반응 기대 않음', '피해 유발 목표'],
      en: ['Executing threats', 'No reaction expected', 'Damage is the goal']
    },
    intervention: { ko: '공식적 개입 필요', en: 'Formal intervention needed' },
    phase: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' }
  },
  {
    id: 8,
    nameEn: 'Fragmentation',
    nameKo: '분열',
    icon: '💔',
    color: '#B91C1C',
    lightColor: '#DC2626',
    characteristics: {
      ko: ['조직적 파괴 시도', '존재 자체 위협', '생존 본능만 남음'],
      en: ['Systematic destruction', 'Existential threat', 'Only survival instinct']
    },
    behaviors: {
      ko: ['물리적/심리적 공격', '핵심 기반 파괴', '직접적 공격'],
      en: ['Physical/psychological attacks', 'Destroying core foundation', 'Direct attacks']
    },
    intervention: { ko: '강력한 외부 개입', en: 'Strong external intervention' },
    phase: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' }
  },
  {
    id: 9,
    nameEn: 'Abyss',
    nameKo: '나락',
    icon: '🕳️',
    color: '#7F1D1D',
    lightColor: '#991B1B',
    characteristics: {
      ko: ['자기 파멸 감수', '돌아갈 길 없음', '완전한 파멸 추구'],
      en: ['Self-destruction accepted', 'No way back', 'Total annihilation sought']
    },
    behaviors: {
      ko: ['함께 파멸', '모든 것 희생', '궁극적 파괴'],
      en: ['Mutual destruction', 'Sacrificing everything', 'Ultimate destruction']
    },
    intervention: { ko: '강력한 외부 개입', en: 'Strong external intervention' },
    phase: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' }
  },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
    <button
      onClick={() => setLang('en')}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
        lang === 'en'
          ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white'
          : 'text-white/50 hover:text-white/80'
      }`}
    >
      EN
    </button>
    <button
      onClick={() => setLang('ko')}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
        lang === 'ko'
          ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white'
          : 'text-white/50 hover:text-white/80'
      }`}
    >
      한국어
    </button>
  </div>
)

// 3D Cone Ring Component
const ConeRing = ({ stage, index, lang, onClick, isHovered, onHover }) => {
  const totalStages = 9
  const baseSize = 320
  const sizeReduction = 28
  const size = baseSize - (index * sizeReduction)
  const depth = index * 45

  return (
    <motion.div
      className="absolute left-1/2 cursor-pointer"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        top: depth,
        zIndex: totalStages - index,
      }}
      initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1.05 : 1,
        rotateX: 0,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        scale: { duration: 0.3 }
      }}
      onMouseEnter={() => onHover(stage.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(stage)}
    >
      {/* Ring shadow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${stage.color}40 0%, transparent 70%)`,
          transform: 'translateY(10px)'
        }}
      />

      {/* Main ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, ${stage.lightColor} 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, ${stage.color}80 0%, transparent 50%),
            linear-gradient(180deg, ${stage.lightColor} 0%, ${stage.color} 50%, ${stage.color}90 100%)
          `,
          boxShadow: isHovered
            ? `0 0 40px ${stage.color}80, inset 0 -20px 40px ${stage.color}40, 0 10px 30px rgba(0,0,0,0.5)`
            : `0 0 20px ${stage.color}40, inset 0 -20px 40px ${stage.color}20, 0 10px 30px rgba(0,0,0,0.3)`,
          border: `2px solid ${stage.lightColor}60`,
        }}
      >
        {/* Inner dark circle (hole effect) */}
        <div
          className="absolute rounded-full"
          style={{
            top: '15%',
            left: '15%',
            right: '15%',
            bottom: '15%',
            background: `radial-gradient(circle, #0a0a0f 0%, #1a1a2e 100%)`,
            boxShadow: `inset 0 5px 20px rgba(0,0,0,0.8), inset 0 0 40px ${stage.color}20`,
          }}
        />

        {/* Stage content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <motion.span
              className="text-3xl block mb-1"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {stage.icon}
            </motion.span>
            <div
              className="font-bold text-lg tracking-wide"
              style={{
                color: '#fff',
                textShadow: `0 0 10px ${stage.color}, 0 2px 4px rgba(0,0,0,0.8)`
              }}
            >
              {stage.id}
            </div>
            <div
              className="text-xs font-medium mt-0.5 opacity-90"
              style={{
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)'
              }}
            >
              {lang === 'ko' ? stage.nameKo : stage.nameEn}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Mobile 2D Version
const MobileView = ({ lang, onStageClick }) => (
  <div className="lg:hidden py-8 px-4">
    <div className="relative flex flex-col items-center gap-3">
      {stages.map((stage, index) => {
        const width = 100 - (index * 8)
        return (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="cursor-pointer"
            style={{ width: `${width}%` }}
            onClick={() => onStageClick(stage)}
          >
            <div
              className="py-4 px-5 rounded-xl flex items-center gap-4 transition-all duration-300 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${stage.color}20 0%, ${stage.color}40 100%)`,
                border: `2px solid ${stage.color}60`,
                boxShadow: `0 4px 15px ${stage.color}30`,
              }}
            >
              <span className="text-2xl">{stage.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="font-bold text-lg"
                    style={{ color: stage.lightColor }}
                  >
                    {stage.id}
                  </span>
                  <span className="text-white font-medium">
                    {lang === 'ko' ? stage.nameKo : stage.nameEn}
                  </span>
                </div>
              </div>
              <span className="text-white/40">→</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  </div>
)

// Detail Modal
const DetailModal = ({ stage, lang, onClose }) => {
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
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="fixed left-4 right-4 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50"
      >
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(180deg, ${stage.color}20 0%, #0a0a0f 30%)`,
            border: `2px solid ${stage.color}40`,
          }}
        >
          {/* Header */}
          <div
            className="p-6 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${stage.color} 0%, ${stage.lightColor} 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)'
              }} />
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur flex items-center justify-center text-3xl">
                  {stage.icon}
                </div>
                <div>
                  <div className="text-black/50 text-xs font-medium tracking-wider uppercase">
                    {lang === 'ko' ? stage.phase.ko : stage.phase.en}
                  </div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="opacity-60">#{stage.id}</span>
                    {lang === 'ko' ? stage.nameKo : stage.nameEn}
                  </h2>
                  {lang === 'ko' && (
                    <p className="text-white/70 text-sm">{stage.nameEn}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5 max-h-[50vh] overflow-y-auto">
            {/* Characteristics */}
            <div>
              <h3 className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                  style={{ backgroundColor: `${stage.color}30`, color: stage.lightColor }}>
                  📋
                </span>
                {lang === 'ko' ? '주요 특징' : 'Key Characteristics'}
              </h3>
              <ul className="space-y-2">
                {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).map((item, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2 bg-white/5 p-3 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: stage.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Behaviors */}
            <div>
              <h3 className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                  style={{ backgroundColor: `${stage.color}30`, color: stage.lightColor }}>
                  ⚡
                </span>
                {lang === 'ko' ? '행동 패턴' : 'Behavioral Patterns'}
              </h3>
              <ul className="space-y-2">
                {(lang === 'ko' ? stage.behaviors.ko : stage.behaviors.en).map((item, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2 bg-white/5 p-3 rounded-lg">
                    <span className="text-white/40">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Intervention */}
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: `${stage.color}20`, border: `1px solid ${stage.color}40` }}
            >
              <h3 className="text-sm font-bold mb-1 flex items-center gap-2"
                style={{ color: stage.lightColor }}>
                🛡️ {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
              </h3>
              <p className="text-sm text-white/80">
                {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [selectedStage, setSelectedStage] = useState(null)
  const [hoveredStage, setHoveredStage] = useState(null)
  const [rotation, setRotation] = useState({ x: 15, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)

  // Mouse movement for 3D rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return

      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      setRotation({ x: 15 + y, y: x })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(Math.min(scrollY / maxScroll, 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="min-h-[200vh] relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, #7f1d1d20 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #1a0a0a 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
              opacity: 0
            }}
            animate={{
              y: window.innerHeight + 10,
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center flex-1"
          >
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 bg-clip-text text-transparent">
                {lang === 'ko' ? 'Glasl 갈등 격화 9단계' : "Glasl's 9 Stages"}
              </span>
            </h1>
            <p className="text-white/40 text-xs mt-1">
              {lang === 'ko' ? '단테의 지옥편처럼, 갈등은 아래로 내려갈수록 깊어집니다' : "Like Dante's Inferno, conflict deepens as it descends"}
            </p>
          </motion.div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* Progress indicator */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            className="w-2 h-2 rounded-full cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: hoveredStage === stage.id || scrollProgress > (i / 9)
                ? stage.color
                : 'rgba(255,255,255,0.2)',
              boxShadow: hoveredStage === stage.id ? `0 0 10px ${stage.color}` : 'none'
            }}
            whileHover={{ scale: 1.5 }}
            onClick={() => setSelectedStage(stage)}
          />
        ))}
      </div>

      {/* Main 3D Cone - Desktop */}
      <div
        ref={containerRef}
        className="hidden lg:block fixed inset-0 flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 40%',
        }}
      >
        <motion.div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${-scrollProgress * 100}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Cone container */}
          <div
            className="relative"
            style={{
              width: 400,
              height: 500,
            }}
          >
            {stages.map((stage, index) => (
              <ConeRing
                key={stage.id}
                stage={stage}
                index={index}
                lang={lang}
                onClick={setSelectedStage}
                isHovered={hoveredStage === stage.id}
                onHover={setHoveredStage}
              />
            ))}

            {/* Central abyss effect */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: 60,
                height: 60,
                top: 420,
                background: 'radial-gradient(circle, #000 0%, #1a0a0a 100%)',
                boxShadow: '0 0 50px #7f1d1d, inset 0 0 30px rgba(0,0,0,0.8)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden pt-24">
        <MobileView lang={lang} onStageClick={setSelectedStage} />
      </div>

      {/* Scroll hint - Desktop */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>{lang === 'ko' ? '스크롤하여 탐색' : 'Scroll to explore'}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Legend */}
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="text-xs text-white/60 mb-2">
            {lang === 'ko' ? '국면' : 'Phases'}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-white/70">I: {lang === 'ko' ? '상호 승리' : 'Win-Win'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs text-white/70">II: {lang === 'ko' ? '승패 구도' : 'Win-Lose'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-xs text-white/70">III: {lang === 'ko' ? '상호 손실' : 'Lose-Lose'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 text-center lg:hidden">
        <p className="text-white/30 text-xs">Friedrich Glasl, 1980</p>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStage && (
          <DetailModal
            stage={selectedStage}
            lang={lang}
            onClose={() => setSelectedStage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
