import { parseAsInteger, parseAsString } from "nuqs/server";

export const blogSearchParams = {
  tag: parseAsString.withDefault(""),
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};
