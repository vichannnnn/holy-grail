import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const mapReducer = (arr, [keys, val]) => [
  ...arr,
  ...(Array.isArray(keys) ? [...keys.map((key) => [key, val])] : [[keys, val]]),
];

const subjectMap = new Map(
  [
    [
      [
        'Combined Biology',
        'Pure Biology',
        'Combined Chemistry',
        'Pure Chemistry',
        'Combined Physics',
        'Pure Physics',
        'Computing',
        'HL Biology',
        'HL Chemistry',
        'HL Physics',
        'SL Biology',
        'SL Chemistry',
        'SL Physics',
        'H1 Biology',
        'H1 Chemistry',
        'H1 Physics',
        'H2 Biology',
        'H2 Chemistry',
        'H2 Physics',
        'H2 Computing',
        'H3 Biology',
        'H3 Chemistry',
        'H3 Physics',
      ],
      'science',
    ],
    [
      [
        'Additional Mathematics',
        'Elementary Mathematics',
        'HL Mathematics',
        'SL Mathematics',
        'H1 Mathematics',
        'H2 Mathematics',
        'H3 Mathematics',
        'H2 Further Mathematics',
      ],
      'math',
    ],
    [
      [
        'Elective Geography',
        'Pure Geography',
        'Elective History',
        'Pure History',
        'Social Studies',
        'Elective Literature',
        'Pure Literature',
        'HL Economics',
        'SL Economics',
        'H1 Economics',
        'H1 Geography',
        'H1 History',
        'H1 Art',
        'H1 China Studies in Chinese',
        'H2 Economics',
        'H2 Geography',
        'H2 History',
        'H2 Art',
        'H2 China Studies in Chinese',
        'H2 Chinese Language and Literature',
        'H3 Economics',
        'H3 Chinese Language and Literature',
      ],
      'arts',
    ],
    [['English', 'Higher Chinese', 'H1 General Paper', 'H2 Literature in English'], 'language'],
  ].reduce(mapReducer, []),
);

interface NotesIconProps {
  docSubject: { name: string; id: number };
}

const NotesIcon = ({ docSubject }: NotesIconProps) => {
  const subject = subjectMap.get(docSubject.name) ? subjectMap.get(docSubject.name) : 'default';

  return (
    <>
      {
        {
          science: <ScienceOutlinedIcon />,
          math: <CalculateOutlinedIcon />,
          arts: <PaletteOutlinedIcon />,
          language: <LanguageOutlinedIcon />,
          default: <DescriptionOutlinedIcon />,
        }[subject]
      }
    </>
  );
};

export default NotesIcon;
