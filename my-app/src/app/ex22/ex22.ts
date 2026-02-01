import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Model for registration data
interface RegistrationModel {
  studentName: string;
  email: string;
  phone: string;
  course: string;
  session: string;
  agree: boolean;
}

@Component({
  selector: 'app-ex22',
  standalone: false,
  templateUrl: './ex22.html',
  styleUrl: './ex22.css',
})
export class Ex22 implements OnInit {
  registrationForm!: FormGroup;
  jsonOutput: string = '';
  
  // Course options
  courses: string[] = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Cyber Security',
    'Cloud Computing'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registrationForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      course: ['', Validators.required],
      session: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.get(key)?.markAsTouched();
    });

    if (this.registrationForm.valid) {
      const formData: RegistrationModel = this.registrationForm.value;
      this.jsonOutput = JSON.stringify(formData, null, 2);
      console.log('Registration data:', formData);
    } else {
      console.log('Form is invalid');
      this.jsonOutput = '';
    }
  }

  onReset(): void {
    this.registrationForm.reset();
    this.jsonOutput = '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
