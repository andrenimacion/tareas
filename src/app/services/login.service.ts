import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlapi = 'https://alp-cloud.com:8455/api/';

  constructor( private http: HttpClient ) { }

  log(model: any) {
    return this.http.post( this.urlapi+'UserLogin/loginNotes', model );
  }

}
