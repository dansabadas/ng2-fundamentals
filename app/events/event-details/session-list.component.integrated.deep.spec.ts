import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { AuthService } from '../../user/auth.service';
import { DurationPipe } from '../shared/duration.pipe';
import { ISession } from '../shared/session.model';
import { SessionListComponent } from './session-list.component';
import { UpvoteComponent } from './upvote.component';
import { VoterService } from './voter.service';

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement;

  beforeEach(async(() => {
    const mockAuthService = {
      isAuthenticated: () => true,
      currentUser: {userName: 'Joe'}
    };
    const mockVoterService = {
      userHasVoted: () => true
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        UpvoteComponent,
        DurationPipe,
        CollapsibleWellComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService }
      ]
    }).compileComponents();// if we use system.js and not webpack this is needed along with the async keyword
  }));

  beforeEach(() => {    // this happens AFTER the first before-each above
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {

    it('should have the correct session title', () => {
      component.sessions = [
        { 
          id: 3, 
          name: 'Session 1', 
          presenter: 'Joe', 
          duration: 1, 
          level: 'beginner', 
          abstract: 'abstract', 
          voters: ['john', 'bob']
        }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges(); // this is automatically triggered only when the @Input properties are changed
      fixture.detectChanges(); // from a parent component => updates html and bindings and re-render the changes

      // => this is deep integration test
      expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
    });
  });
});
