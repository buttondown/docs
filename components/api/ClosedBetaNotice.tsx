import Notice from "../Notice";

export default function ClosedBetaNotice() {
  return (
    <Notice variant="info">
      This endpoint is currently in closed beta! If you are interested in using
      it, <a href="#">email me</a>
      &nbsp;and I will get you situated.
    </Notice>
  );
}
