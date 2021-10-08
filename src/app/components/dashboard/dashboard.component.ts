import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { AdunitService } from 'src/app/service/adunit.service';
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
  adunits= [];

  // Chart variables
  myBarChart = new Chart('myChart', {});
  adBarChart = new Chart('adChart', {});

  constructor(private router: Router,
    private route: ActivatedRoute,
     private cs: CoinService,
     private ads: AdunitService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });

    this.initCoins();
    this.initAdUnit();
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

  async initAdUnit() {
    await this.getAdunit().then(data => {
      let x = [];
      let y = [];

      this.adunits = data;
      console.log(this.adunits);

      this.adunits.forEach(adUni => {
        x.push(adUni._id);
        y.push(adUni.avarageAdUnitPrice);
      });

      this.aDchartFunction(x, y);
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
          data: y,
          backgroundColor: [
            'rgba(255, 99, 132, 3)',
            'rgba(54, 162, 235, 3)',
            'rgba(255, 206, 86, 3)',
            'rgba(75, 192, 192, 3)',
            'rgba(153, 102, 255, 3)',
            'rgba(255, 159, 64, 3)'
        ],
        borderColor: [


      ],
      borderWidth: 10
        }],
        labels: x
      },

      options: {
        maintainAspectRatio: false,
        responsive: true
      },

    })
  }
  aDchartFunction(x, y) {
    console.log(x)
    console.log(y)
    this.adBarChart.data.datasets.pop();

    this.adBarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Number of Adunits',
          data: y,
          backgroundColor: [
            'rgba(255, 99, 132, 3)',
            'rgba(54, 162, 235, 3)',
            'rgba(255, 206, 86, 3)',
            'rgba(75, 192, 192, 3)',
            'rgba(153, 102, 255, 3)',
            'rgba(255, 159, 64, 3)'
        ],
        borderColor: [


      ],
      borderWidth: 10
        }],
        labels: x
      },

      options: {
        maintainAspectRatio: false,
        responsive: true
      },

    })
  }

  // API Functions coins
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

  // API Functions
  getAdunit(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ads.maxAdunit()
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
