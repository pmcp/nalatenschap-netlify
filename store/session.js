var VueScrollTo = require("vue-scrollto");

export const state = () => ({
  firstRun: false,
  maxQuestions: 6,
  items: [],
  user: {
    email: "",
    phone: "",
    first: "",
    last: ""
  },
  activeStatus: 0,
  status: [
    {
      id: 0,
      text: "All good"
    },
    {
      id: 1,
      text: "Alles ophalen"
    },
    {
      id: 2,
      text: "Selectie versturen"
    },
    {
      id: 3,
      text: "Alle vragen beantwoord"
    }
  ]
});

export const mutations = {
  setFirstRun(state, val) {
    state.firstRun = val;
  },
  setStatus(state, value) {
    console.log("gonna set status");
    state.activeStatus = value;
    console.log("state.activeStatus is now", state.activeStatus);

    // console.log(
    //   `Status: ${state.activeStatus}: ${state.status[state.activeStatus].text}`
    // );
  },
  saveItemToSession(state, item) {
    state.items.push(item);
  },
  setFirst(state, event) {
    state.user.first = event.target.value;
  },
  setLast(state, event) {
    state.user.last = event.target.value;
  },
  setPhone(state, event) {
    state.user.phone = event.target.value;
  },
  setEmail(state, event) {
    state.user.email = event.target.value;
  }
};

export const actions = {
  runFlow({ state, dispatch, commit, rootGetters }, item = null) {
    // First things first: set the status, so we can hide stuff if necessary
    commit("setStatus", 1);

    // If this is the last question, we need to stop and send the whole thing
    if (state.maxQuestions < state.items.length) {
      commit("setStatus", 3);
      VueScrollTo.scrollTo("#thanks");
      return;
    }

    // If this is the first time we are running, set firstRun to true. Not doing something yet with that first run, but who knows.
    if (item === null && !state.firstRun) {
      // More first run stuff goes here
      commit("setFirstRun", false);
    } else {
      // If this is not the first session, we have a question to save
      const question = rootGetters["questions/activeQuestionText"];
      commit("saveItemToSession", {
        answer: item.path,
        question: question,
        url: item.url,
        id: item.uploadCareId,
        filename: item.fileName
      });
    }

    // Get a template, not really doing much with this yet, except for max number of items
    dispatch("templates/setTemplate", null, { root: true });

    // Get a question
    dispatch("questions/getQuestion", null, { root: true });

    // Get media as last (cos we needed the number of items from template, and we needed to know if we need to repeat the selection based on the question
    dispatch("media/getMedia", null, { root: true });
  }
};

export const getters = {
  userFormFilledCorrect: state => {
    if (
      typeof state.user.first === "string" &&
      state.user.first.length > 0 &&
      typeof state.user.last === "string" &&
      state.user.last.length > 0
    )
      return true;
    return false;
  },
  sendFormFilledCorrect: state => {
    if (
      typeof state.user.email === "string" &&
      state.user.email.length > 0 &&
      typeof state.user.phone === "string" &&
      state.user.phone.length > 0
    )
      return true;
    return false;
  }
};
