/**
 * 7.7. 위임 숨기기(Hide Delegate)
 * 
 * - 반대 리팩터링: 중개자 제거하기(7.8절)
 * 
 * manager = aPerson.department.manager;
 * 
 * --------------- Refactoring ------------------
 * 
 * manager = aPerson.manager;
 * 
 * class Person {
 *  get manager() {return this.department.manager;}
 * }
 * 
 * 절차
 * 1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 서버에 생성한다.
 * 2. 클라이언트가 위임 객체 대신 서버를 호출하도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
 * 3. 모두 수정했다면, 서버로부터 위임 객체를 얻는 접근자를 제거한다.
 * 4. 테스트한다.
 */

class Person_Ex {
  constructor(name) {
    this._name = name;
  }
  get name() {return this._name;}
  get department() {return this._department;}
  set department(arg) {this._department = arg;}
}

class Department_Ex {
  get chargeCode() {return this._chargeCode;}
  set chargeCode(arg) {this._chargeCode = arg;}
  get manager() {return this._manager;}
  set manager(arg) {this._manager = arg;}
}

// --------------- Refactoring ------------------

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {return this._name;}
  get manager() {return this._department.manager;}
  get department() {return this._department;}
  set department(arg) {this._department = arg;}
}

class Department {
  get chargeCode() {return this._chargeCode;}
  set chargeCode(arg) {this._chargeCode = arg;}
  get manager() {return this._manager;}
  set manager(arg) {this._manager = arg;}
}

function main() {
  manager = aPerson.manager;
}