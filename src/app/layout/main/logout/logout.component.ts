import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: Auth,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    localStorage.clear();
    console.log("áđá");
    signOut(this.auth);
    this.router.navigate(['login']);
  }

}
