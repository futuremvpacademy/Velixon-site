import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type VelixonAuditFilmProps = {
  ctaLabel: string;
  ctaUrl: string;
};

const COLORS = {
  background: "#07070b",
  violet: "#9a8cff",
  lavender: "#d8d0ff",
  white: "#f7f5f0",
  muted: "#aaa6b2",
};

const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

const enter = (frame: number, from = 0, to = 16) =>
  interpolate(frame, [from, to], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const exit = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [1, 0], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const sceneOpacity = (frame: number, duration: number, hold = false) =>
  enter(frame, 0, 14) * (hold ? 1 : exit(frame, duration - 16, duration));

const BrandWordmark = ({ style }: { style?: CSSProperties }) => (
  <div className="vx-wordmark" style={style}>
    <span>VELI</span><span className="vx-wordmark-x">X</span><span>ON</span>
  </div>
);

const FontReadyGate = () => {
  const [handle] = useState(() => delayRender("Loading Outfit Variable"));

  useEffect(() => {
    void document.fonts.ready.then(
      () => continueRender(handle),
      () => continueRender(handle),
    );
  }, [handle]);

  return null;
};

const AmbientBackground = () => {
  const frame = useCurrentFrame();
  const gridShift = interpolate(frame, [0, 540], [0, -34]);
  const scanPosition = interpolate(frame, [0, 72], [-20, 125], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandOpacity = interpolate(frame, [60, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="vx-background">
      <div
        className="vx-grid"
        style={{ transform: `translate3d(${gridShift}px, ${gridShift * 0.55}px, 0)` }}
      />
      <div className="vx-glow vx-glow-one" />
      <div className="vx-glow vx-glow-two" />
      <div className="vx-scan" style={{ left: `${scanPosition}%` }} />
      <div className="vx-vignette" />
      <BrandWordmark style={{ opacity: brandOpacity }} />
      <div className="vx-frame-number">SYSTEMS / 01—05</div>
    </AbsoluteFill>
  );
};

const Scene = ({
  children,
  duration,
  className = "",
  hold = false,
}: {
  children: ReactNode;
  duration: number;
  className?: string;
  hold?: boolean;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      className={`vx-scene ${className}`}
      style={{ opacity: sceneOpacity(frame, duration, hold) }}
    >
      {children}
    </AbsoluteFill>
  );
};

const IntroScene = () => {
  const frame = useCurrentFrame();
  const opacity = enter(frame, 4, 26) * exit(frame, 45, 60);
  const tracking = interpolate(frame, [4, 34], [0.58, 0.28], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [4, 36], [0.985, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="vx-scene vx-intro" style={{ opacity }}>
      <BrandWordmark style={{ letterSpacing: `${tracking}em`, transform: `scale(${scale})` }} />
      <div className="vx-intro-rule" style={{ transform: `scaleX(${enter(frame, 12, 40)})` }} />
    </AbsoluteFill>
  );
};

const FrictionScene = ({ duration }: { duration: number }) => {
  const frame = useCurrentFrame();
  const first = enter(frame, 5, 24);
  const second = enter(frame, 15, 38);

  return (
    <Scene duration={duration} className="vx-friction">
      <div className="vx-copy-block">
        <div className="vx-kicker" style={{ opacity: first }}>START WITH THE BOTTLENECK</div>
        <h1>
          <span style={{ opacity: first, transform: `translateY(${(1 - first) * 54}px)` }}>
            FIND WHAT IS
          </span>
          <span
            className="vx-accent-line"
            style={{ opacity: second, transform: `translateY(${(1 - second) * 58}px)` }}
          >
            SLOWING YOU DOWN.
          </span>
        </h1>
      </div>
    </Scene>
  );
};

const systemLabels = ["WEBSITE", "LEADS", "OPERATIONS", "REVENUE FLOW", "SOFTWARE"];

const SystemsScene = ({ duration }: { duration: number }) => {
  const frame = useCurrentFrame();
  const lineProgress = enter(frame, 8, 74);

  return (
    <Scene duration={duration} className="vx-systems">
      <div className="vx-kicker vx-kicker-centered" style={{ opacity: enter(frame, 0, 18) }}>
        FIVE CONNECTED AREAS
      </div>
      <div className="vx-system-map">
        <div className="vx-system-line" style={{ transform: `scaleX(${lineProgress})` }} />
        {systemLabels.map((label, index) => {
          const progress = enter(frame, 18 + index * 11, 34 + index * 11);
          const pulse = index === 2
            ? 1 + Math.sin(Math.max(0, frame - 62) / 5) * 0.045 * enter(frame, 58, 74)
            : 1;
          return (
            <div className="vx-system-item" key={label} style={{ opacity: progress }}>
              <div
                className="vx-system-node"
                style={{ transform: `scale(${progress * pulse})` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="vx-system-label">{label}</div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

const ClarityScene = ({ duration }: { duration: number }) => {
  const frame = useCurrentFrame();
  const first = enter(frame, 4, 24);
  const second = enter(frame, 18, 42);
  const trace = enter(frame, 12, 70);

  return (
    <Scene duration={duration} className="vx-clarity">
      <div className="vx-trace" style={{ transform: `scaleX(${trace})` }}>
        {[0, 1, 2, 3, 4].map((item) => <i key={item} />)}
      </div>
      <div className="vx-copy-block vx-copy-block-centered">
        <h2>
          <span style={{ opacity: first, transform: `translateY(${(1 - first) * 42}px)` }}>
            SEE THE GAPS.
          </span>
          <span
            className="vx-accent-line"
            style={{ opacity: second, transform: `translateY(${(1 - second) * 46}px)` }}
          >
            FIX THE RIGHT SYSTEM FIRST.
          </span>
        </h2>
      </div>
    </Scene>
  );
};

const AuditScene = ({ duration }: { duration: number }) => {
  const frame = useCurrentFrame();
  const outline = enter(frame, 0, 32);
  const kicker = enter(frame, 8, 26);
  const titleOne = enter(frame, 18, 40);
  const titleTwo = enter(frame, 28, 52);

  return (
    <Scene duration={duration} className="vx-audit-scene">
      <div
        className="vx-audit-outline"
        style={{ opacity: outline, transform: `scale(${0.985 + outline * 0.015})` }}
      />
      <div className="vx-audit-copy">
        <div className="vx-kicker" style={{ opacity: kicker }}>INTRODUCING</div>
        <h2>
          <span style={{ opacity: titleOne, transform: `translateY(${(1 - titleOne) * 44}px)` }}>
            FREE BUSINESS
          </span>
          <span
            className="vx-audit-title-accent"
            style={{ opacity: titleTwo, transform: `translateY(${(1 - titleTwo) * 48}px)` }}
          >
            SYSTEMS AUDIT
          </span>
        </h2>
      </div>
    </Scene>
  );
};

const FinalScene = ({ duration, ctaLabel, ctaUrl }: { duration: number } & VelixonAuditFilmProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, 0, 20);
  const buttonSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 24, stiffness: 120, mass: 0.9 },
    durationInFrames: 34,
  });
  const url = enter(frame, 28, 44);

  return (
    <Scene duration={duration} className="vx-final" hold>
      <div className="vx-final-card" style={{ opacity: title, transform: `translateY(${(1 - title) * 30}px)` }}>
        <div className="vx-kicker">FREE BUSINESS SYSTEMS AUDIT</div>
        <h2>FIND THE GAP.<br /><span>FIX THE RIGHT SYSTEM.</span></h2>
        <div
          className="vx-cta"
          style={{ opacity: buttonSpring, transform: `scale(${0.98 + buttonSpring * 0.02})` }}
        >
          <span>{ctaLabel}</span><b>↗</b>
        </div>
        <div className="vx-url" style={{ opacity: url }}>{ctaUrl}</div>
      </div>
    </Scene>
  );
};

export const VelixonAuditFilm = ({ ctaLabel, ctaUrl }: VelixonAuditFilmProps) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background, color: COLORS.white }}>
    <FontReadyGate />
    <AmbientBackground />
    <Sequence durationInFrames={60}><IntroScene /></Sequence>
    <Sequence from={60} durationInFrames={105}><FrictionScene duration={105} /></Sequence>
    <Sequence from={165} durationInFrames={120}><SystemsScene duration={120} /></Sequence>
    <Sequence from={285} durationInFrames={90}><ClarityScene duration={90} /></Sequence>
    <Sequence from={375} durationInFrames={75}><AuditScene duration={75} /></Sequence>
    <Sequence from={450} durationInFrames={90} premountFor={30}>
      <FinalScene duration={90} ctaLabel={ctaLabel} ctaUrl={ctaUrl} />
    </Sequence>
  </AbsoluteFill>
);
