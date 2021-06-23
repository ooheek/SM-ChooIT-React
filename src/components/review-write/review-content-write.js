// CKEditor 4 추가
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import React from 'react'
import styled from 'styled-components'

import MyUploadAdapter from './imageAdaptor'

const EditorWrapper = styled.div`
  margin: 15px 0;
`

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}

const editorConfiguration = {
  toolbar: {
    items: ['bold', 'imageUpload', 'undo', 'redo'],
  },
  // plugins: [ImageInsert]
  extraPlugins: [MyCustomUploadAdapterPlugin],
}

export default function ReviewContentWrite() {
  return (
    <>
      {/* <Editor editorState={editorState} onChange={onChange} plugins={imagePlugin} /> */}
      {/* <div style={{ margin: '15px 0', border: 'none', minHeight: "16rem", cursor: "text", fontSize: '16px', color: '#4d4d4d', wordBreak: 'keep-all' }} onClick={focusEditor}>
        <Editor
            ref={editor}
            editorState={editorState}
            onChange={setEditorState}
            placeholder='제품에 대해서 자유롭게 리뷰를 남겨주세요'
        />
        </div> */}
      <EditorWrapper>
        <CKEditor
          editor={ClassicEditor}
          type="classic"
          config={editorConfiguration}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            console.log({ event, editor, data })
          }}
        />
      </EditorWrapper>
    </>
  )
}
