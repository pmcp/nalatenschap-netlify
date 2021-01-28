export const state = () => ({
  firstRun: false,
  maxQuestions: 6,
  items: [],
  user: {
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
    }
  ]
});

export const mutations = {
  toggleFirstRun(state) {
    state.firstRun = !state.firstRun;
  },
  setStatus(state, value) {
    console.log("gonna set status");
    state.activeStatus = value;
    // console.log(
    //   `Status: ${state.activeStatus}: ${state.status[state.activeStatus].text}`
    // );
  },
  saveItemToSession(state, item) {
    state.items.push(item);
  },
  setFirstName(state, event) {
    state.user.first = event.target.value;
  },
  setLastName(state, event) {
    state.user.last = event.target.value;
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
      dispatch("sendSession");
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
      commit("toggleFirstRun");
    } else {
      // If this is not the first session, we have a question to save
      console.log(
        `the question to save: ${rootGetters["questions/activeQuestionText"]}`
      );
      console.log(`the item to save:`, { item });
      commit("saveItemToSession", {
        answer: item.filename,
        question: rootGetters["questions/activeQuestionText"]
      });
    }

    // Get a template
    dispatch("templates/setTemplate", null, { root: true });

    // Based on the template, get media
    dispatch("media/getMedia", null, { root: true });

    // If this is not the first session, get a question
    console.log("session getting question almost", state.firstRun);
    if (!state.firstRun) {
      console.log("session getting question");
      // More first run stuff goes here
      commit("questions/getQuestion", null, { root: true });
    }
  },

  //
  async sendSession({ state, commit }) {
    console.log("GONNA SEND SESSION");
    commit("setStatus", 2);
    // const res = await this.$axios.get("/.netlify/functions/sendSession", {
    //   params: {
    //     session: JSON.stringify(state.items),
    //     user: JSON.stringify(state.user),
    //     finishedAt: date.now()
    //   }
    // });

    return;
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
  }
};
