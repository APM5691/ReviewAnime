import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class WebsocketsService {
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private user: User | null = null;
  private _chat$ = new BehaviorSubject<ChatType[]>([]);
  public chat$ = this._chat$.asObservable();
  private _room$ = new BehaviorSubject<string | null>(null);

  constructor(private loginService: LoginService, private socket: Socket) {
    socket.fromEvent('new_message').subscribe((object: any) => {
      const chatObject: ChatType = {
        user: object.user,
        message: object.message,
      };

      this.setChat(chatObject);
    });

    socket.fromEvent('disconnect').subscribe(() => {
      const lastRoom = this._room$.getValue();
      if (lastRoom) this.joinRoom(lastRoom);
    });
  }

  public setUserForUsers(): void {
    this.user = this.loginService.getUser();
    this.socket.emit('event_users', { userId: this.user?.id });
    if (this.user) {
      this.users$.next([this.user]);
    }
  }

  public setChat(message: ChatType): void {
    const current = this._chat$.getValue();
    const state = [...current, message];
    this._chat$.next(state);
  }

  public initChat(): void {
    this._chat$.next([]);
  }

  //TODO Enviar mensaje desde el FRONT-> BACKEND
  sendMessage(payload: { message: string; room?: string; userId?: any }) {
    const roomCurrent = this._room$.getValue(); //TODO: js, ts, node
    if (roomCurrent) {
      payload = { ...payload, room: roomCurrent, userId: this.user?.id };
      this.socket.emit('event_message', payload); //TODO FRONT
    }
  }

  joinRoom(room: string): void {
    this._room$.next(room);
    this.socket.emit('event_join', room);
  }

  leaveRoom(): void {
    const room = this._room$.getValue();
    this.socket.emit('event_leave', { room, userId: this.user?.id });
  }

  initUsers(): void {
    this.socket.fromEvent('users').subscribe((object: any) => {
      console.log(object);

      this.users$.next(object);
    });
  }
}

interface ChatType {
  user: User;
  message: string;
}
