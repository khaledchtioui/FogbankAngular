import {User} from "./User";

export interface Article {
    id?: string;
    auteur: string;
    titre: string;
    contenu: string;
    user: number | undefined;
    photo?: Uint8Array ;
    date: Date
  }

