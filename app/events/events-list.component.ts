import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service'
import { ActivatedRoute } from '@angular/router'

import { IEvent } from './shared/index'

@Component({
    selector: 'events-list',
    templateUrl: 'app/events/events-list.component.html'
})

export class EventsListComponent implements OnInit {
    events: IEvent[];//any[]

    constructor(private eventService: EventService, private route:ActivatedRoute) { }

    ngOnInit() { 
        // this.eventService.getEvents().subscribe(events => {
        //     this.events = events;
        // });
        this.events = this.route.snapshot.data['events'];   //resolver loaded the data and put it in the 'events' route
    }
}