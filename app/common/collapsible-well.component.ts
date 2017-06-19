import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  template: `
<div (click)="toggleContent()" class="well pointable">
  <h4>
    <ng-content select="[well-title]"></ng-content><!-- select attribute is doing all the magic here for content projection (see below the difference!) -->
  </h4>
  <ng-content *ngIf="visible" select=".well-body"></ng-content>
</div>
  `
})
export class CollapsibleWellComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}