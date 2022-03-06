import React, {ChangeEventHandler, FC, useCallback, useRef} from 'react';
import styled from 'styled-components'
import axios from 'axios'

// 上传form data
// loading, success,
// 分片files
interface PostResponse {

}

interface UploadFile extends File{

}
interface UploadProps {
    onSuccess?: (file: UploadFile)=> any
    onError?: (file: UploadFile)=>any
    onProgress?:( percentage: Number, file: UploadFile)=> any

}


const Upload: FC<UploadProps> = (props) => {
    const {
        onSuccess,
        onError,
        onProgress,

    } = props
    const inputRef = useRef<HTMLInputElement>(null);
    const handleUpload = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }, [])

    // core
    const uploadFile = useCallback((file) => {
        console.log("file")
        const formData = new FormData();
        formData.append(file.name, file)
        axios.post<PostResponse>("https://my-json-server.typicode.com/typicode/demo/comments",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress:  (e: any)=>{
                    console.log("e", e)
                    const percentage = Math.floor(e.loaded * 100 / e.total)
                    if (percentage < 100) {
                        console.log("percentage", percentage)
                        onProgress && onProgress(percentage, file)
                    }
                }
            }).then(res=>{
            console.log(res)

            onSuccess && onSuccess(file)
        }).then(error=>{
            console.log(error)
            onError && onError(file)

        })

    }, [])
    // const handleProgressUpdate =

    const handleFileSelected: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        e.preventDefault()
        const files = e.target.files
        console.log("hei?", files)
        if (!files) return;
        for (const file of files) {
            uploadFile(file)
        }
    }, [])


    return <>
        <button onClick={handleUpload}>Upload</button>
        <HiddenInput type={"file"} ref={inputRef} multiple={true} onChange={handleFileSelected}/>
    </>
}
const HiddenInput = styled.input`
  width: 0;
  height: 0;
`
const Story: FC = () => {
    return <div><Upload/></div>
}

export default Story