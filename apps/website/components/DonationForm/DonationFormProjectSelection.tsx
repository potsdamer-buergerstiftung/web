"use client";

import { readItems } from "@directus/sdk";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { donationProgressAtom, projectsAtom, selectedProjectId } from "./state";
import clsx from "clsx";
import directus from "@/app/(website)/directus";
import type { DonationFormConfig } from "./types";

async function getProjects() {
    const res = await directus.request(readItems("projects", {
        fields: ["id", "title", "image"],
        filter: {
            status: {
                _in: ["inprogress", "recurring"]
            },
            allow_donations: {
                _eq: true
            }
        }
    }));
    return res;
}

export default function DonationFormProjectSelection({
    config,
}: {
    config: DonationFormConfig;
}) {
    const [_donationFormProgress, setDonationFormProgress] = useAtom(donationProgressAtom);
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
                    {config.purpose.title}
                </h1>
                <p className="mt-4">{config.purpose.description}</p>
                <button className={clsx("text-start flex-grow px-4 my-8 max-w-lg bg-primary/10 rounded-lg relative py-3", projectId === 0 && "ring-2 ring-primary")} onClick={() => {
                    setProjectId(0);
                    setDonationFormProgress("AMOUNT_SELECTION");
                }}>
                    <span className="block font-header font-bold">
                        {config.purpose.generalPurposeLabel}
                    </span>
                    <span className="text-sm text-foreground brightness-70">Wir setzen deinen Beitrag genau da ein, wo er gerade am meisten gebraucht wird.</span>
                </button>
                <div className="mt-2 grid grid-cols-2 lg:grid-cols-3 items-start justify-start gap-4">
                    {projectsLoading && <p className="col-span-3">Projekte werden geladen...</p>}
                    {projectsError && <p>Error: {projectsError}</p>}
                    {projects && projects.map((project: any) => (
                        <button key={project.id} className="group relative block h-28 w-full cursor-pointer overflow-hidden rounded-lg" onClick={() => {
                            setProjectId(project.id);
                            setDonationFormProgress("AMOUNT_SELECTION");
                        }}>
                            <Image src={`https://portal.potsdamer-buergerstiftung.org/assets/${project.image}`} height={100} width={100} quality={30}
                                className="h-full w-full object-cover" alt={`Bild von ${project.title}`} />
                            <div className={clsx("pointer-events-none absolute top-0 bottom-0 left-0 right-0 transition", project.id === projectId ? 'opacity-100 bg-emerald-200' : 'opacity-40 bg-black')} />
                            <div className="flex-column absolute top-0 bottom-0 left-0 right-0 flex items-end p-4 justify-start">
                                <div className="relative w-full">
                                    <h1 className={clsx("text-start font-header text-xl font-bold transition", project.id === projectId ? 'text-slate-900' : 'text-white')}>{
                                        project.title
                                    }</h1>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setDonationFormProgress("AMOUNT_SELECTION")}
                    className="text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16"
                >
                    {config.purpose.continueLabel ?? "Weiter"}
                </button>
            </div>
        </div>
    )
}
