"use client";

import { useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { ProgressiveImage } from "@/components/progressive-image";
import type { Project } from "@/lib/content";

function CardContents({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="project-image-wrap cover-artwork" data-cover={project.slug}>
        {project.cover ? (
          <ProgressiveImage
            src={project.cover}
            alt=""
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
          />
        ) : (
          <span className="locked-mark">private</span>
        )}
      </div>
      <div className="project-copy">
        <div>
          <div className="project-title-row">
            <span className="index-n">{String(index + 1).padStart(2, "0")}</span>
            <h3>
              {project.title}
              {project.locked && <span className="lock-note">private</span>}
            </h3>
          </div>
          <p className="dek">{project.dek}</p>
        </div>
      </div>
    </>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const label = `${project.title}, ${project.disciplines}`;

  if (!project.locked) {
    return (
      <a className="project-card" href={`/${project.slug}`} aria-label={label}>
        <CardContents project={project} index={index} />
      </a>
    );
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setAttempted(false);
      }}
    >
      <DialogPrimitive.Trigger asChild>
        <button className="project-card" type="button" aria-label={`${label}, private, enter password`}>
          <CardContents project={project} index={index} />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="private-dialog-overlay" />
        <DialogPrimitive.Content className="private-dialog-content">
          <DialogPrimitive.Title className="sr-only">Private case study</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Enter the password to view {project.title}.
          </DialogPrimitive.Description>
          <form
            className="private-dialog-form"
            onSubmit={(event) => {
              event.preventDefault();
              setAttempted(true);
            }}
          >
            <label className="sr-only" htmlFor={`password-${project.slug}`}>Password</label>
            <input
              id={`password-${project.slug}`}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
            />
            {attempted && <p className="private-dialog-status" role="status">Password access isn&rsquo;t available yet.</p>}
            <div className="private-dialog-actions">
              <DialogPrimitive.Close type="button">Close</DialogPrimitive.Close>
              <button type="submit">Unlock</button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
