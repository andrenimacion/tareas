import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public _name:   string = ''
  public _password: string = ''

  constructor( private L:LoginService, private router: Router ) { }

  ngOnInit(): void { 

    if( sessionStorage.getItem('TOKEN-SESSION') == undefined || sessionStorage.getItem('TOKEN-SESSION') == '')
    {
      console.log('No tienes codigo de sesion')
      this.router.navigate(['/login'])
    } else {
      console.log('Si tienes codigo de sesion')
      this.router.navigate(['/Dashboards'])
    }
  }


  public arrLog: any = [];  
  Login( a: string, b: string ) {
    
    this.arrLog = {
      name_user: a,
      password_user: b
    }

    console.log(this.arrLog)

    this.L.log(this.arrLog).subscribe( log => {
      alert('Ingresaste con ÉXITO')
      this.router.navigate(['/Dashboards'])

      this.arrLog = log;
      sessionStorage.setItem('USER', this.arrLog.name_user);  
      sessionStorage.setItem('TOKEN', this.arrLog.cod_user); 
      sessionStorage.setItem('TOKEN-SESSION', this.arrLog.cod_session);  
      sessionStorage.setItem('UID', this.arrLog.id);  
      this.upState( this.arrLog.id, 'online');

    }, (err) => {
      alert('ERROR LOGIN')
    })

  }


  upState( id: number, state: string) {
    this.L.updatEstate( id, state ).subscribe( u => {
      console.log('CONECTADO')
    })
  }


}
