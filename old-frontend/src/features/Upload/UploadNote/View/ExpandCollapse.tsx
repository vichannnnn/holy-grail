import { CollapseIcon, ExpandIcon } from '@features';

interface ExpandCollapseProps {
  expanded: boolean;
  onClick: () => void;
}

export const ExpandCollapse = ({ expanded, onClick }: ExpandCollapseProps) => {
  return (
    <div className='expand-collapse-div'>
      <button
        onClick={onClick}
        style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
      >
        {expanded ? <CollapseIcon /> : <ExpandIcon />}
      </button>
    </div>
  );
};
