import React from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER - Luxury Minimal Design
// ═══════════════════════════════════════════════════════════════════════════

export default function Footer({ lang }) {
  return (
    <footer className="footer">
      <div className="footer-logo">Glasl</div>

      <p className="footer-source">
        {lang === 'ko'
          ? 'Friedrich Glasl의 갈등 격화 9단계 모델에 기반합니다'
          : "Based on Friedrich Glasl's 9-Stage Model of Conflict Escalation"}
      </p>

      <div className="footer-bottom">
        <span className="footer-copyright">© 2025 Trinos Research Lab</span>
        <span className="footer-divider">·</span>
        <a
          href="https://mediator.trinos.group/"
          className="footer-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </div>
    </footer>
  )
}
