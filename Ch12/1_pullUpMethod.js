/**
 * 12.1 메서드 올리기(Pull Up Method)
 * 
 * - 반대 리팩터링: 메서드 내리기(12.4절)
 * 
 * class Employee {...}
 * 
 * class Salesperson extends Employee {
 *  get name() {...}
 * }
 * 
 * class Engineer extends Employee {
 *  get name() {...}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Employee {
 *  get name() {...}
 * }
 * 
 * class Salesperson extends Employee {...}
 * class Engineer extends Employee {...}
 * 
 * 절차
 * 1. 똑같이 동작하는 메서드인지 면밀히 살핀다.
 *    -> 실질적으로 하는 일은 같지만 코드가 다르다면 본문 코드가 똑같아질 때까지 리팩터링한다.
 * 2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고 참조할 수 있는지 확인한다.
 * 3. 메서드 시그니처가 다르다면 함수 선언 바꾸기(6.5절)로 슈퍼클래스에서 사용하고 싶은 형태로 통일한다.
 * 4. 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해넣는다.
 * 5. 정적 검사를 수행한다.
 * 6. 서브클래스 중 하나의 메서드를 제거한다.
 * 7. 테스트한다.
 * 8. 모든 서브클래스의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거한다.
 */
// --------------- 예시1 ------------------
// class Employee extends Party {
//   get annualCose() {
//     return this.monthlyCost * 12;
//   }
// }

// class Department extends Party {
//   get totalAnnualCost() {
//     return this.monthlyCost * 12;
//   }
// }

// --------------- Refactoring ------------------
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
  get monthlyCost() {
    throw new SubclassResponsibilityError(); // 서브클래스 책임 오류
  }
}
class Employee extends Party {
}

class Department extends Party {
}