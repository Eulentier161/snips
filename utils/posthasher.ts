import { MD5 } from "crypto-js";

export default function getPostHash(
  title: string,
  content: string,
  theme: string,
  language: string
) {
  return MD5(title + content + theme + language).toString();
}
