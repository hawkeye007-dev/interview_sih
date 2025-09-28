"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { defaultProfile, type ProfileData } from "@/constants/profile";
import { GithubIcon, LinkedinIcon, TwitterIcon, GlobeIcon, MapPinIcon, EditIcon, SaveIcon, LogOutIcon } from "lucide-react";

const Profile = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<ProfileData>(defaultProfile);
    const [editedProfile, setEditedProfile] = useState<ProfileData>(defaultProfile);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
        // In a real app, you would save this to a backend
    };

    const handleLogout = () => {
        router.push("/");
    };

    const handleChange = (field: keyof ProfileData, value: any) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const currentProfile = isEditing ? editedProfile : profile;

    return (
        <div className="py-8 px-4 md:px-8">
            <Container>
                <div className="flex justify-end mb-4">
                    <div className="space-x-2">
                        {isEditing ? (
                            <Button onClick={handleSave} className="group">
                                <SaveIcon className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        ) : (
                            <Button onClick={handleEdit} variant="outline" className="group">
                                <EditIcon className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        )}
                        <Button onClick={handleLogout} variant="destructive">
                            <LogOutIcon className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    {/* Main Profile Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <div className="relative h-20 w-20">
                                    <Image
                                        src={currentProfile.avatar}
                                        alt={currentProfile.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    {isEditing ? (
                                        <Input
                                            value={currentProfile.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            className="text-2xl font-bold mb-1"
                                        />
                                    ) : (
                                        <h1 className="text-2xl font-bold mb-1">{currentProfile.name}</h1>
                                    )}
                                    {isEditing ? (
                                        <Input
                                            value={currentProfile.role}
                                            onChange={(e) => handleChange("role", e.target.value)}
                                            className="text-muted-foreground"
                                        />
                                    ) : (
                                        <p className="text-muted-foreground">{currentProfile.role}</p>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-2">About</h3>
                                    {isEditing ? (
                                        <Textarea
                                            value={currentProfile.bio}
                                            onChange={(e) => handleChange("bio", e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    ) : (
                                        <p className="text-muted-foreground">{currentProfile.bio}</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Location</h3>
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                                        {isEditing ? (
                                            <Input
                                                value={currentProfile.location}
                                                onChange={(e) => handleChange("location", e.target.value)}
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">{currentProfile.location}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentProfile.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Programming Languages</h3>
                                    <div className="space-y-3">
                                        {currentProfile.languages.map((lang, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm">{lang.name}</span>
                                                    <span className="text-sm text-muted-foreground">{lang.proficiency}%</span>
                                                </div>
                                                <Progress value={lang.proficiency} className="h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Side Cards */}
                    <div className="space-y-6">
                        {/* Social Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <GithubIcon className="h-5 w-5" />
                                    {isEditing ? (
                                        <Input
                                            value={currentProfile.github}
                                            onChange={(e) => handleChange("github", e.target.value)}
                                        />
                                    ) : (
                                        <a href={`https://${currentProfile.github}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                            {currentProfile.github}
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <LinkedinIcon className="h-5 w-5" />
                                    {isEditing ? (
                                        <Input
                                            value={currentProfile.linkedin}
                                            onChange={(e) => handleChange("linkedin", e.target.value)}
                                        />
                                    ) : (
                                        <a href={`https://${currentProfile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                            {currentProfile.linkedin}
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <TwitterIcon className="h-5 w-5" />
                                    {isEditing ? (
                                        <Input
                                            value={currentProfile.twitter}
                                            onChange={(e) => handleChange("twitter", e.target.value)}
                                        />
                                    ) : (
                                        <a href={`https://${currentProfile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                            {currentProfile.twitter}
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <GlobeIcon className="h-5 w-5" />
                                    {isEditing ? (
                                        <Input
                                            value={currentProfile.website}
                                            onChange={(e) => handleChange("website", e.target.value)}
                                        />
                                    ) : (
                                        <a href={`https://${currentProfile.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                            {currentProfile.website}
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Education</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <Input
                                            value={currentProfile.education.degree}
                                            onChange={(e) => handleChange("education", { ...currentProfile.education, degree: e.target.value })}
                                            placeholder="Degree"
                                        />
                                        <Input
                                            value={currentProfile.education.institution}
                                            onChange={(e) => handleChange("education", { ...currentProfile.education, institution: e.target.value })}
                                            placeholder="Institution"
                                        />
                                        <Input
                                            value={currentProfile.education.year}
                                            onChange={(e) => handleChange("education", { ...currentProfile.education, year: e.target.value })}
                                            placeholder="Year"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <p className="font-medium">{currentProfile.education.degree}</p>
                                        <p className="text-sm text-muted-foreground">{currentProfile.education.institution}</p>
                                        <p className="text-sm text-muted-foreground">Class of {currentProfile.education.year}</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Achievements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                    {currentProfile.achievements.map((achievement, index) => (
                                        <li key={index}>{achievement}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Profile; 