"use client";

import { Button } from "@components/ui/button";
import { Stepper } from "./steps";
import { PurposeStep } from "./PurposeStep";
import { AmountStep } from "./AmountStep";
import { PersonalDetailsStep } from "./PersonalDetailsStep";
import { PaymentStep } from "./payment/step";
import { DonationFormProvider } from "./form";
import { useFormContext } from "react-hook-form";
import type { DonationPaymentMethod } from "@lib/data/donation";

function DonationFormDebugValues() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <pre className="mt-4 rounded-md bg-muted/60 p-4 text-xs text-muted-foreground">
            {JSON.stringify(values, null, 2)}
        </pre>
    );
}

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
                                        <Stepper.Trigger>
                                            <Stepper.Indicator />
                                            <Stepper.Title>{step.title}</Stepper.Title>
                                        </Stepper.Trigger>
                                    </Stepper.Item>
                                ))}
                            </Stepper.List>
                            {/* <DonationFormDebugValues /> */}
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
