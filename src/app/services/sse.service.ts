import { Injectable } from '@angular/core';

const API_URL: string = 'http://localhost:3001';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor() {}

  getSse(): any {
    return new EventSource(`${API_URL}/sse`);
  }
}
