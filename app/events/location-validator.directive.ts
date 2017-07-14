import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  // we add the current validator to the list of validators 
  // NG_VALIDATORS and (multi:true) means appending not replacing the validators
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]    
})
export class LocationValidator implements Validator {
  public validate(formGroup: FormGroup): { [key: string]: any } {
    // the same formGroup.controls.address or .['address'], just that typescript does not like the first form!
    const addressControl = formGroup.controls['address'];
    const cityControl = formGroup.controls['city'];
    const countryControl = formGroup.controls['country'];
    const onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    return (addressControl && addressControl.value && 
        cityControl && cityControl.value && 
        countryControl && countryControl.value) || 
        (onlineUrlControl && onlineUrlControl.value)
        ? null
        : {validateLocation: false};
  }
}
