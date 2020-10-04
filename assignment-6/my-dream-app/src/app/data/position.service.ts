import { Injectable } from '@angular/core';
import { Position } from './position';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  url ="https://radiant-hamlet-69787.herokuapp.com";

  constructor(private http: HttpClient) { }

  getPosition()
  {
    return this.http.get<Position[]>(`${this.url}/positions`);
  }


  savePosition(position: Position)
  {
    return this.http.put<any>(`${this.url}/position/`+ position._id, position)
  }

  getPositionId(id): Observable<Position[]>
  {
    return this.http.get<Position[]>(`${this.url}/position/${id}`)
  }
}
