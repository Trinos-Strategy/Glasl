import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages (Inverted Cone Style)
// ═══════════════════════════════════════════════════════════════

const stages = [
  {
    id: 1,
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
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
    <button
      onClick={() => setLang('en')}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
        lang === 'en'
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      EN
    </button>
    <button
      onClick={() => setLang('ko')}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
        lang === 'ko'
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      한국어
    </button>
  </div>
)

// Accordion Detail Content
const AccordionContent = ({ stage, lang }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="overflow-hidden"
  >
    <div
      className="p-4 md:p-5 space-y-4 border-t-2"
      style={{
        backgroundColor: `${stage.lightBg}`,
        borderColor: stage.borderColor
      }}
    >
      {/* Phase Badge */}
      <div
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
        style={{ backgroundColor: stage.color }}
      >
        {lang === 'ko' ? stage.phase.ko : stage.phase.en}
      </div>

      {/* Characteristics */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
          <span>📋</span>
          {lang === 'ko' ? '주요 특징' : 'Key Characteristics'}
        </h4>
        <ul className="space-y-1.5">
          {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).map((item, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
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
        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
          <span>⚡</span>
          {lang === 'ko' ? '행동 패턴' : 'Behavioral Patterns'}
        </h4>
        <ul className="space-y-1.5">
          {(lang === 'ko' ? stage.behaviors.ko : stage.behaviors.en).map((item, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-gray-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Intervention */}
      <div
        className="p-3 rounded-xl"
        style={{ backgroundColor: `${stage.color}15` }}
      >
        <h4
          className="text-sm font-bold mb-1 flex items-center gap-2"
          style={{ color: stage.color }}
        >
          🛡️ {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
        </h4>
        <p className="text-sm text-gray-700">
          {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
        </p>
      </div>
    </div>
  </motion.div>
)

// Stage Card with Accordion
const StageCard = ({ stage, index, lang, isExpanded, onToggle }) => {
  const cardRef = useRef(null)
  const totalStages = 9

  // Calculate width percentage for inverted cone effect
  const maxWidth = 100
  const minWidth = 50
  const widthPercent = maxWidth - ((index / (totalStages - 1)) * (maxWidth - minWidth))

  // Auto-scroll when expanded
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }, 100)
    }
  }, [isExpanded])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex justify-center"
      style={{ width: '100%' }}
    >
      <div
        className="transition-all duration-300"
        style={{ width: `${widthPercent}%`, minWidth: '280px', maxWidth: '100%' }}
      >
        {/* Card Header (Clickable) */}
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.98 }}
          className="w-full text-left rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          style={{
            backgroundColor: stage.lightBg,
            border: `2px solid ${stage.borderColor}`,
          }}
        >
          <div className="p-4 md:p-5 flex items-center gap-4">
            {/* Icon & Number */}
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0"
              style={{ backgroundColor: stage.color }}
            >
              <div className="text-center">
                <span className="text-lg md:text-xl block leading-none">{stage.icon}</span>
                <span className="text-xs opacity-80">{stage.id}</span>
              </div>
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-bold text-base md:text-lg truncate"
                style={{ color: stage.color }}
              >
                {lang === 'ko' ? stage.nameKo : stage.nameEn}
              </h3>
              {lang === 'ko' && (
                <p className="text-xs text-gray-500 truncate">{stage.nameEn}</p>
              )}
            </div>

            {/* Expand Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${stage.color}20` }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke={stage.color}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.button>

        {/* Accordion Content */}
        <AnimatePresence>
          {isExpanded && (
            <div
              className="rounded-b-2xl overflow-hidden -mt-2 shadow-md"
              style={{ border: `2px solid ${stage.borderColor}`, borderTop: 'none' }}
            >
              <AccordionContent stage={stage} lang={lang} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Phase Divider
const PhaseDivider = ({ phase, lang }) => {
  const phaseConfig = {
    1: { color: '#10B981', label: { ko: '국면 I: 상호 승리 (Win-Win)', en: 'Phase I: Win-Win' } },
    2: { color: '#F59E0B', label: { ko: '국면 II: 승패 구도 (Win-Lose)', en: 'Phase II: Win-Lose' } },
    3: { color: '#EF4444', label: { ko: '국면 III: 상호 손실 (Lose-Lose)', en: 'Phase III: Lose-Lose' } },
  }

  const config = phaseConfig[phase]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 py-4"
    >
      <div
        className="w-3 h-3 rounded-full shadow-sm"
        style={{ backgroundColor: config.color }}
      />
      <span
        className="text-sm font-semibold"
        style={{ color: config.color }}
      >
        {lang === 'ko' ? config.label.ko : config.label.en}
      </span>
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: `${config.color}30` }}
      />
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [expandedStage, setExpandedStage] = useState(null)

  const handleToggle = (stageId) => {
    setExpandedStage(expandedStage === stageId ? null : stageId)
  }

  // Group stages by phase
  const phase1 = stages.filter(s => s.id <= 3)
  const phase2 = stages.filter(s => s.id >= 4 && s.id <= 6)
  const phase3 = stages.filter(s => s.id >= 7)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              {lang === 'ko' ? 'Glasl 갈등 격화 9단계' : "Glasl's 9 Stages"}
            </h1>
            <p className="text-xs text-gray-500">Friedrich Glasl, 1980</p>
          </div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-gray-600 text-sm md:text-base">
            {lang === 'ko'
              ? '각 단계를 탭하여 상세 정보를 확인하세요'
              : 'Tap each stage for detailed information'}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-xs text-emerald-600 font-medium">
              {lang === 'ko' ? '협력' : 'Cooperation'}
            </span>
            <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" />
            <span className="text-xs text-red-600 font-medium">
              {lang === 'ko' ? '파괴' : 'Destruction'}
            </span>
          </div>
        </motion.div>

        {/* Phase I */}
        <PhaseDivider phase={1} lang={lang} />
        <div className="space-y-3 mb-6">
          {phase1.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={index}
              lang={lang}
              isExpanded={expandedStage === stage.id}
              onToggle={() => handleToggle(stage.id)}
            />
          ))}
        </div>

        {/* Phase II */}
        <PhaseDivider phase={2} lang={lang} />
        <div className="space-y-3 mb-6">
          {phase2.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={index + 3}
              lang={lang}
              isExpanded={expandedStage === stage.id}
              onToggle={() => handleToggle(stage.id)}
            />
          ))}
        </div>

        {/* Phase III */}
        <PhaseDivider phase={3} lang={lang} />
        <div className="space-y-3 mb-6">
          {phase3.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={index + 6}
              lang={lang}
              isExpanded={expandedStage === stage.id}
              onToggle={() => handleToggle(stage.id)}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-200"
        >
          <h3 className="font-bold text-gray-700 mb-3 text-sm">
            📊 {lang === 'ko' ? '단계별 색상 의미' : 'Color Legend'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-400 to-emerald-600" />
              <span className="text-xs text-gray-600">
                {lang === 'ko' ? '1-3: 대화 가능' : '1-3: Dialogue possible'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-400 to-amber-600" />
              <span className="text-xs text-gray-600">
                {lang === 'ko' ? '4-6: 조정 필요' : '4-6: Mediation needed'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-red-400 to-red-600" />
              <span className="text-xs text-gray-600">
                {lang === 'ko' ? '7-9: 개입 필수' : '7-9: Intervention required'}
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 bg-gray-50 mt-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Glasl's Model of Conflict Escalation
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Friedrich Glasl, <em>Konfliktmanagement</em>, 1980
          </p>
        </div>
      </footer>
    </div>
  )
}
