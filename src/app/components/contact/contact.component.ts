import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  isSent = false;

  constructor(private emailService: EmailService) { }

  sendEmail(form: NgForm) {
    if (form.valid) {
      this.emailService.sendEmail(form.value).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error('Erro ao enviar email', error);
        }
      );
      form.resetForm();
      this.isSent = true;
    }
  }
}
