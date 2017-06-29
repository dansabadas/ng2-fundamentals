import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]    // we add the current validator to the list of validators NG_VALIDATORS and (multi:true) means appending not replacing the validators
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } {
    let addressControl = formGroup.controls['address']; // the same formGroup.controls.address or .['address'], just that typescript does not like the first form!
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    return (addressControl && addressControl.value && 
        cityControl && cityControl.value && 
        countryControl && countryControl.value) || 
        (onlineUrlControl && onlineUrlControl.value)
        ? null
        : {validateLocation: false};
  }
} 