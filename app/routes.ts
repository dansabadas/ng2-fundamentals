import { Routes } from '@angular/router'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventsListResolver,
    EventResolver,
    CreateSessionComponent
} from './events/index';

import { Error404Component } from './errors/404.component'

export const appRoutes:Routes = [   //, canDeactivate: ['canDeactivateCreateEvent']
   { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },    // it must be put first otherwise will get confused with events/:id route below
   { path: 'events', component: EventsListComponent, resolve: {events:EventsListResolver} },  //, resolve: {events:EventListResolver}
   { path: 'events/:id', component: EventDetailsComponent, resolve: {event:EventResolver} }, // , canActivate: [EventRouteActivator]
   { path: 'events/session/new', component: CreateSessionComponent },
   { path: '404', component: Error404Component },
   { path: '', redirectTo: '/events', pathMatch: 'full' },
   { path: 'user', loadChildren: 'app/user/user.module#UserModule' }    // loadChildren signifies AJAX lazy loading!
]