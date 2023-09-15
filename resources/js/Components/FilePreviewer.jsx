import React, { useEffect } from 'react'
import InputError from './InputError';
import FileViewer from 'react-file-viewer-extended';


const FilePreviewer = ({files}) => {
    useEffect(() => {
        console.log(files);
        console.log(`${files[0].path}${files[0].name}`);
    }, [])

    const logError = (error) => {
        console.log(error);
    };

    return (
        <div className="md:max-h-[80vh] md:overflow-y-hidden">
            <FileViewer
                fileType={`${files[0].ext}`}
                filePath={`${files[0].path}${files[0].name}`}
                errorComponent={<InputError message={`Could not load document`} />}
                onError={(e) => logError(e) }/>
        </div>
    )
}

export default FilePreviewer