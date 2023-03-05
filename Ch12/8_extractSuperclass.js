/**
 * 12.8 슈퍼클래스 추출하기(Extract Superclass)
 * 
 * class Department {
 *  get totalAnnualCost() {...}
 *  get name() {...}
 *  get headCount() {...}
 * }
 * 
 * class Employee {
 *  get annualCost() {...}
 *  get name() {...}
 *  get id() {...}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Party {
 *  get name() {...}
 *  get annualCost() {...}
 * }
 * 
 * class Department extends Party {
 *  get annualCost() {...}
 *  get headCount() {...}
 * }
 * 
 * class Employee extends Party {
 *  get annualCost() {...}
 *  get id() {...}
 * }
 * 
 * 절차
 * 1. 빈 슈퍼클래스를 만든다. 원래의 클래스들이 새 클래스를 상속하도록 한다.
 *    -> 필요하다면 생성자에 함수 선언 바꾸기(6.5절)를 적용한다.
 * 2. 테스트한다.
 * 3. 생성자 본문 올리기(12.3절), 메서드 올리기(12.1절), 필드 올리기(12.2절)를 차례로 적용하여
 *  공통 원소를 슈퍼클래스로 옮긴다.
 * 4. 서브클래스에 남은 메서드들을 검토한다. 공통되는 부분이 있다면 함수로 추출(6.1절)한 다음 메서드 올리기(12.절)
 *  를 적용한다.
 * 5. 원래 클래스들을 사용하는 코드를 검토하여 슈퍼클래스의 인터페이스를 사용하게 할지 고민해본다.
 */
// --------------- 예시1 ------------------
// class Employee {
//   constructor(name, id, monthlyCost) {
//     this._id = id;
//     this._name = name;
//     this._monthlyCost = monthlyCost;
//   }

//   get monthlyCost() {return this._monthlyCost;}
//   get name() {return this._name;}
//   get id() {return this._id;}

//   get annualCost() { // 연간 비용
//     return this.monthlyCost * 12;
//   }
// }

// class Department {
//   constructor(name, staff) {
//     this._name = name;
//     this._staff = staff;
//   }
//   get staff() {return this._staff.slice();}
//   get name() {return this._name;} // 이름

//   get totalMonthlyCost() { // 총 월간 비용
//     return this.staff
//       .map(e => e.monthlyCost)
//       .reduce((sum, cost) => sum + cost);
//   }
//   get headCount() {
//      return this.staff.length;
//   }
//   get totalAnnualCost() { // 총 연간 비용
//      return this.totalMonthlyCost * 12;
//   }
// }

// --------------- Refactoring ------------------

class Party {
  constructor(name) {
    this._name = name;
  }
  get name() {return this._name;}

  get annualCost() { // 총 연간 비용
    return this.monthlyCost * 12;
  }
}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {return this._monthlyCost;}
  get id() {return this._id;}
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  get staff() {return this._staff.slice();}

  get monthlyCost() { // 총 월간 비용
    return this.staff
      .map(e => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
}