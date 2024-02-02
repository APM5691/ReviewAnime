import { Component, Input, OnInit } from '@angular/core';
import { WebsocketsService } from 'src/app/utils/services/websockets.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = this.websocketsService.users$;

  constructor(private websocketsService: WebsocketsService) {}

  ngOnInit() {}
}
