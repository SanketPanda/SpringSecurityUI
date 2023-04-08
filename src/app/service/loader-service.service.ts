import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  isLoading: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  constructor() { }
}
