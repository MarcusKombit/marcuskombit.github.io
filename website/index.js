const symbols = [
    { group: "fruits", symbols: ["🍎", "🍌", "🍇", "🍊", "🍉"] },
    { group: "animals", symbols: ["🐶", "🐱", "🐻", "🦁", "🐯"] },
    { group: "emoticons", symbols: ["😀", "😍", "😂", "😎", "🤔"] },
  ];
  
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const spinButton = document.getElementById("spinButton");
  
  let spinning = false;
  
  function spin() {
    if (spinning) return;
  
    spinning = true;
  
    const spins = [spinSlot(slot1), spinSlot(slot2), spinSlot(slot3)];
  
    Promise.all(spins)
      .then((results) => {
        const symbolsByGroup = symbols.reduce((acc, cur) => {
          acc[cur.group] = cur.symbols;
          return acc;
        }, {});
  
        const symbolGroups = results.map((symbol) => {
          for (const group in symbolsByGroup) {
            if (symbolsByGroup[group].includes(symbol)) {
              return group;
            }
          }
        });
  
        const symbolElements = [slot1.querySelector(".symbols"), slot2.querySelector(".symbols"), slot3.querySelector(".symbols")];
  
        symbolElements.forEach((symbolElement, index) => {
          symbolElement.innerHTML = `${results[index]}<br>${symbolGroups[index]}`;
        });
        
      if (symbolGroups[0] === symbolGroups[1] && symbolGroups[1] === symbolGroups[2]) {
        alert("You won!");
      } else {
        alert("You lost!");
      }

      spinning = false;
    })
    .catch(console.error);
}

function spinSlot(slot) {
  const symbolsCount = symbols.length;
  const duration = Math.floor(Math.random() * 2000) + 1000;

  return new Promise((resolve, reject) => {
    let counter = 0;
    const interval = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbolsCount)].symbols[Math.floor(Math.random() * symbolsCount)];
      slot.querySelector(".symbols").textContent = symbol;

      if (++counter === 10) {
        clearInterval(interval);
        resolve(symbol);
      }
    }, duration / 10);
  });
}

spinButton.addEventListener("click", spin);