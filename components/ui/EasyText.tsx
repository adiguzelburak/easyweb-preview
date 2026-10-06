import { Fragment } from "react";
import { EasyWord } from "./EasyWord";

const EASY_TOKEN = /(easy[A-Za-z]*(?:\.[a-z]+)?®?)/;

export function EasyText({ text }: { text: string }) {
  return text.split(EASY_TOKEN).map((part, index) => {
    const match = part.match(/^(easy[A-Za-z]*)(\.[a-z]+)?(®)?$/);
    if (!match) return <Fragment key={index}>{part}</Fragment>;
    const [, word, suffix, registered] = match;
    return (
      <EasyWord key={index} suffix={suffix} registered={Boolean(registered)}>
        {word}
      </EasyWord>
    );
  });
}
