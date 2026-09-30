import { Fragment } from "react";
import { EasyWord } from "./EasyWord";

const EASY_TOKEN = /(easy[A-Za-z]*®?)/;

export function EasyText({ text }: { text: string }) {
  return text.split(EASY_TOKEN).map((part, index) =>
    part.startsWith("easy") ? (
      <EasyWord key={index} registered={part.endsWith("®")}>
        {part.replace("®", "")}
      </EasyWord>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
