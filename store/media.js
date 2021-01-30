// const { getDirectoryItems, checkFolder } = require("../plugins/webdav.js");
import { random, remove } from "lodash";

export const state = () => ({
  base: [],
  all: [],
  activePath: null,
  folders: [],
  imageStyle: null,
  excludes: []
});

export const mutations = {
  addToExcludes(state, item) {
    state.excludes.push(item);
  },
  setBaseMedia(state, item) {
    state.base = item;
  },
  removeFromBase(state, item) {
    console.log("the item to remove", item);
    const newBase = state.base.filter(f => f.uploadCareId != item.uploadCareId);

    state.base = newBase;
  },
  setMediaList(state, val) {
    state.all = [...val];
  },
  setImageStyle(state) {
    const randomColorA = Math.floor(Math.random() * 16777215).toString(16);
    const randomColorB = Math.floor(Math.random() * 16777215).toString(16);
    const randomRotation = random(0, 360);
    state.imageStyle = `linear-gradient(${randomRotation}deg, #${randomColorA} 0%, #${randomColorB} 100%)`;
  }
};

export const actions = {
  async getMedia({ state, rootState, commit }) {
    // empty the media list first
    commit("setMediaList", []);

    // Set imageStyle
    commit("setImageStyle");

    // Get the total files we need, based on the template
    const total = rootState.templates.all[rootState.templates.active].items;

    // TODO: add folders to exclude

    // New flow
    const res = await this.$axios.get("/.netlify/functions/getItems", {
      params: {
        total: total,
        excludes: state.excludes
      }
    });

    console.log("got res", res);
    const returnedItems = res.data.items;
    // Loop through the items and put the uploadCareId in exclude
    for (let i = 0; i < returnedItems.length; i++) {
      commit("addToExcludes", returnedItems[i].uploadCareId);
    }

    commit("setMediaList", returnedItems);
  }
};
