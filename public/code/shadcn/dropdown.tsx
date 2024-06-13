"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SubscribeForm() {
  const [language, setLanguage] = useState("english");

  return (
    <Card className="w-full max-w-sm mx-auto shadow-md">
      <form
        action="
      https://buttondown.email/api/emails/embed-subscribe/{username}
      "
        method="post"
        target="popupwindow"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Stay informed</CardTitle>
          <CardDescription>
            You'll be the first to know when we launch.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <input type="hidden" name="tag" value={language} />
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="english" onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            {language === "english"
              ? "Subscribe"
              : language === "french"
                ? "S'abonner"
                : "Suscribirse"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
