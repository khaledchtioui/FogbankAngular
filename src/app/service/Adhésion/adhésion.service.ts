import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Club } from '../../models/club';
import { Adhésion } from 'src/app/models/adhésion';
import { EmailserviceService } from '../emailservice/emailservice.service';
import { AuthServiceService } from '../user/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdhésionService {
  private baseUrl = 'http://localhost:8087/api/v1/admin/retrieveAllAdhésion';
  private addUrl  = 'http://localhost:8087/api/v1/admin/addAdhésion'; 
  private getUrl  = 'http://localhost:8087/api/v1/admin/adhesions/user'; 
  private upUrl  = 'http://localhost:8087/api/v1/admin/updateAdhesion';


  constructor(private http: HttpClient,private emailService: EmailserviceService,private authService : AuthServiceService) { }

  retrieveAllAdhésion(): Observable<Adhésion[]> {
    return this.http.get<Adhésion[]>(this.baseUrl);
  }

  addAdhésion(adhésion: Adhésion): Observable<Adhésion> {
    return this.http.post<Adhésion>(`${this.addUrl}`, adhésion);
}

  retrieveUserAdhesions(userId: number): Observable<Adhésion[]> {
  return this.http.get<Adhésion[]>(`${this.getUrl}/${userId}`);
  }
  
  updateAdhésion(adhesion: Adhésion): Observable<Adhésion> {
    const url = `${this.upUrl}`;
    return this.http.put<Adhésion>(url, adhesion).pipe(
      tap((updatedAdhesion: Adhésion) => {
        console.log('Adhesion updated successfully:', updatedAdhesion);
        const currentUser = this.authService.getCurrentUser();

        // Prepare email parameters
        const emailParams = {
          //from_name: 'omar',
          to_name: `Omar Benamara`,
          from_name: `${currentUser.firstname} ${currentUser.lastname}`,
          from_email: currentUser.email,
          to_email: currentUser.email,
          message: `We would like to inform you that your membership application is ${updatedAdhesion.status}.`,
          clubname: `${updatedAdhesion.club?.nom}`
        };

        // Send email using EmailserviceService
        this.emailService.sendEmail(emailParams)
          .then((response) => {
            console.log('Email sent successfully:', response);
          })
          .catch((error) => {
            console.error('Error sending email:', error);
          });
      }),
      catchError((error) => {
        console.error('Error updating adhesion:', error);
        throw error; // Rethrow the error to the caller
      })
    );
  }


}
