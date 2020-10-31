import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getShowProgressBar } from 'src/app/store/app.reducer';
import { showProgressBar } from 'src/app/store/actions';
import { CurrentPage } from '../../utils/current-page.enum';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public opened: boolean = false;

  private showProgressBar$ = new Subscription();
  public showProgressBar: boolean = false;

  private currentPage$ = new Subscription();
  private currentPage: string;

  constructor(
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanatizer: DomSanitizer,
    private store: Store<AppState>,
    private renderer: Renderer2,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.setIcons();
    this.showProgressBar$ = this.store.select(getShowProgressBar).subscribe(show => this.showProgressBar = show);
    this.listenCurrentPage();
  };

  setIcons() {
    this.matIconRegistry.addSvgIcon('logout', this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    this.matIconRegistry.addSvgIcon('medical_folders', this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/medical_folders.svg'));
  };

  logOut() {
    this.authService.logout();
  };

  activateProgressBar(page: any) {

    if (this.currentPage !== page) {
      this.store.dispatch(showProgressBar());
      this.uiService.currentPage.next(page);
    }
    if (this.renderer.selectRootElement(window).innerWidth <= 559) {
      this.opened = !this.opened;
    }
  }

  listenCurrentPage() {
    this.currentPage$ = this.uiService.currentPage.subscribe(currentPage => this.currentPage = currentPage);
  }

  ngOnDestroy(): void {
    this.showProgressBar$.unsubscribe();
    this.currentPage$.unsubscribe();
  };

}

