/**
 * 8.8 반복문을 파이프라인으로 바꾸기(Replace Loop with Pipeline)
 * 
 * const names = [];
 * for (const i of input) {
 *  if (i.job === "programmer")
 *    names.push(i.name);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * const names = input
 *  .filter(i => i.job === "programmer")
 *  .map(i => i.name)
 * ;
 * 
 * 절차
 * 1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.
 * -> 기존 변수를 단순히 복사한 것일 수도 있다.
 * 2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다.
 *    이 때 컬렉션 파이프라인 연산은 1에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산의 결과를
 *    기초로 연쇄적으로 수행된다. 하나를 대체할 때마다 테스트한다.
 * 3. 반복문의 모든 동작을 대체했다면 반복문 자체를 지운다
 * -> 반복문이 결과를 누적 변수(accumulator)에 대입했다면 파이프라인의 결과를 그 누적 변수에 대입한다.
 */

function acquireData_ex(input) {
  const lines = input.split("\n");
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === "") continue;
    const record = line.split(",");
    if (record[1].trim() === "India") {
      result.push({city: record[0].trim(), phone: record[2].trim()});
    }
  }
  return result;
}

// --------------- Refactoring ------------------

function acquireData(input) {
  const lines = input.split("\n");
  const result = lines
    .slice(1)
    .filter(line => line.trim() !== "")
    .map(line => line.split(","))
    .filter(record => record[1].trim() === "India")
    .map(record => ({city: record[0].trim(), phone: record[2].trim()}))
    ;
  return result;
}

// --------------- Refactoring2 ------------------

function acquireData(input) {
  const lines = input.split("\n");
  return lines
    .slice  (1)
    .filter (line => line.trim() !== "")
    .map    (line => line.split(","))
    .filter (fields => fields[1].trim() === "India")
    .map    (fields => ({city: fields[0].trim(), phone: fields[2].trim()}))
    ;
}