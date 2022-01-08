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

  gUsers(PROPERTIES: string, filter: string, order: string) {
    return this.http.get( this.urlapi + 'UserLogin/getuserNotes/' + PROPERTIES + '/' + filter + '/' + order );
  }

  updatEstate( id: number, state: string ) {
    return this.http.get( this.urlapi + 'UserLogin/upestate/' + id + '/' + state );
  }

}
