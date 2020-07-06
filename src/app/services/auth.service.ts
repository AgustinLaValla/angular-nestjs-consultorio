import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private alertsService: AlertsService
    ) { }

    initAuthListener() { };

    logIn(email: string, password: string) { };

    logout() { };

}