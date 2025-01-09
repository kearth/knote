import { useState } from 'react';
import { Greet } from "../wailsjs/go/main/App";
import Sidebar from "./layout/Sidebar";
import FileList from "./layout/FileList";
import Welcome from "./layout/Welcome";
import KEditor from "./layout/KEditor";
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [welcome, setWelcome] = useState(true);


    // function greet() {
    //     Greet(name).then(updateResultText);
    // }
    const handleNewFileClick = () => {
        setWelcome(false); // 切换到 FileList 和 Editor
    };

    return (
        <div id="App">
            <Sidebar />
            <div className="content-container">
                {welcome ? (
                    <Welcome setWelcome={handleNewFileClick} />
                ) : (
                    <>
                        <FileList setSelectedFile={setSelectedFile} />
                        <KEditor selectedFile={selectedFile} />
                    </>
                )}
            </div>
        </div>
    )
}

export default App
