import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { SaveUserService } from '../../services/save-user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public logUser : SaveUserService) { }

  ngOnInit() {
    /* this.auth.currentUser.then((user)=>{
      console.log(user);
    }).catch((error)=>{
      console.log(error);
    }) */
  }

}