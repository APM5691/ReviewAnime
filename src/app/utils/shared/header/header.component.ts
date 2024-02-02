import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { LoginService } from 'src/app/utils/services/login.service';
import { QualificationService } from 'src/app/utils/services/qualification.service';
import { UserService } from 'src/app/utils/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() OpenDialog = new EventEmitter<any>();
  numberOfAnimes: number = 0;
  animesReviewed: number = 0;
  percentage: number = 0;

  animesWatched: number = 0;
  percentajeWatched: number = 0;
  showFirstText: boolean = true;
  showSecondText: boolean = false;

  constructor(
    public loginService: LoginService,
    public qualificationService: QualificationService,
    public userService: UserService,
    public animeService: AnimeService,
    public router: Router
  ) {}

  ngOnInit() {
    this.showFirstText = true;
    this.showSecondText = false;

    this.getNumberOfAnimes();
  }

  showHiddenText() {
    this.showFirstText = false;
    this.showSecondText = true;
  }

  hideHiddenText() {
    this.showFirstText = true;
    this.showSecondText = false;
  }

  getNumberOfAnimes() {
    this.animeService.getNumberOfAnimes().subscribe((response: any) => {
      this.numberOfAnimes = response;
      this.getPercentage();
      this.getAnimesWatched();
    });
  }

  getPercentage() {
    this.qualificationService.getPercentage().subscribe((response: any) => {
      this.animesReviewed = response;
      let percentage = this.calculatePercentage(response);
      this.percentage = percentage;
    });
  }

  getAnimesWatched() {
    this.qualificationService.getAnimesWatched().subscribe((response: any) => {
      this.animesWatched = response;
      let percentage = this.calculatePercentage(response);
      this.percentajeWatched = percentage;
    });
  }

  calculatePercentage(number: number) {
    let percentage = number / this.numberOfAnimes;
    let temp = percentage * 100;
    let result = Math.ceil(temp);

    return result;
  }

  openDialog() {
    this.OpenDialog.emit();
  }

  closeSession() {
    this.loginService.removeToken();

    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/page/home']);
  }

  goToPendients() {
    this.router.navigate(['/page/pendients']);
  }

  goToWatch() {
    this.router.navigate(['/page/watchlist']);
  }
}
