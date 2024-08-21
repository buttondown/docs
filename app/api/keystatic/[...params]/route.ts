import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { localBaseURL } from "../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({
  config,
  localBaseDirectory: localBaseURL,
});
