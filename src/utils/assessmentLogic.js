// ═══════════════════════════════════════════════════════════════════════════
// GLASL CONFLICT ASSESSMENT - Question Bank & Scoring Algorithm
// ═══════════════════════════════════════════════════════════════════════════

export const questions = [
  {
    id: 'Q1',
    text: {
      ko: '상대방과의 대화에서 점점 더 경계하고 신중해지고 있다',
      en: 'I am becoming more guarded and cautious in conversations with the other party'
    },
    stage: 1,
    weight: 1.0
  },
  {
    id: 'Q2',
    text: {
      ko: '우리는 서로의 주장을 입증하려고 열띤 토론을 자주 한다',
      en: 'We frequently have heated debates trying to prove our respective points'
    },
    stage: 2,
    weight: 1.0
  },
  {
    id: 'Q3',
    text: {
      ko: '말로만 설득하기보다 행동으로 내 입장을 보여주려 한다',
      en: 'I try to demonstrate my position through actions rather than just persuasion'
    },
    stage: 3,
    weight: 1.0
  },
  {
    id: 'Q4',
    text: {
      ko: '나와 생각이 비슷한 사람들과 연대하여 상대방을 고립시키고 있다',
      en: 'I am forming alliances with like-minded people to isolate the other party'
    },
    stage: 4,
    weight: 0.7
  },
  {
    id: 'Q5',
    text: {
      ko: '상대방의 평판이나 이미지를 다른 사람들에게 부정적으로 전달한다',
      en: 'I communicate negative things about the other party\'s reputation to others'
    },
    stage: 4,
    weight: 0.3
  },
  {
    id: 'Q6',
    text: {
      ko: '상대방이 창피를 당하거나 실수할 때 속으로 만족감을 느낀다',
      en: 'I feel satisfaction when the other party is embarrassed or makes mistakes'
    },
    stage: 5,
    weight: 1.0
  },
  {
    id: 'Q7',
    text: {
      ko: '상대방에게 "이렇게 하지 않으면 심각한 결과가 있을 것"이라고 경고한다',
      en: 'I warn the other party that there will be serious consequences if they don\'t comply'
    },
    stage: 6,
    weight: 1.0
  },
  {
    id: 'Q8',
    text: {
      ko: '내가 손해를 보더라도 상대방에게 더 큰 타격을 주고 싶다',
      en: 'I want to hurt the other party more, even if it means hurting myself'
    },
    stage: 7,
    weight: 1.0
  },
  {
    id: 'Q9',
    text: {
      ko: '상대방의 존재 자체가 나의 안전과 정체성을 위협한다고 느낀다',
      en: 'I feel that the other party\'s very existence threatens my safety and identity'
    },
    stage: 8,
    weight: 1.0
  },
  {
    id: 'Q10',
    text: {
      ko: '나와 상대방 모두가 파괴되더라도 이 갈등을 끝내야 한다',
      en: 'This conflict must end even if it destroys both of us'
    },
    stage: 9,
    weight: 1.0
  },
  {
    id: 'Q11',
    text: {
      ko: '이 갈등이 시작된 지 얼마나 되었나요?',
      en: 'How long has this conflict been going on?'
    },
    type: 'duration',
    options: {
      ko: ['1주 이내', '1개월 이내', '3개월 이내', '6개월 이내', '1년 이상'],
      en: ['Less than 1 week', 'Less than 1 month', 'Less than 3 months', 'Less than 6 months', 'More than 1 year']
    },
    weight: 0.2
  },
  {
    id: 'Q12',
    text: {
      ko: '아직 대화를 통해 관계를 회복할 수 있다고 믿는다',
      en: 'I still believe we can restore the relationship through dialogue'
    },
    stage: 'reverse',
    weight: -0.3
  }
];

export const likertOptions = {
  ko: [
    '전혀 그렇지 않다',
    '그렇지 않다',
    '보통이다',
    '그렇다',
    '매우 그렇다'
  ],
  en: [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree'
  ]
};

/**
 * Calculate conflict stage based on user answers
 * @param {Object} answers - Object with question IDs as keys and answer values (1-5) as values
 * @returns {Object} - { stage: number, confidence: number, scores: number[], phase: number }
 */
export function calculateStage(answers) {
  const scores = Array(9).fill(0);

  Object.entries(answers).forEach(([qId, answer]) => {
    const question = questions.find(q => q.id === qId);
    if (!question) return;

    const normalized = (answer - 1) / 4; // 0 to 1

    if (question.stage === 'reverse') {
      // Reverse scoring - high agreement = lower stage tendency
      const reversed = 1 - normalized;
      scores.forEach((_, i) => {
        scores[i] += reversed * Math.abs(question.weight) / 9;
      });
    } else if (question.type === 'duration') {
      // Duration increases all stage scores progressively
      const durationFactor = answer / 4;
      scores.forEach((_, i) => {
        scores[i] += durationFactor * question.weight * (i + 1) / 9;
      });
    } else {
      // Standard scoring - add to specific stage
      scores[question.stage - 1] += normalized * question.weight;
    }
  });

  // Find the highest scoring stage
  const maxScore = Math.max(...scores);
  const predictedStage = scores.indexOf(maxScore) + 1;

  // Calculate confidence (0-100)
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? Math.round((maxScore / totalScore) * 100) : 0;

  // Determine phase
  let phase;
  if (predictedStage <= 3) phase = 1;
  else if (predictedStage <= 6) phase = 2;
  else phase = 3;

  return {
    stage: predictedStage,
    confidence,
    scores,
    phase
  };
}

/**
 * Get phase info based on phase number
 */
export function getPhaseInfo(phase, lang = 'ko') {
  const phases = {
    1: {
      name: { ko: '국면 I', en: 'Phase I' },
      subtitle: { ko: '상호 승리', en: 'Win-Win' },
      description: {
        ko: '아직 대화와 협력으로 해결 가능한 단계입니다',
        en: 'Resolution through dialogue and cooperation is still possible'
      },
      color: 'green'
    },
    2: {
      name: { ko: '국면 II', en: 'Phase II' },
      subtitle: { ko: '승패 구도', en: 'Win-Lose' },
      description: {
        ko: '한쪽이 이기고 한쪽이 지는 경쟁 구도로 전환되었습니다',
        en: 'The conflict has shifted to a competitive win-lose dynamic'
      },
      color: 'amber'
    },
    3: {
      name: { ko: '국면 III', en: 'Phase III' },
      subtitle: { ko: '상호 손실', en: 'Lose-Lose' },
      description: {
        ko: '양측 모두 피해를 입는 파괴적 단계입니다. 즉각적인 개입이 필요합니다',
        en: 'A destructive stage where both parties are harmed. Immediate intervention needed'
      },
      color: 'red'
    }
  };

  return phases[phase];
}
