import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from '../fund/fund.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  fund: Fund = {};

  constructor(
    private route:ActivatedRoute, 
    private fundService: FundService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log(payload);
        this.fund = payload;
      })
    })
  }
  updateFund():void {
    this.fundService.updateFund(this.fund).subscribe(data => {
      if(data) {
        this.router.navigateByUrl("/funds");
    }});
  }

}
