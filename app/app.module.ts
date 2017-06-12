import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventService,
    EventsListResolver
} from './events/index';

import { Error404Component } from './errors/404.component'
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service'
import { appRoutes} from './routes'

@NgModule({
    imports: [
        BrowserModule, 
        RouterModule.forRoot(appRoutes)
    ],
    exports: [],
    declarations: [
        EventsListComponent, 
        EventsAppComponent, 
        EventThumbnailComponent, 
        NavBarComponent, 
        EventDetailsComponent, 
        CreateEventComponent, 
        Error404Component
    ],
    providers: [
        EventService, 
        ToastrService, 
        EventRouteActivator,
        EventsListResolver,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
        //{ provide: 'canDeactivateClickThumbnail', useValue: false }
    ],
    bootstrap:[EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}