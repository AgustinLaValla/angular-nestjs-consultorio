import { Component, Inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { InitialDialogComponent } from './components/initial-dialog/initial-dialog.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(AuthService) private authService: AuthService, private dialog:MatDialog) { 
    this.authService.initAuthListener();
    this.openInitialDialog();
   }

  openInitialDialog() {
    this.dialog.open(InitialDialogComponent, {
      width: '400px',
    })
  }

}
