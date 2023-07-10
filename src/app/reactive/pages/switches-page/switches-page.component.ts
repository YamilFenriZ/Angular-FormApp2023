import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ],
  providers:[JsonPipe]

})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: [ 'M', [ Validators.required ]],
    wantNotification: [ true, Validators.required ], // Tiene que haber un valor seleccionado
    termsAndConditions: [ false, Validators.requiredTrue ],

  });

  public person = {
    gender: 'F',
    wantNotification: false,
  }

  constructor( private fb: FormBuilder ){
  }
  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;

    console.log(this.myForm.value);
    // this.person = this.myForm.value;
    console.log(this.person);

  }


}
