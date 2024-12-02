import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HttpRawLoaderService {
  private httpClient = inject(HttpClient);

  /**
   * Get the content of a file as a string
   * @param url - The URL of the file to get
   */
  get(url: string): Observable<string> {
    return this.httpClient
      .get(url, {responseType: 'text'})
      .pipe(share());
  }
}
