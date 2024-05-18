// -------------------- Переменные иной формы оплаты --------------------------------------------------------------------------------

const reportXExchangeIncome = document.getElementById(
  "reportX__exchangeIncome"
);
const reportXExchangeReturn = document.getElementById(
  "reportX__exchangeReturn"
);


// -------------------- Переменные наличных / возврат --------------------------------------------------------------------------------

const reportXCashReturn = document.querySelector(".reportX__cashReturn");
const adminReportCashReturn = document.querySelector(
  ".adminReport__cashReturn"
);

// -------------------- Функции смены статуса полей ввода --------------------------------------------------------------------------------

let makeCorrect = (...params) => {
  for (let i = 0; i < params.length; i++) {
    if (+params[i].value) {
      params[i].classList.add("inputCorrect");
      params[i].classList.remove("inputWrong");
    } else {
      params[i].classList.remove("inputCorrect");
      params[i].classList.remove("inputWrong");
    }
  }
};

let makeWrong = (...params) => {
  for (let i = 0; i < params.length; i++) {
    params[i].classList.remove("inputCorrect");
    params[i].classList.add("inputWrong");
  }
};

let makeEmpty = (...params) => {
  for (let i = 0; i < params.length; i++) {
    params[i].classList.remove("inputCorrect");
    params[i].classList.remove("inputWrong");
  }
};

let makeEmptyIfNull = (...params) => {
  for (let i = 0; i < params.length; i++) {
    if (!+params[i].value) params[i].classList.remove("inputCorrect");
    params[i].classList.remove("inputWrong");
  }
};

let makeWrongIfNull = (...params) => {
  for (let i = 0; i < params.length; i++) {
    if (!+params[i].value) {
      params[i].classList.remove("inputCorrect");
      params[i].classList.add("inputWrong");
    }
  }
};

let makeWrongIfValue = (...params) => {
  for (let i = 0; i < params.length; i++) {
    if (+params[i].value) {
      params[i].classList.remove("inputCorrect");
      params[i].classList.add("inputWrong");
    }
  }
};

// -------------------- Функции проверки полей ввода --------------------------------------------------------------------------------

// Сравнение двух input'ов
let compareTwo = function(elem1, elem2) {
  if (+elem1.value || +elem2.value) {
    if (+elem1.value === +elem2.value) {
      makeCorrect(elem1, elem2)
    } else {
      makeWrong(elem1, elem2)
    }
  } else {
    makeEmptyIfNull(elem1, elem2)
  }
}

// Отмечает зеленым два равных input'a, остальные делает пустыми
let checkTwoCorrectInputs = function (elem1, elem2, ...params) {
  if (+elem1.value && +elem2.value && +elem1.value === +elem2.value) {
    makeCorrect(elem1, elem2);
    for (let i = 0; i < params.length; i++) {
      makeEmptyIfNull(params[i]);
    }
  }
};

// Проверяет действия по карам по всем трём отчетам
// value1             value2          value3     value4                       value5                  value6
// reportXCardIncome, sberbankIncome, BRSIncome, cashierReportSberbankIncome, cashierReportBRSIncome, cashierReportRaifIncome
// reportXCardReturn, sberbankReturn, BRSReturn, cashierReportSberbankReturn, cashierReportBRSReturn, cashierReportRaifReturn


let checkCardsBasic = function () {
  let xReportTotal = (+reportXCardIncome.value - +reportXCardReturn.value)
  let terminalReportTotal = (+sberbankIncome.value - +sberbankReturn.value + +BRSIncome.value - +BRSReturn.value)
  let cashierReportTotal = (+cashierReportSberbankIncome.value + +cashierReportBRSIncome.value + +cashierReportRaifIncome.value - +cashierReportSberbankReturn.value - +cashierReportBRSReturn.value - +cashierReportRaifReturn.value)

  if ((+reportXCardIncome.value || +reportXCardReturn.value) && 
  (+sberbankIncome.value || +sberbankReturn.value || +BRSIncome.value || +BRSReturn.value) && 
  (+cashierReportSberbankIncome.value || +cashierReportBRSIncome.value || +cashierReportRaifIncome.value || +cashierReportSberbankReturn.value || +cashierReportBRSReturn.value || +cashierReportRaifReturn.value)) {
    if ((xReportTotal === terminalReportTotal) && (xReportTotal === cashierReportTotal)) {
      makeCorrect(
        reportXCardIncome, 
        sberbankIncome,
        BRSIncome,
        cashierReportSberbankIncome,
        cashierReportBRSIncome,
        cashierReportRaifIncome,
        reportXCardReturn,
        sberbankReturn,
        BRSReturn,
        cashierReportSberbankReturn,
        cashierReportBRSReturn,
        cashierReportRaifReturn,
      )
    } else {
      makeWrongIfValue(
        reportXCardIncome, 
        sberbankIncome,
        BRSIncome,
        cashierReportSberbankIncome,
        cashierReportBRSIncome,
        cashierReportRaifIncome,
        reportXCardReturn,
        sberbankReturn,
        BRSReturn,
        cashierReportSberbankReturn,
        cashierReportBRSReturn,
        cashierReportRaifReturn,
      )
    }
  } else {
    makeEmpty(
        reportXCardIncome, 
        sberbankIncome,
        BRSIncome,
        cashierReportSberbankIncome,
        cashierReportBRSIncome,
        cashierReportRaifIncome,
        reportXCardReturn,
        sberbankReturn,
        BRSReturn,
        cashierReportSberbankReturn,
        cashierReportBRSReturn,
        cashierReportRaifReturn,
    )
  }
};

// Если первый input не пустой, очищает другие input'ы
let ifValueCleanAnother = function (elem, ...params) {
  if (+elem.value) {
    for (let i = 0; i < params.length; i++) {
      makeEmptyIfNull(params[i]);
    }
  }
};

// Если первый input не пустой, другие input'ы - неверные
let ifValueWrongAnother = function (elem, ...params) {
  if (+elem.value) {
    for (let i = 0; i < params.length; i++) {
      makeWrongIfNull(params[i]);
    }
  }
};

// Проверка совпадения Х отчета и сумм сверок
let checkXandTerminalTotal = function (elem1, elem2, elem3) {
  if (
    +elem1.value &&
    +elem2.value &&
    +elem3.value &&
    +elem1.value === +elem2.value + +elem3.value
  ) {
    makeCorrect(elem1, elem2, elem3);
  }
};

// -------------------- Проверка наличных / приход --------------------------------------------------------------------------------

const adminReportEntityIncome = document.querySelector(
  ".adminReport__entityIncome"
);
const reportXCashIncome = document.querySelector(".reportX__cashIncome");
const adminReportCashIncome = document.querySelector(
  ".adminReport__cashIncome"
);

let checkCashIncome = () => {
  if (
    +reportXCashIncome.value ||
    +adminReportCashIncome.value ||
    +adminReportEntityIncome.value
  ) {
    if (
      +reportXCashIncome.value ===
      +adminReportCashIncome.value + +adminReportEntityIncome.value
    ) {
      makeCorrect(reportXCashIncome);
      if (+adminReportCashIncome.value) {
        makeCorrect(adminReportCashIncome);
      } else {
        makeEmpty(adminReportCashIncome);
      }
      if (+adminReportEntityIncome.value) {
        makeCorrect(adminReportEntityIncome);
      } else {
        makeEmpty(adminReportEntityIncome);
      }
    } else {
      makeWrong(reportXCashIncome);
      makeWrong(adminReportCashIncome);
      makeWrong(adminReportEntityIncome);
      if (
        +reportXCashIncome.value >
        +adminReportCashIncome.value + +adminReportEntityIncome.value
      ) {
        console.log("Сумма в Х отчете больше");
      } else {
        console.log("Сумма в Х отчете меньше");
      }
    }
  } else {
    makeEmpty(reportXCashIncome);
    makeEmpty(adminReportCashIncome);
    makeEmpty(adminReportEntityIncome);
  }
};


// -------------------- Проверка карт ----------------------------------------------------------------------------------------------------

const reportXCardIncome = document.querySelector(".reportX__cardIncome");
const reportXCardReturn = document.querySelector(".reportX__cardReturn");
const sberbankIncome = document.querySelector(".sberbank__income");
const sberbankReturn = document.querySelector(".sberbank__return");
const BRSIncome = document.querySelector(".BRS__income");
const BRSReturn = document.querySelector(".BRS__return");

const cashierReportSberbankIncome = document.querySelector(
  ".cashierReport__sberbankIncome"
);
const cashierReportSberbankReturn = document.querySelector(
  ".cashierReport__sberbankReturn"
);
const cashierReportBRSIncome = document.querySelector(
  ".cashierReport__BRSIncome"
);
const cashierReportBRSReturn = document.querySelector(
  ".cashierReport__BRSReturn"
);
const cashierReportRaifIncome = document.querySelector(
  ".cashierReport__RaifIncome"
);
const cashierReportRaifReturn = document.querySelector(
  ".cashierReport__RaifReturn"
);
const cardInput = document.querySelectorAll(".cardInput");


let checkCards = () => {
  checkCardsBasic();

  // checkTwoCorrectInputs(BRSIncome, cashierReportBRSIncome);
  // checkTwoCorrectInputs(BRSReturn, cashierReportBRSReturn);

  // checkTwoCorrectInputs(sberbankIncome, cashierReportSberbankIncome);
  // checkTwoCorrectInputs(sberbankReturn, cashierReportSberbankReturn);

  // checkTwoCorrectInputs(reportXCardIncome, sberbankIncome, BRSIncome, cashierReportBRSIncome, cashierReportRaifIncome);
  // checkTwoCorrectInputs(reportXCardIncome, BRSIncome, sberbankIncome, cashierReportSberbankIncome, cashierReportRaifIncome);
  // checkTwoCorrectInputs(reportXCardReturn, BRSReturn, sberbankReturn, cashierReportSberbankReturn, cashierReportRaifReturn);
  // checkTwoCorrectInputs(reportXCardReturn, sberbankReturn, BRSReturn, cashierReportBRSReturn, cashierReportRaifReturn);

  // checkXandTerminalTotal(reportXCardIncome, sberbankIncome, BRSIncome);
  // checkXandTerminalTotal(reportXCardReturn, sberbankReturn, BRSReturn);
};

// -------------------- Проверка карт / Сбербанк сверка / Отмена --------------------------------------------------------------------------------

const sberbankCancel = document.querySelector(".sberbank__cancel");

let checkCancel = () => {
  if (+sberbankCancel.value) {
    makeCorrect(sberbankCancel);
  } else {
    makeEmpty(sberbankCancel);
  }
};

// -------------------- Проверка ТСО --------------------------------------------------------------------------------

const SSTinput = document.querySelectorAll(".SSTinput");

let SST1XReport = document.getElementById("SST1__XReport");
let SST1terminalReport = document.getElementById("SST1__terminalReport");
let SST1cashierReport = document.getElementById("SST1__cashierReport");

let SST2XReport = document.getElementById("SST2__XReport");
let SST2terminalReport = document.getElementById("SST2__terminalReport");
let SST2cashierReport = document.getElementById("SST2__cashierReport");

let SST3XReport = document.getElementById("SST3__XReport");
let SST3terminalReport = document.getElementById("SST3__terminalReport");
let SST3cashierReport = document.getElementById("SST3__cashierReport");

let SST4XReport = document.getElementById("SST4__XReport");
let SST4terminalReport = document.getElementById("SST4__terminalReport");
let SST4cashierReport = document.getElementById("SST4__cashierReport");

// Функция проверки input'ов ТСО
let checkSST = function (xReport, terminalReport, cashierReport) {
  if (xReport.value || terminalReport.value || cashierReport.value) {
    if (
      (xReport.value === terminalReport.value) &&
      (xReport.value === cashierReport.value)
    ) {
      makeCorrect(xReport, terminalReport, cashierReport);
    } else {
      makeWrong(xReport, terminalReport, cashierReport);
    }

    if (xReport.value && terminalReport.value && (xReport.value === terminalReport.value)) {
      makeCorrect(xReport, terminalReport);
    }
    if (xReport.value && cashierReport.value && (xReport.value === cashierReport.value)) {
      makeCorrect(xReport, cashierReport);
    }
    if (terminalReport.value && cashierReport.value && (terminalReport.value === cashierReport.value)) {
      makeCorrect(terminalReport, cashierReport);
    }
  } else {
    makeEmptyIfNull(
      xReport, 
      terminalReport, 
      cashierReport
    )
  }
  saveSSTData();
};

// Функция сброса статуса полей ввода ТСО
let resetSSTinputStatus = function () {
  makeEmptyIfNull(
    SST1XReport,
    SST1terminalReport,
    SST1cashierReport,
    SST2XReport,
    SST2terminalReport,
    SST2cashierReport,
    SST3XReport,
    SST3terminalReport,
    SST3cashierReport,
    SST4XReport,
    SST4terminalReport,
    SST4cashierReport
  );
};

// -------------------- Изменение количества ТСО --------------------------------------------------------------------------------

const sst1 = document.getElementById('SST1')
const sst2 = document.getElementById('SST2')
const sst3 = document.getElementById('SST3')
const sst4 = document.getElementById('SST4')

const SSTAddButton = document.querySelector(".SSTAddButton");
const SSTRemoveButton = document.querySelector(".SSTRemoveButton");
let sstField = document.querySelector(".SSTField");
let sstEnabledList = Array.from(sstField.children).filter(
  (el) => !el.classList.contains("SST__disabled")
);
let sstDisabledList = Array.from(
  document.querySelectorAll(".SSTField .SST__disabled")
);

// Функция сохраняет статус кнопок изменения количества ТСО в LocalStorage
function saveButtonStatus() {
  const isSSTAddButtonDisabled = SSTAddButton.disabled;
  const isSSTRemoveButtonDisabled = SSTRemoveButton.disabled;
  localStorage.setItem(
    "SSTAddButtonDisabled",
    isSSTAddButtonDisabled ? "true" : "false"
  );
  localStorage.setItem(
    "SSTRemoveButtonDisabled",
    isSSTRemoveButtonDisabled ? "true" : "false"
  );
}

// Функция восстаналивает статус кнопок изменения количества ТСО из LocalStorage
function restoreDisabledButtonStatus() {
  const SSTAddButtonSavedValue = localStorage.getItem("SSTAddButtonDisabled");
  const SSTRemoveButtonSavedValue = localStorage.getItem("SSTRemoveButtonDisabled");

  if (SSTAddButtonSavedValue === "true") {
    SSTAddButton.disabled = true;
  } else {
    SSTAddButton.disabled = false;
  }

  if (SSTRemoveButtonSavedValue === "true") {
    SSTRemoveButton.disabled = true;
  } else {
    SSTRemoveButton.disabled = false;
  }
}

// Функция сохраняет статус карточек ТСО в Local Storage
function saveSSTData() {
  let isSST1disabled = sst1.classList.contains('SST__disabled');
  let isSST2disabled = sst2.classList.contains('SST__disabled');
  let isSST3disabled = sst3.classList.contains('SST__disabled');
  let isSST4disabled = sst4.classList.contains('SST__disabled');

  localStorage.setItem("isSST1disabled", isSST1disabled ? "true" : "false");
  localStorage.setItem("isSST2disabled", isSST2disabled ? "true" : "false");
  localStorage.setItem("isSST3disabled", isSST3disabled ? "true" : "false");
  localStorage.setItem("isSST4disabled", isSST4disabled ? "true" : "false");

  saveButtonStatus();
}

// Функция загружает статусы карточек ТСО
function loadSST() {
  const SST1status = localStorage.getItem("isSST1disabled");
  const SST2status = localStorage.getItem("isSST2disabled");
  const SST3status = localStorage.getItem("isSST3disabled");
  const SST4status = localStorage.getItem("isSST4disabled");

  if (SST1status === "true") {
    sst1.classList.add('SST__disabled')
  } else {
    sst1.classList.remove('SST__disabled')
  }
  if (SST2status === "true") {
    sst2.classList.add('SST__disabled')
  } else {
    sst2.classList.remove('SST__disabled')
  }
  if (SST3status === "true") {
    sst3.classList.add('SST__disabled')
  } else {
    sst3.classList.remove('SST__disabled')
  }
  if (SST4status === "true") {
    sst4.classList.add('SST__disabled')
  } else {
    sst4.classList.remove('SST__disabled')
  }

  restoreDisabledButtonStatus()

  sstEnabledList = Array.from(sstField.children).filter(el => !el.classList.contains('SST__disabled'))
  sstDisabledList = Array.from(document.querySelectorAll('.SSTField .SST__disabled'))
}

// Добавить и убрать ТСО
let addSST = () => {
  sstEnabledList[sstEnabledList.length - 1].classList.add("SST__disabled");
  sstEnabledList = Array.from(sstField.children).filter(
    (el) => !el.classList.contains("SST__disabled")
  );
  sstDisabledList = Array.from(
    document.querySelectorAll(".SSTField .SST__disabled")
  );

  if (sstEnabledList.length === 1) {
    SSTRemoveButton.disabled = true;
  } else {
    SSTAddButton.disabled = false;
  }
  saveSSTData();
};

let removeSST = () => {
  sstDisabledList[0].classList.remove("SST__disabled");
  sstEnabledList = Array.from(sstField.children).filter(
    (el) => !el.classList.contains("SST__disabled")
  );
  sstDisabledList = Array.from(
    document.querySelectorAll(".SSTField .SST__disabled")
  );

  if (sstEnabledList.length === 4) {
    SSTAddButton.disabled = true;
  } else {
    SSTRemoveButton.disabled = false;
  }
  saveSSTData();
};


// -------------------- Появление подсказок --------------------------------------------------------------------------------

let tipQuestionMark = document.querySelector(".tipQuestionMark");
let tipLine = document.querySelector(".tipLine");
let tipPic = document.querySelector(".tipPic");

let showTipQuestionMark = () => {
  let targetQuestionMark =
    event.target.parentElement.querySelector(".tipQuestionMark");
  targetQuestionMark.classList.remove("visuallyHidden");
};

let hideTipQuestionMark = () => {
  let targetQuestionMark =
    event.target.parentElement.querySelector(".tipQuestionMark");
  targetQuestionMark.classList.add("visuallyHidden");
};

let showTipImg = () => {
  let targetTipImg = event.target.parentElement.querySelector(".tipPic");
  targetTipImg.classList.remove("visuallyHidden");
  let targetTipLine = event.target.parentElement.querySelector(".tipLine");
  targetTipLine.classList.remove("visuallyHidden");
};

let hideTipImg = () => {
  let targetTipImg = event.target.parentElement.querySelector(".tipPic");
  targetTipImg.classList.add("visuallyHidden");
  let targetTipLine = event.target.parentElement.querySelector(".tipLine");
  targetTipLine.classList.add("visuallyHidden");
};


// -------------------- Обновление даты --------------------------------------------------------------------------------

const dateText = document.querySelector(".dateText");
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

dateText.textContent = date.toLocaleString("ru", options);


// -------------------- Слушатели --------------------------------------------------------------------------------

// Слушатель по нажатию на input

document.addEventListener("input", function (event) {
  if (event.target.classList.contains("checkInput")) {
    checkCards();
    checkCancel();
    checkCashIncome();
    compareTwo(reportXExchangeIncome, reportXExchangeReturn)
    compareTwo(reportXCashReturn, adminReportCashReturn)
  }
  if (
    event.target.classList.contains("SST1__XReport") ||
    event.target.classList.contains("SST1__terminalReport") ||
    event.target.classList.contains("SST1__cashierReport")
  ) {
    checkSST(SST1XReport, SST1terminalReport, SST1cashierReport);
  }
  if (
    event.target.classList.contains("SST2__XReport") ||
    event.target.classList.contains("SST2__terminalReport") ||
    event.target.classList.contains("SST2__cashierReport")
  ) {
    checkSST(SST2XReport, SST2terminalReport, SST2cashierReport);
  }
  if (
    event.target.classList.contains("SST3__XReport") ||
    event.target.classList.contains("SST3__terminalReport") ||
    event.target.classList.contains("SST3__cashierReport")
  ) {
    checkSST(SST3XReport, SST3terminalReport, SST3cashierReport);
  }
  if (
    event.target.classList.contains("SST4__XReport") ||
    event.target.classList.contains("SST4__terminalReport") ||
    event.target.classList.contains("SST4__cashierReport")
  ) {
    checkSST(SST4XReport, SST4terminalReport, SST4cashierReport);
  }
});

// Слушатель событий по загрузке страницы, запускает loadSST()
document.addEventListener("DOMContentLoaded", loadSST);

// Слушатель событий для изменения колчества ТСО
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("SSTRemoveButton")) {
    addSST();
  } else if (event.target.classList.contains("SSTAddButton")) {
    removeSST();
  }
});

// Слушатели для появления подсказок
document.addEventListener("focusin", function (event) {
  if (event.target.classList.contains("input")) {
    showTipQuestionMark();
  }
});
document.addEventListener("focusout", function (event) {
  if (event.target.classList.contains("input")) {
    hideTipQuestionMark();
  }
});
document.addEventListener("mouseover", function (event) {
  if (event.target.classList.contains("tipQuestionMark")) {
    showTipImg();
  }
});
document.addEventListener("mouseout", function (event) {
  if (event.target.classList.contains("tipQuestionMark")) {
    hideTipImg();
  }
});
