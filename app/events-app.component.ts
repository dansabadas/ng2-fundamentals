import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'events-app',
    template: '<events-list></events-list>'
})

export class EventsAppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

