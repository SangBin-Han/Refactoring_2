/**
 * 6.9 여러 함수를 클래스로 묶기(CombineFunctionsIntoClass)
 * 
 * function base(aReading) {...}
 * function taxableCharge(aReading) {...}
 * function calculateBaseCharge(aReading) {...}
 * 
 * --------------- Refactoring ------------------
 * 
 * class Reading {
 *  base() {...}
 *  taxableCharge() {...}
 *  calculateBaseCharge() {...}
 * }
 * 
 * 절차
 * 1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화(7.1절)한다.
 * -> 공통 데이터가 레코드 구조로 묶여 있지 않다면 먼저 매개변수 객체 만들기(6.8절)로 데이터를 하나로 묶는 레코드를 만든다.
 * 2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.(함수 옮기기(8.1절)).
 * -> 공통 레코드의 멤버는 함수 호출문의 인수 목록에서 제거한다.
 * 3. 데이터를 조작하는 로직들은 함수로 추출(6.1절)해서 새 클래스로 옮긴다.
 */

const reading = {
  customer: "ivan",
  quantity: 10,
  month: 5,
  year: 2017
};

function exClient1() {
  const aReading = acquireReading();
  const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
}
function exClient2() {
  const aReading = acquireReading();
  const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
}
function exClient3() {
  const aReading = acquireReading();
  const basicChargeAmount = calculateBaseCharge(aReading);

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
}

// --------------- Refactoring ------------------

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {return this._customer;}
  get quantity() {return this._quantity;}
  get month() {return this._month;}
  get year() {return this._year;}
  get baseCharge() {
    return baseRate(this,month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }

}

function refactoringClient1() {
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const baseCharge = aReading.baseCharge;
}
function refactoringClient2() {
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const taxableCharge = aReading.taxableCharge;
}
function refactoringClient3() {
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const basicChargeAmount = aReading.baseCharge;

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
}