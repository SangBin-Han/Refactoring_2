/**
 * 11.3 플래그 인수 제거하기(Rmove Flag Argument)
 * 
 * - 1판에서의 이름: 매개변수를 메서드로 전환
 * 
 * function setDimension(name, value) {
 *  if (name === "height") {
 *    this._height = value;
 *    return;
 *  }
 *  if (name === "width") {
 *    this._width = value;
 *    return;
 *  }
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function setHeight(value) {this._height = value;}
 * function setWidth(value) {this._width = value;}
 * 
 * 절차
 * 1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
 *    -> 주가 되는 함수에 깔끔한 분배 조건문이 포함되어 있다면 조건문 분해하기(10.1절)로
 *      명시적 함수들을 생성하자. 그렇지 않다면 래핑 함수(wrapping function) 형태로 만든다.
 * 2. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출
 *    하도록 수정한다.
 */
// --------------- 예시 ------------------
// aShipment.deliveryDate = deliveryDate(anOrder, true);
// aShipment.deliveryDate = deliveryDate(anOrder, false);

// function deliveryDate(anOrder, isRush) {
//   if (isRush) {
//     let deliveryTime;
//     if ((["MA", "CT"]).includes(anOrder.deliveryState)) deliveryTime = 1;
//     else if ((["NY", "NH"]).includes(anOrder.deliveryState)) deliveryTime = 2;
//     else deliveryTime = 3;
//     return anOrder.placedOn.plusDays(1 + deliveryTime);
//   } else {
//     let deliveryTime;
//     if ((["MA", "CT", "NY"]).includes(anOrder.deliveryState)) deliveryTime = 2;
//     else if ((["ME", "NH"]).includes(anOrder.deliveryState)) deliveryTime = 3;
//     else deliveryTime = 4;
//     return anOrder.placedOn.plusDays(2 + deliveryTime);
//   }
// }

// --------------- Refactoring ------------------

aShipment.deliveryDate = deliveryDate(anOrder, true);
aShipment.deliveryDate = deliveryDate(anOrder, false);
function deliveryDate(anOrder, isRush) {
  if (isRush) return rushDeliveryDate(anOrder);
  else return regularDeliveryDate(anOrder);
}
function rushDeliveryDate(anOrder) {
  let deliveryTime;
  if ((["MA", "CT"]).includes(anOrder.deliveryState)) deliveryTime = 1;
  else if ((["NY", "NH"]).includes(anOrder.deliveryState)) deliveryTime = 2;
  else deliveryTime = 3;
  return anOrder.placedOn.plusDays(1 + deliveryTime);
}
function regularDeliveryDate(anOrder) {
  let deliveryTime;
  if ((["MA", "CT", "NY"]).includes(anOrder.deliveryState)) deliveryTime = 2;
  else if ((["ME", "NH"]).includes(anOrder.deliveryState)) deliveryTime = 3;
  else deliveryTime = 4;
  return anOrder.placedOn.plusDays(2 + deliveryTime);
}