import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  listUsers!: User[];
  constructor(private _service:UserService) { }

  ngOnInit(): void {
    this._service.getUsersName().subscribe(users => {
      this.listUsers = users;
    });  }

  deleteUser(user: User) {
    this._service.deleteUser(user.id).subscribe(() => {
      console.log("Utilisateur supprimé :", user);
      // Actualisez la liste des utilisateurs après la suppression
      this.ngOnInit();
    });
  }


}
