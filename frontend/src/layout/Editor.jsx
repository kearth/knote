import React from "react";
import "./Editor.css";

function Editor({ selectedFile }) {
    return (
        <div className="editor">
            {selectedFile ? (
                <>
                    <h2>{selectedFile.title}</h2>
                    <textarea defaultValue={selectedFile.content} />
                </>
            ) : (
                <p>Area</p>
            )}
        </div>
    );
}

export default Editor;
