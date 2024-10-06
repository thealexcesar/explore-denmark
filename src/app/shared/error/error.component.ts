import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'denmark-error',
  standalone: true,
  imports: [
    NgSwitch,
    RouterLink,
    NgSwitchCase
  ],
  templateUrl: './error.component.html',
  styles: ``
})
export class ErrorComponent {
  @Input() errorType: 'not-found' | 'error' | 'loading' = 'error';
  @Input() entityName: string = 'Content';
}
