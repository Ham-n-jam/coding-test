import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EditMode } from './add-edit-mode.enum';
import { GlossaryTerm } from '../../../core/models/glossary-term';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-edit-glossary-term',
  templateUrl: './add-edit-glossary-term.component.html',
  styleUrls: ['./add-edit-glossary-term.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class AddEditGlossaryTermComponent implements OnChanges {
    @Input() editMode: EditMode = EditMode.Add;
    @Input() termToEdit: GlossaryTerm | undefined;
    @Output() glossaryTerm = new EventEmitter<Partial<GlossaryTerm>>();
    
    glossaryTermForm = this.formBuilder.group({
        term: '',
        definition: ''
    });
    
    constructor(private formBuilder: FormBuilder) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('termToEdit')) {
            this.onEditModeChanged()
        }
    }

	public onSubmit(): void {
        let newTerm: Partial<GlossaryTerm> = {
            term: this.glossaryTermForm.value.term ?? '',
            definition: this.glossaryTermForm.value.definition ?? ''
        }

        if (this.editMode === EditMode.Edit) {
            // Attach id to updated fields
            newTerm = {...newTerm, id: this.termToEdit!.id}
        }

        this.glossaryTerm.emit(newTerm)
        this.clearFields()
    }

    private onEditModeChanged(): void {
        this.clearFields()
        if (this.editMode === EditMode.Edit) {
            // Set form fields for editing
            this.glossaryTermForm.controls.term.setValue(this.termToEdit?.term ?? '')
            this.glossaryTermForm.controls.definition.setValue(this.termToEdit?.definition ?? '')
        }
    }

    private clearFields(): void {
        this.glossaryTermForm.reset();
    }
}
