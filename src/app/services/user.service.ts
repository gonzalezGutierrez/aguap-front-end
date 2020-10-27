import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import {User} from 'src/app/models/user';
import {Iuser} from 'src/app/models/InterfaceUser'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url:string="http://127.0.0.1:8000/api/v1/"; 
  
  constructor(private http:HttpClient) {

  }

  registerUser(user:User){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url +"register",user, {headers:headers});
  }
  
  userAccountActivation(token:string,id:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+token);
    return  this.http.get<any>(this.url+"user/activate/"+id,{headers:headers});
  }

  userById(id:number,token:string):Observable<Iuser>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+token);
    return this.http.get<Iuser>(this.url+"user/"+id,{headers:headers});
  }

  usersCurrentpassword(token:string,id:Number):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+token);
    return this.http.get<any>(this.url+"user/verificationPassword/"+id,{headers:headers});
  }

  updateUser(token:string,user:User,id:Number):Observable<Iuser>{
    const headers=new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization','Bearer '+token);
    return this.http.put<Iuser>(this.url+"user/updateUser/"+id,user,{headers:headers});
  }

  changeUserPassword(token:string,newPassword:string,id:number):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '+token);
    var user={
      'newPassword':newPassword,
    }
    return this.http.put<any>(this.url+"user/updatePassword/"+id,user,{headers:headers});
  }

 
  get_ubications(id:number,token:string):Observable<any>{
    console.log("estoy en el servicio de ubicaciones xd xd ");
    const headers=new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.get<any>(this.url+"ubication",{headers:headers});
  }

  delete_ubication(ubication:any,token:string):Observable<any>{
    const headers=new HttpHeaders().set('Authorization','Bearer '+token);
    return this.http.delete<any>(this.url+"ubication/"+ubication.id,{headers:headers});
  }

  findEmail(email:any):Observable<any>{
    console.log("si estoy valiendo==", email)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.url+"user/email?email="+email);
  }

  

  



  
}
