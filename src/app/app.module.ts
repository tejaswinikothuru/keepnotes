import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotesComponent } from './notes/notes.component';
import { ReminderComponent } from './reminder/reminder.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ArchivesComponent } from './archives/archives.component';
import { TrashComponent } from './trash/trash.component';
import { AuthorizationService } from './authorization.service';
import { ToastrModule } from 'ngx-toastr';
import { HelpComponent } from './help/help.component';


@NgModule({

  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    NavbarComponent,
    NotesComponent,
    ReminderComponent,
    FavouritesComponent,
    ArchivesComponent,
    TrashComponent,
    HelpComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true,
      positionClass: 'toast-center-center'
    }) 
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,
  useClass:AuthorizationService,
multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
