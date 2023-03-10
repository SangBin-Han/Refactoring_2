/**
 * 11.1 질의 함수와 변경 함수 분리하기
 * 
 * function getToatalOutstandingAndSendBill() {
 *  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
 *  sendBill();
 *  return result;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function totalOutstanding() {
 *  return customer.invoices.reduce((total, each) => each.amount + total, 0);
 * }
 * function sendBill() {
 *  eamilGateway.send(formatBill(customer));
 * }
 * 
 * 절차
 * 1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
 *    -> 함수 내부를 살펴 무엇을 반환하는지 찾는다. 어떤 변수의 값을 반환한다면 그 변수 이름이 훌륭한
 *      단초가 될 것이다.
 * 2. 새 질의 함수에서 부수효과를 모두 제거한다.
 * 3. 정적 검사를 수행한다.
 * 4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 질의
 *    함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할
 *    때마다 테스트한다.
 * 5. 원래 함수에서 질의 관련 코드를 제거한다.
 * 6. 테스트한다.
 */
// --------------- 예시 ------------------
function alertForMiscreant_origin(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }
    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }
  return "";
}

// --------------- Refactoring ------------------
function main() {
  const found = findMiscreant(people);
  alertForMiscreant(people);
}
function alertForMiscreant(people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}
function findMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      return "조커";
    }
    if (p === "사루만") {
      return "사루만";
    }
  }
  return "";
}