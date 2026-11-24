import Image from "next/image";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatDemoPrice, toteColors, totePrice, toteStock } from "@/data/commercial-demo";

type Color = typeof toteColors[number];

export default function CartDemo() {
  const [color, setColor] = useState<Color>("Arena");
  const [quantity, setQuantity] = useState("1");
  const [cart, setCart] = useState({ Arena: 0, Azul: 0 });
  const [confirmed, setConfirmed] = useState(false);
  const available = toteStock[color] - cart[color];
  const itemCount = cart.Arena + cart.Azul;
  const total = itemCount * totePrice;

  function clearCart() {
    setCart({ Arena: 0, Azul: 0 });
    setConfirmed(false);
  }

  function changeQuantity(delta: number) {
    setQuantity(String(Math.min(available, Math.max(1, (Number(quantity) || 1) + delta))));
  }

  return (
    <div className="demo-window">
      <div className="preview-app-bar">
        <span><ShoppingBag size={17} aria-hidden="true" /> Tienda de ejemplo</span>
        <span>{itemCount} {itemCount === 1 ? "producto" : "productos"} en el carrito</span>
      </div>
      <div className="shop-preview-body">
        <div className="shop-product">
          <div className="shop-product-photo">
            <Image src="/comercial/bolsos-de-lona.webp" alt="Dos bolsos de lona, uno azul y otro color arena" width={960} height={640} sizes="(min-width: 900px) 320px, 85vw" />
          </div>
          <form className="shop-product-form" onSubmit={event => {
            event.preventDefault();
            const count = Number(quantity);
            if (!Number.isInteger(count) || count < 1 || count > available) return;
            setCart(current => ({ ...current, [color]: current[color] + count }));
            setQuantity("1");
            setConfirmed(false);
          }}>
            <div>
              <h4>Bolso de lona</h4>
              <p className="shop-price">{formatDemoPrice(totePrice)}</p>
            </div>
            <fieldset className="shop-swatches">
              <legend>Color</legend>
              {toteColors.map(option => <label key={option}>
                <input type="radio" name="bolso-color" value={option} checked={color === option} onChange={() => { setColor(option); setQuantity("1"); }} />
                <span><i className={`shop-color shop-color--${option.toLowerCase()}`} aria-hidden="true" />{option}</span>
              </label>)}
            </fieldset>
            <div className="shop-quantity">
              <label htmlFor="cart-demo-quantity">Cantidad</label>
              <div className="shop-stepper">
                <button type="button" aria-label="Restar una unidad" disabled={available === 0 || Number(quantity) <= 1} onClick={() => changeQuantity(-1)}><Minus size={15} aria-hidden="true" /></button>
                <input id="cart-demo-quantity" type="number" min={1} max={Math.max(1, available)} required value={quantity} disabled={!available} onChange={event => setQuantity(event.target.value)} />
                <button type="button" aria-label="Sumar una unidad" disabled={available === 0 || Number(quantity) >= available} onClick={() => changeQuantity(1)}><Plus size={15} aria-hidden="true" /></button>
              </div>
              <p className="stock-count">{available ? `${available} disponibles` : "Sin unidades disponibles"}</p>
            </div>
            <button type="submit" className="preview-primary" disabled={available === 0}><Plus size={16} aria-hidden="true" /> Agregar al pedido</button>
          </form>
        </div>

        <section className="shop-summary" aria-label="Resumen del pedido">
          <h4>Tu pedido</h4>
          <div className="shop-items" aria-live="polite">
            {itemCount === 0 && <p className="shop-empty">Elegí un color y agregá un bolso para ver el total y confirmar el pedido de ejemplo.</p>}
            {toteColors.filter(variant => cart[variant] > 0).map(variant => (
              <div key={variant} className="shop-item">
                <span className={`shop-color shop-color--${variant.toLowerCase()}`} aria-hidden="true" />
                <span>{cart[variant]} × Bolso {variant.toLowerCase()}</span>
                <strong>{formatDemoPrice(cart[variant] * totePrice)}</strong>
                <button type="button" aria-label={`Quitar bolso ${variant.toLowerCase()}`} onClick={() => { setCart(current => ({ ...current, [variant]: 0 })); setConfirmed(false); }}><Trash2 size={15} aria-hidden="true" /></button>
              </div>
            ))}
            <div className="shop-total"><span>Total de ejemplo</span><strong>{formatDemoPrice(total)}</strong></div>
          </div>
          <button type="button" className="preview-primary" disabled={itemCount === 0 || confirmed} onClick={() => setConfirmed(true)}>Simular confirmación <ArrowRight size={16} aria-hidden="true" /></button>
          {itemCount > 0 && <button type="button" className="preview-text-button" onClick={clearCart}>Vaciar pedido</button>}
          <div role="status">
            {confirmed && <p className="preview-confirmation"><Check size={16} aria-hidden="true" /> Pedido de ejemplo confirmado. Pago y entrega se coordinan con el comercio.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
