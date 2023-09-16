const screen = document.querySelector(".screen")
//The expressions
const expresion = document.querySelector(".expresion")
const result = document.querySelector(".result")
const history = document.querySelector(".history")

//The special buttons
const clear = document.querySelector(".clear");
const delet = document.querySelector(".delete");
const equal = document.querySelector(".equal");

//Numbers and operators
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");



numbers.forEach((e) => {
    e.addEventListener("click", () => {
        offResult()
        addExpresion(e.innerHTML);
        bottomScroll()

    })
});
operators.forEach((e) => {
    e.addEventListener("click", () => {
        offResult()
        bottomScroll()
        if (validateOperator())
            addExpresion(e.innerHTML);
            bottomScroll()

    })
});
clear.addEventListener("click", () => {
    offResult()
    clearfunction();
})
delet.addEventListener("click", () => {
    offResult()
    if (expresion.innerHTML.length > 0)
        expresion.innerHTML = expresion.innerHTML.substring(0, expresion.innerHTML.length - 1);
    if (expresion.innerHTML.length === 0)
        result.innerHTML = "0"
    else
        calculate()
})
equal.addEventListener("click", () => {
    if (!result.classList.contains("onField")) {
        history.innerHTML += `
    <li>${expresion.innerHTML + result.innerHTML}</li>`;
        bottomScroll()
        result.classList.add("onField");
        expresion.classList.add("offField");
        console.log(history);
    }
})


function addExpresion(value) {
    expresion.innerHTML += value;
    calculate()
}
function calculate() {
    try {
        let number = math.evaluate(expresion.innerHTML);
        if (number % 1 > 0) {
            number = number.toFixed(4)
        }
        result.innerHTML = "= " + number
    } catch (error) {
        //There are nothing to do
    }
}

function clearfunction() {
    result.innerHTML = "0";
    expresion.innerHTML = ""
}

function offResult() {
    if (result.classList.contains("onField")) {
        result.classList.remove("onField")
        expresion.classList.remove("offField")
        clearfunction();

    }
}
function validateOperator() {
    let value = false;
    let char = expresion.innerHTML.charAt(expresion.innerHTML.length - 1);
    if (!isNaN(char)) {
        value = true;
    }
    return value;
}
function bottomScroll() {
    screen.scrollTop = screen.scrollHeight
}
