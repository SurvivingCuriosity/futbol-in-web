import { cn } from "@/src/shared/utils/cn";
import { type LucideIcon } from "lucide-react";

export type MedalTier = 1 | 2 | 3 | 4 | 5;

export type MedalShape =
  | "shield"
  | "hexagon"
  | "star"
  | "diamond"
  | "blob"
  | "octagon"
  | "burst"
  | "crystal"
  | "shuriken"
  | "rosette";

interface MedalProps {
  tier: MedalTier;
  icon: LucideIcon;
  label?: string;
  shape?: MedalShape;
  size?: number;
}

// Clip paths para formas curiosas
const SHAPE_CLIPS: Record<MedalShape, string> = {
  shield:
    "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)",
  hexagon:
    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  star:
    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  diamond:
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  blob:
    "polygon(50% 0%, 80% 10%, 100% 35%, 95% 70%, 70% 100%, 30% 95%, 5% 75%, 0% 40%, 15% 10%)",
  octagon:
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  burst:
    "polygon(50% 0%, 60% 18%, 80% 10%, 78% 32%, 100% 38%, 85% 55%, 100% 75%, 75% 75%, 70% 100%, 50% 85%, 30% 100%, 25% 75%, 0% 75%, 15% 55%, 0% 38%, 22% 32%, 20% 10%, 40% 18%)",
  crystal:
    "polygon(50% 0%, 90% 25%, 80% 95%, 50% 100%, 20% 95%, 10% 25%)",
  shuriken:
    "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
  rosette:
    "polygon(50% 0%, 65% 12%, 85% 8%, 88% 28%, 100% 42%, 92% 60%, 96% 80%, 78% 84%, 65% 98%, 50% 88%, 35% 98%, 22% 84%, 4% 80%, 8% 60%, 0% 42%, 12% 28%, 15% 8%, 35% 12%)",
};

// Gradientes por tier (escalando en complejidad)
const TIER_STYLES: Record<
  MedalTier,
  {
    bg: string;
    inner: string;
    glow: string;
    ring: string;
    iconColor: string;
    label: string;
    rim: string;
  }
> = {
  1: {
    label: "Bronce",
    // Plano bronce
    bg: "linear-gradient(135deg, oklch(0.55 0.12 50), oklch(0.42 0.10 45))",
    inner:
      "radial-gradient(circle at 30% 30%, oklch(0.72 0.13 55 / 0.6), transparent 60%)",
    glow: "0 0 0 transparent",
    ring: "oklch(0.45 0.10 45)",
    iconColor: "oklch(0.95 0.04 80)",
    rim: "linear-gradient(135deg, oklch(0.7 0.12 55), oklch(0.35 0.08 40))",
  },
  2: {
    label: "Plata",
    // Degradado plata con leve brillo
    bg: "linear-gradient(135deg, oklch(0.85 0.02 250), oklch(0.6 0.02 250))",
    inner:
      "radial-gradient(circle at 30% 25%, oklch(0.98 0.01 250 / 0.85), transparent 55%)",
    glow: "0 0 18px oklch(0.85 0.04 250 / 0.45)",
    ring: "oklch(0.7 0.02 250)",
    iconColor: "oklch(0.25 0.02 250)",
    rim: "linear-gradient(135deg, oklch(0.95 0.02 250), oklch(0.55 0.02 250))",
  },
  3: {
    label: "Oro",
    // Oro con neón cálido
    bg: "linear-gradient(135deg, oklch(0.88 0.17 90), oklch(0.65 0.18 70), oklch(0.78 0.18 85))",
    inner:
      "radial-gradient(circle at 35% 30%, oklch(0.98 0.10 95 / 0.9), transparent 60%)",
    glow:
      "0 0 25px oklch(0.82 0.18 80 / 0.7), 0 0 50px oklch(0.75 0.18 75 / 0.4)",
    ring: "oklch(0.75 0.18 80)",
    iconColor: "oklch(0.28 0.08 60)",
    rim: "linear-gradient(135deg, oklch(0.95 0.15 95), oklch(0.55 0.15 65))",
  },
  4: {
    label: "Platino",
    // Holográfico cyan/magenta
    bg: "conic-gradient(from 180deg at 50% 50%, oklch(0.75 0.20 200), oklch(0.7 0.25 320), oklch(0.8 0.18 180), oklch(0.75 0.22 280), oklch(0.75 0.20 200))",
    inner:
      "radial-gradient(circle at 30% 25%, oklch(0.98 0.05 220 / 0.9), transparent 55%)",
    glow:
      "0 0 30px oklch(0.7 0.25 320 / 0.7), 0 0 60px oklch(0.75 0.22 200 / 0.5)",
    ring: "oklch(0.78 0.22 280)",
    iconColor: "oklch(0.98 0.02 250)",
    rim: "linear-gradient(135deg, oklch(0.85 0.20 200), oklch(0.7 0.25 320))",
  },
  5: {
    label: "Diamante",
    // Máxima complejidad: prisma con neón intenso
    bg: "conic-gradient(from 0deg at 50% 50%, oklch(0.75 0.27 0), oklch(0.78 0.25 50), oklch(0.85 0.22 100), oklch(0.78 0.25 160), oklch(0.75 0.27 220), oklch(0.7 0.28 290), oklch(0.75 0.27 360))",
    inner:
      "radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.95), transparent 50%), radial-gradient(circle at 70% 80%, oklch(0.9 0.2 320 / 0.5), transparent 55%)",
    glow:
      "0 0 35px oklch(0.78 0.27 320 / 0.85), 0 0 70px oklch(0.75 0.27 220 / 0.6), 0 0 110px oklch(0.78 0.25 50 / 0.45)",
    ring: "oklch(0.85 0.25 320)",
    iconColor: "oklch(0.99 0 0)",
    rim: "conic-gradient(from 0deg, oklch(0.9 0.25 0), oklch(0.85 0.25 100), oklch(0.85 0.25 200), oklch(0.85 0.25 300), oklch(0.9 0.25 360))",
  },
};

export function Medal({
  tier,
  icon: Icon,
  label,
  shape = "shield",
  size = 128,
}: MedalProps) {
  const style = TIER_STYLES[tier];
  const clipPath = SHAPE_CLIPS[shape];

  const isHighTier = tier >= 4;
  const isMaxTier = tier === 5;

  return (
    <div className="flex flex-col items-center gap-1 group w-fit">
      <div
        className="relative transition-transform duration-300"
        style={{
          width: size,
          height: size,
          filter: `drop-shadow(${style.glow})`,
        }}
      >
        {/* Halo neon exterior para tiers altos */}
        {isHighTier && (
          <div
            className="absolute inset-0 -z-10 animate-pulse"
            style={{
              clipPath,
              background: style.bg,
              transform: "scale(1.15)",
              opacity: 0.35,
              filter: "blur(12px)",
            }}
          />
        )}

        {/* Borde / aro exterior */}
        <div
          className="absolute inset-0"
          style={{
            clipPath,
            background: style.rim,
          }}
        />

        {/* Cuerpo principal */}
        <div
          className="absolute"
          style={{
            inset: size * 0.06,
            clipPath,
            background: style.bg,
            backgroundSize: isMaxTier ? "200% 200%" : "100% 100%",
            animation: isMaxTier
              ? "medal-shimmer 6s ease infinite"
              : undefined,
          }}
        />

        {/* Brillo interior */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: size * 0.06,
            clipPath,
            background: style.inner,
            mixBlendMode: "screen",
          }}
        />

        {/* Reflejo diagonal (tiers 3+) */}
        {tier >= 3 && (
          <div
            className="absolute pointer-events-none"
            style={{
              inset: size * 0.06,
              clipPath,
              background:
                "linear-gradient(110deg, transparent 35%, oklch(1 0 0 / 0.55) 48%, transparent 62%)",
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Partículas / chispas para tier 5 */}
        {isMaxTier && (
          <>
            <span
              className="absolute h-1.5 w-1.5 rounded-full bg-white animate-ping"
              style={{ top: "12%", left: "18%" }}
            />
            <span
              className="absolute h-1 w-1 rounded-full bg-white animate-ping"
              style={{ top: "70%", right: "14%", animationDelay: "0.6s" }}
            />
            <span
              className="absolute h-1 w-1 rounded-full bg-white animate-ping"
              style={{ bottom: "12%", left: "30%", animationDelay: "1.1s" }}
            />
          </>
        )}

        {/* Icono central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            size={size * 0.5}
            color={style.iconColor}
            strokeWidth={2.5}
            style={{
              filter: isHighTier
                ? `drop-shadow(0 0 6px ${style.ring}) drop-shadow(0 1px 2px oklch(0 0 0 / 0.4))`
                : "drop-shadow(0 1px 2px oklch(0 0 0 / 0.5))",
            }}
          />
        </div>

        {/* Indicador de tier (estrellas) */}
        {/* <div
          className="absolute left-1/2 -translate-x-1/2 flex gap-0.5"
          style={{ bottom: -size * 0.2 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full border border-black/30",
                i < tier ? "shadow-[0_0_6px_currentColor]" : "opacity-25",
              )}
              style={{
                background: i < tier ? style.ring : "oklch(0.3 0 0)",
                color: style.ring,
              }}
            />
          ))}
        </div> */}
      </div>

      {label && (
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{label}</p>
        </div>
      )}
    </div>
  );
}