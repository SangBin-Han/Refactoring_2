/**
 * 6.10 여러 함수를 변환 함수로 묶기(Combine Functions into Transform)
 * 
 * function base(aReading) {...}
 * function taxableCharge(aReading) {...}
 * 
 * --------------- Refactoring ------------------
 * 
 * function enrichReading(argReading) {
 * const aReading = _.cloneDeep(argReading);
 * aReading.baseCharge = base(aReading);
 * aReading.taxableCharge = taxableCharge(aReading);
 * return aReading;
 * }
 * 
 * 절차
 * 1. 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다.
 * -> 이 작업은 대체로 깊은 복사로 처리향 한다. 변환 함함수가 원본 레코드를 바꾸지 않는지 검사하는 테스트를 마련해두면 도움될 때가 많다.
 * 2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록한다. 
 *    그런 다음 클라이언트 코드가 이 필드를 사용하도록 수정한다.
 * -> 로직이 복잡하면 함수 추출하기(6.1절)부터 한다.
 * 3. 테스트한다.
 * 4. 나머지 관련 함수도 위 과정에 따라 처리한다.
 */

const reading = {
  customer: "ivan",
  quantity: 10,
  month: 5,
  year: 2017
};

function exClient1() {
  const aReading = acquireReading();
  const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
}

function exClient2() {
  const aReading = acquireReading();
  const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
}

function exClient3() {
  const aReading = acquireReading();
  const basicChargeAmount = calculateBaseCharge(aReading);

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
}

// --------------- Refactoring ------------------

function refactoringClient1() {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const baseCharge = aReading.baseCharge;
}

function refactoringClient2() {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const taxableCharge = aReading.taxableCharge;
}

function refactoringClient3() {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const basicChargeAmount = aReading.baseCharge;
}

function enrichReading(original) {
  const result = _.cloneDeep(original); // lodash 라이브러리 함수
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
  return result;

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
}

// 테스트코드
it('check reading unchanged', function() {
  const baseReading = {
    customer: "ivan",
    quantity: 15,
    month: 5,
    year: 2017
  };
  const oracle = _.cloneDeep(baseReading);
  enrichReading(baseReading);
  assert.deepEqual(baseReading, oracle);
});