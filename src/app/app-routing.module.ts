import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {NotesComponent} from './notes/notes.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ArchivesComponent } from './archives/archives.component';
import { TrashComponent } from './trash/trash.component';
import { ReminderComponent } from './reminder/reminder.component';

const routes: Routes = [
{path:"signin",component:SigninComponent},
{path:"signup",component:SignupComponent},
{path:"home",component:HomeComponent},
{path:"navbar",component:NavbarComponent},
{path:"reminder", component:ReminderComponent},
{path:"notes",component:NotesComponent},
{path:"favourites",component:FavouritesComponent},
{path:"archives", component:ArchivesComponent},
{path:"trash", component:TrashComponent},
{path:"", redirectTo:"signin",pathMatch:"full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
