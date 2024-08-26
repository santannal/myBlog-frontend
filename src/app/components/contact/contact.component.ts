import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  isSent = false;

  formGroupEmail: FormGroup;

  constructor(private emailService: EmailService, private formBuilder: FormBuilder) {
    this.formGroupEmail = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  sendEmail() {
    if (this.formGroupEmail.valid) {
      this.emailService.sendEmail(this.formGroupEmail.value).subscribe(
        response => {
          console.log(response);
          this.isSent = true;
        },
        error => {
          console.error('Erro ao enviar email', error);
        }
      );
      this.formGroupEmail.reset();
    }
  }

  get efgName() { return this.formGroupEmail.get("name") }
  get efgEmail() { return this.formGroupEmail.get("email") }
  get efgMessage() { return this.formGroupEmail.get("message") }
}
