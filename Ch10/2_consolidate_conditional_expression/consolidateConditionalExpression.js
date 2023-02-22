/**
 * 10.2 조건식 통합하기(Consolidate Conditional Expression)
 * 
 * 절차
 * 1. 해당 조건식들 모두에 부수효과가 없는지 확인한다.
 * -> 부수효과가 있는 조건식들에는 질의 함수와 변경 함수 분리하기(11.1절)를 먼저 적용한다.
 * 2. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
 * -> 순차적으로 이뤄지는(레벨이 같은) 조건문은 or로 결합하고, 중첩된 조건문은 and로 결합한다.
 * 3. 테스트한다.
 * 4. 조건이 하나만 남을 때까지 2~3 과정을 반복한다.
 * 5. 하나로 합쳐진 조건식을 함수로 추출(6.1절)할지 고려해본다.
 */

function ex1() {
  if (anEmployee.seniority < 2) return 0;
  if (anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
}
function ex1_refactoring() {
  if (isNotEligibleForDisability()) return 0;

  function isNotEligibleForDisability() {
    return ((anEmployee.seniority < 2)
      || (anEmployee.monthsDisabled > 12)
      || (anEmployee.isPartTime));
  }
}

// --------------- 예시: or 사용하기 ------------------

function disabilityAmount_ex(anEmployee) {
  if (anEmployee.seniority < 2) return 0;
  if (anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
  // 장애 수단 계산
}

// --------------- Refactoring ------------------

function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability()) return 0;
  // 장애 수단 계산

  function isNotEligibleForDisability() {
    return ((anEmployee.seniority < 2)
      || (anEmployee.monthsDisabled > 12)
      || (anEmployee.isPartTime));
  }
}

// --------------- 예시: and 사용하기 ------------------

function and_ex() {
  if (anEmployee.onVacation)
    if (anEmployee.seniority > 10)
      return 1;
  return 0.5;
}

// --------------- Refactoring ------------------

function and_ex() {
  if (anEmployee.onVacation)
    if (anEmployee.seniority > 10)
      return 1;
  return 0.5;
}