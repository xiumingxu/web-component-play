import React, {ChangeEventHandler, FC, useCallback, useRef, useState} from 'react';
import { UploadFileList } from './UploadFileList'
import styled from 'styled-components'
import axios from 'axios'
import * as uuid from 'uuid'

// 上传form data
// loading, success,
// 分片files
interface PostResponse {

}

type StatusType = 'init'| 'uploading' | 'success' | 'error'
export interface UploadFile{
    uid: string
    percentage: number
    status: StatusType
    name: string
    raw: File
}

interface UploadProps {
    onSuccess?: (res: any, file: UploadFile)=> any
    onError?: (error: Error, file: UploadFile)=>any
    onProgress?:( percentage: Number, file: UploadFile)=> any

}


const Upload: FC<UploadProps> = (props) => {
    const {
        onSuccess,
        onError,
        onProgress,

    } = props
    const [files, setFiles] = useState<UploadFile[]>([])
    const inputRef = useRef<HTMLInputElement>(null);
    const handleUpload = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }, [])

    // core
    const updateFile = (file: UploadFile, fields: Partial<UploadFile>)=>{
        setFiles(prevList => {
            return prevList.map(f => {
                if(f.uid === file.uid){
                    return {...f, ...fields}
                }else
                    return f
            })
        })
    }
    const uploadFile = useCallback((file: UploadFile) => {
        const formData = new FormData();
        formData.append(file.name, file.raw)
        axios.post<PostResponse>("http://localhost:6006/posts",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress:  (e: any)=>{
                    const percentage = Math.round(e.loaded * 100 / e.total) || 0
                    if (percentage < 100) {
                        console.log("percentage", percentage)
                        updateFile(file, {percentage, status: 'uploading'})
                        onProgress && onProgress(percentage, file)
                    }
                }
            }).then(res=>{
                updateFile(file, {percentage: 100, status: 'success'})
                onSuccess && onSuccess(res, file)
            }).catch(error=>{
                console.log(error)
                updateFile(file, {percentage: 0, status: 'error'})
                onError && onError(error, file)
            })

    }, [])
    // const handleProgressUpdate =

    const handleFileSelected: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        e.preventDefault()
        const files = e.target.files
        if (!files) return;
        console.log('filename', files[0].name)
        const _uploadFiles: UploadFile[] = Array.from(files).map(file=>{
          //Type 'File' must have a '[Symbol.iterator]()' method that returns an iterator
            return {uid: uuid.v4(), name: file.name || 'file', raw: file,  percentage: 0, status: 'init'}

        })
        console.log("_uploadFiles", _uploadFiles)
        setFiles(_uploadFiles)
        for (const file of _uploadFiles) {
            uploadFile(file)
        }
    }, [])


    return <>
        <button onClick={handleUpload}>Upload</button>
        <HiddenInput type={"file"} ref={inputRef} multiple={true} onChange={handleFileSelected}/>
        <UploadFileList files={files} ></UploadFileList>
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