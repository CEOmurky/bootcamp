# Bootcamp

## 사전 준비

- @angular/cli 설치
- eediom-sdk 설치
- material-cdk 설치

### eediom-sdk 설치

```
$ yarn add https://github.com/logpresso/eediom-sdk.git#v1.0.5: eediom에서 만든 sdk를 설치
```

### material-cdk 설치

```
material-cdk
$ yarn global add @angular/cli: angular-cli를 설치

$ ng add @angular/material: material-cdk를 설치

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink: 원하는 테마를 선택
? Set up HammerJS for gesture recognition?:  제스처 라이브러리 / YES or NO 둘다 괜찮음
? Set up browser animations for Angular Material?: 머터리얼에 에니메이션을 추가할 수 있는데 그 기능에 대한 물음 / YES or NO 둘다 괜찮음
```

저는 위의 환경을 아래와 같이 설치 했습니다.

- 기본 테마
- HammerJS 설치
- Animation module 설치

```
Installed packages for tooling via npm.
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.
io?theme=indigo-pink ]
? Set up HammerJS for gesture recognition? Yes
? Set up browser animations for Angular Material? Yes
```

설치 이후 이 문구가 뜨면 정상적으로 설치된 것입니다.

```
UPDATE src/main.ts (391 bytes)
UPDATE src/app/app.module.ts (502 bytes)
UPDATE angular.json (3864 bytes)
UPDATE src/index.html (488 bytes)
UPDATE src/styles.less (181 bytes)
```

위의 파일이 material-cdk에 의해 변경되었다는 것을 의미합니다.

## 결과물

쿼리리 결과를 차트, 그리드로 보여주고 전역 필터를 통해 데이터를 필터링 합니다. -> 마지막 브렌치에서 확인

### 쿼리

요청 -> 응답이 아닌
생성 -> 상태 확인 -> 특정 상태 -> 결과 요청으로 이루어져 있습니다.

쿼리를 만들고 데이터를 가져오기 위해서 위의 과정을 다시 설명 해 보겠습니다.

createQuery: 쿼리문에 맞춰 쿼리를 생성 - 생성 이후 id를 보내줍니다.
subscribe: 위의 생성한 쿼리의 상태를 구독합니다. - [callback](#callback)으로 query의 상태를 알려줍니다.

#### callback<a name="callback"></a>

쿼리의 상태를 변하는 것을 해당 callback으로 관리 할 수 있습니다.

예)

```typescript
query('table_sys_cpu_logs', (queryId, [subscribeData](#subscribeData)) => {
	console.log({subscribeData, queryId});
	/// output

	// 첫번째 output
	{
		queryId: 1,
		subscribeData: {
			count: 100
			id: 1
			stamp: 4
			status: SubscribeStatuses.Running
			type: SubscribeTypes.StatusChange
		}
	}

	// 두번째 output
	{
		queryId: 1,
		subscribeData: {
			count: 2000
			id: 1
			stamp: 5
			type: SubscribeTypes.Eof
			cancelReason: null
		}
	}
})
```

위의 output 에서 확일 할 수 있듯 상태를 관찰 할 수 있습니다.

#### subscribeData <a name="subscribeData"></a>

| 상태         | 타입                                     | 설명                                                      |
| ------------ | ---------------------------------------- | --------------------------------------------------------- |
| count        | number                                   | 위에서 생성한 쿼리가 몇개의 데이터를 읽었는지 알려줍니다. |
| id           | number                                   | 쿼리 id 입니다.                                           |
| stamp        | number                                   | 해당 콜백의 순서입니다.                                   |
| type         | enum - [SubscribeTypes](#SubscribeTypes) | 해당 콜백의 타입을 알려줍니다.                            |
| cancelReason | string                                   | 취소한 사유를 알려줍니다.                                 |

#### SubscribeTypes <a name="SubscribeTypes"></a>

| 이름         | 값              | 설명                                              |
| ------------ | --------------- | ------------------------------------------------- |
| StatusChange | 'status_change' | 해당 쿼리의 상태가 변경되었다는 것을 알려줍니다.  |
| Eof          | 'eof'           | 모든 쿼리를 읽고 장업이 끝났다는 것을 알려줍니다. |

### 새로운 컴포넌트 생성

우리가 작업할 dashboard 컴포넌트가 필요합니다. 새로운 컴포넌트를 모듈로 나눠서 만들어보겠습니다.

`ng g m dashboard && ng g c dashboard` app의 dashboard라는 모듈을 만듭니다 그리고 해당 폴더 안에 dashboard 컴포넌트를 만듭니다.

그리고 dashboard.component로 가서 아래의 프로퍼티를 만들어 줍니다.

```typescript
  query?: string; // 워본 쿼리
  queryResult: QueryResult; // 쿼리 결과 저장용도
```

위의 클래스는 records는 어떤 타입이라도 어레이 형태가 될 수 있기 때문에 제네릭 형태로 받습니다. 만약 사용자가 제네릭 타입을 넘기지 않으면 타입은 any가 되는 코드입니다.

그리고 앞에서 console.log()로 찍었던 query 결과를 이 queryResult에 담아서 가지고 있을 겁니다.

## Style 붙여넣기

그리고 아래의 스타일을 dashboard.component.less에 붙여 넣어주세요 단순히 영역을 나누기 위해서 만들었습니다.

```less
.container {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  box-sizing: border-box;

  .grid-container,
  .chart-container {
    width: 100%;
    height: 40%;

    border: 1px solid orange;
    box-sizing: border-box;
  }
}
```

## Html 미리 만들어놓기

그리고 컨테이너 별로 간단하게 나누기 위해서 아래의 html 코드를 dashboard.component.html에 붙여 주세요

```html
<div class="container">
  <div class="grid-container">
    grid
    <!-- 이곳에 그리드가 생깁니다. -->
  </div>
  <div class="chart-container">
    chart
    <!-- 이곳에 차트가 생깁니다.-->
  </div>
  <div class="filter-container">
    filter
    <!-- 이곳에 filter가 생깁니다. -->
  </div>
</div>
```

## TODO:// dashboard 라우터에 붙이기

## 쿼리 결과를 Dashboar에 담기 (이 부분은 형태님 query 보고 할것)

## Grid

그리드 컴포넌트는 eedim-sdk에 정의되어 있습니다. 설명은 [그리드 미리보기](https://logpresso.github.io/eediom-sdk/?path=/story/grid-%EA%B7%B8%EB%A6%AC%EB%93%9C--plain) 를 통해 보실 수 있고 notes를 사용법과 프로퍼티 등을 알 수 있습니다.

### gridModule import

eediom-sdk의 모듈을 각자 분리되어 있기 때문에 원하는 모듈을 사용하기 위해서는 `module` import 하는 과정이 필요합니다.

`dashboard.module.ts`로 이동합니다.

최 상단에 그리드 모듈을 import 합니다.

`import { GridModule } from 'eediom-sdk';`

### 모듈 사용 등록

위에서 import한 그리드 모듈을 사용 등록합니다. 기존에 기본으로 사용중인 모듈들 뒤에 gridModule을 추가 해주세요

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, GridModule],
  providers: [],
  bootstrap: [AppComponent],
})
```

이것으로 grid의 사용준비는 끝났습니다.

### 사용하기

```
<div class="grid-container">
	<edm-grid></edm-grid>
</div>
```

위의

### 데이터 넣기

그리드를 보여주기 위헤서는 gridData 형태로 쿼리에서 받았던 데이터를 가공해야 보여줄 수 있습니다.

queryResult의 records와 fieldTypes를 사용해보겠습니다.

```typescript
	ngOnInit(){
		this.gridData = new GridData({
		  records: this.queryResult.records,
		  fieldTypes: this.queryResult.fieldTypes,
		});
	}
```

```html
<edm-grid [gridData]="gridData" [pageSize]="100" [currentPage]="1" [totalItems]="queryResult.count"></edm-grid>
```

- gridData를 넘겨 주었습니다.
- pageSize(쿼리의 limit의 양)을 넘겨 주었습니다.
- currentPage 현재 페이지를 넘겨주었습니다.
- totalItems로 queryResult 결과 값의 count를 넘겨 주었습니다.

(Q,A) 왜 아이콘은 동작 안하는지?

- font-awesome을 styles에 추가 하지 않아서 그렇습니다.

## Chart

### chart import

grid와 동일하게 chart-module을 import 합니다.

`import { GridModule, ChartModule } from 'eediom-sdk';`

그리고 동일하게 imports에 추가 합니다.

```typescript
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, GridModule, ChartModule],
})
```

### 사용하기

```html
<div class="chart-container">
  <edm-chart #chart (chartRendered)="onRender()"></edm-chart>
</div>
```

차트에 ViewChild로 접근하기 위해서 #chart를 그리고 render여부를 감지 하기 위해서 event로 onRender를 묶어줍니다.

### 렌더링 하기

```typescript
// dashboard.component.ts
@ViewChild('chart', { static: true }) chartComponent: ChartComponent;

ngOnInit() {
	//..위에서 작업한 grid는 생략
    const chartConfigs: BarChartConfigs = new BarChartConfigs(
      new Field('_time', 'date', '날짜'),
      [new Field('_cd', 'long')],
      false,
    );

    this.chart = new Chart(ChartTypes.Bar, chartConfigs);
	this.chartComponent.render(null, this.chart);
}

위의 까지 했다면 차트에서 데이터가 없다고 알릴 것 입니다.

// 중간 코드 생략
onRender(): void {
	console.log('onChart');
}
```

이제 차트 데이터를 update 하는 코드를 만들어 보겠습니다.

## 필터

QueryBuilder가 준비되어 있습니다.

우선 시간의 범위를 결정하기 위해서 dateTimePicker를 import하겠습니다.

### import

```typescript
import { GridModule, ChartModule, DatetimePickerModule } from 'eediom-sdk';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, GridModule, ChartModule, DatetimePickerModule],
})
```

### from, to를 변수로 추가, template 등록

```typescript
// filter
from: Date = new Date();
to: Date = new Date();
// /filter
```

```html
<edm-datetime-picker [(ngModel)]="from"></edm-datetime-picker>
~
<edm-datetime-picker [(ngModel)]="to"></edm-datetime-picker>
```

timepicker를 가져왔습니다.

> diretion 없이 -> 디렉션 추가

### error

```html
compiler.js:2175 Uncaught Error: Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'edm-datetime-picker'.
1. If 'edm-datetime-picker' is an Angular component and it has 'ngModel' input, then verify that it is part of this module.
2. If 'edm-datetime-picker' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("
	</div>
	<div class="filter-container">
		<edm-datetime-picker direction="top" [ERROR ->][(ngModel)]="from"></edm-datetime-picker>
		~
		<edm-datetime-picker direction="top" [(ngModel)]="to""): ng:///DashboardModule/DashboardComponent.html@8:39
Can't bind to 'ngModel' since it isn't a known property of 'edm-datetime-picker'.
1. If 'edm-datetime-picker' is an Angular component and it has 'ngModel' input, then verify that it is part of this module.
2. If 'edm-datetime-picker' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("irection="top" [(ngModel)]="from"></edm-datetime-picker>
		~
		<edm-datetime-picker direction="top" [ERROR ->][(ngModel)]="to"></edm-datetime-picker>
	</div>
</div>
```

> Q위의 에러는 왜 발생할까요?

- FormsModule을 추가 하지 않아서 그렇습니다.

### 그리고 필터를 통해 검색

```typescript
const queryBuilder = new QueryBuilder(this.query);
queryBuilder.pipe(dateBetweenQuery(this.from, this.to));

console.log(queryBuilder.buildQuery); // 빌드된 쿼리가 찍힙니다.
```

---
