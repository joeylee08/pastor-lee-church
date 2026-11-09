import { Message } from "./Message";

export type MessageForm = Pick<
  Message,
  "title" | "date" | "message"
>;