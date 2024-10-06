import {NgModule} from "@angular/core";
import {MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIconButton,
    RouterLink,
    MatIcon,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIconButton,
    RouterLink,
    MatIcon,
  ]
})
export class SharedImports {}
