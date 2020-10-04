import { Injectable } from '@angular/core';
import { Position } from './position';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getPosition()
  {
    return this.http.get<Position[]>("https://desolate-sierra-97521.herokuapp.com/positions");
  }
}
