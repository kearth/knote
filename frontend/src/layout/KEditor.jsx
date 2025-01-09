import React from "react";
import { useEffect, useState } from "react";
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import "./KEditor.css";

function KEditor({ selectedFile }) {
    const [editor, setEditor] = useState(null)
    const [html, setHtml] = useState('<p>hello</p>')

    useEffect(() => {
        setTimeout(() => {
            setHtml('<p></p>')
        }, 1500)
    }, [])
    const toolbarConfig = {}
    const editorConfig = {
        // TS 语法
        placeholder: '请输入内容...',
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <div className="keditor">
            <div>{selectedFile?.title || "Untitled"}</div>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={(editor) => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '100%', overflowY: 'hidden' }}
            />
        </div>
    );
}

export default KEditor;
