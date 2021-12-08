import React from 'react';

class FrameUpload extends React.Component {
    
    uploadFile = () => {
        document.getElementById("loader").classList.add("active");
        const file = document.getElementById("uploadFile").files[0];
        const fileName = file.name;

        const fileParts = fileName.split(".");
        const extension = fileParts[fileParts.length - 1];
        
        if (extension === "txt") {
            const data = new FormData();
            data.append("file", file);
            fetch(
                "http://localhost:8080/domains/upload", 
                {
                    method: 'post',
                    body: data
                }
            )
            .then((res) => {
                if (res.status === 204) {
                    alert("The file was uploaded successfully")
                    return null;
                } if (res.status === 400) {
                    alert("You must provide a TXT file")
                    return null;
                }else {
                    alert("UPS! something went wrong")
                    return null;
                }
                
            })
            .then((data) => {
                document.getElementById("loader").classList.remove("active");
                document.getElementById("uploadFile").value = '';
            })
            .catch((error) => { 
                document.getElementById("loader").classList.remove("active"); 
                alert("UPS! something went wrong"); 
                document.getElementById("uploadFile").value = '';
                console.log(error);
            });
        } else {
            alert("You must provide a TXT file");
            document.getElementById("uploadFile").value = '';
            document.getElementById("loader").classList.remove("active");
        }
    }

    render() {
        return(
            <div className="frame">
                <div className="form-preview">
                        <div className="image-container">
                            <img className="small-size-image" src={require('../assets/images/upload.png').default} alt="Search domain" />
                            <br />
                            <br />
                            <div className="main-form">
                                <div>
                                    Select file: <input type="file" id="uploadFile" name="uploadFile" />
                                </div>
                                <br />
                                <br />
                                <button className="btn-form" onClick={this.uploadFile}> Upload file </button> 
                            </div>
                        </div>
                        <div className="validate-result">
                            <h1>Before chosee the file</h1>
                            
                            <div className="info-div">
                                <ul>
                                    <li>Must be a file with TXT extension</li>
                                    <li>The domains are the lines of the file</li>
                                    <li>The process may take several minutes, please be patient</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default FrameUpload;