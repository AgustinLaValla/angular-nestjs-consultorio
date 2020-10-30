import { ElementRef, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CurrentPage } from '../utils/current-page.enum';

@Injectable({ providedIn: 'root' })
export class UiService {
    public turnosTabRef$ = new BehaviorSubject<ElementRef>(null);
    public currentPage = new BehaviorSubject<CurrentPage>(null);
    constructor(private snack: MatSnackBar) { }

    showSnackBar(message: string, action, duration: number) {
        this.snack.open(message, action, {
            duration: duration
        })
    }
}

