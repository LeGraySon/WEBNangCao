import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Model for login data
interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-ex21',
  standalone: false,
  templateUrl: './ex21.html',
  styleUrl: './ex21.css',
})
export class Ex21 implements OnInit {
  loginData: LoginModel = {
    email: '',
    password: ''
  };

  saveLogin: boolean = false;
  jsonOutput: string = '';
  emailError: string = '';
  passwordError: string = '';

  // Correct credentials
  private readonly CORRECT_EMAIL = 'admin@gmail.com';
  private readonly CORRECT_PASSWORD = '12345';
  private readonly STORAGE_KEY = 'savedLoginInfo';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load saved login info from localStorage if exists
    this.loadSavedLogin();
  }

  onLogin(): void {
    // Reset errors
    this.emailError = '';
    this.passwordError = '';
    this.jsonOutput = '';

    // Validate email
    if (!this.validateEmail(this.loginData.email)) {
      this.emailError = 'Please enter a valid email address';
      return;
    }

    // Validate password (at least 5 characters)
    if (this.loginData.password.length < 5) {
      this.passwordError = 'Password must be at least 5 characters';
      return;
    }

    // Display JSON output
    this.jsonOutput = JSON.stringify(this.loginData);

    // Save to localStorage if checkbox is checked
    if (this.saveLogin) {
      this.saveLoginInfo();
    } else {
      this.clearSavedLogin();
    }

    // Check if credentials are correct
    if (this.loginData.email === this.CORRECT_EMAIL && 
        this.loginData.password === this.CORRECT_PASSWORD) {
      alert('Login successful! Redirecting...');
      // Navigate to ex13 component
      this.router.navigate(['/ex13']);
    } else {
      this.jsonOutput = 'Invalid email or password. ' + this.jsonOutput;
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private saveLoginInfo(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.loginData));
    console.log('Login info saved to localStorage');
  }

  private loadSavedLogin(): void {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      try {
        this.loginData = JSON.parse(savedData);
        this.saveLogin = true;
        console.log('Login info loaded from localStorage');
      } catch (error) {
        console.error('Error loading saved login:', error);
      }
    }
  }

  private clearSavedLogin(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('Saved login info cleared');
  }
}
