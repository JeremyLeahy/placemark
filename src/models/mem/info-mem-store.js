import { v4 } from "uuid";

let details = [];

export const infoMemStore = {
  async getAllInfo() {
    return details;
  },

  async addInfo(coffeeShopId, info) {
    info._id = v4();
    info.coffeeShopid = coffeeShopId;
    details.push(info);
    return info;
  },

  async getInfoByCoffeeShopId(id) {
    return details.filter((info) => info.coffeeShopid === id);
  },

  async getTrackById(id) {
    return tracks.find((track) => track._id === id);
  },

  async getPlaylistTracks(playlistId) {
    return tracks.filter((track) => track.playlistid === playlistId);
  },

  async deleteTrack(id) {
    const index = tracks.findIndex((track) => track._id === id);
    tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    details = [];
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
  },
};
