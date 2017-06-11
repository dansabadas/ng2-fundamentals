import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service'
import { ToastrService } from '../common/toastr.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'events-list',
    templateUrl: 'app/events/events-list.component.html'
})

export class EventsListComponent implements OnInit {
    events:any;//any[]

    constructor(private eventService: EventService, private toastrService: ToastrService, private route:ActivatedRoute) { }

    ngOnInit() { 
        // this.eventService.getEvents().subscribe(events => {
        //     this.events = events;
        // });
        this.events = this.route.snapshot.data['events'];   //resolver loaded the data and put it in the 'events' route
    }

    handleEventClicked(data){
        this.toastrService.success(data);
    }
}