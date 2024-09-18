let btnCalc = document.querySelector(".btn-calc");
let inputs = document.querySelectorAll(".inputs-flex input");
let smalls = document.querySelectorAll(".smalls-flex > *");
let labels = document.querySelectorAll(".labels-flex label");
let yearsResult = document.querySelector(".years span");
let monthsResult = document.querySelector(".months span");
let daysResult = document.querySelector(".days span");

let minYear = 1800;

function addWrong(input, message) {
  let index = Array.from(input.parentElement.children).indexOf(input);
  input.classList.add("wrong");
  smalls[index].textContent = message;
  labels[index].classList.add("wrong");
}

function setDefault(input) {
  let index = Array.from(input.parentElement.children).indexOf(input);
  input.classList.remove("wrong");
  smalls[index].textContent = "";
  labels[index].classList.remove("wrong");
}

function checkEmpy() {
  inputs.forEach((input, index) => {
    if (input.value == "") {
      addWrong(input, "This field is required");
    } else {
      setDefault(input);
    }
  });
}

function checkValid() {
  return new Promise((resolved, rejected) => {
    let arrCheck = [];
    inputs.forEach((input, index) => {
      if (input.name == "year") {
        if (input.value < minYear || input.value > new Date().getFullYear()) {
          addWrong(input, "Enter a valid year");
          rejected("False");
        } else {
          setDefault(input);
          arrCheck.push(true);
        }
      }
      if (input.name == "month") {
        if (input.value < 1 || input.value > 12) {
          addWrong(input, "Enter a valid month");
          rejected("False");
        } else {
          setDefault(input);
          arrCheck.push(true);
        }
      }
      if (input.name == "day") {
        if (input.value < 1 || input.value > 31) {
          addWrong(input, "Enter a valid day");
          rejected("False");
        } else {
          setDefault(input);
          arrCheck.push(true);
        }
      }
    });
    if (arrCheck.length == 3) {
      resolved("True");
    }
  });
}

btnCalc.onclick = function () {
  checkValid()
    .then((resolve) => {
      let inputsFormatted = (Array.from(inputs)[
        (inputs[0], inputs[1], inputs[2])
      ] = [inputs[1], inputs[0], inputs[2]]);

      let dateInp = new Date(
        inputsFormatted.map((input) => input.value).join("-")
      );
      let dateNow = new Date();
      let years = dateNow.getFullYear() - dateInp.getFullYear();

      let months = dateNow.getMonth() - dateInp.getMonth();

      let days = dateNow.getDate() - dateInp.getDate();
      if (days < 0) {
        months--;
        const lastMonth = new Date(
          dateNow.getFullYear(),
          dateNow.getMonth(),
          0
        );
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      months < 10 ? (months = "0" + months) : (months = months);
      days < 10 ? (days = "0" + days) : (days = days);

      yearsResult.textContent = years;
      monthsResult.textContent = months;
      daysResult.textContent = days;
    })
    .catch(() => {
      yearsResult.textContent = "--";
      daysResult.textContent = "--";
      monthsResult.textContent = "--";
    });
};
