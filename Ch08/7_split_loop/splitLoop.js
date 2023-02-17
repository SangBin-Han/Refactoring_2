/**
 * 8.7 반복문 쪼개기(Split Loop)
 * 
 * let averageAge = 0;
 * let totalSalary = 0;
 * for (const p of people) {
 *  averageAge += p.age;
 *  totalSalary += p.salary;
 * }
 * averageAge = averageAge / people.length;
 * 
 * --------------- Refactoring ------------------
 * 
 * let totalSalary = 0;
 * for (const p of people) {
 *  totalSalary += p.salary;
 * }
 * 
 * let averageAge = 0;
 * for (const p of people) {
 *  averageAge += p.age;
 * }
 * averageAge = averageAge / people.length;
 * 
 * 절차
 * 1. 반복문을 복제해 두 개로 만든다.
 * 2. 반복문이 중복되어 생기는 부수효과를 파악해서 제거한다.
 * 3. 테스트한다.
 * 4. 완료됐으면, 각 반복문을 함수로 추출(6.1절)할지 고민해본다.
 */

function ex() {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;
  for (const p of people) {
    if (p.age < youngest) toungest = p.age;
    totalSalary += p.salary;
  }

  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}

// --------------- Refactoring ------------------

function refactoring() {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;
  for (const p of people) {
    totalSalary += p.salary;
  }

  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
  }

  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}

// --------------- Refactoring2 ------------------

function refactoring() {
  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;

  function totalSalary() {
    return people.reduce((total, p) => total + p.salary, 0);
  }

  function youngestAge() {
    return Math.min(...people.map(p => p.age));
  }
}