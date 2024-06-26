import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { BaseFrontComponent } from './base-front/base-front.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error500Component } from './errors/error500/error500.component';
import { ArticlefrontComponent } from './article/articlefront/articlefront.component';
import { ArticlelistComponent } from './article/articlelist/articlelist.component';
import { ArticlegridComponent } from './article/articlegrid/articlegrid.component';
import { ArticledetailsComponent } from './article/articledetails/articledetails.component';
import { LoginComponent } from './user/login/login.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { SettingeditprofileComponent } from './user/settingeditprofile/settingeditprofile.component';
import { TermsconditionsComponent } from './user/termsconditions/termsconditions.component';
import { PrivacyPolicyComponent } from './user/privacy-policy/privacy-policy.component';
import { SigninComponent } from './user/signin/signin.component';
import { DashboardComponent } from './backoffice/student/dashboard/dashboard.component';
import { EditprofileComponent } from './backoffice/student/editprofile/editprofile.component';
import { DeleteprofileComponent } from './backoffice/student/deleteprofile/deleteprofile.component';
import { MyarticleComponent } from './backoffice/student/myarticle/myarticle.component';
import { DashboardAdminComponent } from './backoffice/admin/dashboard-admin/dashboard-admin.component';
import { UserlistComponent } from './backoffice/admin/userlist/userlist.component';
import { UsergridComponent } from './backoffice/admin/usergrid/usergrid.component';
import { AllarticleComponent } from './backoffice/admin/allarticle/allarticle.component';
import { SignupComponent } from './user/signup/signup.component';
import { ComingsoonComponent } from './errors/comingsoon/comingsoon.component';
import { AdmineditprofileComponent } from './backoffice/admin/admineditprofile/admineditprofile.component';
import { TokenStorageService } from './service/user/token-storage.service';
import { ClubbackComponent } from './backoffice/admin/clubback/clubback.component';
import { ClubbackaddComponent } from './backoffice/admin/clubbackadd/clubbackadd.component';
import { ClubbackeditComponent } from './backoffice/admin/clubbackedit/clubbackedit.component';
import { ClubbackdeleteComponent } from './backoffice/admin/clubbackdelete/clubbackdelete.component';
import { VerifyotpComponent } from './user/verifyotp/verifyotp.component';
import { GetEventsComponent } from './event/get-events/get-events.component';
import { AddEventsComponent } from './event/add-events/add-events.component';
import { DeleteEventsComponent } from './event/delete-events/delete-events.component';
import { UpdateEventsComponent } from './event/update-events/update-events.component';
import { UserEventComponent } from './user-event/user-event.component';
import { AjouterProductComponent } from './LostAndFoundTemplate/AjouterProduct/AjouterProduct.component';
import { ProductlistComponent } from './LostAndFoundTemplate/AfficherProduct/Productlist.Component';
import { UserproductComponent } from './LostAndFoundTemplate/userproduct/userproduct.component';
import { MapComponent } from './LostAndFoundTemplate/map/map.component';
import { UpdateproductComponent } from './LostAndFoundTemplate/updateproduct/updateproduct.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UpdatearticleComponent } from './backoffice/admin/updatearticle/updatearticle.component';
import { UserArticlesListComponent } from './article/user-articles-list/user-articles-list.component';
import { AddArticleComponent } from './backoffice/admin/add-article/add-article.component';
import { UserAddArticleComponent } from './article/user-add-article/user-add-article.component';
import { UserallarticlesComponent } from './article/userallarticles/userallarticles.component';
import { UserUpdateArticleComponent } from './article/user-update-article/user-update-article.component';

@Injectable() // Ajoutez ce décorateur
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(): boolean {
    if (this.tokenStorageService.getAccessToken()) {
      return true; // L'utilisateur est authentifié
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

const appRoutes: Routes = [
  { path: 'front', component: BaseFrontComponent },
  { path: 'home', component: BaseFrontComponent },

  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'editprofile', component: SettingeditprofileComponent },
  { path: 'register', component: SignupComponent },
  { path: 'termsconditions', component: TermsconditionsComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'student/dahboard', component: DashboardComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'admin/dahboard', component: DashboardAdminComponent },
  {
    path: 'admin/users',
    component: UserlistComponent,
    canActivate: [AuthGuard],
  },
  { path: 'student/edit', component: EditprofileComponent },
  { path: 'admin/edit', component: EditprofileComponent },
  { path: 'student/delete', component: DeleteprofileComponent },
  { path: 'admin/usersgrid', component: UsergridComponent },
  { path: 'admin/edit', component: EditprofileComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'changepassword', component: ChangepasswordComponent },

  { path: 'AjouterProducts', component: AjouterProductComponent },
  { path: 'Product', component: ProductlistComponent },
  { path: 'userproduct', component: UserproductComponent },
  { path: 'updateproducts/:id', component: UpdateproductComponent },
  { path: 'map/:productId', component: MapComponent },
  { path: 'map/:longitude/:latitude', component: MapComponent },

  { path: 'article', component: ArticlefrontComponent },
  { path: 'article/list', component: ArticlelistComponent },
  { path: 'article/grid', component: ArticlegridComponent },
  { path: 'article/details', component: ArticledetailsComponent },
  { path: 'student/myarticle', component: MyarticleComponent },
  { path: 'admin/allarticle', component: AllarticleComponent },
  { path: 'articledetails/:id', component: ArticledetailsComponent },
  { path: 'admin/addArticle', component: AddArticleComponent },
  { path: 'admin/updateArticle/:id', component: UpdatearticleComponent },
  { path: 'user/allarticle', component: UserArticlesListComponent },
  { path: 'user/addArticle', component: UserAddArticleComponent },
  { path: 'user/handlearticle', component: UserallarticlesComponent },
  { path: 'user/updatearticle/:id', component: UserUpdateArticleComponent },

  { path: 'otp', component: VerifyotpComponent }, // Assuming 'OtpComponent' is the component for the OTP page

  {
    path: 'admin/club',
    component: ClubbackComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin/club/add', component: ClubbackaddComponent },
  { path: 'admin/club/edit/:id', component: ClubbackeditComponent },
  { path: 'admin/club/delete/:id', component: ClubbackdeleteComponent },

  { path: 'admin/events', component: GetEventsComponent },
  { path: 'admin/events/createEvents', component: AddEventsComponent },
  { path: 'admin/events/delete/:id', component: DeleteEventsComponent },
  { path: 'admin/events/edit/:id', component: UpdateEventsComponent },
  { path: 'user/events', component: UserEventComponent },
  { path: 'user/events/participate/:id', component: UserEventComponent },

  { path: 'error404', component: Error404Component },
  { path: 'error500', component: Error500Component },
  { path: 'comesoon', component: ComingsoonComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/comesoon', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
