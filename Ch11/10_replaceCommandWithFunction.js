/**
 * 11.10 명령을 함수로 바꾸기(Replace Command with Function)
 * 
 * - 반대 리팩터링: 함수를 명령으로 바꾸기(11.9절)
 * 
 * class ChargeCalculator {
 *  constructor(customer, usage) {
 *    this._customer = customer;
 *    this._usage = usage;
 *  }
 *  execute() {
 *    return this._customer.rate * this._usage;
 *  }
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function charge(customer, usage) {
 *  return customer.rate * usage;
 * }
 * 
 * 절차
 * 1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 추출(6.1절)한다.
 *    -> 이 함수가 바로 명령을 대체할 함수다.
 * 2. 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인(6.2절)한다.
 *    -> 보조 메서드가 값을 반환한다면 함수 인라인에 앞서 변수 추출하기(6.3절)를 적용한다.
 * 3. 함수 선언 바꾸기(6.5절)를 적용하여 생성자의 매개변수 모두를 명령의 실행 메서드로 옮긴다.
 * 4. 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게끔 바꾼다. 하나씩 수정
 *    할 때마다 테스트한다.
 * 5. 생성자 호출과 명령의 실행 메서드 호출을 호출자(대체 함수)안으로 인라인한다.
 * 6. 테스트한다.
 * 7. 죽은 코드 제거하기(8.9절)로 명령 클래스를 없앤다.
 */
// --------------- 예시1 ------------------
// class ChargeCalculator {
//   constructor(customer, usage, provider) {
//     this._customer = customer;
//     this._usage = usage;
//     this._provider = provider;
//   }
//   get baseCharge() {
//     return this._customer.baseRate * this._usage;
//   }
//   get charge() {
//     return this.baseCharge + this._provider.connectionCharge;
//   }
// }
// monthCharge = new ChargeCalculator(customer, usage, provider).charge;

// --------------- Refactoring ------------------

monthCharge = charge(customer, usage, provider);

function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}