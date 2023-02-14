/**
 * 7.8 중개자 제거하기(Remove Middle Man)
 * 
 * - 반대 리팩터링: 위임 숨기기(7.7절)
 * 
 * manager = aPerson.manager;
 * 
 * class Person {
 *  get manager() {return this.department.manager;}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * manager = aPerson.department.manager;
 * 
 * 절차
 * 1. 위임 객체를 얻는 게터를 만든다.
 * 2. 위임 메서드를 호출하는 클라이언트가 모두 이 게터를 거치도록 수정한다. 하니씩 바꿀 때마다 테스트한다.
 * 3. 모두 수정했다면 위임 메서드를 삭제한다.
 * -> 자동 리팩터링 도구를 사용할 때는 위임 필드를 캡슐화(6.6절)한 다음, 이를 사용하는 모든 메서드를 인라인(6.2절)한다.
 */

class Person_Ex {
  get manager() {return this._department.manager;}
}

class Department_Ex {
  get manager() {return this._manager;}
}

function main() {
  manager = aPerson.manager;
}

// --------------- Refactoring ------------------

class Person {
  get department() {return this._department;}
}

class Department {
  get manager() {return this._manager;}
}

function main() {
  manager = aPerson.department.manager;
}
