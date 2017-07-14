import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  // styleUrls: ['/app/events/event-details/upvote.component.css'],
  template:`
    <div class="votingWidgetContainer pointable" (click)="onClick()">
      <div class="well votingWidget">
        <div class="votingButton">
          <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
        <div>
        <div class="badge badge-inverse votingCount">
          <div>{{count}}</div>
        </div>
      </div>
    </div>
  `
})
export class UpvoteComponent {
  @Input() public count: number;
  // session-list sets the voted property which as we can see sets the iconColor which 'sets' the stle.color
  @Input() public set voted(val){  
    this.iconColor = val ? 'red' : 'white';
  }
  @Output() public vote = new EventEmitter();
  public iconColor: string;

  public onClick() {
    this.vote.emit({});
  }
}
