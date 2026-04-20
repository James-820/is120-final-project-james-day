// Get document elements for reference:
// ________________________________________________________________________________
// ________________________________________________________________________________

let card_container = document.querySelector("#card-container");
let input_container = document.querySelector("#input-container");
let add_btn = document.querySelector("#add-btn");
let save_btn = document.querySelector("#save-btn");
let cancel_btn = document.querySelector("#cancel-btn");

if (localStorage.getItem("lift-list") === null) {
  // console.log("Empty local storage");
  localStorage.setItem("lift-list", JSON.stringify([]));
}
let lift_list = JSON.parse(localStorage.getItem("lift-list"));

let currently_adding = false;
let warning_added = false;
let name_id = "name-input";
let weight_id = "weight-input";
let reps_id = "reps-input";

// Function declarations:
// ________________________________________________________________________________
// ________________________________________________________________________________

// Make an empty placeholder:
// ________________________________________
function makeEmpty() {
  let placeholder = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.textContent = "No Lifts To Track";
  let p = document.createElement("p");
  p.textContent = 'To start, click the "Add Lift" button above.';
  placeholder.appendChild(h3);
  placeholder.appendChild(p);
  placeholder.classList += "flex-column-center";
  placeholder.style.padding = "1rem";
  return placeholder;
}

// Make/clear input fields:
// ________________________________________
function makeInputs(n_val = "", w_val = null, r_val = "") {
  input_container.innerHTML = "";
  cancel_btn.style.display = "inline-block";
  // add_btn.textContent = "Save Changes";
  // Add inputs and labels:
  // Name:
  let name_container = document.createElement("div");
  let name_input = document.createElement("input");
  name_input.value = n_val;
  name_input.placeholder = 'Ex: "Bench Press"';
  name_input.id = name_id;
  let name_label = document.createElement("label");
  name_label.for = "name-input";
  name_label.textContent = "Name of lift:";
  name_container.appendChild(name_label);
  name_container.appendChild(name_input);
  // Weight:
  let weight_container = document.createElement("div");
  let weight_input = document.createElement("input");
  weight_input.value = w_val;
  weight_input.type = "number";
  weight_input.placeholder = "Ex: 125";
  weight_input.id = weight_id;
  let weight_label = document.createElement("label");
  weight_label.for = "weight-input";
  weight_label.textContent = "Weight (lbs):";
  weight_container.appendChild(weight_label);
  weight_container.appendChild(weight_input);
  // Reps/Sets:
  let reps_container = document.createElement("div");
  let reps_input = document.createElement("input");
  reps_input.value = r_val;
  reps_input.id = "reps-input";
  reps_input.placeholder = "Ex: 8, 7, 7";
  let reps_label = document.createElement("label");
  reps_label.for = reps_id;
  reps_label.textContent = "Reps per Set:";
  reps_container.appendChild(reps_label);
  reps_container.appendChild(reps_input);
  // Append to the inputs container:
  input_container.appendChild(name_container);
  input_container.appendChild(weight_container);
  input_container.appendChild(reps_container);
  input_container.style.padding = "1rem";
}

function clearInputs() {
  input_container.innerHTML = "";
  input_container.style.padding = "0";
  cancel_btn.style.display = "none";
  save_btn.style.display = "none";
  add_btn.style.display = "inline-block";
  add_btn.textContent = "Add Lift";
  add_btn.classList = "";
  currently_adding = false;
  warning_added = false;
}

// Edit a lift card:
// ________________________________________
function saveEdit(index) {
  // Change object values:
  lift_list[index].name = document.querySelector("#" + name_id).value;
  lift_list[index].weight = document.querySelector("#" + weight_id).value;
  lift_list[index].reps = document.querySelector("#" + reps_id).value;
  // Re-render:
  clearInputs();
  displayAll();
}

function editLift(index) {
  currently_adding = false;
  makeInputs(
    lift_list[index].name,
    lift_list[index].weight,
    lift_list[index].reps,
  );
  // Define helper functions:
  function handleSave() {
    saveEdit(index);
    cleanup();
  }
  function handleCancel() {
    clearInputs();
    cleanup();
  }
  function cleanup() {
    save_btn.removeEventListener("click", handleSave);
    cancel_btn.removeEventListener("click", handleCancel);
  }
  // Show/hide buttons:
  save_btn.style.display = "inline-block";
  add_btn.style.display = "none";
  cancel_btn.style.display = "inline-block";
  cancel_btn.textContent = "Cancel Changes";
  // Add custom event listener:
  save_btn.addEventListener("click", handleSave);
  cancel_btn.addEventListener("click", handleCancel);
}

// Delete a lift card:
// ________________________________________
function deleteLift(index) {
  lift_list.splice(index, 1);
  localStorage.setItem("lift-list", JSON.stringify(lift_list));
  displayAll();
}

// Make a lift card:
// ________________________________________
function makeCard(obj) {
  let card = document.createElement("div");
  card.classList = "flex-column-center card";
  card.style.rowGap = "0.5rem";
  // Lift info:
  let name = document.createElement("h3");
  name.textContent = obj.name;
  card.appendChild(name);
  let weight = document.createElement("p");
  weight.textContent = "Last Weight: " + obj.weight;
  card.appendChild(weight);
  let reps = document.createElement("p");
  reps.textContent = "Reps: " + obj.reps;
  card.appendChild(reps);
  // Edit/Delete buttons:
  let buttons = document.createElement("div");
  buttons.style = "display: flex; justify-content: center; column-gap: 0.5rem;";
  let btn1 = document.createElement("button");
  btn1.textContent = "Edit";
  btn1.addEventListener("click", () => editLift(obj.index));
  let btn2 = document.createElement("button");
  btn2.classList = "color-delete";
  btn2.textContent = "Delete";
  btn2.addEventListener("click", () => deleteLift(obj.index));
  buttons.appendChild(btn1);
  buttons.appendChild(btn2);
  card.appendChild(buttons);
  card_container.appendChild(card);
}

// Display all lifts from localstorage:
// ________________________________________
function displayAll() {
  card_container.innerHTML = "";
  if (lift_list.length === 0) {
    // Early return for empty list:
    card_container.appendChild(makeEmpty());
    return;
  }
  console.log(lift_list);
  for (const obj of lift_list) {
    makeCard(obj);
  }
}

// Add new lift object to localstorage array:
// ________________________________________
function addLift() {
  let clear = () => clearInputs();
  function cleanup() {
    cancel_btn.removeEventListener("click", clear);
  }
  // Check if currently adding lift:
  if (currently_adding) {
    // Add a lift with the inputs:
    // Make the lift object:
    let object = {};
    object.name = document.querySelector("#" + name_id).value;
    object.weight = document.querySelector("#" + weight_id).value;
    object.reps = document.querySelector("#" + reps_id).value;
    object.index = lift_list.length;
    // Check for invalid inputs:
    if (object.name === "" || object.weight === "" || object.reps === "") {
      if (!warning_added) {
        let warning = document.createElement("p");
        warning.textContent = "All fields must be filled out";
        warning.style = "color: #b30000; font-weight: bold;";
        input_container.appendChild(warning);
        warning_added = true;
      }
      return;
    }
    // Append to the list:
    lift_list.push(object);
    // Save to localStorage:
    localStorage.setItem("lift-list", JSON.stringify(lift_list));
    // Remove input fields:
    clearInputs();
    cleanup();
    // Refresh the list display for user:
    displayAll();
  } else {
    // Set adding variable to true:
    currently_adding = true;
    // Show inputs:
    makeInputs();
    add_btn.classList = "color-add";
    add_btn.textContent = "Submit";
    cancel_btn.textContent = "Cancel Add";
    cancel_btn.addEventListener("click", clear, { once: true });
  }
}

// On load:
// ________________________________________________________________________________
// ________________________________________________________________________________

// Display lift cards:
displayAll();
add_btn.addEventListener("click", addLift);
// cancel_btn.addEventListener("click", clearInputs);
