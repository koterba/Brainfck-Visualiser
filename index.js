let itemid = 0;
let pointer = 0;
let pc = 0;
let data = [0];

function reset() {
    itemid = 0;
    pointer = 0;
    pc = 0;
    data = [0];
}
//
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// false = decrement by 1, true = increment by 1
function movePointer(inc) {
    if (!inc) {
        pointer--;
    } else {
    if (++pointer > data.length-1) {
        data.push(0)
        document.getElementById("datacontainer").
        innerHTML += `<div class="box" id="${pointer}">0</div>`;
    }
    
    }
    updateScreen();
}

// false = decrement by 1, true = increment by 1
function incAtPointer(inc) {
    if (inc) {
        data[pointer]++;
    } else {
        data[pointer]--;
    }
    updateScreen();
}



function updateScreen() {
    for (var i=0; i<data.length; i++) {
        var element = document.getElementById(`${i}`);
        element.innerHTML = data[i];
        element.classList = pointer == i ? "selected" : "box";
    }
}

// get bracket pairs
let stack = [];
let pairs = {};
for (var i=0; i < program.length; i++) {
    let token = program[i];
    if (token == "[") {
        stack.push(i);
    } else if (token == "]") {
        var index = stack.pop();
        pairs[i] = index;
        pairs[index] = i;
    }
}

async function interpret(program) {
  program.replace(/\s/g, '');
  let wait_element = document.getElementById("speed");
  let speed = wait_element.options[wait_element.selectedIndex].text;
  console.log(speed);
  if (speed == "Instant") {
      speed = 0;
  } else if (speed == "Fast") {
      speed = 100;
  } else if (speed == "Slow") {
      speed = 500;
  } else {
      speed = 200;
  }
  document.getElementById("program").innerHTML = program;
  while (pc < program.length) {
    let token = program[pc];
    if (token == "+") {
      incAtPointer(true);
    } else if (token == "-") {
      incAtPointer(false);
    } else if (token == ">") {
      movePointer(true);
    } else if (token == "<") {
      movePointer(false)
    } else if (token == "[") {
      if (!data[pointer]) {
        pc = pairs[pc];
      }
    } else if (token == "]") { 
      pc = pairs[pc]-1;
    } else if (token == ".") {
      document.getElementById("output")
        .innerHTML +=  String.fromCharCode(data[pointer]); //`${data[pointer]} `;
    }
    pc++;
    document.getElementById("program").innerHTML = program + "<br>" + "&nbsp;".repeat(pc-1) + "^";
    await sleep(speed);
  }
}

/// Only enable if running manually
//interpret(program);
