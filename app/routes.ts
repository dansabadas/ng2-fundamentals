import { Routes } from '@angular/router';

import {
    CreateEventComponent,
    CreateSessionComponent,
    EventDetailsComponent,
    EventResolver,
    EventsListComponent,
    EventsListResolver,
    EventThumbnailComponent
} from './events/index';

import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [   
    // it must be put first otherwise will get confused with events/:id route below
   { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
   // resolve: {events:EventListResolver}
   { path: 'events', component: EventsListComponent, resolve: {events:EventsListResolver} },
   // canActivate: [EventRouteActivator] 
   { path: 'events/:id', component: EventDetailsComponent, resolve: {event:EventResolver} }, 
   { path: 'events/session/new', component: CreateSessionComponent },
   { path: '404', component: Error404Component },
   { path: '', redirectTo: '/events', pathMatch: 'full' },
   { path: 'user', loadChildren: 'app/user/user.module#UserModule' }    // loadChildren signifies AJAX lazy loading!
];
