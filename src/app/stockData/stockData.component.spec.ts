import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {StockData} from './stockData.component';
import {Type} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('StocksData', () => {
  let component: StockData;
  let fixture: ComponentFixture<StockData>;
  let compiled;
  let appInput;
  let submitButton;
  let stockData;
  let noResult;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const pushValue = async (value) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    await submitButton.click();
    await fixture.whenStable();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
          FormsModule
        ],
        declarations: [StockData]
      })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(StockData);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    injector = getTestBed();
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    component = fixture.componentInstance;
    await fixture.detectChanges();
    appInput = getByTestId('app-input');
    submitButton = getByTestId('submit-button');
    stockData = getByTestId('stock-data');
    noResult = getByTestId('no-result');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`Initial UI is rendered as expected`, async () => {
    await fixture.whenStable();
    expect(appInput.textContent.trim()).toBe('');
    expect(submitButton.textContent.trim()).toBe('Search');
    expect(stockData).toBeNull();
    expect(noResult).toBeNull();
  });

  it('search is made on by clicking on search button and no results found', async(done) => {
    await pushValue('1-January-2020');
    await fixture.detectChanges();
    await fixture.whenStable();

    const url = 'https://jsonmock.hackerrank.com/api/stocks?date=1-January-2020';
    let req = httpMock.expectOne(url);
    req.flush({ page:1,per_page:10,total:0,total_pages:0,data:[]});
    expect(req.request.url).toBe(url);

    await fixture.detectChanges();
    await fixture.whenStable();

    expect(getByTestId('stock-data')).toBeNull();
    expect(getByTestId('no-result')).toBeTruthy();
    expect(getByTestId('no-result').innerHTML).toEqual('No Results Found');
    done();
  });

  it('search is made on by clicking on search button and result found - test 1', async(done) => {
    await pushValue('5-January-2000');
    await fixture.whenStable();

    const url = 'https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000';
    let req = httpMock.expectOne(url);
    req.flush({
      page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
      data: [{
          "date": "5-January-2000",
          "open": 5265.09,
          "high": 5464.35,
          "low": 5184.48,
          "close": 5357
      }]
    });
    expect(req.request.url).toBe(url);

    await fixture.detectChanges();
    await fixture.whenStable();

    const results = getByTestId('stock-data');
    expect(results).toBeTruthy();
    expect(results.childNodes.length).toEqual(4);
    expect(results.childNodes[0].innerHTML).toEqual('Open: 5265.09');
    expect(results.childNodes[1].innerHTML).toEqual('Close: 5357');
    expect(results.childNodes[2].innerHTML).toEqual('High: 5464.35');
    expect(results.childNodes[3].innerHTML).toEqual('Low: 5184.48');
    expect(getByTestId('no-result')).toBeNull();
    done();
  });

  it('search is made on by clicking on search button and result found - test 2', async(done) => {
    await pushValue('5-January-2001');
    await fixture.whenStable();

    const url = 'https://jsonmock.hackerrank.com/api/stocks?date=5-January-2001';
    let req = httpMock.expectOne(url);
    req.flush({
      page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
      data: [{
          "date": "5-January-2001",
          "open": 4116.34,
          "high": 4195.01,
          "low": 4115.35,
          "close": 4183.73
      }]
    });
    expect(req.request.url).toBe(url);

    await fixture.detectChanges();
    await fixture.whenStable();

    const results = getByTestId('stock-data');
    expect(results).toBeTruthy();
    expect(results.childNodes.length).toEqual(4);
    expect(results.childNodes[0].innerHTML).toEqual('Open: 4116.34');
    expect(results.childNodes[1].innerHTML).toEqual('Close: 4183.73');
    expect(results.childNodes[2].innerHTML).toEqual('High: 4195.01');
    expect(results.childNodes[3].innerHTML).toEqual('Low: 4115.35');
    expect(getByTestId('no-result')).toBeNull();
    done();
  });
});
