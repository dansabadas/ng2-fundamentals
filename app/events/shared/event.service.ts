import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/RX';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { IEvent } from './event.model';
import { ISession } from './session.model';

@Injectable()   // this Injectable decorator is not really required
export class EventService {

  constructor(private http: Http) {}

  public getEvents(): Observable<IEvent[]> {
    // this .get call won't happen unless someone subscribed to the observable!
    return this.http.get('/api/events').map((response: Response) => {
        return response.json() as IEvent[]; // this is the magic of forcing typing: any => IEvent[]
    }).catch(this.handleError);
  }
 
  public getEvent(id: number): Observable<IEvent> {
    return this.http.get('/api/events/' + id).map((response: Response) => {
        return response.json() as IEvent;
    }).catch(this.handleError);
  }

  public saveEvent(event): Observable<IEvent> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    // it seems in latest version of Angular we don't need JSON.stringify(event) 
    // as the js object passed aka 'event' will automatically be stringified
    return this.http.post('/api/events', JSON.stringify(event), options).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }

  public searchSessions(searchTerm: string) {
    return this.http.get('/api/sessions/search?search=' + searchTerm).map((response: Response) => {
        return response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}
