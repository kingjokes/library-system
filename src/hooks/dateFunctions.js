import { differenceInDays, format, formatDistanceToNow } from "date-fns";

export const dateFormatter = (time) => {
  return !!time ? format(new Date(time), "PPpp") : "";
};

export const dateYearFormatter = (time) => {
  return !!time ? format(new Date(time), "P") : "";
};

export const dateFormatFromNow = (time) => {
  return !!time
    ? formatDistanceToNow(new Date(time), { includeSeconds: true })
    : "";
};

export const overdueChecker = (time) => {
  return time ? differenceInDays(new Date(), new Date(time)) : "";
};
