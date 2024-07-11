const inputBox = document.getElementById('input')

const inputValue = document.getElementById("inputvalue")

const result  = document.getElementById('result')

let expression = ''
let resultValue = ''

// Add event handeler for function button

function buttonClick(event){
   const target = event.target;
   const action = target.dataset.action;
   const value  = target.dataset.value;
    
    switch(action){
        case 'number':
            addValue(value)
        break;
    case "clear":
        clear()
        break;
        case "back":
            back()
            break;

        // Add add the result the resultvaluediv stating point if the resultvalue is empty
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(expression === '' && resultValue != ""){
                startFormResult(value)
            }else if(expression !=='' && !isLastCharOperator()){
                addValue(value)
            }
            break;
        case 'submit':
            submit()
            break;
        case 'negate':
            negate()
            break;
        case 'mod':
            percentage()
            break;
        case 'decimal':
            decimal(value)
            break;

    }



    // update display fu
    updateDisplay(expression,resultValue)
}

inputBox.addEventListener("click", buttonClick);

  function addValue(value){
    if (value === '.') {
        // Find the index of the last operator in the expression
        const lastOperatorIndex = expression.search(/[+\-*/]/);
        // Find the index of the last decimal in the expression
        const lastDecimalIndex = expression.lastIndexOf('.');
        // Find the index of the last number in the expression
        const lastNumberIndex = Math.max(
          expression.lastIndexOf('+'),
          expression.lastIndexOf('-'),
          expression.lastIndexOf('*'),
          expression.lastIndexOf('/')
        );
        // Check if this is the first decimal in the current number or if the expression is empty
        if (
          (lastDecimalIndex < lastOperatorIndex ||
            lastDecimalIndex < lastNumberIndex ||
            lastDecimalIndex === -1) &&
          (expression === '' ||
            expression.slice(lastNumberIndex + 1).indexOf('-') === -1)
        ) {
          expression += value;
        }
      } else {
        expression += value;
      }
    }


function updateDisplay(expression,resultValue){
    inputValue.textContent = expression
    result.textContent = resultValue
}

function clear(){
    expression = '';
    resultValue = '';
}

function back(){
    expression = expression.slice(0, -1) ;

}

function isLastCharOperator(){
    return isNaN(parseInt(expression.slice(-1)))
}

function  startFormResult(value){
    expression += resultValue + value
}

function submit(){
    resultValue = evalueExpression()
    expression ='';
}

function evalueExpression(){
    const evalResult = eval(expression);
    // check if evalresult  isnan of infinite.it if is,  return a space characheter

    return isNaN(evalResult) || !isFinite(evalResult) ? ' '
    :evalResult < 1 
    ? parseFloat(evalResult.toFixed(10))
    :parseFloat(evalResult.toFixed(2))

}
function negate(){
    if(expression=== '' && resultValue !== ''){
        // negate the result if expression empty and result is present
        resultValue -= resultValue;
        // toggel the sign of the expression if its not alredy negatvie and its not empty

    }else if(!expression.startsWith('-') && expression != ''){
        expression = '-' + expression
        // remove the negatvie sign from the expression if its alredy negative
    }else if(expression.startsWith("-")){
        expression = expression.slice(1);
    }
}

function percentage(){
    if(expression = ''){
        resultValue = evalueExpression();
        expression = ''
        if(!isNaN(resultValue) && ifFinite(resultValue)){
            result /=100;
        }else{
            resultValue ='';
        }
    }else if(resultValue !== ''){
        resultValue = parseFloat(resultValue) /100;
    }
}
function decimal(value){
    if(!expression.endsWith("-")&& !isNaN(expression.slice(-1))){
        addValue(value)
    }
}