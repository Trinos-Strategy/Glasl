import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages
// ═══════════════════════════════════════════════════════════════

const stages = [
  {
    id: 1,
    roman: 'I',
    nameEn: 'Hardening',
    nameKo: '경직화',
    icon: '💬',
    color: '#10B981',
    lightBg: '#ECFDF5',
    borderColor: '#6EE7B7',
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
    roman: 'II',
    nameEn: 'Debate',
    nameKo: '논쟁',
    icon: '⚡',
    color: '#059669',
    lightBg: '#D1FAE5',
    borderColor: '#34D399',
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
    roman: 'III',
    nameEn: 'Actions',
    nameKo: '행동화',
    icon: '🏃',
    color: '#047857',
    lightBg: '#A7F3D0',
    borderColor: '#10B981',
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
    roman: 'IV',
    nameEn: 'Coalitions',
    nameKo: '연합',
    icon: '👥',
    color: '#F59E0B',
    lightBg: '#FEF3C7',
    borderColor: '#FCD34D',
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
    roman: 'V',
    nameEn: 'Loss of Face',
    nameKo: '체면 손상',
    icon: '😤',
    color: '#D97706',
    lightBg: '#FDE68A',
    borderColor: '#FBBF24',
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
    roman: 'VI',
    nameEn: 'Threats',
    nameKo: '위협',
    icon: '⚠️',
    color: '#B45309',
    lightBg: '#FCD34D',
    borderColor: '#F59E0B',
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
    roman: 'VII',
    nameEn: 'Destruction',
    nameKo: '파괴',
    icon: '💥',
    color: '#EF4444',
    lightBg: '#FEE2E2',
    borderColor: '#FCA5A5',
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
    roman: 'VIII',
    nameEn: 'Fragmentation',
    nameKo: '분열',
    icon: '💔',
    color: '#DC2626',
    lightBg: '#FECACA',
    borderColor: '#F87171',
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
    roman: 'IX',
    nameEn: 'Abyss',
    nameKo: '나락',
    icon: '🕳️',
    color: '#B91C1C',
    lightBg: '#FCA5A5',
    borderColor: '#EF4444',
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
// SVG DECORATIONS
// ═══════════════════════════════════════════════════════════════

// Laurel Wreath SVG
const LaurelWreath = ({ className = "", side = "left" }) => (
  <svg
    className={className}
    viewBox="0 0 50 100"
    fill="none"
    style={{ transform: side === "right" ? "scaleX(-1)" : "none" }}
  >
    <path
      d="M25 95 C15 85, 10 70, 12 55 C14 40, 20 30, 25 20 M25 95 C20 80, 18 65, 20 50 C22 35, 25 25, 25 20"
      stroke="#C9A227"
      strokeWidth="2"
      fill="none"
    />
    <ellipse cx="12" cy="75" rx="6" ry="10" fill="#C9A227" opacity="0.8" transform="rotate(-20 12 75)" />
    <ellipse cx="14" cy="60" rx="5" ry="9" fill="#C9A227" opacity="0.7" transform="rotate(-15 14 60)" />
    <ellipse cx="18" cy="45" rx="5" ry="8" fill="#C9A227" opacity="0.6" transform="rotate(-10 18 45)" />
    <ellipse cx="22" cy="32" rx="4" ry="7" fill="#C9A227" opacity="0.5" transform="rotate(-5 22 32)" />
    <ellipse cx="20" cy="82" rx="5" ry="8" fill="#C9A227" opacity="0.75" transform="rotate(-25 20 82)" />
    <ellipse cx="22" cy="68" rx="4" ry="7" fill="#C9A227" opacity="0.65" transform="rotate(-18 22 68)" />
    <ellipse cx="24" cy="55" rx="4" ry="6" fill="#C9A227" opacity="0.55" transform="rotate(-10 24 55)" />
  </svg>
)

// Greek Column SVG
const GreekColumn = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 120" fill="none">
    {/* Capital */}
    <rect x="2" y="0" width="36" height="6" fill="url(#goldGradient)" rx="1" />
    <rect x="5" y="6" width="30" height="4" fill="url(#goldGradient)" rx="1" />
    <path d="M8 10 L8 14 Q20 18 32 14 L32 10" fill="url(#goldGradient)" />

    {/* Shaft with flutes */}
    <rect x="10" y="14" width="20" height="96" fill="url(#marbleGradient)" />
    <path d="M12 14 L12 110" stroke="#d4c5a9" strokeWidth="0.5" />
    <path d="M16 14 L16 110" stroke="#d4c5a9" strokeWidth="0.5" />
    <path d="M20 14 L20 110" stroke="#d4c5a9" strokeWidth="0.5" />
    <path d="M24 14 L24 110" stroke="#d4c5a9" strokeWidth="0.5" />
    <path d="M28 14 L28 110" stroke="#d4c5a9" strokeWidth="0.5" />

    {/* Base */}
    <rect x="8" y="110" width="24" height="4" fill="url(#goldGradient)" rx="1" />
    <rect x="5" y="114" width="30" height="6" fill="url(#goldGradient)" rx="1" />

    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#F4E4BA" />
        <stop offset="100%" stopColor="#C9A227" />
      </linearGradient>
      <linearGradient id="marbleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f5f0e6" />
        <stop offset="50%" stopColor="#faf8f3" />
        <stop offset="100%" stopColor="#ebe6d9" />
      </linearGradient>
    </defs>
  </svg>
)

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center gap-1 bg-stone-200/80 rounded-full p-1 shadow-inner border border-amber-200">
    <button
      onClick={() => setLang('en')}
      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 font-cinzel ${
        lang === 'en'
          ? 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 shadow-md border border-amber-300'
          : 'text-stone-600 hover:text-amber-800'
      }`}
    >
      EN
    </button>
    <button
      onClick={() => setLang('ko')}
      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
        lang === 'ko'
          ? 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 shadow-md border border-amber-300'
          : 'text-stone-600 hover:text-amber-800'
      }`}
    >
      한국어
    </button>
  </div>
)

// Modal for detailed information
const DetailModal = ({ stage, lang, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
      exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #faf8f3 0%, #f5f0e6 50%, #ebe6d9 100%)',
        border: '3px solid #C9A227',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />

      {/* Header */}
      <div className="p-5 text-center border-b-2 border-amber-200">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-2xl">{stage.icon}</span>
          <span
            className="font-cinzel text-xl font-bold"
            style={{ color: stage.color }}
          >
            {stage.roman}
          </span>
        </div>
        <h3
          className="font-playfair text-xl font-bold"
          style={{ color: stage.color }}
        >
          {lang === 'ko' ? stage.nameKo : stage.nameEn}
        </h3>
        {lang === 'ko' && (
          <p className="text-sm text-stone-600 font-medium mt-1">{stage.nameEn}</p>
        )}
        <div
          className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: stage.color }}
        >
          {lang === 'ko' ? stage.phase.ko : stage.phase.en}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Characteristics */}
        <div>
          <h4 className="font-cinzel text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <span className="text-base">📋</span>
            {lang === 'ko' ? '주요 특징' : 'Key Characteristics'}
          </h4>
          <ul className="space-y-1.5">
            {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).map((item, i) => (
              <li key={i} className="text-sm text-stone-700 flex items-start gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: stage.color }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Behaviors */}
        <div>
          <h4 className="font-cinzel text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <span className="text-base">⚡</span>
            {lang === 'ko' ? '행동 패턴' : 'Behavioral Patterns'}
          </h4>
          <ul className="space-y-1.5">
            {(lang === 'ko' ? stage.behaviors.ko : stage.behaviors.en).map((item, i) => (
              <li key={i} className="text-sm text-stone-700 flex items-start gap-2">
                <span className="text-stone-400 text-sm">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Intervention */}
        <div
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: `${stage.color}15` }}
        >
          <h4
            className="font-cinzel text-sm font-semibold mb-2 flex items-center justify-center gap-2"
            style={{ color: stage.color }}
          >
            <span className="text-base">🛡️</span>
            {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
          </h4>
          <p className="text-sm text-stone-800 font-medium">
            {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
          </p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-800 transition-colors"
      >
        ✕
      </button>

      {/* Decorative bottom border */}
      <div className="h-2 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
    </motion.div>
  </motion.div>
)

// Spiral Stage Card
const SpiralStageCard = ({ stage, index, lang, onClick, totalStages = 9 }) => {
  // Calculate 3D spiral position
  const angle = (index / totalStages) * 360 * 0.9 // Spiral angle
  const radius = 38 - (index * 3.2) // Decreasing radius for cone effect
  const verticalPosition = index * 9.5 // Vertical spacing
  const scale = 1 - (index * 0.045) // Scale decreases as we go down
  const zPosition = 50 - (index * 12) // Z-depth for 3D effect

  // Calculate position
  const xPosition = 50 + radius * Math.cos((angle - 90) * Math.PI / 180)
  const yPosition = verticalPosition

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="absolute cursor-pointer"
      style={{
        left: `${xPosition}%`,
        top: `${yPosition}%`,
        transform: `translateX(-50%) translateZ(${zPosition}px) rotateY(${angle * 0.15}deg)`,
        zIndex: totalStages - index,
      }}
      onClick={onClick}
      whileHover={{
        scale: scale * 1.15,
        zIndex: 100,
        transition: { duration: 0.2 }
      }}
    >
      <div
        className="relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        style={{
          transform: `scale(${scale})`,
          background: 'linear-gradient(135deg, #faf8f3 0%, #f5f0e6 50%, #ebe6d9 100%)',
          border: `2px solid ${stage.borderColor}`,
          boxShadow: `0 4px 20px ${stage.color}30, inset 0 1px 0 rgba(255,255,255,0.8)`,
          width: '140px',
        }}
      >
        {/* Gold accent top */}
        <div
          className="h-1 rounded-t-xl"
          style={{ background: `linear-gradient(90deg, ${stage.color}, #C9A227, ${stage.color})` }}
        />

        <div className="p-3 text-center">
          {/* Roman numeral badge */}
          <div
            className="font-cinzel text-base font-bold mb-1"
            style={{ color: stage.color }}
          >
            {stage.roman}
          </div>

          {/* Icon */}
          <div className="text-xl mb-1">{stage.icon}</div>

          {/* Name */}
          <h3
            className="font-playfair text-sm font-semibold leading-tight"
            style={{ color: stage.color }}
          >
            {lang === 'ko' ? stage.nameKo : stage.nameEn}
          </h3>

          {/* English subtitle for Korean */}
          {lang === 'ko' && (
            <p className="text-xs text-stone-500 mt-0.5 font-medium truncate">
              {stage.nameEn}
            </p>
          )}
        </div>

        {/* Gold accent bottom */}
        <div
          className="h-1 rounded-b-xl"
          style={{ background: `linear-gradient(90deg, ${stage.color}, #C9A227, ${stage.color})` }}
        />
      </div>
    </motion.div>
  )
}

// Phase Indicator
const PhaseIndicator = ({ phase, lang, style }) => {
  const phaseConfig = {
    1: { color: '#10B981', label: { ko: 'I: 상호 승리', en: 'I: Win-Win' } },
    2: { color: '#F59E0B', label: { ko: 'II: 승패 구도', en: 'II: Win-Lose' } },
    3: { color: '#EF4444', label: { ko: 'III: 상호 손실', en: 'III: Lose-Lose' } },
  }
  const config = phaseConfig[phase]

  return (
    <div className="absolute text-center" style={style}>
      <div
        className="px-2 py-1 rounded-full text-xs font-cinzel font-semibold text-white shadow-md"
        style={{ backgroundColor: config.color }}
      >
        {lang === 'ko' ? config.label.ko : config.label.en}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [selectedStage, setSelectedStage] = useState(null)

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #faf8f3 0%, #f5f0e6 25%, #ebe6d9 50%, #f5f0e6 75%, #faf8f3 100%)
        `,
      }}
    >
      {/* Marble texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative columns - left */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
        <GreekColumn className="w-8 h-28" />
      </div>

      {/* Decorative columns - right */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
        <GreekColumn className="w-8 h-28" />
      </div>

      {/* Header */}
      <header className="relative z-30 pt-3 pb-2">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left laurel */}
            <LaurelWreath className="w-8 h-16 opacity-70 hidden sm:block" side="left" />

            {/* Title */}
            <div className="text-center flex-1">
              <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-stone-800 tracking-wide">
                {lang === 'ko' ? 'Glasl 갈등 격화 9단계' : "Glasl's 9 Stages"}
              </h1>
              <p className="font-playfair text-sm text-amber-700 mt-0.5">
                Friedrich Glasl, 1980
              </p>
            </div>

            {/* Right laurel */}
            <LaurelWreath className="w-8 h-16 opacity-70 hidden sm:block" side="right" />
          </div>

          {/* Language toggle - centered below title */}
          <div className="flex justify-center mt-2">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-2 flex items-center justify-center gap-2 px-4">
          <div className="flex-1 max-w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <div className="flex-1 max-w-32 h-0.5 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
        </div>
      </header>

      {/* Instruction */}
      <div className="text-center py-2 relative z-20">
        <p className="text-sm text-stone-600 font-medium">
          {lang === 'ko' ? '각 단계를 클릭하여 상세 정보 확인' : 'Click each stage for details'}
        </p>
        <div className="flex items-center justify-center gap-3 mt-1.5">
          <span className="text-xs text-emerald-700 font-cinzel font-semibold">
            {lang === 'ko' ? '협력' : 'Cooperation'}
          </span>
          <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 shadow-sm" />
          <span className="text-xs text-red-700 font-cinzel font-semibold">
            {lang === 'ko' ? '파괴' : 'Destruction'}
          </span>
        </div>
      </div>

      {/* 3D Spiral Container */}
      <main
        className="relative w-full mx-auto"
        style={{
          height: 'calc(100vh - 180px)',
          minHeight: '500px',
          maxHeight: '700px',
          perspective: '1200px',
          perspectiveOrigin: '50% 20%',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(15deg)',
          }}
        >
          {/* Phase indicators */}
          <PhaseIndicator
            phase={1}
            lang={lang}
            style={{ left: '8%', top: '8%' }}
          />
          <PhaseIndicator
            phase={2}
            lang={lang}
            style={{ right: '8%', top: '38%' }}
          />
          <PhaseIndicator
            phase={3}
            lang={lang}
            style={{ left: '8%', top: '68%' }}
          />

          {/* Central spiral guide line (decorative) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path
              d="M50,5 Q75,15 62,25 Q35,35 58,45 Q78,55 55,65 Q32,75 52,85 Q60,92 50,95"
              fill="none"
              stroke="url(#spiralGradient)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          </svg>

          {/* Stage Cards */}
          {stages.map((stage, index) => (
            <SpiralStageCard
              key={stage.id}
              stage={stage}
              index={index}
              lang={lang}
              onClick={() => setSelectedStage(stage)}
              totalStages={stages.length}
            />
          ))}
        </div>
      </main>

      {/* Legend - Fixed at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-stone-100/95 to-transparent backdrop-blur-sm py-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
              <span className="text-xs text-stone-600">
                {lang === 'ko' ? '1-3: 대화' : '1-3: Dialogue'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
              <span className="text-xs text-stone-600">
                {lang === 'ko' ? '4-6: 조정' : '4-6: Mediation'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600" />
              <span className="text-xs text-stone-600">
                {lang === 'ko' ? '7-9: 개입' : '7-9: Intervention'}
              </span>
            </div>
          </div>
          <p className="text-center text-xs text-stone-500 mt-1 font-playfair">
            Glasl's Conflict Escalation Model
          </p>
        </div>
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
