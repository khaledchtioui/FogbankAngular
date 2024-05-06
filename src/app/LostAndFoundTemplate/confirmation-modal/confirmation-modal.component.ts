import {Component, Input, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() productId:  number = 0;

  constructor(private modalService: NgbModal) { }

  open(content: TemplateRef<any>, productId: number) {
    // Ouvrir la modal de confirmation avec le contenu et l'ID du produit
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    // Vous pouvez utiliser productId ici pour effectuer des opérations avec l'ID du produit
  }
  deleteProduct() {
    // Supprimer le produit avec this.productId
    console.log('Suppression du produit avec l\'ID :', this.productId);
    // Vous pouvez appeler ici votre service de suppression de produit
  }
}
