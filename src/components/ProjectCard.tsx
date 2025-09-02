// components/ProjectCard.tsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

type ProjectCardProps = {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
};

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  tech,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" height="140" image={imageSrc} alt={imageAlt} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {tech.join(", ")}
        </Typography>
      </CardContent>
      <CardActions>
        {demoUrl && (
          <Button size="small" href={demoUrl} target="_blank">
            Demo
          </Button>
        )}
        {repoUrl && (
          <Button size="small" href={repoUrl} target="_blank">
            Code
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
