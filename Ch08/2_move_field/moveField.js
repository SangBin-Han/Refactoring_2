/**
 * 8.2 필드 옮기기(Move Field)
 * 
 * class Customer {
 *  get plan() {return this._plan;}
 *  get discountRate() {return this._discountRate;}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Customer {
 *  get plan() {return this._plan;}
 *  get discountRate() {return this.plan.discountRate;}
 * }
 * 
 * 절차
 * 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
 * 2. 테스트한다.
 * 3. 타깃 객체에 필드(와 접근자 메서드들)를 생성한다.
 * 4. 정적 검사를 수행한다.
 * 5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인하다.
 * -> 기존 필드나 메서드 중 타깃 객체를 넘겨주는 게 있을지 모른다. 없다면 이런 기능의 메서드를 쉽게 만들 수 
 *    있는지 살펴본다. 간단치 않다면 타깃 객체를 저장할 새 필드를 소스 객체에 생성하자.
 *    이는 영구적인 변경이 되겠지만, 더 넓은 맥락에서 리팩터링을 충분히 하고 나면 다시 없앨 수 있을 때도 있다.
 * 6. 접근자들이 타깃 필드를 사용하도록 수정한다.
 * -> 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하게 하고, 이어서
 *    일관성을 깨드리는 갱신을 검출할 수 있도록 어서션을 추가(10.6절)하자. 모든 게 잘 마무리되었다면 접근자들이 타깃
 *    필드를 사용하도록 수정한다.
 * 7. 테스트한다.
 * 8. 소스 필드를 제거한다.
 * 9. 테스트한다.
 */

class Customer_Ex {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract_Ex(dateToday());
  }
  get discountRate() {return this._discountRate;}
  becomePreferred() {
    this._discountRate += 0.03;
    // 다른 멋진 일들
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

class CustomerContract_Ex {
  constructor(startDate) {
    this._startDate = startDate;
  }
}

// --------------- Refactoring ------------------

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }

  get discountRate() {return this._contract.discountRate;}
  _setDiscountRate(aNumber) {this._contract.discountRate = aNumber;}
  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
    // 다른 멋진 일들
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {return this._discountRate;}
  set discountRate(arg) {this._discountRate = arg;}
}

class Account_Ex {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    this._interestRate = interestRate;
  }

  get interestRate() {return this._interestRate;}
}

class AccountType_Ex {
  constructor(nameString) {
    this._name = nameString;
  }
}

// --------------- Refactoring2 ------------------

class Account {
  constructor(number, type) {
    this._number = number;
    this._type = type;
    assert(interestRate === this._type.interestRate);
    this._interestRate = interestRate;
  }

  get interestRate() {return this._type.interestRate;}
}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }

  get interestRate() {return this._interestRate;}
}
