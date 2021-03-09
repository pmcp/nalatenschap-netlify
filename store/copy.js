import axios from "axios";
import { random, findIndex } from "lodash";

export const state = () => ({
  lang: 0,
  baseCopy: ["Nog even dit...", "De Nalatenschap van "],
  copy: null,
  active: 0,
  languages: [
    "nl",
    "en",
    "fr",
    "ar",
    "it",
    "el",
    "es",
    "zh-CN",
    "de",
    "pl",
    "ru",
    "ro",
    "sk",
    "sr",
    "da"
  ]
});

export const mutations = {
  setActive(state, lang) {
    const index = findIndex(state.languages, function(o) {
      return o == lang;
    });
    state.active = index;
  },
  setTranslation(state, translations) {
    state.copy = JSON.parse(JSON.stringify(translations));
  }
};

export const actions = {
  async getAllTranslations({ state, rootState, commit }) {
    console.log(JSON.stringify(state.languages));
    const res = await axios.get("/.netlify/functions/translate", {
      params: {
        languages: JSON.stringify(state.languages),
        text: JSON.stringify(state.baseCopy)
      }
    });
    console.log(res.data);
    commit("setTranslation", res.data);
  }
};

export const getters = {
  getCopy: state => id => {
    console.log(state.copy, state.lang, id);
    let copy;
    if (state.copy == null) {
      return state.baseCopy[id];
    } else {
      copy = state.copy[state.lang][id];
      console.log("here", copy);
      return copy;
    }
  }
};
