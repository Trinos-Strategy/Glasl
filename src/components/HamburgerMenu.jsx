import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════════════════
// HAMBURGER MENU - Luxury Slide-in Navigation
// ═══════════════════════════════════════════════════════════════════════════

export default function HamburgerMenu({
  lang,
  onViewAll,
  onAssessment,
  stages,
  onSelectStage,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [showStageList, setShowStageList] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setShowStageList(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const handleViewAll = () => {
    setIsOpen(false)
    setShowStageList(false)
    onViewAll()
  }

  const handleAssessment = () => {
    setIsOpen(false)
    setShowStageList(false)
    onAssessment()
  }

  const handleStageSelect = (stage) => {
    setIsOpen(false)
    setShowStageList(false)
    onSelectStage(stage)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <motion.div
          className="hamburger-icon"
          animate={isOpen ? 'open' : 'closed'}
        >
          <motion.span
            className="hamburger-line"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 },
            }}
          />
          <motion.span
            className="hamburger-line"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
          />
          <motion.span
            className="hamburger-line"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 },
            }}
          />
        </motion.div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsOpen(false)
              setShowStageList(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="menu-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="menu-header">
              <span className="menu-title">
                {lang === 'ko' ? '메뉴' : 'Menu'}
              </span>
            </div>

            <div className="menu-items">
              {/* View All 9 Stages */}
              <button
                className="menu-item"
                onClick={handleViewAll}
              >
                <span className="menu-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </span>
                <span className="menu-item-text">
                  {lang === 'ko' ? '전체 9단계 조망' : 'View All 9 Stages'}
                </span>
                <span className="menu-item-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </button>

              {/* Stage Detail Submenu */}
              <button
                className={`menu-item ${showStageList ? 'active' : ''}`}
                onClick={() => setShowStageList(!showStageList)}
              >
                <span className="menu-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </span>
                <span className="menu-item-text">
                  {lang === 'ko' ? '각 단계 해설' : 'Stage Details'}
                </span>
                <motion.span
                  className="menu-item-arrow"
                  animate={{ rotate: showStageList ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.span>
              </button>

              {/* Stage Submenu List */}
              <AnimatePresence>
                {showStageList && (
                  <motion.div
                    className="menu-submenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {stages.map((stage) => (
                      <button
                        key={stage.id}
                        className={`menu-submenu-item phase-${stage.phase}`}
                        onClick={() => handleStageSelect(stage)}
                      >
                        <span className="submenu-roman">{stage.roman}</span>
                        <span className="submenu-name">
                          {lang === 'ko' ? stage.nameKo : stage.nameEn}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Conflict Assessment */}
              <button
                className="menu-item"
                onClick={handleAssessment}
              >
                <span className="menu-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </span>
                <span className="menu-item-text">
                  {lang === 'ko' ? '내 갈등단계 체크' : 'Check My Stage'}
                </span>
                <span className="menu-item-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Menu Footer */}
            <div className="menu-footer">
              <span className="menu-footer-text">
                Glasl Conflict Model
              </span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
