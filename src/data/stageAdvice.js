// ═══════════════════════════════════════════════════════════════════════════
// GLASL CONFLICT STAGES - Personalized Advice Database
// ═══════════════════════════════════════════════════════════════════════════

export const stageAdvice = {
  1: {
    characteristics: {
      ko: [
        '이해관계가 고정된 입장으로 경직됨',
        '자기 관점만 정당하다고 인식',
        '해석이 사실을 대체하며 독자적 생명을 얻음',
        '입장·관계의 경직화, 대화 빈도·질 저하'
      ],
      en: [
        'Interests harden into fixed positions',
        'Only own perspective seen as valid',
        'Interpretations replace facts and take on a life of their own',
        'Positions and relationships rigidify, dialogue quality declines'
      ]
    },
    warnings: {
      ko: [
        '상호 이해·공감 감소',
        '초기 교착 조짐 발생',
        '의견 차이를 개인적 공격으로 해석하기 시작',
        '협력이 아직 경쟁보다 우세하나 긴장 증가'
      ],
      en: [
        'Reduced mutual understanding and empathy',
        'Early signs of deadlock emerging',
        'Starting to interpret disagreements as personal attacks',
        'Cooperation still dominates but tension rising'
      ]
    },
    doNow: {
      ko: [
        '솔직한 1:1 대화 요청하기',
        '감정보다 사실에 집중하기',
        '상대방 입장 먼저 경청하기',
        '공통 목표와 관심사 찾기'
      ],
      en: [
        'Request an honest one-on-one conversation',
        'Focus on facts rather than emotions',
        'Listen to the other party\'s perspective first',
        'Find common goals and interests'
      ]
    },
    avoid: {
      ko: [
        '제3자에게 불평하기',
        '이메일이나 메시지로만 소통하기',
        '문제를 회피하거나 미루기',
        '상대방 뒤에서 험담하기'
      ],
      en: [
        'Complaining to third parties',
        'Communicating only via email or messages',
        'Avoiding or postponing the issue',
        'Talking negatively behind their back'
      ]
    },
    intervention: {
      ko: '자체 해결 가능하나, 조정·코칭 등 조기 개입이 효과적',
      en: 'Self-resolution possible, but early mediation/coaching is effective'
    },
    interventionFocus: {
      ko: '확대 방지·잠재력 활용',
      en: 'Prevent escalation, leverage potential'
    }
  },

  2: {
    characteristics: {
      ko: [
        '대화 대신 전술적 행동·심리적 조작',
        '언어적 공격과 정면 대립',
        '입장·집단의 양극화',
        '갈등이 점차 개인화되고 상호 짜증·분노 증가'
      ],
      en: [
        'Tactical behavior and psychological manipulation replace dialogue',
        'Verbal attacks and confrontation',
        'Polarization of positions and groups',
        'Conflict becomes personal with mutual irritation increasing'
      ]
    },
    warnings: {
      ko: [
        '이성적 논증에서 감정·권력 이슈로 이동',
        '제3자·관중 앞에서 평판·점수 경쟁',
        '협력 중심에서 경쟁 중심 관계로 전환',
        '"항상", "절대" 같은 극단적 표현 사용'
      ],
      en: [
        'Shift from rational argument to emotional/power issues',
        'Competition for reputation before third parties',
        'Shifting from cooperation-centered to competition-centered relationship',
        'Using extreme words like "always" and "never"'
      ]
    },
    doNow: {
      ko: [
        '중립적인 제3자의 의견 구하기',
        '토론 규칙 설정하기 (발언 시간 등)',
        '쉬는 시간 갖고 냉정해지기',
        '감정과 이슈를 분리하기'
      ],
      en: [
        'Seek a neutral third party\'s opinion',
        'Set debate rules (speaking time, etc.)',
        'Take breaks to cool down',
        'Separate emotions from issues'
      ]
    },
    avoid: {
      ko: [
        '목소리를 높이거나 감정적으로 대응',
        '상대방 말을 중간에 끊기',
        '과거 실수를 들먹이기',
        '제3자 앞에서 논쟁하기'
      ],
      en: [
        'Raising voice or responding emotionally',
        'Interrupting the other party',
        'Bringing up past mistakes',
        'Arguing in front of others'
      ]
    },
    intervention: {
      ko: '자체 해결 가능하나, 조정·코칭 등 조기 개입이 효과적',
      en: 'Self-resolution possible, but early mediation/coaching is effective'
    },
    interventionFocus: {
      ko: '논쟁에서 대화로 전환',
      en: 'Shift from debate to dialogue'
    }
  },

  3: {
    characteristics: {
      ko: [
        '사전 협의 없는 일방적 조치',
        '대화 중단, 기정사실화 전략',
        '구조적 오해·곡해 증폭',
        '부정적 악순환, 격화의 가속'
      ],
      en: [
        'Unilateral actions without prior consultation',
        'Dialogue stops, fait accompli strategy',
        'Structural misunderstandings amplified',
        'Negative spiral, acceleration of escalation'
      ]
    },
    warnings: {
      ko: [
        '공감·상호 고려의 급격한 감소',
        '해결을 공동 책임으로 보지 않음',
        '경쟁이 협력보다 우세한 관계로 고착',
        '정보 공유 중단'
      ],
      en: [
        'Sharp decline in empathy and mutual consideration',
        'Resolution not seen as shared responsibility',
        'Competition dominates over cooperation',
        'Information sharing stops'
      ]
    },
    doNow: {
      ko: [
        '대화 채널 재구축하기',
        '행동의 결과를 냉정히 분석하기',
        '전문 조정인 개입 고려하기',
        '서면으로 합의 사항 기록하기'
      ],
      en: [
        'Rebuild dialogue channels',
        'Analyze consequences of actions objectively',
        'Consider professional mediator involvement',
        'Document agreements in writing'
      ]
    },
    avoid: {
      ko: [
        '맞대응 행동하기',
        '상대방 완전히 무시하기',
        '중요 결정 혼자 내리기',
        '감정적 보복'
      ],
      en: [
        'Retaliating with counter-actions',
        'Completely ignoring the other party',
        'Making important decisions alone',
        'Emotional retaliation'
      ]
    },
    intervention: {
      ko: '동료·상급자·내부 HR/법무 또는 외부 조정인에 의한 비공식 개입 권장',
      en: 'Informal intervention by colleagues, supervisors, internal HR/legal, or external mediator recommended'
    },
    interventionFocus: {
      ko: '통제 회복·대화 재구축',
      en: 'Regain control, rebuild dialogue'
    }
  },

  4: {
    characteristics: {
      ko: [
        '능력·전문성·인격을 겨냥한 인신공격',
        '흑백 논리: 자기 집단은 선, 상대는 전적으로 부정적',
        '연합·파워 블록 형성',
        '체면 손상 회피·방어'
      ],
      en: [
        'Personal attacks targeting competence, expertise, character',
        'Black-white logic: own group is good, opponent entirely negative',
        'Coalition and power bloc formation',
        'Avoiding and defending against loss of face'
      ]
    },
    warnings: {
      ko: [
        '지지자 모집 활동',
        '상대방에 대한 비난 캠페인',
        '조직 내 파벌 형성',
        '"우리 vs 그들" 프레임'
      ],
      en: [
        'Recruiting supporters',
        'Blame campaigns against the other party',
        'Faction formation within organization',
        '"Us vs. Them" framing'
      ]
    },
    doNow: {
      ko: [
        '전문 조정인 즉시 투입',
        '이해관계자 전체 분석하기',
        '동맹 해체 시도하기',
        '개인 간 비공개 만남 주선'
      ],
      en: [
        'Deploy professional mediator immediately',
        'Analyze all stakeholders',
        'Attempt to dissolve alliances',
        'Arrange private individual meetings'
      ]
    },
    avoid: {
      ko: [
        '더 큰 연합 구축하기',
        '공개적으로 상대편 비난',
        '중립자를 한쪽으로 끌어들이기',
        '집단 회의에서 갈등 다루기'
      ],
      en: [
        'Building larger coalitions',
        'Publicly criticizing the other side',
        'Pulling neutral parties to one side',
        'Addressing conflict in group meetings'
      ]
    },
    intervention: {
      ko: '훈련된 제3자의 도움 필수(조정, 프로세스 지원 등)',
      en: 'Trained third-party help essential (mediation, process support, etc.)'
    },
    interventionFocus: {
      ko: '갈등 완화·관점 명료화·신뢰 재구축',
      en: 'De-escalate conflict, clarify perspectives, rebuild trust'
    }
  },

  5: {
    characteristics: {
      ko: [
        '도덕적 진실성·인격에 대한 공격',
        '전면적 불신, 상대를 전적으로 부정적으로 인식',
        '조직·관계에 대한 조작·사보타주',
        '비열한 수단·규범 위반 행위'
      ],
      en: [
        'Attacks on moral integrity and character',
        'Complete distrust, opponent seen as entirely negative',
        'Manipulation and sabotage of organization/relationships',
        'Foul play and norm violations'
      ]
    },
    warnings: {
      ko: [
        '인격 공격성 발언',
        '상대방 실수 공개하기',
        '평판 훼손 시도',
        '상대방을 악마화'
      ],
      en: [
        'Character assassination remarks',
        'Publicizing the other party\'s mistakes',
        'Reputation damage attempts',
        'Demonizing the other party'
      ]
    },
    doNow: {
      ko: [
        '즉각적인 전문가 개입 요청',
        '체면 회복 기회 제공하기',
        '비공개 협상 시도',
        '감정 치유 시간 확보'
      ],
      en: [
        'Request immediate expert intervention',
        'Provide face-saving opportunities',
        'Attempt private negotiations',
        'Allow time for emotional healing'
      ]
    },
    avoid: {
      ko: [
        '공개적으로 맞대응',
        '더 강한 모욕으로 보복',
        '소셜미디어 공방',
        '과거 행적 폭로'
      ],
      en: [
        'Responding publicly',
        'Retaliating with stronger insults',
        'Social media warfare',
        'Exposing past behavior'
      ]
    },
    intervention: {
      ko: '고난도 전문 개입(심리·조직·법적 프로세스 연계 필요)',
      en: 'High-level expert intervention (psychological, organizational, legal process linkage needed)'
    },
    interventionFocus: {
      ko: '추가 피해 방지·구조적 개입',
      en: 'Prevent further damage, structural intervention'
    }
  },

  6: {
    characteristics: {
      ko: [
        '명시적 요구와 제재 선언',
        '통제력 상실, 상호 위협의 악순환에 갇힘',
        '위협의 3단계: 요구 제시 → 제재 예고 → 제재 능력 과시',
        '갈등·심리 역학이 고도로 복잡해짐'
      ],
      en: [
        'Explicit demands and sanction declarations',
        'Loss of control, trapped in threat spiral',
        'Three stages: demand → sanction warning → demonstrate capability',
        'Conflict and psychological dynamics become highly complex'
      ]
    },
    warnings: {
      ko: [
        '당사자·내부 리더십 차원에서 통제 곤란',
        '구체적 제재 내용 언급',
        '기한 설정과 압박',
        '합리적 대화 거부'
      ],
      en: [
        'Control difficult at party/leadership level',
        'Mentioning specific sanctions',
        'Setting deadlines and pressure',
        'Refusing rational dialogue'
      ]
    },
    doNow: {
      ko: [
        '위협 중단 즉시 요청',
        '안전 보장 확보하기',
        '법적 조언 구하기',
        '모든 위협 기록하기'
      ],
      en: [
        'Immediately request threat cessation',
        'Secure safety guarantees',
        'Seek legal advice',
        'Document all threats'
      ]
    },
    avoid: {
      ko: [
        '맞위협으로 대응',
        '위협을 무시하기',
        '혼자 해결하려 하기',
        '상대방과 단독 대면'
      ],
      en: [
        'Counter-threatening',
        'Ignoring the threats',
        'Trying to resolve alone',
        'Meeting the other party alone'
      ]
    },
    intervention: {
      ko: '전문 조정·중재·법적 절차 등 다층적 외부 개입 필요',
      en: 'Multi-layered external intervention needed (mediation, arbitration, legal procedures)'
    },
    interventionFocus: {
      ko: '역학 차단·외부 권위 도입',
      en: 'Break dynamics, introduce external authority'
    }
  },

  7: {
    characteristics: {
      ko: [
        '위협의 실제 실행',
        '상대의 건설적 반응은 더 이상 기대하지 않음',
        '실질적 소통 부재',
        '피해 유발 자체가 주요 목표'
      ],
      en: [
        'Actual execution of threats',
        'No longer expecting constructive response from opponent',
        'Absence of meaningful communication',
        'Causing damage becomes primary goal'
      ]
    },
    warnings: {
      ko: [
        '상대의 손실을 자신의 승리로 간주',
        '재산이나 자원 손상',
        '업무 방해 행위',
        '물리적/경제적/심리적 피해 발생'
      ],
      en: [
        'Opponent\'s loss seen as own victory',
        'Damage to property or resources',
        'Work obstruction',
        'Physical, economic, psychological damage occurring'
      ]
    },
    doNow: {
      ko: [
        '피해 최소화 조치 즉시 취하기',
        '공식 중재 기관 투입',
        '법적 보호 검토',
        '안전한 환경 확보'
      ],
      en: [
        'Take immediate damage control measures',
        'Deploy official arbitration',
        'Review legal protection',
        'Secure a safe environment'
      ]
    },
    avoid: {
      ko: [
        '보복 행동하기',
        '상황 악화시키기',
        '증거 없이 대응',
        '비공식 해결 시도'
      ],
      en: [
        'Retaliating',
        'Escalating the situation',
        'Responding without evidence',
        'Attempting informal resolution'
      ]
    },
    intervention: {
      ko: '강력한 외부 개입(조정+법적·조직적 개입 결합) 필수',
      en: 'Strong external intervention essential (mediation + legal/organizational intervention combined)'
    },
    interventionFocus: {
      ko: '피해 최소화·법적 보호',
      en: 'Minimize damage, legal protection'
    }
  },

  8: {
    characteristics: {
      ko: [
        '물리적·경제적·심리적 파괴 추구',
        '직접적·전면적 공격',
        '자기 보존은 있으나 상대 파괴를 위해 후퇴',
        '상대 조직/시스템 전체 파괴 시도'
      ],
      en: [
        'Seeking physical, economic, psychological destruction',
        'Direct and total attacks',
        'Self-preservation exists but retreats for opponent destruction',
        'Attempting to destroy entire opponent organization/system'
      ]
    },
    warnings: {
      ko: [
        '핵심 기반 파괴',
        '시스템 전체에 대한 공격',
        '극단적 수단 동원',
        '제3자 피해 확산'
      ],
      en: [
        'Destroying core foundations',
        'Attacks on entire system',
        'Mobilizing extreme measures',
        'Collateral damage spreading'
      ]
    },
    doNow: {
      ko: [
        '즉각적 분리 조치',
        '안전 확보 최우선',
        '법적 개입 요청',
        '장기 회복 계획 수립'
      ],
      en: [
        'Immediate separation measures',
        'Safety as top priority',
        'Request legal intervention',
        'Develop long-term recovery plan'
      ]
    },
    avoid: {
      ko: [
        '대화 시도하기',
        '타협안 제시하기',
        '혼자 대응하기',
        '상황 축소하기'
      ],
      en: [
        'Attempting dialogue',
        'Offering compromises',
        'Responding alone',
        'Downplaying the situation'
      ]
    },
    intervention: {
      ko: '고강도 공식 개입(중재·법원·강제력 행사 등) 필요',
      en: 'High-intensity formal intervention needed (arbitration, courts, enforcement, etc.)'
    },
    interventionFocus: {
      ko: '강제적 분리·피해 방지',
      en: 'Forced separation, prevent damage'
    }
  },

  9: {
    characteristics: {
      ko: [
        '자기 파멸을 감수하면서 상대 파괴 추구',
        '사실상 되돌릴 수 없는 지점',
        '모든 것 희생 각오',
        '상호 파멸 각오'
      ],
      en: [
        'Seeking opponent destruction while accepting self-destruction',
        'Point of no return',
        'Willing to sacrifice everything',
        'Mutual destruction accepted'
      ]
    },
    warnings: {
      ko: [
        '극단적 사고와 행동',
        '생존 본능 상실',
        '제3자 대규모 피해',
        '회복 불가능한 손상'
      ],
      en: [
        'Extreme thinking and behavior',
        'Loss of survival instinct',
        'Massive third-party damage',
        'Irreparable damage'
      ]
    },
    doNow: {
      ko: [
        '긴급 위기 개입팀 투입',
        '전문 심리 지원 요청',
        '완전한 격리 및 보호',
        '법적 강제 조치 검토'
      ],
      en: [
        'Deploy emergency crisis intervention team',
        'Request professional psychological support',
        'Complete isolation and protection',
        'Consider legal enforcement measures'
      ]
    },
    avoid: {
      ko: [
        '어떤 형태의 직접 접촉',
        '상황 협상 시도',
        '혼자 개입하기',
        '시간 지체하기'
      ],
      en: [
        'Any form of direct contact',
        'Attempting to negotiate the situation',
        'Intervening alone',
        'Delaying action'
      ]
    },
    intervention: {
      ko: '실질적 강제력에 의한 개입만 가능(공권력 등)',
      en: 'Only intervention through actual enforcement possible (public authority, etc.)'
    },
    interventionFocus: {
      ko: '강제적 분리·피해 방지',
      en: 'Forced separation, prevent damage'
    }
  }
};

export default stageAdvice;
