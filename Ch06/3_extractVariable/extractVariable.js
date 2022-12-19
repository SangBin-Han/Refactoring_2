/**
 * 6.3 변수 추출하기(Extract Variable)
 * 
 * 반대 리팩터링: 변수 인라인하기
 * 1판에서의 이름: 직관적 임시변수 사용
 * 
 * 예시)
 * return order.quantity * order.itemPrice
 * - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
 * + Math.min(order.quantity * order.itemPrice * 0.1, 100);
 * 
 * --------------- Refactoring ------------------
 * 
 * const basePrice = order.quantity * order.itemPrice;
 * const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
 * const shipping = Math.min(basePrice * 0.1, 100);
 * return basePrice - quantityDiscount + shipping;
 * 
 * Q1. 변수 추출을 잘 하려면?
 * 
 * 1. 추출하려는 표현식에 부작용은 없는지 확인한다.
 * 2. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
 * 3. 원본 표현식을 새로 만든 변수로 교체한다.
 * 4. 테스트한다.
 * 5. 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트한다.
 */

// ex1
function price() {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

// ex2
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {return this._data.quantity;}
  get itemPrice() {return this._data.itemPrice;}

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }
  get basePrice() {return this.quantity * this.itemPrice;}
  get quantityDiscount() {return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;}
  get shipping() {return Math.min(this.quantity * this.itemPrice * 0.1, 100);}
}