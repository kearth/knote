import React from "react";
import "./FileList.css";

function FileList({ setSelectedFile }) {
    const files = [
        { id: 1, title: "Poem of the Day", content: "New Year's morning..." },
        { id: 2, title: "Meeting Notes", content: "Discussed project updates." },
    ];

    return (
        <div className="file-list">
            {files.map((file) => (
                <div
                    key={file.id}
                    className="file-item"
                    onClick={() => setSelectedFile(file)}
                >
                    {file.title}
                </div>
            ))}
        </div>
    );
}

export default FileList;
