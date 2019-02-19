import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item: any;

  change(){
    console.log(this.item.rotate);
    this.item.rotate = !this.item.rotate;
  }

  constructor() { }

  ngOnInit() {
  }

}
