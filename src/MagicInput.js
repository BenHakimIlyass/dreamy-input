import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const inOut = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const MagicInput = (props) => {
  const ref = useRef(null);

  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);

    const timeout = setTimeout(() => {
      setIsChanging(false);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.value]);

  return (
    <Playground>
      <AnimationLayer onClick={() => ref.current?.focus()}>
        <div>
          <AnimatePresence mode="sync">
            {props.value.split("").map((char, index) => (
              <motion.span
                key={`char-${index}`}
                {...inOut}
                transition={{ delay: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </AnimationLayer>
      <StyledInput ref={ref} type="text" {...props} isChanging={isChanging} />
    </Playground>
  );
};

const AnimationLayer = styled.div({
  position: "absolute",
  zIndex: 0,
  cursor: "text",
  fontSize: 16,
  width: "100%",
  borderWidth: 1,
  padding: 16,
  paddingTop: 17,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  color: "white",
  overflowX: "hidden"
});

const StyledInput = styled.input({
  borderRadius: 8,
  zIndex: 1,
  outline: "none",
  fontSize: 16,
  padding: 16,
  boxSizing: "border-box",
  cursor: "text",
  color: "transparent",
  backgroundColor: "transparent",
  width: "100%",
  position: "absolute",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "gray",
  "&::placeholder": {
    transition: "0.2s",
    opacity: ({ isChanging }) => (isChanging ? 0 : 1)
  },
  caretColor: ({ isChanging }) =>
    isChanging ? "transparent" : "white !important",
  transition: "all 0.2s",
  "&:focus": {
    borderColor: "#b8b8b8",
    boxShadow: ({ isChanging }) =>
      isChanging
        ? "0px 0px 90px 15px rgba(90,90,90,1)"
        : "0px 0px 55px 15px rgba(46,46,46,1)"
  }
});

const Playground = styled.div({
  position: "relative",
  flex: 1,
  background: "red"
});

export default MagicInput;
