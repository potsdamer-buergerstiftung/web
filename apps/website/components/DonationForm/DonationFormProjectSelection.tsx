"use client";

import { createDirectus, readItems, rest } from "@directus/sdk";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { donationProgressAtom, projectsAtom, selectedProjectId } from "./state";
import clsx from "clsx";
import directus from "app/(website)/directus";

async function getProjects() {
  const res = await directus.request(
    readItems("projects", {
      fields: ["id", "title", "image"],
      filter: {
        allow_donations: {
          _eq: true,
        },
      },
    })
  );
  return res;
}

export default function DonationFormProjectSelection() {
  const [donationFormProgress, setDonationFormProgress] =
    useAtom(donationProgressAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState();

  const [projectId, setProjectId] = useAtom(selectedProjectId);

  useEffect(() => {
    if (projects.length === 0) {
      getProjects()
        .then((projects) => {
          setProjects(projects);
          setProjectsLoading(false);
        })
        .catch((error) => {
          setProjectsError(error);
          setProjectsLoading(false);
        });
    } else {
      setProjectsLoading(false);
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-3">
        <h1 className="font-header font-bold text-3xl">
          Verwendungszweck wählen
        </h1>
        <p className="mt-4">
          Du kannst mit Deiner Spende ein <b>bestimmtes Projekt</b> oder die{" "}
          <b>allgemeine Arbeit</b> der Stiftung <b>unterstützen</b>.
        </p>
        <button
          className={clsx(
            "font-header flex-grow px-4 my-8 bg-emerald-100 rounded-lg relative font-bold py-3",
            projectId === 0 && "ring-2 ring-slate-900"
          )}
          onClick={() => setProjectId(0)}
        >
          <span className="text-slate-900">Allgemeine Arbeit unterstützen</span>
        </button>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 items-start justify-start gap-4">
          {projectsLoading && (
            <p className="col-span-3">Projekte werden geladen...</p>
          )}
          {projectsError && <p>Error: {projectsError}</p>}
          {projects &&
            projects.map((project: any) => (
              <button
                key={project.title}
                className="group relative block h-28 w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setProjectId(project.id)}
              >
                <Image
                  src={`https://portal.potsdamer-buergerstiftung.org/assets/${project.image}`}
                  height={100}
                  width={100}
                  quality={30}
                  className="h-full w-full object-cover"
                  alt={`Bild von ${project.title}`}
                />
                <div
                  className={clsx(
                    "pointer-events-none absolute top-0 bottom-0 left-0 right-0 transition",
                    project.id === projectId
                      ? "opacity-100 bg-emerald-200"
                      : "opacity-40 bg-black"
                  )}
                />
                <div className="flex-column absolute top-0 bottom-0 left-0 right-0 flex items-end p-4 justify-start">
                  <div className="relative w-full">
                    <h1
                      className={clsx(
                        "font-header text-xl font-bold transition",
                        project.id === projectId
                          ? "text-slate-900"
                          : "text-white"
                      )}
                    >
                      {project.title}
                    </h1>
                  </div>
                </div>
              </button>
            ))}
        </div>
        <button
          onClick={() => setDonationFormProgress("AMOUNT_SELECTION")}
          className="text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
