import React, { useRef, useState } from "react";

import Combobox, { ComboboxProps } from "../../features/Library/Combobox";
import { TextField } from "@mui/material";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    newCategory: number | "",
    newSubject: number | "",
    newType: number | "",
    newDocName: string | ""
  ) => void;
  categories: ComboboxProps["options"];
  subjects: ComboboxProps["options"];
  types: ComboboxProps["options"];
  category: ComboboxProps["value"];
  subject: ComboboxProps["value"];
  type: ComboboxProps["value"];
  documentName: string;
}

const EditModal = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  subjects,
  types,
  category,
  subject,
  type,
  documentName,
}: EditModalProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [newCategory, setNewCategory] = useState<number | "">("");
  const [newSubject, setNewSubject] = useState<number | "">("");
  const [newType, setNewType] = useState<number | "">("");
  const [newDocName, setNewDocName] = useState<string | "">("");

  const muiTheme = createTheme();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Note Properties
          </AlertDialogHeader>
          <AlertDialogBody>
            <ThemeProvider theme={muiTheme}>
              <TextField
                variant={"filled"}
                label={"Title"}
                value={newDocName || documentName}
                onChange={(e) => {
                  setNewDocName(e.target.value);
                }}
                sx={{ marginBottom: "2%" }}
              />
            </ThemeProvider>

            <Combobox
              label="Category"
              value={newCategory || category}
              options={categories}
              onChange={(newValue) => setNewCategory(newValue)}
              extras={{ disablePortal: true }}
              style={{ marginBottom: "2%" }}
            />
            <Combobox
              label="Subject"
              value={newSubject || subject}
              options={subjects}
              onChange={(newValue) => setNewSubject(newValue)}
              extras={{ disablePortal: true }}
              style={{ marginBottom: "2%" }}
            />
            <Combobox
              label="Type"
              value={newType || type}
              options={types}
              onChange={(newValue) => setNewType(newValue)}
              extras={{ disablePortal: true }}
              style={{ marginBottom: "2%" }}
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                setNewCategory("");
                setNewSubject("");
                setNewDocName("");
                setNewType("");
                onConfirm(
                  newCategory || category,
                  newSubject || subject,
                  newType || type,
                  newDocName || documentName
                );
                onClose();
              }}
              ml={3}
            >
              Save Changes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EditModal;
