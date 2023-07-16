import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGlossaryTermComponent } from './add-edit-glossary-term.component';

describe('AddEditGlossaryTermComponent', () => {
  let component: AddEditGlossaryTermComponent;
  let fixture: ComponentFixture<AddEditGlossaryTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: []
    });
    fixture = TestBed.createComponent(AddEditGlossaryTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
