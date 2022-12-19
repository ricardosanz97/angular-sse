import { Component, NgZone, OnInit } from '@angular/core';
import { SseService } from './services/sse.service';
import { map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Rxjs
  dataSubj: Subject<MessageEvent> = new Subject();
  data$: Observable<string> = this.dataSubj
    .asObservable()
    .pipe(map((event: MessageEvent) => event.data));

  constructor(
    private readonly sseService: SseService,
    private readonly zone: NgZone
  ) {}

  /**
   * We need NgZone to alert Angular when an event occurs because it happens outside of the framework
   */
  ngOnInit(): void {
    const eventSource: EventSource = this.sseService.getSse();
    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        this.dataSubj.next(event);
      });
    };
  }
}
