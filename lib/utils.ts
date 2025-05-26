import axios from "axios";

export const API_URL = "https://api.zetsu.xyz";
const API_KEY = "d71f75727bd6bd4e321ae31b565604ad"; // free lng to kaya kung gusto mo mag request sa API
// gumawa ka nalang ng sarili mong API key kupal haha charot

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const deku = {
  get: async (url: string) =>
    await axiosInstance.get(url + `&apikey=${API_KEY}`),
  fbCover: async (url: string) =>
    await axiosInstance.get(url + `&apikey=${API_KEY}`, {
      responseType: "blob",
    }),
};
