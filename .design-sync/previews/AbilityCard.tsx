import { AbilityCard } from 'portfolio-ui';

const Stage = ({ children, width = 520 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'grid', gap: 8, width }}>{children}</div>
);

export const MissionLog = () => (
  <Stage>
    <AbilityCard icon index={1} title="EDGE TPU" desc="Integrated a Google Coral Edge TPU: 7× faster inference, from 10 to 70 FPS." />
    <AbilityCard icon index={2} title="TOF DETECTION" desc="ToF person and door detection at 32 FPS with distance and bearing." />
    <AbilityCard icon core index={3} title="SENSOR FUSION" desc="Multi threaded sensor fusion on Linux." />
  </Stage>
);

export const Inline = () => (
  <Stage width={760}>
    <AbilityCard inline index={1} title="LIVE HELMET FEED" desc="A phone on the helmet streams video to the commander's HUD over WebRTC." />
    <AbilityCard inline index={2} title="OBJECT DETECTION" desc="Detections are drawn over the feed and ranked by priority: people first." />
  </Stage>
);

export const Plain = () => (
  <Stage width={320}>
    <AbilityCard index={1} title="VIDEO UPLOAD" desc="Players record practice deliveries and upload them straight from the app." />
  </Stage>
);
