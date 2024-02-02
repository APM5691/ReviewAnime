import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/utils/services/login.service';
import { WebsocketsService } from 'src/app/utils/services/websockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Output() sendM = new EventEmitter<string>();
  messages: any = this.websocketsService.chat$;
  formMessage = new FormGroup({
    message: new FormControl(''),
  });

  constructor(
    private websocketsService: WebsocketsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  sendMessage() {
    let message = this.formMessage.value.message;

    if (message != null) {
      this.sendM.emit(message);
      this.formMessage.reset();
    }
  }
}
