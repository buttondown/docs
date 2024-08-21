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

export default function SubscribeForm() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <form
        action="
      https://buttondown.com/api/emails/embed-subscribe/{username}
      "
        method="post"
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
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Subscribe
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
