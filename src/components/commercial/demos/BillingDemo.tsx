import { Boxes, Check, Circle, Package, ReceiptText, Store, TrendingUp } from "lucide-react";
import { useState } from "react";
import { formatDemoPrice, totePrice, toteStock } from "@/data/commercial-demo";

const saleUnits = 2;
const saleTotal = saleUnits * totePrice;
const products = [
  { sku: "BL-002", name: "Bolso azul", stock: toteStock.Azul },
  { sku: "BL-001", name: "Bolso arena", stock: toteStock.Arena },
  { sku: "BN-004", name: "Bandolera negra", stock: 3 },
];
const inventoryTotal = products.reduce((total, product) => total + product.stock, 0);
const billingActions = {
  ready: { label: "Simular venta y factura", next: "sale" },
  sale: { label: "Simular autorización de ARCA", next: "authorized" },
  authorized: { label: "Reiniciar ejemplo", next: "ready" },
} as const;

export default function BillingDemo() {
  const [stage, setStage] = useState<"ready" | "sale" | "authorized">("ready");
  const sold = stage !== "ready";
  const authorized = stage === "authorized";
  const action = billingActions[stage];

  return (
    <div className="demo-window billing-preview">
      <div className="preview-app-bar">
        <span><Store size={17} aria-hidden="true" /> Panel de gestión</span>
        <span>Venta de mostrador · Simulación</span>
      </div>

      <div className="billing-body">
        <div className="billing-metrics" aria-live="polite">
          <div><span><TrendingUp size={16} aria-hidden="true" /> Ventas del día</span><strong>{formatDemoPrice(52500 + (sold ? saleTotal : 0))}</strong></div>
          <div><span><Boxes size={16} aria-hidden="true" /> Unidades en stock</span><strong>{inventoryTotal - (sold ? saleUnits : 0)}</strong></div>
          <div><span><ReceiptText size={16} aria-hidden="true" /> Factura electrónica</span><strong className="billing-state">{authorized ? "Autorizada" : sold ? "Pendiente de envío" : "Sin emitir"}</strong></div>
        </div>

        <div className="billing-details">
          <section className="billing-inventory" aria-label="Inventario">
            <h4><Package size={18} aria-hidden="true" /> Inventario</h4>
            <table>
              <thead><tr><th scope="col">Producto</th><th scope="col">SKU</th><th scope="col">Stock</th></tr></thead>
              <tbody>{products.map(({ sku, name, stock }, index) => {
                const units = stock - (index === 0 && sold ? saleUnits : 0);
                return <tr key={sku}>
                  <th scope="row">{name}</th><td>{sku}</td><td><span className={units <= 4 ? "billing-stock-low" : "billing-stock"}>{units} u.</span></td>
                </tr>;
              })}</tbody>
            </table>
          </section>

          <section className="billing-sale" aria-label="Venta y comprobante">
            <h4><ReceiptText size={18} aria-hidden="true" /> Venta y comprobante</h4>
            <div className="billing-line"><span>{saleUnits} × Bolso azul</span><strong>{formatDemoPrice(saleTotal)}</strong></div>
            <div aria-live="polite">
              {sold && <ul className="billing-progress">
                <li><Check size={15} aria-hidden="true" /> Venta registrada · stock de 6 a 4</li>
                <li>{authorized ? <Check size={15} aria-hidden="true" /> : <Circle size={14} aria-hidden="true" />}
                  {authorized ? "Comprobante de ejemplo autorizado" : "Solicitud de autorización a ARCA preparada"}
                </li>
              </ul>}
            </div>
            {authorized && <p role="status" className="preview-confirmation"><Check size={16} aria-hidden="true" /> Comprobante vinculado a la venta. Simulación sin valor fiscal.</p>}
            <button type="button" className="preview-primary" onClick={() => setStage(action.next)}>{action.label}</button>
            {stage === "sale" && <button type="button" className="preview-text-button" onClick={() => setStage("ready")}>Reiniciar ejemplo</button>}
          </section>
        </div>
      </div>
    </div>
  );
}
