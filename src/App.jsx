import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'motion/react'

// ═══════════════════════════════════════════════════════════════════════════
// 2025 DESIGN SYSTEM - PHASE COLORS
// ═══════════════════════════════════════════════════════════════════════════

const PHASE_COLORS = {
  1: { from: '#00d4aa', to: '#00ff88', glow: 'rgba(0, 212, 170, 0.4)' },
  2: { from: '#ff9500', to: '#ffcc00', glow: 'rgba(255, 149, 0, 0.4)' },
  3: { from: '#ff3b5c', to: '#ff6b8a', glow: 'rgba(255, 59, 92, 0.4)' },
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages
// ═══════════════════════════════════════════════════════════════════════════

const stages = [
  {
    id: 1, roman: 'I', nameEn: 'Hardening', nameKo: '경직화', icon: '💬',
    phase: 1, riskLevel: 15, successRate: 92, avgDuration: 2,
    characteristics: { ko: ['간헐적 긴장', '의견 차이 표면화', '상호 존중 유지'], en: ['Intermittent tension', 'Differences surfacing', 'Mutual respect maintained'] },
    behaviors: { ko: ['입장 고수', '상대 의견 경청 감소', '사실 왜곡 시작'], en: ['Holding positions', 'Less listening', 'Facts distorting'] },
    warningSignals: { ko: ['회의 분위기 냉각', '비언어적 긴장'], en: ['Cooling atmosphere', 'Non-verbal tension'] },
    resolutionStrategy: { ko: ['개방적 대화', '상호 이해 강화', '공동 목표 확인'], en: ['Open dialogue', 'Mutual understanding', 'Shared goals'] },
    example: { ko: '프로젝트 방향성에 대한 초기 의견 불일치', en: 'Initial disagreement on project direction' },
    intervention: { ko: '자체 해결 가능', en: 'Self-resolution possible' },
    interventionType: 'self',
    phaseName: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' },
    actionItems: { ko: ['직접 대화 시도', '공통 관심사 파악', '감정 표현 장려'], en: ['Direct dialogue', 'Find common interests', 'Express emotions'] }
  },
  {
    id: 2, roman: 'II', nameEn: 'Debate', nameKo: '논쟁', icon: '⚡',
    phase: 1, riskLevel: 25, successRate: 85, avgDuration: 3,
    characteristics: { ko: ['분극화된 논쟁', '흑백논리 사고', '감정적 거리감 증가'], en: ['Polarized debate', 'Black-and-white thinking', 'Emotional distance'] },
    behaviors: { ko: ['전술적 조작', '양극화 심화', '상대 폄하'], en: ['Tactical manipulation', 'Polarization', 'Belittling opponent'] },
    warningSignals: { ko: ['상대방 입장 경청 거부', '반박 중심 대화'], en: ['Refusing to listen', 'Rebuttal-focused'] },
    resolutionStrategy: { ko: ['중재자 개입', '구조화된 토론', '공동 이익 발굴'], en: ['Mediator intervention', 'Structured discussion', 'Find shared interests'] },
    example: { ko: '팀 내 업무 방식에 대한 갈등', en: 'Conflict over work methods' },
    intervention: { ko: '비공식 제3자 도움', en: 'Informal third-party help' },
    interventionType: 'self',
    phaseName: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' },
    actionItems: { ko: ['중립적 관점 도입', '논쟁 규칙 설정', '쉬는 시간 제안'], en: ['Neutral perspective', 'Set rules', 'Take breaks'] }
  },
  {
    id: 3, roman: 'III', nameEn: 'Actions', nameKo: '행동화', icon: '🏃',
    phase: 1, riskLevel: 35, successRate: 78, avgDuration: 4,
    characteristics: { ko: ['대화 중단', '비언어적 압박', '공감 상실'], en: ['Dialogue stops', 'Non-verbal pressure', 'Loss of empathy'] },
    behaviors: { ko: ['기정사실화 전술', '말보다 행동', '압박 증가'], en: ['Fait accompli tactics', 'Actions over words', 'Increasing pressure'] },
    warningSignals: { ko: ['의사소통 두절', '일방적 행동'], en: ['Communication breakdown', 'Unilateral actions'] },
    resolutionStrategy: { ko: ['전문 조정인 필요', '공식적 대화 채널 확립'], en: ['Professional mediator needed', 'Establish formal channels'] },
    example: { ko: '상호 무시하며 독자적 의사결정', en: 'Independent decisions while ignoring each other' },
    intervention: { ko: '훈련된 조정인 필요', en: 'Trained mediator needed' },
    interventionType: 'mediator',
    phaseName: { ko: '국면 I: 상호 승리', en: 'Phase I: Win-Win' },
    actionItems: { ko: ['행동 결과 분석', '대화 채널 재개', '조정인 고려'], en: ['Analyze consequences', 'Reopen dialogue', 'Consider mediator'] }
  },
  {
    id: 4, roman: 'IV', nameEn: 'Coalitions', nameKo: '연합', icon: '👥',
    phase: 2, riskLevel: 50, successRate: 65, avgDuration: 6,
    characteristics: { ko: ['지지자 모집', '편 갈라치기', '승패 구도 형성'], en: ['Recruiting supporters', 'Taking sides', 'Win-lose dynamic'] },
    behaviors: { ko: ['인신공격 시작', '흑백 논리', '지지자 모집'], en: ['Personal attacks begin', 'Black-white thinking', 'Recruiting'] },
    warningSignals: { ko: ['파벌 형성', '상대방 비난'], en: ['Faction forming', 'Blaming opponents'] },
    resolutionStrategy: { ko: ['중립적 중재', '이해관계자 분석', '공동 근거 마련'], en: ['Neutral mediation', 'Stakeholder analysis', 'Common ground'] },
    example: { ko: '조직 내 파벌 싸움', en: 'Factional fighting within organization' },
    intervention: { ko: '전문 조정인 필요', en: 'Professional mediator needed' },
    interventionType: 'mediator',
    phaseName: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' },
    actionItems: { ko: ['전문 조정 요청', '동맹 해체 시도', '개인적 만남 주선'], en: ['Request mediation', 'Dissolve alliances', 'Arrange meetings'] }
  },
  {
    id: 5, roman: 'V', nameEn: 'Loss of Face', nameKo: '체면 손상', icon: '😤',
    phase: 2, riskLevel: 65, successRate: 52, avgDuration: 8,
    characteristics: { ko: ['인신공격', '신뢰 완전 상실', '공개적 모욕'], en: ['Personal attacks', 'Complete loss of trust', 'Public humiliation'] },
    behaviors: { ko: ['조작과 방해', '비열한 수단', '상대 악마화'], en: ['Manipulation & sabotage', 'Foul play', 'Demonizing'] },
    warningSignals: { ko: ['인격 공격', '평판 훼손'], en: ['Character attacks', 'Reputation damage'] },
    resolutionStrategy: { ko: ['전문가 개입 필수', '관계 복원 프로그램'], en: ['Expert intervention required', 'Relationship restoration'] },
    example: { ko: '공개적인 비난과 조롱', en: 'Public criticism and ridicule' },
    intervention: { ko: '전문 조정 필수', en: 'Professional mediation essential' },
    interventionType: 'mediator',
    phaseName: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' },
    actionItems: { ko: ['체면 회복 기회 제공', '비공개 협상 시도', '감정 치유 시간'], en: ['Provide face-saving', 'Private negotiations', 'Allow healing'] }
  },
  {
    id: 6, roman: 'VI', nameEn: 'Threats', nameKo: '위협', icon: '⚠️',
    phase: 2, riskLevel: 75, successRate: 38, avgDuration: 10,
    characteristics: { ko: ['제재 위협', '최후통첩', '통제 추구'], en: ['Threatening sanctions', 'Ultimatums', 'Seeking control'] },
    behaviors: { ko: ['제재 위협', '위협 악순환', '합리성 상실'], en: ['Threatening sanctions', 'Threat spiral', 'Loss of rationality'] },
    warningSignals: { ko: ['구체적 제재 언급', '압박 증가'], en: ['Specific sanctions', 'Increasing pressure'] },
    resolutionStrategy: { ko: ['긴급 개입', '공식 중재', '법적 개입 고려'], en: ['Emergency intervention', 'Formal mediation', 'Consider legal'] },
    example: { ko: '법적 조치 위협', en: 'Threatening legal action' },
    intervention: { ko: '전문 조정 필수', en: 'Professional mediation essential' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 II: 승패 구도', en: 'Phase II: Win-Lose' },
    actionItems: { ko: ['위협 중단 요청', '안전 보장 확보', '전문가 긴급 투입'], en: ['Request threat cessation', 'Secure safety', 'Deploy expert'] }
  },
  {
    id: 7, roman: 'VII', nameEn: 'Destruction', nameKo: '파괴', icon: '💥',
    phase: 3, riskLevel: 85, successRate: 25, avgDuration: 14,
    characteristics: { ko: ['제한적 파괴적 행동', '상대 피해 수용'], en: ['Limited destructive behavior', 'Accepting opponent harm'] },
    behaviors: { ko: ['위협 실행', '반응 기대 않음', '피해 유발 목표'], en: ['Executing threats', 'No reaction expected', 'Damage is goal'] },
    warningSignals: { ko: ['물리적 피해 발생'], en: ['Physical damage occurring'] },
    resolutionStrategy: { ko: ['긴급 개입', '분리 조치', '권위 개입'], en: ['Emergency intervention', 'Separation', 'Authority intervention'] },
    example: { ko: '자산 훼손, 업무 방해', en: 'Asset damage, work obstruction' },
    intervention: { ko: '공식적 개입 필요', en: 'Formal intervention needed' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' },
    actionItems: { ko: ['피해 최소화 조치', '공식 중재 기관 투입', '법적 보호 검토'], en: ['Minimize damage', 'Deploy arbitration', 'Review legal protection'] }
  },
  {
    id: 8, roman: 'VIII', nameEn: 'Fragmentation', nameKo: '분열', icon: '💔',
    phase: 3, riskLevel: 92, successRate: 15, avgDuration: 18,
    characteristics: { ko: ['상대 조직 파괴 추구', '통제력 무력화'], en: ['Seeking to destroy opponent', 'Neutralizing control'] },
    behaviors: { ko: ['물리적/심리적 공격', '핵심 기반 파괴', '직접적 공격'], en: ['Physical/psychological attacks', 'Destroying foundation', 'Direct attacks'] },
    warningSignals: { ko: ['시스템 전체 공격'], en: ['Attack on entire system'] },
    resolutionStrategy: { ko: ['법적 개입', '강제적 분리', '외부 관리'], en: ['Legal intervention', 'Forced separation', 'External management'] },
    example: { ko: '조직 와해 시도', en: 'Attempting to dismantle organization' },
    intervention: { ko: '강력한 외부 개입', en: 'Strong external intervention' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' },
    actionItems: { ko: ['즉각적 분리 조치', '안전 확보 최우선', '장기 회복 계획'], en: ['Immediate separation', 'Safety first', 'Long-term recovery'] }
  },
  {
    id: 9, roman: 'IX', nameEn: 'Abyss', nameKo: '나락', icon: '🕳️',
    phase: 3, riskLevel: 100, successRate: 5, avgDuration: 24,
    characteristics: { ko: ['상호 파멸', '자해 포함 모든 수단 동원'], en: ['Mutual destruction', 'Using all means including self-harm'] },
    behaviors: { ko: ['함께 파멸', '모든 것 희생', '궁극적 파괴'], en: ['Mutual destruction', 'Sacrificing everything', 'Ultimate destruction'] },
    warningSignals: { ko: ['회복 불가능한 피해'], en: ['Irreparable damage'] },
    resolutionStrategy: { ko: ['강제적 종결', '법적 해결', '장기 치료'], en: ['Forced termination', 'Legal resolution', 'Long-term treatment'] },
    example: { ko: '모두를 파멸시키는 극단적 행동', en: 'Extreme actions destroying everyone' },
    intervention: { ko: '강력한 외부 개입', en: 'Strong external intervention' },
    interventionType: 'intervention',
    phaseName: { ko: '국면 III: 상호 손실', en: 'Phase III: Lose-Lose' },
    actionItems: { ko: ['긴급 위기 개입', '전문 심리 지원', '완전한 격리 및 보호'], en: ['Emergency crisis intervention', 'Professional support', 'Complete isolation'] }
  },
]

const phases = [
  { id: 1, nameKo: '국면 I', nameEn: 'Phase I', subtitleKo: '상호 승리', subtitleEn: 'Win-Win', stages: [1, 2, 3] },
  { id: 2, nameKo: '국면 II', nameEn: 'Phase II', subtitleKo: '승패 구도', subtitleEn: 'Win-Lose', stages: [4, 5, 6] },
  { id: 3, nameKo: '국면 III', nameEn: 'Phase III', subtitleKo: '상호 손실', subtitleEn: 'Lose-Lose', stages: [7, 8, 9] },
]

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER HOOK
// ═══════════════════════════════════════════════════════════════════════════

const useAnimatedCounter = (end, duration = 1500, startOnView = true) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!startOnView || !isInView || hasAnimated.current) return
    hasAnimated.current = true

    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// ═══════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Theme Toggle
const ThemeToggle = ({ isDark, toggle }) => (
  <motion.button
    className={`theme-toggle ${isDark ? 'dark' : ''}`}
    onClick={toggle}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle theme"
  />
)

// Language Toggle
const LanguageToggle = ({ lang, setLang }) => (
  <div className="lang-toggle">
    {['en', 'ko'].map((l) => (
      <button
        key={l}
        onClick={() => setLang(l)}
        className={`lang-btn ${lang === l ? 'active' : ''}`}
      >
        {l === 'en' ? 'EN' : '한국어'}
      </button>
    ))}
  </div>
)

// Animated Progress Bar
const ProgressBar = ({ value, color, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="progress-bar">
      <motion.div
        className="progress-bar-fill"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

// Mini Chart
const MiniChart = ({ data, color }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="mini-chart" style={{ color }}>
      {data.map((value, i) => (
        <motion.div
          key={i}
          className="mini-chart-bar"
          initial={{ height: 0 }}
          animate={isInView ? { height: `${value}%` } : { height: 0 }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

// Animated Stat Card
const StatCard = ({ number, suffix = '', label, color, delay = 0, chart }) => {
  const { count, ref } = useAnimatedCounter(number)

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="stat-number" style={{ color }}>{count}{suffix}</div>
      <div className="stat-label">{label}</div>
      {chart && <div className="mt-3">{chart}</div>}
    </motion.div>
  )
}

// Intervention Badge
const InterventionBadge = ({ type, lang }) => {
  const config = {
    self: { icon: '✓', labelKo: '자체 해결', labelEn: 'Self-resolve', className: 'self-resolve' },
    mediator: { icon: '👤', labelKo: '조정인 필요', labelEn: 'Mediator', className: 'mediator' },
    intervention: { icon: '🚨', labelKo: '긴급 개입', labelEn: 'Intervention', className: 'intervention' },
  }
  const c = config[type]
  return (
    <motion.span
      className={`intervention-badge ${c.className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{c.icon}</span>
      <span>{lang === 'ko' ? c.labelKo : c.labelEn}</span>
    </motion.span>
  )
}

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
            <svg className="accordion-icon w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="accordion-content">
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
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
    setChecked(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
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
          <span className={`checklist-text ${checked.includes(i) ? 'completed' : ''}`}>{item}</span>
        </motion.div>
      ))}
    </div>
  )
}

// Stage Card - Premium 2025 Design
const StageCard = ({ stage, lang, onClick, isActive, index }) => {
  const phaseClass = `phase-${stage.phase}`
  const colors = PHASE_COLORS[stage.phase]

  return (
    <motion.div
      className={`stage-card ${phaseClass} ${isActive ? 'ring-2 ring-white/30' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {stage.icon}
            </motion.span>
            <div
              className="text-2xl font-black"
              style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {stage.roman}
            </div>
          </div>
          <InterventionBadge type={stage.interventionType} lang={lang} />
        </div>

        {/* Name */}
        <h3
          className="text-xl font-bold mb-1"
          style={{ color: colors.from }}
        >
          {lang === 'ko' ? stage.nameKo : stage.nameEn}
        </h3>
        {lang === 'ko' && (
          <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>{stage.nameEn}</p>
        )}

        {/* Risk Level */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
            <span>{lang === 'ko' ? '위험도' : 'Risk Level'}</span>
            <span className="font-semibold" style={{ color: colors.from }}>{stage.riskLevel}%</span>
          </div>
          <ProgressBar value={stage.riskLevel} color={colors.from} delay={index * 0.1} />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
            <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{stage.successRate}%</div>
            <div style={{ color: 'var(--text-tertiary)' }}>{lang === 'ko' ? '해결률' : 'Success'}</div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
            <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{stage.avgDuration}{lang === 'ko' ? '주' : 'w'}</div>
            <div style={{ color: 'var(--text-tertiary)' }}>{lang === 'ko' ? '평균기간' : 'Duration'}</div>
          </div>
        </div>

        {/* Details Button */}
        <motion.button
          type="button"
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); onClick(); }}
          className="mt-4 w-full py-3 px-4 rounded-xl font-semibold text-white transition-all"
          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${colors.glow}` }}
          whileTap={{ scale: 0.98 }}
        >
          {lang === 'ko' ? '상세 보기' : 'View Details'}
        </motion.button>
      </div>
    </motion.div>
  )
}

// Phase Section Container
const PhaseSection = ({ phase, children, lang, isHighlighted }) => {
  const colors = PHASE_COLORS[phase.id]

  return (
    <motion.section
      className={`phase-section phase-section-${phase.id} ${isHighlighted ? 'ring-2' : ''}`}
      style={{ '--phase-color': colors.from, borderColor: isHighlighted ? colors.from : 'var(--glass-border)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Phase Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {phase.id}
          </motion.div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {lang === 'ko' ? phase.nameKo : phase.nameEn}
            </h2>
            <p className="text-sm font-medium" style={{ color: colors.from }}>
              {lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}
            </p>
          </div>
        </div>
        <span
          className="px-4 py-2 rounded-full text-sm font-semibold text-white"
          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
        >
          {phase.stages.length} {lang === 'ko' ? '단계' : 'Stages'}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {children}
      </div>
    </motion.section>
  )
}

// Timeline Node
const TimelineNode = ({ stage, isActive, onClick, lang }) => {
  const colors = PHASE_COLORS[stage.phase]

  return (
    <motion.button
      className={`timeline-node ${isActive ? 'active' : ''}`}
      style={{ color: colors.from, borderColor: colors.from }}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="font-bold">{stage.roman}</span>
    </motion.button>
  )
}

// Interactive Timeline
const InteractiveTimeline = ({ stages, activeStage, setActiveStage, lang }) => (
  <div className="relative py-8">
    <div className="timeline-line" />
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
    <div className="flex justify-between mt-6 px-4">
      {phases.map((phase) => {
        const colors = PHASE_COLORS[phase.id]
        return (
          <div key={phase.id} className="text-center" style={{ width: '33%' }}>
            <div className="text-sm font-bold" style={{ color: colors.from }}>
              {lang === 'ko' ? phase.nameKo : phase.nameEn}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

// Detail Modal
const DetailModal = ({ stage, lang, onClose }) => {
  const colors = PHASE_COLORS[stage.phase]

  return (
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
          className="p-6 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/30 translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl">{stage.icon}</span>
              <div>
                <div className="text-3xl font-black text-white">{stage.roman}</div>
                <div className="text-white/80 text-sm">{lang === 'ko' ? stage.phaseName.ko : stage.phaseName.en}</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {lang === 'ko' ? stage.nameKo : stage.nameEn}
            </h2>
            {lang === 'ko' && <p className="text-white/70">{stage.nameEn}</p>}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
          >
            ✕
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 p-6" style={{ background: 'var(--glass-bg)' }}>
          <StatCard number={stage.riskLevel} suffix="%" label={lang === 'ko' ? '위험도' : 'Risk'} color={colors.from} />
          <StatCard number={stage.successRate} suffix="%" label={lang === 'ko' ? '해결률' : 'Success'} color="#00d4aa" />
          <StatCard number={stage.avgDuration} suffix={lang === 'ko' ? '주' : 'w'} label={lang === 'ko' ? '평균기간' : 'Duration'} color="#6366f1" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <Accordion
            lang={lang}
            items={[
              {
                icon: '📋', titleKo: '주요 특징', titleEn: 'Key Characteristics',
                contentKo: stage.characteristics.ko.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.from }} />
                    <span>{c}</span>
                  </div>
                )),
                contentEn: stage.characteristics.en.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.from }} />
                    <span>{c}</span>
                  </div>
                )),
              },
              {
                icon: '⚠️', titleKo: '경고 신호', titleEn: 'Warning Signals',
                contentKo: stage.warningSignals?.ko.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: '#ff9500' }}>!</span><span>{w}</span>
                  </div>
                )),
                contentEn: stage.warningSignals?.en.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: '#ff9500' }}>!</span><span>{w}</span>
                  </div>
                )),
              },
              {
                icon: '⚡', titleKo: '행동 패턴', titleEn: 'Behavioral Patterns',
                contentKo: stage.behaviors.ko.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: 'var(--text-tertiary)' }}>→</span><span>{b}</span>
                  </div>
                )),
                contentEn: stage.behaviors.en.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: 'var(--text-tertiary)' }}>→</span><span>{b}</span>
                  </div>
                )),
              },
              {
                icon: '💡', titleKo: '해결 전략', titleEn: 'Resolution Strategy',
                contentKo: stage.resolutionStrategy?.ko.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: '#00d4aa' }}>✓</span><span>{r}</span>
                  </div>
                )),
                contentEn: stage.resolutionStrategy?.en.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: '#00d4aa' }}>✓</span><span>{r}</span>
                  </div>
                )),
              },
            ]}
          />

          {/* Example Case */}
          {stage.example && (
            <div className="p-4 rounded-2xl" style={{ background: 'var(--glass-bg)', borderLeft: `4px solid ${colors.from}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📝</span>
                <h4 className="font-semibold">{lang === 'ko' ? '대표 예시' : 'Example Case'}</h4>
              </div>
              <p className="italic" style={{ color: 'var(--text-secondary)' }}>
                "{lang === 'ko' ? stage.example.ko : stage.example.en}"
              </p>
            </div>
          )}

          {/* Intervention */}
          <div className="p-4 rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}10)` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🛡️</span>
              <h4 className="font-semibold" style={{ color: colors.from }}>
                {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
              </h4>
            </div>
            <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
              {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
            </p>
            <InterventionBadge type={stage.interventionType} lang={lang} />
          </div>

          {/* Action Items */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span>✅</span>
              {lang === 'ko' ? '실행 체크리스트' : 'Action Checklist'}
            </h4>
            <ActionChecklist items={lang === 'ko' ? stage.actionItems.ko : stage.actionItems.en} lang={lang} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end gap-3" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            {lang === 'ko' ? '닫기' : 'Close'}
          </button>
          <button className="btn btn-primary">
            {lang === 'ko' ? '상세 분석' : 'Detailed Analysis'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Interactive Legend
const InteractiveLegend = ({ activePhase, setActivePhase, lang }) => (
  <div className="flex items-center justify-center gap-2 flex-wrap">
    {phases.map((phase) => {
      const colors = PHASE_COLORS[phase.id]
      return (
        <button
          key={phase.id}
          className={`legend-item ${activePhase === phase.id ? 'active' : ''}`}
          onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
        >
          <span className="legend-dot" style={{ backgroundColor: colors.from }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'ko' ? `${phase.nameKo}: ${phase.subtitleKo}` : `${phase.nameEn}: ${phase.subtitleEn}`}
          </span>
        </button>
      )
    })}
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [isDark, setIsDark] = useState(true)
  const [selectedStage, setSelectedStage] = useState(null)
  const [activePhase, setActivePhase] = useState(null)
  const [activeTimelineStage, setActiveTimelineStage] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme toggle
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDark)
  }, [isDark])

  const getVisibleStages = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId)
    return stages.filter(s => phase.stages.includes(s.id))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg"
                style={{ background: 'linear-gradient(135deg, #00d4aa, #ff9500, #ff3b5c)' }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                G
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'ko' ? 'Glasl 갈등 격화 9단계' : "Glasl's Conflict Escalation"}
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Friedrich Glasl, 1980</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
              <LanguageToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Bento Grid */}
        <motion.div
          className="bento-grid mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Timeline Card - Wide */}
          <motion.div
            className="bento-item bento-wide glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {lang === 'ko' ? '갈등 격화 타임라인' : 'Conflict Escalation Timeline'}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
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
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            className="bento-item bento-sm glass-card flex flex-col justify-center items-center p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              number={3}
              label={lang === 'ko' ? '국면' : 'Phases'}
              color="#6366f1"
              chart={<MiniChart data={[33, 33, 33]} color="#6366f1" />}
            />
          </motion.div>

          <motion.div
            className="bento-item bento-sm glass-card flex flex-col justify-center items-center p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              number={9}
              label={lang === 'ko' ? '단계' : 'Stages'}
              color="#00d4aa"
              chart={<MiniChart data={[15, 25, 35, 50, 65, 75, 85, 92, 100]} color="#00d4aa" />}
            />
          </motion.div>

          <motion.div
            className="bento-item bento-sm glass-card flex flex-col justify-center items-center p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              number={50}
              suffix="%"
              label={lang === 'ko' ? '평균 해결률' : 'Avg Success'}
              color="#ff9500"
              chart={<ProgressBar value={50} color="#ff9500" />}
            />
          </motion.div>

          <motion.div
            className="bento-item bento-sm glass-card flex flex-col justify-center items-center p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              number={45}
              suffix="%"
              label={lang === 'ko' ? '평균 위험도' : 'Avg Risk'}
              color="#ff3b5c"
              chart={<ProgressBar value={45} color="#ff3b5c" />}
            />
          </motion.div>
        </motion.div>

        {/* Interactive Legend */}
        <motion.section
          className="glass-card rounded-2xl p-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <InteractiveLegend activePhase={activePhase} setActivePhase={setActivePhase} lang={lang} />
        </motion.section>

        {/* Full Spectrum Progress */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gradient-phase-1">
              {lang === 'ko' ? '협력' : 'Cooperation'}
            </span>
            <span className="text-sm font-semibold text-gradient-phase-3">
              {lang === 'ko' ? '파괴' : 'Destruction'}
            </span>
          </div>
          <div className="gradient-spectrum" />
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
      </main>

      {/* Footer */}
      <footer className="footer mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white font-black text-2xl"
            style={{ background: 'linear-gradient(135deg, #00d4aa, #ff9500, #ff3b5c)' }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            G
          </motion.div>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            {lang === 'ko' ? '학술 연구 기반 갈등 관리 시스템' : 'Research-Based Conflict Management System'}
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            {lang === 'ko'
              ? 'Glasl의 갈등 격화 모델 - 갈등 해결을 위한 체계적 접근'
              : "Glasl's Conflict Escalation Model - A Systematic Approach to Conflict Resolution"}
          </p>
          <div className="flex items-center justify-center gap-6 mb-4">
            <a href="mailto:dkkim@swonlaw.com" className="text-sm transition-colors" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'ko' ? '문의하기' : 'Contact'}
            </a>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2024 Trinos Research Lab. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence mode="wait">
        {selectedStage && (
          <DetailModal
            key={selectedStage.id}
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
