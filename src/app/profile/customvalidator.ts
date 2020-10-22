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
    //console.log("esta es mi contraseña ",current_password);
    var key=current_password;
    current.set_data(key);
    //this.password=current_password;
    
}

export function ValidateOldPassword(control: AbstractControl){
    //console.log("control de validators password ",control);
    var key_value=current.get_key();
    //console.log("key value ",key_value);
    if (control.value===key_value) {
        console.log("es igual perro");
        return { CurrentPassword:true};
    }
    else{
        return {CurrentPassword:false};
    }
    
}



