//ANGULAR MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//MATERIAL
import { MaterialModule } from './material/material.module';
//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
//COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.reducer';
import { effectsArray } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { InitialDialogComponent } from './components/initial-dialog/initial-dialog.component';  


@NgModule({
  declarations: [
    AppComponent,
    InitialDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(effectsArray),
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: environment.production }),
    HttpClientModule

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
