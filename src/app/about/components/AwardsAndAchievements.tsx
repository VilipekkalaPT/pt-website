import Card, { CardContent } from "app/components/Card";

interface AwardsAndAchievementsProps {
  title: string;
  subtitle: string;
}

export default function AwardsAndAchievements({
  title,
  subtitle,
}: AwardsAndAchievementsProps) {
  return (
    <div className="mx-12 my-15">
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-gray-500 mt-1 mb-4">{subtitle}</p>
      <div className="grid grid-cols-2 gap-4">
        <Card className="border border-gray-200">
          <CardContent>
            <p>Award 1</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent>
            <p>Achievement 1</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
