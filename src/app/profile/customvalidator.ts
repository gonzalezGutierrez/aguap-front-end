import {AbstractControl } from "@angular/forms";
import * as CryptoJS from 'crypto-js';
export class CurrentPassword{
    encrypted="";
    key="";
    constructor(){}

    set_encrypted(encrypted:any){
        this.encrypted=encrypted;
    }

    get_encrypted(){
        return this.encrypted;
    }

    set_key(key:any){
        this.key=key
    }
    get_key(){
        return this.key;
    }

}

var current =new CurrentPassword();

export function myCurrentPassword(encrypted:any,key:any){
    var encrypted=encrypted;
    var key=key;
    current.set_encrypted(encrypted);
    current.set_key(key);
}

export function ValidateOldPassword(control: AbstractControl){
    var encrypted=current.get_encrypted();
    var key=current.get_key();
    if (control.value===(CryptoJS.AES.decrypt(encrypted.trim(),key.trim()).toString(CryptoJS.enc.Utf8))) {
        return null;
    }
    else{
        return {CurrentPassword:true};
    }
    
}



