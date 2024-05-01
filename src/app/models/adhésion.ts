import { Club } from "./club";

export interface Adhésion {
    IDAdhesion: number;
    dateAdhesion: Date;
    status: string;
    questionOne: string;
    questionTwo: string;
    questionThree: string;
    questionFour: string;
    questionFive: string;
    questionSix: string;
    questionSeven: string;
    questionEight: string;
    questionNine: string;
    club?: Club;
}