import { ClubSpace } from "./ClubSpace";

export interface ClubEvent {
  id: number;
  title: string;
  description: string;
  date: string; // Assuming date is represented as a string
  mc: string;
  img: string;
  comments: Comment[];
  clubSpace?: ClubSpace;
  }