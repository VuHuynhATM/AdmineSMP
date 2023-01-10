import { Component } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from 'firebase/app';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, DialogService]
})
export class AppComponent {
  title = 'AdminWebApp';
  message: any = null;
  constructor() { }
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    const app = initializeApp(environment.firebase);
    const messaging = getMessaging(app);
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            console.log(currentToken);
            localStorage.setItem("FCM", currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  }
  listen() {
    const app = initializeApp(environment.firebase);
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}
