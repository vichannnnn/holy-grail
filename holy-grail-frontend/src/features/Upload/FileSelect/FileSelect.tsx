import { useEffect, useRef, useContext } from 'react';
import { Button } from '@components';
import { FileSelectProps } from '@features';
import { AuthContext, MediaQueryContext } from '@providers';
import './FileSelect.css';

export const FileSelect = ({ handleAddNotes }: FileSelectProps) => {
  const dragDropRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { isDesktop } = useContext(MediaQueryContext);
  const { user } = useContext(AuthContext);

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
    <div className={`file-select-container ${isDesktop ? 'desktop' : 'mobile'}`} ref={dragDropRef}>
      <div className={`upload-notes-description ${isDesktop ? 'desktop' : 'mobile'}`}>
        <a>Drag and drop your PDFs here, or</a>
      </div>

      <Button
        onClick={() => {
          if (fileRef.current) {
            fileRef.current.click();
          }
        }}
      >
        Upload Files
      </Button>
      <input
        multiple
        ref={fileRef}
        type='file'
        accept={user && user.role === 3 ? 'application/pdf, application/zip' : 'application/pdf'}
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
