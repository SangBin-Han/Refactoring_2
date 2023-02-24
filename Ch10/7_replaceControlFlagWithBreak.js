/**
 * 10.7 제어 플래그를 탈출문으로 바꾸기(Replace Control Flag with Break)
 * 
 * - 1판에서의 이름: 제어 플래그 제거
 * 
 * for (const p of people) {
 *  if (!found) {
 *    if (p === "조커") {
 *      sendAlert();
 *      found = true;
 *    }
 *  }
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * for (const p of people) {
 *  if (p === "조커") {
 *    sendAlert();
 *    break;
 *  }
 * }
 * 
 * 절차
 * 1. 제어 플래그를 사용하는 코드를 함수로 추출(6.1절)할지 고려한다.
 * 2. 제어 플래그를 갱신하는 코드 각각을 적절한 제어문으로 바꾼다. 하나 바꿀 때마다 테스트한다.
 *    -> 제어문으로는 주로 return, break, continue가 쓰인다.
 * 3. 모두 수정했다면 제어 플래그를 제거한다.
 */
function ex() {
  let found = false;
  for (const p of people) {
    if (!found) {
      if (p === "조커") {
        sendAlert();
        found = true;
      }
      if (p === "사루만") {
        sendAlert();
        found = true;
      }
    }
  }
}