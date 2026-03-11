var _a;
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (element) { this.items.push(element); };
    Queue.prototype.dequeue = function () { return this.items.shift(); };
    Queue.prototype.isEmpty = function () { return this.items.length === 0; };
    return Queue;
}());
var Order = /** @class */ (function () {
    function Order(id, customer, steps) {
        this.id = id;
        this.customer = customer;
        this.steps = steps;
    }
    return Order;
}());
var processSteps = [
    "Solicitar pedido",
    "Recoger pedido",
    "Elaborar pedido",
    "Recibir pedido",
    "Servir pedido",
    "Solicitar cuenta",
    "Calcular total",
    "Pagar pedido",
    "Fin"
];
var ordersQueue = new Queue();
var orderId = 1;
// Referencias al modal
var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modalTitle");
var modalBody = document.getElementById("modalBody");
var productSelect = document.getElementById("productSelect");
var productLabel = document.getElementById("productLabel");
var modalInput = document.getElementById("modalInput");
var closeModal = document.getElementById("closeModal");
var completeStepBtn = document.getElementById("completeStep");
var currentStepElement = null;
(_a = document.getElementById("addOrder")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var customerName = document.getElementById("customerName").value || "Cliente sin nombre";
    var newOrder = new Order(orderId++, customerName, processSteps);
    ordersQueue.enqueue(newOrder);
    renderOrders();
});
function renderOrders() {
    var container = document.getElementById("orders");
    if (!container)
        return;
    container.innerHTML = "";
    var tempQueue = new Queue();
    var _loop_1 = function () {
        var order = ordersQueue.dequeue();
        if (order) {
            var div_1 = document.createElement("div");
            div_1.className = "order";
            div_1.innerHTML = "<h3>Pedido #".concat(order.id, " - ").concat(order.customer, "</h3>");
            order.steps.forEach(function (step) {
                var stepElement = document.createElement("button");
                stepElement.className = "step";
                stepElement.textContent = "\u27A1\uFE0F ".concat(step);
                stepElement.addEventListener("click", function () {
                    currentStepElement = stepElement;
                    modalTitle.textContent = step;
                    // Configuración dinámica según el paso
                    switch (step) {
                        case "Solicitar pedido":
                            modalBody.textContent = "Selecciona el producto para ".concat(order.customer);
                            productLabel.style.display = "block";
                            productSelect.style.display = "block";
                            modalInput.style.display = "block";
                            break;
                        case "Recoger pedido":
                            modalBody.textContent = "Confirmar que el pedido est\u00E1 listo para ".concat(order.customer);
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "none";
                            break;
                        case "Elaborar pedido":
                            modalBody.textContent = "Escribe detalles de preparaci\u00F3n para ".concat(order.customer);
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "block";
                            break;
                        case "Recibir pedido":
                            modalBody.textContent = "Confirmar que ".concat(order.customer, " recibi\u00F3 el pedido");
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "none";
                            break;
                        case "Servir pedido":
                            modalBody.textContent = "Indica d\u00F3nde se sirve el pedido de ".concat(order.customer);
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "block";
                            break;
                        case "Solicitar cuenta":
                            modalBody.textContent = "Generar cuenta para ".concat(order.customer);
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "none";
                            break;
                        case "Calcular total":
                            modalBody.textContent = "Calcular el total del pedido de ".concat(order.customer);
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "none";
                            break;
                        case "Pagar pedido":
                            modalBody.textContent = "Registrar pago de ".concat(order.customer);
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "block";
                            break;
                        case "Fin":
                            modalBody.textContent = "Pedido #".concat(order.id, " de ").concat(order.customer, " finalizado \u2705");
                            productLabel.style.display = "none";
                            productSelect.style.display = "none";
                            modalInput.style.display = "none";
                            break;
                    }
                    // Mostrar modal
                    modal.style.display = "block";
                });
                div_1.appendChild(stepElement);
            });
            container.appendChild(div_1);
            tempQueue.enqueue(order);
        }
    };
    while (!ordersQueue.isEmpty()) {
        _loop_1();
    }
    while (!tempQueue.isEmpty()) {
        var order = tempQueue.dequeue();
        if (order)
            ordersQueue.enqueue(order);
    }
}
// Control del modal
closeModal.onclick = function () { modal.style.display = "none"; };
completeStepBtn.onclick = function () {
    if (currentStepElement) {
        currentStepElement.classList.add("completed");
        console.log("Producto elegido: ".concat(productSelect.value));
        console.log("Notas: ".concat(modalInput.value));
    }
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target === modal)
        modal.style.display = "none";
};
