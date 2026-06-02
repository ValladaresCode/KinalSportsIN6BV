import { axiosAuth } from "./api";

export const getFields = async () => {
  const { data } = await axiosAuth.get("/fields");
  return data;
};

export const getReservations = async () => {
  const { data } = await axiosAuth.get("/reservations");
  return data;
};
