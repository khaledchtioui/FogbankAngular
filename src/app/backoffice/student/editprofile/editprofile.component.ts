import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../../service/user/auth-service.service";
import {User} from "../../../models/User";
import {Profile} from "../../../models/Profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  constructor(    private fb: FormBuilder,private authService: AuthServiceService) { }

  currentUser:any;
  userForm!: FormGroup;

  public user: User={
    id: this.authService.getCurrentUser().id ,
    email: "",
    firstname: "",
    lastname: "",
    role: "USER",
    bio: "",
    mobilePhone: "",
    address: "",
    username: ""
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.authService.getUser(this.currentUser.id).subscribe(user => {
      this.user = user;
      this.userForm.patchValue(user)

      console.log("user: " + this.user)
    })


    this.userForm = this.fb.group({
      id: [this.user.id],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      bio: [''],
      mobilePhone: ['']
    });




  }






  updateUser(): void {
    if (this.userForm.valid) {
      this.authService.updateUser(this.userForm.value).subscribe(
        (updatedUser) => {

        },
        (error) => {
          console.error('Error updating User:', error);

        }
      );
    } else {

    }
  }






}
