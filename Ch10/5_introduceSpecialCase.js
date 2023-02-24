/**
 * 10.5 특이 케이스 추가하기(Introduce Special Case)
 * 
 * - 1판에서의 이름: Null 검사를 널 객체에 위임
 * 
 * if (aCustomer === "미확인 고객") customerName = "거주자";
 * 
 * --------------- Refactoring ------------------
 * 
 * class UnknownCustomer {
 *  get name() {return "거주자";}
 * }
 * 
 * 절차
 * 1. 컨테이너에 특이 케이스인지를 검하는 속성을 추가혹, false를 반환하게 한다.
 * 2. 특이 케이스 객체를 만든다. 이 객체는 특이 케이스인지를 검사하는 속성만 포함하며, 이 속성은 true를 반환하게 한다.
 * 3. 클라이언트에서 특이 케이스인지를 검사하는 코드를 함수로 추출(6.1절)한다. 모든 클라이언트가 값을 직접 비교하는 대신
 *    방금 추출한 함수를 사용하도록 고친다.
 * 4. 코드에 새로운 특이 케이스 대상을 추가한다. 함수의 반환 값으로 받거나 변환 함수를 적용하면 된다.
 * 5. 특이 케이스를 검사하는 함수 본문을 수정하여 특이 케이스 객체의 속성을 사용하도록 한다.
 * 6. 테스트한다.
 * 7. 여러 함수를 클래스로 묶기(6.9절)나 여러 함수를 변환 함수로 묶기(6.10절)를 적용하여 특이 케이스를 처리하는
 *    공통 동작을 새로운 요소로 옮긴다.
 *    -> 특이 케이스 클래스는 간단한 요청에는 항상 같은 값을 반환하는 게 보통이므로, 해당 특이 케이스의 리터럴 레코드를 만들어
 *      활용할 수 있을 것이다.
 * 8. 아직도 특이 케이스 검사 함수를 이용하는 곳이 남아 있다면 검사 함수를 인라인(6.2절)한다.
 */

class Site {
  get customer() {
    return (this._customer === "미확인 고객") ? new UnknownCustomer() : this._customer;
  }
}
class Customer {
  get name() {} // 고객 이름
  get billingPlan() {} // 요금제
  set billingPlan(arg) {}
  get paymentsHistory() {} // 납부 이력
  get isUnknown() {return false;}
}
class UnknownCustomer {
  get isUnknown() {return true;}
  get name() {return "거주자";}
  get billingPlan() {return registry.billingPlans.basic;}
  set billingPlan(arg) {}
}
function isUnknown(arg) {
  if (!((arg instanceof Customer) || arg instanceof UnknownCustomer))
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  return arg.isUnknown;
}
const aCustomer = site.customer;

function client1() {
  // ... 수많은 코드 ...
  const customerName = aCustomer.name;
}
function client2() {
  const plan = aCustomer.billingPlan;
}
function client3() {
  aCustomer.billingPlan = newPlan;
}
function client4() {
  const weeksDelinquent = (isUnknown(aCustomer)) ?
        0
        : aCustomer.paymentsHistory.weeksDelinquentInLastYear;
}