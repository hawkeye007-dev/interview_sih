"use client";

import { getGreeting, DASHBOARD_STATS, RECENT_ACTIVITIES } from "@/constants/dashboard";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { 
    MicIcon, 
    PlayIcon, 
    StarIcon, 
    FileTextIcon,
    TrendingUpIcon,
    ClockIcon,
    BookOpenIcon,
    TargetIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap = {
    mic: MicIcon,
    play: PlayIcon,
    star: StarIcon,
    file: FileTextIcon
};

const Dashboard = () => {
    const greeting = getGreeting();

    return (
        <div className="py-8 px-4    md:px-8">
            <Container>
                {/* Greeting Section */}
                <div className="mb-8 mt-12">
                    <h1 className="text-3xl md:text-4xl font-heading font-medium mb-2">
                        {greeting}, <span className="font-subheading italic">Ruthvik!</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Ready to ace your next interview? Let's continue your preparation journey.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {DASHBOARD_STATS.map((stat, index) => {
                        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
                        return (
                            <Container key={stat.title} delay={0.1 * index}>
                                <MagicCard
                                    gradientFrom="#38bdf8"
                                    gradientTo="#3b82f6"
                                    className="p-6 rounded-2xl"
                                    gradientColor="rgba(59,130,246,0.1)"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                        <span className="text-sm text-green-600">{stat.change}</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    </div>
                                </MagicCard>
                            </Container>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Container delay={0.4}>
                        <MagicCard
                            gradientFrom="#38bdf8"
                            gradientTo="#3b82f6"
                            className="p-6 rounded-2xl"
                            gradientColor="rgba(59,130,246,0.1)"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <TargetIcon className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold">Quick Actions</h3>
                            </div>
                            <div className="space-y-3">
                                <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/dashboard/mock-interviews'}>
                                    <MicIcon className="mr-2 h-4 w-4" />
                                    Start Mock Interview
                                </Button>
                                <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/dashboard/practice'}>
                                    <BookOpenIcon className="mr-2 h-4 w-4" />
                                    Practice Session
                                </Button>
                                <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/dashboard/resume-checker'}>
                                    <FileTextIcon className="mr-2 h-4 w-4" />
                                    Check Resume
                                </Button>
                            </div>
                        </MagicCard>
                    </Container>

                    {/* Recent Activities */}
                    <Container delay={0.5}>
                        <MagicCard
                            gradientFrom="#38bdf8"
                            gradientTo="#3b82f6"
                            className="p-6 rounded-2xl"
                            gradientColor="rgba(59,130,246,0.1)"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <ClockIcon className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold">Recent Activities</h3>
                            </div>
                            <div className="space-y-4">
                                {RECENT_ACTIVITIES.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                                        <div>
                                            <p className="font-medium text-sm">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-primary">{activity.score}</span>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>
                    </Container>
                </div>

                {/* Progress Overview */}
                <Container delay={0.6}>
                    <MagicCard
                        gradientFrom="#38bdf8"
                        gradientTo="#3b82f6"
                        className="p-6 rounded-2xl"
                        gradientColor="rgba(59,130,246,0.1)"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUpIcon className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold">Weekly Progress</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-lg bg-card/50">
                                <p className="text-2xl font-bold text-primary">85%</p>
                                <p className="text-sm text-muted-foreground">Interview Confidence</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-card/50">
                                <p className="text-2xl font-bold text-primary">12</p>
                                <p className="text-sm text-muted-foreground">Skills Improved</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-card/50">
                                <p className="text-2xl font-bold text-primary">7 days</p>
                                <p className="text-sm text-muted-foreground">Current Streak</p>
                            </div>
                        </div>
                    </MagicCard>
                </Container>
            </Container>
        </div>
    );
};

export default Dashboard; 