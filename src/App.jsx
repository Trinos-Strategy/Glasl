import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const PHASE_COLORS = {
  1: { primary: '#10B981', secondary: '#6EE7B7', bg: 'rgba(16, 185, 129, 0.08)' },
  2: { primary: '#F59E0B', secondary: '#FCD34D', bg: 'rgba(245, 158, 11, 0.08)' },
  3: { primary: '#EF4444', secondary: '#FCA5A5', bg: 'rgba(239, 68, 68, 0.08)' },
}

const STAGE_COLORS = [
  '#10B981', '#059669', '#047857',  // Phase I (Emerald gradient)
  '#F59E0B', '#D97706', '#B45309',  // Phase II (Amber gradient)
  '#EF4444', '#DC2626', '#B91C1C',  // Phase III (Red gradient)
]

// ═══════════════════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages with Enhanced Metadata
// ═══════════════════════════════════════════════════════════════════════════

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
    phase: 1,
    riskLevel: 15,
    successRate: 92,
    avgDuration: 2,
    characteristics: {
      ko: ['입장이 충돌하지만 대화 가능', '아직 협력 의지 존재', '긴장감 있으나 해결 희망'],
      en: ['Positions clash but dialogue possible', 'Still willing to cooperate', 'Tension exists but hope for resolution']
    },
    behaviors: {
      ko: ['입장 고수', '상대 의견 경청 감소', '사실 왜곡 시작'],
      en: ['Holding positions', 'Less listening to others', 'Facts start to distort']
    },
    intervention: { ko: '자체 해결 가능', en: 'Self-resolution possible' },
    interventionType: 'self',
    phaseName: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' },
    actionItems: {
      ko: ['직접 대화 시도', '공통 관심사 파악', '감정 표현 장려'],
      en: ['Attempt direct dialogue', 'Identify common interests', 'Encourage emotional expression']
    }
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
    phase: 1,
    riskLevel: 25,
    successRate: 85,
    avgDuration: 3,
    characteristics: {
      ko: ['언어적 대립 심화', '논리보다 감정 우세', '승리에 집착 시작'],
      en: ['Verbal confrontation intensifies', 'Emotions over logic', 'Obsession with winning begins']
    },
    behaviors: {
      ko: ['전술적 조작', '양극화 심화', '상대 폄하'],
      en: ['Tactical manipulation', 'Polarization deepens', 'Belittling opponent']
    },
    intervention: { ko: '비공식 제3자 도움', en: 'Informal third-party help' },
    interventionType: 'self',
    phaseName: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' },
    actionItems: {
      ko: ['중립적 관점 도입', '논쟁 규칙 설정', '쉬는 시간 제안'],
      en: ['Introduce neutral perspective', 'Set debate rules', 'Suggest breaks']
    }
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
    phase: 1,
    riskLevel: 35,
    successRate: 78,
    avgDuration: 4,
    characteristics: {
      ko: ['대화 중단', '일방적 행동 시작', '공감 능력 저하'],
      en: ['Dialogue stops', 'Unilateral actions begin', 'Empathy diminishes']
    },
    behaviors: {
      ko: ['기정사실화 전술', '말보다 행동', '압박 증가'],
      en: ['Fait accompli tactics', 'Actions over words', 'Increasing pressure']
    },
    intervention: { ko: '훈련된 조정인 필요', en: 'Trained mediator needed' },
    interventionType: 'mediator',
    phaseName: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' },
    actionItems: {
      ko: ['행동 결과 분석', '대화 채널 재개', '조정인 고려'],
      en: ['Analyze action consequences', 'Reopen dialogue channels', 'Consider mediator']
    }
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
    phase: 2,
    riskLevel: 50,
    successRate: 65,
    avgDuration: 6,
    characteristics: {
      ko: ['상대를 적으로 인식', '동맹 형성 시작', '체면 중시'],
      en: ['Seeing opponent as enemy', 'Alliance forming begins', 'Focus on saving face']
    },
    behaviors: {
      ko: ['인신공격 시작', '흑백 논리', '지지자 모집'],
      en: ['Personal attacks begin', 'Black-white thinking', 'Recruiting supporters']
    },
    intervention: { ko: '전문 조정인 필요', en: 'Professional mediator needed' },
    interventionType: 'mediator',
    phaseName: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' },
    actionItems: {
      ko: ['전문 조정 요청', '동맹 해체 시도', '개인적 만남 주선'],
      en: ['Request professional mediation', 'Attempt to dissolve alliances', 'Arrange personal meetings']
    }
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
    phase: 2,
    riskLevel: 65,
    successRate: 52,
    avgDuration: 8,
    characteristics: {
      ko: ['상대 도덕성 공격', '완전한 불신', '공개적 망신'],
      en: ['Attacking moral integrity', 'Complete distrust', 'Public humiliation']
    },
    behaviors: {
      ko: ['조작과 방해', '비열한 수단', '상대 악마화'],
      en: ['Manipulation & sabotage', 'Foul play', 'Demonizing opponent']
    },
    intervention: { ko: '전문 조정 필수', en: 'Professional mediation essential' },
    interventionType: 'mediator',
    phaseName: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' },
    actionItems: {
      ko: ['체면 회복 기회 제공', '비공개 협상 시도', '감정 치유 시간'],
      en: ['Provide face-saving opportunities', 'Attempt private negotiations', 'Allow emotional healing time']
    }
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
    phase: 2,
    riskLevel: 75,
    successRate: 38,
    avgDuration: 10,
    characteristics: {
      ko: ['위협과 맞위협', '통제력 상실', '요구와 최후통첩'],
      en: ['Threats and counter-threats', 'Loss of control', 'Demands and ultimatums']
    },
    behaviors: {
      ko: ['제재 위협', '위협 악순환', '합리성 상실'],
      en: ['Threatening sanctions', 'Threat spiral', 'Loss of rationality']
    },
    intervention: { ko: '전문 조정 필수', en: 'Professional mediation essential' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' },
    actionItems: {
      ko: ['위협 중단 요청', '안전 보장 확보', '전문가 긴급 투입'],
      en: ['Request threat cessation', 'Secure safety guarantees', 'Deploy expert intervention']
    }
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
    phase: 3,
    riskLevel: 85,
    successRate: 25,
    avgDuration: 14,
    characteristics: {
      ko: ['상대에게 피해 주기', '소통 완전 단절', '적의 손실이 나의 이득'],
      en: ['Causing harm to opponent', 'No communication', "Enemy's loss = my gain"]
    },
    behaviors: {
      ko: ['위협 실행', '반응 기대 않음', '피해 유발 목표'],
      en: ['Executing threats', 'No reaction expected', 'Damage is the goal']
    },
    intervention: { ko: '공식적 개입 필요', en: 'Formal intervention needed' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' },
    actionItems: {
      ko: ['피해 최소화 조치', '공식 중재 기관 투입', '법적 보호 검토'],
      en: ['Damage minimization measures', 'Deploy formal arbitration', 'Review legal protections']
    }
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
    phase: 3,
    riskLevel: 92,
    successRate: 15,
    avgDuration: 18,
    characteristics: {
      ko: ['조직적 파괴 시도', '존재 자체 위협', '생존 본능만 남음'],
      en: ['Systematic destruction', 'Existential threat', 'Only survival instinct']
    },
    behaviors: {
      ko: ['물리적/심리적 공격', '핵심 기반 파괴', '직접적 공격'],
      en: ['Physical/psychological attacks', 'Destroying core foundation', 'Direct attacks']
    },
    intervention: { ko: '강력한 외부 개입', en: 'Strong external intervention' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' },
    actionItems: {
      ko: ['즉각적 분리 조치', '안전 확보 최우선', '장기 회복 계획'],
      en: ['Immediate separation', 'Safety first priority', 'Long-term recovery plan']
    }
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
    phase: 3,
    riskLevel: 100,
    successRate: 5,
    avgDuration: 24,
    characteristics: {
      ko: ['자기 파멸 감수', '돌아갈 길 없음', '완전한 파멸 추구'],
      en: ['Self-destruction accepted', 'No way back', 'Total annihilation sought']
    },
    behaviors: {
      ko: ['함께 파멸', '모든 것 희생', '궁극적 파괴'],
      en: ['Mutual destruction', 'Sacrificing everything', 'Ultimate destruction']
    },
    intervention: { ko: '강력한 외부 개입', en: 'Strong external intervention' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' },
    actionItems: {
      ko: ['긴급 위기 개입', '전문 심리 지원', '완전한 격리 및 보호'],
      en: ['Emergency crisis intervention', 'Professional psychological support', 'Complete isolation and protection']
    }
  },
]

const phases = [
  { id: 1, nameKo: '국면 I', nameEn: 'Phase I', subtitleKo: '상호 승리', subtitleEn: 'Win-Win', color: '#10B981', stages: [1, 2, 3] },
  { id: 2, nameKo: '국면 II', nameEn: 'Phase II', subtitleKo: '승패 구도', subtitleEn: 'Win-Lose', color: '#F59E0B', stages: [4, 5, 6] },
  { id: 3, nameKo: '국면 III', nameEn: 'Phase III', subtitleKo: '상호 손실', subtitleEn: 'Lose-Lose', color: '#EF4444', stages: [7, 8, 9] },
]

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

const getPhaseForStage = (stageId) => {
  if (stageId <= 3) return 1
  if (stageId <= 6) return 2
  return 3
}

const getRiskColor = (risk) => {
  if (risk <= 33) return '#10B981'
  if (risk <= 66) return '#F59E0B'
  return '#EF4444'
}

// ═══════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Language Toggle
const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center gap-1 p-1 rounded-full glass-card">
    {['en', 'ko'].map((l) => (
      <button
        key={l}
        onClick={() => setLang(l)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          lang === l
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {l === 'en' ? 'EN' : '한국어'}
      </button>
    ))}
  </div>
)

// Progress Bar Component
const ProgressBar = ({ value, color, animated = true, showLabel = false }) => (
  <div className="w-full">
    {showLabel && (
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
    )}
    <div className="progress-bar">
      <motion.div
        className="progress-bar-fill"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        initial={animated ? { width: 0 } : false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  </div>
)

// Mini Chart (Spotify Wrapped Style)
const MiniChart = ({ data, color }) => (
  <div className="mini-chart" style={{ color }}>
    {data.map((value, i) => (
      <motion.div
        key={i}
        className="mini-chart-bar"
        initial={{ height: 0 }}
        animate={{ height: `${value}%` }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      />
    ))}
  </div>
)

// Intervention Badge
const InterventionBadge = ({ type, lang }) => {
  const config = {
    self: {
      icon: '✓',
      labelKo: '자체 해결',
      labelEn: 'Self-resolve',
      className: 'self-resolve',
    },
    mediator: {
      icon: '👤',
      labelKo: '조정인 필요',
      labelEn: 'Mediator needed',
      className: 'mediator',
    },
    intervention: {
      icon: '🚨',
      labelKo: '긴급 개입',
      labelEn: 'Intervention',
      className: 'intervention',
    },
  }
  const c = config[type]
  return (
    <span className={`intervention-badge ${c.className}`}>
      <span>{c.icon}</span>
      <span>{lang === 'ko' ? c.labelKo : c.labelEn}</span>
    </span>
  )
}

// Stat Card (Spotify Wrapped Style)
const StatCard = ({ number, label, color, suffix = '', delay = 0 }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.div
      className="stat-number"
      style={{ color }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: delay + 0.2, type: 'spring' }}
    >
      {number}{suffix}
    </motion.div>
    <div className="stat-label">{label}</div>
  </motion.div>
)

// Accordion Component
const Accordion = ({ items, lang }) => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={i} className={`accordion-item ${openIndex === i ? 'open' : ''}`}>
          <button
            className="accordion-header"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{lang === 'ko' ? item.titleKo : item.titleEn}</span>
            </span>
            <svg
              className="accordion-icon w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="accordion-content">
            <div className="text-sm text-gray-600">
              {lang === 'ko' ? item.contentKo : item.contentEn}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Action Checklist
const ActionChecklist = ({ items, lang }) => {
  const [checked, setChecked] = useState([])

  const toggleItem = (index) => {
    setChecked(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="checklist">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="checklist-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <button
            className={`checklist-checkbox ${checked.includes(i) ? 'checked' : ''}`}
            onClick={() => toggleItem(i)}
          >
            {checked.includes(i) && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <span className={`checklist-text ${checked.includes(i) ? 'completed' : ''}`}>
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// Stage Card Component
const StageCard = ({ stage, lang, onClick, isActive, index }) => {
  const phaseClass = `phase-${stage.phase}`

  return (
    <motion.div
      className={`stage-card ${phaseClass} cursor-pointer ${isActive ? 'ring-2 ring-blue-500' : ''}`}
      style={{ '--stage-color': stage.color }}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{stage.icon}</span>
            <div
              className="text-lg font-bold"
              style={{ color: stage.color }}
            >
              {stage.roman}
            </div>
          </div>
          <InterventionBadge type={stage.interventionType} lang={lang} />
        </div>

        {/* Name */}
        <h3
          className="text-lg font-semibold mb-1"
          style={{ color: stage.color }}
        >
          {lang === 'ko' ? stage.nameKo : stage.nameEn}
        </h3>
        {lang === 'ko' && (
          <p className="text-xs text-gray-500 mb-3">{stage.nameEn}</p>
        )}

        {/* Risk Level Heat Map */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{lang === 'ko' ? '위험도' : 'Risk Level'}</span>
            <span>{stage.riskLevel}%</span>
          </div>
          <ProgressBar value={stage.riskLevel} color={getRiskColor(stage.riskLevel)} />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">{stage.successRate}%</div>
            <div className="text-gray-500">{lang === 'ko' ? '해결률' : 'Success'}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">{stage.avgDuration}{lang === 'ko' ? '주' : 'w'}</div>
            <div className="text-gray-500">{lang === 'ko' ? '평균기간' : 'Duration'}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Phase Section Container
const PhaseSection = ({ phase, children, lang, isHighlighted }) => (
  <motion.section
    className={`phase-section phase-section-${phase.id} ${isHighlighted ? 'ring-2 ring-blue-500' : ''}`}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: phase.id * 0.15 }}
  >
    {/* Phase Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
          style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}99)` }}
        >
          {phase.id}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {lang === 'ko' ? phase.nameKo : phase.nameEn}
          </h2>
          <p className="text-sm" style={{ color: phase.color }}>
            {lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}
          </p>
        </div>
      </div>
      <div
        className="px-3 py-1 rounded-full text-xs font-medium text-white"
        style={{ backgroundColor: phase.color }}
      >
        {lang === 'ko' ? `${phase.stages.length}단계` : `${phase.stages.length} Stages`}
      </div>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {children}
    </div>
  </motion.section>
)

// Timeline Node
const TimelineNode = ({ stage, isActive, onClick, lang }) => (
  <motion.button
    className={`timeline-node ${isActive ? 'active' : ''}`}
    style={{ color: stage.color }}
    onClick={onClick}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-sm font-bold">{stage.roman}</span>
  </motion.button>
)

// Interactive Timeline
const InteractiveTimeline = ({ stages, activeStage, setActiveStage, lang }) => (
  <div className="relative py-6">
    {/* Timeline Line */}
    <div className="timeline-line" />

    {/* Timeline Nodes */}
    <div className="timeline-container">
      {stages.map((stage) => (
        <TimelineNode
          key={stage.id}
          stage={stage}
          isActive={activeStage?.id === stage.id}
          onClick={() => setActiveStage(stage)}
          lang={lang}
        />
      ))}
    </div>

    {/* Phase Labels */}
    <div className="flex justify-between mt-4 px-4">
      {phases.map((phase) => (
        <div key={phase.id} className="text-center" style={{ width: '33%' }}>
          <div className="text-xs font-semibold" style={{ color: phase.color }}>
            {lang === 'ko' ? phase.nameKo : phase.nameEn}
          </div>
          <div className="text-xs text-gray-500">
            {lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Detail Modal
const DetailModal = ({ stage, lang, onClose }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="modal-content"
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 40 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${stage.color}, ${stage.color}cc)` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">{stage.icon}</span>
            <div>
              <div className="text-3xl font-bold">{stage.roman}</div>
              <div className="text-white/80 text-sm">
                {lang === 'ko' ? stage.phaseName.ko : stage.phaseName.en}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {lang === 'ko' ? stage.nameKo : stage.nameEn}
          </h2>
          {lang === 'ko' && (
            <p className="text-white/70">{stage.nameEn}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-100">
        <StatCard
          number={stage.riskLevel}
          suffix="%"
          label={lang === 'ko' ? '위험도' : 'Risk'}
          color={getRiskColor(stage.riskLevel)}
          delay={0}
        />
        <StatCard
          number={stage.successRate}
          suffix="%"
          label={lang === 'ko' ? '해결률' : 'Success Rate'}
          color="#10B981"
          delay={0.1}
        />
        <StatCard
          number={stage.avgDuration}
          suffix={lang === 'ko' ? '주' : 'w'}
          label={lang === 'ko' ? '평균기간' : 'Avg Duration'}
          color="#3B82F6"
          delay={0.2}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Accordion Sections */}
        <Accordion
          lang={lang}
          items={[
            {
              icon: '📋',
              titleKo: '주요 특징',
              titleEn: 'Key Characteristics',
              contentKo: stage.characteristics.ko.map((c, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: stage.color }} />
                  <span>{c}</span>
                </div>
              )),
              contentEn: stage.characteristics.en.map((c, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: stage.color }} />
                  <span>{c}</span>
                </div>
              )),
            },
            {
              icon: '⚡',
              titleKo: '행동 패턴',
              titleEn: 'Behavioral Patterns',
              contentKo: stage.behaviors.ko.map((b, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-gray-400">→</span>
                  <span>{b}</span>
                </div>
              )),
              contentEn: stage.behaviors.en.map((b, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-gray-400">→</span>
                  <span>{b}</span>
                </div>
              )),
            },
          ]}
        />

        {/* Intervention */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: `${stage.color}10` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🛡️</span>
            <h4 className="font-semibold" style={{ color: stage.color }}>
              {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
            </h4>
          </div>
          <p className="text-gray-700 mb-3">
            {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
          </p>
          <InterventionBadge type={stage.interventionType} lang={lang} />
        </div>

        {/* Action Items */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>✅</span>
            {lang === 'ko' ? '실행 체크리스트' : 'Action Checklist'}
          </h4>
          <ActionChecklist
            items={lang === 'ko' ? stage.actionItems.ko : stage.actionItems.en}
            lang={lang}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
        <button className="btn-secondary" onClick={onClose}>
          {lang === 'ko' ? '닫기' : 'Close'}
        </button>
        <button className="btn-primary">
          {lang === 'ko' ? '상세 분석' : 'Detailed Analysis'}
        </button>
      </div>
    </motion.div>
  </motion.div>
)

// Research Papers Data
const researchPapers = [
  // 핵심 이론 논문
  {
    category: 'theory',
    categoryKo: '핵심 이론 논문',
    categoryEn: 'Core Theory Papers',
    author: 'Glasl, F.',
    year: 2000,
    titleKo: '갈등 격화의 9단계 모델',
    titleEn: 'Nine-Stage Model of Conflict Escalation',
    publisher: 'University of Houston Law Center',
    citation: 'Cited by 37',
    summaryKo: 'Glasl의 원본 이론으로, 갈등이 협력에서 파괴로 진행되는 9단계를 체계적으로 분석한 기초 연구',
    summaryEn: 'Glasl\'s original theory systematically analyzing the 9 stages of conflict progression from cooperation to destruction',
    relatedStages: '전 단계 적용 가능',
  },
  {
    category: 'theory',
    categoryKo: '핵심 이론 논문',
    categoryEn: 'Core Theory Papers',
    author: 'Scheppa-Lahyani et al.',
    year: 2023,
    titleKo: '갈등 격화 설문지 개발 및 검증 연구',
    titleEn: 'Are you threatening me? Development and validation of the Conflict Escalation Questionnaire',
    publisher: 'Frontiers in Psychology',
    summaryKo: 'Glasl 모델 기반 갈등 격화 측정 도구의 과학적 검증 및 실증 연구',
    summaryEn: 'Scientific validation and empirical study of conflict escalation measurement tools based on the Glasl model',
    relatedStages: 'Stage 1-6 관련',
  },
  // 갈등 완화 전략 연구
  {
    category: 'deescalation',
    categoryKo: '갈등 완화 전략 연구',
    categoryEn: 'De-escalation Strategy Research',
    author: 'Kriesberg, L.',
    year: 1998,
    titleKo: '갈등 완화: 이론과 실제',
    titleEn: 'De-escalating Conflicts',
    publisher: 'Rowman & Littlefield Publishers',
    summaryKo: '갈등 완화의 조건, 과정, 전략에 대한 종합적 이론서',
    summaryEn: 'Comprehensive theoretical work on conditions, processes, and strategies of conflict de-escalation',
    relatedStages: '전 단계 적용 가능',
  },
  {
    category: 'deescalation',
    categoryKo: '갈등 완화 전략 연구',
    categoryEn: 'De-escalation Strategy Research',
    author: 'Crisis Prevention Institute',
    year: 2024,
    titleKo: '효과적인 갈등 관리를 위한 10가지 완화 전략',
    titleEn: 'Top 10 De-escalation Tips: Effective Conflict Management Strategies',
    publisher: 'CPI',
    summaryKo: '현장 적용 가능한 실용적 갈등 완화 기법과 커뮤니케이션 전략',
    summaryEn: 'Practical conflict de-escalation techniques and communication strategies applicable in the field',
    relatedStages: 'Stage 1-5 관련',
  },
  // 한국 공공갈등 조정 연구
  {
    category: 'korean',
    categoryKo: '한국 공공갈등 조정 연구',
    categoryEn: 'Korean Public Conflict Mediation Research',
    author: '한국행정연구원',
    year: 2024,
    titleKo: '공공갈등 조정의 성공 요인 분석',
    titleEn: 'Analysis of Success Factors in Public Conflict Mediation',
    publisher: '한국행정연구원',
    summaryKo: '조정인의 전문성과 신뢰성이 공공갈등 해결에 미치는 영향 분석',
    summaryEn: 'Analysis of how mediator expertise and credibility affect public conflict resolution',
    relatedStages: 'Stage 3-6 관련',
  },
  {
    category: 'korean',
    categoryKo: '한국 공공갈등 조정 연구',
    categoryEn: 'Korean Public Conflict Mediation Research',
    author: '한국지방자치학회',
    year: 2019,
    titleKo: '공공갈등 조정의 성공조건: 제도적 담론분석',
    titleEn: 'Success Conditions for Public Conflict Mediation: Institutional Discourse Analysis',
    publisher: '한국지방자치학회보',
    summaryKo: '제도적 관점에서 본 공공갈등 조정 성공의 구조적 조건 연구',
    summaryEn: 'Study on structural conditions for successful public conflict mediation from an institutional perspective',
    relatedStages: 'Stage 4-6 관련',
  },
  {
    category: 'korean',
    categoryKo: '한국 공공갈등 조정 연구',
    categoryEn: 'Korean Public Conflict Mediation Research',
    author: '통일연구원',
    year: 2024,
    titleKo: '갈등전환적 관점에서의 갈등 대응방안 연구',
    titleEn: 'Conflict Response Strategies from a Conflict Transformation Perspective',
    publisher: '통일연구원',
    summaryKo: '갈등을 변화의 기회로 전환하는 대응 전략과 정책적 함의 연구',
    summaryEn: 'Research on response strategies that transform conflict into opportunities for change and policy implications',
    relatedStages: '전 단계 적용 가능',
  },
  // 최신 응용 연구
  {
    category: 'applied',
    categoryKo: '최신 응용 연구',
    categoryEn: 'Recent Applied Research',
    author: 'IJSS',
    year: 2024,
    titleKo: '소셜 미디어를 통한 갈등 격화와 완화',
    titleEn: 'Social Media for Conflict Escalation and De-escalation',
    publisher: 'International Journal of Social Sciences',
    summaryKo: '디지털 플랫폼이 갈등 역학에 미치는 양면적 영향 분석',
    summaryEn: 'Analysis of the dual impact of digital platforms on conflict dynamics',
    relatedStages: 'Stage 2-5 관련',
  },
  {
    category: 'applied',
    categoryKo: '최신 응용 연구',
    categoryEn: 'Recent Applied Research',
    author: 'Fienitz, M.',
    year: 2025,
    titleKo: '토지 이용 갈등의 격화 메커니즘 규명',
    titleEn: 'How do land use conflicts escalate? Identifying causal mechanisms',
    publisher: 'People and Nature',
    summaryKo: '환경 갈등에서의 격화 원인과 경로를 추적한 실증 연구',
    summaryEn: 'Empirical study tracing escalation causes and pathways in environmental conflicts',
    relatedStages: 'Stage 3-7 관련',
  },
]

// Research Paper Card
const ResearchPaperCard = ({ paper, lang, index }) => (
  <motion.div
    className="glass-card rounded-xl p-4 hover:shadow-lg transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {paper.year}
        </span>
        {paper.citation && (
          <span className="text-xs text-gray-500">
            {paper.citation}
          </span>
        )}
      </div>
      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
        {paper.relatedStages}
      </span>
    </div>

    <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
      {lang === 'ko' ? paper.titleKo : paper.titleEn}
    </h4>

    <p className="text-xs text-gray-600 mb-2">
      {paper.author} • {paper.publisher}
    </p>

    <p className="text-xs text-gray-500 leading-relaxed">
      {lang === 'ko' ? paper.summaryKo : paper.summaryEn}
    </p>
  </motion.div>
)

// Research Papers Section
const ResearchPapersSection = ({ lang }) => {
  const categories = [
    { id: 'theory', icon: '📖' },
    { id: 'deescalation', icon: '🕊️' },
    { id: 'korean', icon: '🇰🇷' },
    { id: 'applied', icon: '🔬' },
  ]

  return (
    <motion.section
      className="glass-card rounded-3xl p-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <span>📚</span>
        {lang === 'ko' ? 'Glasl 모델 관련 학술 연구' : 'Academic Research on Glasl Model'}
      </h3>

      <div className="space-y-6">
        {categories.map((cat) => {
          const categoryPapers = researchPapers.filter(p => p.category === cat.id)
          if (categoryPapers.length === 0) return null

          return (
            <div key={cat.id}>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>{cat.icon}</span>
                {lang === 'ko' ? categoryPapers[0].categoryKo : categoryPapers[0].categoryEn}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryPapers.map((paper, idx) => (
                  <ResearchPaperCard
                    key={idx}
                    paper={paper}
                    lang={lang}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

// Interactive Legend
const InteractiveLegend = ({ activePhase, setActivePhase, lang }) => (
  <div className="flex items-center justify-center gap-2 flex-wrap">
    {phases.map((phase) => (
      <button
        key={phase.id}
        className={`legend-item ${activePhase === phase.id ? 'active' : ''}`}
        onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
      >
        <span className="legend-dot" style={{ backgroundColor: phase.color }} />
        <span className="text-sm font-medium text-gray-700">
          {lang === 'ko' ? `${phase.nameKo}: ${phase.subtitleKo}` : `${phase.nameEn}: ${phase.subtitleEn}`}
        </span>
      </button>
    ))}
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [selectedStage, setSelectedStage] = useState(null)
  const [activePhase, setActivePhase] = useState(null)
  const [activeTimelineStage, setActiveTimelineStage] = useState(null)
  const mainRef = useRef(null)

  // Scroll-based parallax
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 200], [0, -30])
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9])

  // Filter stages by active phase
  const getVisibleStages = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId)
    return stages.filter(s => phase.stages.includes(s.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 glass-panel"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-2xl gradient-full-spectrum flex items-center justify-center text-white font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                G
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  {lang === 'ko' ? 'Glasl 갈등 격화 9단계' : "Glasl's Conflict Escalation"}
                </h1>
                <p className="text-sm text-gray-500">
                  Friedrich Glasl, 1980
                </p>
              </div>
            </div>

            {/* Language Toggle */}
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Interactive Timeline Dashboard */}
        <motion.section
          className="glass-card rounded-3xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2 text-center">
            {lang === 'ko' ? '갈등 격화 타임라인' : 'Conflict Escalation Timeline'}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            {lang === 'ko' ? '각 단계를 클릭하여 상세 정보를 확인하세요' : 'Click each stage to view details'}
          </p>

          <InteractiveTimeline
            stages={stages}
            activeStage={activeTimelineStage}
            setActiveStage={(stage) => {
              setActiveTimelineStage(stage)
              setSelectedStage(stage)
            }}
            lang={lang}
          />
        </motion.section>

        {/* Stats Overview (Spotify Wrapped Style) */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="stat-card">
            <div className="stat-number text-emerald-500">3</div>
            <div className="stat-label">{lang === 'ko' ? '국면' : 'Phases'}</div>
            <div className="mt-2">
              <MiniChart data={[33, 33, 33]} color="#10B981" />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-blue-500">9</div>
            <div className="stat-label">{lang === 'ko' ? '단계' : 'Stages'}</div>
            <div className="mt-2">
              <MiniChart data={[15, 25, 35, 50, 65, 75, 85, 92, 100]} color="#3B82F6" />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-amber-500">50%</div>
            <div className="stat-label">{lang === 'ko' ? '평균 해결률' : 'Avg Success'}</div>
            <div className="mt-2">
              <ProgressBar value={50} color="#F59E0B" />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-red-500">45%</div>
            <div className="stat-label">{lang === 'ko' ? '평균 위험도' : 'Avg Risk'}</div>
            <div className="mt-2">
              <ProgressBar value={45} color="#EF4444" />
            </div>
          </div>
        </motion.section>

        {/* Interactive Legend */}
        <motion.section
          className="glass-card rounded-2xl p-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <InteractiveLegend
            activePhase={activePhase}
            setActivePhase={setActivePhase}
            lang={lang}
          />
        </motion.section>

        {/* Full Spectrum Progress */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-emerald-600">
              {lang === 'ko' ? '협력' : 'Cooperation'}
            </span>
            <span className="text-sm font-medium text-red-600">
              {lang === 'ko' ? '파괴' : 'Destruction'}
            </span>
          </div>
          <div className="h-3 rounded-full gradient-full-spectrum shadow-inner" />
        </motion.section>

        {/* Phase Sections */}
        <div className="space-y-8">
          {phases.map((phase) => (
            <PhaseSection
              key={phase.id}
              phase={phase}
              lang={lang}
              isHighlighted={activePhase === phase.id}
            >
              {getVisibleStages(phase.id).map((stage, index) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  lang={lang}
                  onClick={() => setSelectedStage(stage)}
                  isActive={selectedStage?.id === stage.id}
                  index={index}
                />
              ))}
            </PhaseSection>
          ))}
        </div>

        {/* Research Papers Section */}
        <ResearchPapersSection lang={lang} />

      </main>

      {/* Footer */}
      <footer className="glass-panel mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {lang === 'ko'
              ? '학술 연구 기반 갈등 관리 시스템'
              : 'Research-Based Conflict Management System'
            }
          </p>
          <p className="text-sm text-gray-500">
            {lang === 'ko'
              ? 'Glasl의 갈등 격화 모델 - 갈등 해결을 위한 체계적 접근'
              : "Glasl's Conflict Escalation Model - A Systematic Approach to Conflict Resolution"
            }
          </p>
          <div className="mt-3 flex items-center justify-center gap-6">
            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {lang === 'ko' ? '참고 문헌' : 'References'}
            </button>
            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {lang === 'ko' ? '방법론' : 'Methodology'}
            </button>
            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {lang === 'ko' ? '문의하기' : 'Contact'}
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            {lang === 'ko'
              ? `마지막 업데이트: 2024년 12월`
              : `Last Updated: December 2024`
            }
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStage && (
          <DetailModal
            stage={selectedStage}
            lang={lang}
            onClose={() => {
              setSelectedStage(null)
              setActiveTimelineStage(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
