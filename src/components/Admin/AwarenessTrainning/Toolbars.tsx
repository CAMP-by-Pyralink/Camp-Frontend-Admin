// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {
//   $isRangeSelection,
//   EditorState,
//   FORMAT_TEXT_COMMAND,
//   SELECTION_CHANGE_COMMAND,
// } from "lexical";
// import { useState, useCallback, useEffect } from "react";

// export default function Toolbars() {
//   const [editor] = useLexicalComposerContext();
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);

//   const $updateToolbar = useCallback(() => {
//     const selection = getSelection();
//     if ($isRangeSelection(selection)) {
//       // update text format
//       setIsBold(selection.hasFormat("bold"));
//       setIsItalic(selection.hasFormat("italic"));
//       setIsUnderline(selection.hasFormat("underline"));
//     }
//   }, []);

//   //
//   useEffect(() => {
//     editor.registerUpdateListener(({ editorState }) => {
//       editorState.read(() => {
//         $updateToolbar();
//       });
//     });
//   }, [editor, $updateToolbar]);

//   return (
//     <div className="toolbars space-x-4 bg-[#EFF2F7] p-2">
//       <button
//         type="button"
//         className={` size-8 bold bg-white border rounded-md ${
//           isBold ? "font-bold" : "font-normal"
//         } `}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
//         }}
//       >
//         B
//       </button>
//       <button
//         type="button"
//         className={`italic size-8 border rounded-md ${
//           isItalic ? "bg-gray-200 font-bold" : "font-normal"
//         } `}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
//         }}
//       >
//         i
//       </button>
//       <button
//         type="button"
//         className={`italic size-8 border rounded-md ${
//           isUnderline ? "bg-gray-200 font-bold" : "font-normal"
//         } `}
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
//         }}
//       >
//         U
//       </button>
//     </div>
//   );
// }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function Toolbars() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className="toolbar bg-gray-300 text-white flex items-center gap-4"
      ref={toolbarRef}
    >
      <button
        // disabled={!canUndo}
        type="button"
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        {/* <i className="format undo" /> */}
        redo
      </button>
      <button
        disabled={!canRedo}
        type="button"
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        {/* <i className="format bold" /> */}B
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        {/* <i className="format italic" /> */}I
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        {/* <i className="format underline" /> */}U
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        {/* <i className="format strikethrough" /> */}
        strikethrough
      </button>
      <Divider />
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        {/* <i className="format left-align" /> */}
        align left
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        {/* <i className="format center-align" /> */}
        center align
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        {/* <i className="format right-align" /> */}
        right
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        {/* <i className="format justify-align" /> */}
        center
      </button>{" "}
    </div>
  );
}
