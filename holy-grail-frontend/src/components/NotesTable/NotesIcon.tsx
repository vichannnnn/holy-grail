import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { CommonType } from '@api/library';

type IconType = 'science' | 'math' | 'arts' | 'language' | 'default';
type IconMapping = { [K in IconType]: JSX.Element };

const iconMapping: IconMapping = {
  science: <ScienceOutlinedIcon />,
  math: <CalculateOutlinedIcon />,
  arts: <PaletteOutlinedIcon />,
  language: <LanguageOutlinedIcon />,
  default: <DescriptionOutlinedIcon />,
};

const subjectData = [
  {
    subjects: [
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
    type: 'science',
  },
  {
    subjects: [
      'Additional Mathematics',
      'Elementary Mathematics',
      'HL Mathematics',
      'SL Mathematics',
      'H1 Mathematics',
      'H2 Mathematics',
      'H3 Mathematics',
      'H2 Further Mathematics',
    ],
    type: 'math',
  },
  {
    subjects: [
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
    type: 'arts',
  },
  {
    subjects: ['English', 'Higher Chinese', 'H1 General Paper', 'H2 Literature in English'],
    type: 'language',
  },
];

const subjectMap: Record<string, string> = {};
subjectData.forEach(({ subjects, type }) => {
  subjects.forEach((subject) => {
    subjectMap[subject] = type;
  });
});

interface NotesIconProps {
  docSubject: CommonType;
}

export const NotesIcon = ({ docSubject }: NotesIconProps) => {
  const subject = (subjectMap[docSubject.name] as IconType) || 'default';

  return <>{iconMapping[subject]}</>;
};
