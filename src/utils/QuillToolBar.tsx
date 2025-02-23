import React from "react";
import Quill from "quill";
// import Right from "../assets/arrow-right.svg";
// import Left from "../assets/arrow-left.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => <ArrowLeft />;

// Redo button icon component for Quill editor
const CustomRedo = () => <ArrowRight />;

// Undo and redo functions for Custom Toolbar
function undoChange(this: { quill: { history: { undo: () => void } } }) {
  this.quill.history.undo();
}
function redoChange(this: { quill: { history: { redo: () => void } } }) {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (props: any) => ({
  toolbar: {
    container: "#" + props,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props: { toolbarId: string }) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div
          className="w-full flex items-center justify-between"
          style={{ height: "3rem" }}
          id={props.toolbarId}
        >
          <div className="w-full">
            <span className="ql-formats">
              <select className="ql-header">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
                <option value="" selected>
                  Normal
                </option>
              </select>
            </span>
            <span className="ql-formats">
              <button className="ql-bold" />
              <button className="ql-italic" />
              <button className="ql-underline" />
              {/* <button className="ql-strike" /> */}
            </span>
            {/* <span className="ql-formats">
              <button className="ql-list" value="ordered" />
              <button className="ql-list" value="bullet" />
              <button className="ql-indent" value="-1" />
              <button className="ql-indent" value="+1" />
            </span> */}
            {/* <span className="ql-formats">
              <button className="ql-script" value="super" />
              <button className="ql-script" value="sub" />
              <button className="ql-blockquote" />
              <button className="ql-direction" />
            </span> */}
            <span className="ql-formats">
              <button className="ql-align" value="" />
              <button className="ql-align" value="center" />
              <button className="ql-align" value="right" />
              <button className="ql-align" value="justify" />
              <button className="ql-list" value="ordered" />
              {/* <select className='ql-color' />
						<select className='ql-background' /> */}
            </span>
            <span className="ql-formats">
              <button className="ql-link" />
              {/* <button className="ql-image" /> */}
              {/* <button className="ql-video" /> */}
            </span>
            <span className="ql-formats">
              <button className="ql-formula text-red-" />
              <button className="ql-code-block" />
              <button className="ql-clean" />
            </span>
          </div>
          {/* <div className="w-[5rem]">
            <span className="ql-formats">
              <button className="ql-undo">
                <CustomUndo />
              </button>
              <button className="ql-redo">
                <CustomRedo />
              </button>
            </span>
          </div> */}
        </div>
      )}
    </>
  );
};
export default QuillToolbar;
