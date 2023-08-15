import { getFileViewURL, upload } from '@/services/frontend/storage'
import { faCloudUploadAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import { type UploadProgress } from 'appwrite'
import { useCallback, useState, type FC } from 'react'
import { useDropzone } from 'react-dropzone'
import Typography from './Typography'

export interface ImageDropzoneProps {
  onChange: (url: string) => void
}

const FIVE_MEGABYTES = 5 * 1024 * 1024

const ImageDropzone: FC<ImageDropzoneProps> = ({ onChange }) => {
  const [progress, setProgress] = useState<UploadProgress | undefined>()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    upload(file, setProgress)
      .then((fileData) => {
        const fileUrl = getFileViewURL(fileData)
        onChange(fileUrl)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: FIVE_MEGABYTES
  })
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '2px',
        borderColor: 'border',
        borderStyle: 'dashed',
        borderRadius: 'medium',
        padding: 'medium',
        width: '100%',
        aspectRatio: '2/1',
        '&[data-drag-accept=true]': {
          borderColor: 'success'
        },
        '&[data-drag-reject=true]': {
          borderColor: 'danger'
        }
      })}
      data-drag-accept={isDragAccept}
      data-drag-reject={isDragReject}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {progress !== undefined
        ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <Typography variant="body2" className={css({ marginBlockStart: 'medium' })}>
              Subiendo imagen...
            </Typography>
            <Typography variant="caption">
              {progress.progress}%
            </Typography>
          </>
        )
        : (
          <>
            <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
            <Typography variant="body2" className={css({ marginBlockStart: 'medium' })}>
              Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
            </Typography>
            <Typography variant="caption" component='div' color="info">
              Solo se permiten archivos PNG y JPG, y deben ser menores a 5MB
            </Typography>
          </>
        )
      }

    </div>
  )
}

export default ImageDropzone
