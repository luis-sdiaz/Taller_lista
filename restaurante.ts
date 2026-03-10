class Queue<T> {
  private items: T[] = [];
  enqueue(element: T): void { this.items.push(element); }
  dequeue(): T | undefined { return this.items.shift(); }
  isEmpty(): boolean { return this.items.length === 0; }
}

class Order {
  constructor(public id: number, public customer: string, public steps: string[]) {}
}

const processSteps: string[] = [
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

const ordersQueue = new Queue<Order>();
let orderId = 1;

// Referencias al modal
const modal = document.getElementById("modal") as HTMLElement;
const modalTitle = document.getElementById("modalTitle") as HTMLElement;
const modalBody = document.getElementById("modalBody") as HTMLElement;
const productSelect = document.getElementById("productSelect") as HTMLSelectElement;
const productLabel = document.getElementById("productLabel") as HTMLElement;
const modalInput = document.getElementById("modalInput") as HTMLTextAreaElement;
const closeModal = document.getElementById("closeModal") as HTMLElement;
const completeStepBtn = document.getElementById("completeStep") as HTMLButtonElement;

let currentStepElement: HTMLElement | null = null;

document.getElementById("addOrder")?.addEventListener("click", () => {
  const customerName = (document.getElementById("customerName") as HTMLInputElement).value || "Cliente sin nombre";
  const newOrder = new Order(orderId++, customerName, processSteps);
  ordersQueue.enqueue(newOrder);
  renderOrders();
});

function renderOrders(): void {
  const container = document.getElementById("orders");
  if (!container) return;
  container.innerHTML = "";

  const tempQueue = new Queue<Order>();
  while (!ordersQueue.isEmpty()) {
    const order = ordersQueue.dequeue();
    if (order) {
      const div = document.createElement("div");
      div.className = "order";
      div.innerHTML = `<h3>Pedido #${order.id} - ${order.customer}</h3>`;

      order.steps.forEach(step => {
        const stepElement = document.createElement("button");
        stepElement.className = "step";
        stepElement.textContent = `➡️ ${step}`;

        stepElement.addEventListener("click", () => {
          currentStepElement = stepElement;
          modalTitle.textContent = step;

          // Configuración dinámica según el paso
          switch(step) {
            case "Solicitar pedido":
              modalBody.textContent = `Selecciona el producto para ${order.customer}`;
              productLabel.style.display = "block";
              productSelect.style.display = "block";
              modalInput.style.display = "block";
              break;

            case "Recoger pedido":
              modalBody.textContent = `Confirmar que el pedido está listo para ${order.customer}`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "none";
              break;

            case "Elaborar pedido":
              modalBody.textContent = `Escribe detalles de preparación para ${order.customer}`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "block";
              break;

            case "Recibir pedido":
              modalBody.textContent = `Confirmar que ${order.customer} recibió el pedido`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "none";
              break;

            case "Servir pedido":
              modalBody.textContent = `Indica dónde se sirve el pedido de ${order.customer}`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "block";
              break;

            case "Solicitar cuenta":
              modalBody.textContent = `Generar cuenta para ${order.customer}`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "none";
              break;

            case "Calcular total":
              modalBody.textContent = `Calcular el total del pedido de ${order.customer}`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "none";
              break;

            case "Pagar pedido":
              modalBody.textContent = `Registrar pago de ${order.customer}`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "block";
              break;

            case "Fin":
              modalBody.textContent = `Pedido #${order.id} de ${order.customer} finalizado ✅`;
              productLabel.style.display = "none";
              productSelect.style.display = "none";
              modalInput.style.display = "none";
              break;
          }

          // Mostrar modal
          modal.style.display = "block";
        });

        div.appendChild(stepElement);
      });

      container.appendChild(div);
      tempQueue.enqueue(order);
    }
  }

  while (!tempQueue.isEmpty()) {
    const order = tempQueue.dequeue();
    if (order) ordersQueue.enqueue(order);
  }
}

// Control del modal
closeModal.onclick = () => { modal.style.display = "none"; };
completeStepBtn.onclick = () => {
  if (currentStepElement) {
    currentStepElement.classList.add("completed");
    console.log(`Producto elegido: ${productSelect.value}`);
    console.log(`Notas: ${modalInput.value}`);
  }
  modal.style.display = "none";
};
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};