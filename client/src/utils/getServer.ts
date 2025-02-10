import axios from "axios";

export const getServer = axios.create({
    baseURL:"https://nest-js-app-5gjg.onrender.com/api"
})