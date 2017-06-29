import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventService,
    EventsListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index';

import { 
    JQ_TOKEN,
    TOASTR_TOKEN, 
    Toastr,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective 
} from './common/index';

import { Error404Component } from './errors/404.component'
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes} from './routes'
import { AuthService } from './user/auth.service'

declare let toastr : Toastr;  // this way we declare toastr is on the global scope
declare let jQuery : Object;

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        ReactiveFormsModule,
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
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        DurationPipe,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator
    ],
    providers: [
        EventService, 
       { provide: TOASTR_TOKEN, useValue: toastr },
       { provide: JQ_TOKEN, useValue: jQuery },
        EventRouteActivator,
        EventsListResolver,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
        AuthService,
        VoterService
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