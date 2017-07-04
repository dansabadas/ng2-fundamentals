import { Component } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
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
    //this.event = this.eventService.getEvent(1)
    //this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])

    // the snapshot logic above is not good anymore because it is not observable!
    // in the handler below we ned to reset all state of the component we are interested in to be reset!
    // we are routing the component to itself.
    this.route.params.forEach((params: Params) => {
      this.eventService.getEvent(+params['id']).subscribe((event:IEvent)=>{
        this.event = event;
        this.addMode = false;
      });
    });
  }
}