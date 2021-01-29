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

    console.log("ITEM", item);
    // If this is the last question, we need to stop and send the whole thing
    console.log(`Question ${state.items.length} of ${state.maxQuestions}`);
    if (state.maxQuestions < state.items.length) {
      console.log(`This was the last question, finishing up`);
      commit("setStatus", 3);
      VueScrollTo.scrollTo("#thanks");

      return;
    }

    // If this is the first time we are running, set firstRun to true. Not doing something yet with that first run, but who knows.
    console.log(
      `First run: ${state.firstRun} the item that came with it:`,
      item,
      `Should i go into first run mode? ${item === null && !state.firstRun}`
    );

    if (item === null && !state.firstRun) {
      // More first run stuff goes here
      console.log(`going for first run`);
      commit("setFirstRun", false);
    } else {
      // If this is not the first session, we have a question to save
      console.log(
        `the question to save: ${rootGetters["questions/activeQuestionText"]}`
      );
      const question = rootGetters["questions/activeQuestionText"];
      console.log(`the question to save is ${question}`);
      console.log(`the item to save:`, { item });
      commit("saveItemToSession", {
        answer: item.path,
        question: question,
        url: item.url,
        id: item.uploadCareId,
        filename: item.fileName
      });
    }

    // Get a template
    dispatch("templates/setTemplate", null, { root: true });

    // Based on the template, get media
    dispatch("media/getMedia", null, { root: true });

    // If this is not the first session, get a question
    if (!state.firstRun) {
      console.log("session getting question");
      // More first run stuff goes here
      dispatch("questions/getQuestion", null, { root: true });
    }
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
