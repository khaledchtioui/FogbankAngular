import {User} from "./User";
import {LikePublication} from "./LikePublication";
import {ReponseSurUnePublication} from "./ReponseSurUnePublication";

export class PublicationInitiale{
  idPublication!:number;
  description!:string;
  datePublication!:Date;
  likePublicationList!:LikePublication[];
  reponsePublicationList!:ReponseSurUnePublication[];
  user!:User;
  titre!:string;
}
