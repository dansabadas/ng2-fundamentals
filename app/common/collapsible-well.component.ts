import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  template: `
<div (click)="toggleContent()" class="well pointable">
  <h4>
  <!-- select attribute is doing all the magic here for content projection (see below the difference!) -->
    <ng-content select="[well-title]"></ng-content>
  </h4>
  <ng-content *ngIf="visible" select=".well-body"></ng-content>
</div>
  `
})
export class CollapsibleWellComponent {
  private visible: boolean = true;

  private toggleContent() {
    this.visible = !this.visible;
  }
}
