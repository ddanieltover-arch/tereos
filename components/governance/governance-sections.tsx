'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, ChevronRight, Users, Building2, Scale } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import type { GovernanceCommittee, LeaderProfile } from '@/lib/content/governance';

interface GovernanceSectionsProps {
  locale: string;
  intro: string[];
  boardIntro: string;
  boardChairman: LeaderProfile;
  boardDirectors: LeaderProfile[];
  boardCommittees: GovernanceCommittee[];
  advisoryCouncilIntro: string;
  advisoryCommissions: { title: string; description: string }[];
  regionalGovernanceIntro: string;
  managementIntro: string;
  managementCommittee: LeaderProfile[];
  labels: {
    overview: string;
    board: string;
    committees: string;
    advisoryCouncil: string;
    commissions: string;
    regional: string;
    management: string;
    viewBio: string;
    backToAbout: string;
    responsibilities: string;
  };
}

function LeaderCard({
  leader,
  viewBioLabel,
  onSelect,
}: {
  leader: LeaderProfile;
  viewBioLabel: string;
  onSelect: (leader: LeaderProfile) => void;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-neutral-100 hover:shadow-card transition-all h-full flex flex-col">
      {leader.image && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-primary/10">
          <Image src={leader.image} alt={leader.name} fill className="object-cover" />
        </div>
      )}
      <h3 className="font-bold text-neutral-900">{leader.name}</h3>
      <p className="text-sm text-primary font-medium mt-1 mb-3">{leader.role}</p>
      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 flex-1">{leader.bio}</p>
      <button
        type="button"
        onClick={() => onSelect(leader)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
      >
        {viewBioLabel} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function GovernanceSections({
  locale,
  intro,
  boardIntro,
  boardChairman,
  boardDirectors,
  boardCommittees,
  advisoryCouncilIntro,
  advisoryCommissions,
  regionalGovernanceIntro,
  managementIntro,
  managementCommittee,
  labels,
}: GovernanceSectionsProps) {
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  return (
    <>
      {/* Overview */}
      <section className="py-section bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <span className="text-label uppercase tracking-widest text-primary font-semibold">{labels.overview}</span>
            <div className="mt-6 space-y-6">
              {intro.map((paragraph, i) => (
                <p key={i} className="text-body-lg text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-h2 font-bold text-neutral-900">{labels.board}</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">{boardIntro}</p>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center p-8 bg-white rounded-2xl border border-neutral-100">
              {boardChairman.image && (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden max-h-72">
                  <Image
                    src={boardChairman.image}
                    alt={boardChairman.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-label uppercase tracking-widest text-primary font-semibold mb-2">
                  {boardChairman.role}
                </p>
                <h3 className="text-h3 font-bold text-neutral-900 mb-4">{boardChairman.name}</h3>
                <p className="text-neutral-600 leading-relaxed">{boardChairman.bio}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {boardDirectors
                .filter((d) => d.id !== boardChairman.id)
                .map((director) => (
                  <LeaderCard
                    key={director.id}
                    leader={director}
                    viewBioLabel={labels.viewBio}
                    onSelect={setSelectedLeader}
                  />
                ))}
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="text-h3 font-bold text-neutral-900 mb-6">{labels.committees}</h3>
            <Accordion.Root type="single" collapsible className="space-y-3">
              {boardCommittees.map((committee) => (
                <Accordion.Item
                  key={committee.id}
                  value={committee.id}
                  className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-neutral-50 transition-colors group">
                      <span className="font-bold text-neutral-900 pr-4">{committee.title}</span>
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-6 pb-6 border-t border-neutral-100 pt-4">
                      <p className="text-neutral-600 mb-4">{committee.aim}</p>
                      <p className="text-sm font-semibold text-neutral-700 mb-3">{labels.responsibilities}</p>
                      <ul className="space-y-2">
                        {committee.responsibilities.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-neutral-600">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </FadeIn>
        </div>
      </section>

      {/* Advisory Council */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-h2 font-bold text-neutral-900">{labels.advisoryCouncil}</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">{advisoryCouncilIntro}</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="text-h4 font-bold text-neutral-900 mb-6">{labels.commissions}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {advisoryCommissions.map((commission) => (
                <div
                  key={commission.title}
                  className="p-5 rounded-xl bg-neutral-50 border border-neutral-100"
                >
                  <h4 className="font-bold text-neutral-900 mb-2">{commission.title}</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed">{commission.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Regional governance */}
      <section className="py-section bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-gold/20 rounded-xl flex items-center justify-center text-accent-gold">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-h2 font-bold text-neutral-900">{labels.regional}</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">{regionalGovernanceIntro}</p>
          </FadeIn>
        </div>
      </section>

      {/* Management Committee */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">{labels.management}</h2>
            <p className="text-neutral-600 leading-relaxed">{managementIntro}</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementCommittee.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.05}>
                <LeaderCard
                  leader={member}
                  viewBioLabel={labels.viewBio}
                  onSelect={setSelectedLeader}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 text-center">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              ← {labels.backToAbout}
            </Link>
          </FadeIn>
        </div>
      </section>

      <Modal open={!!selectedLeader} onOpenChange={(open) => !open && setSelectedLeader(null)}>
        <ModalContent className="max-w-lg">
          {selectedLeader && (
            <>
              <ModalHeader>
                <ModalTitle>{selectedLeader.name}</ModalTitle>
                <ModalDescription>{selectedLeader.role}</ModalDescription>
              </ModalHeader>
              {selectedLeader.image && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-neutral-600 leading-relaxed">{selectedLeader.bio}</p>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
