import { ClipboardList } from "lucide-react";
import { useState } from "react";

const orders = [
  { id: "#104", customer: "Ana", work: "Mesa de comedor", status: "Recibido", style: "new" },
  { id: "#103", customer: "Julián", work: "Estantes a medida", status: "En trabajo", style: "active" },
  { id: "#102", customer: "Sol", work: "Escritorio", status: "Entregado", style: "done" },
];

export default function OrdersDemo() {
  const [filter, setFilter] = useState("");
  const visibleOrders = orders.filter(order => !filter || order.status === filter);

  return (
    <div className="demo-window orders-preview">
      <div className="preview-app-bar"><span><ClipboardList size={17} aria-hidden="true" /> Panel del taller</span><span>Gestión de pedidos</span></div>
      <div className="orders-body">
        <div className="orders-heading">
          <div>
            <h4>Pedidos del taller</h4>
            <p role="status">{visibleOrders.length} de {orders.length} pedidos</p>
          </div>
          <label className="demo-field">Filtrar por estado
            <select value={filter} onChange={event => setFilter(event.target.value)}>
              <option value="">Todos los estados</option>
              {orders.map(order => <option key={order.status}>{order.status}</option>)}
            </select>
          </label>
        </div>
        <div className="orders-table">
          <table className="demo-orders" aria-label="Pedidos del taller">
            <thead><tr><th scope="col">Pedido</th><th scope="col">Cliente</th><th scope="col">Estado</th></tr></thead>
            <tbody>
              {visibleOrders.map(order => (
                <tr key={order.id}>
                  <th scope="row">{order.work}<small>{order.id}</small></th>
                  <td>{order.customer}</td>
                  <td><span className={`demo-status demo-status--${order.style}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
