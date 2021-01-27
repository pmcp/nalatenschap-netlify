import { random } from "lodash";

export const state = () => ({
  activeQuestion: 0,
  list: [
    {
      id: 0,
      text: "Hoe voel je je vandaag?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 1,
      text: "Wat gaat er op dit moment in je om ?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 2,
      text: "Kun je me meer vertellen over wat je daarover voelt ?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 3,
      text: "Verontschuldigingen zijn niet nodig.",
      next: null,
      used: false,
      repeat: 0
    },
    { id: 4, text: "ik luister.", next: null, used: false, repeat: 0 },
    {
      id: 5,
      text: "Dat is interessant. Ga door.",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 6,
      text: "Wat betekent dat voor je ?",
      next: null,
      used: false,
      repeat: 0
    },
    { id: 7, text: "Ga door.", next: null, used: false, repeat: 0 },
    {
      id: 8,
      text: "Is dat echt altijd zo ?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 9,
      text: "Wat ervaar je op dit moment ?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 10,
      text:
        "Moeten we oppassen voor de glijbaan van emoties? Of net niet oppassen?",
      next: null,
      used: false,
      repeat: 0
    },
    { id: 11, text: "Als in..?", next: null, used: false, repeat: 0 },
    {
      id: 12,
      text: "Ja. Ik weet het. Hoe kan je daar anders tegenaan kijken?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 13,
      text: "Hoe gaat het daar met je?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 14,
      text: "Hoe is dat voor je ?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 15,
      text: "Vertel me daar meer over.",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 16,
      text: "Wat voor gevoelens heb je hierover ?",
      next: null,
      used: false,
      repeat: 0
    },
    {
      id: 17,
      text: "Je lijkt er niet helemaal zeker van.",

      used: false,
      repeat: 1
    },
    {
      id: 18,
      text: "Wanneer ben jij jarig?",
      next: null,
      used: false,
      repeat: 0
    }
  ]
});

export const mutations = {
  setUsed(state, key) {
    let list = state.list;
    list[key].used = true;
    state.list = [...list];
    // console.log(state.list);
  },
  subtractRepeat(state, questionId) {
    state.list[questionId].repeat--;
  },
  setNextQuestion(state) {
    const max = state.list.filter(item => !item.used);
    // console.log("MAX", max);
    const activeQuestionId = random(0, max.length - 1);
    state.activeQuestion = activeQuestionId;
  }
};

export const actions = {
  nextQuestion({ state, commit }, val) {
    // console.log('getting next question', val);
    const activeQuestion = state.list[state.activeQuestion];
    if (activeQuestion.repeat > 0) {
      commit("subtractRepeat", state.activeQuestion);
    } else {
      1;
      commit("setUsed", state.activeQuestion);
      commit("setNextQuestion");
    }
  }
};
