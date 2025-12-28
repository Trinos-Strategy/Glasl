// ═══════════════════════════════════════════════════════════════════════════
// GLASL CONFLICT STAGES - Personalized Advice Database
// ═══════════════════════════════════════════════════════════════════════════

export const stageAdvice = {
  1: {
    characteristics: {
      ko: [
        '대화에서 긴장감과 경계심 증가',
        '입장이 점점 고착화되기 시작',
        '상대방 말을 경청하는 시간 감소',
        '의견 차이가 표면화되지만 아직 관계는 유지'
      ],
      en: [
        'Increased tension and guardedness in conversations',
        'Positions beginning to solidify',
        'Less time spent listening to the other party',
        'Differences emerge but relationship still maintained'
      ]
    },
    warnings: {
      ko: [
        '의견 차이를 개인적 공격으로 해석하기 시작',
        '과거 갈등 사례를 자주 언급',
        '유머나 가벼운 대화가 사라짐',
        '상대방의 의도를 부정적으로 추측'
      ],
      en: [
        'Starting to interpret disagreements as personal attacks',
        'Frequently referencing past conflicts',
        'Humor and light conversation disappearing',
        'Assuming negative intentions'
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
      ko: '자체 해결 가능',
      en: 'Self-resolution possible'
    }
  },

  2: {
    characteristics: {
      ko: [
        '분극화된 논쟁이 반복됨',
        '흑백논리와 이분법적 사고',
        '감정적 거리감 증가',
        '상대방을 설득하려는 강한 욕구'
      ],
      en: [
        'Polarized debates recurring',
        'Black-and-white, binary thinking',
        'Increasing emotional distance',
        'Strong desire to convince the other party'
      ]
    },
    warnings: {
      ko: [
        '상대방 말을 끊고 반박 준비',
        '"항상", "절대" 같은 극단적 표현 사용',
        '상대방 입장을 왜곡하여 이해',
        '자신의 주장에 대한 과신'
      ],
      en: [
        'Interrupting and preparing rebuttals',
        'Using extreme words like "always" and "never"',
        'Distorting the other party\'s position',
        'Overconfidence in own arguments'
      ]
    },
    doNow: {
      ko: [
        '중립적인 제3자의 의견 구하기',
        '토론 규칙 설정하기 (발언 시간 등)',
        '쉬는 시간 갖고 냉정해지기',
        '사실과 의견을 구분하기'
      ],
      en: [
        'Seek a neutral third party\'s opinion',
        'Set debate rules (speaking time, etc.)',
        'Take breaks to cool down',
        'Distinguish facts from opinions'
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
      ko: '비공식 제3자 도움 권장',
      en: 'Informal third-party help recommended'
    }
  },

  3: {
    characteristics: {
      ko: [
        '말보다 행동으로 압박',
        '대화가 점점 줄어듦',
        '기정사실화 전술 사용',
        '공감 능력 상실 시작'
      ],
      en: [
        'Pressure through actions rather than words',
        'Communication decreasing',
        'Using fait accompli tactics',
        'Beginning to lose empathy'
      ]
    },
    warnings: {
      ko: [
        '일방적인 결정과 통보',
        '상대방을 배제한 행동',
        '비언어적 압박 (무시, 냉대)',
        '정보 공유 중단'
      ],
      en: [
        'Unilateral decisions and notifications',
        'Actions that exclude the other party',
        'Non-verbal pressure (ignoring, cold treatment)',
        'Stopping information sharing'
      ]
    },
    doNow: {
      ko: [
        '공식적인 대화 채널 확립하기',
        '행동의 결과를 냉정히 분석하기',
        '전문 조정인 개입 고려하기',
        '서면으로 합의 사항 기록하기'
      ],
      en: [
        'Establish formal communication channels',
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
      ko: '훈련된 조정인 필요',
      en: 'Trained mediator needed'
    }
  },

  4: {
    characteristics: {
      ko: [
        '동맹과 연합 형성',
        '편 갈라치기 시작',
        '승패 구도로 전환',
        '집단 간 갈등으로 확대'
      ],
      en: [
        'Alliance and coalition formation',
        'Taking sides begins',
        'Shift to win-lose dynamic',
        'Expansion to inter-group conflict'
      ]
    },
    warnings: {
      ko: [
        '지지자 모집 활동',
        '상대방에 대한 부정적 캠페인',
        '조직 내 파벌 형성',
        '"우리 vs 그들" 프레임'
      ],
      en: [
        'Recruiting supporters',
        'Negative campaigns against the other party',
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
      ko: '전문 조정인 필요',
      en: 'Professional mediator needed'
    }
  },

  5: {
    characteristics: {
      ko: [
        '개인적 공격과 모욕',
        '신뢰의 완전한 상실',
        '상대방의 도덕성 의심',
        '공개적 망신주기'
      ],
      en: [
        'Personal attacks and insults',
        'Complete loss of trust',
        'Questioning the other party\'s morality',
        'Public humiliation attempts'
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
      ko: '전문 조정 필수',
      en: 'Professional mediation essential'
    }
  },

  6: {
    characteristics: {
      ko: [
        '명시적 위협과 협박',
        '최후통첩 발행',
        '제재와 처벌 언급',
        '통제권 확보 시도'
      ],
      en: [
        'Explicit threats and intimidation',
        'Issuing ultimatums',
        'Mentioning sanctions and punishments',
        'Attempting to gain control'
      ]
    },
    warnings: {
      ko: [
        '구체적 제재 내용 언급',
        '기한 설정과 압박',
        '협박 수위 상승',
        '합리적 대화 거부'
      ],
      en: [
        'Mentioning specific sanctions',
        'Setting deadlines and pressure',
        'Escalating threat levels',
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
      ko: '긴급 전문 개입 필수',
      en: 'Urgent professional intervention essential'
    }
  },

  7: {
    characteristics: {
      ko: [
        '제한적 파괴 행동 시작',
        '상대방 피해가 목표',
        '자기 손해 감수',
        '위협의 실행'
      ],
      en: [
        'Limited destructive actions begin',
        'Harming the other party becomes the goal',
        'Accepting self-damage',
        'Executing threats'
      ]
    },
    warnings: {
      ko: [
        '재산이나 자원 손상',
        '업무 방해 행위',
        '물리적/심리적 공격',
        '보복 행동의 실행'
      ],
      en: [
        'Damage to property or resources',
        'Work obstruction',
        'Physical/psychological attacks',
        'Execution of retaliatory actions'
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
      ko: '공식적 개입 필요',
      en: 'Formal intervention needed'
    }
  },

  8: {
    characteristics: {
      ko: [
        '상대 조직/시스템 파괴 추구',
        '핵심 기반 공격',
        '통제력 무력화',
        '전면적 공격'
      ],
      en: [
        'Seeking to destroy opponent\'s organization/system',
        'Attacking core foundations',
        'Neutralizing control',
        'Full-scale attacks'
      ]
    },
    warnings: {
      ko: [
        '조직 전체에 대한 공격',
        '생존 기반 위협',
        '극단적 수단 동원',
        '제3자 피해 확산'
      ],
      en: [
        'Attacks on the entire organization',
        'Threats to survival foundation',
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
      ko: '강력한 외부 개입',
      en: 'Strong external intervention'
    }
  },

  9: {
    characteristics: {
      ko: [
        '상호 파멸 추구',
        '자기 파괴도 감수',
        '모든 것 희생 각오',
        '돌이킬 수 없는 상태'
      ],
      en: [
        'Seeking mutual destruction',
        'Accepting self-destruction',
        'Willing to sacrifice everything',
        'Point of no return'
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
      ko: '긴급 강제 개입',
      en: 'Emergency forced intervention'
    }
  }
};

export default stageAdvice;
