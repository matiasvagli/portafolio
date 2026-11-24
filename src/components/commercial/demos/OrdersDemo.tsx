import { ArrowDownLeft, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, CircleAlert, Clock3, ReceiptText, Search, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { formatDemoPrice } from "@/data/commercial-demo";
import { demoCutoff, demoSales, paymentMethods, type PaymentMethod } from "@/data/sales-demo";
import "../collections-demo.css";

const statusLabels = { paid: "Cobrada", partial: "Parcial", pending: "Pendiente", overdue: "Vencida" } as const;
type Status = keyof typeof statusLabels;
const pageSize = 7;
const dateFormat = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", timeZone: "UTC" });

function formatDate(date: string) {
  return dateFormat.format(new Date(date));
}

function searchable(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function getStatus(balance: number, due: string, paid: number): Status {
  if (!balance) return "paid";
  if (due < demoCutoff) return "overdue";
  return paid ? "partial" : "pending";
}

export default function OrdersDemo() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "">("");
  const [page, setPage] = useState(0);
  const [payments, setPayments] = useState<Partial<Record<string, PaymentMethod>>>({});
  const [selected, setSelected] = useState<string>();
  const [method, setMethod] = useState<PaymentMethod>("Transferencia");
  const [recorded, setRecorded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const paymentStatus = useRef<HTMLDivElement>(null);

  const sales = demoSales.map(sale => {
    const payment = payments[sale.id];
    const paid = payment ? sale.total : sale.paid;
    const balance = sale.total - paid;
    return { ...sale, paid, balance, method: payment ?? sale.method, status: getStatus(balance, sale.due, paid) };
  });
  const summary = sales.reduce((totals, sale) => {
    totals.sold += sale.total;
    totals.paid += sale.paid;
    if (sale.status === "overdue") {
      totals.overdue += sale.balance;
      totals.overdueCount += 1;
    } else if (sale.balance > 0) {
      totals.pending += sale.balance;
      totals.pendingCount += 1;
    }
    return totals;
  }, { sold: 0, paid: 0, overdue: 0, overdueCount: 0, pending: 0, pendingCount: 0 });
  const paidPercent = Math.round(summary.paid / summary.sold * 100);
  const searchTerm = searchable(search.trim());
  const matches = sales.filter(sale => (!filter || sale.status === filter) && searchable(`${sale.id} ${sale.customer} ${sale.item}`).includes(searchTerm));
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const start = currentPage * pageSize;
  const rows = matches.slice(start, start + pageSize);
  const rowCount = pageCount > 1 ? `${start + 1}–${start + rows.length} de ${matches.length} ventas` : `${matches.length} ${matches.length === 1 ? "venta" : "ventas"}`;
  const sale = sales.find(item => item.id === selected);

  const metrics = [
    { label: "Ventas", Icon: ReceiptText, amount: summary.sold, detail: `${sales.length} operaciones`, color: "sales" },
    { label: "Cobrado", Icon: ArrowDownLeft, amount: summary.paid, detail: "Incluye anticipos", color: "paid" },
    { label: "Por vencer", Icon: Clock3, amount: summary.pending, detail: `${summary.pendingCount} con saldo`, color: "pending" },
    { label: "Vencido", Icon: CircleAlert, amount: summary.overdue, detail: `${summary.overdueCount} con atraso`, color: "overdue" },
  ];

  function openSale(sale: typeof sales[number]) {
    setSelected(sale.id);
    setMethod(sale.method ?? "Transferencia");
    setRecorded(false);
    dialog.current?.showModal();
  }

  function recordPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sale?.balance) return;
    setPayments(current => ({ ...current, [sale.id]: method }));
    setRecorded(true);
    requestAnimationFrame(() => paymentStatus.current?.focus());
  }

  return (
    <div className="demo-window collections-demo">
      <header className="collections-header">
        <span><ReceiptText size={19} aria-hidden="true" /> Taller Veta</span>
        <small>Gestión comercial</small>
      </header>

      <div className="collections-body">
        <div className="collections-heading">
          <h4>Ventas y cobranzas</h4>
          <p><CalendarDays size={16} aria-hidden="true" /> Noviembre 2026 · Corte al 24 nov</p>
        </div>

        <dl className="collections-metrics" aria-label="Totales del período">
          {metrics.map(({ label, Icon, amount, detail, color }) => (
            <div className="collections-metric" key={label} data-color={color}>
              <dt><Icon size={16} aria-hidden="true" /> {label}</dt>
              <dd><strong>{formatDemoPrice(amount)}</strong><small>{detail}</small></dd>
            </div>
          ))}
        </dl>
        <div className="collections-progress">
          <span>Avance de cobranza</span>
          <progress max={summary.sold} value={summary.paid} aria-label="Proporción cobrada del total vendido" />
          <strong>{paidPercent} %</strong>
        </div>

        <section className="collections-ledger" aria-labelledby="collections-title">
          <div className="collections-toolbar">
            <h5 id="collections-title">Operaciones del mes</h5>
            <div className="collections-filters">
              <label className="collections-search"><span>Buscar</span>
                <span><Search size={16} aria-hidden="true" /><input type="search" placeholder="Cliente o venta" value={search} onChange={event => { setSearch(event.target.value); setPage(0); }} /></span>
              </label>
              <label><span id="collections-filter-label">Estado</span>
                <select aria-labelledby="collections-filter-label" value={filter} onChange={event => { setFilter(event.target.value as Status | ""); setPage(0); }}>
                  <option value="">Todos</option>
                  {Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
            </div>
          </div>

          <table className="collections-table" aria-labelledby="collections-title">
            <thead><tr>
              <th scope="col">Cliente y venta</th>
              <th scope="col" className="collections-due">Vence</th>
              <th scope="col" className="collections-amount">Importe</th>
              <th scope="col" className="collections-balance">Saldo</th>
              <th scope="col" className="collections-status-cell">Estado</th>
              <th scope="col" className="collections-action">Detalle</th>
            </tr></thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <th scope="row">
                    <strong>{row.customer}</strong>
                    <small>{row.id} · {row.item}</small>
                    <span className="collections-status collections-status-mobile" data-status={row.status}>{statusLabels[row.status]}</span>
                  </th>
                  <td className="collections-due"><time dateTime={row.due}>{formatDate(row.due)}</time></td>
                  <td className="collections-amount">{formatDemoPrice(row.total)}</td>
                  <td className="collections-balance">{formatDemoPrice(row.balance)}</td>
                  <td className="collections-status-cell"><span className="collections-status" data-status={row.status}>{statusLabels[row.status]}</span></td>
                  <td className="collections-action"><button type="button" aria-label={`Ver venta ${row.id} de ${row.customer}`} onClick={() => openSale(row)}><ArrowUpRight size={17} aria-hidden="true" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="collections-empty">No hay ventas que coincidan con esta búsqueda.</p>}

          <footer className="collections-pagination">
            <p role="status">{rowCount}</p>
            {pageCount > 1 && <div role="group" aria-label="Páginas de ventas">
              <button aria-label="Página anterior" type="button" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={18} aria-hidden="true" /></button>
              <span>{currentPage + 1} / {pageCount}</span>
              <button aria-label="Página siguiente" type="button" disabled={currentPage + 1 === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={18} aria-hidden="true" /></button>
            </div>}
          </footer>
        </section>
      </div>

      <dialog ref={dialog} className="collections-dialog" aria-labelledby="collections-dialog-title">
        <header>
          <h5 id="collections-dialog-title">Detalle de la venta {sale?.id}</h5>
          <button type="button" aria-label="Cerrar detalle" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </header>
        {sale && <>
          <div className="collections-dialog-customer">
            <div><strong>{sale.customer}</strong><p>{sale.item}</p></div>
            <span className="collections-status" data-status={sale.status}>{statusLabels[sale.status]}</span>
          </div>
          <dl className="collections-detail">
            <div><dt>Canal</dt><dd>{sale.channel}</dd></div>
            <div><dt>Fecha de venta</dt><dd>{formatDate(sale.date)}</dd></div>
            <div><dt>Vencimiento</dt><dd>{formatDate(sale.due)}</dd></div>
            <div><dt>Importe</dt><dd>{formatDemoPrice(sale.total)}</dd></div>
            <div><dt>Cobrado</dt><dd>{formatDemoPrice(sale.paid)}</dd></div>
            {sale.method && <div><dt>Último medio de cobro</dt><dd>{sale.method}</dd></div>}
            <div><dt>Saldo</dt><dd>{formatDemoPrice(sale.balance)}</dd></div>
          </dl>
          {sale.balance > 0 && <form className="collections-payment" onSubmit={recordPayment}>
            <label>Medio de cobro
              <select value={method} onChange={event => setMethod(event.target.value as PaymentMethod)}>
                {paymentMethods.map(option => <option key={option}>{option}</option>)}
              </select>
            </label>
            <button type="submit" className="preview-primary">Registrar cobro de {formatDemoPrice(sale.balance)}</button>
          </form>}
          <div role="status" ref={paymentStatus} tabIndex={-1}>{recorded && <p className="preview-confirmation">Cobro de ejemplo registrado. El saldo de esta venta quedó en cero.</p>}</div>
        </>}
      </dialog>
    </div>
  );
}
