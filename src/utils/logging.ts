import Constants from "./constants";

declare global {
  interface Console {
    fatal(...args: any[]): void;
  }
}

export function bindLogger() {
  //attach a new method to the console object.
  //on console.info and error, we will log the timestamp and send it to a webhook as well
  const originalInfo = console.info;
  const originalError = console.error;

  console.fatal = function (...args: any[]) {
    const timestamp = new Date().toISOString();
    console.log(timestamp, `[FATAL]`, ...args);
  };

  console.info = function (...args: any[]) {
    const timestamp = new Date().toISOString();
    const msg = `\`${timestamp}\` ${args.join(" ")}`;
    originalInfo.call(console, msg);
  };

  console.error = function (...args: any[]) {
    const timestamp = new Date().toISOString();
    const msg = `\`${timestamp}\` ${args.join(" ")}`;
    originalError.call(console, msg);
  };
}
