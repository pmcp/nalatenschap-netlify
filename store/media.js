const { getDirectoryItems, checkFolder } = require("../plugins/webdav.js");
import { random } from "lodash";

export const state = () => ({
  base: [],
  all: [],
  activePath: null,
  folders: [],
  activeStatus: 0,
  status: [
    {
      id: 0,
      text: "All good"
    },
    {
      id: 1,
      text: "Loading media"
    }
  ]
});

export const mutations = {
  setBaseMedia(state, item) {
    state.base = item;
  },
  add(state, item) {
    state.all.push(item);
  },
  setActivePath(state, item) {
    state.activePath = item;
  },
  setFolders(state, item) {
    state.folders = item;
  },
  setFolderAsUsed(state, id) {
    state.folders[id].used = true;
  },
  resetMedia(state, id) {
    state.all = [];
  },
  setStatus(state, id) {
    state.activeStatus = id;
  }
};

export const actions = {
  async getMedia({ state, commit }, { total: total }) {
    commit("setStatus", 1);
    commit("resetMedia");

    console.log(`All  media file is ${state.base.length}`);
    // Get a random one
    const randomMediaItem = state.base[random(0, state.base.length - 1)];
    console.log(`Got a random Item`, randomMediaItem);

    // filter the media based on the folder of the random item
    const items = state.base.filter(i => i.folder === randomMediaItem.folder);
    console.log("got filtered items", items);

    console.log("Starting to get media");
    console.log("getting media with a total of", total);
    // Empty media first

    console.log("total of images we need to get", total);

    for (let i = 0; i < total; i++) {
      // get a random image
      const itemId = random(0, items.length - 1);
      // console.log(itemId, items, items.length)
      const file = items[itemId];
      // remove image from list

      console.log("the file", file);
      if (file == undefined) return null;

      commit("setActivePath", file.path);
      commit("add", file);
      console.log("going through media", i, total - 1);
      if (i == total - 1) {
        console.log("finishing up");
      }
    }
    commit("setActivePath", null);
    commit("setStatus", 0);

    return;
    // return
  }
};
