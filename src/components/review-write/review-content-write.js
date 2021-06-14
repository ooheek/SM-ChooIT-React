import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import React from 'react';

export default function ReviewContentWrite() {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }

    return(
        <>
        {/* <Editor editorState={editorState} onChange={onChange} plugins={imagePlugin} /> */}
        <div style={{ margin: '10px 0', border: 'none', minHeight: "16rem", cursor: "text", fontSize: '16px', color: '#4d4d4d', wordBreak: 'keep-all' }} onClick={focusEditor}>
        <Editor
            ref={editor}
            editorState={editorState}
            onChange={setEditorState}
            placeholder='제품에 대해서 자유롭게 리뷰를 남겨주세요'
        />
        </div>
        </>
    )
}