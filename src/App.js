import { useState } from "react";
import styled from "styled-components";
import MagicInput from "./MagicInput";
import "./styles.css";

export default function App() {
  const [value, setValue] = useState("");

  // ideas:
  // add kbd cmd + k to erase with magic
  return (
    <Container>
      <MagicInput
        placeholder="Enter your name..."
        label="Name"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Container>
  );
}

const Container = styled.div({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  margin: "auto",
  maxWidth: 700,
  padding: "0 32px"
});
