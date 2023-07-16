import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListComponent } from './watch-list.component';

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    // expect(component).toBeTruthy();
  });
});
