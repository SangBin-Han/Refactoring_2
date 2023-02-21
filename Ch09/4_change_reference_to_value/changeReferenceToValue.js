/**
 * 9.4 참조를 값으로 바꾸기(Change Reference to Value)
 * 
 * - 반대 리팩터링: 값을 참조로 바꾸기(9.5절)
 * 
 * class Product {
 *  applyDiscount(arg) {this._price.amount -= arg;}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Product {
 *  applyDiscount(arg) {
 *    this._price = new Money(this._price.amount - arg, this._price.currency);
 *  }
 * }
 * 
 * 절차
 * 1. 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인한다.
 * 2. 각각의 세터를 하나씩 제거(11.7절)한다.
 * 3. 이 값 객체의 필드들을 사용하는 동치성(equalilty) 비교 메서드를 만든다.
 * -> 대부분의 언어는 이런 상황에 사용할 수 있도록 오버라이딩 가능한 동치성 비교 메서드를 제공한다.
 *    동치성 비교 메서드를 오버라이드할 때는 보통 해시코드 생성 메서드도 함께 오버라이드해야한다.
 */

class Person_Ex {
  constructor() {
    this._telephoneNumber = new TelephoneNumber_Ex();
  }

  get officeAreaCode() {return this._telephoneNumber.areaCode;}
  set officeAreaCode(arg) {this._telephoneNumber.areaCode = arg;}
  get officeNumber() {return this._telephoneNumber.number;}
  set officeNumber(arg) {this._telephoneNumber.number = arg;}
}

class TelephoneNumber_Ex {
  get areaCode() {return this._areaCode;}
  set areaCode(arg) {this._areaCode = arg;}
  get number() {return this._number;}
  set number(arg) {this._number = arg;}
}

// --------------- Refactoring ------------------

class Person_Refactoring {
  constructor() {
    this._telephoneNumber = new TelephoneNumber_Refactoring();
  }

  get officeAreaCode() {return this._telephoneNumber.areaCode;}
  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber_Refactoring(arg, this.officeNumber);
  }
  get officeNumber() {return this._telephoneNumber.number;}
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber_Refactoring(this.officeAreaCode, arg);
  }
}

class TelephoneNumber_Refactoring {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode() {return this._areaCode;}
  get number() {return this._number;}
  equals(other) {
    if (!(other instanceof TelephoneNumber_Refactoring)) return false;
    return this.areaCode === other.areaCode &&
           this.number === other.number;
  }
}
it ('telephone equals', function() {
  assert(new TelephoneNumber_Refactoring("312", "555-0142")
    .equals(new TelephoneNumber_Refactoring("312", "555-0142")));
});