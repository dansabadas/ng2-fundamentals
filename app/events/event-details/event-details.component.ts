import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IEvent, ISession, EventService } from '../shared/index'

@Component({
  templateUrl: '/app/events/event-details/event-details.component.html',
  styles: [`
    .container { padding-left:20px; padding-right:20px; }
    .event-image { height:100px; }
    a {cursor:pointer}
  `]
})
export class EventDetailsComponent {
  event:IEvent;
  addMode: boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(private eventService:EventService, private route:ActivatedRoute) {

  }
  addSession() {
    this.addMode = true
  }

  saveNewSessionHandler(session:ISession) {
    const nextId =  Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event)
    this.addMode = false
  }

  cancelAddSessionHandler() {
    this.addMode = false
  }

  ngOnInit() {
    console.log(+this.route.snapshot.params['id'])
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
    //this.event = this.eventService.getEvent(1)
  }
}