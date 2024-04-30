import {User} from "./User";
import {LikePublication} from "./LikePublication";
import {PublicationInitiale} from "./PublicationInitiale";

export class ReponseSurUnePublication{
  idPublication!:number;
  description!:string;
  datePublication!:Date;
  likePublicationList!:LikePublication[];
  user!:User;
  publicationInitiale!:PublicationInitiale;
}
