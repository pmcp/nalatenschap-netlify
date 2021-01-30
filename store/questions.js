import { random } from "lodash";

export const state = () => ({
  activeQuestion: 0,
  list: [
    {
      id: 0,
      text: "Hoe voel je je vandaag?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 1,
      text: "Wat gaat er op dit moment in je om ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: true,
      excludeFromNext: [],
      canBeLast: false
    },
    {
      id: 2,
      text: "Kun je me meer vertellen over wat je daarover voelt ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 3,
      text: "Verontschuldigingen zijn niet nodig.",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 4,
      text: "Ik luister.",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 5,
      text: "Dat is interessant. Ga door.",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 6,
      text: "Wat betekent dat voor je ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 7,
      text: "Ga door.",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 8,
      text: "Is dat echt altijd zo ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 9,
      text: "Wat ervaar je op dit moment ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: true,
      excludeFromNext: [],
      canBeLast: false
    },
    {
      id: 10,
      text:
        "Moeten we oppassen voor die glijbaan van emoties? Of net niet oppassen?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [5],
      canBeLast: true
    },
    {
      id: 11,
      text: "Als in..?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 12,
      text: "Ja. Ik weet het. Hoe kan je daar anders tegenaan kijken?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 13,
      text: "Hoe gaat het daar nu met je?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: true,
      excludeFromNext: [],
      canBeLast: false
    },
    {
      id: 14,
      text: "Hoe is dat voor je ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 15,
      text: "Vertel me daar meer over.",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 16,
      text: "Wat voor gevoelens heb je hierover ?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    },
    {
      id: 17,
      text: "Je lijkt er niet helemaal zeker van.",
      used: false,
      repeatSelection: true,
      canBeFirst: false,
      excludeFromNext: [11],
      canBeLast: true
    },
    {
      id: 18,
      text: "Wanneer ben jij jarig?",
      next: null,
      used: false,
      repeatSelection: false,
      canBeFirst: false,
      excludeFromNext: [],
      canBeLast: true
    }
  ]
});

export const mutations = {
  setUsed(state, key) {
    state.list[key].used = true;
  },
  // subtractrepeatSelection(state, questionId) {
  //   state.list[questionId].repeatSelection--;
  // },
  setActiveQuestion(state, id) {
    state.activeQuestion = id;
  }
};

export const actions = {
  getQuestion({ state, rootState, commit }) {
    // Get all unused questions
    const unusedQuestions = state.list.filter(q => !q.used);
    let randomQuestionId;
    // If first question, get one that "can be first"
    if (rootState.session.firstRun) {
      // TODO: first question can't be repeated in this flow, change?
      const firstQuestions = unusedQuestions.filter(q => q.canBeFirst);
      randomQuestionId =
        firstQuestions[random(0, firstQuestions.length - 1)].id;
    } else if (rootState.session.items == rootState.session.maxQuestions - 1) {
      // If this is the last question, only use the question that can be last
      const onlyLastQuestions = unusedQuestions.filter(q => q.canBeLast);
      randomQuestionId =
        onlyLastQuestions[random(0, onlyLastQuestions.length - 1)].id;
    } else {
      // If the activeQuestion has questions they don't want after this one (excludeFromNext), filter these out
      const excludeFromNext = state.list[state.activeQuestion].excludeFromNext;
      if (excludeFromNext.length > 0) {
        const withoutTheExcludedQuestions = unusedQuestions.filter(
          q => !excludeFromNext.includes(q.id)
        );
        // Get a random question out of this list
        randomQuestionId =
          withoutTheExcludedQuestions[
            random(0, withoutTheExcludedQuestions.length - 1)
          ].id;
      } else {
        // If none of the rules apply, just get one of the unused list
        randomQuestionId =
          unusedQuestions[random(0, unusedQuestions.length - 1)].id;
      }
    }

    commit("setActiveQuestion", randomQuestionId);
    commit("setUsed", randomQuestionId);
  }
};

export const getters = {
  activeQuestionText: state => {
    return state.list[state.activeQuestion].text;
  }
};
