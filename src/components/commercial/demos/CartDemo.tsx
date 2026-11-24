import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, CreditCard, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { formatDemoPrice, toteColors, totePrice, toteStock } from "@/data/commercial-demo";

const products = [
  {
    id: "bolso", name: "Bolso de lona", shortName: "Bolsos", price: totePrice, stock: toteStock,
    detail: "Lona gruesa, asas reforzadas y espacio para llevar lo de todos los días.",
    image: "/comercial/bolsos-de-lona.webp", alt: "Dos bolsos de lona, uno azul y otro color arena",
  },
  {
    id: "neceser", name: "Neceser de lona", shortName: "Neceseres", price: 8900, stock: { Arena: 8, Azul: 5 },
    detail: "Compacto, con cierre y lugar para guardar tus esenciales.",
    image: "/comercial/neceseres-de-lona.webp", alt: "Dos neceseres con cierre, uno azul y otro color arena",
  },
] as const;

const deliveryOptions = [
  { name: "Envío a domicilio", price: 3900 },
  { name: "Retiro en el taller", price: 0 },
] as const;

const paymentOptions = ["Mercado Pago", "Tarjeta de crédito o débito", "Transferencia bancaria"] as const;

type Product = typeof products[number];
type Color = typeof toteColors[number];
type ItemKey = `${Product["id"]}:${Color}`;
type CartView = { step: "cart" | "checkout" } | { step: "confirmed"; count: number; total: number; delivery: string; payment: string };

function itemKey(product: Product, color: Color): ItemKey {
  return `${product.id}:${color}`;
}

export default function CartDemo() {
  const [selection, setSelection] = useState(0);
  const [color, setColor] = useState<Color>("Arena");
  const [quantity, setQuantity] = useState("1");
  const [cart, setCart] = useState<Partial<Record<ItemKey, number>>>({});
  const [delivery, setDelivery] = useState(0);
  const [payment, setPayment] = useState(0);
  const [view, setView] = useState<CartView>({ step: "cart" });
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogTitle = useRef<HTMLHeadingElement>(null);
  const product = products[selection];
  const available = product.stock[color] - (cart[itemKey(product, color)] ?? 0);
  const lines = products.flatMap(item => toteColors.map(variant => ({
    product: item, color: variant, key: itemKey(item, variant), quantity: cart[itemKey(item, variant)] ?? 0,
  }))).filter(line => line.quantity > 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);
  const shipping = deliveryOptions[delivery];
  const total = subtotal + shipping.price;

  function updateCart(item: Product, variant: Color, delta: number) {
    const key = itemKey(item, variant);
    setCart(current => ({ ...current, [key]: Math.max(0, Math.min(item.stock[variant], (current[key] ?? 0) + delta)) }));
  }

  function openCart() {
    setView({ step: "cart" });
    dialog.current?.showModal();
  }

  function changeView(next: CartView) {
    setView(next);
    requestAnimationFrame(() => dialogTitle.current?.focus());
  }

  function addToCart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const count = Number(quantity);
    if (!Number.isInteger(count) || count < 1 || count > available) return;
    updateCart(product, color, count);
    setQuantity("1");
    openCart();
  }

  function changeQuantity(delta: number) {
    setQuantity(current => String(Math.min(available, Math.max(1, (Number(current) || 1) + delta))));
  }

  function confirmCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!itemCount) return;
    changeView({ step: "confirmed", count: itemCount, total, delivery: shipping.name, payment: paymentOptions[payment] });
    setCart({});
  }

  return (
    <div className="demo-window shop-preview">
      <header className="shop-header">
        <span className="shop-brand">Taller Lona</span>
        <button className="shop-cart-toggle" type="button" onClick={openCart}><ShoppingBag size={17} aria-hidden="true" /> Carrito <span>{itemCount}</span></button>
      </header>
      <div className="shop-preview-body">
        <div className="shop-catalog">
          <h4>Accesorios de lona</h4>
          <div className="shop-catalog-picker" role="group" aria-label="Catálogo de Taller Lona">
            {products.map(({ id, shortName }, index) => (
              <button key={id} type="button" aria-pressed={selection === index} onClick={() => { setSelection(index); setQuantity("1"); }}>{shortName}</button>
            ))}
          </div>
        </div>
        <div className="shop-product">
          <div className="shop-product-photo">
            <Image src={product.image} alt={product.alt} fill sizes="(min-width: 900px) 34vw, 90vw" />
          </div>
          <form className="shop-product-form" onSubmit={addToCart}>
            <div>
              <h5>{product.name}</h5>
              <p className="shop-product-description">{product.detail}</p>
              <p className="shop-price">{formatDemoPrice(product.price)}</p>
            </div>
            <fieldset className="shop-swatches">
              <legend>Color</legend>
              {toteColors.map(option => <label key={option}>
                <input type="radio" name="taller-lona-color" value={option} checked={color === option} onChange={() => { setColor(option); setQuantity("1"); }} />
                <span><i className={`shop-color shop-color--${option.toLowerCase()}`} aria-hidden="true" />{option}</span>
              </label>)}
            </fieldset>
            <div className="shop-quantity">
              <label htmlFor="cart-demo-quantity">Cantidad</label>
              <div className="shop-stepper">
                <div className="shop-stepper-control">
                  <button type="button" aria-label="Restar una unidad" disabled={!available || Number(quantity) <= 1} onClick={() => changeQuantity(-1)}><Minus size={15} aria-hidden="true" /></button>
                  <input id="cart-demo-quantity" type="number" min={1} max={Math.max(1, available)} required value={quantity} disabled={!available} onChange={event => setQuantity(event.target.value)} />
                  <button type="button" aria-label="Sumar una unidad" disabled={!available || Number(quantity) >= available} onClick={() => changeQuantity(1)}><Plus size={15} aria-hidden="true" /></button>
                </div>
                <span>{available ? `${available} disponibles` : "Sin stock"}</span>
              </div>
            </div>
            <button type="submit" className="preview-primary" disabled={!available}><ShoppingBag size={16} aria-hidden="true" /> Agregar al carrito</button>
          </form>
        </div>
        <ul className="shop-benefits" role="list">
          <li><Truck size={17} aria-hidden="true" /> Envío a domicilio o retiro</li>
          <li><CreditCard size={17} aria-hidden="true" /> Mercado Pago, tarjeta o transferencia</li>
        </ul>
      </div>

      <dialog ref={dialog} className="shop-dialog" aria-labelledby="taller-lona-cart-title">
        <header>
          <h5 id="taller-lona-cart-title" ref={dialogTitle} tabIndex={-1}>
            {view.step === "confirmed" ? "Compra de prueba confirmada" : view.step === "checkout" ? "Entrega y pago" : "Tu carrito"}
          </h5>
          <button className="shop-icon-button" type="button" aria-label="Cerrar carrito" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </header>
        {view.step === "cart" && (
          <div className="shop-dialog-body">
            {itemCount === 0 ? <p className="shop-empty">Elegí un producto del catálogo para empezar.</p> : (
              <>
                <ul className="shop-items" role="list">
                  {lines.map(line => (
                    <li key={line.key} className="shop-item">
                      <div><strong>{line.product.name}</strong><small>{line.color} · {formatDemoPrice(line.product.price)} por unidad</small></div>
                      <div className="shop-item-quantity" role="group" aria-label={`Cantidad de ${line.product.name} ${line.color.toLowerCase()}`}>
                        <button type="button" aria-label="Restar una unidad" onClick={() => updateCart(line.product, line.color, -1)}><Minus size={15} aria-hidden="true" /></button>
                        <span aria-live="polite">{line.quantity}</span>
                        <button type="button" aria-label="Sumar una unidad" disabled={line.quantity === line.product.stock[line.color]} onClick={() => updateCart(line.product, line.color, 1)}><Plus size={15} aria-hidden="true" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="shop-total"><span>Subtotal</span><strong>{formatDemoPrice(subtotal)}</strong></div>
                <button type="button" className="preview-primary" onClick={() => changeView({ step: "checkout" })}>Continuar compra <ArrowRight size={16} aria-hidden="true" /></button>
              </>
            )}
            <button type="button" className="preview-text-button" onClick={() => dialog.current?.close()}>Seguir comprando</button>
          </div>
        )}
        {view.step === "checkout" && (
          <form className="shop-dialog-body" onSubmit={confirmCheckout}>
            <label className="shop-checkout-field">Entrega
              <select value={delivery} onChange={event => setDelivery(Number(event.target.value))}>
                {deliveryOptions.map(({ name, price }, index) => <option key={name} value={index}>{name} · {price ? formatDemoPrice(price) : "Gratis"}</option>)}
              </select>
            </label>
            <label className="shop-checkout-field">Medio de pago
              <select value={payment} onChange={event => setPayment(Number(event.target.value))}>
                {paymentOptions.map((name, index) => <option key={name} value={index}>{name}</option>)}
              </select>
            </label>
            <dl className="shop-costs">
              <div><dt>Productos</dt><dd>{formatDemoPrice(subtotal)}</dd></div>
              <div><dt>Entrega</dt><dd>{shipping.price ? formatDemoPrice(shipping.price) : "Gratis"}</dd></div>
              <div className="shop-total"><dt>Total</dt><dd><strong>{formatDemoPrice(total)}</strong></dd></div>
            </dl>
            <button type="submit" className="preview-primary">Confirmar compra de prueba <ArrowRight size={16} aria-hidden="true" /></button>
            <button type="button" className="preview-text-button" onClick={() => changeView({ step: "cart" })}><ArrowLeft size={16} aria-hidden="true" /> Volver al carrito</button>
          </form>
        )}
        {view.step === "confirmed" && (
          <div className="shop-dialog-body">
            <p className="preview-confirmation"><Check size={18} aria-hidden="true" /> Tu pedido de ejemplo quedó listo.</p>
            <dl className="shop-costs">
              <div><dt>Unidades</dt><dd>{view.count}</dd></div>
              <div><dt>Entrega</dt><dd>{view.delivery}</dd></div>
              <div><dt>Medio de pago</dt><dd>{view.payment}</dd></div>
              <div className="shop-total"><dt>Total simulado</dt><dd><strong>{formatDemoPrice(view.total)}</strong></dd></div>
            </dl>
            <button type="button" className="preview-primary" onClick={() => dialog.current?.close()}>Volver a la tienda <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        )}
      </dialog>
    </div>
  );
}
