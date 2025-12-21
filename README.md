# 글라슬 갈등 격화 9단계 시각화
## Glasl's Conflict Escalation Model — Interactive Visualization

![Preview](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Motion](https://img.shields.io/badge/Motion-11.15-ff69b4)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)

프리드리히 글라슬(Friedrich Glasl)의 갈등 격화 9단계 모델을 럭셔리 인터랙티브 웹으로 구현한 프로젝트입니다.

## ✨ 주요 기능

- 🌐 **한국어/영어 전환** — 실시간 언어 변경
- 📱 **반응형 디자인** — 모바일, 태블릿, 데스크탑 지원
- 🎬 **시네마틱 애니메이션** — Motion 기반 부드러운 전환
- 🎨 **럭셔리 UI** — Hermès, Apple 수준의 디자인 품질
- ♿ **접근성** — 키보드 내비게이션, 모션 감소 지원

## 🚀 빠른 시작

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📦 배포

### GitHub Pages 자동 배포

1. GitHub에서 새 레포지토리 생성 (예: `glasl-escalation`)

2. `vite.config.js`에서 `base`를 레포지토리 이름으로 변경:
   ```js
   base: '/glasl-escalation/',  // 본인의 레포 이름
   ```

3. 코드 푸시:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/glasl-escalation.git
   git push -u origin main
   ```

4. GitHub 레포지토리 → Settings → Pages:
   - Source: **GitHub Actions** 선택

5. 자동 배포 완료! 
   - URL: `https://YOUR_USERNAME.github.io/glasl-escalation/`

## 🛠 기술 스택

| 카테고리 | 기술 |
|---------|------|
| 프레임워크 | React 18 + Vite |
| 애니메이션 | Motion (Framer Motion) |
| 스타일 | Tailwind CSS |
| 폰트 | Pretendard Variable |
| 배포 | GitHub Pages |

## 📁 프로젝트 구조

```
glasl-project/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # 메인 컴포넌트
│   ├── main.jsx         # 엔트리 포인트
│   └── index.css        # 글로벌 스타일
├── .github/
│   └── workflows/
│       └── deploy.yml   # 자동 배포 설정
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 📖 이론 출처

Friedrich Glasl, *Konfliktmanagement: Ein Handbuch für Führungskräfte, Beraterinnen und Berater*, 1980.

## 📄 라이센스

MIT License

---

Made with ❤️ for better conflict understanding
