import ArrowOutward from '@mui/icons-material/ArrowOutward';
import Box from '@mui/material/Box';
import Link from 'next/link';

type ProjectCardLinkProps = {
  href: string;
  label: string;
  ariaLabel: string;
};

export default function ProjectCardLink({ href, label, ariaLabel }: ProjectCardLinkProps) {
  return (
    <Box className="project-card-navigation">
      <Link href={href} aria-label={ariaLabel} className="project-card-overlay-link" />
      <Box className="project-card-detail-cue" aria-hidden="true">
        <Box component="span">{label}</Box>
        <ArrowOutward className="project-card-detail-arrow" fontSize="small" />
      </Box>
    </Box>
  );
}
