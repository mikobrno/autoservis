/**
 * Shluk šestiúhelníků – ozvěna LED světel na stropě dílny (viz fotky na
 * Google profilu). Čistě dekorativní, proto aria-hidden.
 *
 * Šestiúhelníky jsou „flat-top“ jako skutečná světla. Mřížka: sloupce po 1,5 r,
 * řádky po r·√3, liché sloupce posunuté o polovinu výšky.
 */
const SQRT3 = Math.sqrt(3);

const hexPoints = (cx: number, cy: number, r: number) =>
  [0, 60, 120, 180, 240, 300]
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${(cx + r * Math.cos(rad)).toFixed(2)},${(cy + r * Math.sin(rad)).toFixed(2)}`;
    })
    .join(' ');

/** Rozložení buněk [sloupec, řádek] – tvar podobný světlu nad zvedákem. */
const CLUSTER: Array<[number, number]> = [
  [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2], [2, 3],
  [3, 0], [3, 1], [3, 2],
  [4, 1], [4, 2],
];

type HexClusterProps = {
  className?: string;
  /** Barva čar – výchozí studeně bílá jako LED. */
  stroke?: string;
  strokeWidth?: number;
  glow?: boolean;
};

export default function HexCluster({
  className = '',
  stroke = '#eef4ff',
  strokeWidth = 3,
  glow = true,
}: HexClusterProps) {
  const r = 40;
  const pad = 8;
  const cells = CLUSTER.map(([col, row]) => {
    const cx = pad + r + col * 1.5 * r;
    const cy = pad + (SQRT3 * r) / 2 + row * SQRT3 * r + (col % 2 ? (SQRT3 * r) / 2 : 0);
    return { cx, cy, key: `${col}-${row}` };
  });
  const width = pad * 2 + r * 2 + 4 * 1.5 * r;
  const height = pad * 2 + SQRT3 * r * 4.5;

  return (
    <svg
      viewBox={`0 0 ${width.toFixed(0)} ${height.toFixed(0)}`}
      className={`${glow ? 'hex-glow' : ''} ${className}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {cells.map((cell) => (
        <polygon
          key={cell.key}
          points={hexPoints(cell.cx, cell.cy, r)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** Jednoduchý šestiúhelník (odrážky, ikony). */
export function Hex({ className = '', filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 21" className={className} aria-hidden="true" focusable="false">
      <polygon
        points="6,0.8 18,0.8 23.2,10.5 18,20.2 6,20.2 0.8,10.5"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
