import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseFrontComponent } from './base-front/base-front.component';
import {Error404Component} from "./errors/error404/error404.component";
import {Error500Component} from "./errors/error500/error500.component";
import {ArticlefrontComponent} from "./article/articlefront/articlefront.component";
import {ArticlelistComponent} from "./article/articlelist/articlelist.component";
import {ArticlegridComponent} from "./article/articlegrid/articlegrid.component";
import {ArticledetailsComponent} from "./article/articledetails/articledetails.component";
import {LoginComponent} from "./user/login/login.component";
import {ForgotpasswordComponent} from "./user/forgotpassword/forgotpassword.component";
import {SettingeditprofileComponent} from "./user/settingeditprofile/settingeditprofile.component";
import {TermsconditionsComponent} from "./user/termsconditions/termsconditions.component";
import {PrivacyPolicyComponent} from "./user/privacy-policy/privacy-policy.component";
import {SigninComponent} from "./user/signin/signin.component";
import {DashboardComponent} from "./backoffice/student/dashboard/dashboard.component";
import {EditprofileComponent} from "./backoffice/student/editprofile/editprofile.component";
import {DeleteprofileComponent} from "./backoffice/student/deleteprofile/deleteprofile.component";
import {MyarticleComponent} from "./backoffice/student/myarticle/myarticle.component";
import {DashboardAdminComponent} from "./backoffice/admin/dashboard-admin/dashboard-admin.component";
import {UserlistComponent} from "./backoffice/admin/userlist/userlist.component";
import {UsergridComponent} from "./backoffice/admin/usergrid/usergrid.component";
import {AllarticleComponent} from "./backoffice/admin/allarticle/allarticle.component";
import {SignupComponent} from "./user/signup/signup.component";
import {ComingsoonComponent} from "./errors/comingsoon/comingsoon.component";
import {AdmineditprofileComponent} from "./backoffice/admin/admineditprofile/admineditprofile.component";

const appRoutes: Routes = [

  {path:"front" ,component:BaseFrontComponent},
  {path:"home" ,component:BaseFrontComponent},

  {path:"login",component:LoginComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"editprofile",component:SettingeditprofileComponent},
  {path:"register",component:SignupComponent},
  {path:"termsconditions",component:TermsconditionsComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"student/dahboard",component:DashboardComponent},
  {path:"privacypolicy",component:PrivacyPolicyComponent},
  {path:"admin/dahboard",component:DashboardAdminComponent},
  {path:"admin/users",component:UserlistComponent},
  {path:"student/edit",component:EditprofileComponent},
  {path:"admin/edit",component:AdmineditprofileComponent},
  {path:"student/delete",component:DeleteprofileComponent},
  {path:"admin/usersgrid",component:UsergridComponent},

  {path:"article",component:ArticlefrontComponent},
  {path:"article/list",component:ArticlelistComponent},
  {path:"article/grid",component:ArticlegridComponent},
  {path:"article/details",component:ArticledetailsComponent},
  {path:"student/myarticle",component:MyarticleComponent},
  {path:"admin/allarticle",component:AllarticleComponent},

  {path:"error404",component:Error404Component},
  {path:"error500",component:Error500Component},
  {path:"comesoon",component:ComingsoonComponent},

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/comesoon", pathMatch:"full"}





];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }


