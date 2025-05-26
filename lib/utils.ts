import axios from "axios";
import { useMainStore } from "./store";

export const MRHAIRY_API = "https://mrhairy-api.onrender.com";
export const DEKU_API = "https://api.zetsu.xyz";
const API_KEY = "d71f75727bd6bd4e321ae31b565604ad"; // free lng to kaya kung gusto mo mag request sa API
// gumawa ka nalang ng sarili mong API key kupal haha charot

const axiosMrHairy = axios.create({
  baseURL: MRHAIRY_API,
});

const axiosDeku = axios.create({
  baseURL: DEKU_API,
});

export const mrhairy = {
  getToken: async () => {
    return (await axiosMrHairy.get(MRHAIRY_API + "/deku/freetoken")).data;
  },
};

export const deku = {
  get: async (url: string) =>
    await axiosDeku.get(
      url + `&apikey=${useMainStore.getState().apikey || API_KEY}`
    ),
  fbCover: async (url: string) =>
    await axiosDeku.get(url + `&apikey=${API_KEY}`, {
      responseType: "blob",
    }),
};
