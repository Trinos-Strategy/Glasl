import React from 'react'
import { motion } from 'motion/react'

const AnalyzingTransition = ({ lang }) => {
  const content = {
    ko: {
      title: '답변을 분석하고 있습니다',
      subtitle: '잠시만 기다려 주세요'
    },
    en: {
      title: 'Analyzing your responses',
      subtitle: 'Please wait a moment'
    }
  }

  const t = content[lang]

  return (
    <section className="analyzing-transition">
      <div className="analyzing-content">
        {/* Animated Logo/Icon */}
        <motion.div
          className="analyzing-icon"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 100 100" className="analyzing-spinner">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--border-light)"
              strokeWidth="4"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--phase-1)" />
                <stop offset="50%" stopColor="var(--phase-2)" />
                <stop offset="100%" stopColor="var(--phase-3)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Text */}
        <motion.h2
          className="analyzing-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t.title}
        </motion.h2>

        <motion.p
          className="analyzing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t.subtitle}
        </motion.p>

        {/* Progress dots */}
        <div className="analyzing-dots">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="analyzing-dot"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnalyzingTransition
