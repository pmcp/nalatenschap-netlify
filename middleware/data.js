import files from "~/assets/files.json";

export default function({ params, store }) {
  // console.log("here", files);
  return store.commit("media/setBaseMedia", files);
  // axios.get("files.json").then(res => {
  //   console.log("HERE", res);
  //   return store.commit("media/setBaseMedia", files);
  // });
}
