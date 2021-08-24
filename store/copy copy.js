import axios from "axios";
import { random, findIndex } from "lodash";

export const state = () => ({
  lang: 0,
  baseCopy: [
    "Nog even dit...",
    "De Nalatenschap van ",
    "De Nalatenschap biedt ruimte voor ontdekking, in de vorm van een gesprek. De machine zal u zes vragen stellen. Antwoorden kan u door te klikken op afbeeldingen of tekstfragmenten. Wees niet ongerust als wat er gebeurt op het scherm er vreemd uitziet, of anders dan je verwacht. Dat maakt deel uit van het avontuur. Rustig blijven is de boodschap. Aan het eind kan u uw keuze uit de Nalatenschap vastleggen. Veel plezier met de tocht, en tot straks.",
    "Rustig blijven is de boodschap. Veel plezier met de tocht!",
    "Voornaam",
    "Achternaam",
    "Laat ons beginnen",
    "Welkom",
    "Dank je om dat met ons te delen.",
    "We vinden het fijn om er voor je te kunnen zijn. Wij willen ook iets delen met jou. Hieronder vind je de zes elementen uit de Nalatenschap van Kasper Demeulemeester die jouw betekenis dragen. Door op de knop hier onder te drukken, kan je een oplage van 5 fysieke exemplaren van jouw keuze aanvragen bij de Nalatenschap.",
    "Om u het resultaat te bezorgen hebben we uw gegevens nodig. Uw gegevens worden enkel gebruikt voor het versturen van het eindresultaat, noch zullen ze bewaard worden.",
    "Telefoonnummer",
    "Of",
    "Email",
    "Verstuur mijn selectie",
    "Contact voor alle vragen"
  ],
  copy: null,
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
    state.lang = index;
  },
  setTranslation(state, translations) {
    state.copy = translations;
  }
};

export const actions = {
  async getAllTranslationsCopy({ state, commit }) {
    const res = await axios.get("/.netlify/functions/translate", {
      params: {
        languages: JSON.stringify(state.languages),
        text: JSON.stringify(state.baseCopy)
      }
    });
    // console.log(res.data);
    commit("setTranslation", res.data);
  },
  async getAllTranslationsQuestions({ state, rootState, commit }) {
    // Loop through all questions and make an object: use reduce
    const questions = rootState.questions.list.reduce((acc, item) => {
      acc = [...acc, item.text[0]];
      return acc;
    }, []);

    // Remove first language NL, because we are not working with a baseList for Questions
    let languages = [...state.languages];
    languages.shift();

    const res = await axios.get("/.netlify/functions/translate", {
      params: {
        languages: JSON.stringify(languages),
        text: JSON.stringify(questions)
      }
    });
    console.log(res.data);
    for (let i = 0; i < res.data.length; i++) {
      commit("questions/setTranslation", res.data[i], { root: true });
    }
  }
};

export const getters = {
  translatedCopy: state => {
    if (state.copy) return state.copy[state.lang];
    return state.baseCopy;
  }
};
