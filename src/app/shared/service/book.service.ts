import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Book} from "../models/book";
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookService {

  controller = "/book";

  constructor(protected _httpClient: HttpClient) {

  }

  findAll(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/find-one/ + id')
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/find-one-available/ + id')
      .catch(err => Observable.throw(err));
  }

  save(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/save', JSON.stringify(book))
      .catch(err => Observable.throw(err));
  }

  update(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/update', JSON.stringify(book))
      .catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }


  /**
   * pay
   * @param {Book} book
   * @returns {Observable<Book>}
   */
  pay(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/pay', JSON.stringify(book))
      .catch(err => Observable.throw(err));
  }

}
