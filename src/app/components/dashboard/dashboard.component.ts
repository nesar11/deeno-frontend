import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { AdunitService } from 'src/app/service/adunit.service';
import { CoinService } from 'src/app/service/coin.service';
import { StudentService } from 'src/app/service/student.service';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  notify: string;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // General variables
  coins = [];
  adunits = [];
  students = [];

  // Chart variables
  myBarChart = new Chart('myChart', {});
  adBarChart = new Chart('adChart', {});
  stBarChart = new Chart('stChart', {});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cs: CoinService,
    private ss: StudentService,
    private ads: AdunitService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });

    this.initCoins();
    this.initAdUnit();
    this.initStudents();
  }

  async initCoins() {
    await this.getCoin('')
      .then((data) => {
        let x = [];
        let y = [];

        this.coins = data;

        this.coins.forEach((coin) => {
          x.push(coin.name);
          y.push(coin.price);
        });

        this.chartFunction(x, y);
      })
      .catch((err) => {
        // Error message
      });
  }

  async initAdUnit() {
    await this.getAdunit()
      .then((data) => {
        let x = [];
        let y = [];

        this.adunits = data;

        this.adunits.forEach((adUni) => {
          x.push(adUni.unit_name);
          y.push(adUni.avarageAdUnitPrice);
        });

        this.aDchartFunction(x, y);
      })
      .catch((err) => {
        // Error message
      });
  }

  async initStudents() {
    await this.getStudnet()
      .then((data) => {
        let x = [];
        let y1 = [];
        let y2 = [];
        let y3 = [];
        let y4 = [];

        console.log(data);
        this.students = data;

        this.students.forEach((sTudent) => {
          x.push(sTudent._id.Student_name);
          y1.push(sTudent.semester_1);
          y2.push(sTudent.semester_2);
          y3.push(sTudent.semester_3);
          y4.push(sTudent.semester_4);
        });
        console.log('x', x);
        console.log('y', y1);
        // this.aDchartFunction(x, y1);
        this.sTchartFunction(x, y1, y2, y3, y4);
      })
      .catch((err) => {
        // Error message
      });
  }

  chartFunction(x, y) {
    this.myBarChart.data.datasets.pop();

    this.myBarChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Number of Coins',
            data: y,
            backgroundColor: [
              'rgba(255, 99, 132, 3)',
              'rgba(54, 162, 235, 3)',
              'rgba(255, 206, 86, 3)',
              'rgba(75, 192, 192, 3)',
              'rgba(153, 102, 255, 3)',
              'rgba(255, 159, 64, 3)',
            ],
            borderColor: [],
            borderWidth: 10,
          },
        ],
        labels: x,
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              // console.log(tooltipItem, data);
              return `RM${parseFloat(tooltipItem.value).toLocaleString()}`;
            },
          },
        },
      },
    });
  }
  aDchartFunction(x, y) {
    this.adBarChart.data.datasets.pop();

    this.adBarChart = new Chart('barChart', {
      type: 'pie',
      data: {
        datasets: [
          {
            label: 'Number of Adunits',
            data: y,
            backgroundColor: [
              'rgba(255, 99, 132, 3)',
              'rgba(54, 162, 235, 3)',
              'rgba(255, 206, 86, 3)',
              'rgba(75, 192, 192, 3)',
              'rgba(153, 102, 255, 3)',
              'rgba(255, 159, 64, 3)',
            ],
            borderColor: [],
            borderWidth: 10,
          },
        ],
        labels: x,
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  }
  sTchartFunction(x, y1, y2, y3, y4) {
    console.log(x, y1, y2, y3, y4);
    // console.log(x);
    // console.log(y);
    this.stBarChart.data.datasets.pop();

    this.stBarChart = new Chart('stBarChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Semester 1',
            data: y1,
            backgroundColor: [
              'rgba(255, 99, 132, 3)',
              // 'rgba(54, 162, 235, 3)',
              // 'rgba(255, 206, 86, 3)',
              // 'rgba(75, 192, 192, 3)',
              // 'rgba(153, 102, 255, 3)',
              // 'rgba(255, 159, 64, 3)',
            ],
            borderColor: [],
            borderWidth: 10,
          },
          {
            label: 'Semester 2',
            data: y2,
            backgroundColor: [
              //  'rgba(255, 99, 132, 3)',
              'rgba(54, 162, 235, 3)',
              // 'rgba(153, 102, 255, 3)',
              //  'rgba(255, 206, 86, 3)',
              // 'rgba(75, 192, 192, 3)',

              // 'rgba(255, 159, 64, 3)',
            ],
            borderColor: [],
            borderWidth: 10,
          },
          {
            label: 'Semester 3',
            data: y3,
            backgroundColor: [
              // 'rgba(153, 102, 255, 3)',
              //  'rgba(255, 99, 132, 3)',
              //  'rgba(54, 162, 235, 3)',
              'rgba(255, 206, 86, 3)',
              'rgba(75, 192, 192, 3)',
                            // 'rgba(255, 159, 64, 3)',
            ],
            borderColor: [],
            borderWidth: 10,
          },
          {
            label: 'Semester 4',
            data: y4,
            backgroundColor: [
               'rgba(255, 99, 132, 3)',
               'rgba(255, 159, 64, 3)',
              'rgba(54, 162, 235, 3)',
               'rgba(255, 206, 86, 3)',
              'rgba(75, 192, 192, 3)',
               'rgba(153, 102, 255, 3)',

            ],
            borderColor: [],
            borderWidth: 10,
          },
        ],
        labels: x,
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }

  // API Functions coins
  getCoin(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cs.getCoins(query).subscribe(
        (response) => {
          if (response) {
            resolve(response);
          }
        },
        (err) => {
          if (err) {
            reject(err);
          }
        }
      );
    });
  }

  // API Functions
  getAdunit(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ads.maxAdunit().subscribe(
        (response) => {
          if (response) {
            resolve(response);
          }
        },
        (err) => {
          if (err) {
            reject(err);
          }
        }
      );
    });
  }

  // API Functions
  getStudnet(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ss.maxStudent().subscribe(
        (response) => {
          if (response) {
            resolve(response);
          }
        },
        (err) => {
          if (err) {
            reject(err);
          }
        }
      );
    });
  }

// pdf downlaod

onDownloadPdf() {
  const element = document.getElementById('export-pdf');
  var date = moment().toDate();
  if (element) {
      html2canvas(element, {
          scale: 4
      }).then(canvas => {
          console.log(canvas);
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;
          var pageHeight = contentWidth / 595.28 * 841.89;
          var leftHeight = contentHeight;
          var position = 0;
          var imgWidth = 595.28;
          var imgHeight = 595.28 / contentWidth * contentHeight;
          var pageData = canvas.toDataURL('image/jpeg', 1.0);
          var pdf = new jsPDF('p', 'pt', 'a4');
          if (leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
          } else {
              while (leftHeight > 0) {
                  pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                  leftHeight -= pageHeight;
                  position -= 841.89;
                  if (leftHeight > 0) {
                      pdf.addPage()
                  }
              }
          }
          pdf.setFont("arial");
          pdf.setFontSize(10);
          pdf.text(`Note: This is system generated form and does not require signature`, 10, 835);
          pdf.save('Report' + '-' + date);
      });
  }
}




}
