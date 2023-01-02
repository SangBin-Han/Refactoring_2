/**
 * 6.5 함수 선언 바꾸기(Change Function Declaration)
 * 
 * 다른 이름:
 *  - 함수 이름 바꾸기
 *  - 시그니처 바꾸기
 * 1판에서의 이름:
 *  - 메서드명 변경
 *  - 매개변수 추가
 *  - 매개변수 제거
 * 
 * Q1. 함수 선언 바꾸기를 잘하려면?
 * 
 * - 간단한 절차
 * 1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 확인한다.
 * 2. 메서드 선언을 원하는 형태로 바꾼다.
 * 3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
 * 4. 테스트한다.
 * 
 * ==> 변경할 게 둘 이상이면 나눠서 처리하는 편이 나을 때가 많다. 따라서 이름 변경과 매개변수 추가를 모두 하고 싶다면
 * 각각을 독립적으로 처리하자(그러다 문제가 생기면 작업을 되돌리고 '마이그레이션 절차'를 따른다).
 * 
 * - 마이그레이션 절차
 * 1. 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링한다.
 * 2. 함수 본문을 새로운 함수로 추출(6.1)한다.
 * 3. 추출한 함수에 매개변수를 추가해야 한다면 '간단한 절차'를 따라 추가한다.
 * 4. 테스트한다.
 * 5. 기존 함수를 인라인(6.2)한다.
 * 6. 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한 번 더 적용해서 원래 이름으로 되돌린다.
 * 7. 테스트한다.
 * 
 * 예시: 함수 이름 바꾸기(간단한 절차)
 * function circum(radius) {
 *  return 2 * Math.PI * radius;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function circumference(radius) {
 *  return 2 * Math.PI * radius;
 * } 
 * 
 * 예시: 함수 이름 바꾸기(마이그레이션 절차)
 * function circum(radius) {
 *  return 2 * Math.PI * radius;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function circum(radius) {
 *  return circumference(radius);
 * }
 * function circumference(radius) {
 *  return 2 * Math.PI * radius;
 * }
 * 
 * 예시: 매개변수 추가하기
 * Book 클래스...
 * addReservation(customer) {
 *  this._reservations.push(customer);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * addReservation(customer) {
 *  this.zz_addReservation(customer);
 * }
 * zz_addReservation(customer) {
 *  this._reservations.push(customer);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * addReservation(customer) {
 *  this.zz_addReservation(customer, false);
 * }
 * zz_addReservation(customer, isPriority) {
 *  this._reservations.push(customer);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * zz_addReservation(customer, isPriority) {
 *  assert(isPriority === true || isPriority === false);
 *  this._reservations.push(customer);
 * }
 * 
 * 예시: 매개변수를 속성으로 바꾸기
 * function inNewEngland(aCustomer) {
 *  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
 * }
 * const newEnglanders = someCustomers.filter(c => inNewEngland(c));
 * 
 * --------------- Refactoring ------------------
 * 
 * function inNewEngland(aCustomer) {
 *  const stateCode = aCustomer.address.state;
 *  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function inNewEngland(aCustomer) {
 *  const stateCode = aCustomer.address.state;
 *  return xxNEWinNewEngland(stateCode);
 * }
 * function xxNEWinNewEngland(stateCode) {
 *  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function inNewEngland(aCustomer) {
 *  return xxNEWinNewEngland(aCustomer.address.state);
 * }
 * const newEnglanders = someCustomers.filter(c => xxNEWinNewEngland(c.address.state));
 * 
 * --------------- Refactoring ------------------
 * 
 * const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));
 * function inNewEngland(stateCode) {
 *  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
 * }
 * 
 */
