import { useEffect, useRef } from "react";
import { MapPin, type LucideIcon } from "lucide-react";

type Point = readonly [number, number];

const mapWidth = 600;
const mapHeight = 300;
const route: readonly Point[] = [
  [76, 79], [137, 102], [188, 112], [252, 136], [297, 145],
  [350, 177], [417, 189], [462, 217], [511, 224], [540, 245],
];
const mainRoads: readonly Point[][] = [
  [[-10, 52], [70, 69], [140, 96], [205, 112], [275, 146], [340, 167], [455, 206], [550, 250], [620, 270]],
  [[-10, 138], [75, 157], [162, 168], [228, 219], [316, 231], [382, 258], [466, 310]],
  [[37, -10], [59, 41], [55, 109], [28, 168], [59, 236], [80, 310]],
  [[176, -10], [155, 64], [165, 118], [141, 191], [173, 236], [181, 310]],
  [[288, -10], [258, 69], [261, 130], [234, 204], [259, 310]],
  [[431, 85], [398, 128], [381, 195], [350, 236], [360, 310]],
  [[581, 174], [542, 208], [515, 247], [495, 310]],
];

function strokePath(ctx: CanvasRenderingContext2D, points: readonly Point[], color: string, width: number, dash: number[] = []) {
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.stroke();
}

function drawMap(ctx: CanvasRenderingContext2D, routeIndex: number) {
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.fillStyle = "#edf0e6";
  ctx.fillRect(0, 0, mapWidth, mapHeight);
  ctx.fillStyle = "#dcead7";
  for (const [x, y, width, height] of [[5, 187, 37, 54], [184, 199, 33, 25], [277, 209, 36, 26], [375, 245, 44, 31], [490, 247, 25, 37]]) {
    ctx.fillRect(x, y, width, height);
  }
  for (let offset = -110; offset < mapWidth; offset += 21) {
    strokePath(ctx, [[offset + 110, 0], [offset, mapHeight]], "#fffdf8", 1.5);
  }
  for (let offset = -175; offset < mapHeight; offset += 17) {
    strokePath(ctx, [[0, offset], [mapWidth, offset + 175]], "#fffdf8", 1.5);
  }
  mainRoads.forEach(road => strokePath(ctx, road, "#fffcf0", 4));

  ctx.beginPath();
  ctx.moveTo(122, 0);
  ctx.bezierCurveTo(171, 9, 156, 35, 211, 54);
  ctx.bezierCurveTo(267, 80, 295, 81, 352, 103);
  ctx.bezierCurveTo(403, 121, 420, 157, 489, 169);
  ctx.bezierCurveTo(545, 180, 556, 203, 600, 215);
  ctx.lineTo(600, 0);
  ctx.closePath();
  ctx.fillStyle = "#d8eaf4";
  ctx.fill();

  strokePath(ctx, route, "#fff", 10);
  strokePath(ctx, route, "#8196b5", 4, [4, 6]);
  strokePath(ctx, route.slice(0, routeIndex + 1), "#2554ba", 5);
  for (const index of [0, route.length - 1]) {
    const [x, y] = route[index];
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = routeIndex >= index ? "#2554ba" : "#8196b5";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export default function ShipmentMap({ routeIndex, location, Icon, delivered }: { routeIndex: number; location: string; Icon: LucideIcon; delivered: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [x, y] = route[routeIndex];

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (context) drawMap(context, routeIndex);
  }, [routeIndex]);

  return (
    <figure className="shipment-route">
      <div className="shipment-map" aria-hidden="true">
        <canvas ref={canvas} width={mapWidth * 2} height={mapHeight * 2} />
        <span className="shipment-map-water">Río de la Plata</span>
        <span className="shipment-map-stop shipment-map-stop--origin">CABA</span>
        <span className="shipment-map-stop shipment-map-stop--destination">La Plata</span>
        <span className="shipment-map-marker" data-delivered={delivered} style={{ left: `${x / mapWidth * 100}%`, top: `${y / mapHeight * 100}%` }}>
          <Icon size={17} />
        </span>
      </div>
      <figcaption className="shipment-location">
        <MapPin size={17} aria-hidden="true" />
        <span><small>Última ubicación simulada</small><strong>{location}</strong></span>
      </figcaption>
    </figure>
  );
}
