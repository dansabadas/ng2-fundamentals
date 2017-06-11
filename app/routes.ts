import { Routes } from '@angular/router'
// import {
//   EventsListComponent,
//   EventDetailsComponent,
//   CreateEventComponent,
//   EventRouteActivator,
//   EventListResolver
// } from './events/index'
// import { Error404Component } from './errors/404.component'

import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component'
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventsListResolver } from './events/events-list-resolver.service';

export const appRoutes:Routes = [   //, canDeactivate: ['canDeactivateCreateEvent']
   { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },    // it must be put first otherwise will get confused with events/:id route below
   { path: 'events', component: EventsListComponent, resolve: {events:EventsListResolver} },  //, resolve: {events:EventListResolver}
   { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] }, // , canActivate: [EventRouteActivator]
   { path: '404', component: Error404Component },
   { path: '', redirectTo: '/events', pathMatch: 'full' },
//   { path: 'user', loadChildren: 'app/user/user.module#UserModule'}
]