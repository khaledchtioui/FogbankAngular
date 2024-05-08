import { Component, OnInit } from '@angular/core';
import { EventService } from "../service/event/event.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit {

  events: any[] = [];
  phoneNumber: string = '';
  phoneForm!: FormGroup;
  showPhoneNumberForm: boolean = false; 

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();

    this.phoneForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: any) => {
        this.events = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des événements : ', error);
      }
    );
  }

  participateEvent(eventId: number) {
    console.log('Participer à l\'événement avec l\'ID : ', eventId);
    alert('Vous avez participé à l\'événement avec succès !');
  }

  
  showFormAlert() {
    const phoneNumber = prompt("Veuillez saisir votre numéro de téléphone :");
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
      this.sendSms();
    }
  }


  sendSms() {
    const eventId = 1; 

    this.eventService.sendSms(eventId,this.phoneNumber)
    .subscribe(
        (response: any) => { 
          if (response) {
            console.log('SMS envoyé avec succès !', response);
            alert('Votre participation a été enregistrée avec succès !');
            this.phoneNumber = '';
          } else {
            console.log('Échec de l\'envoi du SMS.');
            alert('Votre participation a été enregistrée avec succès !');
          }
        },
        (error: any) => { 
          console.error('Erreur lors de l\'envoi du SMS:', error);
          alert('Une erreur s\'est produite lors de l\'envoi du SMS.');
        }
      );
  }

  }



