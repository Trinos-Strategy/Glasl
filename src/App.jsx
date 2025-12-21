import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════
// DATA - Glasl's 9 Stages of Conflict Escalation
// ═══════════════════════════════════════════════════════════════

const phases = [
  {
    id: 1,
    nameEn: 'Phase I: Win-Win',
    nameKo: '국면 I: 상호 승리',
    subtitleEn: 'Cooperation still possible',
    subtitleKo: '협력 가능',
    color: '#10B981',
    bgGradient: 'from-emerald-50 to-emerald-100',
    headerBg: 'bg-emerald-500',
    stages: [1, 2, 3]
  },
  {
    id: 2,
    nameEn: 'Phase II: Win-Lose',
    nameKo: '국면 II: 승패 구도',
    subtitleEn: 'One wins, one loses',
    subtitleKo: '한쪽이 이기고 한쪽이 짐',
    color: '#F59E0B',
    bgGradient: 'from-amber-50 to-amber-100',
    headerBg: 'bg-amber-500',
    stages: [4, 5, 6]
  },
  {
    id: 3,
    nameEn: 'Phase III: Lose-Lose',
    nameKo: '국면 III: 상호 손실',
    subtitleEn: 'Both parties lose',
    subtitleKo: '양쪽 모두 손실',
    color: '#EF4444',
    bgGradient: 'from-red-50 to-red-100',
    headerBg: 'bg-red-500',
    stages: [7, 8, 9]
  },
]

const stages = [
  {
    id: 1,
    phaseId: 1,
    nameEn: 'Hardening',
    nameKo: '경직화',
    colorIntensity: 'bg-emerald-100 border-emerald-300',
    textColor: 'text-emerald-700',
    characteristics: {
      ko: ['입장이 충돌하지만 대화 가능', '아직 협력 의지 존재', '긴장감 있으나 해결 희망'],
      en: ['Positions clash but dialogue possible', 'Still willing to cooperate', 'Tension exists but hope for resolution']
    },
    behaviors: {
      ko: ['입장 고수', '상대 의견 경청 감소', '사실 왜곡 시작'],
      en: ['Holding positions', 'Less listening to others', 'Facts start to distort']
    },
    intervention: {
      ko: '자체 해결 가능',
      en: 'Self-resolution possible'
    }
  },
  {
    id: 2,
    phaseId: 1,
    nameEn: 'Debate & Polemic',
    nameKo: '논쟁',
    colorIntensity: 'bg-emerald-200 border-emerald-400',
    textColor: 'text-emerald-800',
    characteristics: {
      ko: ['언어적 대립 심화', '논리보다 감정 우세', '승리에 집착 시작'],
      en: ['Verbal confrontation intensifies', 'Emotions over logic', 'Obsession with winning begins']
    },
    behaviors: {
      ko: ['전술적 조작', '양극화 심화', '상대 폄하'],
      en: ['Tactical manipulation', 'Polarization deepens', 'Belittling opponent']
    },
    intervention: {
      ko: '비공식 제3자 도움',
      en: 'Informal third-party help'
    }
  },
  {
    id: 3,
    phaseId: 1,
    nameEn: 'Actions, Not Words',
    nameKo: '행동화',
    colorIntensity: 'bg-emerald-300 border-emerald-500',
    textColor: 'text-emerald-900',
    characteristics: {
      ko: ['대화 중단', '일방적 행동 시작', '공감 능력 저하'],
      en: ['Dialogue stops', 'Unilateral actions begin', 'Empathy diminishes']
    },
    behaviors: {
      ko: ['기정사실화 전술', '말보다 행동', '압박 증가'],
      en: ['Fait accompli tactics', 'Actions over words', 'Increasing pressure']
    },
    intervention: {
      ko: '훈련된 조정자 필요',
      en: 'Trained mediator needed'
    }
  },
  {
    id: 4,
    phaseId: 2,
    nameEn: 'Images & Coalitions',
    nameKo: '이미지/연합',
    colorIntensity: 'bg-amber-100 border-amber-300',
    textColor: 'text-amber-700',
    characteristics: {
      ko: ['상대를 적으로 인식', '동맹 형성 시작', '체면 중시'],
      en: ['Seeing opponent as enemy', 'Alliance forming begins', 'Focus on saving face']
    },
    behaviors: {
      ko: ['인신공격 시작', '흑백 논리', '지지자 모집'],
      en: ['Personal attacks begin', 'Black-white thinking', 'Recruiting supporters']
    },
    intervention: {
      ko: '전문 조정자 필요',
      en: 'Professional mediator needed'
    }
  },
  {
    id: 5,
    phaseId: 2,
    nameEn: 'Loss of Face',
    nameKo: '체면 손상',
    colorIntensity: 'bg-amber-200 border-amber-400',
    textColor: 'text-amber-800',
    characteristics: {
      ko: ['상대 도덕성 공격', '완전한 불신', '공개적 망신'],
      en: ['Attacking moral integrity', 'Complete distrust', 'Public humiliation']
    },
    behaviors: {
      ko: ['조작과 방해', '비열한 수단', '상대 악마화'],
      en: ['Manipulation & sabotage', 'Foul play', 'Demonizing opponent']
    },
    intervention: {
      ko: '전문 조정 필수',
      en: 'Professional mediation essential'
    }
  },
  {
    id: 6,
    phaseId: 2,
    nameEn: 'Threat Strategies',
    nameKo: '위협 전략',
    colorIntensity: 'bg-amber-300 border-amber-500',
    textColor: 'text-amber-900',
    characteristics: {
      ko: ['위협과 맞위협', '통제력 상실', '요구와 최후통첩'],
      en: ['Threats and counter-threats', 'Loss of control', 'Demands and ultimatums']
    },
    behaviors: {
      ko: ['제재 위협', '위협 악순환', '합리성 상실'],
      en: ['Threatening sanctions', 'Threat spiral', 'Loss of rationality']
    },
    intervention: {
      ko: '전문 조정 필수',
      en: 'Professional mediation essential'
    }
  },
  {
    id: 7,
    phaseId: 3,
    nameEn: 'Limited Destruction',
    nameKo: '제한적 파괴',
    colorIntensity: 'bg-red-100 border-red-300',
    textColor: 'text-red-700',
    characteristics: {
      ko: ['상대에게 피해 주기', '소통 완전 단절', '적의 손실이 나의 이득'],
      en: ['Causing harm to opponent', 'No communication', "Enemy's loss = my gain"]
    },
    behaviors: {
      ko: ['위협 실행', '반응 기대 않음', '피해 유발 목표'],
      en: ['Executing threats', 'No reaction expected', 'Damage is the goal']
    },
    intervention: {
      ko: '공식적 개입 필요',
      en: 'Formal intervention needed'
    }
  },
  {
    id: 8,
    phaseId: 3,
    nameEn: 'Fragmentation',
    nameKo: '분열/파괴',
    colorIntensity: 'bg-red-200 border-red-400',
    textColor: 'text-red-800',
    characteristics: {
      ko: ['조직적 파괴 시도', '존재 자체 위협', '생존 본능만 남음'],
      en: ['Systematic destruction', 'Existential threat', 'Only survival instinct']
    },
    behaviors: {
      ko: ['물리적/심리적 공격', '핵심 기반 파괴', '직접적 공격'],
      en: ['Physical/psychological attacks', 'Destroying core foundation', 'Direct attacks']
    },
    intervention: {
      ko: '강력한 외부 개입',
      en: 'Strong external intervention'
    }
  },
  {
    id: 9,
    phaseId: 3,
    nameEn: 'Together into the Abyss',
    nameKo: '함께 나락으로',
    colorIntensity: 'bg-red-300 border-red-500',
    textColor: 'text-red-900',
    characteristics: {
      ko: ['자기 파멸 감수', '돌아갈 길 없음', '완전한 파멸 추구'],
      en: ['Self-destruction accepted', 'No way back', 'Total annihilation sought']
    },
    behaviors: {
      ko: ['함께 파멸', '모든 것 희생', '궁극적 파괴'],
      en: ['Mutual destruction', 'Sacrificing everything', 'Ultimate destruction']
    },
    intervention: {
      ko: '강력한 외부 개입',
      en: 'Strong external intervention'
    }
  },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
    <button
      onClick={() => setLang('en')}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
        lang === 'en'
          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      EN
    </button>
    <button
      onClick={() => setLang('ko')}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
        lang === 'ko'
          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      한국어
    </button>
  </div>
)

const StageCard = ({ stage, lang, onClick }) => {
  const phase = phases.find(p => p.stages.includes(stage.id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: stage.id * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${stage.colorIntensity} border-2 rounded-2xl p-4 cursor-pointer
        shadow-lg hover:shadow-xl transition-all duration-300 min-w-[280px] md:min-w-0`}
    >
      {/* Stage Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
          style={{ backgroundColor: phase.color }}
        >
          {stage.id}
        </div>
        <div>
          <h3 className={`font-bold ${stage.textColor}`}>
            {lang === 'ko' ? stage.nameKo : stage.nameEn}
          </h3>
          {lang === 'ko' && (
            <p className="text-xs text-gray-500">{stage.nameEn}</p>
          )}
        </div>
      </div>

      {/* Characteristics */}
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          {lang === 'ko' ? '특징' : 'Characteristics'}
        </h4>
        <ul className="space-y-1">
          {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).slice(0, 2).map((item, i) => (
            <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: phase.color }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Behaviors */}
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          {lang === 'ko' ? '행동 패턴' : 'Behaviors'}
        </h4>
        <ul className="space-y-1">
          {(lang === 'ko' ? stage.behaviors.ko : stage.behaviors.en).slice(0, 2).map((item, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
              <span className="text-gray-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Intervention */}
      <div
        className="px-3 py-2 rounded-lg text-xs font-medium text-center"
        style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
      >
        🛡️ {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
      </div>
    </motion.div>
  )
}

const PhaseSection = ({ phase, lang, onStageClick }) => {
  const phaseStages = stages.filter(s => phase.stages.includes(s.id))

  return (
    <div className="mb-8">
      {/* Phase Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`${phase.headerBg} text-white rounded-2xl p-4 mb-4 shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {lang === 'ko' ? phase.nameKo : phase.nameEn}
            </h2>
            <p className="text-white/80 text-sm mt-0.5">
              {lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}
            </p>
          </div>
          <div className="text-4xl font-bold opacity-30">
            {phase.id === 1 ? '🤝' : phase.id === 2 ? '⚔️' : '💥'}
          </div>
        </div>
      </motion.div>

      {/* Stage Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-3">
          {phaseStages.map(stage => (
            <StageCard
              key={stage.id}
              stage={stage}
              lang={lang}
              onClick={() => onStageClick(stage)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const DetailModal = ({ stage, lang, onClose }) => {
  const phase = phases.find(p => p.stages.includes(stage.id))

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
      >
        {/* Modal Header */}
        <div
          className="p-6 text-white"
          style={{ backgroundColor: phase.color }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                {stage.id}
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider">
                  {lang === 'ko' ? phase.nameKo : phase.nameEn}
                </p>
                <h2 className="text-xl font-bold">
                  {lang === 'ko' ? stage.nameKo : stage.nameEn}
                </h2>
                {lang === 'ko' && (
                  <p className="text-white/70 text-sm">{stage.nameEn}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Characteristics */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>📋</span>
              {lang === 'ko' ? '주요 특징' : 'Key Characteristics'}
            </h3>
            <ul className="space-y-2">
              {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2 bg-gray-50 p-2 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: phase.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Behaviors */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>⚡</span>
              {lang === 'ko' ? '행동 패턴' : 'Behavioral Patterns'}
            </h3>
            <ul className="space-y-2">
              {(lang === 'ko' ? stage.behaviors.ko : stage.behaviors.en).map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2 bg-gray-50 p-2 rounded-lg">
                  <span className="text-gray-400">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Intervention */}
          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: `${phase.color}15` }}
          >
            <h3 className="text-sm font-bold mb-1 flex items-center gap-2" style={{ color: phase.color }}>
              🛡️ {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
            </h3>
            <p className="text-sm text-gray-700">
              {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

const TableView = ({ lang, onStageClick }) => (
  <div className="hidden lg:block overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {phases.map(phase => (
            <th
              key={phase.id}
              colSpan={3}
              className="text-white text-center p-4 text-lg font-bold"
              style={{ backgroundColor: phase.color }}
            >
              {lang === 'ko' ? phase.nameKo : phase.nameEn}
              <div className="text-sm font-normal opacity-80 mt-0.5">
                {lang === 'ko' ? phase.subtitleKo : phase.subtitleEn}
              </div>
            </th>
          ))}
        </tr>
        <tr className="bg-gray-100">
          {stages.map(stage => (
            <th
              key={stage.id}
              className={`p-3 text-center border-x border-gray-200 ${stage.colorIntensity}`}
            >
              <div className="flex flex-col items-center gap-1">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: phases.find(p => p.stages.includes(stage.id)).color }}
                >
                  {stage.id}
                </span>
                <span className={`font-bold text-sm ${stage.textColor}`}>
                  {lang === 'ko' ? stage.nameKo : stage.nameEn}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Characteristics Row */}
        <tr>
          {stages.map(stage => (
            <td
              key={stage.id}
              className={`p-3 border border-gray-200 align-top ${stage.colorIntensity} bg-opacity-50`}
              onClick={() => onStageClick(stage)}
              style={{ cursor: 'pointer' }}
            >
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {lang === 'ko' ? '특징' : 'Characteristics'}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {(lang === 'ko' ? stage.characteristics.ko : stage.characteristics.en).map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: phases.find(p => p.stages.includes(stage.id)).color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </td>
          ))}
        </tr>
        {/* Behaviors Row */}
        <tr>
          {stages.map(stage => (
            <td
              key={stage.id}
              className={`p-3 border border-gray-200 align-top ${stage.colorIntensity} bg-opacity-30`}
              onClick={() => onStageClick(stage)}
              style={{ cursor: 'pointer' }}
            >
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {lang === 'ko' ? '행동' : 'Behaviors'}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {(lang === 'ko' ? stage.behaviors.ko : stage.behaviors.en).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </td>
          ))}
        </tr>
        {/* Intervention Row */}
        <tr>
          {stages.map(stage => {
            const phase = phases.find(p => p.stages.includes(stage.id))
            return (
              <td
                key={stage.id}
                className="p-3 border border-gray-200 align-middle bg-gray-50"
              >
                <div
                  className="text-xs font-medium text-center py-2 px-2 rounded-lg"
                  style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                >
                  🛡️ {lang === 'ko' ? stage.intervention.ko : stage.intervention.en}
                </div>
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  </div>
)

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState('ko')
  const [selectedStage, setSelectedStage] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent">
              {lang === 'ko' ? 'Glasl 갈등 격화 9단계' : "Glasl's 9 Stages of Conflict"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Friedrich Glasl, 1980</p>
          </div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'ko'
              ? '갈등은 9단계를 거쳐 점점 격화됩니다. 각 단계를 클릭하여 상세 정보를 확인하세요.'
              : 'Conflicts escalate through 9 stages. Click each stage for detailed information.'}
          </p>
        </motion.div>

        {/* Escalation Arrow - Visual Indicator */}
        <div className="hidden lg:flex items-center justify-center gap-2 mb-6">
          <span className="text-emerald-500 font-semibold text-sm">
            {lang === 'ko' ? '협력 가능' : 'Cooperation'}
          </span>
          <div className="flex-1 max-w-md h-2 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" />
          <span className="text-red-500 font-semibold text-sm">
            {lang === 'ko' ? '파괴' : 'Destruction'}
          </span>
        </div>

        {/* Table View (Desktop) */}
        <TableView lang={lang} onStageClick={setSelectedStage} />

        {/* Card View (Mobile/Tablet) */}
        <div className="lg:hidden">
          {phases.map(phase => (
            <PhaseSection
              key={phase.id}
              phase={phase}
              lang={lang}
              onStageClick={setSelectedStage}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <h3 className="font-bold text-gray-800 mb-3 text-sm">
            {lang === 'ko' ? '📊 단계별 색상 의미' : '📊 Color Legend'}
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-200 to-emerald-400" />
              <span className="text-sm text-gray-600">
                {lang === 'ko' ? '1-3단계: 대화로 해결 가능' : 'Stages 1-3: Dialogue possible'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-200 to-amber-400" />
              <span className="text-sm text-gray-600">
                {lang === 'ko' ? '4-6단계: 전문 조정 필요' : 'Stages 4-6: Mediation needed'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-red-200 to-red-400" />
              <span className="text-sm text-gray-600">
                {lang === 'ko' ? '7-9단계: 강력한 개입 필수' : 'Stages 7-9: Intervention required'}
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Glasl's Model of Conflict Escalation
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Friedrich Glasl, <em>Konfliktmanagement</em>, 1980
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
