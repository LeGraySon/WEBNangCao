import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fashion-detail.component.html',
  styleUrl: './fashion-detail.component.scss'
})
export class FashionDetailComponent implements OnInit {
  fashion?: Fashion;

  constructor(private route: ActivatedRoute, private fashionService: FashionService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.fashionService.getById(id).subscribe((data) => {
      this.fashion = data;
    });
  }
}
