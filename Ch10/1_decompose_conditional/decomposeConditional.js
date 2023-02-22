/**
 * 10.1 조건문 분해하기(Decompose Conditional)
 * 
 * if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
 *  charge = quantity * plan.summerRate;
 * else 
 *  charge = quantity * plan.regularRate + plan.regularServiceCharge;
 * 
 * --------------- Refactoring ------------------
 * 
 * if (summer())
 *  charge = summerCharge();
 * else
 *  charge = regularCharge();
 * 
 * 절차
 * 1. 조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출(6.1절)한다.
 */

function ex() {
  if (!acquireData_ex.isBefore(plan.summerStart) && !acquireData_ex.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
  else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;
}