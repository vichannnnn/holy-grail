import NotesApplication from "./NotesApplication";
import { UploadButton } from "./UploadButton";
import MaterialsGrid from "./MaterialsGrid";

const LibraryNew = () => {
  return (
      <section className="library section container" id="library">
        <div className="library__header">
          <div>
            <div className="sub-section__title">Library</div>
            <div className="section__subtitle">View materials or contribute with the button on the right (subjected to approval of administrators) </div>
          </div>
          <UploadButton
              text="Upload"
              border="2px"
              bg="teal"
              color="white"
          />
        </div>
        <MaterialsGrid   />
        {/*<NotesApplication />*/}
      </section>
  );
};

export default LibraryNew;
