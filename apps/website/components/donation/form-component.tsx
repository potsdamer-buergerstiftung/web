"use client";

import { Button } from "@/components/ui/button";
import { Stepper } from "./steps";
import { PurposeStep } from "./steps/purpose-step";
import { AmountStep } from "./steps/amount-step";
import { PersonalDetailsStep } from "./steps/personal-details-step";
import { PaymentStep } from "./steps/payment";
import { DonationFormProvider } from "./form-definition";
import type { DonationPaymentMethod } from "@/lib/data/donation";

interface DonationFormProps {
    projects: any[];
    paymentMethods: DonationPaymentMethod[];
}

export function DonationForm({ projects, paymentMethods }: DonationFormProps) {
    return (
        <DonationFormProvider
            defaultValues={{ paymentMethodId: paymentMethods[0]?.id ?? "" }}
        >
            <Stepper.Root>
                {({ stepper }) => (
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex flex-col">
                            <Stepper.List className="flex flex-col">
                                {stepper.state.all.map((step) => (
                                    <Stepper.Item key={step.id} step={step.id}>
                                        <Stepper.Trigger className="flex flex-row py-1.5 relative">
                                            <Stepper.Indicator className="absolute top-1 left-0 bottom-1 w-0.5 bg-primary opacity-0 data-[status=active]:opacity-100"/>
                                            <Stepper.Title className="pl-3">{step.title}</Stepper.Title>
                                        </Stepper.Trigger>
                                    </Stepper.Item>
                                ))}
                            </Stepper.List>
                        </div>

                        <div className="flex-1 flex flex-col gap-8">
                            <Stepper.Content step="purpose">
                                <PurposeStep
                                    items={projects.map((project: any) => ({
                                        id: project.id,
                                        title: project.title,
                                        description: project.sub_title,
                                    }))}
                                />
                            </Stepper.Content>
                            <Stepper.Content step="amount">
                                <AmountStep />
                            </Stepper.Content>
                            <Stepper.Content step="personal-data">
                                <PersonalDetailsStep />
                            </Stepper.Content>
                            <Stepper.Content step="payment">
                                <PaymentStep methods={paymentMethods} />
                            </Stepper.Content>

                            <Stepper.Actions className="flex gap-2">
                                <Stepper.Prev
                                    render={(props) => (
                                        <Button {...props} size="lg">
                                            Zurück
                                        </Button>
                                    )}
                                />
                                <Stepper.Next
                                    render={(props) => (
                                        <Button {...props} size="lg">
                                            Weiter
                                        </Button>
                                    )}
                                />
                            </Stepper.Actions>
                        </div>
                    </div>
                )}
            </Stepper.Root>
        </DonationFormProvider>
    );
}
