import { Module } from "vuex";
import { RootState } from "./index";
import { Axios } from "@/service/axios.service";
import { DetailModule, Art, Artist, Museum, Genre } from "./Detail.interface";

const module: Module<DetailModule, RootState> = {
  namespaced: true,
  state: {
    artList: null,
    art: null,
    artist: null,
    museum: null,
    genre: null,
    scrollEnd: false
  },
  getters: {},
  mutations: {
    SET_ART_LIST(state, artList: Art[]) {
      if (state.artList === null) {
        state.artList = artList;
      } else if (artList.length && !state.scrollEnd) {
        state.artList = state.artList?.concat(artList);
      } else if (!artList.length) {
        state.scrollEnd = true;
      }
      console.log(artList.length);
    },

    SET_ART_LIST_ZERO(state) {
      state.artList = null;
    },

    SET_ART(state, art: Art) {
      state.art = art;
    },

    SET_ARTIST(state, artist: Artist) {
      state.artist = artist;
    },

    SET_MUSEUM(state, museum: Museum) {
      state.museum = museum;
    },

    SET_GENRE(state, genre: Genre) {
      state.genre = genre;
    }
  },
  actions: {
    FETCH_ARTIST_ART_LIST(
      { commit },
      { artist, start }: { artist: string; start: number }
    ) {
      Axios.instance
        .get("/api/public/art/artist", { params: { artist, start } })
        .then(({ data }) => commit("SET_ART_LIST", data.data))
        .catch(err => console.error(err));
    },

    FETCH_MUSEUM_ART_LIST(
      { commit },
      { museum, start }: { museum: string; start: number }
    ) {
      Axios.instance
        .get("/api/public/art/museum", { params: { museum, start } })
        .then(({ data }) => commit("SET_ART_LIST", data.data))
        .catch(err => console.error(err));
    },

    FETCH_GENRE_ART_LIST(
      { commit },
      { genre, start }: { genre: string; start: number }
    ) {
      Axios.instance
        .get("/api/public/art/genre", { params: { genre, start } })
        .then(({ data }) => commit("SET_ART_LIST", data.data))
        .catch(err => console.error(err));
    },

    FETCH_ART({ commit }, artNo: number) {
      Axios.instance
        .get("/api/public/art/detail", { params: artNo })
        .then(({ data }) => commit("SET_ART", data.data))
        .catch(err => console.error(err));
    }
  }
};

export default module;
