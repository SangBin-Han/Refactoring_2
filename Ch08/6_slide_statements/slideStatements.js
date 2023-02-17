/**
 * 8.6 문장 슬라이드하기(Slide Statements)
 * 
 * - 1판에서의 이름: 조건문의 공통 실행 코드 빼내기
 * 
 * const pricingPlan = retrievePricingPlan();
 * const order = retreiveOrder();
 * let charge;
 * const chargePerUnit = pricingPlan.unit;
 * 
 * --------------- Refactoring ------------------
 * 
 * const pricingPlan = retrievePricingPlan();
 * const chargePerUnit = pricingPlan.unit;
 * const order = retreiveOrder();
 * let charge;
 * 
 * 절차
 * 1. 코드 조각(문장들)을 이동할 목표 위치를 찾는다. 코드 조가그이 원래 위치와 목표 위치 사이의 코드들을 훑어보면서, 
 *    조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핀다. 다음과 같은 간섭이 있다면 이 리팩터링을 포기한다.
 * -> 코드 조각에서 참조하는 요소를 선언하는 문장 앞으로는 이동할 수 없다.
 * -> 코드 조각을 참조하는 요소의 뒤로는 이동할 수 없다.
 * -> 코드 조각에서 참조하는 요소를 수정하는 문장을 건너뛰어 이동할 수 없다.
 * -> 코드 조각이 수정하는 요소를 참조하는 요소를 건너뛰어 이동할 수 없다.
 * 2. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣는다.
 * 3. 테스트한다.
 */

function ex() {
  const pricingPlan = retrievePricingPlan();
  const order = retreiveOrder();
  const baseCharge = pricingPlan.base;
  let charge;
  const chargePerUnit = pricingPlan.unit;
  const units = order.units;
  let discount;
  charge = baseCharge + units * chargePerUnit;
  let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
  discount = discountableUnits * pricingPlan.discountFactor;
  if (order.isRepeat) discount += 20;
  charge = charge - discount;
  chargeOrder(charge);
}

// --------------- Refactoring ------------------

function refactoring() {
  const pricingPlan = retrievePricingPlan();
  const baseCharge = pricingPlan.base;
  let charge;
  const chargePerUnit = pricingPlan.unit;
  const order = retreiveOrder();
  const units = order.units;
  charge = baseCharge + units * chargePerUnit;
  let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
  let discount;
  discount = discountableUnits * pricingPlan.discountFactor;
  if (order.isRepeat) discount += 20;
  charge = charge - discount;
  chargeOrder(charge);
}