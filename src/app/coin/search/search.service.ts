import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SearchOption } from './searchOption';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private SERVER_URL = 'http://localhost:4001/coins/';

  constructor(private http: HttpClient) {}

  private selectedOption = new BehaviorSubject<SearchOption>({
    id: null,
    name: null,
    price: null
  });

  private selectedOptions = new BehaviorSubject<SearchOption[]>([]);

  option$ = this.selectedOption.asObservable();
  options$ = this.selectedOptions.asObservable();

  isOptionEmpty$: Observable<boolean>;

  isOptionsEmpty$: Observable<boolean>;

  search(q: string): Observable<SearchOption[]> {
    return this.http.get<SearchOption[]>(
      this.SERVER_URL + 'search?name=' + q
    );
  }

  updateSelectedOption(option: SearchOption) {
    this.selectedOption.next(option);
  }

  updateSelectedOptions(options: SearchOption[]) {
    this.selectedOptions.next(options);
  }
}
