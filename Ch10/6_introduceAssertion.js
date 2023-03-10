/**
 * 10.6 어서션 추가하기(Introduce Assertion)
 * 
 * if (this.discountRate)
 *  base = base - (this.discountRate * base);
 * 
 * --------------- Refactoring ------------------
 * 
 * assert(this.discountRate >= 0);
 * if (this.discountRate)
 *  base = base - (this.discountRate * base);
 * 
 * 절차
 * 1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.
 */
class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      assert(this.discountRate >= 0);
      return aNumber - (this.discountRate * aNumber);
    }
  }
  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0);
    this._discountRate = aNumber;
  }
}