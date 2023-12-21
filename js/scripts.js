// 1. Завдання: Поміняти місяцми текст
function swapText() {
    let text = document.getElementById("div_text1").innerHTML;
    document.getElementById("div_text1").innerHTML = document.querySelector(".second").innerHTML;
    document.querySelector(".second").innerHTML = text;
}

// 2. Завдання: порахувати площу круга (радіус береться випадковий)
function calculateCircleArea(radius) {
    return Math.PI * radius * radius;
}

function displayCircleArea() {
    // Випадкове число від 1 до 10
    let randomRadius = Math.floor(Math.random() * 10) + 1;

    let circleArea = calculateCircleArea(randomRadius);

    document.getElementById("circle_area").textContent = "Площа кола з радіусом " + randomRadius + " дорівнює: " + circleArea.toFixed(2);
}

// Встановлення сесіонних кукі
function setCookie(name, value) {
    document.cookie = name + '=' + value + '; path=/';
}

// Видалення усіх кукі
function deleteAllCookies() {
    let cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
       let cookie = cookies[i];
  
       let eqPos = cookie.indexOf("=");
  
       let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
  
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
// 3. Завдання: знайти мінімальну цифру в заданому натуральному числі та зберегти в cookie
function findMinDigit() {
    let userInput = document.getElementById("userInput").value;

    // Переввірка числа на натуральність
    if (!/^\d+$/.test(userInput)) {
        alert("Помилка: ви ввели не натуральне число");
        return;
    }

    let number = parseInt(userInput, 10);
    let digits = number.toString().split('').map(Number);
    let minDigit = Math.min(...digits);

    alert("Найменша цифра в числі " + number + " дорівнює: " + minDigit);

    let cookieName = "minDigitOf_" + number;

    setCookie(cookieName, minDigit);
}

document.addEventListener("DOMContentLoaded", function() {
    // перевірка наявності кукі
    if (document.cookie) {
        document.getElementById("form1").style.display = "none";
        setTimeout(function() {
            let reload = confirm("Куки: " + document.cookie + ".\nЗберегти куки?");
            if (reload) {
                alert("Увага, у вас присутні куки. Перезавантажте сторінку, щоб їх побачити.")
            } else {
                deleteAllCookies();
                location.reload();
            }
        }, 100)
    }
    // встановлення для блоку 6 кольору, який зберігається в localStorage
    const storedColor = localStorage.getItem('block6Color');
    if (storedColor) {
      document.querySelector(".second").style.color = storedColor;
    }
    // видалення з localStorage дані про створенні таблиці (це завдання 5 пункт Г )
    clearAllTableData();
});

// валідація кольору (колір можна ввести як звичайною назвою або HEX)
function isValidColor(color) {
    const hexRegex = /^#[0-9A-F]{6}$/i;
  
    return hexRegex.test(color) || isValidColorName(color);
}
// перевірка чи ввів користувач правильну назву кольору.
function isValidColorName(color) {
    const span = document.createElement('span');
    span.style.color = color;
  
    return span.style.color !== '';
}
//4. Завдання: при події select змінити на вказаний користувачем колір в блоці
// (Як я зрозумів в цьому завданні мається на увазі змінювати колір, 
// коли був виділений будь-який текст на сторінці, тому я замінив подію select на mouseup з перевіркою чи був виділений текст)
document.addEventListener("mouseup", function () {
    const selected = document.getSelection();
    
    if (selected.toString()) {
        const selectedColor = prompt('Введіть колір тексту:');

        if (selectedColor) {
            if (!isValidColor(selectedColor)) {
                alert('Неправильний формат кольору');
                selected.removeAllRanges();
                return;
            }
            document.querySelector(".second").style.color = selectedColor;

            localStorage.setItem('block6Color', selectedColor);
        }
        selected.removeAllRanges();
    }
});
// перевірка на виділений текст на телефонах
document.addEventListener("touchend", function () {
    const selected = document.getSelection();
    
    if (selected.toString()) {
        const selectedColor = prompt('Введіть колір тексту:');

        if (selectedColor) {
            if (!isValidColor(selectedColor)) {
                alert('Неправильний формат кольору');
                selected.removeAllRanges();
                return;
            }
            document.querySelector(".second").style.color = selectedColor;

            localStorage.setItem('block6Color', selectedColor);
        }
        selected.removeAllRanges();
    }
});

// показати форму при виведенні курсора за межі зображення в цьому блоці
function show(blockNumber) {
    if (document.getElementById(`block${blockNumber}`).style.display != 'block') {
        document.getElementById(`block${blockNumber}`).style.display = 'block';
    }
}

// сховати форму при встановлені курсора на зображенні в блоці
function hide(blockNumber) {
    document.getElementById(`block${blockNumber}`).style.display = 'none';
    if (document.getElementById(`inputBlock${blockNumber}`).value != null) {
        document.getElementById(`inputBlock${blockNumber}`).value = null
    }
    if (document.getElementById(`tableContainerBlock${blockNumber}`).innerHTML != '') {
        document.getElementById(`tableContainerBlock${blockNumber}`).innerHTML = ''
    }
    if (document.getElementById(`saveButtonBlock${blockNumber}`).style.display != 'none') {
        document.getElementById(`saveButtonBlock${blockNumber}`).style.display = 'none';
    }
}

// Створення таблиці для заповнення
function createTable(numberOfCells) {
    const table = document.createElement('table');
    const rows = (numberOfCells % 2 === 0) ? 2 : 1;
    const cellsInRow = (numberOfCells % 2 !== 0) ? numberOfCells : numberOfCells / 2;

    // Якщо кількість клітинок парна, то таблиця має два рядки, а якщо непарна то один рядок
    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();

        for (let j = 0; j < cellsInRow; j++) {
            const cell = row.insertCell();
            const cellInput = document.createElement('input');
            cellInput.type = 'text';
            cellInput.placeholder = `Cell ${i * cellsInRow + j + 1}`;
            cellInput.size=10;
            cellInput.maxLength=15;
            cell.appendChild(cellInput);
        }
    }
    return table;
}


function confirmTable(blockNumber) {
    const inputElement = document.getElementById(`inputBlock${blockNumber}`);
    const tableContainer = document.getElementById(`tableContainerBlock${blockNumber}`);
    const saveButton = document.getElementById(`saveButtonBlock${blockNumber}`);

    const value = parseInt(inputElement.value)
    if (isNaN(value)) {
        return;
    }
    if (value < 1 || value > 100)  {
        return;
    }

    const numberOfCells = parseInt(inputElement.value, 10);

    // створення таблиці
    const table = createTable(numberOfCells);

    tableContainer.innerHTML = '';

    tableContainer.appendChild(table);
    saveButton.style.display = 'block';
}

// збереження даних таблиці в localStorage
function saveTableData(blockNumber) {
    
    const tableContainer = document.getElementById(`tableContainerBlock${blockNumber}`);
    const inputElements = tableContainer.querySelectorAll('input[type="text"]');
    const tableData = [];
    
    inputElements.forEach(input => {
        tableData.push(input.value);
    });

    // Зберігаємо введені дані таблиці в localStorage
    const localStorageKey = `tableDataBlock${blockNumber}`;
    localStorage.setItem(localStorageKey, JSON.stringify(tableData));
    
    // Видаляємо таблицю, яка була для заповнення
    tableContainer.innerHTML = '';
    const form = document.getElementById(`form${blockNumber}`);
    form.style.display = 'none';

    // Створюємо звичайну таблицю, беручи введені для неї дані із localStorage
    const savedTableData = JSON.parse(localStorage.getItem(localStorageKey));
    const savedTable = createSavedTable(savedTableData);
    
    const tableBlock = document.getElementById(`tableBlock${blockNumber}`);
    
    tableBlock.appendChild(savedTable);
}

// створення звичайної таблиці (з тими даними із localStorage), яка створюється в кінці блока.
function createSavedTable(tableData) {
    const table = document.createElement('table');
    const numberOfCells = tableData.length;

    const rows = (numberOfCells % 2 === 0) ? 2 : 1;
    const cellsInRow = (numberOfCells % 2 !== 0) ? numberOfCells : numberOfCells / 2;

    table.style.border = '2px solid black';
    table.style.borderCollapse = 'collapse';
    table.style.boxSizing = 'border-box';
    table.style.tableLayout = 'fixed';

    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();

        for (let j = 0; j < cellsInRow; j++) {
            const cell = row.insertCell();
            const cellText = document.createTextNode(tableData[i * cellsInRow + j]);
            cell.appendChild(cellText);
            cell.style.border = '1px solid black';
            cell.style.padding = '10px'; 
            cell.style.textAlign = 'center';
        }
    }
    table.style.margin = '0 auto';
    return table;
}

// 5. г) перезавантаження веб-сторінки призводить до видалення нового вмісту із
// localStorage броузера.
// Якщо я правильно зрозумів, то потрібно видаляти дані про таблиці 
function clearAllTableData() {
    for (let key in localStorage) {
        if (key.startsWith('tableDataBlock')) {
            localStorage.removeItem(key);
        }
    }
}