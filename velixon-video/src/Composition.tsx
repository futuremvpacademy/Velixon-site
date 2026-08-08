import { Composition } from "remotion";
import { VelixonAuditFilm, type VelixonAuditFilmProps } from "./VelixonAuditFilm";

const defaultProps: VelixonAuditFilmProps = {
  ctaLabel: "REQUEST YOUR FREE SYSTEMS AUDIT",
  ctaUrl: "velixon.net/free-audit",
};

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="VelixonAudit"
        component={VelixonAuditFilm}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </>
  );
};
