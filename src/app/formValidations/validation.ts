import {FormGroup} from '@angular/forms';
import {User}from '../models/user'
export class Validation{
    
    constructor(){}

    isValidField_V(register:FormGroup,field:string):boolean{
        var FormControl=register.get(field);
        if( (FormControl.touched ||FormControl.dirty )&&FormControl.invalid){
            return true;
        }
        else{
            return false;
        }
    }
    getErrorMessage_V(control:FormGroup,field:string):string{
        if(control.get(field).hasError('required')){
            return "campo requerido"
        }
        if(control.get(field).hasError('maxlength')){
            return "tu número de teléfono debe contener 10 digitos";
        }
        if(control.get(field).hasError('pattern')){
            
            if(control.get(field)===control.get('email')){
              return "dirección electrónica invalido";
            } 
            if(control.get(field)===control.get('cell_phone')){
              return "teléfono móvil invalido";
            }
            else{
              return "la contraseña debe contener almenos una letra mayuscula,minuscula,un digito y un caracter especial";
            }
        }
        if(control.get(field).errors.mustMatch){
            return "las contraseñas no coinciden";
        }
        if(control.get(field).errors.CurrentPassword){
            return "contraseña no coincide con la actual";
        }
        
    }
    get_person_V(register:FormGroup,role_id:number):User{
        var user_name=register.get('name').value;
        var user_last_name=register.get('last_name').value;
        var user_email=register.get('email').value;
        var user_cellphone=register.get('cell_phone').value;
        var role_id=role_id;
        var user_password=register.get('password').value;
        var user_password_confirmation=register.get('password_confirmation').value;
        var user_status="inactive";
        let person=new User(user_name,user_last_name,user_email,user_cellphone,
            role_id,user_password,user_password_confirmation,user_status);

        return person;
    }


}