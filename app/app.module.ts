import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsAppComponent } from './events-app.component';

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [EventsAppComponent],
    providers: [],
    bootstrap:[EventsAppComponent]
})
export class AppModule { }
