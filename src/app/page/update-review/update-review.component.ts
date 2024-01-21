import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { QualificationService } from 'src/app/utils/services/qualification.service';
import { activateNotifications } from 'src/app/utils/shared/notifications.function';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css'],
})
export class UpdateReviewComponent implements OnInit {
  idQualification: number = 0;
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
    private qualificationService: QualificationService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private animeService: AnimeService,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.idQualification = this.data;
    this.user = this.loginService.getUser();
    this.getAndSetAnimeByUser();
  }

  setQualification(val: any) {
    this.qualification = val;
  }

  getAndSetAnimeByUser() {
    let val = {
      animeId: this.idQualification,
    };

    this.animeService
      .getQualificationAndAnimeByUser(val)
      .subscribe((response: any) => {
        console.log(response);
        if (!response) {
          activateNotifications(
            'No se encontró la calificación',
            'right',
            'top',
            this._snackBar
          );
          this.dialog.closeAll();
        }

        this.anime = response;

        if (response.qualification) {
          const qualification = response.qualification[0];

          this.reviewForm.patchValue({
            review: qualification.reviewed,
            calification: qualification.qualification,
          });
          this.setQualification(qualification.qualification);
        } else {
          this.reviewForm.patchValue({
            review: false,
            calification: 0,
          });
          this.setQualification(0);
        }
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
      qualification: this.reviewForm.value.calification ?? 0,
    };

    console.log(review);

    this.qualificationService
      .update(this.idQualification, review)
      .subscribe((response: any) => {
        if (response) {
          activateNotifications(
            response.message,
            'right',
            'top',
            this._snackBar
          );
          this.dialog.closeAll();
        }
      });
  }
}
