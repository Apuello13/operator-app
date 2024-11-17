import { ENV } from "../utils/env";
import axios from "axios";

export const service = {
  associateCourse: (email) =>
    axios.get(`${ENV.apiAmbly}/payu/register-course-user?email=${email}`),
  getIp: () => axios.get(ENV.apiIp),
  login: (body) => axios.post(`${ENV.apiAmbly}/operator/login`, body),
  logOut: (body) =>
    fetch(`${ENV.apiAmbly}/operator/log-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      keepalive: true,
    }),
};
