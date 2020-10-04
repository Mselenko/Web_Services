import { Component, OnInit } from '@angular/core';
import  {Position} from './../data/position';
import {PositionService} from './../data/position.service'


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions: Position[];
  getPositionsSub: any;
  loadingError:boolean = false;

  constructor(private e: PositionService) { }

  ngOnInit() 
  {
    try{
      this.getPositionsSub = this.e.getPosition().subscribe(positions =>this.positions = positions);

    }catch(error){
      this.loadingError =true;
      console.log(error);
    }
  }

  ngOnDestroy(){
    if(this.getPositionsSub)
    this.getPositionsSub.unsubscribe();
  }

}
