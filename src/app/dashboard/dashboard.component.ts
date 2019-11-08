import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {
  BarChartConfigs,
  Chart,
  ChartComponent,
  ChartTypes,
  dateBetweenQuery,
  Field,
  GridData,
  QueryBuilder,
  QueryService,
  SubscribeTypes,
} from 'eediom-sdk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartComponent: ChartComponent;
  // filter
  query: string;
  from: Date = new Date();
  to: Date = new Date();
  // /filter

  count: number;
  gridData: GridData;
  records: any[];

  chart: Chart;
  isChartRender = false;

  constructor(private queryService: QueryService, private ngZone: NgZone) {
    this.from.setMonth(this.from.getMonth() - 1);
  }

  ngOnInit() {
    const chartConfigs = new BarChartConfigs(new Field('_time', 'date'), [new Field('users', 'long')], false);

    this.chart = new Chart(ChartTypes.Bar, chartConfigs);
    this.chartComponent.render(null, this.chart);
  }

  onRender(): void {
    this.isChartRender = true;
  }

  chartUpdate(): void {
    this.chartComponent.update(this.chart, this.records);
  }

  onSearch(): void {
    const queryBuilder = new QueryBuilder(this.query);
    queryBuilder.pipe(dateBetweenQuery(this.from, this.to));

    this.queryService.query(queryBuilder.filteredQuery, (queryId, subscribeData) => {
      if (subscribeData.type === SubscribeTypes.Eof) {
        this.ngZone.run(async () => {
          const queryResult = await this.queryService.getResult(queryId, 100, 0);
          this.records = queryResult.records;
          this.count = queryResult.count;
          this.gridData = new GridData({
            records: this.records,
            fieldTypes: queryResult.fieldTypes,
          });
        });
      }
    });
  }
}
