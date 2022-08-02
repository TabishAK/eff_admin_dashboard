import React from "react";

export default function TextArea(props) {
  return (
    <textArea
      style={{
        width: "100%",
        borderColor: "#c9d1d6",
        padding: "12px",
        fontWeight: "100",
        borderRadius: "5px",
        ...props.style,
      }}
      disabled={props.disabled}
      onChange={props.onChange}
      name={props.name}
      placeholder={props.placeholder}
    >
      {props.value}
    </textArea>
  );
}
