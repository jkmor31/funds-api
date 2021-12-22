import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from '../fund/fund.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  newFund: Fund = {
    manager: '',
    name: '',
    birthdate: '',
    balance: 0,
    interest: 0,
    term: 0,
    tax: 0,
    fees: 0,
    id: 0
  }
  constructor(    
    private route:ActivatedRoute, 
    private fundService: FundService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  createFund(): void {
    this.fundService.createFund(this.newFund).subscribe(data => {
      if(data) {
        this.router.navigateByUrl("/funds");
    }});
  }
}
