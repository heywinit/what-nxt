import e from "express";
import Constants from "./constants";
import dotenv from "dotenv";

export function validateEnv() {
  dotenv.config();
  const constants = Constants;
  let valid = true;
  for (const key in constants) {
    if (!process.env[key]) {
      console.error(`Environment variable ${key} is missing`);
      valid = false;
    }
  }

  return valid;
}

export function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePassword(email: string) {
  const passwordRegex = new RegExp("^.{8,}$");
  return passwordRegex.test(email);
}

export function validatePhone(phone: string) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

export function validateUrl(url: string) {
  const re = /^(http|https):\/\/[^ "]+$/;
  return re.test(url);
}

export function validateUsername(username: string) {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
}
