import { Box } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface TreeItemRootProps {
  children?: ReactNode;
  icon?: ReactNode;
  canExpand?: boolean;
  expanded?: boolean;
}

export function TreeItemRoot({
  children,
  icon,
  canExpand = false,
  expanded = false,
}: TreeItemRootProps): JSX.Element {
  const expandIcon = useMemo(() => {
    if (!canExpand) {
      return null;
    }

    return expanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />;
  }, [canExpand, expanded]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#f4f4f4',
        my: 0.5,
      }}
    >
      <Box sx={{ width: '24px' }}>{expandIcon}</Box>
      <Box sx={{ width: '24px' }}>{icon}</Box>
      <Box>{children}</Box>
    </Box>
  );
}
