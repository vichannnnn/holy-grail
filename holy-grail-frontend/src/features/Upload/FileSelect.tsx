import { useEffect, useRef, useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { FileSelectProps } from '@features';
import { MediaQueryContext } from '@providers';

export const FileSelect = ({ handleAddNotes }: FileSelectProps) => {
  const dragDropRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { isDesktop } = useContext(MediaQueryContext);

  useEffect(() => {
    const drop = dragDropRef.current as HTMLDivElement;
    drop.addEventListener('dragover', handleDragOver);
    drop.addEventListener('drop', handleDrop);
    return () => {
      drop.removeEventListener('dragover', handleDragOver);
      drop.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer) {
      const files = e.dataTransfer.files;
      const giveFiles = new DataTransfer();
      for (const file of files) {
        giveFiles.items.add(file);
      }
      (fileRef.current as HTMLInputElement).files = giveFiles.files;
      const forcedChange = new Event('change', { bubbles: true });
      (fileRef.current as HTMLInputElement).dispatchEvent(forcedChange);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      style={{
        width: isDesktop ? '60vw' : '0px',
        padding: '4%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column nowrap',
        border: isDesktop ? '2px #c3c3c3 dashed' : 'none',
        borderRadius: '12px',
      }}
      ref={dragDropRef}
    >
      <Typography sx={{ margin: '2%', display: isDesktop ? null : 'none' }}>
        Drag and drop your PDFs here, or
      </Typography>
      <Button
        onClick={() => {
          if (fileRef.current) {
            fileRef.current.click();
          }
        }}
        sx={{
          borderColor: 'transparent',
          backgroundColor: 'rgb(49, 130, 206)',
          textTransform: 'capitalize',
          color: 'white',
          fontWeight: 'bold',
          aspectRatio: 1.618,
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: 'rgba(49, 130, 206, 0.75)',
          },
          whiteSpace: 'nowrap',
        }}
      >
        Upload Files
      </Button>
      <input
        multiple
        ref={fileRef}
        type='file'
        accept='application/pdf'
        // , text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document
        onChange={(event) => {
          if (event.target.files) {
            handleAddNotes(event.target.files);
            const clearValue = new DataTransfer();
            (fileRef.current as HTMLInputElement).files = clearValue.files;
          }
        }}
        style={{ display: 'none' }}
      />
    </div>
  );
};
