import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from 'src/app/shared/validators/validators.function';
// import * as customValidators from '../../../shared/validators/validators.function'
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { firstNameAndLastnamePattern } from '../../../shared/validators/validators.function';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:  [ '', [ Validators.required, Validators.pattern( this.validatorService.firstNameAndLastnamePattern ) ]],
    email: [ '', [ Validators.required, Validators.pattern(this.validatorService.emailPattern )], [ new EmailValidator() ] ],
    //email: [ '', [ Validators.required, Validators.pattern(this.validatorService.emailPattern )], [ this.emailValidator ] ],
    username: [ '', [ Validators.required, this.validatorService.cantBeStrider ]],
    password: [ '', [ Validators.required, Validators.minLength(6) ]],
    password2: [ '', [ Validators.required, Validators.minLength(6) ]],
  },{
    validators:[
      this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    //private emailValidator: EmailValidator
  ){}

  isValidField(field: string){
    return this.validatorService.isValidField( this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
