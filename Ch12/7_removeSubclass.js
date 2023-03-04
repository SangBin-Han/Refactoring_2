/**
 * 12.7 서브클래스 제거하기(Remove Subclass)
 * 
 * - 반대 리팩터링: 타입 코드를 서브클래스로 바꾸기(12.6절)
 * - 1판에서의 이름: 하위클래스를 필드로 전환
 * 
 * class Person {
 *  get genderCode() {return "X";}
 * }
 * class Male extends Person {
 *  get genderCode() {return "M";}
 * }
 * class Female extends Person {
 *  get genderCode() {return "F";}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Person {
 *  get genderCode() {
 *    return this._genderCode;
 *  }
 * }
 * 
 * 절차
 * 1. 서브클래스의 생성자를 팩터리 함수로 바꾼다(11.8절)
 *    -> 생성자를 사용하는 측에서 데이터 필드를 이용해 어떤 서브클래스를 생성할지 결정한다면 그 결정
 *      로직을 슈퍼클래스의 팩터리 메서드에 넣는다.
 * 2. 서브클래스의 타입을 검사하는 코드가 있다면 그 검사 코드에 함수 추출하기(6.1절)와 함수 옮기기(8.1절)를
 *    차례로 적용하여 슈퍼클래스로 옮긴다. 하나 변경할 때마다 테스트한다.
 * 3. 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 만든다.
 * 4. 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 이용하도록 수정한다.
 * 5. 서브클래스를 지운다.
 * 6. 테스트한다.
 */
// --------------- 예시1 ------------------
// class Person {
//   constructor(name) {
//     this._name = name;
//   }
//   get name() {return this._name;}
//   get genderCode() {return "X";}
// }
// class Male extends Person {
//   get genderCode() {return "M";}
// }
// class Female extends Person {
//   get genderCode() {return "F";}
// }

// --------------- Refactoring ------------------
const numberOfMales = people.filter(p => p.isMale).length;
function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M": return new Person(aRecord.name, "M");
    case "F": return new Person(aRecord.name, "F");
    default: return new Person(aRecord.name, "X");
  }
}
function loadFromInput(data) {
  return data.map(aRecord => createPerson(aRecord));
}
class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode;
  }
  get name() {return this._name;}
  get genderCode() {return this._genderCode;}
  get isMale() {return "M" === this._genderCode;}
}
class Male extends Person {
}
class Female extends Person {
}