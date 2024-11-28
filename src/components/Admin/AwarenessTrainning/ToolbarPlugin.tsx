import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  //   OUTDENT_LIST_ITEM_COMMAND,
  //   INDENT_LIST_ITEM_COMMAND,
} from "@lexical/list"; // Ensure this import path is correct

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar">
      {/* Formatting Buttons */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        Bold
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        Italic
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        Underline
      </button>

      {/* List Management Buttons */}
      <button
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
      >
        Ordered List
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
      >
        Unordered List
      </button>
      {/* <button
        onClick={() =>
          editor.dispatchCommand(OUTDENT_LIST_ITEM_COMMAND, undefined)
        }
      >
        Outdent
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(INDENT_LIST_ITEM_COMMAND, undefined)
        }
      >
        Indent
      </button> */}
    </div>
  );
};

export default ToolbarPlugin;
