import { EventStatus, NetworkName } from "./types";

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const isProduction = () =>
  process.env.NODE_ENV === `production`

export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
export const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
export const decomposeSeconds = rawSeconds => {
  const days = Math.floor(rawSeconds / SECONDS_IN_DAY);

  const hours = Math.floor((rawSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR);

  const minutes = Math.floor(
    (rawSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  );

  const seconds = rawSeconds % SECONDS_IN_MINUTE;

  return { days, hours, minutes, seconds };
};

export const formatTimeDifference = (seconds: number) => {
  const t = decomposeSeconds(seconds);
  let timeString = ``;
  if (t.days > 0) timeString += `${t.days}D `;
  if (t.hours > 0) timeString += `${t.hours}H `;
  if (t.minutes > 0) timeString += `${t.hours}M `;
  timeString += `${t.seconds}S`;

  return timeString
};

export const formatStatus = (status:EventStatus) => {
  return EventStatus[status]
}

export const formatBloksTransaction = (network: NetworkName, txId:string) => {
  const bloksNetworkName = (network === `mainnet`) ? `` : network
  const prefix = bloksNetworkName ? `${bloksNetworkName}.` : ``
  return `https://${prefix}bloks.io/transaction/${txId}`
}