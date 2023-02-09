/**
 * 7.2 컬렉션 캡슐화하기(Encapsulate Collection)
 * 
 * class Person {
 *  get courses() {return this._courses;}
 *  set courses(aList) {this._courses = aList;}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Person {
 *  get courses() {return this._courses.slice();}
 *  addCourse(aCourse) {...}
 *  removeCourse(aCourse) {...}
 * }
 * 
 * 절차
 * 1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기(6.6절)부터 한다.
 * 2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
 * -> 컬렉션 자체를 통째로 바꾸는 세터는 제거(11.7절)한다. 세터를 제거할 수 없다면 인수로 받은 컬렉션을
 *    복제해 저장하도록 만든다.
 * 3. 정적 검사를 수행한다.
 * 4. 컬렉션을 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 
 *    호출하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
 * 5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
 * 6. 테스트한다.
 */

class Person1 {
  constructor(name) {
    this._name = name;
    this._course = [];
  }
  get name() {return this._name;}
  get course() {return this._course;}
  set course(aList) {this._course = aList;}
}

class Course1 {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {return this._name;}
  get isAdvanced() {return this._isAdvanced;}
}

class Person2 {
  constructor(name) {
    this._name = name;
    this._course = [];
  }
  get name() {return this._name;}
  get course() {return this._course;}
  set course(aList) {this._course = aList;}
  addCourse(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError();}) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
}

class Course2 {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {return this._name;}
  get isAdvanced() {return this._isAdvanced;}
}