import { TestBed } from '@angular/core/testing';

import { CheckTeacherRoleGuardGuard } from './check-teacher-role-guard.guard';

describe('CheckTeacherRoleGuardGuard', () => {
  let guard: CheckTeacherRoleGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckTeacherRoleGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
