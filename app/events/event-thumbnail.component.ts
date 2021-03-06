import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from './shared/index';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{event?.name | uppercase}}</h2>
      <div>Date: {{event?.date | date:'shortDate'}}</div>
      <!--[ngStyle]="getStartTimeStyle()" /* this is the best way */-->
      <div 
        [class.green]="event?.time === '8:00 am'" 
        [ngClass]="{green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}"   
        [ngStyle]="getStartTimeStyle()"  
        [ngSwitch]="event?.time">
        Time: {{event?.time}}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: {{event?.price | currency:'USD':true}}</div>
      <!--*ngIf or [hidden] but => better use the structural directive ngIf-->
      <div [hidden]="event?.location">
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
      <div *ngIf="event?.onlineUrl">
        Online URL: {{event?.onlineUrl}}
      </div>
      <button class="btn btn-primary" (click)="handleClickMe()">Click me! </button>
    </div>
  `,
  styles: [`
    .green {color: #003300 !important; }
    .bold {font-weight: bold; }
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {
  @Input() public event: any;  // data comes passed from parent: [event]="event1" or whatever
  @Output() public eventClick = new EventEmitter();
  public someProperty: any = 'some string';

  public handleClickMe() {
    console.log('clicked: ' + this.event.name);
    this.eventClick.emit(this.event.name);
  }

  public logFoo() {
      console.log('foo');
  }

  public getStartTimeStyle(): any {
    if (this.event && this.event.time === '8:00 am') {
        return {
          'color': '#003300', 
          'font-weight': 'bold'};
      }
    return {};
  }
}
