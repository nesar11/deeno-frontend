import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { CoinService } from 'src/app/service/coin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notify: string;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // General variables
  coins = [];

  // Chart variables
  myBarChart = new Chart('myChart', {});

  constructor(private router: Router, private route: ActivatedRoute, private cs: CoinService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });

    this.initCoins();
  }

  async initCoins() {
    await this.getCoin('').then(data => {
      let x = [];
      let y = [];

      this.coins = data;
      console.log(this.coins);

      this.coins.forEach(coin => {
        x.push(coin.name);
        y.push(coin.price);
      })

      this.chartFunction(x, y);
    }).catch(err => {
      // Error message
    });
  }

  chartFunction(x, y) {
    this.myBarChart.data.datasets.pop();

    this.myBarChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Number of Coins',
          data: y
        }],
        labels: x
      },

      options: {
        maintainAspectRatio: false,
        responsive: true
      },

    })
  }

  // API Functions
  getCoin(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cs.getCoins(query)
        .subscribe(response => {
          if (response) {
            resolve(response);
          }
        }, err => {
          if (err) {
            reject(err);
          }
        });
    });
  }
}
