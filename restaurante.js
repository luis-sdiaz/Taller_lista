var _a;
// ==========================
// 1. Definición de la Cola
// ==========================
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (element) {
        this.items.push(element);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return Queue;
}());
// ==========================
// 2. Modelo del Pedido
// ==========================
var Order = /** @class */ (function () {
    function Order(id, steps) {
        this.id = id;
        this.steps = steps;
    }
    return Order;
}());
// ==========================
// 3. Pasos del proceso
// ==========================
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
// ==========================
// 4. Simulación en Navegador
// ==========================
var ordersQueue = new Queue();
var orderId = 1;
(_a = document.getElementById("addOrder")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var newOrder = new Order(orderId++, processSteps);
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
            div_1.innerHTML = "<h3>Pedido #".concat(order.id, "</h3>");
            order.steps.forEach(function (step) {
                var stepElement = document.createElement("button");
                stepElement.className = "step";
                stepElement.textContent = "\u27A1\uFE0F ".concat(step);
                stepElement.addEventListener("click", function () {
                    stepElement.classList.toggle("completed");
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
    // Restaurar la cola original
    while (!tempQueue.isEmpty()) {
        var order = tempQueue.dequeue();
        if (order)
            ordersQueue.enqueue(order);
    }
}
