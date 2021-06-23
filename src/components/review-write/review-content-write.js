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

export default function ReviewContentWrite({ setReview }) {
  return (
    <>
      <EditorWrapper>
        <CKEditor
          editor={ClassicEditor}
          type="classic"
          config={editorConfiguration}
          onChange={(event, editor) => {
            const data = editor.getData()
            setReview((prev) => ({
              ...prev,
              review_text: data,
            }))
          }}
        />
      </EditorWrapper>
    </>
  )
}
