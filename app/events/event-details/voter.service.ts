import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ISession } from '../shared/session.model';

@Injectable()
export class VoterService {

  constructor(private http: Http) {}

  public deleteVoter(eventId: number, session: ISession, voterName: string) {
    session.voters = session.voters.filter((voter) => voter !== voterName);
    // no need of headers!
    this.http
      .delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`)
      .catch(this.handleError)
      .subscribe();
  }

  public addVoter(eventId: number, session: ISession, voterName: string) {
    session.voters.push(voterName);

    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http
      .post(url, JSON.stringify({}), options)
      .catch(this.handleError)
      .subscribe(); // all needed info is in the URL => nothing to be passed in the body => {}
  }

  public userHasVoted(session: ISession, voterName: string) {
    return session.voters.some((voter) => voter === voterName);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
