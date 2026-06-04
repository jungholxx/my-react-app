import axiosInstance from "./axiosInstance";

export function getBoardList() {
  return axiosInstance.get("/api/board/list");
}