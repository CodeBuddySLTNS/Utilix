import axios from "axios";

export const API_URL = "https://api.zetsu.xyz";
const API_KEY = "b0e07f52a4b8e90d06abffa49e1efa19"; // free lng to kaya kung gusto mo mag request sa API
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
