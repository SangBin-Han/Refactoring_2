/**
 * 6.8 매개변수 객체 만들기(Introduce Parameter Object)
 * 
 * function amountInvoiced(startDate, endDate) {...}
 * function amountReceived(startDate, endDate) {...}
 * function amountOverdue(startDate, endDate) {...}
 * 
 * --------------- Refactoring ------------------
 * 
 * function amountInvoiced(aDateRange) {...}
 * function amountReceived(aDateRange) {...}
 * function amountOverdue(aDateRange) {...}
 * 
 * 절차
 * 1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
 * -> 개인적으로 클래스로 만드는 걸 선호한다. 나중에 동작까지 함께 묶기 좋기 때문이다. 나는 주로 데이터 구조를 값 객체(Value Object)로 만든다.
 * 2. 테스트한다.
 * 3. 함수 선언 바꾸기(6.5절)로 새 데이터 구조를 매개변수로 추가한다.
 * 4. 테스트한다.
 * 5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 때마다 테스트한다.
 * 6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
 * 7. 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.
 */

const station = { 
  name: "ZB1",
  readings: [
    {temp: 47, time: "2016-11-10 09:10"},
    {temp: 53, time: "2016-11-10 09:20"},
    {temp: 58, time: "2016-11-10 09:30"},
    {temp: 53, time: "2016-11-10 09:40"},
    {temp: 51, time: "2016-11-10 09:50"},
  ]
}

function ex1() {
  function readingsOutsideRange(station, min, max) {
    return station.readings
      .filter(r => r.temp < min || r.temp > max);
  }
  alerts = readingsOutsideRange(station, 
                                operatingPlan.temperatureFloor, // 최저온도
                                operatingPlan.temperatureCeiling); // 최고온도
}

class NumberRange {
  constructor(min, max) {
    this._data = {min: min, max: max};
  }
  get min() {return this._data.min;}
  get max() {return this._data.max;}
  contains(arg) {return (arg >= this.min && arg <= this.max);}
}

function ex2() {
  function readingsOutsideRange(station, range) {
    return station.readings
      .filter(r => !range.contains(r.temp));
  }
  const range = new NumberRange(operatingPlan.temperatureFloor,
                                operatingPlan.temperatureCeiling);
  alerts = readingsOutsideRange(station, range);
}