import { ClubSpace } from "./ClubSpace";

export interface Club {
    idclub?: number;
    description: string;
    email: string;
    nom: string;
    rs: string;
    cat: string;
    image?: string;
    Adhésions: Adhésion[]; // Assuming Adhésion is another entity/interface
    users: User[]; // Assuming User is another entity/interface
    clubSpace?: ClubSpace;
  }
  
  interface Adhésion {
    // Define Adhésion properties if necessary
  }
  
  interface User {
    // Define User properties if necessary
  }
  