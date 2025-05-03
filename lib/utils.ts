import axios from "axios";

const API_URL = "https://api.zetsu.xyz";
const API_KEY = "b0e07f52a4b8e90d06abffa49e1efa19"; // free lng to kaya kung gusto mo mag request sa API
// gumawa ka nalang ng sarili mong API key kupal haha charot

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const deku = async (url: string, method?: string | undefined | null) => {
  switch (method?.toUpperCase()) {
    case "POST":
      break;

    default:
      return await axiosInstance.get(url + `&apikey=${API_KEY}`);
  }
};
