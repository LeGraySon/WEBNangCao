import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-style-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './style-filter.component.html',
  styleUrl: './style-filter.component.scss'
})
export class StyleFilterComponent {
  @Input() styles: string[] = [];
  @Input() selected = 'All';
  @Output() styleChange = new EventEmitter<string>();

  onSelect(value: string): void {
    this.styleChange.emit(value);
  }
}
