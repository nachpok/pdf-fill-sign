import { useDraggable } from "@dnd-kit/core";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { ElementType, Position } from "./Editor";

interface DraggableTextProps {
  id: string;
  style?: React.CSSProperties;
  position: Position;
  text: string;
  handleInputValue: (id: string, value: string) => void;
  setDraggedElementType: (newElementType: ElementType) => void;
}
export default function DraggableText({
  id,
  style,
  position,
  text,
  handleInputValue,
  setDraggedElementType,
}: DraggableTextProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
  });
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputLen, setInputLen] = useState(10);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInputLen(inputValue.length > 10 ? inputValue.length + 2 : 10);
    handleInputValue(id, e.target.value);
  };
  const lastPosition = position?.x
    ? { x: position.x, y: position.y }
    : { x: 0, y: 0 };
  const transformStyle = transform
    ? {
        transform: `translate3d(${transform.x + lastPosition.x}px, ${
          transform.y + lastPosition.y
        }px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...transformStyle }}
      {...listeners}
      {...attributes}
      onMouseEnter={() => setInputFocused(true)}
      onMouseLeave={() => setInputFocused(false)}
    >
      <span>
        <Input
          className="input-component"
          bordered
          style={{
            width: `${inputLen}ch`,
            borderRadius: "0",
            height: "32px",
            backgroundColor: "transparent",
          }}
          onInput={handleInputChange}
          value={text}
        />
      </span>
      {isInputFocused ? (
        <Button
          {...listeners}
          {...attributes}
          style={{ padding: "0px 2px ", borderRadius: "0" }}
          onMouseDown={() => {
            setDraggedElementType(ElementType.text);
          }}
          onMouseUp={() => {
            setDraggedElementType(ElementType.empty);
          }}
        >
          |
        </Button>
      ) : null}
    </div>
  );
}
