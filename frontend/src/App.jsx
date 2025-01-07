import { useState } from 'react';
import { Greet } from "../wailsjs/go/main/App";
import Sidebar from "./layout/Sidebar";
import FileList from "./layout/FileList";
import Editor from "./layout/Editor";
import Welcome from "./layout/Welcome";
import './App.css';

// 是否显示欢迎界面
function IsWelcome() {
    return true;
}

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div id="App">
            <Sidebar />
            <div className="content-container">
                {IsWelcome() ? (
                    <Welcome />
                ) : (
                    <>
                        < FileList setSelectedFile={setSelectedFile} />
                        <Editor selectedFile={selectedFile} />
                    </>
                )}
            </div>
        </div>
    )
}

export default App
