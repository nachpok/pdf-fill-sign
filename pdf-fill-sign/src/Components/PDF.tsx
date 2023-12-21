import React, {  useCallback, useEffect, useState } from "react";
import "./Editor.css"
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDFDocument, StandardFonts, rgb, setLineHeight } from "pdf-lib";
import { Button } from "antd";
import "pdfjs-dist/build/pdf.worker.entry";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { DndContext, DragEndEvent, useSensor, useSensors } from "@dnd-kit/core";
import { degrees } from "pdf-lib";
import DraggableText from "./DraggableText";
import { SmartPointerSensor } from "../SmartPointerSensor";
import SignPopover from "./SignPopover";
import DraggableSignature from "./DraggableSignature";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1920;

export enum ElementType {
  text = "text",
  sign = "sign",
  empty = "empty",
}
interface DraggableElement {
  text: string;
  id: string;
  page: number;
  localPosition: {
    x: number;
    y: number;
  };
  downloadPosition: {
    x: number;
    y: number;
  };
}

export type Position = {
  x: number;
  y: number;
};

export interface Positions {
  [key: string]: {
    x: number;
    y: number;
  };
}
function PDF() {
  const [file, setFile] = useState<File>();
  const [pdfString, setPdfString] = useState<string>();
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [elementType, setElementType] = useState<ElementType>(
    ElementType.empty
  );
  const [fileName, setFileName] = useState<string>("");
  const [shouldDownload, setShouldDownload] = useState(false);
  const [draggableTexts, setDraggableTexts] = useState<DraggableElement[]>([]);
  const [draggableSignatures, setDraggableSignatures] = useState<
    DraggableElement[]
  >([]);
  const [draggedElementType, setDraggedElementType] = useState<ElementType>(
    ElementType.empty
  );
  const [textIdCounter, setTextIdCounter] = useState<number>(0);
  const [signIdCounter, setSignIdCounter] = useState<number>(0);
  const [svg, setSvg] = useState<string>("");
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
  }, []);
  const sensors = useSensors(useSensor(SmartPointerSensor));
  // useResizeObserver(containerRef, resizeObserverOptions, onResize);
  return (
    <div>PDF</div>
  )
}

export default PDF