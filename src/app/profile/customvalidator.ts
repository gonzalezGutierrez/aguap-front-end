import { FormGroup, AbstractControl } from "@angular/forms";
import {UserService} from 'src/app/services/user.service';

export class CurrentPassword{
    key="";
    constructor(){}

    set_data(key:any){
        this.key=key;
    }

    get_key(){
        return this.key;
    }

}

var current =new CurrentPassword();

export function myCurrentPassword(current_password:String){
    var key=current_password;
    current.set_data(key);
}

export function ValidateOldPassword(control: AbstractControl){
    var key_value=current.get_key();
    if (control.value===key_value) {
        return null;
    }
    else{
        return {CurrentPassword:true};
    }
    
}



