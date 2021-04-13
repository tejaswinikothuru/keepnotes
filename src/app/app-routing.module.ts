import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivesComponent } from './archives/archives.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotesComponent } from './notes/notes.component';
import { RemindersComponent } from './reminders/reminders.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TrashComponent } from './trash/trash.component';


const routes: Routes = [
{path:"signin",component:SigninComponent},
{path:"signup",component:SignupComponent},
{path:"home",component:HomeComponent},
{path:"navbar",component:NavbarComponent},
{path:"notes",component:NotesComponent},
{path:"reminder",component:RemindersComponent},
{path:"favourites",component:FavouritesComponent},
{path:"archive",component:ArchivesComponent},
{path:"trash",component:TrashComponent},
{path:"", redirectTo:"signin",pathMatch:"full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
