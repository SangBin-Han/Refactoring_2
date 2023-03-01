/**
 * 11.12 오류 코드를 예외로 바꾸기(Replace Error Code with Exception)
 * 
 * if (data)
 *  return new ShippingRules(data);
 * else
 *  return -23;
 * 
 * --------------- Refactoring ------------------
 * 
 * if (data)
 *  return new ShippingRules(data);
 * else
 *  throw new OrderProcessingError(-23);
 * 
 * 절차
 * 1. 콜스택 상위에 해당 예외를 처리할 예외 핸들러를 작성한다.
 *    -> 이 핸들러는 처음에는 모든 예외를 다시 던지게 해둔다.
 *    -> 적절한 처리를 해주는 핸들러가 이미 있다면 지금의 콜스택도 처리할 수 있도록 확장한다.
 * 2. 테스트한다.
 * 3. 해당 오류 코드를 대체할 예외와 그 밖의 에외를 구분할 식별 방법을 찾는다.
 *    -> 사용하는 프로그래밍 언어에 맞게 선택하면 된다. 대부분 언어에서는 서브클래스를 사용하면 될 것이다.
 * 4. 정적 검사를 수행한다.
 * 5. catch절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
 * 6. 테스트한다.
 * 7. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
 * 8. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다
 *    테스트한다.
 *    -> 먼저 오류 코드를 검사하는 부분을 함정(trap)으로 바꾼 다음, 함정에 걸려들지 않는지 테스트한 후
 *      제거하는 전략을 권한다. 함정에 걸려드는 곳이 있다면 오류 코드를 검사하는 코드가 아직 남아 있다는
 *      뜻이다. 함정을 무사히 피했다면 안심하고 본문을 정리하자(죽은 코드 제거하기(8.9절)).
 */
// --------------- 예시1 ------------------
function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23);
}
function calculateShippingCosts(anOrder) {
  // 관련 없는 코드
  const shippingRules = localShippingRules(anOrder.country);
  // if (shippingRules < 0) throw new Error("오류 코드가 다 사라지지 않았습니다."); // 이 함정에 걸리지 않는다면 삭제
  // 더 관련 없는 코드
}
// 최상위
// let status;
try {
  // status = calculateShippingCosts(orderData);
  calculateShippingCosts(orderData);
} catch (e) {
  if (e instanceof OrderProcessingError)
    errorList.push({order: orderData, errorCode: e.code});
  else
    throw e;
}
// if (status < 0) errorList.push({order: orderData, errorCode: status});

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류: ${errorCode}`);
    this.code = errorCode;
  }
  get name() {return "OrderProcessingError";}
}