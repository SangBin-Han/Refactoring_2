/**
 * 11.8 생성자를 팩터리 함수로 바꾸기(Replace Constructor with Factory Function)
 * 
 * - 1판에서의 이름: 생성자를 팩토리 메서드로 전환
 * 
 * leadEngineer = new Employee(document.leadEngineer, "E");
 * 
 * --------------- Refactoring ------------------
 * 
 * leadEngineer = createEngineer(document.leadEngineer);
 * 
 * 절차
 * 1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
 * 2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
 * 3. 하나씩 수정할 때마다 테스트한다.
 * 4. 생성자의 가시 범위가 최소가 되도록 제한한다.
 */
// --------------- 예시1 ------------------
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {return this._name;}
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return {"E": "Engineer", "M": "Manager", "S": "Salesperson"};
  }
}

// 호출자
candidate = createEmployee(document.name, document.empType);

// 호출자
const leadEngineer = createEngineer(document.leadEngineer);

function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
function createEngineer(name) {
  return new Employee(name, 'E');
}