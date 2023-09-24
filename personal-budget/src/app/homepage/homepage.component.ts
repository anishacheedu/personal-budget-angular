import { AfterViewInit, Component  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource={
    datasets:[
        {
            data:[30,350,90],
            backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19'
                ],
        }
    ],
    labels:[
        'Eat out',
        'Rent',
        'Groceries',
    ]
};
private data: any[] = [
  { Stars: 5, Framework: 'Eat out' },
  { Stars: 4, Framework: 'Rent' },
  { Stars: 3, Framework: 'Groceries' }
];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors : any;


  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res:any) => {
    for(var i=0;i<res.myBudget.length;i++){
        this.dataSource.datasets[0].data[i]=res.myBudget[i].budget;
        this.dataSource.labels[i]=res.myBudget[i].title;
    }
    this.createChart();


  });
}
  createChart(){
      var ctx = document.getElementById('myChart') as HTMLCanvasElement;
      var myPieChart = new Chart(ctx,{
          type:'pie',
          data:this.dataSource,
      });
    }

}
