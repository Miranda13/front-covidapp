import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveUserService {

  constructor() {
  }

  public reportsUser: any [] = [];
  public user: any = {};
  public change: boolean;
  public actu: boolean;
  public current: any = {};
}
