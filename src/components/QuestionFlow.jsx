import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { questions, likertOptions } from '../utils/assessmentLogic'

const QuestionFlow = ({ lang, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1
  const canProceed = answers[currentQuestion.id] !== undefined

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (!canProceed) return

    if (isLastQuestion) {
      onComplete(answers)
    } else {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    } else {
      onBack()
    }
  }

  const getOptions = () => {
    if (currentQuestion.type === 'duration') {
      return currentQuestion.options[lang].map((opt, i) => ({
        value: i + 1,
        label: opt
      }))
    }
    return likertOptions[lang].map((opt, i) => ({
      value: i + 1,
      label: opt
    }))
  }

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  }

  return (
    <section className="question-flow">
      {/* Progress Bar */}
      <div className="question-progress">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="progress-text">
          <span className="progress-current">{currentIndex + 1}</span>
          <span className="progress-separator">/</span>
          <span className="progress-total">{questions.length}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-container">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="question-card"
          >
            <h2 className="question-text">
              {currentQuestion.text[lang]}
            </h2>

            <div className="options-container">
              {getOptions().map((option) => (
                <label
                  key={option.value}
                  className={`option-label ${answers[currentQuestion.id] === option.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={() => handleAnswer(option.value)}
                    className="option-input"
                  />
                  <span className="option-radio" />
                  <span className="option-text">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="question-nav">
        <button
          className="btn btn-ghost nav-prev"
          onClick={handlePrev}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {lang === 'ko' ? '이전' : 'Back'}
        </button>

        <button
          className={`btn btn-primary nav-next ${!canProceed ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!canProceed}
        >
          {isLastQuestion
            ? (lang === 'ko' ? '결과 보기' : 'See Results')
            : (lang === 'ko' ? '다음' : 'Next')
          }
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default QuestionFlow
