import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { Transport } from 'src/app/utilitaries/transport-enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() id : any;
  @Input() picture : string;
  @Input() label : string;
  @Input() size : number;

  @Input() selectedTransport;

  @Output() transportSelected = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }

  selectTransport() {
    this.transportSelected.emit(this.id);
  }

}
