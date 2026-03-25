"use client";

import { Button } from "@components/ui/button";
import { Stepper } from "./steps";

export function DonationForm() {
    return (
        <Stepper.Root>
            {({ stepper }) => (
                <div className="flex flex-row">
                    <Stepper.List className="flex flex-col">
                        {stepper.state.all.map((step) => (
                            <Stepper.Item key={step.id} step={step.id}>
                                <Stepper.Trigger>
                                    <Stepper.Indicator />
                                    <Stepper.Title>{step.title}</Stepper.Title>
                                </Stepper.Trigger>
                                <Stepper.Separator />
                            </Stepper.Item>
                        ))}
                    </Stepper.List>

                    <div className="flex flex-col">
                        <Stepper.Content step="purpose">
                            Zweck
                        </Stepper.Content>
                        <Stepper.Content step="amount">
                            Betrag
                        </Stepper.Content>
                        <Stepper.Content step="personal-data">
                            Persönliche Daten
                        </Stepper.Content>
                        <Stepper.Content step="payment">
                            Zahlung
                        </Stepper.Content>

                        <Stepper.Actions>
                            <Stepper.Prev render={(props) => <Button {...props}>Zurück</Button>} />
                            <Stepper.Next render={(props) => <Button {...props}>Weiter</Button>} />
                        </Stepper.Actions>
                    </div>
                </div>
            )}
        </Stepper.Root>
    )
}