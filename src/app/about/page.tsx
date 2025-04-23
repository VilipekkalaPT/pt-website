import Image from "next/image";
import { getAssets, getEntries } from "app/lib/contentfulDataService";
import {
  TypeAboutPageDataFields,
  TypeAboutPageDataSkeleton,
} from "app/lib/types/contentful/TypeAboutPageData";
import { BANNER } from "app/utils/variables";
import { TypeTransformationProcessTextFields } from "app/lib/types/contentful";
import Divider from "app/components/Divider";
import Card, { CardContent } from "app/components/Card";

export default async function About() {
  const [images, aboutPageData] = await Promise.all([
    getAssets(),
    getEntries<TypeAboutPageDataSkeleton>("aboutPageData"),
  ]);

  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;
  const aboutPageContent: TypeAboutPageDataFields = aboutPageData[0];
  const { title, subtitle, body } = aboutPageContent.transformationProcessText
    .fields as TypeTransformationProcessTextFields;

  console.log(aboutPageContent);

  return (
    <div className="mt-30 px-6">
      <div className="bg-gray-100 -mx-6 py-30 px-6">
        <p className="text-6xl font-bold">{aboutPageContent.name}</p>
        <ul className="mt-4 text-2xl text-gray-500">
          {aboutPageContent.roles.map((role: string) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
        <p className="mt-10 text-xl text-gray-400">
          {aboutPageContent.introduction}
        </p>
      </div>
      <div className="flex mt-15">
        <Image
          src={bannerUrl}
          alt={BANNER}
          width={banner?.file?.details.image?.width}
          height={banner?.file?.details.image?.height}
          className="block w-full h-auto flex-1"
        />
        <div className="flex-1 ml-10">
          <p className="font-bold text-2xl">{title}</p>
          <p className="mt-2 text-gray-500 text-xl">{subtitle}</p>
          <p className="mt-6">{body}</p>
        </div>
      </div>
      <p className="mt-15 mb-10 font-bold text-2xl">
        The journey from self-transformation to coaching
      </p>
      <div className="h-100 bg-amber-100"></div>
      <p className="mt-15 mb-10 font-bold text-2xl">Awards & Achievements</p>
      <div className="grid grid-cols-2 gap-4 mb-10">
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
      <Divider />
    </div>
  );
}
