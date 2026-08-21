import Box, { type BoxProps } from '@mui/material/Box';

export default function SiteContainer({ className, ...props }: BoxProps) {
  const containerClassName = ['site-container', className].filter(Boolean).join(' ');

  return <Box {...props} className={containerClassName} />;
}
