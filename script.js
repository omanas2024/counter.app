document.addEventListener("DOMContentLoaded", function () {
  let counters = JSON.parse(localStorage.getItem("counters")) || [];

  const defaultAdkar = [
    "اختر الذكر",
    "✔ استغفار",
    "✔ الصلاة على النبي ﷺ",
    "✔ سبحان الله",
    "✔ الحمد لله",
    "✔ الله أكبر",
    "✔ لا حول ولا قوة إلا بالله"
  ];

  function renderCounters() {
    const container = document.getElementById("counterContainer");
    container.innerHTML = "";
    counters.forEach((counter, index) => {
      const counterElement = document.createElement("div");
      counterElement.className = "counter";
      counterElement.innerHTML = `
                <select onchange="updateName(${index}, this.value)">
                    ${defaultAdkar
                      .map(
                        (dhikr) =>
                          `<option value="${dhikr}" ${
                            counter.name === dhikr ? "selected" : ""
                          }>${dhikr}</option>`
                      )
                      .join("")}
                </select>
                <input type="text" value="${
                  counter.name
                }" oninput="updateName(${index}, this.value)" placeholder="اسم المسبحة">
                <div class="button-group">
                    <button onclick="decrease(${index})">➖</button>
                    <span id="counter-value-${index}">${counter.value}</span>
                    <button onclick="increase(${index})">➕</button>
                </div>
                <div class="button-group">
                    <button onclick="resetCounter(${index})">🔄</button>
                    <button onclick="setCounter(${index})">⚙</button>
                    <button onclick="deleteCounter(${index})">🗑</button>
                </div>
                <input type="color" class="color-picker" onchange="changeColor(${index}, this.value)" value="${
        counter.color || "#f9f9f9"
      }">
            `;
      counterElement.style.backgroundColor = counter.color || "#f9f9f9";
      container.appendChild(counterElement);
    });
    saveCounters();
  }

  window.addCounter = function () {
    counters.push({ name: defaultAdkar[0], value: 0, color: "#f9f9f9" });
    renderCounters();
  };

  window.increase = function (index) {
    counters[index].value++;
    renderCounters();
  };

  window.decrease = function (index) {
    if (counters[index].value > 0) {
      counters[index].value--;
      renderCounters();
    }
  };

  window.resetCounter = function (index) {
    counters[index].value = 0;
    renderCounters();
  };

  window.setCounter = function (index) {
    let newValue = prompt(
      "أدخل القيمة الجديدة للمسبحة:",
      counters[index].value
    );
    if (newValue !== null && !isNaN(newValue)) {
      counters[index].value = parseInt(newValue);
      renderCounters();
    }
  };

  window.updateName = function (index, newName) {
    counters[index].name = newName;
    saveCounters();
  };

  window.deleteCounter = function (index) {
    counters.splice(index, 1);
    renderCounters();
  };

  window.changeColor = function (index, newColor) {
    counters[index].color = newColor;
    renderCounters();
  };

  function saveCounters() {
    localStorage.setItem("counters", JSON.stringify(counters));
  }

  renderCounters();
});