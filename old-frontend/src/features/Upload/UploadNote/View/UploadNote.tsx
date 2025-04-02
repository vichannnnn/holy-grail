import { useContext } from 'react';
import { UploadNoteProps } from '@features';
import { MediaQueryContext } from '@providers';
import { DesktopUploadNote, MobileUploadNote } from '../index';

export const UploadNote = ({
  options,
  errors,
  control,
  field,
  index,
  watch,
  deleteNote,
  mirrorNote,
  resetSubject,
  totalNotesCount,
}: UploadNoteProps) => {
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <>
      {isDesktop ? (
        <DesktopUploadNote
          options={options}
          errors={errors}
          control={control}
          field={field}
          index={index}
          watch={watch}
          deleteNote={deleteNote}
          mirrorNote={mirrorNote}
          resetSubject={resetSubject}
          totalNotesCount={totalNotesCount}
        />
      ) : (
        <MobileUploadNote
          options={options}
          errors={errors}
          control={control}
          field={field}
          index={index}
          watch={watch}
          deleteNote={deleteNote}
          mirrorNote={mirrorNote}
          resetSubject={resetSubject}
          totalNotesCount={totalNotesCount}
        />
      )}
    </>
  );
};
