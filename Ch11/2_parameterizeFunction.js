/**
 * 11.2 함수 매개변수화하기(Parameterize Function)
 * 
 * - 1판에서의 이름: 메서드를 매개변수로 전환
 * 
 * function tenPercentRaise(aPerson) {
 *  aPerson.salary = aPerson.salary.multiply(1.1);
 * }
 * function fivePerconetRaise(aPerson) {
 *  aPerson.salary = aPerson.salary.multiply(1.05);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function raise(aPerson, factor) {
 *  aPerson.salary = aPerson.salary.multiply(1 + factor);
 * }
 * 
 * 절차
 * 1. 비슷한 함수 중 하나를 선택한다.
 * 2. 함수 선언 바꾸기(6.5절)로 리터럴들을 매개변수로 추가한다.
 * 3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
 * 4. 테스트한다.
 * 5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
 * 6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다.
 *    하나 수정할 떄마다 테스트한다.
 *    -> 매개변수화된 함수가 대체할 비슷한 함수와 다르게 동작한다면, 그 비슷한 함수의 동작도 처리할 수 있도록
 *      본문 코드를 적절히 수정한 후 진행한다.
 */
// --------------- 예시1 ------------------
// function baseCharge(usage) {
//   if (usage < 0) return usd(0);
//   const amount =
//         bottomBand(usage) * 0.03
//         + middleBand(usage) * 0.05
//         + topBand(usage) * 0.07;
//   return usd(amount);
// }
// function bottomBand(usage) {
//   return Math.min(usage, 100);
// }
// function middleBand(usage) {
//   return usage > 100 ? Math.min(usage, 200) - 100 : 0;
// }
// function topBand(usage) {
//   return usage > 200 ? usage - 200 : 0;
// }

// --------------- Refactoring ------------------

function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
        withinBand(usage, 0, 100) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}