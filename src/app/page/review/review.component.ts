import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { QualificationService } from 'src/app/utils/services/qualification.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Output() review = new EventEmitter();
  reviewForm = new FormGroup({
    review: new FormControl(false),
    calification: new FormControl(0, [Validators.min(0), Validators.max(5)]),
  });
  qualification: number = 0;
  loading: boolean = false;
  anime: Anime = {
    id: 0,
    name: '',
    description: '',
    image: '',
    url: '',
    alternativeNames: [],
    genres: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  user: any;

  constructor(
    private loginService: LoginService,
    private animeService: AnimeService,
    private qualificationService: QualificationService
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    this.getAnime();
  }

  setQualification(val: any) {
    this.qualification = val;
  }

  getAnime() {
    this.animeService.getAnimeWithOutReview().subscribe((response: any) => {
      if (!response) {
        alert('No hay más animes para calificar');
      }

      console.log(response);

      this.anime = response;

      this.loading = true;
    });
  }

  sendReview() {
    if (!this.reviewForm.valid) {
      alert('Calificación no válida');
      return;
    }

    const review = {
      animeId: this.anime.id,
      userId: this.user.id,
      reviewed: this.reviewForm.value.review ?? false,
      calification: this.reviewForm.value.calification ?? 0,
    };

    console.log(review);

    this.qualificationService.post(review).subscribe((response: any) => {
      if (response) {
        this.reviewForm.reset();
        this.loading = false;
        this.getAnime();
      }
    });
  }
}
