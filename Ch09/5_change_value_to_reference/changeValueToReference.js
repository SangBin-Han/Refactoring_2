/**
 * 9.5 값을 참조로 바꾸기(Change Value to Reference)
 * 
 * - 반대 리팩터링: 참조를 값으로 바꾸기(9.4절)
 * 
 * let customer = new Customer(customerData);
 * 
 * --------------- Refactoring ------------------
 * 
 * let customer = customerRepository.get(customerData.id);
 * 
 * 절차
 * 1. 같은 부류에 속하는 객체들을 보관할 저장소를 만든다(이미 있다면 생략).
 * 2. 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는지 확인한다.
 * 3. 호스트 객체의 생성자들을 수정하여 필요한 객체를 이 저장소에서 찾도록 한다. 하나 수정할 때마다 테스트한다.
 */

class Order_Ex {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer_Ex(data.customer); // data.customer가 고객 ID
    // 다른 데이터를 읽어 들인다.
  }
}

class Customer_Ex {
  constructor(id) {
    this._id = id;
  }

  get id() {return this._id;}
}

// --------------- Refactoring ------------------

class Order_Refactoring {
  constructor(data) {
    this._number = data.number;
    this._customer = new registerCustomer(data.customer); // data.customer가 고객 ID
    // 다른 데이터를 읽어 들인다.
  }

  get customer() {return this._customer;}
}

class Customer_Refactoring {
  constructor(id) {
    this._id = id;
  }

  get id() {return this._id;}
}

let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (! _repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer_Refactoring(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}