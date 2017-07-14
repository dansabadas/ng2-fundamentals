import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService, IEvent, ISession } from '../shared/index';

@Component({
  templateUrl: '/app/events/event-details/event-details.component.html',
  styles: [`
    .container { padding-left:20px; padding-right:20px; }
    .event-image { height:100px; }
    a {cursor:pointer}
  `]
})
export class EventDetailsComponent {
  private event: IEvent;
  private addMode: boolean;
  private filterBy: string = 'all';
  private sortBy: string = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute) {

  }

  private addSession() {
    this.addMode = true;
  }

  private saveNewSessionHandler(session: ISession) {
    const nextId =  Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();// we need to subscribe to make the call happen!
    this.addMode = false;  // here we are optimistic not putting it in the callback handler!
  }

  private cancelAddSessionHandler() {
    this.addMode = false;
  }

  public ngOnInit() {
    this.route.data.forEach((data) => {
        this.event = data['event'];
        this.addMode = false;
    });
  }
}
