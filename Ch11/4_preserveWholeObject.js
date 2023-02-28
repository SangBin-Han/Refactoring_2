/**
 * 11.4 객체 통째로 넘기기(Preserve Whole Object)
 * 
 * const low = aRoom.daysTempRange.low;
 * const high = aRoom.daysTempRange.high;
 * if (aPlan.withinRange(low, high))
 * 
 * --------------- Refactoring ------------------
 * 
 * if (aPlan.withinRange(aRoom.daysTempRange))
 * 
 * 절차
 * 1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다.
 *    -> 마지막 단계에서 이 함수의 이름을 변경해야 하니 검색하기 쉬운 이름으로 지어준다.
 * 2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
 * 3. 정적 검사를 수행한다.
 * 4. 모든 호출자가 새 함수를 사용하게 수정한다. 하나씩 수정하며 테스트하자.
 *    -> 수정 후에는 원래의 매개변수를 만들어내는 코드 일부가 필요 없어질 수 있다. 따라서 죽은 코드 제거하기(8.9절)로
 *      없앨 수 있을 것이다.
 * 5. 호출자를 모두 수정했다면 원래 함수를 인라인(6.2절)한다.
 * 6. 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다.
 */
// --------------- 예시1 ------------------
// 호출자
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");

class HeatingPlan {
  withinRange(bottom, top) {
    return (bottom >= this._temperatureRange.low)
          && (top <= this._temperatureRange.high);
  }
}