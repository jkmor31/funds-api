import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from './fund.model';


@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  fund: Fund = {};
  tempFundList: any[][] = [];
  key:any;

  constructor(
    private route:ActivatedRoute, 
    private fundService: FundService, 
    private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        this.fund = payload;
        for(const [key, value] of Object.entries(this.fund)){
          const localArray = [key, value, false];
          this.tempFundList.push(localArray);
        }
      })
    })
  }

  deleteFund():void {
    this.fundService.deleteFund(this.fund.id).subscribe();
    alert("This fund has been deleted");
    this.router.navigateByUrl("/funds");
  }
  edit():void {
    this.reconstituteFund();
    this.fundService.updateFund(this.fund).subscribe(data=>{
      if(data) {
        this.router.navigateByUrl("/funds");
      }
    })
  }
  
  
  reconstituteFund():void {
    const reconstitutedFund: any = {};
    this.tempFundList.forEach(item =>{
      reconstitutedFund[item[0]] = item[1];
    })
    this.fund = reconstitutedFund;
  }

  makeEditable(index:number): void {
    this.tempFundList[index][2] = true;
  }

  makeStatic(index: number): void {
    this.tempFundList[index][2] = false;
  }
}
