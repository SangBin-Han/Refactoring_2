/**
 * 6.11 단계 쪼개기(Split Phase)
 * 
 * const orderData = orderString.split(/\s+/);
 * const productPrice = priceList[orderData[0].split("-")[1]];
 * const orderPrice =parseInt(orderData[1]) * productPrice;
 * 
 * --------------- Refactoring ------------------
 * 
 * const orderRecord = parseOrder(order);
 * const orderPrice = price(orderRecord, priceList);
 * 
 * function parseOrder(aString) {
 *  const values = aString.split(/\s+/);
 *  return ({
 *    productID: values[0].split("-")[1],
 *    quantity: parseInt(values[1]),
 *  })
 * }
 * function price(order, priceList) {
 *  return order.quantity * priceList[order.productID];
 * }
 * 
 */

function ex1() {
  function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
      * product.basePrice * product.discountRate;
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
      ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;
    return price;
  }
}

function refactoring1() {
  function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity); // 중간 데이터 구조
    return applyShipping(priceData, shippingMethod);
  }
  function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
      * product.basePrice * product.discountRate;
    return {basePrice: basePrice, quantity: quantity, discount: discount};
  }
  function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
      ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    return priceData.basePrice - priceData.discount + shippingCost;
  }
}
