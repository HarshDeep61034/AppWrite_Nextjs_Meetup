"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ID, account, database } from "@/app/appwrite";
import { DialogDemo } from "@/components/DialogDemo";
import MultipleSelectorDemo from "@/components/MultipleSelector";

export default function Component() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [open, setOpen] = useState(false);

  async function getUser() {
    try {
      const sessionResponse = await account.getSession("current");
      const userResponse = await account.get(); // Fetch the user details
      setUser(userResponse);
      const profileResponse = await database.getDocument(
        "669df904001bd01960db",
        "669df922001cf2f83cf6",
        userResponse.email
      );
      setProfile(profileResponse);
      console.log(userResponse);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  async function createProfile() {
    try {
      const response = await database.createDocument(
        "669df904001bd01960db",
        "669df922001cf2f83cf6",
        ID.unique(),
        {
          userId: user.email,
        }
      );
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <div className="bg-muted rounded-lg p-6 border-2 border-neutral-300 bg-neutral-200">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  profile && profile.imgUrl
                    ? profile.imgUrl
                    : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-xl font-semibold">
                {user ? user.name : "Loading..."}
              </div>
              <div className="text-sm text-muted-foreground">
                {user ? user.email : "Loading..."}
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="prose text-muted-foreground">
            <p>{profile && profile.bio ? profile.bio : <p>No bio yet!</p>}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {profile && profile.intrests ? (
              profile.intrests.map((item: string) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))
            ) : (
              <p className="px-4 py-2 border-2 border-neutral-200 bg-neutral-50 rounded-lg">
                No Interests added yet!
              </p>
            )}
          </div>
          <div className="relative right-5 my-4">
            <MultipleSelectorDemo />
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Startup Meetup</div>
                    <div className="text-sm text-muted-foreground">
                      Attended on May 15, 2023
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <WebcamIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">
                      Web Development Discussion
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Participated on April 20, 2023
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Design Thinking Workshop</div>
                    <div className="text-sm text-muted-foreground">
                      Attended on March 10, 2023
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Startup Pitch Competition</div>
                    <div className="text-sm text-muted-foreground">
                      June 1, 2023 - 7:00 PM
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">UX Design Meetup</div>
                    <div className="text-sm text-muted-foreground">
                      July 15, 2023 - 6:30 PM
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Blockchain Workshop</div>
                    <div className="text-sm text-muted-foreground">
                      August 20, 2023 - 9:00 AM
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <DialogDemo />
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function WebcamIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
