/**
 * 11.7 세터 제거하기(Remove Setting Method)
 * 
 * class Person {
 *  get name() {...}
 *  set name(aString) {...}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Person {
 *  get name() {...}
 * }
 * 
 * 절차
 * 1. 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에 추가한다(함수 선언 바꾸기: 6.5절).
 *    그런 다음 생성자 안에서 적절한 세터를 호출한다.
 * 2. 생성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 한다. 하나 수정할 때마다
 *    테스트한다.
 *    -> (갱신하려는 대상이 공유 참조 객체라서) 새로운 객체를 생성하는 방식으로는 세터 호출을 대체할 수 없다면
 *      이 리팩터링을 취소한다.
 * 3. 세터 메서드를 인라인(6.2절)한다. 가능하다면 해당 필드를 불변으로 만든다.
 * 4. 테스트한다.
 */
// --------------- 예시1 ------------------
// class Person {
//   get name() {return this._name;}
//   set name(arg) {this._name = arg;}
//   get id() {return this._id;}
//   set id(arg) {this._id = arg;}
// }

// const martin = new Person();
// martin.name = "마틴";
// martin.id = "1234";

// --------------- Refactoring ------------------

class Person {
  constructor(id) {
    this.id = id;
  }
  get name() {return this._name;}
  set name(arg) {this._name = arg;}
  get id() {return this._id;}
}

const martin = new Person("1234");
martin.name = "마틴";