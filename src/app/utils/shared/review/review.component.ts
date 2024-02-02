import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { QualificationService } from 'src/app/utils/services/qualification.service';
import { activateNotifications } from 'src/app/utils/shared/notifications.function';
import { VideoPlayerComponent } from '../../../page/home/video-player/video-player.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Output() review = new EventEmitter();
  reviewForm = new FormGroup({
    type: new FormControl('0'),
    calification: new FormControl(0, [Validators.min(0), Validators.max(5)]),
  });
  idQualification: number = 0;
  qualification: number = 0;
  forChange: string = '0';
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
    studies: [],
    numberEpisodes: 0,
  };
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private loginService: LoginService,
    private animeService: AnimeService,
    private qualificationService: QualificationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      this.idQualification = this.data;
      this.getAndSetAnimeByUser();
    } else {
      this.getAnime();
    }

    this.user = this.loginService.getUser();
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

          console.log(qualification);

          this.reviewForm.patchValue({
            type: qualification.type.toString(),
            calification: qualification.qualification,
          });
          this.setQualification(qualification.qualification);
        } else {
          this.reviewForm.patchValue({
            type: '0',
            calification: 0,
          });
          this.setQualification(0);
        }
        this.loading = true;
      });
  }

  setQualification(val: any) {
    this.qualification = val;
  }

  getAnime() {
    this.animeService.getAnimeWithOutReview().subscribe((response: any) => {
      console.log(response);

      if (!response) {
        alert('No hay más animes para calificar');
      }
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
      type: this.reviewForm.value.type ?? '0',
      qualification: this.reviewForm.value.calification ?? 0,
    };

    console.log(review);

    if (this.data) {
      console.log('update');

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
    } else {
      console.log('create');

      this.qualificationService.post(review).subscribe((response: any) => {
        if (response) {
          activateNotifications(
            response.message,
            'right',
            'top',
            this._snackBar
          );
          this.reviewForm.reset();
          this.reviewForm.patchValue({
            type: '0',
            calification: 0,
          });
          this.setQualification(0);
          this.loading = false;
          this.getAnime();
        }
      });
    }
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  watchAnime(id: number) {
    this.dialog.closeAll();
    this.dialog.open(VideoPlayerComponent, {
      data: id,
    });
  }
}
