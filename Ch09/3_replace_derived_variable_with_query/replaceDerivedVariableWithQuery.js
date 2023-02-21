/**
 * 9.3 파생 변수를 질의 함수로 바꾸기(Replace Derived Variable with Query)
 * 
 * get discountedTotal() {return this._discountedTotal;}
 * set discount(aNumber) {
 *  const old = this._discount;
 *  this._discount = aNumber;
 *  this._discountedTotal += old - aNumber;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * get discountedTotal() {return this._baseTotal - this._discount;}
 * set discount(aNumber) {this._discount = aNumber;}
 * 
 * 절차
 * 1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 변수 쪼개기(9.1절)를 활용해 각 갱신 지점에서 변수를 분리한다.
 * 2. 해당 변수의 값을 계산해주는 함수를 만든다.
 * 3. 해당 변수가 사용되는 모든 곳에 어서션을 추가(10.6절)하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.
 * -> 필요하면 변수 캡슐화하기(6.6절)를 적용하여 어서션이 들어갈 장소를 마련해준다.
 * 4. 테스트한다.
 * 5. 변수를 읽는 코드를 모두 함수 호출로 대체한다.
 * 6. 테스트한다.
 * 7. 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기(8.9절)로 없앤다.
 */
class ProductionPlan_Ex {
  get production() {return this._production;}
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

// --------------- Refactoring ------------------

class ProductionPlan_Refactoring {
  get production() {
    return this._adjustments
      .reduce((sum, a) => sum + a.amount, 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}

class ProductionPlan_Ex2 {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }
  get production() {return this._production;}
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

// --------------- Refactoring2 ------------------

class ProductionPlan_Refactoring2 {
  constructor(production) {
    this._initalProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }
  get production() {
    assert(this._productionAccumulator === this.calculatedProductionAccumulator);
    return this._initalProduction + this._productionAccumulator;
  }
  get calculatedProductionAccumulator() {
    return this._adjustments
      .reduce((sum, a) => sum + a.amount, 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}