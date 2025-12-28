import React, { useState } from 'react'
import { motion } from 'motion/react'
import { getPhaseInfo } from '../utils/assessmentLogic'
import { stageAdvice } from '../data/stageAdvice'

// Stage data (imported from main app, simplified here)
const stageData = {
  1: { roman: 'I', nameKo: '경직화', nameEn: 'Hardening', riskLevel: 15, successRate: 92 },
  2: { roman: 'II', nameKo: '논쟁', nameEn: 'Debate', riskLevel: 25, successRate: 85 },
  3: { roman: 'III', nameKo: '행동화', nameEn: 'Actions', riskLevel: 35, successRate: 78 },
  4: { roman: 'IV', nameKo: '연합', nameEn: 'Coalitions', riskLevel: 50, successRate: 65 },
  5: { roman: 'V', nameKo: '체면 손상', nameEn: 'Loss of Face', riskLevel: 65, successRate: 52 },
  6: { roman: 'VI', nameKo: '위협', nameEn: 'Threats', riskLevel: 75, successRate: 38 },
  7: { roman: 'VII', nameKo: '파괴', nameEn: 'Destruction', riskLevel: 85, successRate: 25 },
  8: { roman: 'VIII', nameKo: '분열', nameEn: 'Fragmentation', riskLevel: 92, successRate: 15 },
  9: { roman: 'IX', nameKo: '나락', nameEn: 'Abyss', riskLevel: 100, successRate: 5 }
}

const ResultPage = ({ result, lang, onViewFullModel, onRestart }) => {
  const [activeTab, setActiveTab] = useState('characteristics')

  const stage = stageData[result.stage]
  const advice = stageAdvice[result.stage]
  const phaseInfo = getPhaseInfo(result.phase, lang)

  const tabs = {
    ko: [
      { id: 'characteristics', label: '특징', icon: '📋' },
      { id: 'warnings', label: '경고 신호', icon: '⚠️' },
      { id: 'doNow', label: '즉시 실행', icon: '🎯' },
      { id: 'avoid', label: '피해야 할 행동', icon: '✕' }
    ],
    en: [
      { id: 'characteristics', label: 'Characteristics', icon: '📋' },
      { id: 'warnings', label: 'Warning Signs', icon: '⚠️' },
      { id: 'doNow', label: 'Do Now', icon: '🎯' },
      { id: 'avoid', label: 'Avoid', icon: '✕' }
    ]
  }

  const getTabContent = () => {
    switch (activeTab) {
      case 'characteristics':
        return advice.characteristics[lang]
      case 'warnings':
        return advice.warnings[lang]
      case 'doNow':
        return advice.doNow[lang]
      case 'avoid':
        return advice.avoid[lang]
      default:
        return []
    }
  }

  const phaseColorClass = `phase-${result.phase}`

  return (
    <section className="result-page">
      {/* Hero Result Card */}
      <motion.div
        className={`result-hero ${phaseColorClass}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="result-phase-badge">
          {phaseInfo.name[lang]} - {phaseInfo.subtitle[lang]}
        </div>

        <div className="result-stage-display">
          <span className="result-stage-roman">{stage.roman}</span>
          <div className="result-stage-info">
            <h1 className="result-stage-name">
              {lang === 'ko' ? stage.nameKo : stage.nameEn}
            </h1>
            {lang === 'ko' && (
              <p className="result-stage-name-en">{stage.nameEn}</p>
            )}
          </div>
        </div>

        <div className="result-stats">
          <div className="result-stat">
            <span className="result-stat-value">{stage.riskLevel}%</span>
            <span className="result-stat-label">
              {lang === 'ko' ? '위험도' : 'Risk Level'}
            </span>
          </div>
          <div className="result-stat-divider" />
          <div className="result-stat">
            <span className="result-stat-value">{stage.successRate}%</span>
            <span className="result-stat-label">
              {lang === 'ko' ? '해결 가능성' : 'Resolution Rate'}
            </span>
          </div>
        </div>

        <p className="result-phase-description">
          {phaseInfo.description[lang]}
        </p>

        <div className="result-intervention">
          <span className="intervention-label">
            {lang === 'ko' ? '권장 개입' : 'Recommended Intervention'}
          </span>
          <span className="intervention-value">
            {advice.intervention[lang]}
          </span>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="result-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="tabs-nav">
          {tabs[lang].map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          className="tab-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="advice-list">
            {getTabContent().map((item, index) => (
              <motion.li
                key={index}
                className="advice-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="result-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="btn btn-primary" onClick={onViewFullModel}>
          {lang === 'ko' ? '전체 9단계 모델 보기' : 'View Full 9-Stage Model'}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <button className="btn btn-secondary" onClick={onRestart}>
          {lang === 'ko' ? '다시 진단하기' : 'Retake Assessment'}
        </button>
      </motion.div>
    </section>
  )
}

export default ResultPage
