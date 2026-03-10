type Props = {
  x: number
  y: number
}

const CursorGlow = ({ x, y }: Props) => (
  <div
    aria-hidden
    className="pointer-events-none fixed h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl transition-transform duration-150 ease-out"
    style={{ transform: `translate(${x - 128}px, ${y - 128}px)` }}
  />
)

export default CursorGlow
