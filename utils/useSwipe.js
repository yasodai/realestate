import { useState } from "react";

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function useSwipe() {
  const [direction, setDirection] = useState(0);
  const [originX, setOriginX] = useState(0);

  const onPressStart = (e) => {
    e = unify(e);

    setOriginX(e.clientX);
  };

  const onPressEnd = (e) => {
    e = unify(e);

    setDirection(-1 * Math.sign(e.clientX - originX));
    setOriginX(0);

    requestAnimationFrame(() => setDirection(0));
  };

  return { direction, onPressStart, onPressEnd };
}

export default useSwipe;