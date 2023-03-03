/**
 * 12.6 타입 코드를 서브클래스로 바꾸기(Replace Type Code with Subclasses)
 * 
 * - 반대 리팩터링: 서브클래스 제거하기(12.7절)
 * - 하위 리팩터링
 *  - 타입 코드를 상태/전략 패턴으로 바꾸기
 *  - 서브클래스 추출하기
 * 
 * function createEmployee(name, type) {
 *  return new Employee(name, type);
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * function createEmployee(name, type) {
 *  switch (type) {
 *    case "engineer": return new Engineer(name);
 *    case "salesperson": return new Salesperson(name);
 *    case "manager": return new Manager(name);
 *  }
 * }
 * 
 * 절차
 * 1. 타입 코드 필드를 자가 캡슐화한다.
 * 2. 타입 코드 값 하나를 선택하여 그 값에 해당하는 서브클래스를 만든다. 타입 코드 게터 메서드를 오버라이드하여
 *    해당 타입 코드의 리터럴 값을 반환하게 한다.
 * 3. 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만든다.
 *    -> 직접 상속일 때는 생성자를 팩터리 함수로 바꾸기(11.8절)를 적용하고 선택 로직을 팩터리에 넣는다.
 *      간접 상속일 때는 선택 로직을 생성자에 두면 될 것이다.
 * 4. 테스트한다.
 * 5. 타입 코드 값 각각에 대해 서브클래스 생성과 선택 로직 추가를 반복한다. 클래스 하나가 완성될 때마다 테스트한다.
 * 6. 타입 코드 필드를 제거한다.
 * 7. 테스트한다.
 * 8. 타입 코드 접근자를 이용하는 메서드 모두에 메서드 내리기(12.4절)와 조건부 로직을 다형성으로 바꾸기(10.4절)를 적용한다.
 */
// --------------- 예시1: 직접 상속할 때 ------------------
// class Employee {
//   constructor(name, type) {
//     this.validateType(type);
//     this._name = name;
//     this._type = type;
//   }
//   validateType(arg) {
//     if (!["engineer", "manager", "salesperson"].includes(arg))
//       throw new Error(`${arg}라는 직원 유형은 없습니다.`);
//   }
//   toString() {return `${this._name} (${this._type})`;}
// }

// --------------- Refactoring ------------------

// class Employee {
//   constructor(name) {
//     this._name = name;
//   }
//   toString() {return `${this._name} (${this.type})`;}
// }
// class Engineer extends Employee {
//   get type() {return "engineer";}
// }
// class Salesperson extends Employee {
//   get type() {return "salesperson";}
// }
// class Manager extends Employee {
//   get type() {return "manager";}
// }
// function createEmployee(name, type) {
//   switch (type) {
//     case "engineer": return new Engineer(name);
//     case "salesperson": return new Salesperson(name);
//     case "manager": return new Manager(name);
//     default: throw new Error(`${type}라는 직원 유형은 없습니다.`);
//   }
// }

// --------------- 예시2: 간접 상속할 때 ------------------
// class Employee {
//   constructor(name, type) {
//     this.validateType(type);
//     this._name = name;
//     this._type = type;
//   }
//   validateType(arg) {
//     if (!["engineer", "manager", "salesperson"].includes(arg))
//       throw new Error(`${arg}라는 직원 유형은 없습니다.`);
//   }
//   get type() {return this._type;}
//   set type(arg) {this._type = arg;}

//   get capitalizedType() {
//     return this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase();
//   }
//   toString() {
//     return `${this._name} (${this.capitalizedType})`;
//   }
// }

// --------------- Refactoring ------------------

class Employee {
  constructor(name, type) {
    this._name = name;
    this.type = type;
  }
  get typeString() {return this._type.toString();}
  get type() {return this._type;}
  set type(arg) {this._type = Employee.createEmployeeType(arg);}
  static createEmployeeType(aString) {
    switch (aString) {
      case "engineer": return new Engineer();
      case "manager": return new Manager();
      case "salesperson": return new Salesperson();
      default: throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }

  get capitalizedType() {
    return this.typeString.charAt(0).toUpperCase() 
    + this.typeString.substr(1).toLowerCase();
  }
  toString() {
    return `${this._name} (${this.type.capitalizedType})`;
  }
}
class EmployeeType {}
class Engineer extends EmployeeType {
  toString() {return "engineer";}
}
class Manager extends EmployeeType {
  toString() {return "manager";}
}
class Salesperson extends EmployeeType {
  toString() {return "salesperson";}
}