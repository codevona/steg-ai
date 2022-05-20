import _fetch, { RequestInfo, RequestInit } from "node-fetch";

export const fetch = (url: RequestInfo, params: RequestInit) =>
  _fetch(url, { ...params });

export default fetch;
