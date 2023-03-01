/**
 * 11.11 수정된 값 반환하기(Return Modified Value)
 * 
 * let totalAscent = 0;
 * calculateAscent();
 * 
 * function calculateAscent() {
 *  for (let i = 1; i < points.length; i++) {
 *    const verticalChange = points[i].elevation - points[i-1].elevation;
 *    totalAscent += (verticalChange > 0) ? verticalChange : 0;
 *  }
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * const totalAscent = calculateAscent();
 * 
 * function calculateAscent() {
 *  let result = 0;
 *  for (let i = 1; i < points.length; i++) {
 *    const verticalChange = points[i].elevation - points[i-1].elevation;
 *    result += (verticalChange > 0) ? verticalChange : 0;
 *  }
 *  return result;
 * }
 * 
 * 절차
 * 1. 함수가 수정된 값을 반환하게 하여 호출자가 그 값을 자신의 변수에 저장하게 한다.
 * 2. 테스트한다.
 * 3. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
 *    -> 이 작업이 의도대로 이뤄졌는지 검사하고 싶다면 호출자에서 초깃값을 수정해보자. 제대로
 *      처리했다면 수정된 값이 무시된다.
 * 4. 테스트한다.
 * 5. 계산이 선언과 동시에 이뤄지도록 통합한다(즉, 선언 시점에 계산 로직을 바로 실행해 대입한다).
 *    -> 프로그래밍 언어에서 지원한다면 이 변수를 불변으로 지정하자.
 * 6. 테스트한다.
 * 7. 피호출 함수의 변수 이름을 새 역할에 어울리도록 바꿔준다.
 * 8. 테스트한다.
 */
// --------------- 예시1 ------------------
// let totalAscent = 0;
// let totalTime = 0;
// let totalDistance = 0;
// calculateAscent();
// calculateTime();
// calculateDistance();
// const pace = totalTime / 60 / totalDistance;

// function calculateAscent() {
//   for (let i = 1; i < points.length; i++) {
//     const verticalChange = points[i].elevation - points[i-1].elevation;
//     totalAscent += (verticalChange > 0) ? verticalChange : 0;
//   }
// }

// --------------- Refactoring ------------------

const totalAscent = calculateAscent();
const totalTime = calculateTime();
const totalDistance = calculateDistance();
const pace = totalTime / 60 / totalDistance;

function calculateAscent() {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i-1].elevation;
    result += (verticalChange > 0) ? verticalChange : 0;
  }
  return result;
}