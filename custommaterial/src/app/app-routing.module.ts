import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule]
})
export class AppRoutingModule { }
