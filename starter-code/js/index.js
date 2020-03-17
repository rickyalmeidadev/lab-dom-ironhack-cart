let product = document.querySelectorAll(".product");
let removeBtn = document.querySelectorAll(".btn-remove");
const table = document.querySelector("tbody");
const createBtn = document.querySelector("#create");

function updateSubtotal() {
	let price = document.querySelectorAll(".price span");
	let subtotal = document.querySelectorAll(".subtotal span");
	let acc = 0;
	[...price].map((eachPrice, i) => {
		let unit = document.querySelectorAll("input[type='number']");
		unit = [...unit][i].value;
		let parcial = Number(eachPrice.innerHTML) * unit;
		[...subtotal][i].innerHTML = parcial;
		acc += parcial;
	});
	return acc;
}

window.addEventListener("load", () => {
	const $calculateTrigger = document.getElementById("calculate");

	$calculateTrigger.addEventListener("click", calculateAll);
});

[...removeBtn].map(elem =>
	elem.addEventListener("click", function(e) {
		productRemoveListener(e);
	})
);

createBtn.addEventListener("click", function(e) {
	createProduct(e);
});

function calculateAll() {
	let total = document.querySelector("#total-value span");
	let totalSum = updateSubtotal();
	total.innerHTML = totalSum;
}

function productRemoveListener(event) {
	let currentProduct = event.target.parentNode.parentNode;
	table.removeChild(currentProduct);
	calculateAll();
}

function createProduct(event) {
	let productName = document.querySelector(".create-product input[type='text']");
	let productPrice = document.querySelector(".create-product input[type='number']");

	if (productPrice.value != "" && productName.value != "") {
		table.innerHTML += `
        <tr class= "product">
            <td class="name">
                <span>${productName.value}</span>
            </td>
            <td class="price">$<span>${productPrice.value}</span></td>
            <td class="quantity">
                <input type="number" value="0" min="0" placeholder="Quantity" />
            </td>
            <td class="subtotal">$<span>0</span></td>
            <td class="action">
                <button class="btn btn-remove">Remove</button>
            </td>
        </tr>`;

		removeBtn = document.querySelectorAll(".btn-remove");
		[...removeBtn].map(elem =>
			elem.addEventListener("click", function(e) {
				productRemoveListener(e);
			})
		);

		productName.value = "";
		productPrice.value = "";
	} else {
		alert("You must enter a price and a product");
	}
}
