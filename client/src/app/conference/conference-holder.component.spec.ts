import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceHolderComponent } from './conference-holder.component';

describe('ConferenceHolderComponent', () => {
  let component: ConferenceHolderComponent;
  let fixture: ComponentFixture<ConferenceHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
