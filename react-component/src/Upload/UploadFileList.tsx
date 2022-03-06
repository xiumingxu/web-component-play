import React, {FC} from 'react'
import { UploadFile } from '.'

interface UploadFileListProps {
    files: UploadFile[]
}
export const UploadFileList: FC<UploadFileListProps> = props=>{
    const {files} = props
    return <ul>
        { files.map(file=>(<FileItem file={file}/>))}
    </ul>
}

interface FileItemProps{
    file: UploadFile
}

export const FileItem: FC<FileItemProps> = (props)=>{
    const {file} = props
    return <li>
        <span>{file.name}  </span>
        <span> | </span>
        <span> {file.status} </span>
        <span> | </span>

        <span> {file.percentage} </span>

    </li>

}