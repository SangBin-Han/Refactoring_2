/**
 * 6.2 함수 인라인하기(Inline Function)
 * 
 * 반대 리팩터링: 함수 추출하기
 * 1판에서의 이름: 메서드 내용 직접 삽입
 * 
 * 예시)
 * function getRating(driver) {
 *  return moteThanFiveLateDeliveries(Driver) ? 2 : 1;
 * }
 * function moreThanFiveLateDeliveries(driver) {
 *  return driver.numberOfLateDeliveries > 5;
 * }
 * 
 * ----------- Refactoring -------------
 * 
 * function getRating(driver) {
 *  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
 * }
 * 
 * Q1. 함수 인라인을 잘 하려면?
 * 
 * 1. 다형 메서드(polymorphism method)인지 확인한다.
 * -> 서브클래스에서 오버라이드하는 메서드는 인라인하면 안 된다.
 * 2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
 * 3. 각 호출문을 함수 본문으로 교체한다.
 * 4. 하나씩 교체할 때마다 테스트한다.
 * -> 인라인 작업을 한 번에 처리할 필요는 없다. 인라인하기가 까다로운 부분이 있다면 일단 남겨두고
 * 여유가 생길 때마다 틈틈이 처리한다.
 * 5. 함수 정의(원래 함수)를 삭제한다.
 */

class Ex1 {
  rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
  }
  moreThanFiveLateDeliveries(aDriver) {
    return aDriver.numberOfLateDeliveries > 5;
  }
}
class Ex1_refactoring {
  rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
  }
}
class Ex2 {
  rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
  }
  moreThanFiveLateDeliveries(dvr) {
    return dvr.numberOfLateDeliveries > 5;
  }
}
class Ex2_refactoring {
  rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
  }
}
class Ex3 {
  reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
  }
  gatherCustomerData(out, aCustomer) {
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
  }
}
class Ex3_refactoring {
  reportLines(aCustomer) {
    const lines = [];
    lines.push(["name", aCustomer.name]);
    lines.push(["location", aCustomer.location]);
    return lines;
  }
}