/**
 * 10.3 중첩 조건문을 보호 구문으로 바꾸기(Replace Nested Conditional with Guard Clauses)
 * 
 * 절차
 * 1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꾼다.
 * 2. 테스트한다.
 * 3. 1~2 과정을 필요한 만큼 반복한다.
 * 4. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합(10.2절)한다.
 */
class DefaultExample {
  getPayAmount_ex() {
    let result;
    if (isDead)
      result = deadAmount();
    else {
      if (isSeparated)
        result = separatedAmount();
      else
        result = normalPayAmount();
    }
    return result;
  }
  getPayAmount() {
    if (isDead) return deadAmount();
    if (isSeparated) return separatedAmount();
    if (isRetired) return retiredAmount();
    return normalPayAmount();
  }
}

// --------------- 예시1 ------------------

function payAmount_ex(employee) {
  let result;
  if (employee.isSeparated) { // 퇴사한 직원인가?
    result = {amount: 0, reasonCode: "SEP"};
  }
  else {
    if (employee.isRetired) { // 은퇴한 직원인가?
      result = {amount: 0, reasonCode: "RET"};
    }
    else {
      // 급여 계산 로직
      lorem.ipsum(dolor.sitAmet);
      consectetur(adipiscing).elit();
      sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
      ut.enim.ad(minim.veniam);
      result = someFinalComputation();
    }
  }
  return result;
}

// --------------- Refactoring ------------------

function payAmount(employee) {
  let result;
  if (employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
  if (employee.isRetired) { // 은퇴한 직원인가?
    result = {amount: 0, reasonCode: "RET"};
  }
  else {
    // 급여 계산 로직
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    result = someFinalComputation();
  }
  return result;
}