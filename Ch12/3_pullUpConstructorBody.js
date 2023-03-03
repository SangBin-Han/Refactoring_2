/**
 * 12.3 생성자 본문 올리기(Pull Up Constructor Body)
 * 
 * class Party {...}
 * 
 * class Employee extends Party {
 *  constructor(name, id, monthlyCost) {
 *    super();
 *    this._id = id;
 *    this._name = name;
 *    this._monthlyCost = monthlyCost;
 *  }
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Party {
 *  constructor(name) {
 *    this._name = name;
 *  }
 * }
 * 
 * class Employee extends Party {
 *  constructor(name, id, monthlyCost) {
 *    super(name);
 *    this._id = id;
 *    this._monthlyCost = monthlyCost;
 *  }
 * }
 * 
 * 절차
 * 1. 슈퍼클래스에 생성자가 없다면 하나 정의한다. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인한다.
 * 2. 문장 슬라이드하기(8.6절)로 공통 문장 모두를 super() 호출 직후로 옮긴다.
 * 3. 공통 코드를 슈퍼클래스에 추가하고 서브클래스들에서는 제거한다. 생성자 매개변수 중 공통 코드에서 참조하는 값들을
 *    모두 super()로 건넨다.
 * 4. 테스트한다.
 * 5. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 함수 추출하기(6.1절)와 메서드 올리기(12.1절)를 차례로 적용한다.
 */
// --------------- 예시1 ------------------
// class Party {}

// class Employee extends Party {
//   constructor(name, id, monthlyCost) {
//     super();
//     this._id = id;
//     this._name = name;
//     this._monthlyCost = monthlyCost;
//   }
// }
// class Department extends Party {
//   constructor(name, staff) {
//     super();
//     this._name = name;
//     this._staff = staff;
//   }
// }

// --------------- Refactoring ------------------

// class Party {
//   constructor(name) {
//     this._name = name;
//   }
// }

// class Employee extends Party {
//   constructor(name, id, monthlyCost) {
//     super(name);
//     this._id = id;
//     this._monthlyCost = monthlyCost;
//   }
// }
// class Department extends Party {
//   constructor(name, staff) {
//     super(name);
//     this._staff = staff;
//   }
// }

// --------------- 예시2: 공통 코드가 나중에 올 때 ------------------
// class Employee {
//   constructor(name) {}
//   get isPrivileged() {}
//   assignCar() {}
// }
// class Manager extends Employee {
//   constructor(name, grade) {
//     super(name);
//     this._grade = grade;
//     if (this.isPrivileged) this.assignCar(); // 모든 서브클래스가 수행한다.
//   }
//   get isPrivileged() {
//     return this._grade > 4;
//   }
// }

// --------------- Refactoring ------------------

class Employee {
  constructor(name) {}
  get isPrivileged() {}
  assignCar() {}

  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }
}
class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction();
  }
  
  get isPrivileged() {
    return this._grade > 4;
  }
}
