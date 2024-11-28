import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import ToolbarPlugin from "./ToolbarPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import ErrorBoundary from "./ErrorBoundary"; // Custom error boundary component

const LexicalEditor: React.FC = () => {
  const initialConfig = {
    namespace: "MyEditor",
    onError: (error: Error) => console.error(error),
    nodes: [ListNode, ListItemNode], // Register list nodes for functionality
  };

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const content = editorState.toJSON(); // Serialized editor state
      console.log("Editor content:", content);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={
            <div className="editor-placeholder">Start typing...</div>
          }
          ErrorBoundary={ErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
