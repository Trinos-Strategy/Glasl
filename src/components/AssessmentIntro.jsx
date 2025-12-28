import React from 'react'
import { motion } from 'motion/react'

const AssessmentIntro = ({ lang, onStart, onViewModel }) => {
  const content = {
    ko: {
      title: '당신의 갈등은',
      titleHighlight: '몇 단계인가요?',
      subtitle: '12개 질문으로 3분 안에 진단',
      benefits: [
        { icon: '🔒', text: '익명 진단' },
        { icon: '⚡', text: '즉시 결과' },
        { icon: '💡', text: '맞춤 조언' }
      ],
      cta: '진단 시작하기',
      secondary: '9단계 모델 먼저 보기'
    },
    en: {
      title: 'What stage is',
      titleHighlight: 'your conflict at?',
      subtitle: 'Diagnose in 3 minutes with 12 questions',
      benefits: [
        { icon: '🔒', text: 'Anonymous' },
        { icon: '⚡', text: 'Instant Results' },
        { icon: '💡', text: 'Personalized Advice' }
      ],
      cta: 'Start Assessment',
      secondary: 'View 9-Stage Model First'
    }
  }

  const t = content[lang]

  return (
    <section className="assessment-intro">
      <motion.div
        className="assessment-intro-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="assessment-title">
          {t.title}
          <br />
          <span className="assessment-title-highlight">{t.titleHighlight}</span>
        </h1>

        <motion.p
          className="assessment-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          className="assessment-benefits"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t.benefits.map((benefit, index) => (
            <div key={index} className="assessment-benefit">
              <span className="benefit-icon">{benefit.icon}</span>
              <span className="benefit-text">{benefit.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="assessment-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button className="btn btn-primary assessment-cta" onClick={onStart}>
            {t.cta}
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button className="btn btn-ghost assessment-secondary" onClick={onViewModel}>
            {t.secondary}
            <svg className="btn-arrow-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative gradient circles */}
      <div className="assessment-decoration">
        <div className="decoration-circle green" />
        <div className="decoration-circle amber" />
        <div className="decoration-circle red" />
      </div>
    </section>
  )
}

export default AssessmentIntro
