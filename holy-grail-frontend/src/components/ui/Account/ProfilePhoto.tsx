interface ProfilePhotoProps {
  profilePhotoPreview?: string | undefined;
}

export const ProfilePhoto = ({
  profilePhotoPreview = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png',
}: ProfilePhotoProps) => {
  return (
    <>
      <img src={profilePhotoPreview} alt='Profile Preview' className='w-12 h-12 rounded-full' />
    </>
  );
};
