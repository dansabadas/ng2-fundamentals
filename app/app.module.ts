import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import './rxjs-extensions';

import {
    CreateEventComponent,
    CreateSessionComponent,
    DurationPipe,
    EventDetailsComponent,
    EventResolver,
    EventService,
    EventsListComponent,
    EventsListResolver,
    EventThumbnailComponent,
    LocationValidator,
    SessionListComponent,
    UpvoteComponent,
    VoterService
} from './events/index';

import { 
    CollapsibleWellComponent,
    JQ_TOKEN, 
    ModalTriggerDirective,
    SimpleModalComponent,
    Toastr,
    TOASTR_TOKEN 
} from './common/index';

import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes} from './routes';
import { AuthService } from './user/auth.service';

declare let toastr: Toastr;  // this way we declare toastr is on the global scope
declare let jQuery: Object; 

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
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
        EventsListResolver,
        EventResolver,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
        AuthService,
        VoterService
        // { provide: 'canDeactivateClickThumbnail', useValue: false }
    ],
    bootstrap:[EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to cancel?');
    }
  return true;
}
