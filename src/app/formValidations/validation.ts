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
    getErrorMessage_V(register:FormGroup,field:string):string{
        if(register.get(field).hasError('required')){
            return "campo requerido"
        }
        if(register.get(field).hasError('maxlength')){
            return "tu número de teléfono debe contener 10 digitos";
        }
        if(register.get(field).hasError('pattern')){
            
            if(register.get(field)===register.get('email')){
              return "dirección electrónica invalido";
            } 
            if(register.get(field)===register.get('cell_phone')){
              return "teléfono móvil invalido";
            }
            else{
              return "la contraseña debe contener almenos una letra mayuscula,minuscula,un digito y un caracter especial";
            }
        }
        if(register.get(field).errors.mustMatch){
            return "las contraseñas no coinciden";
        }
    }
    get_person_V(register:FormGroup,user_idRol:number):User{
        var user_name=register.get('name').value;
        var user_last_name=register.get('last_name').value;
        var user_email=register.get('email').value;
        var user_cellphone=register.get('cell_phone').value;
        var user_idRol=user_idRol;
        var user_password=register.get('password').value;
        var user_password_confirmation=register.get('password_confirmation').value;
        var user_status="inactive";
        let person=new User(user_name,user_last_name,user_email,user_cellphone,
            user_idRol,user_password,user_password_confirmation,user_status);

        return person;
    }


}