import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [EventsListComponent, EventsAppComponent, EventThumbnailComponent],
    providers: [],
    bootstrap:[EventsAppComponent]
})
export class AppModule { }
