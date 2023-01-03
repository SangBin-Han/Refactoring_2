/**
 * 6.6 변수 캡슐화하기(Encapsulate Variable)
 * 
 * 1판에서의 이름:
 *  - 필드 자체 캡슐화
 *  - 필드 캡슐화
 * 
 * let defaultOwner = {firstName: "마틴", lastName: "파울러"};
 * 
 * --------------- Refactoring ------------------
 * 
 * let defaultOwner = {firstName: "마틴", lastName: "파울러"};
 * export function defaultOwner() {return defaultOwnerData;}
 * export function setDefaultOwner(arg) {defaultOwnerData = arg;}
 * 
 * 절차
 * 1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수를 만든다.
 * 2. 정적 검사를 수행한다.
 * 3. 변수를 직접 참조하던 부분을 모두 적잘한 캡슐화 함수 호출로 바꾼다. 하나씩 바꿀 때마다 테스트한다.
 * 4. 변수의 접근 범위를 제한한다.
 * -> 변수로의 직접 접근을 막을 수 없을 때도 있다. 그럴 때는 변수 이름을 바꿔서 테스트해보면 
 *    해당 변수를 참조하는 곳을 쉽게 찾아낼 수 있다.
 * 5. 테스트한다.
 * 6. 변수 값이 레코드라면 레코드 캡슐화하기(7.1)를 적용할지 고려해본다.
 */
const assert = require('assert');
// 예시
function ex1() {
  let defaultOwner = {firstName: "마틴", lastName: "파울러"};

  spaceship.owner = defaultOwner;
  defaultOwner = {firstName: "레베카", lastName: "파슨스"};
}
// 1
function refactoring1() {
  let defaultOwner = {firstName: "마틴", lastName: "파울러"};
  function getDefaultOwner() {return defaultOwner;}
  function setDefaultOwner(arg) {defaultOwner = arg;}

  spaceship.owner = getDefaultOwner();
  setDefaultOwner({firstName: "레베카", lastName: "파슨스"});
}
// 2
// let defaultOwner = {firstName: "마틴", lastName: "파울러"};
// export function getDefaultOwner() {return defaultOwner;}
// export function setDefaultOwner(arg) {defaultOwner = arg;}
// 3
// let defaultOwnerData = {firstName: "마틴", lastName: "파울러"};
// export function defaultOwner() {return defaultOwnerData;}
// export function setDefaultOwner(arg) {defaultOwner = arg;}

// const owner1 = defaultOwner();
// assert.equals("파울러", owner1.lastName, "처음 값 확인");
// const owner2 = defaultOwner();
// owner2.lastName = "파슨스";
// assert.equal("파슨스", owner1.lastName, "owner2를 변경한 후"); // 성공할까?

// 4
// let defaultOwnerData = {firstName: "마틴", lastName: "파울러"};
// export function defaultOwner() {return Object.assign({}, defaultOwnerData);}
// export function setDefaultOwner(arg) {defaultOwnerData = arg;}
// 5
let defaultOwnerData = {firstName: "마틴", lastName: "파울러"};
export function defaultOwner() {return new Person(defaultOwnerData);}
export function setDefaultOwner(arg) {defaultOwnerData = arg;}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() {return this._lastName;}
  get firstName() {return this._firstName;}
}