import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'

// ═══════════════════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages of Conflict Escalation
// ═══════════════════════════════════════════════════════════════════════════

const stages = [
  {
    id: 1, roman: 'I', nameEn: 'Hardening', nameKo: '경직화',
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
    id: 2, roman: 'II', nameEn: 'Debate', nameKo: '논쟁',
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
    id: 3, roman: 'III', nameEn: 'Actions', nameKo: '행동화',
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
    id: 4, roman: 'IV', nameEn: 'Coalitions', nameKo: '연합',
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
    id: 5, roman: 'V', nameEn: 'Loss of Face', nameKo: '체면 손상',
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
    id: 6, roman: 'VI', nameEn: 'Threats', nameKo: '위협',
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
    id: 7, roman: 'VII', nameEn: 'Destruction', nameKo: '파괴',
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
    id: 8, roman: 'VIII', nameEn: 'Fragmentation', nameKo: '분열',
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
    id: 9, roman: 'IX', nameEn: 'Abyss', nameKo: '나락',
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

const useAnimatedCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return { count, ref }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Language Toggle - Minimal
const LanguageToggle = ({ lang, setLang }) => (
  <div className="lang-toggle">
    {['en', 'ko'].map((l) => (
      <button
        key={l}
        onClick={() => setLang(l)}
        className={`lang-btn ${lang === l ? 'active' : ''}`}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
)

// Stage Card - Luxury Minimal Design with Phase Colors
const StageCard = ({ stage, lang, onClick, index }) => (
  <motion.article
    className={`stage-card phase-${stage.phase}`}
    onClick={onClick}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
  >
    <div className="stage-number">{stage.roman}</div>
    <h3 className="stage-name">{lang === 'ko' ? stage.nameKo : stage.nameEn}</h3>
    {lang === 'ko' && <p className="stage-name-en">{stage.nameEn}</p>}

    <div className="stage-meta">
      <div className="stage-stat">
        <div className="stage-stat-value">{stage.riskLevel}%</div>
        <div className="stage-stat-label">{lang === 'ko' ? '위험도' : 'Risk'}</div>
      </div>
      <div className="stage-stat">
        <div className="stage-stat-value">{stage.successRate}%</div>
        <div className="stage-stat-label">{lang === 'ko' ? '해결률' : 'Resolution'}</div>
      </div>
    </div>
  </motion.article>
)

// Phase Section with Phase-Specific Colors
const PhaseSection = ({ phase, children, lang }) => (
  <section className={`phase-section phase-${phase.id}`}>
    <div className="phase-header">
      <span className="phase-number">{lang === 'ko' ? phase.nameKo : phase.nameEn}</span>
      <h2 className="phase-title">{lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}</h2>
      <span className="phase-subtitle">
        {lang === 'ko' ? `${phase.stages.length}개 단계` : `${phase.stages.length} Stages`}
      </span>
    </div>
    <div className="stages-grid">
      {children}
    </div>
  </section>
)

// Timeline with Phase-Specific Node Colors
const Timeline = ({ stages, activeStage, setActiveStage, lang }) => (
  <div className="timeline">
    <div className="timeline-line" />
    <div className="timeline-nodes">
      {stages.map((stage) => (
        <button
          key={stage.id}
          className={`timeline-node phase-${stage.phase} ${activeStage?.id === stage.id ? 'active' : ''}`}
          onClick={() => setActiveStage(stage)}
        >
          <div className="timeline-dot" />
          <span className="timeline-label">{stage.roman}</span>
        </button>
      ))}
    </div>
  </div>
)

// Statistics Row
const StatsRow = ({ lang }) => {
  const stat1 = useAnimatedCounter(9)
  const stat2 = useAnimatedCounter(3)
  const stat3 = useAnimatedCounter(50)

  return (
    <div className="stats-row">
      <div className="stat-item" ref={stat1.ref}>
        <div className="stat-value">{stat1.count}</div>
        <div className="stat-label">{lang === 'ko' ? '갈등 단계' : 'Conflict Stages'}</div>
      </div>
      <div className="stat-item" ref={stat2.ref}>
        <div className="stat-value">{stat2.count}</div>
        <div className="stat-label">{lang === 'ko' ? '주요 국면' : 'Major Phases'}</div>
      </div>
      <div className="stat-item" ref={stat3.ref}>
        <div className="stat-value">{stat3.count}%</div>
        <div className="stat-label">{lang === 'ko' ? '평균 해결률' : 'Avg. Resolution'}</div>
      </div>
    </div>
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
            <span>{lang === 'ko' ? item.titleKo : item.titleEn}</span>
            <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="accordion-content">
            <div className="accordion-body">
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

  return (
    <div className="checklist">
      {items.map((item, i) => (
        <div key={i} className="checklist-item">
          <button
            className={`checklist-checkbox ${checked.includes(i) ? 'checked' : ''}`}
            onClick={() => setChecked(prev =>
              prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
            )}
          >
            {checked.includes(i) && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </button>
          <span className={`checklist-text ${checked.includes(i) ? 'completed' : ''}`}>
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}

// Detail Modal - Luxury Design
const DetailModal = ({ stage, lang, onClose }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    onClick={onClose}
  >
    <motion.div
      className="modal-content"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="modal-header">
        <button className="modal-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="stage-number" style={{ marginBottom: '16px' }}>{stage.roman}</div>
        <h2 className="stage-name" style={{ fontSize: '2rem' }}>
          {lang === 'ko' ? stage.nameKo : stage.nameEn}
        </h2>
        {lang === 'ko' && <p className="stage-name-en">{stage.nameEn}</p>}

        <p style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginTop: '16px'
        }}>
          {lang === 'ko' ? stage.phaseName.ko : stage.phaseName.en}
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div style={{ padding: '32px 16px', borderRight: '1px solid var(--border-light)' }}>
          <div className="stat-value" style={{ fontSize: '2.5rem' }}>{stage.riskLevel}%</div>
          <div className="stat-label">{lang === 'ko' ? '위험도' : 'Risk Level'}</div>
        </div>
        <div style={{ padding: '32px 16px', borderRight: '1px solid var(--border-light)' }}>
          <div className="stat-value" style={{ fontSize: '2.5rem' }}>{stage.successRate}%</div>
          <div className="stat-label">{lang === 'ko' ? '해결률' : 'Resolution'}</div>
        </div>
        <div style={{ padding: '32px 16px' }}>
          <div className="stat-value" style={{ fontSize: '2.5rem' }}>{stage.avgDuration}</div>
          <div className="stat-label">{lang === 'ko' ? '주 (평균)' : 'Weeks (Avg)'}</div>
        </div>
      </div>

      {/* Body */}
      <div className="modal-body">
        <Accordion
          lang={lang}
          items={[
            {
              titleKo: '주요 특징', titleEn: 'Key Characteristics',
              contentKo: (
                <ul className="modal-list">
                  {stage.characteristics.ko.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              ),
              contentEn: (
                <ul className="modal-list">
                  {stage.characteristics.en.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              ),
            },
            {
              titleKo: '경고 신호', titleEn: 'Warning Signals',
              contentKo: (
                <ul className="modal-list">
                  {stage.warningSignals?.ko.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              ),
              contentEn: (
                <ul className="modal-list">
                  {stage.warningSignals?.en.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              ),
            },
            {
              titleKo: '행동 패턴', titleEn: 'Behavioral Patterns',
              contentKo: (
                <ul className="modal-list">
                  {stage.behaviors.ko.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              ),
              contentEn: (
                <ul className="modal-list">
                  {stage.behaviors.en.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              ),
            },
            {
              titleKo: '해결 전략', titleEn: 'Resolution Strategy',
              contentKo: (
                <ul className="modal-list">
                  {stage.resolutionStrategy?.ko.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              ),
              contentEn: (
                <ul className="modal-list">
                  {stage.resolutionStrategy?.en.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              ),
            },
          ]}
        />

        {/* Example */}
        {stage.example && (
          <div className="quote-box">
            <p className="quote-text">
              "{lang === 'ko' ? stage.example.ko : stage.example.en}"
            </p>
            <p className="quote-label">{lang === 'ko' ? '대표 예시' : 'Example Case'}</p>
          </div>
        )}

        {/* Intervention */}
        <div className="intervention-card">
          <h4 className="intervention-title">
            {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
          </h4>
          <p className="intervention-text">
            {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
          </p>
          <span className={`badge phase-${stage.phase}`}>
            {stage.interventionType === 'self' && (lang === 'ko' ? '자체 해결' : 'Self-resolve')}
            {stage.interventionType === 'mediator' && (lang === 'ko' ? '조정인 필요' : 'Mediator needed')}
            {stage.interventionType === 'intervention' && (lang === 'ko' ? '긴급 개입' : 'Emergency intervention')}
          </span>
        </div>

        {/* Action Items */}
        <div className="modal-section">
          <h4 className="modal-section-title">
            {lang === 'ko' ? '실행 체크리스트' : 'Action Checklist'}
          </h4>
          <ActionChecklist
            items={lang === 'ko' ? stage.actionItems.ko : stage.actionItems.en}
            lang={lang}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          {lang === 'ko' ? '닫기' : 'Close'}
        </button>
      </div>
    </motion.div>
  </motion.div>
)

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [selectedStage, setSelectedStage] = useState(null)
  const [activeTimelineStage, setActiveTimelineStage] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getVisibleStages = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId)
    return stages.filter(s => phase.stages.includes(s.id))
  }

  return (
    <div style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <div className="logo">Glasl</div>
          <div className="nav-links">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {lang === 'ko' ? '갈등 격화 모델' : 'Conflict Escalation'}
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Friedrich Glasl, 1980
        </motion.p>
        <div className="scroll-indicator" />
      </section>

      {/* Stats Section */}
      <section className="section">
        <StatsRow lang={lang} />
      </section>

      {/* Timeline Section */}
      <section className="section">
        <div className="section-header">
          <span className="section-label">{lang === 'ko' ? '진행 과정' : 'Progression'}</span>
          <h2 className="section-title">
            {lang === 'ko' ? '9단계 갈등 격화 과정' : 'Nine Stages of Escalation'}
          </h2>
        </div>
        <div className="section-divider" />
        <Timeline
          stages={stages}
          activeStage={activeTimelineStage}
          setActiveStage={(stage) => {
            setActiveTimelineStage(stage)
            setSelectedStage(stage)
          }}
          lang={lang}
        />
      </section>

      {/* Phase Sections */}
      <section className="section">
        {phases.map((phase) => (
          <PhaseSection key={phase.id} phase={phase} lang={lang}>
            {getVisibleStages(phase.id).map((stage, index) => (
              <StageCard
                key={stage.id}
                stage={stage}
                lang={lang}
                onClick={() => setSelectedStage(stage)}
                index={index}
              />
            ))}
          </PhaseSection>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Glasl</div>
        <p className="footer-text">
          {lang === 'ko'
            ? 'Friedrich Glasl의 갈등 격화 모델을 기반으로 한 체계적 갈등 분석 도구'
            : "A systematic conflict analysis tool based on Friedrich Glasl's escalation model"}
        </p>
        <p className="footer-credit">Trinos Research Lab</p>
      </footer>

      {/* Modal */}
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
