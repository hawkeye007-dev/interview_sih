"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, TimerIcon, ChevronRightIcon } from "lucide-react";
import { COMPANY_INTERVIEW_PROCESSES } from "@/constants/interview-process";

const Practice = () => {
    const [selectedCompany, setSelectedCompany] = useState<keyof typeof COMPANY_INTERVIEW_PROCESSES | null>(null);
    const company = selectedCompany ? COMPANY_INTERVIEW_PROCESSES[selectedCompany] : null;

    return (
        <div className="py-8 px-4 md:px-8">
            <Container>
                <MagicCard
                    gradientFrom="#38bdf8"
                    gradientTo="#3b82f6"
                    className="p-8 rounded-2xl text-center mb-8"
                    gradientColor="rgba(59,130,246,0.1)"
                >
                    <h1 className="text-3xl font-heading font-medium mb-4">
                        Which company's interview process would you like to simulate?
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                        Select a company to see their interview process and start practicing with real interview scenarios.
                    </p>
                    <div className="max-w-xs mx-auto">
                        <Select onValueChange={(value) => setSelectedCompany(value as keyof typeof COMPANY_INTERVIEW_PROCESSES)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="microsoft">Microsoft</SelectItem>
                                <SelectItem value="amazon">Amazon</SelectItem>
                                <SelectItem value="netflix">Netflix</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </MagicCard>

                {company && (
                    <Container delay={0.1}>
                        <Card className="border-border/50">
                            <CardHeader className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        width={40}
                                        height={40}
                                        className="rounded-lg"
                                    />
                                    <CardTitle className="text-2xl">{company.name} Interview Process</CardTitle>
                                </div>
                                <CardDescription className="text-lg">
                                    {company.description}
                                </CardDescription>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <TimerIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        Average Duration: {company.averageDuration}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {company.rounds.map((round, index) => (
                                        <Link 
                                            key={index} 
                                            href={{
                                                pathname: "/dashboard/mock-interviews",
                                                query: {
                                                    company: selectedCompany,
                                                    round: index + 1
                                                }
                                            }}
                                        >
                                            <div className="flex gap-6 items-start relative group cursor-pointer">
                                                {index !== company.rounds.length - 1 && (
                                                    <div className="absolute left-6 top-12 w-0.5 h-[calc(100%+1.5rem)] bg-border -z-10" />
                                                )}
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    <round.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-center justify-between gap-4 mb-2">
                                                        <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                                                            {round.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="secondary">{round.duration}</Badge>
                                                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <ChevronRightIcon className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground mb-2">{round.description}</p>
                                                    {/* <div className="flex flex-wrap gap-2">
                                                        {round.focus.map((item, i) => (
                                                            <Badge key={i} variant="outline" className="text-xs">
                                                                {item}
                                                            </Badge>
                                                        ))}
                                                    </div> */}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-8 text-center">
                                    <Link href={{
                                        pathname: "/dashboard/mock-interviews",
                                        query: {
                                            company: selectedCompany,
                                            round: 1
                                        }
                                    }}>
                                        <Button size="lg" className="group">
                                            Start from Beginning
                                            <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                )}
            </Container>
        </div>
    );
};

export default Practice; 