// import React from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { EditorState } from "lexical";
// import ToolbarPlugin from "./ToolbarPlugin";
// import { ListNode, ListItemNode } from "@lexical/list";
// import ErrorBoundary from "./ErrorBoundary"; // Custom error boundary component

// const LexicalEditor: React.FC = () => {
//   const initialConfig = {
//     namespace: "MyEditor",
//     onError: (error: Error) => console.error(error),
//     nodes: [ListNode, ListItemNode], // Register list nodes for functionality
//   };

//   const onChange = (editorState: EditorState) => {
//     editorState.read(() => {
//       const content = editorState.toJSON(); // Serialized editor state
//       console.log("Editor content:", content);
//     });
//   };

//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <div className="">
//         <ToolbarPlugin />
//         <RichTextPlugin
//           contentEditable={<ContentEditable className="editor-input" />}
//           placeholder={
//             <div className="editor-placeholder">Start typing...</div>
//           }
//           ErrorBoundary={ErrorBoundary}
//         />
//         <OnChangePlugin onChange={onChange} />
//         <HistoryPlugin />
//       </div>
//     </LexicalComposer>
//   );
// };

// export default LexicalEditor;

import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import Toolbars from "./Toolbars";

const theme = {
  // Theme styling goes here
  //...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: exampleTheme,
    onError,
  };

  return (
    <div className=" w-full bg-white shadow-md h-[200px] border  ">
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbars />
        <RichTextPlugin
          contentEditable={<ContentEditable className=" focus:outline-none" />}
          placeholder={<div>Write here...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
}

const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
    h6: "editor-heading-h6",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listItem",
    listitemChecked: "editor-listItemChecked",
    listitemUnchecked: "editor-listItemUnchecked",
  },
  hashtag: "editor-hashtag",
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "font-bold",
    code: "editor-textCode",
    italic: " italic",
    strikethrough: "editor-textStrikethrough",
    subscript: "editor-textSubscript",
    superscript: "editor-textSuperscript",
    underline: "editor-textUnderline",
    underlineStrikethrough: "editor-textUnderlineStrikethrough",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};
