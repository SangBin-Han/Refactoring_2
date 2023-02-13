/**
 * 7.4 임시 변수를 질의 함수로 바꾸기(Replace Temp with Query)
 * 
 * const basePrice = this._quantity * this._itemPrice;
 * if (basePrice > 1000)
 *  return basePrice * 0.95;
 * else 
 *  return basePrice * 0.98;
 * 
 * --------------- Refactoring ------------------
 * 
 * get basePrice() {this._quantity * this._itemPrice;}
 * ...
 * if (this.basePrice > 1000)
 *  return this.basePrice * 0.95;
 * else
 *  return this.basePrice * 0.98;
 * 
 * 절차
 * 1. 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
 * 2. 읽기전용으로 만들 수 있는 변수는 읽기전용으로 만든다.
 * 3. 테스트한다.
 * 4. 변수 대입문을 함수로 추출한다.
 * -> 변수와 함수가 같은 이름을 가질 수 없다면 함수 이름을 임시로 짓는다. 또한, 추출한 함수가 부수 효과를 일으키지는 않는지 확인한다.
 *    부수효과가 있다면 질의 함수와 변경 함수 분리하기(11.1절)로 대처한다.
 * 5. 테스트한다.
 * 6. 변수 인라인하기(6.4절)로 임시 변수를 제거한다.
 */

class Order_ex {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    var basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;

    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
  }
}

// --------------- Refactoring ------------------

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    return this.basePrice * this.discountFactor;
  }
  get basePrice() {
    return this._quantity * this._item.price;
  }
  get discountFactor() {
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor -= 0.03;
    return discountFactor;
  }
}