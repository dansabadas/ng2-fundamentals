import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { ISession } from '../shared/index';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: '/app/events/event-details/session-list.component.html',
  styles: ['collapsible-well h6 {margin-top:-5px; margin-bottom:10px }'],
})
export class SessionListComponent implements OnChanges {
  @Input() public sessions: ISession[];
  @Input() public filterBy: string;
  @Input() public sortBy: string;
  @Input() public eventId: number;
  public visibleSessions: ISession[] = [];

  constructor(private auth: AuthService, private voterService: VoterService) {}

  // this method gets invoked any time any variable marked with the @Input() attribute gets changed!
  public ngOnChanges() { 
    if(this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  private filterSessions(filter) {
    if(filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);  // this is how we clone the array (we duplicate it!)
    } else {
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

  private toggleVote(session: ISession) {
    if(this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
    }
    if(this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  private userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if(s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
