// const { getDirectoryItems, checkFolder } = require("../plugins/webdav.js");
import { random, remove } from "lodash";

export const state = () => ({
  base: [],
  all: [],
  activePath: null,
  folders: [],
  imageStyle: null
});

export const mutations = {
  setBaseMedia(state, item) {
    state.base = item;
  },
  removeFromBase(state, item) {
    console.log("the item to remove", item);
    const newBase = state.base.filter(f => f.uploadCareId != item.uploadCareId);

    state.base = newBase;
  },
  setMediaList(state, val) {
    state.all = val;
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

    // Get a random media item from the total list of media
    const randomNumber = random(0, state.base.length - 1);

    console.log("base length", state.base.length - 1);
    console.log({ randomNumber });
    const randomItem = state.base[random(0, state.base.length - 1)];

    console.log("randomitem", randomItem);
    // Get all the items with the same folder path
    const items = state.base.filter(i => i.folder === randomItem.folder);
    console.log("filter based on folder:", items);

    // Get random items, as much as the template says we should get
    const newMedia = [];
    for (let i = 0; i < total; i++) {
      // get a random image of this list
      const itemId = random(0, items.length - 1);
      const file = items[itemId];
      // Add file to the media to be used
      console.log("adding to list:", file);
      newMedia.push(file);
      // Remove it from the long list
      commit("removeFromBase", file);

      // If this is the last run, return
      if (i == total - 1) {
        console.log("Done with getting media, returning");
        commit("session/setStatus", 0, { root: true });
      }
    }

    commit("setMediaList", newMedia);
  }
};
